import { bd } from "../../../utils/firebaseConfig";
import { useContext, useState, useEffect } from "react";
import Cargando from "../../cargando/Cargando";
import { UserContext } from "../../../context/UserContext";

import React from "react";
import styles from "./Agendar.module.css";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import "react-datepicker/dist/react-datepicker.css";

import PayPal from "./Paypal";

const Agendar = ({ especialista }) => {
  const currentUser = useContext(UserContext).user;
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState(null);
  const [reserved, setReserved] = useState([]);
  const [loadingReserved, setLoadingReserved] = useState(false);
  const { schedule } = especialista;

  const [searchResults] = useState([]);

  const scheduleHasNotBeenSet =
    Array.isArray(schedule) && schedule.length === 0;

  const [weekDisp, setWeekDisp] = useState(
    scheduleHasNotBeenSet
      ? {
          // In case we do not have schedule, lets have this initial value
          Monday: {
            start: "",
            end: "",
          },
          Tuesday: {
            start: "",
            end: "",
          },
          Wednesday: {
            start: "",
            end: "",
          },
          Thursday: {
            start: "",
            end: "",
          },
          Friday: {
            start: "",
            end: "",
          },
          Saturday: {
            start: "",
            end: "",
          },
          Sunday: {
            start: "",
            end: "",
          },
        }
      : // Else, we have current schedule
        schedule
  );

  async function getCitas() {
    try {
      setLoadingReserved(true);
      const citasRef = bd.collection("citas");
      console.log("llamando");
      const citas = await citasRef.get();
      let citasDocs = {};
      let docData;
      let docId;

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      citas.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if (docData.especialista === especialista.id) {
          let dateFormat = new Date(docData.date.seconds * 1000); // por mil porque sino te pone 1970 :clown_emoji:
          if (dateFormat >= tomorrow) {
            citasDocs[docId] = dateFormat;
          }
        }
      });
      setReserved(citasDocs);
      setLoadingReserved(false);
    } catch (e) {
      setError(e);
      setLoadingReserved(false);
    }
  }

  const validateInput = async () => {
    // Esto agarra la hora y la colocar en un formato apropiado para la comparaci??n (ej. 09:00 en lugar de 9:00 o 9:00:00, en formato de 24 hrs)
    let string = await selectedDate.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    // Esto retorna la fecha seleccionada como d??a de la semana "Monday", "Tuesday", etc. De esa manera se encuentra tabulado el diccionario y se puede acceder a las keys
    let day = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(selectedDate);

    console.log(selectedDate);
    console.log(day);
    console.log(currentUser.id);
    console.log(especialista.id);
    console.log(reserved);

    const schedule = await especialista.schedule; // nos traemos el horario del especialista

    // Calculo el d??a de ma??ana actual, para evitar que reserve en las pr??ximas 24hrs
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (reason) {
      for (const dateId in reserved) {
        if (selectedDate.getTime() === reserved[dateId].getTime()) {
          setLoading(false);
          alert("Esa fecha ya se encuentra reservada.");
          return false;
        }
      }
      if (selectedDate > tomorrow) {
        if (schedule[day].start) {
          if (string >= schedule[day].start && string < schedule[day].end) {
            // No hace falta restarle 1 a la hora final porque como son horas "enteras" (04:00, 05:00, 06:00...) con validar que sea menor al l??mite superior, ya basta
            return true;
          } else {
            setLoading(false);
            alert(
              "El especialista no tiene disponibilidad ese d??a a esa hora."
            );
            return false;
          }
        } else {
          setLoading(false);
          alert("El especialista no tiene disponibilidad en esa fecha.");
          return false;
        }
      } else {
        setLoading(false);
        alert("Solo puede agendar citas con m??s de 24 horas de antelaci??n.");
        return false;
      }
    } else {
      setLoading(false);
      alert("Debe indicar la raz??n de la consulta.");
      return false;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (await validateInput()) {
        // Valida que la hora seleccionada est?? dentro del rango correspondiente
        setCheckout(true);
      } else {
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("La cita no pudo ser agendada.");
    }
  };

  function desplegarCitas(reserved) {
    var arr = [];
    const optionsTime = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let string;
    for (const dateId in reserved) {
      string =
        reserved[dateId].toLocaleDateString("en-GB", options) +
        " " +
        reserved[dateId].toLocaleTimeString("en-GB", optionsTime);
      arr.push(string);
    }
    return arr;
  }

  useEffect(() => {
    getCitas();
  }, []);

  return loading &&
    !error &&
    loadingReserved &&
    especialista.schedule.length === 0 ? (
    <Cargando />
  ) : !checkout ? (
    <>
      <section className={styles.sect}>
        <div className={styles.encabezado}>
          <div className={styles.TitleRegister}>??Reserva ya tu cita!</div>
        </div>
        <div className={styles.linea}></div>
        <br />
        <div className={styles.cajita}>
          <div className={styles.subtit}>
            Estos son los horarios disponibles de tu especialista:
          </div>
          <div className={styles.container1}>
            <div className={styles.user}>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Lunes</div>
                <div className={styles.horas}>
                  {weekDisp.Monday.start} - {weekDisp.Monday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Martes</div>
                <div className={styles.horas}>
                  {weekDisp.Tuesday.start} - {weekDisp.Tuesday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Mi??rcoles</div>
                <div className={styles.horas}>
                  {weekDisp.Wednesday.start} - {weekDisp.Wednesday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Jueves</div>
                <div className={styles.horas}>
                  {weekDisp.Thursday.start} - {weekDisp.Thursday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Viernes</div>
                <div className={styles.horas}>
                  {weekDisp.Friday.start} - {weekDisp.Friday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>S??bado</div>
                <div className={styles.horas}>
                  {weekDisp.Saturday.start} - {weekDisp.Saturday.end}
                </div>
              </div>
              <div className={styles.contenedorDias}>
                <div className={styles.week}>Domingo</div>
                <div className={styles.horas}>
                  {weekDisp.Sunday.start} - {weekDisp.Sunday.end}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className={styles.cajita}>
          <div className={styles.caja4}>
            {desplegarCitas(reserved).length === 0 ? (
              <>
                <div className={styles.ayuda}></div>
              </>
            ) : (
              <>
                <div className={styles.caja2}>
                  <div className={styles.citaList}>
                    <div className={styles.subtit}>
                      Bloques no disponibles para agendar
                    </div>
                    <div className={styles.linea}></div>
                    <br />
                    <div className={styles.citasbox}>
                      {desplegarCitas(reserved).map((key) => {
                        return (
                          <li className={styles.cita} key={key}>
                            {key}
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className={styles.caja3}>
              <div className={styles.subtit}>
                Selecciona una fecha y hora para pautar tu sesi??n:
              </div>
              <div className={styles.dia}>
                <div className={styles.calendar}></div>
                <DatePicker
                  showTimeSelect
                  timeCaption="Hora"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={subDays(new Date(), -1)}
                  placeholderText="Seleccione una fecha y hora"
                  className={styles.input}
                  timeIntervals={60}
                  dateFormat="MMMM d, yyyy HH:mm" // HH:mm formato 24hrs
                  timeFormat="HH:00" //y que los minutos, sin importar el input, sean 00
                  id="date-input"
                  autoComplete="off"
                />
              </div>
              <div className={styles.subtit}>Ingrese el motivo de la cita:</div>
              <div className={styles.mot}>
                <div className={styles.type}></div>
                <input
                  type="text"
                  placeholder="Ingrese el motivo de la cita."
                  onChange={(e) => setReason(e.target.value)}
                  className={styles.input}
                  autoComplete="off"
                ></input>
              </div>
              <div className={styles.btn}>
                <button
                  type="button"
                  onClick={handleClick}
                  className={styles.reserva}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <PayPal
      currentUser={currentUser}
      especialista={especialista}
      selectedDate={selectedDate}
      reason={reason}
    />
  );
};

export default Agendar;
