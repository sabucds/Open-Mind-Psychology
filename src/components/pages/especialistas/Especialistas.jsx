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

  function rankingSort() {
    console.log(espId);

    for (let index = 1; index < Object.values(especialistas).length; index++) {
      let current = Object.values(especialistas)[index].ranking;
      // The last element of our sorted subarray
      let j = index - 1;
      while (j > -1 && current >= Object.values(especialistas)[j].ranking) {
        espId[j + 1] = espId[j];
        j--;
      }
      espId[j + 1] = Object.keys(especialistas)[index];
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
      const usersRef = await bd.collection("users");
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
    Object.keys(especialistas).forEach((id, i) => {
      if (searchResults.includes(id) && !filterEspecialista(id)) {
        const x = searchResults.indexOf(id);
        searchResults.splice(x, 1);
      } else if (filterEspecialista(id)) {
        searchResults.push(id);
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
      console.log(searchResults.length);
      searchResults.length > 0 ? setResults(true) : setResults(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEspecialistas();
  }, [refresh]);

  return (
    <>
      <Navbar />
      <section className="search-esp">
        <div className="search-box">
          <div className="searchTitles">
            <div className="searchTitle">
              Busca a tu especialista por su nombre
            </div>
            <div className="searchTitle">Aplica filtros a tu búsqueda</div>
          </div>
          <br />
          <div className="searchInputs">
            <div className="byNameInputs">
              <input
                type="text"
                className="inputsForm"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <button
                type="submit"
                className={loading ? "disabled-search-button" : "search-button"}
                title="Buscar"
                onClick={handleSearch}
                disabled={loading}
              ></button>
            </div>
            <div className="filterInputs">
              <div className="searchRanking" htmlFor="checkRanking">
                <input
                  type="checkbox"
                  className="checkRanking"
                  name="checkRanking"
                  onChange={() => setRanking(!ranking)}
                />
                Buscar por ranking
              </div>
              <div className="searchSymptom">
                Filtrar por síntomas
                <Sintomas />
              </div>
            </div>
          </div>
        </div>

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
