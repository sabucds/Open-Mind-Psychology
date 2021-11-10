import React from "react";
import { Link } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  const [values, setValues] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    numero: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }

  return (
    <section className="main-sesion">
      <div className="title">¡Bienvenido! Inicia sesión con nosotros</div>
      <div class="linea"></div>
      <form onSubmit={handleSubmit} className="formulario">
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
          className="iniciar-input"
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
          className="iniciar-input"
        />
        <p className="letras">¿Olvidaste tu contraseña?</p>
        <button type="button" className="iniciar-button" onClick={handleSubmit}>
          <Link to="./">Iniciar</Link>{" "}
          {/* Como hay que validar a donde va cuando inicie secion dependiendo si es user o especialista lo puse que vaya al inicio */}
        </button>
      </form>
      <br />
      <p className="subtitle">¿Todavia no tienes cuenta?</p>
      <div className="RegistrosLinks">
        <div>
          <Link className="registra-link" to="/SelectReg">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IniciarSesion;
