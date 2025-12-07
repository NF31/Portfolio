# Vercel Web Analytics - Documentation

## Vue d'ensemble

Cette fonctionnalité intègre **Vercel Analytics** et **Vercel Speed Insights** dans le portfolio pour suivre les performances et les métriques d'utilisation du site web.

## Packages installés

- `@vercel/analytics` : Suivi des événements et métriques d'utilisation
- `@vercel/speed-insights` : Analyse des performances et Core Web Vitals

## Configuration

### Installation

Les packages ont été installés via npm :
```bash
npm install @vercel/analytics @vercel/speed-insights
```

### Intégration

Les composants Analytics et SpeedInsights ont été ajoutés dans le layout principal (`app/layout.tsx`) :

```tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Dans le composant RootLayout
<Analytics />
<SpeedInsights />
```

**Note importante** : Pour Next.js, utilisez `@vercel/analytics/next` et non `@vercel/analytics/react`.

## Fonctionnalités

### Vercel Analytics

- **Suivi des pages vues** : Enregistrement automatique des visites
- **Événements personnalisés** : Possibilité de tracker des actions spécifiques
- **Métriques en temps réel** : Dashboard Vercel avec statistiques en direct
- **Respect de la vie privée** : Conforme aux réglementations (RGPD)

### Vercel Speed Insights

- **Core Web Vitals** : Mesure des métriques de performance (LCP, FID, CLS)
- **Analyse des performances** : Identification des pages lentes
- **Rapports détaillés** : Données sur les temps de chargement et l'expérience utilisateur

## Utilisation

### Accès aux données

1. Connectez-vous au dashboard Vercel
2. Sélectionnez votre projet
3. Accédez à l'onglet **Analytics** pour les métriques d'utilisation
4. Accédez à l'onglet **Speed Insights** pour les performances

### Événements personnalisés (optionnel)

Pour tracker des événements personnalisés, utilisez :

```tsx
import { track } from '@vercel/analytics';

// Exemple : tracker un clic sur un bouton
track('button_click', { button_name: 'Contact' });
```

## Avantages

- ✅ **Automatique** : Aucune configuration supplémentaire nécessaire
- ✅ **Performant** : Impact minimal sur les performances du site
- ✅ **Sécurisé** : Données hébergées par Vercel
- ✅ **Conforme RGPD** : Respect de la vie privée des utilisateurs
- ✅ **Intégré** : Fonctionne nativement avec les déploiements Vercel

## Notes importantes

- Les analytics ne fonctionnent qu'en production (déploiement Vercel)
- Les données sont collectées automatiquement après le déploiement
- Aucune clé API ou configuration supplémentaire n'est requise
- Les analytics sont désactivés en mode développement local

## Branche Git

Cette fonctionnalité a été développée sur la branche : `feat/vercel-analytics`

## Prochaines étapes

1. Tester en production après déploiement
2. Vérifier les métriques dans le dashboard Vercel
3. Analyser les Core Web Vitals pour optimiser les performances
4. Configurer des alertes si nécessaire
