import React from "react";
import "./IniciarSesion.css";
import { NavLink } from "react-router-dom";

const IniciarSesion = () => {
  return (
    <section className="box-InicioSesion">
      <div className="encabezado de-inicio">
        <div className="TitleRegister">
          ¡Bienvenido! Inicia sesión con
          <br />
          nosotros
        </div>
        <div className="linea"></div>
      </div>

      <div className="bottom-main">
        <div className="inicio-box">
          <div className="inicio-sesion">
            <div>
              <form name="formLogin" id="formLogin">
                <div className="email-box">
                  <label for="emailInput" className="classForm">
                    Correo Electrónico
                  </label>
                  <input
                    className="inputsForm"
                    id="emailInput"
                    type="email"
                    name="email"
                    placeholder="quieroestabilidademocional@correo.com"
                  />
                </div>
                <div className="passwordBox">
                  <label for="passwordInput">Contraseña</label>
                  <input
                    className="inputsForm"
                    id="passwordInput"
                    type="password"
                    name="password"
                    placeholder="**********"
                  />
                  <p className="texto-chiquito"> Olvidé mi contraseña</p>
                </div>
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
        <div className="rrss-box-1">
          <div className="dist-1">
            <button className="buttonsRS-1" id="googleB">
              <div className="image1log"></div>
              <p className="textito">Ingresar con cuenta de Google</p>
            </button>
            <hr className="sep solid" />
          </div>
          <div className="dist-1">
            <button className="buttonsRS-1" id="faceB">
              <div className="image2log"></div>
              <p className="textito">Ingresar con cuenta de Facebook</p>
            </button>
            <hr className="sep solid" />
          </div>
          <div className="dist-1">
            <button className="buttonsRS-1" id="twitterB">
              <div className="image3log"></div>
              <p className="textito"> Ingresar con cuenta de Twitter</p>
            </button>
            <hr className="sep lastLine solid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
