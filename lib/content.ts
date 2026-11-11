/**
 * Contenu public du portfolio.
 *
 * Tout ce qu'affichent les pages publiques (profil, projets, compétences, services) vient
 * de ce fichier et non plus de MongoDB : le cluster Atlas gratuit se met en pause après une
 * longue inactivité, et le site s'affichait alors vide sans aucun message d'erreur.
 * Ici, le contenu est rendu côté serveur (lisible par les moteurs de recherche) et ne peut
 * plus disparaître. MongoDB reste utilisé pour les messages du formulaire de contact.
 *
 * Pour modifier le site : éditer ce fichier, puis ouvrir une PR.
 */

export const SITE_URL = 'https://www.nfdev.fr';

export const profil = {
  nom: 'Jean Woto',
  marque: 'NFdev',
  titre: 'Étudiant en double licence Numérique et Management, développeur web full-stack',
  ville: 'Toulouse',
  email: 'nfdev21@gmail.com',
  telephone: '+33781882130',
  telephoneAffiche: '07 81 88 21 30',
  github: 'https://github.com/NF31',
  accroche:
    "Je développe des applications web full-stack, en m'intéressant surtout à ce qui relie le code aux processus de l'entreprise : paiement, facturation, service après-vente, données clients, reporting.",
  presentation:
    "Je suis étudiant en double licence Numérique et Management (MIASHS + Gestion) à l'Université Toulouse Capitole, et développeur freelance sous le nom NFdev. J'ai mis en production une boutique e-commerce, puis construit autour d'elle plusieurs services séparés pour apprendre ce qu'elle ne couvrait pas : microservices, messagerie, NoSQL, intégration continue, observabilité.",
};

export const recherche = {
  stage: {
    titre: 'Stage de fin de licence',
    periode: 'du 3 mai au 31 août 2027',
    detail: '3 mois minimum, obligatoire dans ma double licence.',
  },
  alternance: {
    titre: 'Alternance en Master MIAGE',
    periode: 'à partir de septembre 2027, sur deux ans',
    detail:
      "Parcours Ingénierie des Processus Métiers (Toulouse Capitole), au rythme d'environ un mois à l'université et un mois en entreprise.",
  },
  ouverture:
    "Les deux peuvent se faire dans la même entreprise : un stage qui se prolonge en alternance permet de continuer sur les mêmes projets sans repartir de zéro. Ma formation mêlant informatique et gestion, je suis ouvert à des missions variées : développement, data, analyse et modélisation de processus, gestion de projet, ou des fonctions plus orientées métier comme la finance.",
};

export type Competences = { titre: string; elements: string[] };

export const competences: Competences[] = [
  {
    titre: 'Gestion',
    elements: [
      "Finance d'entreprise et marchés",
      'Contrôle de gestion',
      'Achats et chaîne de valeur',
      'Marketing stratégique',
      'Gestion de projet',
      'Économétrie et statistique',
    ],
  },
  {
    titre: 'Numérique',
    elements: [
      'Modélisation des processus métier (BPMN)',
      'Bases de données (PostgreSQL, MariaDB, MongoDB, Cassandra)',
      'Programmation objet (Java, PHP, TypeScript)',
      'Business analytics',
      'Intelligence artificielle',
      'Intégration continue et sécurité (CI, gitleaks)',
    ],
  },
  {
    titre: 'Technologies utilisées en projet',
    elements: [
      'Laravel, React, Inertia',
      'Next.js, Prisma',
      'Spring Boot, RabbitMQ',
      'Python, FastAPI, Scrapy',
      'NestJS, Go',
      'Docker, Azure, Vercel',
    ],
  },
];

export const parcours = [
  {
    periode: '2024 - 2027',
    titre: 'Double licence Numérique et Management',
    lieu: 'Université Toulouse Capitole (MIASHS + Gestion)',
  },
  {
    periode: 'En parallèle',
    titre: 'Développeur freelance, NFdev',
    lieu: 'Sites et applications pour des clients, boutique e-commerce en production',
  },
  {
    periode: 'Certification',
    titre: 'SecNumAcadémie',
    lieu: "ANSSI (Agence nationale de la sécurité des systèmes d'information)",
  },
];

