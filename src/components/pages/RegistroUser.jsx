import React from "react";
import "./RegistroUser.css";
import { Link } from "react-router-dom";


const RegistroUser = () => {
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

  const handleGoogleLogin = async () => {
    console.log('GOOGLE_LOGIN');
  };
  
    return (
    <section className="main-RegistroUser">
    <div className="TitleRegister">Bienvenido a OMP, comienza tu camino con nosotros</div>
    <div class="linea"></div>

    <div className = "flexbox-container">
      <div className= "left-col">
      <form onSubmit={handleSubmit} className = "all-form">
        <label htmlFor="nombre" className = "titulos">Nombre </label>
        <br />
        <input
          id="nombre"
        name="nombre"
        type="name"
        value={values.nombre}
        onChange={handleChange}
        className = "formulario-input"
        />
        <br />

        <label htmlFor="apellido" className = "titulos">Apellidos </label>
        <br />
        <input
         id="apellido"
        name="apellido"
        type="lastname"
        value={values.apellido}
        onChange={handleChange}
        className = "formulario-input"
        />
        <br />

        <label htmlFor="numero" className = "titulos">Número de teléfono </label>
        <br />
        <input
          id="numero"
          name="numero"
          type="tel"
          value={values.numero}
          onChange={handleChange}
          className = "formulario-input"
        />
        <br />

        <label htmlFor="email" className = "titulos">Correo electrónico </label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className = "formulario-input"
        />
        <br />

        <label htmlFor="password" className = "titulos">Contraseña </label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          className = "formulario-input"
        />
        <br />

        <label htmlFor="password" className = "titulos">Confirmar contraseña </label>
        <br />
        <input
          id="password2"
          name="password2"
          type="password"
          value={values.password2}
          onChange={handleChange}
          className = "formulario-input"
        />
        <br />
        <input type="checkbox" className= "check"/>
        <label className= "subtitulos">
          Confirmo tener 18 años o más.
        </label>
        <br />

        <input type="checkbox" className= "check" />
        <label className= "subtitulos">
          Acepto los términos y condiciones.
        </label>
        <br />

        <button type="button"  className= "registro-button"  onClick={handleSubmit}>
          <Link to="./PerfilUser" >Iniciar</Link>
        </button>
      </form>
    </div>
    
    
    <div className = "right-col">
      <div>
        <button type="button" onClick={handleGoogleLogin} className= "registro-extra">
          Iniciar con cuenta de Google.
        </button>
      </div>
      <br />
      <div>
        <button type="button" onClick={handleGoogleLogin} className= "registro-extra">
          Iniciar con cuenta de Facebook.
        </button>
      </div>
      <br />
      <div>
        <button type="button" onClick={handleGoogleLogin} className= "registro-extra">
          Iniciar con cuenta de Twitter.
        </button>
      </div>
    </div>
    
    </div>

    </section>
  );
};

  
export default RegistroUser;
