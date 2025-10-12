# 🔒 Système de Sécurité Admin

## 📋 **Vue d'ensemble**

Ce système sécurise l'accès à la partie administration du portfolio avec une authentification robuste et une URL cachée.

## 🎯 **Fonctionnalités**

### ✅ **URL Cachée**
- **URL de login** : `/system-maintenance-portal`
- **Avantage** : URL non-obvious qui ne révèle pas qu'il s'agit d'un login admin
- **Sécurité** : Empêche les attaques par force brute sur des URLs classiques comme `/admin/login`
- **Redirection** : Après connexion, redirection directe vers `/admin-dashboard`

### ✅ **Authentification**
- **Base de données** : Vérification des identifiants dans MongoDB
- **Identifiants par défaut** :
  - **Email** : `admin@portfolio.com`
  - **Mot de passe** : `admin123`
- **Session** : 24 heures de validité
- **Cookies sécurisés** : HttpOnly, Secure, SameSite=Strict
- **Hachage** : bcryptjs avec 12 rounds de sel

### ✅ **Protection des Routes**
- **Middleware** : Protège automatiquement toutes les routes `/admin/*`
- **Redirection** : Redirige vers la page de login si non authentifié
- **Expiration** : Vérifie la validité de la session

### ✅ **Interface Utilisateur**
- **Design moderne** : Page de login avec design professionnel
- **Responsive** : Adapté à tous les appareils
- **Mode sombre** : Intégré au thème du site
- **Feedback** : Messages d'erreur clairs

## 🛡️ **Sécurité**

### **Cookies Sécurisés**
```javascript
// Configuration des cookies
{
  httpOnly: true,        // Empêche l'accès via JavaScript
  secure: true,          // HTTPS uniquement en production
  sameSite: 'strict',    // Protection CSRF
  maxAge: 86400          // 24 heures
}
```

### **Middleware de Protection**
- Vérifie l'authentification sur chaque requête admin
- Redirige automatiquement si session invalide
- Empêche l'accès non autorisé

### **API Sécurisée**
- Routes `/api/auth/login` et `/api/auth/logout`
- Validation côté serveur
- Gestion des erreurs appropriée

## 📁 **Fichiers Créés/Modifiés**

### **Nouveaux Fichiers**
```
app/system-maintenance-portal/
├── page.tsx                 # Page de login cachée
└── layout.tsx              # Layout avec métadonnées sécurisées

middleware.ts               # Protection des routes admin

app/api/auth/
├── login/route.ts          # API de connexion avec BDD
└── logout/route.ts         # API de déconnexion

app/(admin)/components/
└── LogoutButton.tsx        # Bouton de déconnexion

models/
└── User.ts                 # Modèle utilisateur MongoDB

lib/
└── auth.ts                 # Utilitaires d'authentification

scripts/
├── setup-admin.js          # Script de configuration admin
├── create-admin-user.js    # Création utilisateur admin
└── change-password.js      # Changement mot de passe
```

### **Fichiers Modifiés**
```
app/(admin)/components/AdminNavbar.tsx  # Ajout du bouton de déconnexion
```

## 🚀 **Utilisation**

### **Configuration Initiale**
1. Installer les dépendances : `npm install bcryptjs @types/bcryptjs`
2. Créer l'utilisateur admin : `node scripts/setup-admin.js`
3. Vérifier la création dans la console

### **Connexion**
1. Aller sur : `votre-domaine.com/system-maintenance-portal`
2. Entrer les identifiants : `admin@portfolio.com` / `admin123`
3. Être automatiquement redirigé vers `/admin`

### **Déconnexion**
- Cliquer sur le bouton "Déconnexion" dans la navbar admin
- Être automatiquement redirigé vers la page de login

### **Accès Direct**
- Toute tentative d'accès à `/admin/*` sans authentification redirige vers la page de login

## ⚙️ **Configuration**

### **Changer le Mot de Passe**
Utiliser le script fourni :
```bash
node scripts/change-password.js admin@portfolio.com votreNouveauMotDePasse
```

### **Créer un Nouvel Admin**
Ajouter directement dans MongoDB ou créer un script personnalisé.

### **Changer l'URL de Login**
1. Renommer le dossier `app/system-maintenance-portal/`
2. Modifier l'URL dans `middleware.ts`
3. Mettre à jour les redirections

### **Durée de Session**
Modifier dans `app/api/auth/login/route.ts` :
```javascript
maxAge: 24 * 60 * 60, // Changer la durée en secondes
```

## 🛠️ **Scripts Utilitaires**

### **Configuration Initiale**
```bash
# Installer les dépendances
npm install bcryptjs @types/bcryptjs

# Créer l'utilisateur admin
node scripts/setup-admin.js
```

### **Gestion des Mots de Passe**
```bash
# Changer le mot de passe d'un utilisateur
node scripts/change-password.js admin@portfolio.com nouveauMotDePasse123

# Créer un nouvel utilisateur admin
node scripts/create-admin-user.js
```

### **Scripts Disponibles**
- `setup-admin.js` : Configuration complète avec vérifications
- `create-admin-user.js` : Création simple d'un utilisateur admin
- `change-password.js` : Changement de mot de passe sécurisé

## 🔧 **Recommandations de Sécurité**

1. **Changer le mot de passe par défaut immédiatement**
2. **Utiliser HTTPS en production**
3. **Implémenter un système de logs d'accès**
4. **Ajouter une authentification à deux facteurs (2FA)**
5. **Limiter les tentatives de connexion (rate limiting)**
6. **Sauvegarder régulièrement la base de données**

## 📝 **Notes**

- Le système est actuellement en mode développement
- Les cookies sont configurés différemment selon l'environnement (dev/prod)
- La page de login est exclue de l'indexation des moteurs de recherche
- Tous les textes sont en français pour la cohérence avec le portfolio
