# 📖 USE_CASES_USER_STORIES – Portfolio NFDev21

## 🎯 Vue d'ensemble
Ce document décrit **tous les cas d'utilisation (Use Cases) et user stories** pour le projet de portfolio développeur NFDev21.  
Il couvre les fonctionnalités côté **Admin** (gestion des contenus) et côté **Visiteur** (consultation du portfolio).  
Il inclut également des précisions sur les types de projets, validations de formulaires, et utilisation de Cloudinary pour les médias.

---

## 1️⃣ Gestion des projets

### **UC1 : Ajouter un projet**
- **Acteur :** Admin
- **Description :** Permet d’ajouter un nouveau projet avec titre, description, technologies utilisées, type de projet, images (Cloudinary), et lien démo.
- **User Stories :**
  1. En tant qu’admin, je veux ajouter un projet pour montrer mes réalisations.
  2. En tant que visiteur, je veux voir les projets récents avec détails, images et lien démo.
  3. En tant qu’admin, je veux sélectionner le type du projet (web, mobile, fullstack, autre).

### **UC2 : Modifier un projet**
- **Acteur :** Admin
- **Description :** Mettre à jour les informations d’un projet existant.
- **User Stories :**
  1. En tant qu’admin, je veux modifier un projet pour corriger ou améliorer son contenu.

### **UC3 : Supprimer un projet**
- **Acteur :** Admin
- **Description :** Supprimer un projet obsolète.
- **User Stories :**
  1. En tant qu’admin, je veux supprimer un projet terminé pour garder le portfolio à jour.

---

## 2️⃣ Gestion des services

### **UC4 : Ajouter un service**
- **Acteur :** Admin
- **Description :** Ajouter un service proposé (ex : développement web, conseils, coaching).
- **User Stories :**
  1. En tant qu’admin, je veux ajouter un service pour informer les visiteurs de mes offres.
  2. En tant que visiteur, je veux voir les services proposés pour comprendre les compétences de NFDev21.
  3. En tant qu’admin, je veux pouvoir associer une icône ou image (Cloudinary) au service.

### **UC5 : Modifier un service**
- **Acteur :** Admin
- **Description :** Mettre à jour un service existant.
- **User Stories :**
  1. En tant qu’admin, je veux modifier un service pour le rendre plus précis ou à jour.

### **UC6 : Supprimer un service**
- **Acteur :** Admin
- **Description :** Supprimer un service obsolète.
- **User Stories :**
  1. En tant qu’admin, je veux retirer un service pour ne pas montrer d’informations erronées.

---

## 3️⃣ Gestion des compétences

### **UC7 : Ajouter une compétence**
- **Acteur :** Admin
- **Description :** Ajouter une compétence technique ou soft skill.
- **User Stories :**
  1. En tant qu’admin, je veux ajouter une compétence pour montrer mon expertise.
  2. En tant que visiteur, je veux voir les compétences pour évaluer mon profil technique.

### **UC8 : Modifier une compétence**
- **Acteur :** Admin
- **Description :** Mettre à jour une compétence existante.
- **User Stories :**
  1. En tant qu’admin, je veux modifier une compétence pour refléter mes progrès.

### **UC9 : Supprimer une compétence**
- **Acteur :** Admin
- **Description :** Retirer une compétence dépassée.
- **User Stories :**
  1. En tant qu’admin, je veux supprimer une compétence pour garder le portfolio pertinent.

---

## 4️⃣ Gestion de la section “À propos”

### **UC10 : Mettre à jour la présentation**
- **Acteur :** Admin
- **Description :** Modifier la biographie, photo (Cloudinary), parcours académique et expériences.
- **User Stories :**
  1. En tant qu’admin, je veux mettre à jour ma présentation pour refléter mon profil actuel.
  2. En tant que visiteur, je veux lire une description claire et complète pour comprendre le développeur.

---

## 5️⃣ Gestion du Blog / Articles (optionnel)

