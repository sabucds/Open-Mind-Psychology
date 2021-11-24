import React from "react";
import "./ConfiguracionEsp.css";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { bd, auth, storage } from "../../../utils/firebaseConfig";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Sintomas from "../../inputTags/InputTags";
import { lista } from "../../inputTags/InputTags";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import CargandoDatos from "../../cargando/CargandoDatos";

const ConfiguracionEsp = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [shown, setShown] = useState(false);
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [country, setCountry] = useState("");
  const [number, setNumber] = useState("");
  const [info, setInfo] = useState("");
  const [edu, setEdu] = useState("");
  //const [spec, setSpec] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [picture, setPicture] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [eImg, setEImg] = useState(false);
  const [weekDisp, setWeekDisp] = useState({
    Monday: {
      start: "",
      end: "",
    },
    Tuesday: {
      start: "",
      end: "",
    },
    Wednesday: {
      start: "",
      end: "",
    },
    Thursday: {
      start: "",
      end: "",
    },
    Friday: {
      start: "",
      end: "",
    },
    Saturday: {
      start: "",
      end: "",
    },
    Sunday: {
      start: "",
      end: "",
    },
  });

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

  function isFirstBlank(weekDisp) {
    if (
      (weekDisp.Monday.start.length >= 1 && weekDisp.Monday.end === "") ||
      (weekDisp.Tuesday.start.length >= 1 && weekDisp.Tuesday.end === "") ||
      (weekDisp.Wednesday.start.length >= 1 && weekDisp.Wednesday.end === "") ||
      (weekDisp.Thursday.start.length >= 1 && weekDisp.Thursday.end === "") ||
      (weekDisp.Friday.start.length >= 1 && weekDisp.Friday.end === "") ||
      (weekDisp.Saturday.start.length >= 1 && weekDisp.Saturday.end === "") ||
      (weekDisp.Sunday.start.length >= 1 && weekDisp.Sunday.end === "")
    ) {
      return true;
    }
    return false;
  }

  function isSecondBlank(weekDisp) {
    if (
      (weekDisp.Monday.end.length >= 1 && weekDisp.Monday.start === "") ||
      (weekDisp.Tuesday.end.length >= 1 && weekDisp.Tuesday.start === "") ||
      (weekDisp.Wednesday.end.length >= 1 && weekDisp.Wednesday.start === "") ||
      (weekDisp.Thursday.end.length >= 1 && weekDisp.Thursday.start === "") ||
      (weekDisp.Friday.end.length >= 1 && weekDisp.Friday.start === "") ||
      (weekDisp.Saturday.end.length >= 1 && weekDisp.Saturday.start === "") ||
      (weekDisp.Sunday.end.length >= 1 && weekDisp.Sunday.start === "")
    ) {
      return true;
    }
    return false;
  }

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

      if (weekDisp) {
        if (isFirstBlank(weekDisp) || isSecondBlank(weekDisp)) {
          errorMessage += "Disponibilidad\n";
        } else {
          successMessage += "Disponibilidad\n";
          await userDoc.update({ schedule: weekDisp });
          console.log(weekDisp);
        }
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
        successMessage += "Información sobre mí\n";
      }
      if (edu) {
        await userDoc.update({ education: edu });
        successMessage += "Educación\n";
      }
      if (lista.length > 0) {
        await userDoc.update({ specialty: lista });
        successMessage += "Especialidades\n";
      }

      if (picture) {
        handleUpload(eImg);
        console.log("Imagen URL:");
        const imgURL = await storage
          .ref("images/" + user.id + ".png")
          .getDownloadURL();
        console.log(imgURL);
        userDoc.update({ img: imgURL });
        successMessage += "Imagen\n";
        setPicture(false);
      }
    } catch (err) {
      alert("Hubo un error al guardar.");
      console.log(err.message);
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
    setEdu("");
    //setSpec("");
  };

  const handleExit = () => {
    history.push("/perfil");
    window.location.reload();
  };

  const handleWeekDispChange = (event) => {
    const { id, value } = event.target;
    const [day, key] = id.split("-");
    setWeekDisp((prev) => {
      const newWeekDisp = { ...prev };
      newWeekDisp[day][key] = value;

      return newWeekDisp;
    });
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
          alert("Hubo un error al intentar cambiar la contraseña.");
          console.log(err.message);
        }
      }
      setUpdating(false);
      setNewPassword("");
    }
  };

  return (
    <>
      {saving || updating ? (
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
                      id="numero3"
                      name="numero"
                      className="input-numero-edit"
                      onChange={setNumber}
                      value={number}
                    />
                  </div>
                  <div className="dispon-container">
                    <div className="titles-edit">Disponibilidad</div>

                    <div className="dispon-edit">
                      <div className="dispon-edit1">
                        <div className="titles-week">Lunes</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Monday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Monday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Martes</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Tuesday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Tuesday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Miercoles</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Wednesday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Wednesday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Jueves</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Thursday-start"
                            onChange={handleWeekDispChange}
                          />

                          <input
                            type="time"
                            className="input-time"
                            id="Thursday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Viernes</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Friday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Friday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Sábado</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Saturday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Saturday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                      <div className="dispon-edit1">
                        <div className="titles-week">Domingo</div>

                        <div className="hours-container">
                          <input
                            type="time"
                            className="input-time"
                            id="Sunday-start"
                            onChange={handleWeekDispChange}
                          />
                          <input
                            type="time"
                            className="input-time"
                            id="Sunday-end"
                            onChange={handleWeekDispChange}
                          />
                        </div>
                      </div>
                    </div>
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

                  <div className="textArea-edit">
                    <div className="titles-edit">Educación</div>
                    <textarea
                      id="educacion"
                      name="educacion"
                      placeholder="Formación académica"
                      className="input-textArea-edit"
                      onChange={(e) => setEdu(e.target.value)}
                      value={edu}
                    ></textarea>
                  </div>

                  <div className="esp-edit">
                    <div className="titles-edit">Especialidades</div>
                    <Sintomas className="esp-select" />
                  </div>

                  <div className="perfil-edit">
                    <div className="titles-edit">Foto de perfil</div>
                    <input
                      id="perfil"
                      name="perfil"
                      type="file"
                      accept="image/*"
                      className="input-foto-edit"
                      onChange={handlePicture}
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

export default ConfiguracionEsp;
