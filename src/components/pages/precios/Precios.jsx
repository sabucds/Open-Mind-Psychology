import React from "react";
import "./Precios.css";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

const Precios = () => {
  return (
    <>
      <Navbar />
      <section className="prices">
        <div className="titulo">¿Cuánto cuesta el servicio?</div>
        <div className="text-box">
          <p className="text">
            ¡El precio de nuestros servicios abarca una tasa fija por consulta!
            <br />
            Sin ataduras a un plan mensual, planifícate como tú quieras. La
            plataforma brinda la mayor facilidad para que pruebes a todos los
            especialistas que desees y encuentres al indicado para ti.
          </p>
        </div>
        <div className="price">
          <span>$50</span>/consulta
        </div>
        <div className="titulo">Duración de las consultas</div>
        <div className="text-box">
          <p className="text">
            Todas las consultas tienen una duración de <span>1 hora</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Precios;
