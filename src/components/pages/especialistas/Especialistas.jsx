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
  var searchResults = [];


  async function getEspecialistas() {
    try {
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
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  const containsSpecialty = (especialista, symptoms) => {
    var specialty = especialista.specialty;
    for (let i = 0 ; i<symptoms.length ; i++) {
      if (specialty.indexOf(symptoms[i])===-1) {
        return false;
      }
    }
    return true;
  } 

  const filterEspecialista = (id, symptoms) => {
    var isValid = true;
    const especialista = especialistas[id];
    if (nombre) { 
      isValid = isValid && especialista.name.toLowerCase().includes(nombre.toLowerCase());
    }
    if (symptoms.length>0) {
      isValid = isValid && containsSpecialty(especialista, symptoms);
    }
    return isValid;
  }

  const handleSearch = async () => {
    setLoading(true);
    await getEspecialistas();
    if (!error) {
      setSearch(true);
      const symptoms = lista;
      searchResults = Object.keys(especialistas)
      .filter((id) => {filterEspecialista(id, symptoms)});
      setLoading(false);
      console.log(searchResults);
    }

  }


  return (
    <>
      <Navbar />
      <section className="search-esp">
        <div className="search-box">
          <div className="searchTitles">
            <div className="searchTitle">Busca a tu especialista por su nombre</div>
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
              <button type="submit" className={loading ? "disabled-search-button" : "search-button"} title="Buscar" onClick={handleSearch} disabled={loading}></button>
            </div>          
            <div className="filterInputs">
              <div className="searchRanking" htmlFor="checkRanking">
                <input type="checkbox" className="checkRanking" name="checkRanking" onChange={()=>setRanking(!ranking)}/>
                Buscar por ranking
              </div>
              <div className="searchSymptom" >Filtrar por síntomas
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
            ) : searchResults.length !== 0 ? (
              <div className="especialistaList">
                {searchResults.map((key) => {
                  const especialista = especialistas[key];
                  return (
                    <TarjetaEspecialista
                    key={especialista.id}
                    especialista={especialista}
                  />
                  );
                })}
              </div>
            ) : search ? (
              <div className="altText">
                No se consiguieron especialistas que coincidieran con la búsqueda.
              </div>
            ) : (
              <div className="altText">
                Busque un especialista por su nombre, por sus especialidades y/o por ranking.
              </div>
            )
          }
      </section>
    </>
  );
};

export default Especialistas;
