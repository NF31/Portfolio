import React from "react";
import "./portof.css";



// Mes images
import Pic1 from "../../assets/img/appart.jpg";
import Pic2 from "../../assets/img/holberton-logo.png";
import Pic3 from "../../assets/img/gant.png";
import Pic4 from "../../assets/img/elec.jpg";
import Pic5 from "../../assets/img/plan.jpg";
import Logo from "../../assets/img/logo.jpeg";



const portof = () => {
  return (
    <section className="portfolio" id="portfolio">
   
        <h2>My projects</h2>
      

      <div className="container">
       

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
              <a href="https://ellec-appli.onrender.com/"  target="_blank"
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
              <a href="https://luxury-hotel-website.netlify.app"   target="_blank"
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
              <a href="https://planetev.netlify.app/"   target="_blank"
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
              <a href="https://training-box.netlify.app/"  target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>


          <div className="port-box">
            <div className="port-image">
              <img src={Logo} alt="" className="ici" />
              
            </div>
            <div className="port-content">
            <h3 className="p__name">Afa</h3>
            <p
                    className="p___description"
                    data-text="Réalisé en HTML et CSS."
                  >
                    {" "}
                    Réalisé en HTML et CSS.
                  </p>
              <a href="https://afpasite.netlify.app/"  target="_blank"
                    rel="noopener noreferrer"> <i className='bx bx-link-external'></i></a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default portof;
