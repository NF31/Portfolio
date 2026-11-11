'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

const metaData = {
  '/': {
    title: "Jean Woto - Développeur Fullstack Laravel & Next.js | Portfolio",
    description: "Développeur web fullstack spécialisé en Laravel, Next.js et React. Création de sites web modernes, applications web performantes et solutions digitales sur mesure. Basé à Toulouse, disponible en France.",
    keywords: "développeur fullstack, Laravel, Next.js, React, développeur web, Toulouse, France, portfolio, TypeScript, MongoDB, développement web, création site web"
  },
  '/services': {
    title: "Services de Développement Web | Jean Woto",
    description: "Services de développement web fullstack : création d'applications Next.js/React, développement backend Laravel, design UI/UX. Découvrez mes services sur mesure adaptés à vos besoins.",
    keywords: "services développement web, Next.js, React, Laravel, développement fullstack, création site web, application web, UI/UX design"
  },
  '/projets': {
    title: "Mes Projets & Réalisations | Jean Woto",
    description: "Découvrez mes projets et réalisations : applications web, sites e-commerce, SaaS. Portfolio de développeur fullstack Laravel & Next.js avec exemples concrets de projets réussis.",
    keywords: "portfolio projets, applications web, sites e-commerce, SaaS, Laravel, Next.js, développement web, projets réalisés"
  },
  '/contact': {
    title: "Contact | Jean Woto",
    description: "Contactez-moi pour vos projets de développement web. Développeur fullstack Laravel & Next.js disponible pour créer vos sites web et applications sur mesure.",
    keywords: "contact développeur, projet web, développement sur mesure, Laravel, Next.js, création site web"
  },
  '/conditions-generales': {
    title: "Conditions générales | Jean Woto",
    description: "Conditions générales du portfolio de Jean Woto. Informations légales, utilisation du site, données personnelles et politique de confidentialité.",
    keywords: "conditions générales, informations légales, utilisation site, données personnelles"
  },
  '/conditions': {
    title: "Conditions d'utilisation | Jean Woto",
    description: "Conditions d'utilisation du portfolio de Jean Woto. Règles et conditions pour l'utilisation du site web professionnel.",
    keywords: "conditions utilisation, règles site, conditions web"
  },
  '/confidentialite': {
    title: "Politique de confidentialité | Jean Woto",
    description: "Politique de confidentialité du portfolio de Jean Woto. Protection des données personnelles et respect de la vie privée.",
    keywords: "politique confidentialité, protection données, vie privée, RGPD"
  },
  '/access-denied': {
    title: "Accès Refusé | Jean Woto",
    description: "Accès refusé à cette ressource. Contactez l'administrateur si vous pensez qu'il s'agit d'une erreur.",
    keywords: "accès refusé, erreur accès, ressource protégée"
  },
  '/system-maintenance-portal': {
    title: "Système de Maintenance | Jean Woto",
    description: "Portail d'administration sécurisé pour la maintenance du système. Accès réservé aux administrateurs autorisés.",
    keywords: "maintenance système, administration, accès sécurisé"
  },
  // Pages Admin
  '/admin': {
    title: "Dashboard Admin | Jean Woto",
    description: "Tableau de bord d'administration pour gérer le portfolio de Jean Woto. Interface sécurisée pour les administrateurs.",
    keywords: "dashboard admin, administration, gestion portfolio, interface admin"
  },
  '/admin/projects': {
    title: "Gestion des Projets - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les projets du portfolio. Ajout, modification et suppression de projets.",
    keywords: "gestion projets, admin, portfolio, projets"
  },
  '/admin/services': {
    title: "Gestion des Services - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les services proposés. Création et modification des services de développement.",
    keywords: "gestion services, admin, services développement"
  },
  '/admin/skills': {
    title: "Gestion des Compétences - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les compétences techniques. Ajout et modification des compétences.",
    keywords: "gestion compétences, admin, compétences techniques"
  },
  '/admin/images': {
    title: "Gestion des Images - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les images du portfolio. Upload et organisation des médias.",
    keywords: "gestion images, admin, médias, upload"
  },
  '/admin/education': {
    title: "Gestion de la Formation - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les formations et certifications. Ajout et modification du parcours éducatif.",
    keywords: "gestion formation, admin, certifications, éducation"
  },
  '/admin/messages': {
    title: "Gestion des Messages - Admin | Jean Woto",
    description: "Interface d'administration pour gérer les messages et demandes de contact. Consultation et gestion des communications.",
    keywords: "gestion messages, admin, contact, communications"
  },
  '/admin/dashboard': {
    title: "Dashboard Admin | Jean Woto",
    description: "Tableau de bord d'administration avec statistiques et aperçu du portfolio. Interface de gestion complète.",
    keywords: "dashboard admin, statistiques, aperçu, gestion portfolio"
  },
  // Routes dynamiques admin (génériques)
  '/admin/services/add': {
    title: "Ajouter un Service - Admin | Jean Woto",
    description: "Interface d'administration pour ajouter un nouveau service. Création de services de développement personnalisés.",
    keywords: "ajouter service, admin, nouveau service, création service"
  },
  '/admin/services/edit': {
    title: "Modifier un Service - Admin | Jean Woto",
    description: "Interface d'administration pour modifier un service existant. Édition et mise à jour des services.",
    keywords: "modifier service, admin, édition service, mise à jour"
  },
  '/admin/projects/add': {
    title: "Ajouter un Projet - Admin | Jean Woto",
    description: "Interface d'administration pour ajouter un nouveau projet au portfolio. Création de projets personnalisés.",
    keywords: "ajouter projet, admin, nouveau projet, création projet"
  },
  '/admin/projects/edit': {
    title: "Modifier un Projet - Admin | Jean Woto",
    description: "Interface d'administration pour modifier un projet existant. Édition et mise à jour des projets.",
    keywords: "modifier projet, admin, édition projet, mise à jour"
  },
  '/admin/skills/add': {
    title: "Ajouter une Compétence - Admin | Jean Woto",
    description: "Interface d'administration pour ajouter une nouvelle compétence technique. Création de compétences personnalisées.",
    keywords: "ajouter compétence, admin, nouvelle compétence, création compétence"
  },
  '/admin/skills/edit': {
    title: "Modifier une Compétence - Admin | Jean Woto",
    description: "Interface d'administration pour modifier une compétence existante. Édition et mise à jour des compétences.",
    keywords: "modifier compétence, admin, édition compétence, mise à jour"
  },
  '/admin/images/add': {
    title: "Ajouter une Image - Admin | Jean Woto",
    description: "Interface d'administration pour ajouter une nouvelle image au portfolio. Upload et gestion des médias.",
    keywords: "ajouter image, admin, nouvelle image, upload médias"
  },
  '/admin/images/edit': {
    title: "Modifier une Image - Admin | Jean Woto",
    description: "Interface d'administration pour modifier une image existante. Édition et mise à jour des médias.",
    keywords: "modifier image, admin, édition image, mise à jour médias"
  },
};

export default function CustomHead() {
  const pathname = usePathname();
  const data = metaData[pathname as keyof typeof metaData] || metaData['/'];

  return (
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
    </Head>
  );
}
