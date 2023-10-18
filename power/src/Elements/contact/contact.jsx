/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react"; // Importation de React et useRef pour les références
import emailjs from "@emailjs/browser"; // Importation de la bibliothèque emailjs pour l'envoi d'e-mails
import "./contact.css"; // Importation du fichier CSS pour le style
import { ToastContainer, toast } from "react-toastify"; // Importation de la bibliothèque de notifications
import "react-toastify/dist/ReactToastify.css"; // Styles pour les notifications

const contact = () => {
  // Référence au formulaire
  const form = useRef();

  // Fonction pour envoyer un e-mail
  const sendEmail = (e) => {
    e.preventDefault();

    // Utilisation de la bibliothèque emailjs pour envoyer un e-mail
    emailjs.sendForm(
      "service_7k0nto8",
      "template_38aapqr",
      form.current,
      "WZiG6JUXjCruhyk7a"
    );

    // Réinitialisation du formulaire
    e.target.reset();
  };

  // Fonction pour afficher une notification de succès
  const notifYouknow = () => {
    toast.success(" 🎉 Votre message a été envoyé avec succès 🎉!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <section className="contact" id="contact">
      <h2 className="eltiulo">Me contacter</h2> {/* Titre de la section */}
      <div className="gohan">
        <div>
          <div className="pli">
            <i className="bx bxs-phone-call contact__icon"></i> {/* Icône téléphone */}
            <div>
              <h3>Appellez-moi</h3>
              <span className="dln">
                <a href="tel:0781882130">07-81-88-21-30</a> {/* Numéro de téléphone */}
              </span>
            </div>
          </div>

          <div className="pli">
            <i className="bx bx-envelope contact__icon"></i> {/* Icône e-mail */}
            <div>
              <h3>Email</h3>
              <span className="dln">
                <a href="mailto:jeaneudes.woto31@gmail.com">
                  jeaneudes.woto31@gmail.com
                </a>{" "}
                {/* Adresse e-mail */}
              </span>
            </div>
          </div>
          <div className="pli">
            <i className="bx bx-map contact__icon"></i> {/* Icône localisation */}
            <div>
              <h3>Localisation</h3>
              <span className="dln">Toulouse</span> {/* Localisation */}
            </div>
          </div>
        </div>
        <div className="ozaru">
          <h2 className="pmdt">Parle moi de ton projet</h2> {/* Titre du formulaire */}
          {/* Formulaire de contact */}
          <form ref={form} onSubmit={sendEmail} className="cform">
            <div className="cfd">
              <label className="lab" htmlFor= "name">Nom *</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="contact__form-input"
                placeholder="Ecrit ton nom"
              />
            </div>
            <div className="cfd">
              <label className="lab" htmlFor= "prenom">Prénom *</label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                autoComplete="prenom"
                className="contact__form-input"
                placeholder="Ecrit ton prénom"
              />
            </div>
            <div className="cfd">
              <label className="lab" htmlFor="phone" >Téléphone *</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                className="contact__form-input"
                placeholder="Entre ton numéro de téléphone"
              />
            </div>
            <div className="cfd">
              <label className="lab" htmlFor="email">Email *</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="contact__form-input"
                placeholder="Ecrit ton adresse email"
              />
            </div>
            <div className="cfd">
              <label className="lab" htmlFor="sujet">Sujet *</label>
              <input
                type="text"
                name="sujet"
                id="sujet"
                autoComplete="sujet"
                className="contact__form-input"
                placeholder="Le sujet de ton projet"
              />
            </div>
            <div className="cfd contact__form-area">
              <label className="lab" htmlFor="projet">Projet *</label>
              <textarea
                name="projet"
                id="projet"
                cols="30"
                rows="10"
                autoComplete="projet"
                placeholder="Parle de ton projet"
                className="contact__form-input"
              ></textarea>
            </div>
            <button
              onClick={notifYouknow}
              type="submit"
              name="submit"
              value="Envoyer mon message"
              className="form-btn"
            >
              Envoyer mon message
            </button>
            
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default contact;
