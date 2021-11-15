import React from "react";
import { bd, storage, auth } from "../../../utils/firebaseConfig";
import EspecialistaCard from "./EspecialistaCard";
import { useState, useEffect } from "react";
import "./Admin.css";
import { useHistory } from "react-router-dom";
import Cargando from "../../cargando/Cargando";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [especialistas, setEspecialistas] = useState({});
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  async function getEspecialistas() {
    try {
      setLoading(true);
      const usersRef = bd.collection("users");
      const users = await usersRef.get();
      let especialistaDocs = {};
      let docData;
      let docId;
      users.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if (docData.role === "especialista" && docData.status === "standby") {
          especialistaDocs[docId] = docData;
          especialistaDocs[docId]["id"] = docId;
        }
      });

      setEspecialistas(especialistaDocs);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getEspecialistas();
  }, [refresh]); //cambios en refresh harán que se llame getEspecialistas

  async function handleAccept(especialista) {
    try {
      setLoading(true);
      const especialistaDoc = bd.collection("users").doc(especialista.id);
      await especialistaDoc.update({ status: "aceptado" });
      setRefresh(refresh + 1);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function handleReject(especialista) {
    try {
      setLoading(true);
      const especialistaDoc = bd.collection("users").doc(especialista.id);
      await especialistaDoc.update({ status: "rechazado" });
      setRefresh(refresh + 1);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  async function openCredentials(especialista) {
    try {
      const storageRef = storage.ref("credentials/" + especialista.id);
      const url = await storageRef.getDownloadURL();
      window.open(url); //se abre el archivo de credenciales del especialista en otra pestaña
    } catch (err) {
      setError(err);
    }
  }

  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  return (
    <>
      <nav className="adminNav">
        <div className="nav-wrapper">
          <div className="adminNavLogo"></div>
        </div>
        <div className="adminLogOut-wrapper">
          <button type="button" className="adminLogOut" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </nav>

      <section className="admin">
        <div className="titulo">¡Bienvenido administrador!</div>
        <div className="containerEspecialistasAdmin">
          <p className="introAdmin">
            Se le presentarán los candidatos postulados, considere su decisión:
          </p>
          <hr />
          {
            //si está cargando, muestra "Cargando..."; si no: si hay un error muestra el mensaje de error;
            //si no: si hay especialistas que mostrar se muestran y si no, muestra "No hay especialistas nuevos."
            loading && !error ? (
              <Cargando />
            ) : error ? (
              <div className="altText">
                Error: {error.message}. <br></br>
                <span className="refreshLink" onClick={() => setError(false)}>
                  Intente refrescar la página.
                </span>
              </div>
            ) : Object.entries(especialistas).length !== 0 ? (
              <div className="especialistaList">
                {Object.keys(especialistas).map((key) => {
                  const especialista = especialistas[key];
                  return (
                    <EspecialistaCard
                      key={especialista.id}
                      especialista={especialista}
                      handleAccept={handleAccept}
                      handleReject={handleReject}
                      handleCredentials={openCredentials}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="altText">
                No hay especialistas nuevos. <br></br>
                <span
                  className="refreshLink"
                  onClick={() => setRefresh(refresh + 1)}
                >
                  Intente refrescar la página.
                </span>
              </div>
            )
          }
        </div>
      </section>
    </>
  );
};

export default Admin;
