# 🗄️ Configuration MongoDB

## Variables d'environnement requises

Ajoutez ces variables à votre fichier `.env` :

```env
# Base de données MongoDB
DB_URI=mongodb://localhost:27017/portfolio
# ou pour MongoDB Atlas :
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## Structure de la base de données

### Collection `projects`
```javascript
{
  _id: ObjectId,
  title: String (3-100 caractères),
  description: String (min 10 caractères),
  images: [String], // URLs des images
  technologies: [String],
  link: String (optionnel, URL valide),
  type: String (web|mobile|fullstack|data|autre),
  createdBy: ObjectId (référence vers User),
  createdAt: Date,
  updatedAt: Date
}
```

## Fonctionnalités implémentées

✅ **Connexion MongoDB** : Gestion des connexions avec cache
✅ **Modèle Project** : Validation et schéma Mongoose
✅ **API Routes** : POST et GET pour les projets
✅ **Validation** : Côté client et serveur
✅ **Gestion d'erreurs** : Messages d'erreur appropriés

## Prochaines étapes

- [ ] Authentification utilisateur
- [ ] Upload d'images via Cloudinary
- [ ] CRUD complet (PUT, DELETE)
- [ ] Pagination des résultats
- [ ] Recherche et filtres


