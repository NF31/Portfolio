# 📖 WORKFLOWS – Portfolio NFDev21

## 🎯 Vue d'ensemble

Ce document décrit **tous les workflows** pour le projet portfolio développeur **NFDev21**.  
Il couvre les fonctionnalités côté **Admin** (CRUD, gestion des contenus) et côté **Visiteur** (consultation des contenus).  

Chaque workflow indique :  
- Les **étapes détaillées** du processus  
- Les fichiers front-end (`.tsx`)  
- Les fichiers API (`.ts`)  
- La collection MongoDB correspondante  
- Les services externes utilisés (ex: Cloudinary pour les images)  

---

## 1️⃣ Gestion des projets (CRUD)

**Acteur :** Admin  
**Description :** Ajouter, modifier, supprimer et lister des projets dans le portfolio.

### Étapes du workflow “Ajouter un projet”
1. L’admin ouvre `/pages/admin/projects/add.tsx`.
2. Il remplit le formulaire avec : titre, description, technologies, type, images, lien démo.
3. Les images sont uploadées via le composant Cloudinary.
4. Le formulaire envoie les données à `/pages/api/projects/create.ts`.
5. L’API valide les données et crée un nouveau document dans `PROJECTS`.
6. L’admin reçoit une confirmation et voit le projet dans `/pages/admin/projects/index.tsx`.

### Étapes du workflow “Modifier un projet”
1. L’admin ouvre `/pages/admin/projects/edit/[id].tsx`.
2. Le formulaire est prérempli avec les données existantes du projet.
3. L’admin modifie les champs souhaités et peut ajouter/supprimer des images.
4. Les modifications sont envoyées à `/pages/api/projects/update.ts`.
5. L’API met à jour le document dans `PROJECTS` et Cloudinary si nécessaire.
6. Confirmation affichée à l’admin.

### Étapes du workflow “Supprimer un projet”
1. L’admin clique sur le bouton Delete dans `/pages/admin/projects/index.tsx`.
2. Une confirmation est demandée (popup modal).
3. L’API `/pages/api/projects/delete.ts` supprime le document dans `PROJECTS` et supprime les images sur Cloudinary.
4. L’admin voit que le projet n’apparaît plus dans la liste.

### Front-office projets
1. Le visiteur ouvre `/pages/projects.tsx`.
2. Le front récupère les projets via `/pages/api/projects/getAll.ts`.
3. Les projets s’affichent avec détails, images et lien démo.

---

## 2️⃣ Gestion des services (CRUD)

**Acteur :** Admin

### Étapes du workflow “Ajouter un service”
1. L’admin ouvre `/pages/admin/services/add.tsx`.
2. Il remplit le formulaire : titre, description, icône.
3. Formulaire envoyé à `/pages/api/services/create.ts`.
4. API crée le service dans `SERVICES`.
5. Confirmation et affichage dans `/pages/admin/services/index.tsx`.

### Étapes du workflow “Modifier un service”
1. L’admin ouvre `/pages/admin/services/edit/[id].tsx`.
2. Formulaire prérempli avec données existantes.
3. Modifications envoyées à `/pages/api/services/update.ts`.
4. API met à jour le document.

### Étapes du workflow “Supprimer un service”
1. L’admin clique sur Delete.
2. Confirmation demandée.
3. `/pages/api/services/delete.ts` supprime le service.

### Front-office services
1. Visiteur ouvre `/pages/services.tsx`.
2. API `/pages/api/services/getAll.ts` récupère les services.
3. Les services s’affichent aux visiteurs.

---

## 3️⃣ Gestion des compétences (CRUD)

**Acteur :** Admin

### Étapes
- Ajouter, modifier, supprimer compétences suivent le même workflow que pour les services/projets.
- Front-office : `/pages/skills.tsx` pour l’affichage.

---

## 4️⃣ Section “À propos”

**Acteur :** Admin
1. Admin ouvre `/pages/admin/about.tsx`.
2. Modifie biographie, parcours, expériences et photo.
3. Formulaire envoyé à `/pages/api/about/update.ts`.
4. Front-office : `/pages/about.tsx` récupère `/pages/api/about/get.ts`.

---

## 5️⃣ Blog / Articles (optionnel)

**Acteur :** Admin  
**Front-office :** Visiteur

### Workflow Ajouter article
1. Admin ouvre `/pages/admin/blog/add.tsx`.
2. Remplit formulaire : titre, contenu, tags.
3. Soumission à `/pages/api/blog/create.ts`.
4. Article créé dans `BLOG_POSTS`.

### Workflow Modifier / Supprimer article
- `/pages/admin/blog/edit/[id].tsx` pour modifier.
- `/pages/api/blog/delete.ts` pour supprimer.

### Front-office blog
- `/pages/blog.tsx` récupère via `/pages/api/blog/getAll.ts`.

---

## 6️⃣ Messages / Contact

**Acteur :** Visiteur / Admin

### Envoyer message
1. Visiteur ouvre `/pages/contact.tsx`.
2. Remplit formulaire et envoie à `/pages/api/messages/create.ts`.
3. Message enregistré dans `MESSAGES`.
4. Admin reçoit notification et peut répondre via `/pages/admin/messages/reply/[id].tsx`.

---

## 7️⃣ Gestion des images / médias

**Acteur :** Admin

1. Ajouter images via Cloudinary dans add/edit Project/Service.
2. Supprimer image via bouton Delete.
3. Fichiers API : `/pages/api/images/upload.ts` et `/pages/api/images/delete.ts`.

---

## 8️⃣ Rôles et authentification

**Acteur :** Admin / Super Admin

### Étapes
1. Se connecter via `/pages/admin/login.tsx` → API `/pages/api/auth/login.ts`.
2. Gérer rôles via `/pages/admin/roles/index.tsx` → API `/pages/api/roles/*`.
3. Permissions stockées dans `ROLES & PERMISSIONS`.

---

## ✅ Conclusion

Ce document décrit **tous les workflows étape par étape** pour le portfolio NFDev21.  
Il servira de base pour :  
- La conception des modèles (Models / DTO)  
- Le dictionnaire de données  
- L’organisation des fichiers front-end et API  
- Le développement complet du back-office et du front-office
