# DICTIONNAIRE DES DONNÉES - Portfolio NFDev21

## Table des matières

- [Introduction](#introduction)
- [Collections MongoDB](#collections-mongodb)
- [Relations entre entités](#relations-entre-entités)

---

## Introduction

Ce dictionnaire des données documente l'architecture complète de la base de données MongoDB pour le portfolio NFDev21. Il définit toutes les collections, leurs attributs, types de données et relations principales.

### Stack technique
- Base de données : MongoDB 6.0+
- ORM : Mongoose / Laravel MongoDB
- Gestion des médias : Cloudinary
- Frontend & Backend : Next.js fullstack
- Styling : Tailwind CSS

### Conventions
- Type de données : String, Number, Boolean, Date, ObjectId, Array, Object
- Obligatoire : /
- Index / Unique : /

---

## Collections MongoDB

### 1. USERS (Administrateurs / Éditeurs)

Description : Gestion des utilisateurs et administrateurs du portfolio.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `name`      | String  | Oui        | -     | Nom complet de l’utilisateur |
| `email`     | String  | Oui        |   | Email de connexion (unique) |
| `password`  | String  | Oui        | -     | Mot de passe hashé |
| `role`      | String  | Oui        |     | Rôle de l’utilisateur (superadmin, admin, editor) |
| `createdAt` | Date    | Oui        |     | Date de création du compte |
| `updatedAt` | Date    | Oui        | -     | Date de dernière modification |

---

### 2. PROJECTS (Projets du portfolio)

Description : Projets présentés dans le portfolio, avec type et technologies utilisées.

**Attributs principaux :**

| Attribut       | Type     | Obligatoire | Index | Description |
|----------------|---------|------------|-------|-------------|
| `_id`          | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `title`        | String  | Oui        | -     | Titre du projet |
| `description`  | String  | Oui        | -     | Description détaillée du projet |
| `images`       | Array   | Non        | -     | Liste des URLs d’images sur Cloudinary |
| `technologies` | Array   | Oui        |     | Technologies utilisées (React, Next.js, MongoDB, etc.) |
| `link`         | String  | Non        | -     | Lien vers le projet en ligne ou repo GitHub |
| `type`         | String  | Oui        |     | Type de projet (web, mobile, fullstack, data, autre) |
| `createdBy`    | ObjectId| Oui        |     | Référence vers _id de l’utilisateur ayant créé le projet |
| `createdAt`    | Date    | Oui        |     | Date de création |
| `updatedAt`    | Date    | Oui        | -     | Date de dernière modification |

---

### 3. SERVICES (Services proposés)

Description : Services mis en avant sur le portfolio.

**Attributs principaux :**

| Attribut      | Type     | Obligatoire | Index | Description |
|---------------|---------|------------|-------|-------------|
| `_id`         | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `title`       | String  | Oui        | -     | Nom du service |
| `description` | String  | Oui        | -     | Description du service |
| `icon`        | String  | Non        | -     | URL ou nom d’icône associée |
| `createdAt`   | Date    | Oui        |     | Date de création |
| `updatedAt`   | Date    | Oui        | -     | Date de dernière modification |

---

### 4. BLOG_POSTS (Articles de blog)

Description : Articles publiés sur le portfolio.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `title`     | String  | Oui        | -     | Titre de l’article |
| `content`   | String  | Oui        | -     | Contenu de l’article |
| `authorId`  | ObjectId| Oui        |     | Référence vers _id de l’utilisateur (admin) |
| `tags`      | Array   | Non        | -     | Liste de tags pour filtrage |
| `createdAt` | Date    | Oui        |     | Date de création |
| `updatedAt` | Date    | Oui        | -     | Date de dernière modification |

---

### 5. MESSAGES (Formulaire de contact)

Description : Messages reçus via le formulaire de contact.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `name`      | String  | Oui        | -     | Nom de la personne ayant envoyé le message |
| `email`     | String  | Oui        |   | Email de contact |
| `subject`   | String  | Oui        | -     | Sujet du message |
| `message`   | String  | Oui        | -     | Contenu du message |
| `status`    | String  | Oui        | -     | Statut du message (new, read, answered) |
| `createdAt` | Date    | Oui        |     | Date de réception |
| `updatedAt` | Date    | Oui        | -     | Date de dernière modification |

---

### 6. IMAGES (Médias Cloudinary)

Description : Images associées aux projets.

**Attributs principaux :**

| Attribut    | Type     | Obligatoire | Index | Description |
|------------|---------|------------|-------|-------------|
| `_id`       | ObjectId| Oui        |     | Identifiant unique MongoDB |
| `url`       | String  | Oui        | -     | URL de l’image |
| `alt`       | String  | Non        | -     | Texte alternatif pour accessibilité |
| `projectId` | ObjectId| Oui        |     | Référence vers _id du projet associé |
| `createdAt` | Date    | Oui        |     | Date d’upload |
| `updatedAt` | Date    | Oui        | -     | Date de dernière modification |

---

### 7. ROLES & PERMISSIONS

Description : Gestion des rôles et permissions des utilisateurs.

**Attributs principaux :**

| Attribut     | Type     | Obligatoire | Index | Description |
|-------------|---------|------------|-------|-------------|
| `role`      | String  | Oui        |     | Nom du rôle (superadmin, admin, editor) |
| `permissions`| Array  | Oui        | -     | Liste des permissions accordées (createProject, editProject, deleteProject, etc.) |

---

## Relations entre entités

- USERS → PROJECTS : crée  
- USERS → MESSAGES : reçoit  
- PROJECTS → IMAGES : contient  
- PROJECTS → SERVICES : associe  
- ROLES → USERS : attribué à