### **UC11 : Ajouter un article**
- **Acteur :** Admin
- **Description :** Publier un article ou tutoriel.
- **User Stories :**
  1. En tant qu’admin, je veux publier un article pour partager mes connaissances.
  2. En tant que visiteur, je veux lire des articles pour m’informer et découvrir mon expertise.

### **UC12 : Modifier un article**
- **Acteur :** Admin
- **Description :** Mettre à jour un article existant.
- **User Stories :**
  1. En tant qu’admin, je veux corriger ou enrichir un article.

### **UC13 : Supprimer un article**
- **Acteur :** Admin
- **Description :** Supprimer un article obsolète.
- **User Stories :**
  1. En tant qu’admin, je veux supprimer un article pour garder le blog pertinent.

---

## 6️⃣ Gestion du contact

### **UC14 : Recevoir un message**
- **Acteur :** Visiteur
- **Description :** Envoyer un message via le formulaire de contact (validation email, captcha).
- **User Stories :**
  1. En tant que visiteur, je veux envoyer un message pour entrer en contact avec NFDev21.
  2. En tant qu’admin, je veux recevoir les messages pour y répondre rapidement.

### **UC15 : Répondre à un message**
- **Acteur :** Admin
- **Description :** Répondre depuis l’interface admin.
- **User Stories :**
  1. En tant qu’admin, je veux répondre aux messages pour maintenir une communication efficace.

---

## 7️⃣ Gestion des images / médias

### **UC16 : Ajouter une image**
- **Acteur :** Admin
- **Description :** Ajouter des images pour projets ou services via Cloudinary.
- **User Stories :**
  1. En tant qu’admin, je veux ajouter des images pour illustrer mes projets ou services.
  2. En tant que visiteur, je veux voir des images attractives pour mieux comprendre les projets.

### **UC17 : Supprimer une image**
- **Acteur :** Admin
- **Description :** Retirer une image obsolète.
- **User Stories :**
  1. En tant qu’admin, je veux supprimer des images pour garder le portfolio propre et à jour.

---

## 8️⃣ Gestion des rôles et authentification

### **UC18 : Se connecter en admin**
- **Acteur :** Admin
- **Description :** Authentification sécurisée (email + mot de passe, éventuellement 2FA).
- **User Stories :**
  1. En tant qu’admin, je veux me connecter pour accéder à l’administration.
  2. En tant qu’admin, je veux que ma session soit sécurisée pour protéger mes données.

### **UC19 : Gérer les rôles (optionnel)**
- **Acteur :** Super Admin
- **Description :** Créer ou modifier les permissions d’accès.
- **User Stories :**
  1. En tant que super admin, je veux gérer les rôles pour contrôler l’accès aux fonctionnalités sensibles.

---

## 9️⃣ Fonctionnalités front-office (visiteur)

### **UC20 : Consulter les projets**
- **Acteur :** Visiteur
- **Description :** Voir tous les projets avec détails, images et type.
- **User Stories :**
  1. En tant que visiteur, je veux voir la liste des projets pour comprendre mes compétences.

### **UC21 : Consulter les services**
- **Acteur :** Visiteur
- **Description :** Voir tous les services proposés.
- **User Stories :**
  1. En tant que visiteur, je veux connaître les services proposés pour savoir ce que je peux offrir.

### **UC22 : Consulter les compétences**
- **Acteur :** Visiteur
- **Description :** Voir toutes les compétences.
- **User Stories :**
  1. En tant que visiteur, je veux voir mes compétences pour évaluer mon profil.

### **UC23 : Voir la section À propos**
- **Acteur :** Visiteur
- **Description :** Lire la présentation personnelle et académique.
- **User Stories :**
  1. En tant que visiteur, je veux comprendre le parcours et le profil de NFDev21.

### **UC24 : Envoyer un message**
- **Acteur :** Visiteur
- **Description :** Formulaire de contact.
- **User Stories :**
  1. En tant que visiteur, je veux envoyer un message pour contacter NFDev21.

---

## ✅ Conclusion
Ce document couvre **tous les cas d’utilisation et user stories** nécessaires pour un portfolio complet et moderne.  
Il servira de base pour **la conception des modèles, le dictionnaire de données, l’architecture et le développement**.
