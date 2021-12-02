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
  const [loadingEntries, setLoadingEntries] = useState(false);

  const [dataSave, setdataSave] = useState();
  const [refreshEntry, setrefreshEntry] = useState(0);
  const [historialPacienteX, sethistorialPacienteX] = useState([]);
  const [pacienteId, setpacienteId] = useState("");
  

  async function getUserInfo() {
    setLoadingEntries(true)
    try {
      const usersQuery = await bd.collection("users").doc(params.userId).get();
      // usersQuery["id"] = params.userId
      if (!user2.includes(usersQuery.data())){
        user2.push(usersQuery.data())
        user2[0]["id"] = params.userId
      }
      console.log(user2[0]["id"])
      console.log(user.id)
      const historialPacientesDelEspecialista = await bd.collection("historialPacientes").doc(user.id);
      const prueba = await historialPacientesDelEspecialista.collection("avances").where("pacienteId", "==", user2[0].id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let docc = doc.data();
          if (!historialPacienteX.includes(docc)) {
            historialPacienteX.push(docc);
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoadingEntries(false)
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
      setLoadingEntries(false)
    }
    setLoadingEntries(false)
  }

  const onSave = async () => {
    setLoadingEntries(true)
    try {
      const avance = {
        pacienteId: params.userId,
        entry: dataSave,
      };

      const historialPacientesDelEspecialista = await bd
        .collection("historialPacientes")
        .doc(user.id);

      const historialPacienteActual = historialPacientesDelEspecialista
        .collection("avances")
        .add(avance);
        historialPacienteX.push(avance)
      alert("¡Entrada guardada exitósamente!");
    } catch (error) {
      console.error(error);
      setLoadingEntries(false)
    }
    setLoadingEntries(false)
  };
  

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <><Navbar />
    {user2.length > 0 && !loadingEntries ?(
      <section className={styles.sect}>
        <div className={styles.encabezado}>
          <div className={styles.tit}> Historia de {user2[0].name} </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.sectBody}>
          <div className={styles.tit2}>Crear nueva incidencia:</div>
          <div className={styles.boxI}>
            <div className={styles.editor}>
              <TextEditor
                handleTextChange={(editorText) => setdataSave(editorText)}
                className = {styles.boxI}
              />
            </div>
          </div>
          <div className={styles.buttonS} onClick={onSave}>
            Guardar entrada
          </div>
          <div className="grupo-comentario">
            <div className={styles.entries}>
              {loadingEntries ? (
                <div className="altText">Cargando comentarios...</div>
              ) : historialPacienteX.length > 0 ? (
                historialPacienteX.map((review) => {
                  return (
                    <div className={styles.box}>
                      <div className = {styles.tit3}>Avance: </div>
                      <div className={styles.line3}></div>
                      <div className="text-comment">
                        <p className = {styles.subt3}>{review.entry.replace("<p>","").replace("</p>","")}</p>
                      </div>
                      <br />
                    </div>
                  );
                })
              ) : (
                <div className="altText">
                  Este paciente aún no tiene incidencias.
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>
      ) : (
        <Cargando />
      )}
    </>
  );
};

export default HistorialPaciente;
