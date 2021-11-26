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
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [symptomList, setSymptomList] = useState([]);
  const [refreshSymptoms, setRefreshSymptoms] = useState(0);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  async function getSymptoms() {
    try {
      setLoadingSymptoms(true);
      const symptomsRef = bd.collection("symptoms");
      const symptoms = await symptomsRef.get();
      let symptomDocs = [];
      symptoms.forEach((doc) => {
        symptomDocs.push(doc.data());
      });
      setSymptomList(symptomDocs);
      setLoadingSymptoms(false);
    } catch (e) {
      console.log(e);
      setLoadingSymptoms(false);
    }
  }

  useEffect(() => {
    getSymptoms();
  }, [refreshSymptoms])  //cambios en refreshSymptoms harán que se llame getSymptoms

  function handleAdd() {
    setLoadingSymptoms(true);
    if (value && label) {
      if(!symptomList.some((symptomObj) => (symptomObj.value === value))) {
        bd.collection("symptoms").add({value: value, label: label})
        .then(() => {
          setLoadingSymptoms(false);
          setRefreshSymptoms(refreshSymptoms+1);
          setValue("");
          setLabel("");
        })
        .catch(() => {
          setLoadingSymptoms(false);
          alert("El síntoma no pudo ser agregado.");
        });
      } else {
        setLoadingSymptoms(false);
        alert("La clave introducida no es única.");
      }
    } else {
      alert("Rellene ambos campos para añadir un nuevo síntoma.");
      setLoadingSymptoms(false);
    }
    
  }

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
        <div className="containerEspecialidadesAdmin">
          <p className="introAdmin">
            A continuación, podrá agregar más especialidades disponibles en la plataforma:
          </p>
          <hr />
          <div className="symptomInputs">
            <label htmlFor="label">Nombre del síntoma/especialidad</label>
            <input type="text" name="label" className="inputsForm" placeholder="Ej. Depresión" onChange={(e)=>setLabel(e.target.value)} value={label}/>
            <label htmlFor="value">Clave única del síntoma/especialidad</label>
            <input type="text" name="value" className="inputsForm" placeholder="Ej. depresion" onChange={(e)=>{setValue(e.target.value)}} value={value}/>
            <button type="button" onClick={handleAdd} disabled={loadingSymptoms} style={{ background: loadingSymptoms ? "#CCC" : "#EE9D6B" }} className="button-format">Añadir</button>
          </div>
          <div className="especialidades">
            Síntomas/especialidades disponibles en la plataforma:
            {loadingSymptoms ? 
              <p className="altText">Cargando síntomas...</p> : 
              symptomList.length === 0 ? 
              <p className="altText">Aún no se han agregado síntomas</p> :
              <ul className="lista-especialidades">
                {symptomList.map((esp) => {
                  return <li key={esp.value}>{esp.label}</li>;
                })}
             </ul>
            }
          </div>
        </div>
       <br /><br />
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
