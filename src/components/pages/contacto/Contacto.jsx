import React from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState } from "react";
import "./Contacto.css";
import validator from "validator";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

const Contacto = () => {
  const [contactNombre, setContactNombre] = useState("");
  const [contactApellido, setContactApellido] = useState("");
  const [contactCorreo, setContactCorreo] = useState("");
  const [contactMensaje, setContactMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  function validInputs(name, lname, email, userInput, isPhoneNumber) {
    //esta función será usada para validar inputs del usuario en el formulario de contacto y el de registro.
    let isValid = !(
      !name ||
      !validator.isAlpha(name, "es-ES", "-") ||
      !lname ||
      !validator.isAlpha(lname, "es-ES", "-") ||
      !userInput ||
      !email ||
      !validator.isEmail(email)
    );
    //Si cualquiera de las condiciones de adentro del paréntesis exterior se cumple, alguno de los campos es inválidos. Por tanto, para saber si lo introducido es válido, se retorna la negación del resultado de las validaciones de invalidez.
    if (isPhoneNumber) {
      //aquí hace falta la validación del teléfono. luego dentro de este mismo if puede hacerse return (isValidPhone && isValid)
    }
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      validInputs(
        contactNombre,
        contactApellido,
        contactCorreo,
        contactMensaje,
        false
      )
    ) {
      bd.collection("contacts")
        .add({
          name: contactNombre + " " + contactApellido,
          email: contactCorreo,
          message: contactMensaje,
        })
        .then(() => {
          setLoading(false);
          alert(
            "¡Mensaje el mensaje fue enviado con éxito!\nGracias por contactarnos."
          );
        })
        .catch(() => {
          setLoading(false);
          alert("El mensaje no pudo ser enviado.");
        });

      setContactNombre("");
      setContactApellido("");
      setContactCorreo("");
      setContactMensaje("");
    } else {
      setLoading(false);
      alert(
        "El mensaje no pudo ser enviado.\nValide lo introducido en los campos."
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="contact">
        <div className="titulo">Contáctanos</div>

        <form className="contactForm" onSubmit={handleSubmit}>
          <label
            htmlFor="contactName"
            title="Introduce aquí tu nombre. Evita caracteres NO alfabéticos."
          >
            Nombre
          </label>

          <input
            type="text"
            name="contactName"
            className="inputsForm"
            placeholder="Nombre"
            value={contactNombre}
            onChange={(e) => setContactNombre(e.target.value)}
            title="Introduce aquí tu nombre. Evita caracteres NO alfabéticos. Evita caracteres NO alfabéticos."
          />
          <br />

          <label
            htmlFor="contactLastName"
            title="Introduce aquí tu apellido. Evita caracteres NO alfabéticos."
          >
            Apellido
          </label>
          <input
            type="text"
            name="contactLastName"
            className="inputsForm"
            placeholder="Apellido"
            value={contactApellido}
            onChange={(e) => setContactApellido(e.target.value)}
            title="Introduce aquí tu apellido. Evita caracteres NO alfabéticos."
          />
          <br />

          <label htmlFor="contactEmail" title="Introduce aquí tu correo.">
            Correo electrónico
          </label>
          <input
            type="email"
            name="contactEmail"
            className="inputsForm"
            placeholder="ejemplo@correo.com"
            value={contactCorreo}
            onChange={(e) => setContactCorreo(e.target.value)}
            title="Introduce aquí tu correo."
          />
          <br />

          <label htmlFor="contactMessage" title="Introduce aquí tu mensaje.">
            Mensaje
          </label>
          <textarea
            name="contactMessage"
            id="contactMessage"
            placeholder="Escribe tu mensaje aquí"
            value={contactMensaje}
            onChange={(e) => setContactMensaje(e.target.value)}
            title="Introduce aquí tu mensaje."
          ></textarea>
          <br />

          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? "#CCC" : "#EE9D6B" }}
            className="button-format"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Contacto;
