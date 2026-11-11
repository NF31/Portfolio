# Configuration de l'envoi d'emails avec Gmail

Ce guide vous explique comment configurer l'envoi d'emails via Gmail avec Nodemailer.

## Étape 1 : Créer un mot de passe d'application Gmail

1. **Activer la validation en 2 étapes** (si ce n'est pas déjà fait) :
   - Allez sur [https://myaccount.google.com/security](https://myaccount.google.com/security)
   - Cliquez sur "Validation en deux étapes"
   - Suivez les instructions pour l'activer

2. **Créer un mot de passe d'application** :
   - Allez sur [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Connectez-vous si nécessaire
   - Cliquez sur "Sélectionner une application" → Choisissez "Autre (nom personnalisé)"
   - Entrez un nom comme "Portfolio NFDev21"
   - Cliquez sur "Générer"
   - **Copiez le mot de passe de 16 caractères** (sans espaces)

## Étape 2 : Configurer les variables d'environnement

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
# Gmail pour Nodemailer
GMAIL_USER=votre.email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Remplacez** :
- `votre.email@gmail.com` par votre vraie adresse Gmail
- `abcdefghijklmnop` par le mot de passe d'application de 16 caractères

## Étape 3 : Tester l'envoi

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur [http://localhost:3000/services](http://localhost:3000/services)

3. Scrollez jusqu'à la section "Parlons de votre projet"

4. Remplissez le formulaire et cliquez sur "Envoyer le message"

5. Si tout est bien configuré :
   - Vous verrez un toast vert "Message envoyé avec succès !"
   - Vous recevrez l'email dans votre boîte Gmail

## Format de l'email reçu

Vous recevrez un email formaté en HTML avec :
- Nom du visiteur
- Email (cliquable pour répondre)
- Téléphone (si fourni)
- Service demandé (si fourni)
- Budget (si fourni)
- Message complet

## Troubleshooting

### Erreur : "Invalid login"
- Vérifiez que GMAIL_USER est correct
- Vérifiez que GMAIL_APP_PASSWORD est bien un mot de passe d'application (pas votre mot de passe Gmail normal)
- Vérifiez qu'il n'y a pas d'espaces dans le mot de passe

### Erreur : "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que Gmail n'est pas bloqué par un firewall

### L'email n'arrive pas
- Vérifiez vos spams
- Vérifiez que GMAIL_USER est bien votre adresse Gmail

## Alternatives à Gmail

Si vous préférez un autre service :
- **Resend** : Service moderne, facile à configurer
- **SendGrid** : Service professionnel avec analytics
- **Mailtrap** : Pour tester en développement

## Checklist

- [ ] Validation en 2 étapes activée sur Gmail
- [ ] Mot de passe d'application créé
- [ ] Variables `.env.local` configurées
- [ ] Serveur redémarré
- [ ] Test d'envoi effectué
- [ ] Email bien reçu dans Gmail

---

*Pour toute question, consultez la [documentation Nodemailer](https://nodemailer.com/about/) officielle.*

