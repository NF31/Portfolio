# 🌐 Plan Environnement / Déploiement - Portfolio NFDev21

## 🎯 Vue d'ensemble
Ce document décrit **l’architecture de l’environnement de développement et de production**, les variables d’environnement nécessaires, et le processus de déploiement du portfolio NFDev21 développé avec Next.js + TypeScript.

---

## 1️⃣ Environnement de développement

### 1.1 Prérequis
- Node.js >= 18
- npm ou yarn
- MongoDB (local ou Atlas)
- Cloudinary pour les images
- Git pour le contrôle de version
- Visual Studio Code ou IDE équivalent

### 1.2 Structure des dossiers
portfolio/
│
├─ node_modules/
├─ public/
├─ src/
│ ├─ pages/
│ │ ├─ index.tsx
│ │ ├─ projects/[id].tsx
│ │ ├─ services/[id].tsx
│ │ ├─ about.tsx
│ │ ├─ contact.tsx
│ │ └─ admin/
│ │ ├─ index.tsx
│ │ ├─ projects/
│ │ │ ├─ add.tsx
│ │ │ ├─ edit/[id].tsx
│ │ │ └─ list.tsx
│ │ ├─ services/
│ │ ├─ skills/
│ │ ├─ blog/
│ │ ├─ messages/
│ │ └─ images/
│ ├─ components/
│ │ ├─ ProjectCard.tsx
│ │ ├─ ServiceCard.tsx
│ │ ├─ SkillCard.tsx
│ │ ├─ BlogCard.tsx
│ │ ├─ ContactForm.tsx
│ │ ├─ Modal.tsx
│ │ └─ AdminSidebar.tsx
│ ├─ styles/
│ └─ lib/
├─ .gitignore
├─ package.json
├─ tsconfig.json
└─ next.config.ts

markdown
Copier le code

### 1.3 Variables d’environnement
Créer un fichier `.env.local` à la racine du projet avec les variables suivantes :

| Variable | Type | Description | Obligatoire |
|----------|------|-------------|-------------|
| DB_URI | string | URL de connexion à la base MongoDB (local ou Atlas) | ✅ |
| CLOUDINARY_CLOUD_NAME | string | Nom de votre cloud Cloudinary | ✅ |
| CLOUDINARY_API_KEY | string | Clé API Cloudinary | ✅ |
| CLOUDINARY_API_SECRET | string | Secret API Cloudinary | ✅ |
| SESSION_SECRET | string | Clé de signature des sessions admin, 32 caractères minimum (`openssl rand -hex 32`) | ✅ |
| SMTP_HOST | string | Serveur SMTP pour envoi d’emails | ❌ |
| SMTP_PORT | number | Port du serveur SMTP | ❌ |
| SMTP_USER | string | Utilisateur SMTP | ❌ |
| SMTP_PASS | string | Mot de passe SMTP | ❌ |

> **Note** : `.env.local` ne doit jamais être poussé sur le dépôt Git.

---

## 2️⃣ Environnement de production

### 2.1 Hébergement
- Utiliser **Vercel** pour déployer le projet Next.js.
- Connecter le projet GitHub ou GitLab.
- Configurer les variables d’environnement dans le dashboard Vercel.

### 2.2 Configuration MongoDB
- Base MongoDB Atlas en production.
- Vérifier que l’IP de Vercel est autorisée (Whitelist).

### 2.3 Configuration Cloudinary
- Utiliser le même compte Cloudinary qu’en développement ou créer un compte production.
- Vérifier les droits d’upload et de suppression d’images.

### 2.4 Déploiement
1. Commit et push sur la branche principale (`main` ou `master`).
2. Vercel détecte le projet et lance la build.
3. Build Next.js et déploiement sur l’URL fournie par Vercel.
4. Tester toutes les pages front-office et back-office.
5. Vérifier les logs pour détecter d’éventuelles erreurs.

---

## 3️⃣ Sauvegarde et maintenance
- **MongoDB** : sauvegarde automatique Atlas ou export manuel.
- **Cloudinary** : vérifier les quotas et backups.
- **Code** : versionner avec Git et créer des tags pour les releases.
- **Monitoring** : activer Vercel Analytics et/ou Sentry pour les erreurs.

---

## 4️⃣ Notes complémentaires
- Toujours utiliser le **mode développement** avec `npm run dev` avant de déployer.
- Pour **build production** : `npm run build && npm run start`.
- Tester les variables d’environnement avant chaque build.
- Documenter tout changement de structure ou variable dans le projet.