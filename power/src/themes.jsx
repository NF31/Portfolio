// Importation du module de styles globaux à partir de styled-components
import { createGlobalStyle } from "styled-components";

// Définition des thèmes de couleur pour le mode clair et sombre
// Thème clair
export const lightTheme = {
  body: "#ffffff", // Couleur de fond du mode clair
  fontColor: "#000", // Couleur du texte en mode clair
  a: "#000", // Couleur des liens en mode clair
};

// Thème sombre
export const darkTheme = {
  body: "#000", // Couleur de fond du mode sombre
  fontColor: "#fff", // Couleur du texte en mode sombre
  a: "#ffffff", // Couleur des liens en mode sombre
  p: "#ffffff", // Couleur du paragraphe en mode sombre
  nav: "#000000",
  homesociali: "2px solid #ffffff", // Bordure pour éléments sociaux
  h4: "#ffffff", // Couleur des titres h4 en mode sombre

  left: "2px solid #ffffff", // Bordure pour ".acc .left" en mode sombre

  frontend: "3px solid #ffffff", // Bordure pour la classe "frontend"
  frontenddiv: "1px solid #ffffff", // Bordure pour les div à l'intérieur de "frontend"
  backend: "3px solid #ffffff", // Bordure pour la classe "backend"
  skills: "  conic-gradient(#ffffff 20deg, transparent 120deg)",
  backenddiv: "1px solid #ffffff", // Bordure pour les div à l'intérieur de "backend"
  cms: "3px solid #ffffff", // Bordure pour la classe "cms"
  cmsdiv: "1px solid #ffffff", // Bordure pour les div à l'intérieur de "cms"
 konan:"#ffffff",
  card: "3px solid #ffffff", // Bordure pour la classe "card"
  portfolio_picolo: "1px solid #ffffff", // Bordure pour la classe "portfolio_picolo"
  ici: "0 0 20px #ffffff", // Ombre pour l'élément avec la classe "ici"
  portbox: "  2px solid #ffffff;",
  port: " 0 0 20px #ffffff;",
  link: "#222222",
  apprenti: "2px solid #ffffff", // Bordure pour la classe "apprenti"
  boxshadow: "0 0 20px #ffffff", // Ombre pour les éléments avec la classe "apprenti"
  contactinfo: "1px solid #ffffff", // Bordure pour les éléments avec la classe "contactinfo"
  btn: "#ffffff",
  contactinput: "2px solid #ffffff", // Bordure pour les éléments avec la classe "contactinput"
  footer: "1px solid #ffffff", // Bordure pour l'élément "footer"
  menubtn: "#ffffff", // Couleur pour le bouton du menu
  progressvalue: "transparent", // Couleur de fond pour l'élément avec l'id "progress-value"
};

// Styles globaux en fonction du thème actuel
export const GlobalStyles = createGlobalStyle`

  body {
    background-color: ${(props) =>
      props.theme.body}; // Couleur de fond de la page en fonction du thème
  }

  a {
    color: ${(props) =>
      props.theme.a}; // Couleur des liens en fonction du thème
  }

  p {
    color: ${(props) =>
      props.theme.p}; // Couleur du texte de paragraphe en fonction du thème
    box-shadow: ${(props) =>
      props.theme.p}; // Ombre pour le texte de paragraphe en fonction du thème
  }
nav {
  background : ${(props) => props.theme.nav};
}


  // Styles pour les éléments avec la classe "home", "social", et "i"
  .home .social .i {
    border: ${(props) =>
      props.theme
        .homesociali}; // Bordure pour les éléments sociaux en fonction du thème
  }

  h4 {
    color: ${(props) =>
      props.theme.h4}; // Couleur des titres h4 en fonction du thème
  }

  left{
    border: ${(props) => props.theme.left}; 
  }
  // Styles pour les éléments avec la classe "frontend"
  .frontend {
    border: ${(props) =>
      props.theme
        .frontend}; // Bordure pour les éléments avec la classe "frontend"
  }

  // Styles pour les div à l'intérieur de "frontend"
  .frontend div {
    border: ${(props) =>
      props.theme
        .frontenddiv}; // Bordure pour les div à l'intérieur de "frontend"
  }

  .skills #pret::before {
    background-image: ${(props) => props.theme.skills};
  }
  // Styles pour les éléments avec la classe "backend"
  .backend {
    border: ${(props) =>
      props.theme
        .frontend}; // Bordure pour les éléments avec la classe "backend"
  }

  // Styles pour les div à l'intérieur de "backend"
  .backend div {
    border: ${(props) =>
      props.theme
        .frontenddiv}; // Bordure pour les div à l'intérieur de "backend"
  }

  // Styles pour les éléments avec la classe "cms"
  .cms {
    border: ${(props) =>
      props.theme.frontend}; // Bordure pour les éléments avec la classe "cms"
  }

  // Styles pour les div à l'intérieur de "cms"
  .cms div {
    border: ${(props) =>
      props.theme.frontenddiv}; // Bordure pour les div à l'intérieur de "cms"
  }
  .cms #konan:hover:{
    background : ${(props) => props.theme.konan};
  }
  // Styles pour les éléments avec la classe "card"
  .card {
    border: ${(props) =>
      props.theme.card}; // Bordure pour les éléments avec la classe "card"
  }



  // Styles pour les éléments avec la classe "ici"
  .ici {
    box-shadow: ${(props) =>
      props.theme.ici}; // Ombre pour les éléments avec la classe "ici"
  }

  .port-box{
    border :${(props) => props.theme.portbox};
    box-shadow : ${(props) => props.theme.port};
  }
  .link {
    color: ${(props) =>
      props.theme.link}; // Utilisez la propriété "link" du thème
  }
  // Styles pour les éléments avec la classe "apprenti"
  .apprenti {
    border: ${(props) =>
      props.theme
        .apprenti}; // Bordure pour les éléments avec la classe "apprenti"
  }

  // Styles pour les éléments avec la classe "apprenti"
  .apprenti {
    box-shadow: ${(props) =>
      props.theme
        .boxshadow}; // Ombre pour les éléments avec la classe "apprenti"
  }

  // Styles pour les éléments avec la classe "pli"
  .pli {
    border: ${(props) =>
      props.theme
        .contactinfo}; // Bordure pour les éléments avec la classe "pli"
  }

  .form-btn{
    color: ${(props) => props.theme.btn};
  }
  // Styles pour les éléments avec la classe "contact__form-input"
  .contact__form-input {
    border: ${(props) =>
      props.theme
        .contactinput}; // Bordure pour les éléments avec la classe "contact__form-input"
  }

  // Styles pour l'élément "footer"
  footer {
    border-top: ${(props) =>
      props.theme.footer}; // Bordure pour l'élément "footer"
  }

  // Styles pour l'élément avec l'id "menu-btn"
  #menu-btn {
    color: ${(props) =>
      props.theme.menubtn}; // Couleur du bouton du menu en fonction du thème
  }

  // Styles pour l'élément avec l'id "progress-value"
  #progress-value {
    background-color: ${(props) =>
      props.theme.progressvalue}; // Couleur de fond en fonction du thème
  }
`;
