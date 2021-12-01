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
  const [users, setUsers] = useState({});
  const [searchResults,setSearchResults] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [esVacio, setEsVacio] = useState(false);
  const [results, setResults] = useState(false);
  const [search, setSearch] = useState(false);

  console.log("se rendereó");
  useEffect(() => {
    if (!!user) {
      setIsEspecialista(user.role === "especialista")
    }
    console.log("USEEFFECT");
    console.log(user);
    getUsers();

    getConsultas();


    console.log("use effect users");
    console.log(users);
    getSearchResults();
    console.log("use effect search results");
    console.log(searchResults);
  }, [user]);

  async function getUsers () {
    try {
      setLoading(true);
      const usersRef = bd.collection("users");
      const usersGet = await usersRef.get();
      let userDocs = {};
      let docData;
      let docId;
      console.log("getUsers");
      console.log(users.empty);
      usersGet.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        userDocs[docId] = docData;
        userDocs[docId]["id"] = docId;
      });
      console.log("users:");
      console.log(userDocs);
      setUsers(userDocs);
      console.log("luego de seteo:");
      console.log(users);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }

  async function getConsultas() {
    try {
      const citasRef = bd.collection("citas");
      const citas = await citasRef.get();
      let citaDocs = {};
      let docData;
      let docId;
      console.log("getConsultas");
      console.log(citas.empty);
      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if ( (isEspecialista && user && docData.especialista === user.id) || (!isEspecialista && user && docData.usuario === user.id) ){
          citaDocs[docId] = docData;
          citaDocs[docId]["id"] = docId;
        }
      });
      console.log("citas:");
      console.log(citaDocs);
      setConsultas(citaDocs);
      console.log(consultas);
      if (citaIds.length === 0) {
        setCitaIds(Object.keys(citaDocs));
        if (citaIds.length !== 0) {
          dateSort(); //se ordenan las citas del especialista por fecha, si es que tiene especialistas
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  function dateSort() {
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

  function filterCita (id){
    var isValid = true;
    const cita = consultas[id];
    if (nombre) {
      (isEspecialista ? 
        isValid = isValid && (users[cita.usuario].name.toLowerCase().includes(nombre.toLowerCase())) :
        isValid = isValid && (users[cita.especialista].name.toLowerCase().includes(nombre.toLowerCase()))
      )
    }
    if (filterDate && selectedDate) {
      isValid = isValid && cita.date.toDate().setHours(0,0,0,0).valueOf() === selectedDate.setHours(0,0,0,0).valueOf();
    }
    return isValid;
  }

  const getSearchResults = async () => {
    setLoading(true);
    setSearchResults([]);
    console.log(loading);
    await getConsultas();
    console.log("getSearchResults");
    console.log(consultas);
    Object.keys(consultas).forEach((id) => {
      console.log("loop id", id);
      if (filterCita(id) && !searchResults.includes(id)) {
        searchResults.push(id);
        console.log("push a searchResults de ", id);
      } 
    });
    console.log(searchResults);
    setRefresh(refresh+1);
    setLoading(false);
  };

  const handleSearch = () => {
    console.log("buscar!");
    setEsVacio(false);
    setLoading(true);
    console.log("getSearchResults");
    console.log(searchResults);
    setCitaIds(Object.keys(consultas));
    dateSort();
    setSearch(true);
    getSearchResults();
    console.log("resultados:");
    console.log(searchResults);
    console.log(searchResults.length);
    searchResults.length > 0 ? setResults(true): setResults(false);
    setLoading(false);
  };

  async function desplegarCitas(citas, resultadosId) {
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



  return (
  <>
    <Navbar />
    <section className="consulta-section">
      <div className="titles">Citas Agendadas</div>
      <br />
      <div className="search-box">  
        <div className="busqueda-sect">  
          <div className="searchInputs">
            <div className="byNameInputs" id="by-name-inputs">
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
          <div className="filterInputs">
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
      {
        loading ? <Cargando /> : results && !esVacio ?
        <div className="consultas-container">
          <div className="consultas-header">
            <div className="info-consultas date-info">Fecha</div>
            <div className="info-consultas hour-info">Hora</div>
            <div className="info-consultas name-info">{isEspecialista ? "Paciente" : "Especialista"}</div>
            <div className="info-consultas reason-info">Descripción</div>
          </div>
          <div className="consultas">
          {desplegarCitas(citaIds, searchResults).map( (key) => {
                const cita = consultas[key];
                return (
                  <div className="consulta" id={key}>
                    <div className="info-consultas date-info"><span>{cita.date.getDate() + "/" + (cita.date.getMonth()+1)}</span></div>
                    <div className="info-consultas hour-info"><span>{cita.date.getHours() + ":" + cita.date.getMinutes()+ "0"}</span></div>
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
        {desplegarCitas(citaIds, 1).map( (key) => {
              const cita = consultas[key];
              return (
                <div className="consulta" id={key}>
                  <div className="info-consultas date-info"><span>{cita.date.getDate() + "/" + (cita.date.getMonth()+1)}</span></div>
                  <div className="info-consultas hour-info"><span>{cita.date.getHours() + ":" + cita.date.getMinutes()+ "0"}</span></div>
                  <div className="info-consultas name-info"><span>{isEspecialista ? cita.usuario : cita.especialista}</span></div>
                  <div className="info-consultas reason-info"><div><span>{cita.reason}</span></div></div>
                </div>
              )
            }
            ) 
          }           
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
