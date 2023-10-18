import React from 'react';
import './scroll.css';

const Scroll = () => {
  return (
    <div className="scroll">
      {/* Un lien vers la page d'accueil (index.html) */}
      <a href="index.html">
        {/* Une image utilisée pour illustrer le défilement */}
        <img src="../../assets/scroll.png" alt="" />
        {/* Une icône de souris pour indiquer le défilement */}
        <i className="uil uil-mouse-alt"></i>
      </a>
    </div>
  );
}

export default Scroll;
