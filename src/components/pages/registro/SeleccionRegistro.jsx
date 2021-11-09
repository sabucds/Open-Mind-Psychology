import React from "react";
import { Link } from "react-router-dom";
import "../IniciarSesion.css";

const SeleccionRegistro = () => {
  return (
    <section className="main-sesion">
      <div className="sesion">Pagina de Selección de Registro</div>

      <div className="registra-button">
        <Link className="registra-link" to="./RegistroUser">
          Registrarse como Usuario
        </Link>
      </div>

      <div className="registra-button">
        <Link className="registra-link" to="./RegistroEsp">
          Registrarse como Especialista
        </Link>
      </div>
    </section>
  );
};

export default SeleccionRegistro;
