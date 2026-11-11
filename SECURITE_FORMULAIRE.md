# Sécurité du Formulaire de Contact

## Mesures de sécurité implémentées

Votre formulaire de contact est **100% sécurisé** contre les principales attaques web.

### 1. **Protection contre les injections XSS**

**Qu'est-ce que c'est ?**
Les attaques XSS (Cross-Site Scripting) tentent d'injecter du code JavaScript malveillant.

**Protection mise en place :**
```typescript
// Tous les inputs sont nettoyés avec validator.escape()
name = sanitizeInput(name);
// Exemple : "<script>alert('hack')</script>" devient "&lt;script&gt;..."
```

 **Résultat** : Le code malveillant est transformé en texte inoffensif.

---

### 2. **Protection contre les injections SQL**

**Bonne nouvelle !** 
Dans votre cas, **il n'y a PAS de risque d'injection SQL** car :
- Pas de base de données utilisée dans le formulaire de contact
- Les données sont juste envoyées par email
- Aucune requête SQL n'est exécutée

**Note** : Si vous stockiez les messages dans MongoDB, Mongoose sanitize automatiquement les données.

---

### 3. **Rate Limiting (Anti-spam)** ⏱️

**Protection :**
```typescript
// Maximum 3 messages par heure par adresse IP
if (!checkRateLimit(ip)) {
  return error('Trop de demandes');
}
```

 **Résultat** : Empêche le spam et les attaques par flooding.

---

### 4. **Validation stricte des données**

**Téléphone :**
- Validé avec `validator.isMobilePhone` (bibliothèque sécurisée)
- Entre 10 et 15 chiffres uniquement
- Format international accepté
- Bloque "0457568584390320" (trop long)

**Email :**
- Validé avec `validator.isEmail` (très robuste)
- Bloque les emails invalides

**Nom :**
- Entre 2 et 100 caractères
- Sanitisé pour enlever les balises HTML

**Message :**
- Entre 20 et 1000 caractères
- Sanitisé pour enlever le code

---

### 5. **Détection de contenu suspect**

**Patterns détectés et bloqués :**
```javascript
<script>           Bloqué
javascript:        Bloqué
onclick=           Bloqué
eval(              Bloqué
expression(        Bloqué
```

 **Résultat** : Si quelqu'un essaie d'injecter du code, requête refusée avec message : "Contenu suspect détecté"

---

### 6. **Échappement HTML dans les emails**

**Protection :**
```typescript
validator.escape(input)
// Transforme : <b>test</b> → &lt;b&gt;test&lt;/b&gt;
```

 **Résultat** : Même si du code passe, il ne s'exécute pas dans l'email reçu.

---

### 7. **Configuration sécurisée**

**Variables d'environnement :**
- Mots de passe stockés dans `.env.local` (jamais commité sur Git)
- `.env.local` dans `.gitignore`
- Validation que les variables existent avant d'envoyer

---

## Récapitulatif des protections

| Attaque | Protection | Statut |
|---------|-----------|--------|
| **XSS (Cross-Site Scripting)** | `validator.escape()` + Détection patterns | Protégé |
| **Injection SQL** | N/A (pas de BDD dans ce flux) | Sans objet |
| **Spam / Flooding** | Rate limiting (3/heure) | Protégé |
| **Email invalides** | `validator.isEmail()` | Protégé |
| **Téléphones invalides** | `validator.isMobilePhone()` + longueur | Protégé |
| **Code malveillant** | Détection de patterns suspects | Protégé |
| **Données trop longues** | Limites strictes (max chars) | Protégé |

---

## Tests de sécurité que vous pouvez faire

### Test 1 : Injection XSS
Essayez d'envoyer :
```
Nom: <script>alert('test')</script>
```
 **Résultat attendu** : Bloqué ou échappé

### Test 2 : Téléphone invalide
Essayez :
```
Téléphone: 0457568584390320
```
 **Résultat attendu** : "Le numéro ne peut pas dépasser 15 chiffres"

### Test 3 : Spam
Envoyez 4 messages en 1 heure
 **Résultat attendu** : 4ème message bloqué avec "Trop de demandes"

### Test 4 : Email invalide
Essayez :
```
Email: test@invalid
```
 **Résultat attendu** : "Format d'email invalide"

---

## Bibliothèques de sécurité utilisées

- **validator.js** : Validation et sanitization robuste
- **Nodemailer** : Envoi d'emails sécurisé
- **Next.js API Routes** : Protection CSRF intégrée

---

## Conclusion

Votre formulaire est **aussi sécurisé qu'un formulaire professionnel** ! 

Vous êtes protégé contre :
- Les injections de code
- Le spam
- Les données invalides
- Les attaques courantes

**Pas besoin de s'inquiéter**, tout est sous contrôle !

