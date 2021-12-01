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

  useEffect(() => {
    if (!!user) {
      setIsEspecialista(user.role === "especialista")
    }
    getUsers();
    getConsultas();
  }, []);

  async function getUsers () {
    try {
      setLoading(true);
      const usersRef = bd.collection("users");
      const users = await usersRef.get();
      let userDocs = {};
      let docData;
      let docId;
      users.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        userDocs[docId] = docData;
        userDocs[docId]["id"] = docId;
      });
      setUsers(userDocs);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getConsultas() {
    try {
      setLoading(true);
      const citasRef = bd.collection("citas");
      const citas = await citasRef.get();
      let citaDocs = {};
      let docData;
      let docId;
      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if ( (isEspecialista && docData.especialista === user.id) || (!isEspecialista && docData.usuario === user.id) ){
          citaDocs[docId] = docData;
          citaDocs[docId]["id"] = docId;
        }
      });
      setConsultas(citaDocs);
      if (citaIds.length === 0) {
        setCitaIds(Object.keys(citaDocs));
        if (citaIds.length !== 0) {
          dateSort(); //se ordenan las citas del especialista por fecha, si es que tiene especialistas
        }
      }
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
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

  const getSearchResults = () => {
    setSearchResults([]);
    Object.keys(consultas).forEach((id) => {
      if (filterCita(id) && !searchResults.includes(id)) {
        searchResults.push(id);
      } 
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    getSearchResults();
    setLoading(false);
  };


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
        loading ? <Cargando /> :
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
            

            
          </div>
        </div>
      }
    </section>
  </>
  );
};

/*
{
              searchResults.map( (key) => {
                const cita = consultas[key];
                return (
                  <div className="consulta" id={key}>
                    <div className="info-consultas date-info"><span>{cita.date.getDate() + "/" + (cita.date.getMonth()+1)}</span></div>
                    <div className="info-consultas hour-info"><span>{cita.date.getHours() + ":" + cita.date.getMinutes()+ "0"}</span></div>
                    <div className="info-consultas name-info"><span>{isEspecialista ? cita.usuario : cita.especialista}</span></div>
                    <div className="info-consultas reason-info"><span>{cita.reason}</span></div>
                  </div>
                )
              }
              )
            }
*/



export default Citas;
