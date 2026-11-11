# Portfolio

Site personnel en ligne sur https://www.nfdev.fr : présentation, recherche de stage et
d'alternance, projets, compétences et prestations freelance, avec un back-office pour consulter
les messages reçus.

Étudiant en double licence Numérique et Management (Université Toulouse Capitole), je
développe des applications web full-stack.

## Fonctionnalités

- **Site public** : présentation, parcours et compétences, projets, prestations, formulaire de
  contact. Tout le texte est rendu côté serveur, donc lisible par les moteurs de recherche.
- **Back-office** : messages reçus et tableau de bord d'activité. Les écrans de gestion des
  projets, services et compétences existent encore mais n'alimentent plus le site public
  (voir « Modifier le contenu »).
- **Médias** : envoi et remplacement des images sur Cloudinary.
- **Contact** : les messages sont enregistrés en base et notifiés par e-mail (Nodemailer). Si la
  base est indisponible, l'e-mail part quand même ; si les deux échouent, le visiteur voit une
  erreur avec l'adresse e-mail à utiliser.

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

## Modifier le contenu

Le contenu des pages publiques (profil, recherche, parcours, compétences, projets, prestations)
est écrit dans [`lib/content.ts`](lib/content.ts). Pour le changer : modifier ce fichier sur une
branche, ouvrir une PR, merger ; Vercel redéploie le site.

Il était auparavant lu dans MongoDB au chargement de chaque page, ce qui laissait le site vide
dès que la base ne répondait plus. Le détail est dans [`DIFFICULTES.md`](DIFFICULTES.md).

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
| [`DIFFICULTES.md`](DIFFICULTES.md) | Difficultés rencontrées et solutions |
