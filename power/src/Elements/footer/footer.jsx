import React from 'react';
import './footer.css';

const footer = () => {

  // Fonction pour faire défiler la page vers le haut en douceur
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="fc">
        {/* Liste des liens de navigation du pied de page */}
        <div className="footer__list">
          <a href="#home" className='footer__l'>Accueil</a>
          <a href="#about" className='footer__li'>À propos</a>
          <a href="#skills" className='footer__lin'>Compétences</a>
          <a href="#services" className='footer__lk'>Services</a>
          <a href="#portfolio" className='footer__lnk'>Portfolio</a>
          <a href="#contact" className='footer__lik'>Contact</a>
        </div>
        
        {/* Icônes sociales */}
        <div className="footer__social">
          <a href="https://www.linkedin.com/in/jeaneudes-woto/" target='_blank' rel='noopener noreferrer'>
            <i className='uil uil-linkedin-alt'></i>
          </a>
          <a href="https://github.com/NF31" target='_blank' rel='noopener noreferrer'>
            <i className='uil uil-github-alt'></i>
          </a>
        </div>

        {/* Texte de copyright */}
        <p className="footer__copy"> &copy; Droits d'auteur @ 2023 NFdév | Tous les droits sont réservés.</p>
      </div>

      {/* Bouton de retour en haut */}
      <div onClick={goToBtn} id="progress">
        <i className='bx bx-up-arrow-circle' id="progress-value"></i>
      </div>
    </footer>
  )
}

export default footer;
