import { NavLink } from "react-router-dom";
import "./Inicio.css";
import SeccionEspecialistasInicio from "./SeccionEspecialistasInicio";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

const Inicio = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <section className="main">
        {!!user ? (
          <div className="first-sect">
            <div className="left-columna">
              <div className="slogan">Bienvenido a OMP, {user.name}</div>
              <div className="pers-group"></div>
            </div>
          </div>
        ) : (
          <div className="first-sect">
            <div className="left-columna">
              <div className="slogan">
                Comienza tu viaje hacia la estabilidad emocional
              </div>
              <div className="pers-group"></div>
            </div>
            <div className="right-columna">
              <NavLink className="registra-link" to="/SelectReg">
                <div className="registra-button">Regístrate aquí</div>
              </NavLink>
            </div>
          </div>
        )}
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

        <div className="second-sect especialistas-sect">
          <div className="how-works">Algunos de nuestros especialistas</div>
          <SeccionEspecialistasInicio />
        </div>

        <div className="second-sect testimony-sect">
          <div className="testim-title how-works">¡Estás en buenas manos!</div>
          <div className="testimony-container">
            <div className="testimony-box">
              <div className="speech-bubble">
                <p className="testimony">"OMP ha sabido crear una gran herramienta que facilita la conexión entre paciente y psicólogo. 
                Gran servicio."</p>
              </div>
              <p className="test-author">- María López<br/><span>(usuario de OMP)</span></p>
            </div>

            <div className="testimony-box">
              <div className="speech-bubble">
                <p className="testimony">"Desde que empecé a utilizar OMP ha sido mucho más llevadero 
                mi día a día, puedo hablar con mi psicólogo de confianza en un horario flexible desde 
                mi hogar, lo que ha ayudado bastante mi ansiedad social."</p>
              </div>
              <p className="test-author">- Ana Tovar<br/><span>(usuario de OMP)</span></p>
            </div>

            <div className="testimony-box">
              <div className="speech-bubble">
                <p className="testimony">"Me encanta Open Mind Psychology ya que tiene todo lo que 
                busco en un lugar acogedor y que me brinda calma."</p>
              </div>
              <p className="test-author">- Marianna Meléndez<br/><span>(usuario de OMP)</span></p>
            </div>
          </div>
        </div>
        <div className="inicio-footer">
          {!!user ? <div className="footer-msg">OMP, 2021</div> :
            <NavLink className="registra-link" to="/SelectReg">
              <div className="registra-button bottom-button">Regístrate aquí</div>
            </NavLink>
          }
        </div>
      </section>
    </>
  );
};

export default Inicio;
