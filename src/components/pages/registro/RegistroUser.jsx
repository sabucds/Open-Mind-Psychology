import React from "react";
import { useState, useContext } from "react";
import "./RegistroUser.css";
import { useHistory } from "react-router-dom";
import {
  providerGoogle,
  providerFacebook,
  auth,
} from "../../../utils/firebaseConfig.js";
import { UserContext } from "../../../context/UserContext";

const RegistroUser = () => {
  const { createUser, type } = useContext(UserContext);

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    numero: "",
  });

  function handleChange(evt) {
    const { value, name: inputName } = evt.target;
    setValues({ ...values, [inputName]: value });
  }

  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await auth.createUserWithEmailAndPassword(
      values.email,
      values.password
    );
    if (type) {
      await createUser(
        {
          name: values.nombre + " " + values.apellido,
          email: values.email,
          phone: values.numero,
          country: "",
          info: "",
          specialty: [],
          education: [],
          schedule: [],
          feedback: [],
          role: "especialista",
          status: "standby",
        },
        response.user.uid
      );
    } else {
      await createUser(
        {
          name: values.nombre + " " + values.apellido,
          email: values.email,
          phone: values.numero,
          country: "",
          info: "",
          role: "usuario",
        },
        response.user.uid
      );
    }
    console.log(response.user.uid);
    console.log("EMAIL_PASSWORD_LOGIN");
    if (type) {
      history.push("/PerfilEspecialista");
    } else {
      history.push("/PerfilUser");
    }
  };

  const handleGoogleLogin = async () => {
    console.log("GOOGLE_LOGIN");
    await auth.signInWithPopup(providerGoogle);
    if (type) {
      history.push("/PerfilEspecialista");
    } else {
      history.push("/PerfilUser");
    }
  };

  const handleFacebookLogin = async () => {
    console.log("FACEBOOK_LOGIN");
    providerFacebook.setCustomParameters({ prompt: "select_account" });
    const response = await auth.signInWithPopup(providerFacebook);
    console.log({ response: response.user });
    if (type) {
      history.push("/PerfilEspecialista");
    } else {
      history.push("/PerfilUser");
    }
  };

  return (
    <section className="main-RegistroUser">
      <div className="TitleRegister">
        Bienvenido a OMP, comienza tu camino con nosotros
      </div>
      <div className="linea"></div>

      <div className="flexbox-container">
        <div className="left-col">
          <form onSubmit={handleSubmit} className="all-form">
            <label htmlFor="nombre" className="titulos">
              Nombre{" "}
            </label>
            <br />
            <input
              id="nombre"
              name="nombre"
              type="name"
              value={values.nombre}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />

            <label htmlFor="apellido" className="titulos">
              Apellidos{" "}
            </label>
            <br />
            <input
              id="apellido"
              name="apellido"
              type="lastname"
              value={values.apellido}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />

            <label htmlFor="numero" className="titulos">
              Número de teléfono{" "}
            </label>
            <br />
            <input
              id="numero"
              name="numero"
              type="tel"
              value={values.numero}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />

            <label htmlFor="email" className="titulos">
              Correo electrónico{" "}
            </label>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />

            <label htmlFor="password" className="titulos">
              Contraseña{" "}
            </label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />

            <label htmlFor="password" className="titulos">
              Confirmar contraseña{" "}
            </label>
            <br />
            <input
              id="password2"
              name="password2"
              type="password"
              value={values.password2}
              onChange={handleChange}
              className="formulario-input"
            />
            <br />
            <input type="checkbox" className="check" />
            <label className="subtitulos">Confirmo tener 18 años o más.</label>
            <br />

            <input type="checkbox" className="check" />
            <label className="subtitulos">
              Acepto los términos y condiciones.
            </label>
            <br />

            <button
              type="button"
              className="registro-button"
              onClick={handleSubmit}
            >
              Iniciar
            </button>
          </form>
        </div>

        <div className="right-col">
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="registro-extra"
            >
              Iniciar con cuenta de Google.
            </button>
          </div>
          <br />
          <div>
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="registro-extra"
            >
              Iniciar con cuenta de Facebook.
            </button>
          </div>
          <br />
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="registro-extra"
            >
              Iniciar con cuenta de Twitter.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistroUser;
