import React from "react";
import { bd } from "../../../utils/firebaseConfig";
import TarjetaEspecialista from "../../tarjetaEspecialista/TarjetaEspecialista";
import { useState, useEffect } from "react";
import "./SeccionEspecialistasInicio.css";
import "firebase/firestore";

const SeccionEspecialistasInicio = () => {
  const [loading, setLoading] = useState(true);
  const [especialistas, setEspecialistas] = useState({});
  const [error, setError] = useState(null);

  function desplegarEspecialistas(especialistas) {
    var especialistasval = Object.values(especialistas);
    var espId = Object.keys(especialistas);
    for (let index = 1; index < especialistasval.length; index++) {
      let current = especialistasval[index];
      let j = index - 1;
      while (j > -1 && current.ranking >= especialistasval[j].ranking) {
        espId[j + 1] = especialistasval[j].id;
        especialistasval[j + 1] = especialistasval[j];
        j--;
      }
      espId[j + 1] = current.id;
      especialistasval[j + 1] = current;
    }
    var arr = [];
    let i = 4;
    if (espId.length < 4) {
      i = espId.length;
    }
    for (let index = 0; index < i; index++) {
      arr.push(espId[index]);
    }
    return arr;
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
        if (docData.role === "especialista" && docData.status === "aceptado") {
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
  }, []);
  return (
    <section className="esp-sec">
      <div className="containerEspecialistasInicio">
        {
          //si está cargando, muestra "Cargando..."; si no: si hay un error muestra el mensaje de error;
          //si no: si hay especialistas que mostrar se muestran y si no, muestra "No hay especialistas nuevos."
          loading && !error ? (
            <div className="altText">Cargando...</div>
          ) : error ? (
            <div className="altText">
              Error: {error.message}. Intente refrescar la página.
            </div>
          ) : Object.entries(especialistas).length !== 0 ? (
            <div className="especialistaInicioList">
              {desplegarEspecialistas(especialistas).map((key) => {
                const especialista = especialistas[key];
                return (
                  <TarjetaEspecialista
                    key={especialista.id}
                    especialista={especialista}
                  />
                );
              })}
            </div>
          ) : (
            <div className="altText">No hay especialistas nuevos.</div>
          )
        }
      </div>
    </section>
  );
};

export default SeccionEspecialistasInicio;
