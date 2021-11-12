import React from "react";
import { useState, useContext } from "react";
import "./RegistroUser.css";
import registro1 from "../../img/Registro.png";
import { useHistory } from "react-router-dom";
import {
  providerGoogle,
  providerFacebook,
  providerTwitter,
  auth,
} from "../../../utils/firebaseConfig.js";
import { UserContext } from "../../../context/UserContext";
import "react-phone-number-input/style.css";
import "./RegistroUser.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const RegistroUser = () => {
  const { createUser, type, user } = useContext(UserContext);

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
  });

  const [number, setNumber] = useState();

  function handleChange(e) {
    const { value, name: inputName } = e.target;
    setValues({ ...values, [inputName]: value });
  }

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidPhoneNumber(number)) {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        if (type) {
          await createUser(
            {
              name: values.nombre + " " + values.apellido,
              email: values.email,
              phone: number,
              country: "",
              info: "",
              specialty: [],
              education: [],
              schedule: [],
              feedback: [],
              ranking: 0,
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
              phone: number,
              country: "",
              info: "",
              role: "usuario",
            },
            response.user.uid
          );
        }
        console.log(response.user.uid);
        console.log("EMAIL_PASSWORD_LOGIN");
        console.log(user);
        history.push("/");
      } catch (e) {
        alert(
          "Hubo un error al enviar el formulario, verifique que los campos sean válidos."
        );
      }
    } else {
      alert("Uno de los campos está vacío o es inválido.");
    }
  };

  const handleGoogleLogin = async () => {
    console.log("GOOGLE_LOGIN");
    await auth.signInWithPopup(providerGoogle);
    history.push("/");
  };

  const handleFacebookLogin = async () => {
    console.log("FACEBOOK_LOGIN");
    await auth.signInWithPopup(providerFacebook);
    history.push("/");
  };

  const handleTwitterLogin = async () => {
    console.log("TWITTER_LOGIN");
    await auth.signInWithPopup(providerTwitter);
    history.push("/");
  };

  return (
    <section className="main-RegistroUser">
      <div className="encabezado">
        <div className="TitleRegister">
          Bienvenido a OMP, comienza
          <br />
          tu camino con nosotros
        </div>
        <div className="linea"></div>
      </div>
      <div className="flexbox-container">
        <div className="left-col">
          <form onSubmit={handleSubmit} className="all-form">
            <label htmlFor="nombre" className="titulos">
              Nombre{" "}
            </label>
            <br />
            <input
              placeholder="Juan"
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
              placeholder="Almeida"
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
            <PhoneInput
              id="numero"
              name="number"
              value={number}
              onChange={setNumber}
              className="phone"
            />
            <br />

            <label htmlFor="email" className="titulos">
              Correo electrónico{" "}
            </label>
            <br />
            <input
              placeholder="dondetevea@tepateoesetrasero.com"
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
              placeholder="************"
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
              placeholder="************"
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
              <hr class="solid" className="sep" />
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
              <hr class="solid" className="sep" />
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
              <hr class="solid" className="sep" />
            </div>
          </div>
          <img
            src={registro1}
            alt="registro-imagen"
            width="500px"
            className="img1"
          />
        </div>
      </div>
    </section>
  );
};

export default RegistroUser;
