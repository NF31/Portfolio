# 🎨 Charte Graphique - Portfolio NFDev21

## 📋 Table des matières

- [🎯 Introduction](#-introduction)
- [🎨 Palette de couleurs](#-palette-de-couleurs)
- [📝 Typographie](#-typographie)
- [🔧 Composants](#-composants)
- [📱 Responsive Design](#-responsive-design)

---

## 🎯 Introduction

Cette charte graphique définit l'identité visuelle du portfolio NFDev21. Elle garantit une cohérence visuelle à travers tous les éléments de l'interface utilisateur.

### 🎨 Principes directeurs
- **Modernité** : Design contemporain avec des dégradés et effets glassmorphism
- **Accessibilité** : Contraste élevé et lisibilité optimale
- **Cohérence** : Utilisation systématique des couleurs et typographies définies
- **Responsive** : Adaptation parfaite sur tous les écrans

---

## 🎨 Palette de couleurs

### Couleurs principales

| Couleur | Code Hex | Usage | Exemple |
|---------|----------|-------|---------|
| **Bleu Primaire** | `#3B82F6` | Boutons principaux, liens, accents | CTA, navigation active |
| **Bleu Secondaire** | `#1E40AF` | Hover states, éléments secondaires | Boutons au survol |
| **Indigo** | `#6366F1` | Dégradés, éléments décoratifs | Backgrounds, cards |
| **Violet** | `#8B5CF6` | Accents créatifs, highlights | Badges, tags |

### Couleurs neutres

| Couleur | Code Hex | Usage | Exemple |
|---------|----------|-------|---------|
| **Gris Foncé** | `#1F2937` | Textes principaux, titres | Headers, body text |
| **Gris Moyen** | `#6B7280` | Textes secondaires | Descriptions, métadonnées |
| **Gris Clair** | `#E5E7EB` | Bordures, séparateurs | Cards, inputs |
| **Blanc** | `#FFFFFF` | Backgrounds, textes sur fond sombre | Cards, modals |

### Couleurs de statut

| Couleur | Code Hex | Usage | Exemple |
|---------|----------|-------|---------|
| **Succès** | `#10B981` | Messages de confirmation | Validation, succès |
| **Attention** | `#F59E0B` | Avertissements | Warnings, notifications |
| **Erreur** | `#EF4444` | Messages d'erreur | Erreurs, échecs |
| **Info** | `#3B82F6` | Informations | Tooltips, infos |

### Dégradés

```css
/* Dégradé principal */
background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);

/* Dégradé secondaire */
background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);

/* Dégradé neutre */
background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
```

---

## 📝 Typographie

### Police principale : Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Hiérarchie typographique

| Élément | Taille | Poids | Couleur | Usage |
|---------|--------|-------|---------|-------|
| **H1** | `2.5rem` (40px) | `700` | `#1F2937` | Titres de pages |
| **H2** | `2rem` (32px) | `600` | `#1F2937` | Sous-titres |
| **H3** | `1.5rem` (24px) | `600` | `#1F2937` | Titres de sections |
| **H4** | `1.25rem` (20px) | `500` | `#1F2937` | Titres de cartes |
| **Body** | `1rem` (16px) | `400` | `#1F2937` | Texte principal |
| **Small** | `0.875rem` (14px) | `400` | `#6B7280` | Textes secondaires |
| **Caption** | `0.75rem` (12px) | `400` | `#6B7280` | Légendes, métadonnées |

### Police monospace : JetBrains Mono

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Usage** : Code, snippets, identifiants techniques

---

## 🔧 Composants

### Boutons

#### Bouton primaire
```css
.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}
```

#### Bouton secondaire
```css
.btn-secondary {
  background: white;
  color: #3B82F6;
  border: 2px solid #3B82F6;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
}
```

### Cards

```css
.card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Inputs

```css
.input {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: white;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);
  color: white;
}

.badge-success {
  background: #10B981;
  color: white;
}
```

---

## 📱 Responsive Design

### Breakpoints

| Taille | Breakpoint | Usage |
|--------|------------|-------|
| **Mobile** | `< 768px` | Smartphones |
| **Tablet** | `768px - 1024px` | Tablettes |
| **Desktop** | `> 1024px` | Ordinateurs |

### Grille

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎯 Utilisation

### Règles d'application

1. **Couleurs** : Respecter la palette définie, éviter les couleurs non listées
2. **Typographie** : Utiliser Inter pour tous les textes, JetBrains Mono pour le code
3. **Espacement** : Maintenir une cohérence avec les valeurs définies
4. **Composants** : Réutiliser les styles définis, éviter les variations
5. **Responsive** : Tester sur tous les breakpoints

### Outils recommandés

- **Figma** : Pour les maquettes et prototypes
- **Tailwind CSS** : Pour l'implémentation des styles
- **Chrome DevTools** : Pour le debug responsive
- **ColorZilla** : Pour l'extraction de couleurs

---

## 📝 Notes de version

- **v1.0** : Création de la charte graphique initiale
- **v1.1** : Ajout des dégradés et effets glassmorphism
- **v1.2** : Mise à jour des composants et responsive design

---

*Cette charte graphique est un document vivant qui évolue avec le projet. Toute modification doit être documentée et communiquée à l'équipe.*

