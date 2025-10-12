const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Schéma User simplifié pour le script
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model('User', UserSchema);

async function changePassword() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connecté à MongoDB');

    // Récupérer les arguments de la ligne de commande
    const email = process.argv[2];
    const newPassword = process.argv[3];

    if (!email || !newPassword) {
      console.log('❌ Usage: node scripts/change-password.js <email> <nouveau_mot_de_passe>');
      console.log('   Exemple: node scripts/change-password.js admin@portfolio.com monNouveauMotDePasse123');
      process.exit(1);
    }

    // Rechercher l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log(`❌ Utilisateur avec l'email "${email}" non trouvé !`);
      process.exit(1);
    }

    // Créer le nouveau mot de passe hashé
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe
    user.password = hashedPassword;
    user.updatedAt = new Date();
    await user.save();
    
    console.log('✅ Mot de passe mis à jour avec succès !');
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Nom: ${user.name}`);
    console.log(`🔑 Nouveau mot de passe: ${newPassword}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du changement de mot de passe:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
    process.exit(0);
  }
}

// Exécuter le script
changePassword();
