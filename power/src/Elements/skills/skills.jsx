import React from "react";
import "./skills.css";

const skills = () => {
  return (
    <section className="skills" id="skills">
      {/* Titre de la section, pertinent pour les moteurs de recherche */}
      <h2>
        <span>S</span>
        <span>k</span>
        <span>i</span>
        <span>l</span>
        <span>l</span>
        <span>s</span>
      </h2>

      {/* Section Front-End */}
      <article className="frontend">
        <h3 className="end">Front-End</h3>
        <div>
          {/* Compétence HTML */}
          <span id="pret">
            <p suppressContentEditableWarning="true">HTML</p>
            <i className="bx bxl-html5"></i>
          </span>
          {/* Compétence CSS */}
          <span id="pret">
            <p>CSS</p>
            <i className="bx bxl-css3"></i>
          </span>
          {/* Compétence JavaScript */}
          <span id="pret">
            <p>Javascript</p>
            <i className="bx bxl-javascript"></i>
          </span>
          {/* Compétence React */}
          <span id="pret">
            <p>React</p>
            <i className="bx bxl-react"></i>
          </span>
          {/* Compétence jQuery */}
          <span id="pret">
            <p>Sass</p>
            <i className="fa-brands fa-sass"></i>
          </span>
        </div>
      </article>

      {/* Section Back-End */}
      <article className="backend back">
        <h3 className="ndabloque">Back-End</h3>
        <div> 
            {/* Compétence php */}
          <span id="pret">
            <p>Php</p>
            <i className="fa-brands fa-php"></i>
          </span>
         {/* Compétence Laravel */}
          <span id="pret">
            <p>Laravel</p>
            <i className="fab fa-laravel"></i>
          </span>
          {/* Compétence Python */}
          <span id="pret">
            <p>Python</p>
            <i className="bx bxl-python"></i>
          </span>
          {/* Compétence MySQL */}
          <span id="pret">
            <p>MySQL</p>
            <i className="bx bx-data"></i>
          </span>
          {/* Compétence MongoDB */}
          <span id="pret">
            <p>MongoDB</p>
            <i className="bx bxl-mongodb"></i>
          </span>
       
         
        </div>
      </article>

      {/* Section CMS */}
      <article className="cms">
        <h3 className="end">CMS</h3>
        <div>
          {/* Compétence WordPress */}
          <span id="konan">
            <p>Wordpress</p>
            <i className="bx bxl-wordpress"></i>
          </span>
          {/* Compétence Figma */}
          <span id="konan">
            <p>Figma</p>
            <i className="bx bxl-figma"></i>
          </span>
          {/* Compétence Adobe */}
          <span id="konan">
            <p>Adobe</p>
            <i className="bx bxl-adobe"></i>
          </span>
          {/* Compétence Drupal */}
          <span id="konan">
            <p>Drupal</p>
            <i className="bx bxl-drupal"></i>
          </span>
        </div>
      </article>
    </section>
  );
};

export default skills;
