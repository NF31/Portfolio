# Modèles - Portfolio NFDev21

## Table des matières

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
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| name          | String  | Oui         | Nom complet de l'utilisateur |
| email         | String  | Oui         | Adresse email (unique) |
| password      | String  | Oui         | Mot de passe hashé |
| role          | String  | Oui         | Rôle : 'user', 'admin', 'superadmin' |
| avatar        | String  | Non         | URL de l'avatar |
| bio           | String  | Non         | Biographie courte |
| location      | String  | Non         | Localisation géographique |
| social_links  | Object  | Non         | Liens réseaux sociaux |
| skills        | Array   | Non         | Compétences techniques |
| experience    | Array   | Non         | Expériences professionnelles |
| education     | Array   | Non         | Formations et diplômes |
| createdAt     | Date    | Oui         | Date de création |
| updatedAt     | Date    | Oui         | Date de modification |

---

## 2️⃣ Project

**Collection** : PROJECTS  
**Description** : Projets du portfolio

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| title         | String  | Oui         | Titre du projet |
| description   | String  | Oui         | Description détaillée du projet |
| images        | Array   | Non         | Liste des URLs d'images (Cloudinary) |
| technologies  | Array   | Oui         | Technologies utilisées (React, Next.js, MongoDB, etc.) |
| link          | String  | Non         | Lien vers projet en ligne ou GitHub |
| type          | String  | Oui         | Type : web, mobile, fullstack, data, autre |
| createdBy     | ObjectId| Oui         | Référence vers _id utilisateur (admin) |
| createdAt     | Date    | Oui         | Date de création |
| updatedAt     | Date    | Oui         | Date de modification |

---

## 3️⃣ Service

**Collection** : SERVICES  
**Description** : Services proposés sur le portfolio

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| title         | String  | Oui         | Nom du service |
| description   | String  | Oui         | Description du service |
| icon          | String  | Non         | URL ou nom d'icône associée |
| createdAt     | Date    | Oui         | Date de création |
| updatedAt     | Date    | Oui         | Date de modification |

---

## 4️⃣ BlogPost

**Collection** : BLOG_POSTS  
**Description** : Articles de blog

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| title         | String  | Oui         | Titre de l'article |
| content       | String  | Oui         | Contenu de l'article |
| authorId      | ObjectId| Oui         | Référence vers _id utilisateur (admin) |
| tags          | Array   | Non         | Liste de tags pour filtrage |
| createdAt     | Date    | Oui         | Date de création |
| updatedAt     | Date    | Oui         | Date de modification |

---

## 5️⃣ Message

**Collection** : MESSAGES  
**Description** : Formulaire de contact

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| name          | String  | Oui         | Nom de la personne |
| email         | String  | Oui         | Email de contact |
| subject       | String  | Oui         | Sujet du message |
| message       | String  | Oui         | Contenu du message |
| status        | String  | Oui         | Statut : new, read, answered |
| createdAt     | Date    | Oui         | Date de réception |
| updatedAt     | Date    | Oui         | Date de dernière modification |

---

## 6️⃣ Image

**Collection** : IMAGES  
**Description** : Médias Cloudinary

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| _id           | ObjectId| Oui         | Identifiant unique MongoDB |
| url           | String  | Oui         | URL de l'image |
| alt           | String  | Non         | Texte alternatif |
| projectId     | ObjectId| Oui         | Référence vers _id projet associé |
| createdAt     | Date    | Oui         | Date d'upload |
| updatedAt     | Date    | Oui         | Date de modification |

---

## 7️⃣ Role & Permission

**Collection** : ROLES & PERMISSIONS  
**Description** : Gestion des rôles et permissions

| Attribut      | Type     | Obligatoire | Description |
|---------------|---------|------------|-------------|
| role          | String  | Oui         | Nom du rôle : superadmin, admin, editor |
| permissions   | Array   | Oui         | Liste des permissions : createProject, editProject, deleteProject, etc. |
