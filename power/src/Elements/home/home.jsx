import React from "react";
import Typical from "react-typical";
import "./home.css";

const home = () => {
  return (
    <section className="home" id="home">
      {/* Section des icônes sociales */}
      <div className="social">
        <a
          href="https://www.linkedin.com/in/jeaneudes-woto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="uil uil-linkedin-alt"></i>
        </a>
        <a
          href="https://github.com/NF31"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="uil uil-github-alt"></i>
        </a>
      </div>

      {/* Section de présentation personnelle */}
      <div className="me">
        <h2 className="home-titre">
          WOTO Jean-Eudes
          <img src={"Hand"} alt="" /> {/* L'image source doit être définie */}
        </h2>

        <h1>
          {" "}
          {/* Animation de texte */}
          <Typical
            loop={Infinity}
            steps={[
              " Dév curieux 🔎",
              1000,
              "Fullstack  💻",
              1000,
              " Instruit 📚",
              1000,
              " Motivé et determiné 😎",
              1000,
              " Joyeux  😄",
              1000,
            ]}
          />
        </h1>

        {/* Paragraphe d'introduction */}
        <p className="p1">
          Jeune développeur en pleine période d'études en informatique et
          numérique. <br />
          Mon insatiable soif d'apprendre me pousse à acquérir constamment de
          nouvelles connaissances dans ce domaine. <br />
          En ce sens, je souhaite développer mon savoir-faire afin de devenir un
          élément essentiel de ce secteur en pleine expansion.
        </p>

        {/* Bouton de contact */}
        <a href="#contact" id="pbtn" className="contactme">
          {" "}
          Me contacter
          <i className="uil uil-message"></i>
        </a>
      </div>

      {/* Photo de profil */}
      <div className="pdp"></div>
    </section>
  );
};

export default home;
