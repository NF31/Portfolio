import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Preloader from "../../power/src/Preloader";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "../../power/src/themes.jsx";
import Header from "./Elements/header/header";
import Home from "./Elements/home/home";
import About from "./Elements/about/about";
import Skills from "./Elements/skills/skills";
import Services from "./Elements/services/services";
import Portfolio from "./Elements/portfolio/portof";
import Contact from "./Elements/contact/contact";
import Footer from "./Elements/footer/footer";

// Utilisez des noms de variables explicites pour améliorer la lisibilité
const StyledApp = styled.div`
color: ${(props) => props.theme.fontColor}; // Couleur du texte principal
  a: ${(props) => props.theme.a};  // Couleur des liens
  p : ${(props) => props.theme.p};  // Couleur du texte de paragraphe
  nav:${(props) => props.theme.nav};

  .home .social .i :  ${(props) =>
    props.theme.homesociali}; // Bordure d'icônes sociales
  h4: ${(props) => props.theme.h4}; // Couleur du titre h4
  .left {
    border: ${(props) => props.theme.left};
  }
  .frontend: ${(props) =>
    props.theme.frontend}; // Bordure pour éléments frontend
  .frontend div: ${(props) =>
    props.theme.frontenddiv}; // Bordure pour div frontend
  .skills #pret::before : ${(props) => props.theme.skills};
  .backend: ${(props) => props.theme.backend}; // Bordure pour éléments backend
  .backend div: ${(props) =>
    props.theme.backenddiv}; // Bordure pour div backend
  .cms: ${(props) => props.theme.cms}; // Bordure pour éléments CMS
  .cms div: ${(props) => props.theme.cmsdiv}; // Bordure pour div CMS
  .cms #konan:hover:  ${(props) => props.theme.konan};
  .card: ${(props) => props.theme.card}; // Bordure pour les cartes
 .port-box : ${(props) => props.theme.portbox};
  .link:${(props) => props.theme.link}; 

  .ici: ${(props) =>
    props.theme.ici}; // Ombre pour élément avec la classe "ici"
  .apprenti :  ${(props) =>
    props.theme.apprenti}; // Bordure pour éléments d'apprentissage
  .apprenti:  ${(props) =>
    props.theme.boxshadow}; // Ombre pour éléments d'apprentissage
  .pli :  ${(props) =>
    props.theme.contactinfo}; // Bordure pour éléments de formulaire de contact
 .form-btn : ${(props) => props.theme.btn};
  .contact__form-input :  ${(props) =>
    props.theme
      .contactinput}; // Bordure pour les champs de formulaire de contact
  footer:  ${(props) => props.theme.footer}; // Bordure pour le pied de page
  #menu-btn: ${(props) => props.theme.menubtn}; // Couleur du bouton de menu
  #progress-value :  ${(props) =>
    props.theme.progressvalue}; // Couleur de fond de la barre de progression
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <Preloader />
        <GlobalStyles />
        <StyledApp>
          <Header />
          <i
            className="uil uil-moon change-theme"
            id="theme-button"
            onClick={() => themeToggler()}
          ></i>

          <main className="main">
            <Home />
            <About />
            <Skills />
            <Services />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
        </StyledApp>
      </>
    </ThemeProvider>
  );
}

export default App;
