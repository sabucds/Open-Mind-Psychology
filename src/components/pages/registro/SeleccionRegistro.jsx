import React from "react";
import { useHistory } from "react-router-dom";
import "./SeleccionRegistro.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const SeleccionRegistro = () => {
  const { settype } = useContext(UserContext);
  const history = useHistory();

  const handleTrue = () => {
    settype(true);
    history.push("/selectReg/registro");
  };

  const handleFalse = () => {
    settype(false);
    history.push("/selectReg/registro");
  };

  return (
    <section className="compInicioSesion">
      <div className="left-column">
        <div id="client" className="boxes">
          <p className="box-text" id="left-text">
            Registrarse como <br /> cliente
          </p>
          <div className="image"></div>
          <div className="button" onClick={handleFalse}>
            <p className="start" id="left-button">
              Empezar como
              <br />
              cliente
            </p>
          </div>
        </div>
      </div>
      <div className="right-column">
        <div id="specialist" className="boxes">
          <p className="box-text" id="right-text">
            Registrarse como <br /> especialista
          </p>
          <div className="image-1"></div>
          <div className="button" id="right-button-box" onClick={handleTrue}>
            <p className="start" id="right-button">
              Empezar como
              <br />
              especialista
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeleccionRegistro;
