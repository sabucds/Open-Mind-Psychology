import React from "react";
import "./Citas.css"
import Navbar from "../../Navbar/Navbar";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import DatePicker from "react-datepicker";
import Cargando from "../../cargando/Cargando";

const Citas = () => {
  const [nombre, setNombre] = useState("");
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDate, setFilterDate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEspecialista, setIsEspecialista] = useState(false);
  const [consultas, setConsultas] = useState({});
  const [citaIds, setCitaIds] = useState([]);
  //const [users, setUsers] = useState({});
  const [searchResults] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [esVacio, setEsVacio] = useState(false);
  const [results, setResults] = useState(false);
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("Use effect User");
    if (!!user) {
      setIsEspecialista(user.role === "especialista");
      console.log(isEspecialista);
      getConsultas();
    }
    
  }, [user]);

  
  function dateSort() {
    console.log("dateSort()");
    var citasval = Object.values(consultas);
    for (let index = 1; index < citasval.length; index++) {
      let current = citasval[index];
      let j = index - 1;
      while (j > -1 && current.date >= citasval[j].date) {
        citaIds[j + 1] = citasval[j].id;
        citasval[j + 1] = citasval[j];
        j--;
      }
      citaIds[j + 1] = current.id;
      citasval[j + 1] = current;
    }
  }

  function desplegarCitas(citas, resultadosId) {
    console.log("desplegarCitas");

    var arr = [];
    if (resultadosId === 1) {
      for (let index = 0; index < citas.length; index++) {
        arr.push(consultas[index]);
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

  async function getUser (id) {
    console.log("getUser");
    try {
      setLoading(true);
      const userRef = bd.collection("users").doc(id);
      console.log("bd");
      const userDoc = await userRef.get();
      console.log(userDoc);
      
      let newUser = userDoc.data();
      newUser["id"] = userDoc.id;

      console.log("user:");
      console.log(newUser);
      setLoading(false);
      return newUser;

    } catch (e) {
      console.log(e.message);
      setError(e);
      setLoading(false);
      return null;
    }
  }

  async function getConsultas() {
    console.log("getConsultas");
    try {
      setLoading(true);
      const citasRef = bd.collection("citas");
      console.log("bd");
      const citas = await citasRef.get();
      let citaDocs = {};
      let docData;
      let docId;
      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if ( (isEspecialista && user && docData['especialista'] === user.id) || (!isEspecialista && user && docData['usuario'] === user.id) ){
          citaDocs[docId] = docData;
          citaDocs[docId]["id"] = docId;
        }
      });
      setConsultas(citaDocs);
      console.log("consultas:");
      console.log(consultas);
      if (citaIds.length === 0) {
        setCitaIds(Object.keys(citaDocs));
        if (citaIds.length !== 0) {
          dateSort(); //se ordenan las citas del especialista por fecha, si es que tiene especialistas
        }
      }
      setLoading(false);
      console.log(consultas);
    } catch (e) {
      console.log(e.message);
      setError(e);
      setLoading(false);
    }
  }

  const filterCita = (id) => {
    console.log("filterCita");

    var isValid = true;
    const cita = consultas[id];
    if (nombre) {
      if (isEspecialista) {
        let newUser = getUser(cita.usuario);
        isValid = isValid && (newUser && newUser.name.toLowerCase().includes(nombre.toLowerCase()))
      } else {
        let newUser = getUser(cita.especialista);
        isValid = isValid && (newUser && newUser.name.toLowerCase().includes(nombre.toLowerCase()))
      }
        
    }
    if (filterDate && selectedDate) {
      isValid = isValid && cita.date.toDate().setHours(0,0,0,0).valueOf() === selectedDate.setHours(0,0,0,0).valueOf();
    }
    if (nombre === "" && !filterDate){
      setEsVacio(true);
    }
    return isValid;
  }

  const getSearchResults = async () => {
    console.log("getSearchResults");

    setLoading(true);
    Object.keys(consultas).forEach((id) => {
      if (searchResults.includes(id) && !filterCita(id)) {
        const x = searchResults.indexOf(id);
        searchResults.splice(x, 1);
      } else if (filterCita(id)) {
        if (!searchResults.includes(id)) {
          searchResults.push(id);
        }
      } 
    });
    console.log("resultados:");
    console.log(searchResults);
  };

  const handleSearch = () => {
    console.log("handleSearch");

    setEsVacio(false);
    setLoading(true);
    setRefresh(refresh +1);

    setCitaIds(Object.keys(consultas));
    dateSort();
    
    if (!error) {
      setSearch(true);
      getSearchResults();
      searchResults.length > 0 ? setResults(true): setResults(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("use effect refresh");
    getConsultas();
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
                placeholder={isEspecialista ? "Introduzca el nombre y/o apellido del paciente" : "Introduzca el nombre y/o apellido del especialista"}
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
            style={{background: "white"}}
          >
            Buscar
            <button className="search-button"></button>
          </div>
        </div>
        </div>
      </div>
      <hr />
      {/*NO ME FUNCIONA AYUDA
        loading && !error ? <Cargando /> : error ? 
        <div className="altText">
              Error: {error.message}. <br></br>
              <span className="refreshLink" onClick={() => setError(false)}>
                Intente refrescar la página.
              </span>
            </div>
        : results && !esVacio ?
        <div className="consultas-container">
          <div className="consultas-header">
            <div className="info-consultas date-info">Fecha</div>
            <div className="info-consultas hour-info">Hora</div>
            <div className="info-consultas name-info">{isEspecialista ? "Paciente" : "Especialista"}</div>
            <div className="info-consultas reason-info">Descripción</div>
          </div>
          <div className="consultas">
          {desplegarCitas(citaIds, searchResults).map((key) => {
                var cita = consultas[key];
                console.log(cita);
                return (
                  <div className="consulta" id={key}>
                    <div className="info-consultas date-info"><span>{cita.date.toDate().getDate() + "/" + (cita.toDate().getMonth()+1)}</span></div>
                    <div className="info-consultas hour-info"><span>{cita.date.toDate().getHours() + ":" + cita.date.toDate().getMinutes()+ "0"}</span></div>
                    <div className="info-consultas name-info"><span>{isEspecialista ? cita.usuario : cita.especialista}</span></div>
                    <div className="info-consultas reason-info"><div><span>{cita.reason}</span></div></div>
                  </div>
                )
              }
              ) 
            }           
          </div>
        </div> : search && !esVacio ? 
          <div className="altText">
          No se consiguieron consultas que coincidieran con la búsqueda.
        </div> :
        <div className="consultas-container">
          <div className="consultas-header">
            <div className="info-consultas date-info">Fecha</div>
            <div className="info-consultas hour-info">Hora</div>
            <div className="info-consultas name-info">{isEspecialista ? "Paciente" : "Especialista"}</div>
            <div className="info-consultas reason-info">Descripción</div>
          </div>
          <div className="consultas">
          {desplegarCitas(citaIds, 1).map((key) => {
                var cita = consultas[key];
                console.log(cita);
                return (
                  <div className="consulta" id={key}>
                    <div className="info-consultas date-info"><span>{cita.date.toDate().getDate() + "/" + (cita.toDate().getMonth()+1)}</span></div>
                    <div className="info-consultas hour-info"><span>{cita.date.toDate().getHours() + ":" + cita.date.toDate().getMinutes()+ "0"}</span></div>
                    <div className="info-consultas name-info"><span>{isEspecialista ? cita.usuario : cita.especialista}</span></div>
                    <div className="info-consultas reason-info"><div><span>{cita.reason}</span></div></div>
                  </div>
                )
              }
              ) 
            }           
          </div>
        </div>*/
        
        loading ? <Cargando/> :
        <div className="consultas-container">
          <div className="consultas-header">
            <div className="info-consultas date-info">Fecha</div>
            <div className="info-consultas hour-info">Hora</div>
            <div className="info-consultas name-info">{isEspecialista ? "Paciente" : "Especialista"}</div>
            <div className="info-consultas reason-info">Descripción</div>
          </div>
          <div className="consultas">
            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Suspendisse tempus, magna sed porttitor laoreet, 
              risus nunc hendrerit tellus, ut rutrum arcu ipsum vitae ex. Ut ullamcorper 
              rutrum metus id mollis. Aliquam porta volutpat massa a suscipit. 
              Nulla in massa id metus fermentum varius. Donec vitae accumsan mi. 
              Nulla facilisi. Nullam bibendum semper quam, a dictum magna tristique et. 
              Maecenas id est lacinia, commodo turpis vel, facilisis turpis.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>
          </div>
        </div>
      }
    </section>
  </>
  );
};



/*
            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Suspendisse tempus, magna sed porttitor laoreet, 
              risus nunc hendrerit tellus, ut rutrum arcu ipsum vitae ex. Ut ullamcorper 
              rutrum metus id mollis. Aliquam porta volutpat massa a suscipit. 
              Nulla in massa id metus fermentum varius. Donec vitae accumsan mi. 
              Nulla facilisi. Nullam bibendum semper quam, a dictum magna tristique et. 
              Maecenas id est lacinia, commodo turpis vel, facilisis turpis.</span></div></div>
            </div>

            <div className="consulta">
              <div className="info-consultas date-info"><span>30/12</span></div>
              <div className="info-consultas hour-info"><span>23:50</span></div>
              <div className="info-consultas name-info"><span>Liliana Especialista</span></div>
              <div className="info-consultas reason-info"><div><span>Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.</span></div></div>
            </div>






            */


export default Citas;
