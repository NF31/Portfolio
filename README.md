# Portfolio

Site personnel qui présente mes projets, mes services et mes compétences, avec un back-office
pour gérer ces contenus sans toucher au code.

Étudiant en double licence Numérique et Management (Université Toulouse Capitole), je
développe des applications web full-stack.

## Fonctionnalités

- **Site public** : présentation, services, projets, formulaire de contact.
- **Back-office** : gestion des projets, services, compétences, formations, images et messages
  reçus, avec un tableau de bord d'activité.
- **Médias** : envoi et remplacement des images sur Cloudinary.
- **Contact** : les messages sont enregistrés en base et notifiés par e-mail (Nodemailer).

## Stack

- Next.js (App Router) et TypeScript
- MongoDB avec Mongoose
- Tailwind CSS et MUI
- Cloudinary pour les médias
- Déploiement sur Vercel

## Lancer le projet

```bash
git clone https://github.com/NF31/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Le site tourne sur http://localhost:3000. Variables à définir dans `.env.local` :

| Variable | Rôle |
| --- | --- |
| `DB_URI` | Chaîne de connexion MongoDB |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Stockage des images |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | Envoi des notifications de contact |
| `SESSION_SECRET` | Signature des sessions admin, 32 caractères minimum (`openssl rand -hex 32`) |

Déploiement détaillé dans [`Environnement_Déploiement.md`](Environnement_Déploiement.md).

## Documentation

| Document | Contenu |
| --- | --- |
| [`USE_CASES_USER_STORIES.md`](USE_CASES_USER_STORIES.md) | Cas d'utilisation et user stories |
| [`DICTIONNAIRE_DONNEES.md`](DICTIONNAIRE_DONNEES.md) | Dictionnaire des données |
| [`MODELS.md`](MODELS.md) | Modèles Mongoose |
| [`WORKFLOWS.md`](WORKFLOWS.md) | Processus métier du site |
| [`VALIDATION_RÈGLES_MÉTIERS.md`](VALIDATION_RÈGLES_MÉTIERS.md) | Règles de validation des formulaires |
| [`ARCHITECTURE_FICHIERS.md`](ARCHITECTURE_FICHIERS.md) | Organisation des fichiers |
| [`charte_graphique.md`](charte_graphique.md) | Charte graphique |
