import React from "react";
import { useHistory } from "react-router-dom";
import "../../pages/iniciarsesion/IniciarSesion.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const SeleccionRegistro = () => {
  const { settype } = useContext(UserContext);
  const history = useHistory();

  const handleTrue = () => {
    settype(true);
    history.push("/Registro");
  };

  const handleFalse = () => {
    settype(false);
    history.push("/Registro");
  };

  return (
    <section className="main-sesion">
      <div className="sesion">Página de Selección de Registro</div>

      <div className="registra-button">
        <button className="registra-link" onClick={handleFalse}>
          Registrarse como Usuario
        </button>
      </div>

      <div className="registra-button">
        <button className="registra-link" onClick={handleTrue}>
          Registrarse como Especialista
        </button>
      </div>
    </section>
  );
};

export default SeleccionRegistro;
