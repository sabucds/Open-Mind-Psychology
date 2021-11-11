import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./SeleccionRegistro.css";

const SeleccionRegistro = () => {
  return (
    <section className="compInicioSesion">
      <div className="left-column">
        <div id="client" className="boxes">
          <p className="box-text" id="left-text">
            Registrarse como <br /> cliente
          </p>
          <div className="image"></div>
          <div className="button">
            <Link to="/registro" className="start" id="left-button">
              Empezar como
              <br />
              cliente
            </Link>
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
            <Link to="/registro" className="start" id="right-button">
              Empezar como
              <br />
              especialista
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeleccionRegistro;
