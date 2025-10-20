import { NextRequest, NextResponse } from 'next/server';
import transporter from '@/lib/nodemailer';
import validator from 'validator';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

// Cache simple pour le rate limiting (en production, utilisez Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Fonction de rate limiting simple
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Nouvelle fenêtre de 1 heure
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 messages par heure
    return false;
  }

  limit.count++;
  return true;
}

// Fonction de sanitization pour éviter les injections XSS
function sanitizeInput(input: string): string {
  return validator.escape(validator.trim(input));
}

export async function POST(request: NextRequest) {
  try {
    // Connexion à la base de données
    await connectDB();

    // Rate limiting basique
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Trop de demandes. Veuillez réessayer dans 1 heure.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { name, email, phone, message, subject, budget } = body;

    // SÉCURITÉ : Sanitizer tous les inputs pour éviter XSS
    name = sanitizeInput(name || '');
    email = sanitizeInput(email || '');
    phone = sanitizeInput(phone || '');
    message = sanitizeInput(message || '');
    subject = subject ? sanitizeInput(subject) : '';
    budget = budget ? sanitizeInput(budget) : '';

    // Validation des champs requis
    if (!name || name.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Le nom est requis' },
        { status: 400 }
      );
    }

    if (!email || email.length === 0) {
      return NextResponse.json(
        { success: false, error: 'L\'email est requis' },
        { status: 400 }
      );
    }

    if (!phone || phone.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Le téléphone est requis' },
        { status: 400 }
      );
    }

    if (!message || message.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Le message est requis' },
        { status: 400 }
      );
    }

    // Validation de la longueur du nom
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Le nom doit contenir entre 2 et 100 caractères' },
        { status: 400 }
      );
    }

    // Validation du format email avec validator.js (plus sûr)
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation du téléphone avec validator.js
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      return NextResponse.json(
        { success: false, error: 'Numéro de téléphone invalide' },
        { status: 400 }
      );
    }
    
    // Vérifier la longueur des chiffres (10-15)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Le numéro doit contenir entre 10 et 15 chiffres' },
        { status: 400 }
      );
    }

    // Validation de la longueur du message
    if (message.length < 20) {
      return NextResponse.json(
        { success: false, error: 'Le message doit contenir au moins 20 caractères' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Le message ne peut pas dépasser 1000 caractères' },
        { status: 400 }
      );
    }

    // Vérifier les patterns suspects (tentatives d'injection)
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i, // onclick, onload, etc.
      /eval\(/i,
      /expression\(/i,
    ];

    const allText = `${name} ${email} ${phone} ${message} ${subject} ${budget}`;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allText)) {
        console.warn('⚠️ Tentative d\'injection détectée:', allText);
        return NextResponse.json(
          { success: false, error: 'Contenu suspect détecté. Veuillez vérifier votre saisie.' },
          { status: 400 }
        );
      }
    }

    // Vérifier la configuration Gmail
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Configuration Gmail manquante');
      return NextResponse.json(
        { success: false, error: 'Service d\'email non configuré. Veuillez me contacter directement par email.' },
        { status: 500 }
      );
    }

    // 1️⃣ SAUVEGARDER LE MESSAGE EN BDD (prioritaire)
    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
      subject: subject || undefined,
      budget: budget || undefined,
      status: 'unread',
      ip,
      emailSent: false,
    });


    // 2️⃣ ENVOYER L'EMAIL (secondaire)
    let emailSuccess = false;
    try {
      // Préparer le contenu de l'email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Vous recevez l'email sur votre propre adresse
      replyTo: email, // Pour répondre directement au client
      subject: `📩 Nouveau message de ${name} - Portfolio`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #3B82F6;
              }
              .field-label {
                font-weight: bold;
                color: #3B82F6;
                margin-bottom: 5px;
              }
              .field-value {
                color: #1f2937;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">📬 Nouveau Message</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Depuis votre portfolio</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Nom</div>
                  <div class="field-value">${name}</div>
                </div>

                <div class="field">
                  <div class="field-label">✉️ Email</div>
                  <div class="field-value"><a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a></div>
                </div>

                ${phone ? `
                <div class="field">
                  <div class="field-label">📱 Téléphone</div>
                  <div class="field-value"><a href="tel:${phone}" style="color: #3B82F6; text-decoration: none;">${phone}</a></div>
                </div>
                ` : ''}

                ${subject ? `
                <div class="field">
                  <div class="field-label">🎯 Service demandé</div>
                  <div class="field-value">${subject}</div>
                </div>
                ` : ''}

                ${budget ? `
                <div class="field">
                  <div class="field-label">💰 Budget</div>
                  <div class="field-value">${budget}</div>
                </div>
                ` : ''}

                <div class="field">
                  <div class="field-label">💬 Message</div>
                  <div class="field-value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>

              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact de votre portfolio NFDev21</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nouveau message de ${name}

Email: ${email}
${phone ? `Téléphone: ${phone}` : ''}
${subject ? `Service: ${subject}` : ''}
${budget ? `Budget: ${budget}` : ''}

Message:
${message}
      `,
    };

      // Envoyer l'email
      await transporter.sendMail(mailOptions);
      emailSuccess = true;

      // Mettre à jour le message en BDD
      await Message.findByIdAndUpdate(newMessage._id, {
        emailSent: true,
        emailSentAt: new Date(),
      });


    } catch (emailError) {
      console.error('⚠️ Erreur lors de l\'envoi de l\'email:', emailError);
      // L'email a échoué mais le message est en BDD
      emailSuccess = false;
    }

    // ✅ TOUJOURS RETOURNER UN SUCCÈS (message en BDD)
    return NextResponse.json({
      success: true,
      message: emailSuccess 
        ? 'Message envoyé avec succès ! Je vous répondrai sous 24h.'
        : 'Message reçu ! Je vous répondrai rapidement par email.',
      emailSent: emailSuccess,
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement du message:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement.' 
      },
      { status: 500 }
    );
  }
}

