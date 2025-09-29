# 🏗️ Modèles - Portfolio NFDev21

## 📋 Table des matières

- [User](#1-user)
- [Project](#2-project)
- [Service](#3-service)
- [BlogPost](#4-blogpost)
- [Message](#5-message)
- [Image](#6-image)
- [Role & Permission](#7-role--permission)

---

## 1️⃣ User

**Collection** : USERS  
**Description** : Gestion des utilisateurs et administrateurs

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| name          | String  | ✅         | Nom complet de l'utilisateur |
| email         | String  | ✅         | Adresse email (unique) |
| password      | String  | ✅         | Mot de passe hashé |
| role          | String  | ✅         | Rôle : 'user', 'admin', 'superadmin' |
| avatar        | String  | ❌         | URL de l'avatar |
| bio           | String  | ❌         | Biographie courte |
| location      | String  | ❌         | Localisation géographique |
| social_links  | Object  | ❌         | Liens réseaux sociaux |
| skills        | Array   | ❌         | Compétences techniques |
| experience    | Array   | ❌         | Expériences professionnelles |
| education     | Array   | ❌         | Formations et diplômes |
| createdAt     | Date    | ✅         | Date de création |
| updatedAt     | Date    | ✅         | Date de modification |

---

## 2️⃣ Project

**Collection** : PROJECTS  
**Description** : Projets du portfolio

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| title         | String  | ✅         | Titre du projet |
| description   | String  | ✅         | Description détaillée du projet |
| images        | Array   | ❌         | Liste des URLs d'images (Cloudinary) |
| technologies  | Array   | ✅         | Technologies utilisées (React, Next.js, MongoDB, etc.) |
| link          | String  | ❌         | Lien vers projet en ligne ou GitHub |
| type          | String  | ✅         | Type : web, mobile, fullstack, data, autre |
| createdBy     | ObjectId| ✅         | Référence vers _id utilisateur (admin) |
| createdAt     | Date    | ✅         | Date de création |
| updatedAt     | Date    | ✅         | Date de modification |

---

## 3️⃣ Service

**Collection** : SERVICES  
**Description** : Services proposés sur le portfolio

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| title         | String  | ✅         | Nom du service |
| description   | String  | ✅         | Description du service |
| icon          | String  | ❌         | URL ou nom d'icône associée |
| createdAt     | Date    | ✅         | Date de création |
| updatedAt     | Date    | ✅         | Date de modification |

---

## 4️⃣ BlogPost

**Collection** : BLOG_POSTS  
**Description** : Articles de blog

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| title         | String  | ✅         | Titre de l'article |
| content       | String  | ✅         | Contenu de l'article |
| authorId      | ObjectId| ✅         | Référence vers _id utilisateur (admin) |
| tags          | Array   | ❌         | Liste de tags pour filtrage |
| createdAt     | Date    | ✅         | Date de création |
| updatedAt     | Date    | ✅         | Date de modification |

---

## 5️⃣ Message

**Collection** : MESSAGES  
**Description** : Formulaire de contact

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| name          | String  | ✅         | Nom de la personne |
| email         | String  | ✅         | Email de contact |
| subject       | String  | ✅         | Sujet du message |
| message       | String  | ✅         | Contenu du message |
| status        | String  | ✅         | Statut : new, read, answered |
| createdAt     | Date    | ✅         | Date de réception |
| updatedAt     | Date    | ✅         | Date de dernière modification |

---

## 6️⃣ Image

**Collection** : IMAGES  
**Description** : Médias Cloudinary

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| ✅         | Identifiant unique MongoDB |
| url           | String  | ✅         | URL de l'image |
| alt           | String  | ❌         | Texte alternatif |
| projectId     | ObjectId| ✅         | Référence vers _id projet associé |
| createdAt     | Date    | ✅         | Date d'upload |
| updatedAt     | Date    | ✅         | Date de modification |

---

## 7️⃣ Role & Permission

**Collection** : ROLES & PERMISSIONS  
**Description** : Gestion des rôles et permissions

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| role          | String  | ✅         | Nom du rôle : superadmin, admin, editor |
| permissions   | Array   | ✅         | Liste des permissions : createProject, editProject, deleteProject, etc. |
