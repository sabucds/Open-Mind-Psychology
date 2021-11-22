import React from "react";
import "./ConfiguracionUser.css";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { bd, auth, storage } from "../../../utils/firebaseConfig";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import CargandoDatos from "../../cargando/CargandoDatos";

const Configuracion = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [shown, setShown] = useState(false);
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [country, setCountry] = useState("");
  const [number, setNumber] = useState("");
  const [info, setInfo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [picture, setPicture] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [eImg, setEImg] = useState(false);

  const switchShown = () => setShown(!shown);
  const handlePicture = (e) => {
    setEImg(e);
    setPicture(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    // Esto es lo que agarra al archivo perse
    const file = e.target.files[0];
    // Referencia a la imagen
    const imgRef = storage.ref("images/" + user.id + ".png");

    // Con esto logramos subir el archivo perse
    const upload = imgRef.put(file);

    upload.on(
      "state_changed",
      function progress(snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Archivo " + progress + "% listo");
      },
      function error(error) {
        console.error(error);
        alert("Hubo un error al subir la imagen, por favor, intente de nuevo.");
      },
      function complete() {
        console.info("Carga finalizada");
      }
    );
  };

  const handleSubmit = async (evt) => {
    console.log(country);
    evt.preventDefault();
    setSaving(true);
    try {
      var errorMessage =
        "Se detectaron cambios inválidos que no se guardaron en:\n";
      var successMessage =
        "Se guardaron los cambios para los siguientes campos:\n";
      var userDoc = bd.collection("users").doc(user.id);

      if (picture) {
        console.log("Imagen URL:");
        handleUpload(eImg);
        const imgURL = await storage
          .ref("images/" + user.id + ".png")
          .getDownloadURL();
        console.log(imgURL);
        userDoc.update({ img: imgURL });
        successMessage += "Imagen\n";
        setPicture(false);
      }

      if (name) {
        if (validator.isAlpha(name, "es-ES", "-")) {
          let oldName = user.name.split(" ");
          const newName = name + " " + oldName[1];
          await userDoc.update({ name: newName });
          user.name = newName;
          successMessage += "Nombre\n";
        } else {
          errorMessage += "Nombre\n";
        }
      }
      if (lname) {
        if (validator.isAlpha(lname, "es-ES", "-")) {
          let oldName = user.name.split(" ");
          const newName = oldName[0] + " " + lname;
          await userDoc.update({ name: newName });
          user.name = newName;
          successMessage += "Apellido\n";
        } else {
          errorMessage += "Apellido\n";
        }
      }
      if (country) {
        await userDoc.update({ country: country });
        successMessage += "País\n";
      }
      if (number) {
        if (isValidPhoneNumber) {
          await userDoc.update({ phone: number });
          successMessage += "Número\n";
        } else {
          errorMessage += "Número\n";
        }
      }
      if (info) {
        await userDoc.update({ info: info });
        successMessage += "Información sobre mí";
      }
    } catch (err) {
      alert("Hubo un error al guardar: " + err.message);
    }
    setSaving(false);
    if (
      successMessage !==
      "Se guardaron los cambios para los siguientes campos:\n"
    ) {
      alert(successMessage);
    }
    if (
      errorMessage !==
      "Se detectaron cambios inválidos que no se guardaron en:\n"
    ) {
      alert(errorMessage);
    }
    setName("");
    setLname("");
    setNumber("");
    setCountry(null);
    setInfo("");
  };

  const handleExit = () => {
    history.push("/perfil");
    window.location.reload();
  };

  const handlePassChange = async () => {
    if (newPassword) {
      setUpdating(true);
      var currentUser = auth.currentUser;
      try {
        await currentUser.updatePassword(newPassword);
        alert("Su contraseña fue actualizada exitosamente.");
      } catch (err) {
        if (
          err.message ===
          "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
        ) {
          alert(
            "Para cambiar de contraseña necesitará volver a iniciar sesión e intentar nuevamente."
          );
        } else if (err.message === "Password should be at least 6 characters") {
          alert("ERROR: la contraseña debe tener al menos 6 caracteres.");
        } else {
          alert("ERROR: " + err.message);
        }
      }
      setUpdating(false);
      setNewPassword("");
    }
  };

  return (
    <>
      {saving ? (
        <CargandoDatos />
      ) : (
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
                      placeholder="Nombre"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>

                  <div className="apellido-edit">
                    <div className="titles-edit">Apellido</div>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      className="input-apellido-edit"
                      placeholder="Apellido"
                      onChange={(e) => setLname(e.target.value)}
                      value={lname}
                    />
                  </div>

                  <div className="numero-edit">
                    <div className="titles-edit">Número telefónico</div>
                    <PhoneInput
                      id="numero2"
                      name="numero"
                      className="input-numero-edit"
                      onChange={setNumber}
                      value={number}
                    />
                  </div>

                  <div className="pais-edit">
                    <div className="titles-edit">País</div>
                    <ReactFlagsSelect
                      selected={country}
                      onSelect={(code) => setCountry(code)}
                      className="pais-select"
                    />
                  </div>

                  <div className="textArea-edit">
                    <div className="titles-edit">Sobre mí</div>
                    <textarea
                      id="sobremi"
                      name="sobremi"
                      placeholder="Presentación"
                      className="input-textArea-edit"
                      onChange={(e) => setInfo(e.target.value)}
                      value={info}
                    ></textarea>
                  </div>

                  <div className="perfil-edit">
                    <div className="titles-edit">Foto de perfil</div>
                    <input
                      id="perfil"
                      name="perfil"
                      type="file"
                      accept=".png"
                      className="input-foto-edit"
                      onChange={handlePicture}
                      // value={picture}
                    />
                  </div>
                </div>
              </div>
              <div className="cuadro3">
                <button
                  type="button"
                  className="config-button"
                  onClick={handleSubmit}
                  disabled={saving}
                  style={{ background: saving ? "#CCC" : "#EE9D6B" }}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="config-button"
                  onClick={handleExit}
                  disabled={saving}
                  style={{ background: saving ? "#CCC" : "#EE9D6B" }}
                >
                  Salir
                </button>
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
                      id="password_input"
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="***********"
                      type={shown ? "text" : "password"}
                      className="input-contra-edit"
                      value={newPassword}
                    />
                    <button className="password-button" onClick={switchShown}>
                      {shown ? (
                        <div className="ocultar"></div>
                      ) : (
                        <div className="mostrar"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="cuadro3">
                <br />
                <button
                  className="config-button"
                  type="button"
                  onClick={handlePassChange}
                  disabled={updating}
                  style={{ background: updating ? "#CCC" : "#EE9D6B" }}
                >
                  Cambiar contraseña
                </button>
              </div>
              <br />
              <br />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Configuracion;
