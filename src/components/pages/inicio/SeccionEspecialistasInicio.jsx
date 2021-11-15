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
  const [refresh] = useState(0);

  function desplegarEspecialistas(especialistas) {
    var arr = [];
    let i = 4;
    if (especialistas.length < 4) {
      i = especialistas.length;
    }
    for (let index = 0; index < i; index++) {
      arr.push(especialistas[index]);
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
  }, [refresh]); //cambios en refresh harán que se llame getEspecialistas

  return (
    <section className="admin-1">
      <div className="containerEspecialistasAdmin">
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
            <div className="especialistaList-1">
              {desplegarEspecialistas(Object.keys(especialistas)).map((key) => {
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
