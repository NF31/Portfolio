import React, { useEffect } from "react";
import "../../power/src/Preloader.css";
import { preLoaderAnim } from "../../power/src/animations/animation";

const Preloader = () => {
  useEffect(() => {
      // Utilisez useEffect pour lancer votre animation une fois que la page est chargée.
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>N</span>
        <span>F</span>
        <span>'</span>
        <span>S</span>
        <span>L</span>
        <span>I</span>
        <span>F</span>
        <span>E</span>
      </div>
    </div>
  );
};

export default Preloader;
