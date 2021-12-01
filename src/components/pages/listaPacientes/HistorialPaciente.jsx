import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { bd } from "../../../utils/firebaseConfig";
import firebase from "firebase/app";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
// Components
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";
import { useParams } from "react-router-dom";
import styles from "./ListaPacientes.module.css";
import TextEditor from "./TextEditor";

const HistorialPaciente = () => {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [user2, setUser] = useState([]);
  const [dataSave, setdataSave] = useState();

  async function getUserInfo() {
    try {
      const usersQuery = await bd.collection("users").doc(params.userId).get();
      const user2 = usersQuery.data();
      user2.id = usersQuery.id;
      setUser(user2);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  const onSave = () => {
    try {
      const avance = {
        pacienteId: params.userId,
        entry: dataSave,
      };

      const historialPacientesDelEspecialista = bd
        .collection("historialPacientes")
        .doc(user.id);

      const historialPacienteActual = historialPacientesDelEspecialista
        .collection("avances")
        .add(avance);

      alert("¡Entrada guardada exitósamente!");
    } catch (error) {
      console.error(error);
    }
  };

  const getHistorialPacientes = () => {
    try {
      // UseContext
      const userId = "";
      const pacienteId = params.userId;
      // Historial de pacientes del especialista actual
      const historialPacientesDelEspecialista = bd
        .collection("historialPacientes")
        .doc(userId);
      const historialPacienteX = historialPacientesDelEspecialista
        .collection("avances")
        .where("pacienteId", "==", pacienteId);
    } catch (error) {}
  };

  return (
    <>
      <Navbar />
      <section className={styles.sect}>
        <div className={styles.encabezado}>
          <div className={styles.tit}> Historia de {user2.name} </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.sectBody}>
          <div className={styles.tit2}>Crear nueva incidencia:</div>
          <div className={styles.boxI}>
            <div className={styles.editor}>
              <TextEditor
                handleTextChange={(editorText) => setdataSave(editorText)}
              />
            </div>
          </div>
          <div className={styles.buttonS} onClick={onSave}>
            Guardar historia
          </div>
        </div>
        <br />
        <br />
      </section>
    </>
  );
};

export default HistorialPaciente;
