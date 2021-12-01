import React from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import "firebase/firestore";
import "./Especialistas.css";
import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import Sintomas from "../../inputTags/InputTags";
import { lista } from "../../inputTags/InputTags";
import TarjetaEspecialista from "../../tarjetaEspecialista/TarjetaEspecialista";
import Cargando from "../../cargando/Cargando";

const Especialistas = () => {
  const [nombre, setNombre] = useState("");
  const [ranking, setRanking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [especialistas, setEspecialistas] = useState({});
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState(false);
  const [searchResults] = useState([]);
  const [esVacio, setEsVacio] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [espId, setEspId] = useState([]);
  const [symptomList, setSymptomList] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);

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
  }, []);

  function rankingSort() {
    var especialistasval = Object.values(especialistas);
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
  }

  function desplegarEspecialistas(especialistas, resultadosId) {
    var arr = [];
    if (resultadosId === 1) {
      for (let index = 0; index < especialistas.length; index++) {
        arr.push(especialistas[index]);
      }
      return arr;
    } else {
      for (let index = 0; index < especialistas.length; index++) {
        for (let j = 0; j < resultadosId.length; j++) {
          if (
            especialistas[index] === resultadosId[j] &&
            !arr.includes(resultadosId[j])
          ) {
            arr.push(resultadosId[j]);
          }
        }
      }
      return arr;
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
        if (docData.role === "especialista" && docData.status === "aceptado") {
          especialistaDocs[docId] = docData;
          especialistaDocs[docId]["id"] = docId;
        }
      });
      setEspecialistas(especialistaDocs);
      if (espId.length === 0) {
        setEspId(Object.keys(especialistaDocs));
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  const containsSpecialty = (especialista) => {
    var specialty = especialista.specialty;
    console.log(lista);
    for (let i = 0; i < lista.length; i++) {
      if (specialty.indexOf(lista[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  const filterEspecialista = (id) => {
    var isValid = true;
    const especialista = especialistas[id];
    if (nombre) {
      isValid =
        isValid &&
        especialista.name.toLowerCase().includes(nombre.toLowerCase());
    }
    if (lista.length > 0) {
      isValid = isValid && containsSpecialty(especialista);
    }
    if (nombre === "" && lista.length === 0) {
      setEsVacio(true);
    }
    return isValid;
  };

  const getSearchResults = () => {
    setLoading(true);
    Object.keys(especialistas).forEach((id) => {
      if (searchResults.includes(id) && !filterEspecialista(id)) {
        const x = searchResults.indexOf(id);
        searchResults.splice(x, 1);
      } else if (filterEspecialista(id)) {
        if (!searchResults.includes(id)) {
          searchResults.push(id);
        }
      }
    });
  };

  const handleSearch = async () => {
    setEsVacio(false);
    setLoading(true);
    setRefresh(refresh + 1);
    if (ranking) {
      rankingSort();
    } else {
      setEspId(Object.keys(especialistas));
    }
    if (!error) {
      setSearch(true);
      getSearchResults();
      searchResults.length > 0 ? setResults(true) : setResults(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEspecialistas();
  }, [refresh]);

  return (
    <>
      <Navbar />
      <section className="search-esp">
        <div className="search-box">
          <div className="encabezado">
            <div className="TitleRegister">¡Busca a tu psicólogo ideal!</div>
          </div>
          <div className="line"></div>
          <br />
          <div className="busqueda-sect">
            <div className="searchInputs">
              <div className="byNameInputs" id="by-name-inputs">
                <input
                  type="text"
                  className="inputsForm"
                  id="name-esp-b"
                  placeholder="Ingresa el nombre y/o apellido"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="filterInputs">
                <div className="searchSymptom">
                  {loadingSymptoms ? <p className="altText">Cargando...</p> :
                  <Sintomas symptomOptions={symptomList}/>
                  }
                </div>
                <label className="searchRanking">
                  Buscar por ranking
                  <input
                    type="checkbox"
                    className="checkRanking"
                    name="checkRanking"
                    onChange={() => setRanking(!ranking)}
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="buscar-button-sect">
              <div
                className={
                  loading
                    ? "buscar-button-esp disabled-search-button"
                    : "buscar-button-esp"
                }
                title="Buscar"
                onClick={handleSearch}
                disabled={loading}
              >
                Buscar
                <button className="search-button"></button>
              </div>
            </div>
          </div>
        </div>

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
          ) : results && !esVacio ? (
            <>
              <div className="especialistaList-1">
                {desplegarEspecialistas(espId, searchResults).map((key) => {
                  const especialista = especialistas[key];
                  return (
                    <TarjetaEspecialista
                      key={especialista.id}
                      especialista={especialista}
                    />
                  );
                })}
              </div>
            </>
          ) : search && !esVacio ? (
            <div className="altText">
              No se consiguieron especialistas que coincidieran con la búsqueda.
            </div>
          ) : (
            <div className="especialistaList-1">
              {desplegarEspecialistas(espId, 1).map((key) => {
                const especialista = especialistas[key];
                return (
                  <TarjetaEspecialista
                    key={especialista.id}
                    especialista={especialista}
                  />
                );
              })}
            </div>
          )
        }
      </section>
    </>
  );
};

export default Especialistas;
