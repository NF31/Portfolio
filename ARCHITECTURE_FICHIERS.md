# Architecture des fichiers - Portfolio NFDev21 (Version complète)

## Vue d'ensemble
Ce document décrit l'organisation complète des fichiers et dossiers du projet **portfolio** développé avec **Next.js + TypeScript**.  
Chaque fichier est identifié par son rôle et sa relation avec les autres composants pour faciliter le développement, la maintenance et l’évolution future.

---

## Racine du projet

| Fichier / Dossier | Type | Description |
|------------------|------|-------------|
| `node_modules/` | Dossier | Contient toutes les dépendances NPM installées. |
| `public/` | Dossier | Contient les ressources statiques (images, icônes, fichiers accessibles publiquement). |
| `src/` | Dossier | Contient tout le code source du projet (pages, composants, styles, API, utils). |
| `.gitignore` | Fichier | Liste des fichiers et dossiers à ignorer par Git. |
| `DICTIONNAIRE_DONNEES.md` | Fichier Markdown | Dictionnaire complet des données MongoDB utilisées dans le projet. |
| `MODELS.md` | Fichier Markdown | Documentation des modèles / schémas de la base de données. |
| `USE_CASES_USER_STORIES.md` | Fichier Markdown | Documentation détaillée des cas d’utilisation et user stories. |
| `Validation_métiers.md` | Fichier Markdown | Règles de validation et messages d’erreur pour les formulaires et données. |
| `WORKFLOWS.md` | Fichier Markdown | Documentation complète des workflows et processus du projet. |
| `README.md` | Fichier Markdown | Documentation principale du projet. |
| `next-env.d.ts` | Fichier TypeScript | Déclarations d’environnement pour Next.js. |
| `next.config.ts` | Fichier TypeScript | Configuration globale de Next.js. |
| `tsconfig.json` | Fichier TypeScript | Configuration du compilateur TypeScript. |
| `package.json` | Fichier | Déclarations des dépendances, scripts et métadonnées du projet. |
| `package-lock.json` | Fichier | Verrouille les versions exactes des dépendances NPM. |
| `eslint.config.mjs` | Fichier | Configuration ESLint. |
| `postcss.config.mjs` | Fichier | Configuration PostCSS / Tailwind CSS. |

---

## Dossier `src/`

### Pages

| Fichier / Dossier | Type | Description |
|------------------|------|-------------|
| `pages/index.tsx` | Page TSX | Page d’accueil (front-office pour visiteurs). |
| `pages/projects/[id].tsx` | Page TSX | Page de détail d’un projet. |
| `pages/services/[id].tsx` | Page TSX | Page de détail d’un service. |
| `pages/about.tsx` | Page TSX | Page “À propos” du développeur. |
| `pages/contact.tsx` | Page TSX | Page formulaire de contact (front-office). |

#### Admin

| Fichier / Dossier | Type | Description |
|------------------|------|-------------|
| `pages/admin/index.tsx` | Page TSX | Tableau de bord admin. |
| `pages/admin/projects/` | Dossier | CRUD projets. |
| `pages/admin/projects/add.tsx` | Page TSX | Ajouter un projet. |
| `pages/admin/projects/edit/[id].tsx` | Page TSX | Modifier un projet existant. |
| `pages/admin/projects/list.tsx` | Page TSX | Liste des projets avec options éditer/supprimer. |
| `pages/admin/services/` | Dossier | CRUD services. |
| `pages/admin/services/add.tsx` | Page TSX | Ajouter un service. |
| `pages/admin/services/edit/[id].tsx` | Page TSX | Modifier un service. |
| `pages/admin/services/list.tsx` | Page TSX | Liste des services. |
| `pages/admin/skills/` | Dossier | CRUD compétences. |
| `pages/admin/skills/add.tsx` | Page TSX | Ajouter une compétence. |
| `pages/admin/skills/edit/[id].tsx` | Page TSX | Modifier une compétence. |
| `pages/admin/skills/list.tsx` | Page TSX | Liste des compétences. |
| `pages/admin/blog/` | Dossier | CRUD articles de blog. |
| `pages/admin/blog/add.tsx` | Page TSX | Ajouter un article. |
| `pages/admin/blog/edit/[id].tsx` | Page TSX | Modifier un article. |
| `pages/admin/blog/list.tsx` | Page TSX | Liste des articles. |
| `pages/admin/messages/` | Dossier | Gestion des messages du formulaire de contact. |
| `pages/admin/messages/view/[id].tsx` | Page TSX | Voir un message et y répondre. |
| `pages/admin/images/` | Dossier | Gestion des images Cloudinary. |
| `pages/admin/images/add.tsx` | Page TSX | Ajouter une image. |
| `pages/admin/images/list.tsx` | Page TSX | Liste des images avec lien vers projet/service. |
| `pages/admin/login.tsx` | Page TSX | Page de connexion admin. |

---

### API Routes (`pages/api/`)

| Fichier | Type | Description |
|---------|------|-------------|
| `projects.ts` | API TS | CRUD pour les projets. |
| `services.ts` | API TS | CRUD pour les services. |
| `skills.ts` | API TS | CRUD pour les compétences. |
| `blog.ts` | API TS | CRUD pour les articles de blog. |
| `messages.ts` | API TS | Envoyer et recevoir les messages. |
| `images.ts` | API TS | Upload / suppression d’images Cloudinary. |
| `auth.ts` | API TS | Authentification et gestion des sessions. |
| `roles.ts` | API TS | Gestion des rôles et permissions (super admin). |

---

### Composants réutilisables (`components/`)

| Composant | Type | Description |
|------------|------|-------------|
| `ProjectCard.tsx` | Composant TSX | Affiche un projet dans la liste. |
| `ServiceCard.tsx` | Composant TSX | Affiche un service dans la liste. |
| `SkillCard.tsx` | Composant TSX | Affiche une compétence. |
| `BlogCard.tsx` | Composant TSX | Affiche un article de blog. |
| `ContactForm.tsx` | Composant TSX | Formulaire de contact. |
| `AdminSidebar.tsx` | Composant TSX | Barre de navigation pour admin. |
| `Modal.tsx` | Composant TSX | Composant modal réutilisable. |
| `Navbar.tsx` | Composant TSX | Barre de navigation front-office. |
| `Footer.tsx` | Composant TSX | Pied de page front-office. |

---

### Libs / utils (`lib/`)

| Fichier | Type | Description |
|---------|------|-------------|
| `mongodb.ts` | TS | Connexion MongoDB centralisée. |
| `cloudinary.ts` | TS | Gestion des uploads Cloudinary. |
| `auth.ts` | TS | Fonctions d’authentification et JWT. |
| `validators.ts` | TS | Fonctions de validation côté serveur. |
| `constants.ts` | TS | Constantes globales (rôles, types de projet…). |

---

### Styles (`styles/`)

| Fichier / Dossier | Type | Description |
|------------------|------|-------------|
| `globals.css` | CSS | Styles globaux Tailwind / reset. |
| `components/` | Dossier | Styles spécifiques aux composants. |
| `pages/` | Dossier | Styles spécifiques aux pages. |

---

## Résumé

Cette architecture couvre **tous les fichiers nécessaires** pour :

- Front-office : pages publiques, composants et styles.
- Back-office / admin : CRUD complet pour projets, services, compétences, blog, messages, images.
- API routes : logique serveur pour toutes les entités.
- Lib/utilitaires : connexion DB, Cloudinary, authentification, validations.
- Documentation : dictionnaire de données, modèles, workflows, règles métiers.

Chaque fichier et dossier est clairement identifié pour un **développement structuré et maintenable**.
