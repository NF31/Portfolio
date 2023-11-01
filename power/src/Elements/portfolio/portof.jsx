import React from "react";
import "./portof.css";



// Mes images
import Pic1 from "../../assets/img/appart.jpg";
import Pic2 from "../../assets/img/holberton-logo.png";
import Pic3 from "../../assets/img/gant.png";
import Pic4 from "../../assets/img/elec.jpg";
import Pic5 from "../../assets/img/plan.jpg";

const portof = () => {
  return (
    <section className="portfolio" id="portfolio">
      <div className="main-text">
        <span> What i will do for you?</span>
        <h2>My portfolio</h2>
      </div>

      <div className="container">
        <div className="fillter-buttons">
          <button className="btn">All</button>
          <button className="btn">Node</button>
          <button className="btn"> Interacting</button>
          <button className="btn">Web app</button>
        </div>

        <div className="portfolio-gallery">
          <div className="port-box">
            <div className="port-image">
              <img src={Pic4} alt="" className="ici" />
              
            </div>
            <div className="port-content">
              <h3 className="p__name">Site d'électricicen</h3>
              <p
                className="p___description"
                data-text=" Site d'électricien réalisé en ExpressJS et NodeJS."
              >
                Site d'électricien réalisé en ExpressJS et NodeJS.{" "}
              </p>
              <a href=""  target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

          <div className="port-box">
            <div className="port-image">
              <img src={Pic1} alt="" className="ici" />
              
            </div>
            <div className="port-content">
            <h3 className="p__name">Site d'hotel</h3>
            <p
                    className="p___description"
                    data-text="Site d'hotel réalisé en HTML, CSS et JS."
                  >
                    Site d'hotel réalisé en HTML, CSS et JS.{" "}
                  </p>
              <a href=""  target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

          <div className="port-box">
            <div className="port-image">
              <img src={Pic2} alt="" className="ici" />
              
            </div>
            <div className="port-content">
            <h3 className="p__name">Test pour une école</h3>
            <p
                    className="p___description"
                    data-text="Réalisé en HTML, CSS et JS."
                  >
                    {" "}
                    Réalisé en HTML, CSS et JS.
                  </p>
              <a href=""   target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

          <div className="port-box">
            <div className="port-image">
              <img src={Pic5} alt="" className="ici" />
              
            </div>
            <div className="port-content">
            <h3 className="p__name">Planete</h3>
            <p
                    className="p___description"
                    data-text="Réalisé en HTML, CSS et JS."
                  >
                    {" "}
                    Réalisé en HTML, CSS et JS.
                  </p>
              <a href=""   target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

          <div className="port-box">
            <div className="port-image">
              <img src={Pic3} alt="" className="ici" />
              
            </div>
            <div className="port-content">
            <h3 className="p__name">Boxe</h3>
            <p
                    className="p___description"
                    data-text="Réalisé en HTML et CSS."
                  >
                    {" "}
                    Réalisé en HTML et CSS.
                  </p>
              <a href=""  target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default portof;
