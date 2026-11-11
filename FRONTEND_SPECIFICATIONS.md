# Spécifications Front-end - Portfolio NFDev21

## Vue d'ensemble
Ce document décrit **toutes les pages, composants et interactions front-end** du portfolio développé avec Next.js + TypeScript.  
Il détaille le comportement attendu côté utilisateur (visiteur) et côté admin.

---

## 1️⃣ Pages front-office (visiteurs)

### `index.tsx` - Accueil
- Affiche : Slider ou bannière avec présentation courte.
- Liste des projets récents (`ProjectCard`), services (`ServiceCard`) et compétences (`SkillCard`).
- CTA : Lien vers page contact et projets.
- Responsive design mobile/tablette/desktop.

### `projects/[id].tsx` - Détail projet
- Affiche : Titre, description, images, technologies, lien GitHub ou démo.
- Composants : `ProjectCard`, `Modal` pour images.
- CTA : Retour à la liste des projets.

### `services/[id].tsx` - Détail service
- Affiche : Titre, description, icône.
- Liste des projets liés si applicable.

### `about.tsx` - À propos
- Affiche : Photo, bio, parcours académique, expériences.

### `contact.tsx` - Contact
- Formulaire : Nom, email, sujet, message.
- Validation côté client :
  - Email valide.
  - Champs obligatoires.
  - Message minimum 10 caractères.
- Confirmation / erreur après envoi.

---

## 2️⃣ Pages back-office (admin)

### `admin/index.tsx` - Dashboard
- Vue globale des projets, services, messages non lus.
- Statistiques (optionnel).

### CRUD Projets (`admin/projects/`)
- `add.tsx` : Formulaire ajouter projet.
  - Champs : titre, description, type (web, mobile, fullstack, data, autre), technologies (multi-select), images (Cloudinary), lien.
  - Validation : champs obligatoires, messages d’erreur (voir `Validation_métiers.md`).
- `edit/[id].tsx` : Modifier projet.
- `list.tsx` : Liste des projets avec boutons modifier / supprimer.

### CRUD Services (`admin/services/`)
- Ajouter / modifier / supprimer / lister services.
- Validation et messages d’erreur similaires aux projets.

### CRUD Compétences (`admin/skills/`)
- Ajouter / modifier / supprimer compétences techniques ou soft skills.

### Blog Admin (`admin/blog/`)
- Ajouter / modifier / supprimer articles.
- Champs : titre, contenu, tags, image.

### Messages (`admin/messages/`)
- Liste des messages reçus.
- Voir détail et répondre.
- Filtrage par statut (new, read, answered).

### Images (`admin/images/`)
- Upload Cloudinary pour projets ou services.
- Liste et suppression d’images.

---

## 3️⃣ Composants réutilisables

| Composant | Description | Props |
|-----------|------------|------|
| `ProjectCard` | Carte projet (image, titre, technologies) | `project` |
| `ServiceCard` | Carte service | `service` |
| `SkillCard` | Carte compétence | `skill` |
| `BlogCard` | Carte article | `article` |
| `ContactForm` | Formulaire de contact | `onSubmit` |
| `Modal` | Pop-up générique | `isOpen`, `onClose`, `children` |
| `AdminSidebar` | Barre de navigation admin | `links` |

---

## 4️⃣ Comportements et interactions

- Responsive : mobile, tablette, desktop.
- Feedback utilisateur : loaders, messages d’erreur, confirmation.
- Validation : obligatoire avant envoi (front-end + back-end).
- Gestion des erreurs API : affichage de toast / alert.
