import React from "react";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  return (
    <section className="compInicioSesion">
      <div className="left-column">
        <div id="client" className="boxes">
          <p className="box-text" id="left-text">
            Registrarse como <br /> cliente
          </p>
          <div className="image"></div>
          <div className="button">
            <a href="registro.html" className="start" id="left-button">
              Empezar como
              <br />
              cliente
            </a>
          </div>
        </div>
      </div>
      <div className="right-column">
        <div id="specialist" className="boxes">
          <p className="box-text" id="right-text">
            Registrarse como <br /> especialista
          </p>
          <div className="image-1"></div>
          <div className="button" id="right-button-box">
            <a href="registro.html" className="start" id="right-button">
              Empezar como
              <br />
              especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
