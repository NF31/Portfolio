export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "NFDev21",
    "jobTitle": "Développeur Fullstack",
    "description": "Développeur web fullstack spécialisé en Laravel, Next.js et React",
    "url": "https://nfdev21.com",
    "email": "contact@nfdev21.com",
    "telephone": "+33612345678",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://github.com/votre-username",
      "https://linkedin.com/in/votre-username",
      "https://twitter.com/votre-username"
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
        "name": "Paris"
      },
      "skills": "Laravel, Next.js, React, TypeScript, MongoDB, API Development"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NFDev21",
    "url": "https://nfdev21.com",
    "description": "Portfolio professionnel de NFDev21, développeur fullstack",
    "inLanguage": "fr-FR",
    "author": {
      "@type": "Person",
      "name": "NFDev21"
    }
  };

  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NFDev21 - Services de Développement Web",
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

