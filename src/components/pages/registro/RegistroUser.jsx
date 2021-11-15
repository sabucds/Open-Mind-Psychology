import React from "react";
import { useState, useContext } from "react";
import registro1 from "../../img/registro1.png";
import { useHistory } from "react-router-dom";
import {
  providerGoogle,
  providerFacebook,
  providerTwitter,
  auth,
  storage,
} from "../../../utils/firebaseConfig.js";
import { UserContext } from "../../../context/UserContext";
import validator from "validator";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

import "react-phone-number-input/style.css";
import "./RegistroUser.css";

const RegistroUser = () => {
  const { createUser, type } = useContext(UserContext);
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
  });
  function validInputs(name, lname, email) {
    //esta función será usada para validar inputs del usuario en el formulario de contacto y el de registro.
    let isValid =
      name &&
      validator.isAlpha(name) &&
      lname &&
      validator.isAlpha(lname) &&
      email &&
      validator.isEmail(email);
    //Si cualquiera de las condiciones de adentro del paréntesis exterior se cumple, alguno de los campos es inválidos. Por tanto, para saber si lo introducido es válido, se retorna la negación del resultado de las validaciones de invalidez.

    return isValid;
  }
  const [number, setNumber] = useState();

  function handleChange(e) {
    const { value, name: inputName } = e.target;
    setValues({ ...values, [inputName]: value });
  }

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, email } = values;
    if (isValidPhoneNumber(number) && validInputs(nombre, apellido, email)) {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        // imgURL obtiene la URL de la imagen stock en la base de datos que se seteará como default en usuarios nuevos creados de este manera
        const imgURL = await storage
          .ref("images/default-avatar.png")
          .getDownloadURL();
        console.log(imgURL);
        console.log("EMAIL_PASSWORD_LOGIN");
        if (type) {
          await createUser(
            {
              name: values.nombre + " " + values.apellido,
              email: values.email,
              phone: number,
              country: "",
              info: "",
              specialty: "",
              education: "",
              schedule: [],
              feedback: [],
              ranking: 0,
              role: "especialista",
              status: "standby",
              img: imgURL,
            },
            response.user.uid
          );
          history.push("/selectReg/registro/upload");
        } else {
          await createUser(
            {
              name: values.nombre + " " + values.apellido,
              email: values.email,
              phone: number,
              country: "",
              info: "",
              role: "usuario",
              img: imgURL,
            },
            response.user.uid
          );
          history.push("/perfil");
        }
      } catch (e) {
        console.log(e);
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
    if (type) {
      history.push("/selectReg/registro/upload");
    } else {
      history.push("/perfil");
    }
  };

  const handleFacebookLogin = async () => {
    console.log("FACEBOOK_LOGIN");
    await auth.signInWithPopup(providerFacebook);
    if (type) {
      history.push("/selectReg/registro/upload");
    } else {
      history.push("/perfil");
    }
  };

  const handleTwitterLogin = async () => {
    console.log("TWITTER_LOGIN");
    await auth.signInWithPopup(providerTwitter);
    if (type) {
      history.push("/selectReg/registro/upload");
    } else {
      history.push("/perfil");
    }
  };

  return (
    <>
      <Navbar />
      <section className="main-RegistroUser" id="pantalla-regis">
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
            <div className="registrate-con titulos datos-titulo">
              O ingresando tus datos:
            </div>
            <div className="inicio-sesion-1">
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
                  className="inputsForm registro-2"
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
                  className="inputsForm registro-2"
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
                  className="inputsForm registro-2"
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
                  className="inputsForm registro-2"
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
                  className="inputsForm registro-2"
                />
                <br />
                <input type="checkbox" className="check" />
                <label className="subtitulos">
                  Confirmo tener 18 años o más.
                </label>
                <br />

                <input type="checkbox" className="check" />
                <label className="subtitulos">
                  Acepto los términos y condiciones.
                </label>
                <br />
              </form>
              <div className="boton-registro-a">
                <button
                  type="button"
                  className="registro-button"
                  onClick={handleSubmit}
                >
                  Iniciar
                </button>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="registrate-con titulos">Regístrate con:</div>
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
                  onClick={handleGoogleLogin}
                >
                  <div className="image3log"></div>
                  <p className="textito"> Ingresar con cuenta de Twitter</p>
                </button>
                <hr class="solid" className="sep lastLine" />
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
    </>
  );
};

export default RegistroUser;
