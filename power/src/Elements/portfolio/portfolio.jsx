import React from "react";
import "./portfolio.css";

// Mes images
import Pic1 from "../../assets/img/appart.jpg";
import Pic2 from "../../assets/img/holberton-logo.png";
import Pic3 from "../../assets/img/gant.png";
import Pic4 from "../../assets/img/elec.jpg";
import Pic5 from "../../assets/img/plan.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "animate.css";
import TrackVisibility from "react-on-screen";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/pagination";

// import required modules
import { Zoom, Pagination } from "swiper";

const portfolio = () => {
  return (
    <section className="portfolio" id="portfolio">
      {/* Titre de la section */}
      <h2 className="gallery">NF Gallery</h2>
      <TrackVisibility>
        {({ isVisible }) => (
          <div className={isVisible ? "animate_animated animate__fadeIn" : ""}>
            {/* Carousel Swiper pour afficher les projets */}
            <Swiper
              style={{
                "--swiper-pagination-bottom": "4%",
                "--swiper-pagination-margin-bottom": "4%",
              }}
              zoom={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Zoom, Pagination]}
              className="portfoliob"
            >
              {/* Diapositives individuelles pour chaque projet */}
              <SwiperSlide className="portfolio_picolo">
                <div className="trunks">
                  {/* Image du projet */}
                  <img src={Pic4} alt="" className="ici" />
                  {/* Nom du projet */}
                  <h3 className="p__name">Site d'électricicen</h3>
                  {/* Description du projet */}
                  <p
                    className="p___description"
                    data-text=" Site d'électricien réalisé en ExpressJS et NodeJS."
                  >
                    Site d'électricien réalisé en ExpressJS et NodeJS.{" "}
                  </p>
                  {/* Lien vers le projet */}
                  <a
                    href="https://ellec-appli.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="ronisia"
                  >
                    Cliquez-ici
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide className="portfolio_picolo">
                <div className="trunks">
                  <img src={Pic1} alt="" className="ici" />
                  <h3 className="p__name">Site d'hotel</h3>
                  <p
                    className="p___description"
                    data-text="Site d'hotel réalisé en HTML, CSS et JS."
                  >
                    Site d'hotel réalisé en HTML, CSS et JS.{" "}
                  </p>
                  <a
                    href="https://luxury-hotel-website.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="ronisia"
                  >
                    Cliquez-ici
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide className="portfolio_picolo">
                <div className="trunks">
                  <img src={Pic2} alt="" className="ici" />
                  <h3 className="p__name">Test pour une école</h3>
                  <p
                    className="p___description"
                    data-text="Réalisé en HTML, CSS et JS."
                  >
                    {" "}
                    Réalisé en HTML, CSS et JS.
                  </p>
                  <a
                    href="https://training-school.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="ronisia"
                  >
                    Cliquez-ici
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide className="portfolio_picolo">
                <div className="trunks">
                  <img src={Pic5} alt="" className="ici" />
                  <h3 className="p__name">Planete</h3>
                  <p
                    className="p___description"
                    data-text="Réalisé en HTML, CSS et JS."
                  >
                    {" "}
                    Réalisé en HTML, CSS et JS.
                  </p>
                  <a
                    href="https://planetev.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="ronisia"
                  >
                    Cliquez-ici
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide className="portfolio_picolo">
                <div className="trunks">
                  <img src={Pic3} alt="" className="ici" />
                  <h3 className="p__name">Boxe</h3>
                  <p
                    className="p___description"
                    data-text="Réalisé en HTML et CSS."
                  >
                    {" "}
                    Réalisé en HTML et CSS.
                  </p>
                  <a
                    href="https://training-box.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="ronisia"
                  >
                    Cliquez-ici
                    <i className="bx bx-link-external"></i>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        )}
      </TrackVisibility>

      <div className="apprenti">
        {/* Texte de suivi pour les futurs projets */}
        <p>
          Ces projets vont etre améliorés et d'autres projets sont en cours pour
          montrer mon évolution.
        </p>
        <a href="#portfolio" className="svg">
          A suivre ...
          <i className="bx bx-loader-alt"></i>
        </a>
      </div>
    </section>
  );
};

export default portfolio;
