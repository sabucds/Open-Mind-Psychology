import React from "react";
import "./AcercaDe.css";

const AcercaDe = () => {
  return (
    <section className="about">
      <div className="titulo">¿Quiénes somos?</div>
      <div className="text-box">
        <p className="text">
          Somos un grupo de personas apasionadas por ayudar a los demás,
          mediante esta plataforma buscamos brindar esa ayuda a quienes la
          necesiten de manera fácil y accesible <br></br>¡Porque todos necesitan
          a alguien que esté ahí para ellos!
        </p>
      </div>
      <div className="images">
        <div className="image standing"></div>
        <div className="image sitting"></div>
      </div>
    </section>
  );
};

export default AcercaDe;
