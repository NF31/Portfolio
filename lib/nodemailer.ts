import nodemailer from 'nodemailer';

// Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Votre adresse Gmail
    pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
  },
});

// Vérifier la connexion uniquement en runtime (pas pendant le build)
// Ne pas vérifier pendant le build Next.js (quand NEXT_PHASE est défini)
if (
  typeof window === 'undefined' && 
  process.env.GMAIL_USER && 
  process.env.GMAIL_APP_PASSWORD &&
  !process.env.NEXT_PHASE // NEXT_PHASE est défini pendant le build
) {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Erreur de configuration email:', error);
    } else {
      console.log('✅ Serveur email prêt à envoyer des messages');
    }
  });
}

export default transporter;

