import nodemailer from 'nodemailer';

// Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Votre adresse Gmail
    pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
  },
});

// Vérifier la connexion au démarrage
transporter.verify((error) => {
  if (error) {
    console.error('❌ Erreur de configuration email:', error);
  } else {
    console.log('✅ Serveur email prêt à envoyer des messages');
  }
});

export default transporter;

