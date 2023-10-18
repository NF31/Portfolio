/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import "./header.css";

const header = () => {
  // Référence pour la navigation mobile
  const navRef = useRef();

  // Fonction pour afficher ou masquer la navigation mobile
  const showNav = () => {
    navRef.current.classList.toggle("mobile-menu");
  };

  return (
    <section className="header">
      {/* Lien vers la page d'accueil */}
      <a href="index.html" id="logo">
        Woto
      </a>

      {/* Barre de navigation */}
      <nav ref={navRef} className="nav-links">
        {/* Lien vers la section "Home" avec défilement en douceur */}
        <Link
          spy={true}
          to="header"
          smooth={true}
          activeClass="activeCLass"
          href="home"
          className="nav-item is-active"
          data-target="Home"
        >
          Home
        </Link>

        {/* Lien vers la section "About" avec défilement en douceur */}
        <Link
          spy={true}
          to="about"
          smooth={true}
          href="about"
          className="nav-item ab"
          data-target="About"
        >
          About
        </Link>

        {/* Lien vers la section "Skills" avec défilement en douceur */}
        <Link
          spy={true}
          to="skills"
          smooth={true}
          href="skills"
          className="nav-item sk"
          data-target="skills"
        >
          Skills
        </Link>

        {/* Lien vers la section "Services" avec défilement en douceur */}
        <Link
          spy={true}
          to="services"
          smooth={true}
          href="services"
          className="nav-item se"
          data-target="Services"
        >
          Services
        </Link>

        {/* Lien vers la section "Portfolio" avec défilement en douceur */}
        <Link
          spy={true}
          to="portfolio"
          smooth={true}
          href="portfolio"
          className="nav-item po"
          data-target="Portfolio"
        >
          Portfolio
        </Link>

        {/* Lien vers la section "Contact" avec défilement en douceur */}
        <Link
          spy={true}
          to="contact"
          smooth={true}
          href="contact"
          className="nav-item co"
          data-target="Contact"
        >
          Contact
        </Link>

        {/* Bouton pour fermer la navigation mobile */}
        <button onClick={showNav} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </nav>

      {/* Bouton pour afficher le menu de navigation mobile */}
      <button onClick={showNav} id="menu-btn" className="nav-btn">
        <FaBars />
      </button>
    </section>
  );
};

export default header;
