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

const HistorialPaciente = () => {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [user2, setUser] = useState([]);

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

  // const  getHistorialPacientes = () => {
  //   try {
  //     // UseContext
  //     const userId = "";
  //     const params = { userId: "1" };
  //     const pacienteId = params.userId;
  //     // Historial de pacientes del especialista actual
  //     const historialPacientesDelEspecialista = bd
  //       .collection("historialPacientes")
  //       .doc(userId);
  //     const historialPacienteX = historialPacientesDelEspecialista
  //       .collection("avances")
  //       .where("pacienteId", "==", pacienteId);
  //   } catch (error) {}
  // };

  console.log(user);
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

          <form className={styles.formI}>
            <div className={styles.incidencias}>
              <div className={styles.subt2}>Avances:</div>

              <textarea
                name="avance"
                id="avance"
                className={styles.input}
              ></textarea>
            </div>

            <div className={styles.incidencias}>
              <div className={styles.subt2}>Tratamiento:</div>

              <textarea
                name="tratamiento"
                id="tratamiento"
                className={styles.input}
              ></textarea>
            </div>

            <div className={styles.incidencias}>
              <div className={styles.subt2}>Datos relevantes:</div>

              <textarea
                name="datos"
                id="datos"
                className={styles.input}
              ></textarea>
            </div>
          </form>
        </div>
        <br />
        <br />
      </section>
    </>
  );
};

export default HistorialPaciente;
