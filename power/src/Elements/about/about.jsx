import React from "react"; // Importation de la bibliothèque React
import "./about.css"; // Importation du fichier CSS pour le style
import CV from "../../assets/CV_développeur_Woto.pdf"; // Lien vers le CV PDF
import Internet from "../../assets/img/internet.jpg"; // Image représentant Internet
import Instruit from "../../assets/img/livre.jpg"; // Image représentant la compétence "Instruit"
import Determination from "../../assets/img/mission.png"; // Image représentant la compétence "Détermination"
import Innovation from "../../assets/img/innovation.jpg"; // Image représentant la compétence "Innovation"
import "animate.css"; // Importation de la bibliothèque d'animations CSS
import TrackVisibility from "react-on-screen"; // Package React pour la détection de visibilité

const about = () => {
  return (
    <section className="about" id="about">
      {" "}
      {/* Section principale avec classe CSS et identifiant pour le référencement */}
      <h2>À mon propos</h2> {/* Titre de la section */}
      <div className="acc">
        {" "}
        {/* Conteneur principal */}
        <div className="left">
          {" "}
          {/* Partie gauche */}
          <TrackVisibility>
            {/* Utilisation de la détection de visibilité pour les animations */}
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate_animated animate__bounce" : ""}
              >
                <p>
                  En utilisant quotidiennement mon téléphone et mon ordinateur,
                  j'ai naturellement été attiré par le monde de la technologie
                  et du digital.
                  <br />
                  Après avoir suivi deux formations dans des écoles différentes,
                  j'ai consolidé ma passion pour le développement web. Ces
                  expériences m'ont permis d'apprendre et de découvrir
                  énormément de chose et donc d'approfondir mes connaissances
                  dans ce domaine.
                  <br />
                  Les projets réalisés en groupe m'ont également enseigné le
                  travail d'équipe, l'adaptabilité, la pensée critique et
                  l'organisation dans mon travail.
                  <br />À présent, après mes études, mon objectif est d'acquérir
                  plusieurs années d'expériences professionnelles afin de mettre
                  à profit toutes les compétences que j'ai acquises au service
                  d'une entreprise.
                </p>
              </div>
            )}
          </TrackVisibility>
        </div>
        <div className="right">
          {/* Partie droite */}
          <img src={Internet} alt="" className="it" />
          {/* Image Internet */}
        </div>
      </div>
      <div className="cv">
        {/* Section du CV */}
        <a
          href={CV}
          className="moncv"
          id="pbtn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mon CV
          <i className="uil uil-download-alt"></i>
        </a>
      </div>
      <div className="nagato">
        {" "}
        {/* Section des compétences */}
        <div className="cars">
          <div className="imgBx">
            <img src={Instruit} alt="" />
          </div>

          <div className="goku">
            <h4>Instruit</h4>

            <p>
              Autodidacte, je renforce mes connaissances et ma pratique en
              effectuant des recherches régulières et en me formant par
              différentes ressources.
            </p>
          </div>
        </div>
        <div className="cars">
          <div className="imgBx">
            <img src={Determination} alt="" className="dt" />
          </div>

          <div className="goku">
            <h4>Détermination</h4>
            <p>
              Face à un problème ou une incompréhension, je suis motivé à
              chercher et à perseverer pour trouver la solution. Cette
              détermination inépuisable est le moteur qui me pousse à repousser
              mes limites et à me dépasser.
            </p>
          </div>
        </div>
        <div className="cars innovation">
          <div className="imgBx">
            <img src={Innovation} alt="" className="ino" />
          </div>
          <div className="goku">
            <h4>Innovation</h4>
            <p>
              Mon désir constant de progresser me permet de surpasser mes
              réalisations précédentes.
              <br />
              En matière d'innovation, je suis constamment à la recherche de
              nouvelles opportunités pour trouver des solutions originales.
              <br />
              De plus, je suis ouvert aux défis et prêt à sortir de ma zone de
              confort pour explorer de nouvelles approches et méthodes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
