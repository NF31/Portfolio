import React from "react";
import "./services.css";

const services = () => {
  return (
    <section className="services" id="services">
      {/* Titre de la section, pertinent pour les moteurs de recherche */}
      <h2>Services</h2>

      <div className="wkf">
        {/* Service 1 */}
        <div className="card">
          <i className="bx bx-mobile  card-img"></i>
          <div className="intro">
            {/* Titre du service 1 */}
            <h2 className="lakdtitre">Multi-Plateforme Web</h2>
            <p className="lst"> Responsive</p>
            <p className="ausommet">
              {/* Description du service 1, incluant des mots-clés pertinents */}
              Compatible sur tous les supports, <span></span> tablettes et
              applications mobiles.
            </p>

            <button className="card-btn">
              Lire plus
              <i className="uil uil-arrow-right"></i>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Service 2 */}
        <div className="card">
          <i className="fa-solid fa-laptop-code card-img"></i>
          <div className="intro">
            {/* Titre du service 2 */}
            <h2 className="lakdtitre"> Web</h2>
            <p className="lst"> Développement</p>
            <p className="ausommet">
              {/* Description du service 2, incluant des mots-clés pertinents */}
              Création de site | E-commerce<span></span> Applications adapté aux
              besoin des clients.
            </p>

            <button className="card-btn">
              Lire plus <i className="uil uil-arrow-right"></i>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Service 3 */}
        <div className="card">
          <i className="fas fa-bullseye fa-4x  card-img"></i>
          <div className="intro">
            {/* Titre du service 3 */}
            <h2 className="lakdtitre">SEO</h2>
            <p className="lst"> Référencement</p>
            <p className="ausommet">
              {/* Description du service 3, incluant des mots-clés pertinents */}
              Utilisation de CMS, Framework ainsi qu'un code optimisait pour le
              référencement. <span></span> Pages propre et affichage sémantique
              pour un référencement optimal.
            </p>

            <button className="card-btn">
              Lire plus <i className="uil uil-arrow-right"></i>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default services;
