import React from "react";
import "./IniciarSesion.css";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  providerGoogle,
  providerFacebook,
  providerTwitter,
  auth,
} from "../../../utils/firebaseConfig.js";
import { UserContext } from "../../../context/UserContext";

const IniciarSesion = () => {
  const history = useHistory();
  const { user, getUserByEmail } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { value, name: inputName } = e.target;
    setValues({ ...values, [inputName]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("EMAIL_LOGIN");
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      if (user.role === "especialista") {
        history.push("/perfilEsp");
      } else {
        history.push("/perfilUser");
      }
    } catch (e) {
      alert("Correo o contraseña inválida.");
    }
  };

  const handleGoogleLogin = async () => {
    console.log("GOOGLE_LOGIN");

    await auth.signInWithPopup(providerGoogle);
    if (user.role === "especialista") {
      history.push("/perfilEsp");
    } else {
      history.push("/perfilUser");
    }
  };

  const handleFacebookLogin = async () => {
    console.log("FACEBOOK_LOGIN");
    await auth.signInWithPopup(providerFacebook);
    const user = getUserByEmail(values.email);
    if (user.role === "especialista") {
      history.push("/perfilEsp");
    } else {
      history.push("/perfilUser");
    }
  };

  const handleTwitterLogin = async () => {
    console.log("TWITTER_LOGIN");
    try {
      await auth.signInWithPopup(providerTwitter);
      const user = getUserByEmail(values.email);
      if (user.role === "especialista") {
        history.push("/perfilEsp");
      } else {
        history.push("/perfilUser");
      }
    } catch (e) {
      console.log(e);
      if (e.code === "auth/account-exists-with-different-credential") {
        alert("Usted ya se encuentra registrado con otra cuenta.");
      }
    }
  };

  const handleRestorePassword = async () => {
    try {
      await auth.sendPasswordResetEmail(values.email);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

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
                <div className="email-box">
                  <label htmlFor="emailInput" className="classForm">
                    Correo Electrónico
                  </label>
                  <input
                    className="inputsForm"
                    id="emailInput"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="quieroestabilidademocional@correo.com"
                  />
                </div>
                <div className="passwordBox">
                  <label htmlFor="passwordInput">Contraseña</label>
                  <input
                    className="inputsForm"
                    id="passwordInput"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="**********"
                  />
                  <p className="texto-chiquito" onClick={handleRestorePassword}>
                    {" "}
                    Olvidé mi contraseña
                  </p>
                </div>
              </form>
            </div>
            <div className="buttons">
              <button
                className="button-format"
                id="login-data"
                onClick={handleSubmit}
              >
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
            <button
              className="buttonsRS"
              id="googleB"
              onClick={handleGoogleLogin}
            >
              <div className="image1log"></div>
              <p className="textito">Ingresar con cuenta de Google</p>
            </button>
            <hr className="solid sep" />
          </div>
          <div className="dist">
            <button
              className="buttonsRS"
              id="faceB"
              onClick={handleFacebookLogin}
            >
              <div className="image2log"></div>
              <p className="textito">Ingresar con cuenta de Facebook</p>
            </button>
            <hr className="solid sep" />
          </div>
          <div className="dist">
            <button
              className="buttonsRS"
              id="twitterB"
              onClick={handleTwitterLogin}
            >
              <div className="image3log"></div>
              <p className="textito"> Ingresar con cuenta de Twitter</p>
            </button>
            <hr className="solid sep" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