export type Projet = {
  slug: string;
  titre: string;
  /** Une phrase, affichée sur la carte. */
  resume: string;
  /** Détail affiché sur la page des projets. */
  description: string;
  points: string[];
  technologies: string[];
  categorie: 'Projet principal' | 'Client' | 'Projet personnel' | 'Projet universitaire';
  github?: string;
  site?: string;
  image?: string;
  /** Affiché sur la page d'accueil. */
  enAvant: boolean;
};

export const projets: Projet[] = [
  {
    slug: 'kbeauty',
    titre: "Écosystème kbeauty",
    resume:
      'Une boutique e-commerce de cosmétiques coréens en production, entourée de services séparés qui échangent par RabbitMQ.',
    description:
      "Tout part d'une boutique en production (catalogue, panier, paiement Stripe, back-office). Pour apprendre ce qu'elle ne couvrait pas, j'ai construit autour d'elle des services indépendants, chacun dans son langage, qui communiquent par messages avec des contrats versionnés (JSON Schema). Chaque étape est documentée : choix techniques, difficultés rencontrées et solutions.",
    points: [
      'Boutique Laravel 13, Inertia, React et PostgreSQL (dépôt privé, boutique en production)',
      'Diagnostic de peau par photo : Java, Spring Boot, Resilience4j',
      "Collecte quotidienne des listes d'ingrédients : Python, Scrapy, Cassandra, Azure",
      'Tickets SAV créés depuis les retours boutique : PHP natif',
      'Notifications transactionnelles (NestJS) et référentiel client unique (Go)',
    ],
    technologies: ['Laravel', 'React', 'Spring Boot', 'RabbitMQ', 'Python', 'Go', 'Docker'],
    categorie: 'Projet principal',
    github: 'https://github.com/NF31/kbeauty-ecosystem',
    enAvant: true,
  },
  {
    slug: 'carssite',
    titre: 'CarsSite',
    resume:
      'Plateforme de location de voitures : réservation en ligne, paiement Stripe, factures PDF et espace administrateur.',
    description:
      "Les clients réservent un véhicule en quatre étapes, ajoutent des services (assurance, GPS, siège enfant) et paient en ligne. L'administrateur gère la flotte, les réservations, les remboursements et suit l'activité depuis un tableau de bord.",
    points: [
      'Paiement, acompte et remboursement avec Stripe (webhooks signés)',
      'Factures PDF et file d\'envoi des e-mails (BullMQ)',
      'Modification et annulation de réservation avec recalcul du prix',
      'Documentation complète du projet (Docusaurus)',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis'],
    categorie: 'Projet personnel',
    github: 'https://github.com/NF31/CarsSite',
    site: 'https://cars-site-sable.vercel.app',
    enAvant: true,
  },
  {
    slug: 'esg-score-pme',
    titre: 'ESG Score PME',
    resume:
      'Outil de diagnostic RSE pour PME : score par pilier, comparaison sectorielle et export au format ESRS.',
    description:
      "Réalisé dans le cadre de la double licence, l'outil aide une PME à faire de son reporting extra-financier un levier plutôt qu'une contrainte. Un questionnaire de 24 questions produit un score global et par pilier (environnement, social, gouvernance), avec des recommandations classées par gain potentiel.",
    points: [
      'Comparaison avec la moyenne réelle des PME du même secteur',
      "Pré-remplissage depuis un rapport RSE en PDF, toujours validé par l'utilisateur",
      'Détection des écarts entre discours et données (greenwashing)',
      'Export du rapport regroupé par standard ESRS',
    ],
    technologies: ['Python', 'FastAPI', 'Streamlit', 'PostgreSQL', 'Alembic'],
    categorie: 'Projet universitaire',
    github: 'https://github.com/NF31/esg-score-pme',
    enAvant: true,
  },
  {
    slug: 'eb-agency',
    titre: 'EB Agency',
    resume: "Site vitrine d'une agence immobilière parisienne : biens à la vente et à la location.",
    description:
      "Site réalisé pour une agence immobilière du 8e arrondissement de Paris, pour présenter ses biens (appartements, maisons, biens de prestige) et ses services d'achat, de vente et de location.",
    points: ['Site vitrine sur mesure', 'Référencement local (SEO)'],
    technologies: ['Next.js'],
    categorie: 'Client',
    enAvant: true,
  },
  {
    slug: 'maillots',
    titre: 'Commande de maillots de football',
    resume:
      'Formulaire de commande de maillots personnalisés, avec calcul automatique du prix et e-mail de confirmation.',
    description:
      "Le client choisit son club ou son pays, personnalise le maillot (nom, numéro, patchs, taille, manches) et peut en commander plusieurs à la fois. Le prix se calcule au fur et à mesure, la livraison devient gratuite à partir de trois maillots, et le vendeur est prévenu par e-mail à chaque commande.",
    points: [
      'Formulaire guidé étape par étape',
      'Calcul du prix transparent (20 € le maillot, 5 € par option)',
      'E-mails de confirmation au client et au vendeur',
    ],
    technologies: ['Next.js'],
    categorie: 'Client',
    site: 'https://football-jersey-tau.vercel.app',
    enAvant: true,
  },
  {
    slug: 'sav-ticketing',
    titre: 'SAV Ticketing',
    resume:
      "Gestion de tickets de service après-vente en PHP natif, sans framework, reliée aux retours de la boutique kbeauty.",
    description:
      "Reconstruction en solo d'un projet universitaire de groupe, sans framework pour maîtriser ce qu'un framework fait habituellement à notre place : routage, sessions, accès aux données, sécurité des formulaires.",
    points: [
      'PHP 8.5 sans framework',
      'Tickets créés automatiquement depuis les retours de la boutique (RabbitMQ)',
      'Intégration continue avec tests',
    ],
    technologies: ['PHP', 'MariaDB', 'RabbitMQ'],
    categorie: 'Projet universitaire',
    github: 'https://github.com/NF31/sav-ticketing-php',
    enAvant: true,
  },
  {
    slug: 'portfolio',
    titre: 'Ce portfolio',
    resume: 'Mon site personnel, avec un back-office pour gérer les messages reçus.',
    description:
      "Le site que vous consultez. Le contenu public est écrit dans le code pour être rapide et lisible par les moteurs de recherche ; les messages du formulaire de contact sont enregistrés dans MongoDB et consultables depuis un back-office protégé.",
    points: ['Rendu côté serveur', 'Back-office protégé', 'Formulaire de contact avec limitation des envois'],
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    categorie: 'Projet personnel',
    github: 'https://github.com/NF31/Portfolio',
    site: SITE_URL,
    enAvant: false,
  },
];

export type Service = {
  titre: string;
  resume: string;
  description: string;
  technologies: string[];
  /** Nom d'une icône de lib/icons.ts. */
  icone: string;
};

/** Prestations freelance NFdev (page /services). */
export const services: Service[] = [
  {
    titre: 'Développement web',
    icone: 'Globe',
    resume: 'Sites web sur mesure, adaptés à tous les écrans.',
    description:
      "Je conçois des sites sur mesure, rapides et adaptés à tous les écrans, avec une navigation simple et un référencement soigné, pour qu'ils attirent et convertissent vos visiteurs.",
    technologies: ['Next.js', 'Laravel', 'Inertia'],
  },
  {
    titre: 'Applications web',
    icone: 'Code2',
    resume: 'Applications métier performantes et faciles à faire évoluer.',
    description:
      "Je développe des applications web pensées pour vos processus : réservation, commande, facturation, gestion de clients. L'architecture reste simple à maintenir et à faire évoluer.",
    technologies: ['React', 'TypeScript', 'Laravel'],
  },
  {
    titre: 'Développement backend',
    icone: 'Wrench',
    resume: 'APIs fiables pour faire communiquer vos outils.',
    description:
      "Je crée des APIs sécurisées qui relient vos applications entre elles (paiement, e-mails, données clients), conçues pour supporter la croissance de votre activité.",
    technologies: ['Laravel', 'Node.js', 'Spring Boot'],
  },
  {
    titre: 'Bases de données',
    icone: 'Database',
    resume: 'Modélisation et optimisation de vos données.',
    description:
      'Je modélise et optimise vos bases de données pour un stockage fiable, rapide et sécurisé, adapté à vos besoins métier.',
    technologies: ['PostgreSQL', 'MongoDB'],
  },
  {
    titre: 'Référencement et performance',
    icone: 'TrendingUp',
    resume: 'Des pages rapides et visibles sur les moteurs de recherche.',
    description:
      'Je travaille la vitesse de chargement et le référencement de chaque page, pour que votre site soit mieux classé et plus agréable à utiliser.',
    technologies: [],
  },
];
