import React from "react";
import "./Citas.css";
import Navbar from "../../Navbar/Navbar";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import DatePicker from "react-datepicker";
import Cargando from "../../cargando/Cargando";
import { useHistory } from "react-router-dom";

const Citas = () => {
  const [nombre, setNombre] = useState("");
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDate, setFilterDate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEspecialista, setIsEspecialista] = useState(false);
  const [consultas, setConsultas] = useState({});
  const [citaIds, setCitaIds] = useState([]);
  const [searchResults] = useState([]);
  const [listNames] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [esVacio, setEsVacio] = useState(false);
  const [results, setResults] = useState(false);
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!!user) {
      setIsEspecialista(user.role === "especialista");
      getConsultas();
    }
  }, [user]);

  function dateSort() {
    var citasval = Object.values(consultas);
    for (let index = 1; index < citasval.length; index++) {
      let current = citasval[index];
      let j = index - 1;
      while (j > -1 && current.date.seconds >= citasval[j].date.seconds) {
        citaIds[j + 1] = citasval[j].id;
        citasval[j + 1] = citasval[j];
        j--;
      }
      citaIds[j + 1] = current.id;
      citasval[j + 1] = current;
    }
  }

  function desplegarCitas(citas, resultadosId) {
    var arr = [];
    if (resultadosId === 1) {
      for (let index = 0; index < citas.length; index++) {
        arr.push(citas[index]);
      }
      return arr;
    } else {
      for (let index = 0; index < citas.length; index++) {
        for (let j = 0; j < resultadosId.length; j++) {
          if (
            citas[index] === resultadosId[j] &&
            !arr.includes(resultadosId[j])
          ) {
            arr.push(resultadosId[j]);
          }
        }
      }
      return arr;
    }
  }

  async function getConsultas() {
    setLoading(true);
    try {
      const citasRef = bd.collection("citas");
      const citas = await citasRef.get();
      let citaDocs = {};
      let docData;
      let docId;
      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if (
          (user.role === "especialista" &&
            docData["especialista"] === user.id) ||
          (user.role === "usuario" && docData["usuario"] === user.id)
        ) {
          citaDocs[docId] = docData;
          citaDocs[docId]["id"] = docId;
          consultas[docId] = docData;
          consultas[docId]["id"] = docId;
        }
      });

      if (citaIds.length === 0) {
        for (let index = 0; index < Object.keys(citaDocs).length; index++) {
          citaIds.push(Object.keys(citaDocs)[index]);
        }
      }

      await bd
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data["id"] = doc.id;
            listNames[doc.id] = data.name;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      if (citaIds.length !== 0) {
        dateSort(); //se ordenan las citas del especialista por fecha, si es que tiene especialistas
      }

      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError(e);
      setLoading(false);
    }
  }

  const filterCita = (cita) => {
    var isValid = true;

    if (nombre) {
      try {
        var nombreCita;
        if (user.role === "especialista") {
          nombreCita = listNames[cita.usuario];
        } else {
          nombreCita = listNames[cita.especialista];
        }
        if (nombreCita){
          isValid = (nombreCita.toLowerCase()).includes(nombre.toLowerCase());
        } else {
          isValid = false;
        }
      } catch (e) {
        console.log("Error al validar nombres: ", e.message);
      }
    }
    if (filterDate && selectedDate) {
      let dateF = new Date(cita.date.seconds * 1000);
      console.log(dateF);
      console.log(selectedDate);

      isValid =
        isValid &&
        dateF.setHours(0,0,0,0).valueOf()===selectedDate.setHours(0,0,0,0).valueOf();
    }
    if (nombre === "" && !filterDate) {
      setEsVacio(true);
    }
    return isValid;
  };

  const getSearchResults = () => {
    setLoading(true);
    Object.keys(consultas).forEach((id) => {
      let encontrado = filterCita(consultas[id]);
      if (searchResults.includes(id) && !encontrado) {
        const x = searchResults.indexOf(id);
        searchResults.splice(x, 1);
      } else if (encontrado) {
        if (!searchResults.includes(id)) {
          searchResults.push(id);
        }
      }
    });
  };

  const handleSearch = () => {
    setEsVacio(false);
    setLoading(true);
    setRefresh(refresh + 1);

    for (let index = 0; index < Object.keys(consultas).length; index++) {
      if (!citaIds.includes(Object.keys(consultas)[index])) {
        citaIds.push(Object.keys(consultas));
      }
    }

    dateSort();

    if (!error) {
      setSearch(true);
      getSearchResults();
      searchResults.length > 0 ? setResults(true) : setResults(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!!user) {
      getConsultas();
    }
  }, [refresh]);

  return (
    <>
      <Navbar />
      <section className="consulta-section">
        <div className="search-box-citas">
          <div className="TitleRegister">Citas Agendadas</div>
          <br />
          <div className="busqueda-sect busqueda-citas">
            <div className="searchInputsCitas">
              <div className="byNameInputsCitas">
                <input
                  type="text"
                  className="inputsForm"
                  id="name-esp-b"
                  placeholder={
                    isEspecialista
                      ? "Introduzca el nombre y/o apellido del paciente"
                      : "Introduzca el nombre y/o apellido del especialista"
                  }
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
            <div className="filterCitas">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Seleccione una fecha"
                className="calendario-citas"
                disabled={!filterDate}
                dateFormat="MMMM d, yyyy"
              />
              <label className="searchRanking">
                Buscar por fecha
                <input
                  type="checkbox"
                  className="checkRanking"
                  name="checkRanking"
                  onChange={() => setFilterDate(!filterDate)}
                />
                <span class="checkmark"></span>
              </label>
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
                style={{ background: "white" }}
              >
                Buscar
                <button className="search-button"></button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {
          loading && !error && citaIds.length === 0 ? (
            <Cargando />
          ) : error ? (
            <div className="altText">
              Error: {error.message}. <br></br>
              <span className="refreshLink" onClick={() => setError(false)}>
                Intente refrescar la página.
              </span>
            </div>
          ) : results && !esVacio ? (
            <div className="consultas-container">
              <div className="consultas-header">
                <div className="info-consultas date-info">Fecha</div>
                <div className="info-consultas hour-info">Hora</div>
                <div className="info-consultas name-info">
                  {isEspecialista ? "Paciente" : "Especialista"}
                </div>
                <div className="info-consultas reason-info">Descripción</div>
              </div>
              <div className="consultas">
                {desplegarCitas(citaIds, searchResults).map((key) => {
                  var cita = consultas[key];

                  let dateF = new Date(cita.date.seconds * 1000);
                  let today = new Date();

                  return (
                    <div className={dateF.valueOf() > today.valueOf() ? "consulta" : "consulta cons-pasada"} id={key}>
                      <div className="info-consultas date-info">
                        <span>
                          {dateF.getDate() + "/" + (dateF.getMonth() + 1)}
                        </span>
                      </div>
                      <div className="info-consultas hour-info">
                        <span>
                          {dateF.getHours() + ":" + dateF.getMinutes() + "0"}
                        </span>
                      </div>
                      <div className="info-consultas name-info">
                        <span>
                          {isEspecialista
                            ? listNames[cita.usuario]
                            : listNames[cita.especialista]}
                        </span>
                      </div>
                      <div className="info-consultas reason-info">
                        <div>
                          <span>{cita.reason}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : search && !esVacio ? (
            <div className="altText">
              No se consiguieron consultas que coincidieran con la búsqueda.
            </div>
          ) : (citaIds.length > 0) ? (
            <div className="consultas-container">
              <div className="consultas-header">
                <div className="info-consultas date-info">Fecha</div>
                <div className="info-consultas hour-info">Hora</div>
                <div className="info-consultas name-info">
                  {isEspecialista ? "Paciente" : "Especialista"}
                </div>
                <div className="info-consultas reason-info">Descripción</div>
              </div>
              <div className="consultas">
                {desplegarCitas(citaIds, 1).map((key) => {
                  var cita = consultas[key];
                  let dateF = new Date(cita.date.seconds * 1000);
                  let today = new Date();
                  return (
                    <div className={dateF.valueOf() > today.valueOf() ? 
                      "consulta" : "consulta cons-pasada"} 
                      id={key}
                      onClick={isEspecialista ? 
                          ()=>{history.push(`/historial/${cita.usuario}`)} : 
                          ()=>{history.push(`/especialistas/${cita.especialista}`)}}
                        title={isEspecialista ? "Click para ir a la historia de este paciente." : 
                        "Click para ir al perfil de este especialista."}>
                      <div className="info-consultas date-info">
                        <span>
                          {dateF.getDate() + "/" + (dateF.getMonth() + 1)}
                        </span>
                      </div>
                      <div className="info-consultas hour-info">
                        <span>
                          {dateF.getHours() + ":" + dateF.getMinutes() + "0"}
                        </span>
                      </div>
                      <div className="info-consultas name-info">
                        <span>
                          {isEspecialista
                            ? listNames[cita.usuario]
                            : listNames[cita.especialista]}
                        </span>
                      </div>
                      <div className="info-consultas reason-info">
                        <div>
                          <span>{cita.reason}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="altText">
              No tiene consultas.
            </div>
          )
        }
      </section>
    </>
  );
};

export default Citas;
