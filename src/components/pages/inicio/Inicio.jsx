import React from "react";
import { NavLink } from "react-router-dom";
import "./Inicio.css";

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
            <NavLink className="registra-link" to="/SelectReg">
              Regístrate aquí
            </NavLink>
          </div>
        </div>
      </div>
      <div className="second-sect">
        <div className="how-works">¿Cómo Funciona?</div>
        <div className="steps">
          <div className="step">
            <div className="num-cont">
              <div className="number">
                <p>1</p>
              </div>
            </div>
            <div className="description">
              Escoge de nuestra amplia gama de especialistas el que mejor se
              adapte a tus necesidades
            </div>
          </div>
          <div className="step">
            <div className="num-cont">
              <div className="number">
                <p>2</p>
              </div>
            </div>
            <div className="description">
              Agenda una consulta al horario de tu conveniencia
            </div>
          </div>
          <div className="step">
            <div className="num-cont">
              <div className="number">
                <p>3</p>
              </div>
            </div>
            <div className="description">
              Conéctate al momento de la consulta y comunícate con tu
              especialista
            </div>
          </div>
        </div>
      </div>
      <div className="third-sect">
        <div className="how-works services">¿Qué servicios ofrecemos?</div>
        <div className="description">
          Algunas de las áreas en las que se especializan nuestros psicólogos
          son:
        </div>
        <div className="steps">
          <div className="step">
            <div className="icon one"></div>
            <div className="description emotion">Depresión</div>
          </div>
          <div className="step">
            <div className="icon two"></div>
            <div className="description emotion">Problemas de Pareja</div>
          </div>
          <div className="step">
            <div className="icon three"></div>
            <div className="description emotion">Identidad de Género</div>
          </div>
          <div className="step">
            <div className="icon four"></div>
            <div className="description emotion">Estrés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
