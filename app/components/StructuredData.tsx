export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jean Woto",
    "jobTitle": "Étudiant en double licence Numérique et Management, développeur web full-stack",
    "description": "Étudiant à l'Université Toulouse Capitole et développeur freelance (NFdev). Recherche un stage de mai à août 2027 puis une alternance en Master MIAGE.",
    "url": "https://www.nfdev.fr",
    "email": "nfdev21@gmail.com",
    "telephone": "+33781882130",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toulouse",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://github.com/NF31"
    ],
    "knowsAbout": [
      "Laravel",
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Node.js",
      "Tailwind CSS"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Développeur Web Fullstack",
      "occupationLocation": {
        "@type": "City",
        "name": "Toulouse"
      },
      "skills": "Laravel, Next.js, React, TypeScript, MongoDB, API Development"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jean Woto",
    "url": "https://www.nfdev.fr",
    "description": "Portfolio de Jean Woto, étudiant en double licence Numérique et Management et développeur web full-stack",
    "inLanguage": "fr-FR",
    "author": {
      "@type": "Person",
      "name": "Jean Woto"
    }
  };

  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Jean Woto - Services de Développement Web",
    "description": "Services de développement web fullstack : applications web, sites internet, APIs",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de développement",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Développement Web",
            "description": "Création de sites web et applications avec Next.js et React"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Développement Backend",
            "description": "APIs et systèmes backend avec Laravel et Node.js"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceData) }}
      />
    </>
  );
}

