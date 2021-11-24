import { bd } from "../../../utils/firebaseConfig";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";
import { UserContext } from "../../../context/UserContext";

import React from "react";
import { useHistory } from "react-router-dom";

import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";

const Agendar = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext).user;

  const [loading, setLoading] = useState(false);
  const [especialista, setEspecialista] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const componentMounted = useRef(true);

  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState(null);
  const [reserved, setReserved] = useState([]);
  const [loadingReserved, setLoadingReserved] = useState(false);

  const [isOccupied, setIsOccupied] = useState(false);

  async function getEspecialista() {
    try {
      setLoading(true);
      const userRef = bd.collection("users").doc(params.characterId);
      const userDoc = await userRef.get();
      let user = userDoc.data();
      user.id = userDoc.id;
      if (componentMounted.current) {
        setEspecialista(user);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      if (componentMounted.current) {
        setError(e.message);
        setLoading(false);
      }
    }
  }

  async function getCitas() {
    try {
      setLoadingReserved(true);
      const citasRef = bd.collection("citas");
      const citas = await citasRef.get();
      let citasDocs = {};
      let docData;
      let docId;
      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if (docData.especialista === especialista.id) {
          let dateFormat = new Date(docData.date.seconds * 1000); // por mil porque sino te pone 1970 :clown_emoji:
          citasDocs[docId] = dateFormat;
        }
      });
      setReserved(citasDocs);
      setLoadingReserved(false);
    } catch (e) {
      setError(e);
      setLoadingReserved(false);
    }
  }

  const validateDate = async () => {
    for (const dateId in reserved) {
      console.log("Test: " + reserved[dateId]);
      if (selectedDate.getTime() === reserved[dateId].getTime()) {
        console.log("entré aquí, debería settearse true");
        setIsOccupied(true);
        return isOccupied;
      }
    }
  };

  useEffect(() => {}, [setIsOccupied, isOccupied]);

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);
    setIsOccupied(false);

    try {
      // Esto agarra la hora y la colocar en un formato apropiado para la comparación (ej. 09:00 en lugar de 9:00 o 9:00:00, en formato de 24 hrs)
      let string = await selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Esto retorna la fecha seleccionada como día de la semana "Monday", "Tuesday", etc. De esa manera se encuentra tabulado el diccionario y se puede acceder a las keys
      let day = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(selectedDate);

      console.log(selectedDate);
      console.log(day);
      console.log(currentUser.id);
      console.log(especialista.id);
      console.log(reserved);

      const schedule = await especialista.schedule; // nos traemos el horario del especialista

      // Calculo el día de mañana actual, para evitar que reserve en las próximas 24hrs
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Calculamos los valores de los rangos de horas aceptables
      let maxRange = parseInt(schedule[day].end) - 1;
      let newString = parseInt(string);

      await validateDate();
      console.log(isOccupied);

      if (reason) {
        if (!isOccupied) {
          if (schedule[day].start && selectedDate > tomorrow) {
            if (string > schedule[day].start && newString <= maxRange) {
              // Valida que la hora seleccionada esté dentro del rango correspondiente
              await bd.collection("citas").add({
                usuario: currentUser.id,
                especialista: especialista.id,
                date: selectedDate,
                reason: reason,
                status: "activo",
              });
              setLoading(false);
              alert("Cita agendada exitosamente.");
              // OJO aquí hace falta un history.push pero para fines de probar el código todavía no lo he colocado
            } else {
              setLoading(false);
              alert(
                "El especialista no tiene disponibilidad ese día a esa hora."
              );
            }
          } else {
            setLoading(false);
            alert("El especialista no tiene disponibilidad en esa fecha.");
          }
        } else {
          setLoading(false);
          alert("Esa fecha ya se encuentra reservada.");
        }
      } else {
        setLoading(false);
        alert("Debe indicar la razón de la consulta.");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("La cita no pudo ser agendada.");
    }
  };

  useEffect(() => {
    getEspecialista();
    return () => {
      componentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCitas();
  });

  return loading && !especialista && !error && loadingReserved ? (
    <Cargando />
  ) : (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
        <DatePicker
          showTimeSelect
          timeIntervals={60}
          timeCaption="Time"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={subDays(new Date(), -1)}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Seleccione una fecha y hora"
          className="date-input"
          id="date-input"
        />
        <br />
        <input
          type="text"
          placeholder="Ingrese el motivo de la cita."
          onChange={(e) => setReason(e.target.value)}
        ></input>
        <button type="button" onClick={handleClick}>
          Reservar
        </button>
      </>  
  );
};

export default Agendar;
