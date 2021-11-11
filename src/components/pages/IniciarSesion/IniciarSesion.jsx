import React from "react";
import "./IniciarSesion.css";
import { NavLink } from "react-router-dom";

const IniciarSesion = () => {
  return (
    <section className="box-InicioSesion">
      <div className="title-box">
        <h1 className="title-text">
          ¡Bienvenido! Inicia sesión con
          <br />
          nosotros
        </h1>
      </div>
      <div className="bottom-main">
        <div className="inicio-box">
          <div className="inicio-sesion">
            <div>
              <form name="formLogin" id="formLogin">
                <p className="email-box">
                  <label for="emailInput" className="classForm">
                    Correo Electrónico
                  </label>
                  <input
                    class="inputsForm"
                    id="emailInput"
                    type="email"
                    name="email"
                    placeholder="quieroestabilidademocional@correo.com"
                  />
                </p>
                <p className="passwordBox">
                  <label for="passwordInput">Contraseña</label>
                  <input
                    class="inputsForm"
                    id="passwordInput"
                    type="password"
                    name="password"
                    placeholder="**********"
                  />
                  <p className="texto-chiquito"> Olvidé mi contraseña</p>
                </p>
              </form>
            </div>
            <div className="buttons">
              <button className="button-format" id="login-data">
                Iniciar
              </button>
              <NavLink
                className="register-button"
                id="re-register"
                to="/selectReg"
              >
                Registrarse
              </NavLink>
            </div>
          </div>
        </div>
        <div className="rrss-box">
          <div className="dist">
            <button className="buttonsRS" id="googleB">
              <div className="image1log"></div>
              <p className="textito">Ingresar con cuenta de Google</p>
            </button>
            <hr class="solid" className="sep" />
          </div>
          <div className="dist">
            <button className="buttonsRS" id="faceB">
              <div className="image2log"></div>
              <p className="textito">Ingresar con cuenta de Facebook</p>
            </button>
            <hr class="solid" className="sep" />
          </div>
          <div className="dist">
            <button className="buttonsRS" id="twitterB">
              <div className="image3log"></div>
              <p className="textito"> Ingresar con cuenta de Twitter</p>
            </button>
            <hr class="solid" className="sep" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
