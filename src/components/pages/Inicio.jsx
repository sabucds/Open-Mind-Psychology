import React from "react";
import { MenuList } from "../Navbar/MenuList";
import { NavLink } from "react-router-dom";

const Inicio = () => {
  return (
    <section className="main">
      <div className="first-sect">
        <div className="left-column">
          <div className="slogan">
            Comienza tu viaje hacia la estabilidad emocional
          </div>
          <div className="pers-group"></div>
        </div>
        <div className="right-colum">
          <div className="registra-button">
            <NavLink to={MenuList[5].url}>Registrate aqui</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
