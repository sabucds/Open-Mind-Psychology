import React from "react";
import "./IniciarSesion.css";

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
              <button className="button-format" id="re-register">
                Registrarse
              </button>
            </div>
          </div>
        </div>
        <div className="rrss-box">
          <div className="dist">
            <button className="googleButton" id="googleB">
              Ingresar con cuenta de Google
            </button>
            <hr class="solid" className="sep" />
          </div>
          <div className="dist">
            <button className="faceButton" id="faceB">
              Ingresar con cuenta de Facebook
            </button>
            <hr class="solid" className="sep" />
          </div>
          <div className="dist">
            <button className="twButton" id="twitterB">
              Ingresar con cuenta de Twitter
            </button>
            <hr class="solid" className="sep" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
