import React from "react";
import { Link } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  return (
    <section className="main-sesion">
      <div className="sesion">Pagina de inicio de sesión</div>

      <div className="registra-button">
      <Link className="registra-link" to="./RegistroUser">Registrate como Usuario aqui</Link>
      </div>

      <div className="registra-button">
      <Link className="registra-link" to="./RegistroEsp">Registrate como Especialista aqui</Link>
      </div>

  </section>
  );
};

export default IniciarSesion;
