import React from "react";
import "./ConfiguracionUser.css";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

const Configuracion = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [shown, setShown] = React.useState(false);
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    country: "",
    numero: "",
    info: "",
    password: "",
    password2: "",
    // foto: "",
  });

  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setValues(currentTarget.value);

  function handleChange(evt) {
    const { value, name: inputName } = evt.target;
    setValues({ ...values, [inputName]: value });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log("Datos actualizados");
    console.log(user);
    history.push("/perfil");
  };

  return (
    <>
      <Navbar />
      <section className="main-RegistroUser">
        <div className="edit">Editar perfil</div>

        <div className="line2"></div>

        <div className="editables">
          <div className="titulo-editables">
            En esta sección puedes actualizar o verificar tus <br /> datos
            personales.
          </div>
          <div className="cuadro1">
            <div className="cuadro2">
              <div className="nombre-edit">
                <div className="titles-edit">Nombre</div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="input-nombre-edit"
                  placeholder="Juan"
                  onChange={handleChange}
                  value={values.nombre}
                />
              </div>

              <div className="apellido-edit">
                <div className="titles-edit">Apellido</div>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  className="input-apellido-edit"
                  placeholder="Perez"
                  onChange={handleChange}
                  value={values.apellido}
                />
              </div>

              <div className="numero-edit">
                <div className="titles-edit">Número telefónico</div>
                <input
                  id="numero"
                  name="numero"
                  type="tel"
                  className="input-numero-edit"
                  placeholder="xxxx-xxxxxxx"
                  onChange={handleChange}
                  value={values.numero}
                />
              </div>

              <div className="pais-edit">
                <div className="titles-edit">País</div>
                <ReactFlagsSelect
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  className="pais-select"
                />
              </div>

              <div className="sobremi-edit">
                <div className="titles-edit">Sobre mi</div>
                <input
                  id="sobremi"
                  name="sobremi"
                  type="text"
                  placeholder="Presentación"
                  className="input-sobremi-edit"
                  onChange={handleChange}
                  value={values.info}
                />
              </div>

              <div className="perfil-edit">
                <div className="titles-edit">Foto de perfil</div>
                <input
                  id="perfil"
                  name="perfil"
                  type="file"
                  accept=".jpg,.png"
                  className="input-foto-edit"
                  onChange={handleChange}
                  // value = {values.foto}
                />
              </div>
            </div>
          </div>
          <div className="cuadro3">
            <button className="config-button">Guardar</button>
          </div>
          <br />
          <br />

          <div className="line3"></div>

          <div className="titulo-editables">
            Si deseas cambiar tu contraseña:
          </div>

          <div className="cuadro1">
            <div className="cuadro2">
              <div className="new-contra">
                <div className="titles-edit">Nueva contraseña</div>

                <input
                  id="password__input2"
                  onChange={onChange}
                  placeholder="***********"
                  type={shown ? "text" : "password"}
                  className="input-contra-edit"
                  value={values.password}
                />
              </div>
            </div>
          </div>

          <div className="cuadro3">
            <button className="password-button" onClick={switchShown}>
              {shown ? (
                <div className="ocultar"></div>
              ) : (
                <div className="mostrar"></div>
              )}
            </button>
            <br />
            <button className="config-button">Cambiar contraseña</button>
          </div>
          <br />
          <br />
        </div>
      </section>
    </>
  );
};

export default Configuracion;
