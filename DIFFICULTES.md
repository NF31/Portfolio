# Difficultés rencontrées et solutions

## Site en ligne vide (novembre 2026)

### 1. Cluster MongoDB Atlas mis en pause

- **Symptôme** : sur https://www.nfdev.fr, aucun projet, service ni compétence ne s'affichait.
  Les routes `/api/projects`, `/api/services` et `/api/skills` répondaient « Erreur interne du
  serveur ».
- **Cause** : le cluster Atlas gratuit est mis en pause automatiquement après une longue
  inactivité. Les composants chargeaient leurs données depuis l'API au montage et masquaient
  l'erreur (« erreur silencieuse en production ») : le site paraissait simplement vide.
- **Solution** : reprise du cluster dans Atlas (bouton « Resume »), puis contenu public déplacé
  dans `lib/content.ts`. Le site ne dépend plus de la base pour s'afficher ; MongoDB ne sert plus
  qu'aux messages de contact.
- **À retenir** : un service gratuit peut s'arrêter sans prévenir. Ne pas faire dépendre
  l'affichage principal d'un tel service, et ne jamais masquer une erreur sans la journaliser.

### 2. HTML vide côté serveur

- **Symptôme** : même avec la base disponible, le HTML renvoyé par le serveur ne contenait que
  le titre de la page (visible avec `curl https://www.nfdev.fr`).
- **Cause** : `ThemeProvider` renvoyait `null` tant que le composant n'était pas monté dans le
  navigateur (pour éviter un flash de thème). Tout le site était donc construit uniquement côté
  navigateur, et les moteurs de recherche voyaient une page blanche.
- **Solution** : `ThemeProvider` rend toujours ses enfants ; le flash de thème est évité par un
  petit script (`THEME_INIT_SCRIPT`) placé dans le `<head>`, qui applique la classe `dark` avant
  l'affichage.
- **Vérification** : `npm run build && npx next start`, puis `curl http://localhost:3000` doit
  contenir le texte des sections.

### 3. Formulaire de contact dépendant de la base

- **Symptôme possible** : avec la base en pause, l'envoi du formulaire échouait entièrement
  (connexion à MongoDB faite avant tout le reste, avec 30 s d'attente par défaut).
- **Solution** : l'enregistrement en base est tenté sans bloquer (délai réduit à 5 s), l'e-mail
  part dans tous les cas. Si l'enregistrement et l'e-mail échouent tous les deux, le visiteur
  reçoit une erreur claire avec l'adresse e-mail à utiliser.

### 4. Nom de domaine nfdev.fr

- **Symptôme** : alerte de sécurité sur https://www.nfdev.fr (certificat expiré le 11/09/2026),
  page Squarespace « Prochainement disponible » en HTTP.
- **Cause** : le domaine (DNS gérés chez Cloudflare) pointait vers Squarespace et non vers
  Vercel ; Vercel ne pouvait donc plus renouveler son certificat.
- **Solution** : domaine ajouté au projet Vercel, enregistrements DNS remplacés dans Cloudflare
  (`A @ 76.76.21.21` et `CNAME www cname.vercel-dns.com`, proxy désactivé, nuage gris). Les
  modifications faites dans Squarespace n'ont aucun effet : ce sont les serveurs DNS de
  Cloudflare qui font foi.
