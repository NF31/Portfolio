# 📚 DICTIONNAIRE DES DONNÉES - Portfolio NFDev21

## 📋 Table des matières

- [🎯 Introduction](#-introduction)
- [🗄️ Collections MongoDB](#-collections-mongodb)
- [🔗 Relations entre entités](#-relations-entre-entités)

---

## 🎯 Introduction

Ce dictionnaire des données documente l'architecture complète de la base de données MongoDB pour le portfolio NFDev21. Il définit toutes les collections, leurs attributs, types de données et relations principales.

### 🛠️ Stack technique
- Base de données : MongoDB 6.0+
- ORM : Mongoose / Laravel MongoDB
- Gestion des médias : Cloudinary
- Frontend & Backend : Next.js fullstack
- Styling : Tailwind CSS

### Conventions
- Type de données : String, Number, Boolean, Date, ObjectId, Array, Object
- Obligatoire : ✅ / ❌
- Index / Unique : 🔍 / 📍

---

## 🗄️ Collections MongoDB

### 1. USERS (Administrateurs / Éditeurs)

Description : Gestion des utilisateurs et administrateurs du portfolio.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `name`      | String  | ✅        | -     | Nom complet de l’utilisateur |
| `email`     | String  | ✅        | 🔍📍  | Email de connexion (unique) |
| `password`  | String  | ✅        | -     | Mot de passe hashé |
| `role`      | String  | ✅        | 🔍    | Rôle de l’utilisateur (superadmin, admin, editor) |
| `createdAt` | Date    | ✅        | 🔍    | Date de création du compte |
| `updatedAt` | Date    | ✅        | -     | Date de dernière modification |

---

### 2. PROJECTS (Projets du portfolio)

Description : Projets présentés dans le portfolio, avec type et technologies utilisées.

**Attributs principaux :**

| Attribut       | Type     | Obligatoire | Index | Description |
|----------------|---------|------------|-------|-------------|
| `_id`          | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `title`        | String  | ✅        | -     | Titre du projet |
| `description`  | String  | ✅        | -     | Description détaillée du projet |
| `images`       | Array   | ❌        | -     | Liste des URLs d’images sur Cloudinary |
| `technologies` | Array   | ✅        | 🔍    | Technologies utilisées (React, Next.js, MongoDB, etc.) |
| `link`         | String  | ❌        | -     | Lien vers le projet en ligne ou repo GitHub |
| `type`         | String  | ✅        | 🔍    | Type de projet (web, mobile, fullstack, data, autre) |
| `createdBy`    | ObjectId| ✅        | 🔍    | Référence vers _id de l’utilisateur ayant créé le projet |
| `createdAt`    | Date    | ✅        | 🔍    | Date de création |
| `updatedAt`    | Date    | ✅        | -     | Date de dernière modification |

---

### 3. SERVICES (Services proposés)

Description : Services mis en avant sur le portfolio.

**Attributs principaux :**

| Attribut      | Type     | Obligatoire | Index | Description |
|---------------|---------|------------|-------|-------------|
| `_id`         | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `title`       | String  | ✅        | -     | Nom du service |
| `description` | String  | ✅        | -     | Description du service |
| `icon`        | String  | ❌        | -     | URL ou nom d’icône associée |
| `createdAt`   | Date    | ✅        | 🔍    | Date de création |
| `updatedAt`   | Date    | ✅        | -     | Date de dernière modification |

---

### 4. BLOG_POSTS (Articles de blog)

Description : Articles publiés sur le portfolio.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `title`     | String  | ✅        | -     | Titre de l’article |
| `content`   | String  | ✅        | -     | Contenu de l’article |
| `authorId`  | ObjectId| ✅        | 🔍    | Référence vers _id de l’utilisateur (admin) |
| `tags`      | Array   | ❌        | -     | Liste de tags pour filtrage |
| `createdAt` | Date    | ✅        | 🔍    | Date de création |
| `updatedAt` | Date    | ✅        | -     | Date de dernière modification |

---

### 5. MESSAGES (Formulaire de contact)

Description : Messages reçus via le formulaire de contact.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `name`      | String  | ✅        | -     | Nom de la personne ayant envoyé le message |
| `email`     | String  | ✅        | 🔍📍  | Email de contact |
| `subject`   | String  | ✅        | -     | Sujet du message |
| `message`   | String  | ✅        | -     | Contenu du message |
| `status`    | String  | ✅        | -     | Statut du message (new, read, answered) |
| `createdAt` | Date    | ✅        | 🔍    | Date de réception |
| `updatedAt` | Date    | ✅        | -     | Date de dernière modification |

---

### 6. IMAGES (Médias Cloudinary)

Description : Images associées aux projets.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| ✅        | 🔍    | Identifiant unique MongoDB |
| `url`       | String  | ✅        | -     | URL de l’image |
| `alt`       | String  | ❌        | -     | Texte alternatif pour accessibilité |
| `projectId` | ObjectId| ✅        | 🔍    | Référence vers _id du projet associé |
| `createdAt` | Date    | ✅        | 🔍    | Date d’upload |
| `updatedAt` | Date    | ✅        | -     | Date de dernière modification |

---

### 7. ROLES & PERMISSIONS

Description : Gestion des rôles et permissions des utilisateurs.

**Attributs principaux :**

| Attribut     | Type     | Obligatoire | Index | Description |
|-------------|---------|------------|-------|-------------|
| `role`      | String  | ✅        | 🔍    | Nom du rôle (superadmin, admin, editor) |
| `permissions`| Array  | ✅        | -     | Liste des permissions accordées (createProject, editProject, deleteProject, etc.) |

---

## 🔗 Relations entre entités

- USERS → PROJECTS : crée  
- USERS → MESSAGES : reçoit  
- PROJECTS → IMAGES : contient  
- PROJECTS → SERVICES : associe  
- ROLES → USERS : attribué à
