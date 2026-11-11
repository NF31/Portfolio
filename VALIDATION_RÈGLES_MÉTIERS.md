# VALIDATION ET RÈGLES MÉTIERS – Portfolio NFDev21

## Vue d'ensemble
Ce document définit toutes les **règles métiers**, **contraintes de validation** et **messages d’erreur** pour le projet de portfolio NFDev21.  
Il sert de référence avant le codage pour garantir que toutes les entrées respectent les standards attendus.

---

## 1️⃣ Gestion des projets (PROJECTS)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `title` | String | Oui | Min 3 caractères, max 100 caractères | "Le titre doit contenir entre 3 et 100 caractères." |
| `description` | String | Oui | Min 10 caractères | "La description doit contenir au moins 10 caractères." |
| `images` | Array[String] | Non | URL valide, max 5 images | "Chaque image doit être une URL valide et au maximum 5 images." |
| `technologies` | Array[String] | Oui | Minimum 1 technologie | "Vous devez sélectionner au moins une technologie." |
| `link` | String | Non | URL valide si renseignée | "Le lien doit être une URL valide." |
| `type` | String | Oui | Valeurs autorisées : `web`, `mobile`, `fullstack`, `data`, `autre` | "Le type de projet doit être : web, mobile, fullstack, data ou autre." |
| `createdBy` | ObjectId | Oui | Référence valide vers un utilisateur admin | "Utilisateur admin invalide." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 2️⃣ Gestion des services (SERVICES)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `title` | String | Oui | Min 3 caractères, max 50 caractères | "Le nom du service doit contenir entre 3 et 50 caractères." |
| `description` | String | Oui | Min 10 caractères | "La description doit contenir au moins 10 caractères." |
| `icon` | String | Non | URL ou nom d’icône valide | "L’icône doit être une URL ou un nom valide." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 3️⃣ Gestion des compétences (SKILLS)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `name` | String | Oui | Min 2 caractères, max 50 caractères | "Le nom de la compétence doit contenir entre 2 et 50 caractères." |
| `type` | String | Oui | Valeurs autorisées : `technique`, `softskill` | "Le type doit être 'technique' ou 'softskill'." |
| `level` | String | Non | Valeurs autorisées : `débutant`, `intermédiaire`, `avancé` | "Le niveau doit être débutant, intermédiaire ou avancé." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 4️⃣ Section “À propos” (ABOUT)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `bio` | String | Oui | Min 20 caractères | "La biographie doit contenir au moins 20 caractères." |
| `photo` | String | Non | URL valide | "La photo doit être une URL valide." |
| `education` | Array | Non | Liste d’objets avec école, diplôme, année | "Chaque entrée doit contenir école, diplôme et année." |
| `experience` | Array | Non | Liste d’objets avec poste, entreprise, durée | "Chaque expérience doit contenir poste, entreprise et durée." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 5️⃣ Gestion des messages (MESSAGES)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `name` | String | Oui | Min 2 caractères | "Le nom doit contenir au moins 2 caractères." |
| `email` | String | Oui | Format email valide | "L’email doit être valide." |
| `subject` | String | Oui | Min 3 caractères, max 100 caractères | "Le sujet doit contenir entre 3 et 100 caractères." |
| `message` | String | Oui | Min 10 caractères | "Le message doit contenir au moins 10 caractères." |
| `status` | String | Oui | Valeurs autorisées : `new`, `read`, `answered` | "Le statut doit être new, read ou answered." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 6️⃣ Gestion des utilisateurs (USERS)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `name` | String | Oui | Min 2 caractères, max 50 caractères | "Le nom doit contenir entre 2 et 50 caractères." |
| `email` | String | Oui | Format email valide, unique | "L’email doit être valide et unique." |
| `password` | String | Oui | Min 8 caractères, hashé | "Le mot de passe doit contenir au moins 8 caractères." |
| `role` | String | Oui | Valeurs autorisées : `superadmin`, `admin`, `editor` | "Le rôle doit être superadmin, admin ou editor." |
| `avatar` | String | Non | URL valide | "L’avatar doit être une URL valide." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 7️⃣ Gestion des images / médias (IMAGES)

| Champ | Type | Obligatoire | Validation / Règle métier | Message d’erreur |
|-------|------|-------------|---------------------------|-----------------|
| `url` | String | Oui | URL valide | "L’URL de l’image doit être valide." |
| `alt` | String | Non | Max 100 caractères | "Le texte alternatif doit contenir au maximum 100 caractères." |
| `projectId` | ObjectId | Oui | Référence valide vers PROJECTS | "ID de projet invalide." |
| `createdAt` | Date | Oui | Automatique | - |
| `updatedAt` | Date | Oui | Automatique | - |

---

## 8️⃣ Authentification & rôles

| Action | Validation / Règle métier | Message d’erreur |
|--------|---------------------------|-----------------|
| Connexion admin | Email et mot de passe corrects, throttling après 5 tentatives échouées, session sécurisée | "Email ou mot de passe invalide." / "Trop de tentatives, réessayez plus tard." |
| Gestion rôles | Seul superadmin peut créer/modifier/supprimer les rôles | "Accès refusé : permissions insuffisantes." |
| Permissions | Chaque rôle a des permissions CRUD définies pour les collections | "Action non autorisée pour ce rôle." |

---

## Conclusion
Ce fichier **définit toutes les règles métiers, validations et messages d’erreur** pour NFDev21.  
Il servira de référence pour **implémenter les validations côté front et API** et **garantir l’intégrité des données**.
