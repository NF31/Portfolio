# Scripts d'administration

Ce dossier contient les scripts utilitaires pour la gestion du système d'administration.

## Scripts disponibles

### `change-password.js`
Script pour changer le mot de passe d'un utilisateur existant.

**Usage :**
```bash
node scripts/change-password.js
```

Le script vous demandera :
- Email de l'utilisateur
- Nouveau mot de passe

### `clean-all-remaining.js`
Script pour nettoyer le code et supprimer les classes CSS dupliquées.

**Usage :**
```bash
node scripts/clean-all-remaining.js
```

Ce script :
- Supprime les classes Tailwind dupliquées
- Corrige les containers responsive
- Nettoie les inputs et textareas

## Prérequis

1. **Variables d'environnement** : Assurez-vous que votre fichier `.env` contient :
   ```
   DB_URI=mongodb://localhost:27017/portfolio
   ```

2. **Dépendances** : Les scripts utilisent :
   - `mongoose` - Pour la connexion MongoDB
   - `bcryptjs` - Pour le hachage des mots de passe
   - `dotenv` - Pour charger les variables d'environnement

## Sécurité

- Les mots de passe sont automatiquement hachés avec bcrypt
- Les scripts utilisent des variables d'environnement pour la configuration
- Aucun mot de passe ou données sensibles ne sont stockés dans les scripts

## Notes

- Tous les scripts se connectent automatiquement à MongoDB
- Les mots de passe sont sécurisés avec bcrypt
- Les utilisateurs modifiés conservent leur rôle existant