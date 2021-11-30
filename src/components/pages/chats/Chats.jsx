import React from "react";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";
import styles from "./Chats.module.css";
import ChatCard from "./ChatCard";

const Chats = () => {
  const { user } = useContext(UserContext);
  const [Loading, setLoading] = useState(false);
  const [citas, setcitas] = useState([]);
  //lista de personas con las que user tendra chat
  const [usuariosConCita, setusuariosConCita] = useState([]);
  const [usuarios, setusuarios] = useState([]);
  const [refresh, setrefresh] = useState(0);
  const [listaLista, setlistaLista] = useState(false);
  const [desplegarCitas, setdesplegarCitas] = useState(false);
  const [showArchived, setshowArchived] = useState(false);
  const [citasPasadas, setcitasPasadas] = useState(false);
  const [citasHoy, setcitasHoy] = useState(false);

  let currentDate = new Date();
  let currentPlusOne = new Date();

  function ordenarCitas() {
    let n = citas.length;
    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = citas[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while (j > -1 && current.date < citas[j].date) {
        citas[j + 1] = citas[j];
        j--;
      }
      citas[j + 1] = current;
    }
  }

  setInterval(() => {
    currentDate = new Date();

    for (let index = 0; index < usuariosConCita.length; index++) {
      for (let j = 0; j < citas.length; j++) {
        currentPlusOne.setHours(citas[j].date.getHours() + 1);
        currentPlusOne.setMinutes(citas[j].date.getMinutes() + 10);
        if (
          !(currentDate > citas[j].date && currentDate < currentPlusOne) &&
          usuariosConCita[index].today === "hoy"
        ) {
          usuariosConCita[index]["show"] = false;
        } else if (!usuariosConCita[index].show) {
          setLoading(true);
          usuariosConCita[index]["show"] = true;
          setLoading(false);
        }
      }
    }
    setdesplegarCitas(true);
  }, 1000);

  function getDatosOtraPersona() {
    if (citas.length > 0) {
      if (user.role === "especialista") {
        for (let index = 0; index < usuarios.length; index++) {
          for (let j = 0; j < citas.length; j++) {
            if (usuarios[index].id === citas[j].usuario) {
              if (
                (currentDate.getDate() === citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()) ||
                (currentDate.getDate() > citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()) ||
                currentDate.getMonth() > citas[j].date.getMonth()
              ) {
                if (
                  currentDate.getDate() === citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()
                ) {
                  usuarios[index]["today"] = "hoy";
                } else if (
                  (currentDate.getDate() > citas[j].date.getDate() &&
                    currentDate.getMonth() === citas[j].date.getMonth()) ||
                  currentDate.getMonth() > citas[j].date.getMonth()
                ) {
                  usuarios[index]["today"] = "ayer";
                } else {
                  usuarios[index]["today"] = "manana";
                }
                usuarios[index]["show"] = true;
                if (
                  citas[j].especialista === usuarios[index].id ||
                  citas[j].usuario === usuarios[index].id
                ) {
                  usuarios[index]["date"] =
                    "Fecha de la cita: " +
                    citas[j].date.getDate() +
                    "/" +
                    (citas[j].date.getMonth() + 1) +
                    "  Hora: " +
                    citas[j].date.getHours() +
                    ":" +
                    citas[j].date.getMinutes() +
                    "0";
                }
                let existe = false;
                usuariosConCita.forEach(function (obj) {
                  console.log(obj.id);
                  console.log(usuarios[index].id);
                  if (obj.id === usuarios[index].id) {
                    existe = true;
                  }
                });
                if (!existe) {
                  usuariosConCita.push(usuarios[index]);
                }
              }
            }
          }
        }
      } else {
        for (let index = 0; index < usuarios.length; index++) {
          for (let j = 0; j < citas.length; j++) {
            if (usuarios[index].id === citas[j].especialista) {
              if (
                (currentDate.getDate() === citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()) ||
                (currentDate.getDate() > citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()) ||
                currentDate.getMonth() > citas[j].date.getMonth()
              ) {
                if (
                  currentDate.getDate() === citas[j].date.getDate() &&
                  currentDate.getMonth() === citas[j].date.getMonth()
                ) {
                  usuarios[index]["today"] = "hoy";
                } else if (
                  (currentDate.getDate() > citas[j].date.getDate() &&
                    currentDate.getMonth() === citas[j].date.getMonth()) ||
                  currentDate.getMonth() > citas[j].date.getMonth()
                ) {
                  usuarios[index]["today"] = "ayer";
                } else {
                  usuarios[index]["today"] = "manana";
                }
                if (
                  citas[j].especialista === usuarios[index].id ||
                  citas[j].usuario === usuarios[index].id
                ) {
                  usuarios[index]["date"] =
                    "Fecha de la cita: " +
                    citas[j].date.getDate() +
                    "/" +
                    (citas[j].date.getMonth() + 1) +
                    "  Hora: " +
                    citas[j].date.getHours() +
                    ":" +
                    citas[j].date.getMinutes() +
                    "0";
                }
                let existe = false;
                usuariosConCita.forEach(function (obj) {
                  if (obj.id === usuarios[index].id) {
                    console.log(obj.id);
                    console.log(usuarios[index].id);
                    console.log(obj.date);
                    console.log(usuarios[index].date);
                    existe = true;
                  }
                });
                if (!existe) {
                  usuariosConCita.push(usuarios[index]);
                }
              }
            }
          }
        }
      }
    }
    for (let index = 0; index < usuariosConCita.length; index++) {
      if (usuariosConCita[index].today === "hoy" && !citasHoy) {
        setcitasHoy(true);
      }
      if (usuariosConCita[index].today === "ayer" && !citasPasadas)
        setcitasPasadas(true);
    }

    setlistaLista(true);
  }

  async function getCitas() {
    try {
      setLoading(true);
      if (!!user && usuarios.length === 0) {
        await bd
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data["id"] = doc.id;
              usuarios.push(data);
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        if (user.role === "especialista") {
          await bd
            .collection("citas")
            .where("especialista", "==", user.id)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let docc = doc.data();
                let dateFormat = new Date(doc.data().date.seconds * 1000);
                docc["date"] = dateFormat;
                if (!citas.includes(docc)) {
                  citas.push(docc);
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        } else {
          await bd
            .collection("citas")
            .where("usuario", "==", user.id)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let docc = doc.data();
                let dateFormat = new Date(doc.data().date.seconds * 1000);
                docc["date"] = dateFormat;
                if (!citas.includes(docc)) {
                  citas.push(docc);
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
        ordenarCitas();
      } else {
        // if (!!!user) {
        //   setrefresh(refresh + 1);
        // }
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }

    getDatosOtraPersona();
  }

  useEffect(() => {
    console.log("LECTURA A FIREBASE");
    getCitas();
  }, []);

  return (
    <>
      {!!!user && Loading && !desplegarCitas ? (
        <Cargando />
      ) : (
        <>
          {listaLista ? (
            <>
              <Navbar />
              <section className={styles.chatSect}>
                <div className={styles.encabezado}>
                  <div className={styles.contact}>
                    {showArchived ? <>Chats archivados</> : <>Chats de hoy</>}
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.someSpace}></div>
                  <label className="searchRanking">
                    Ver chats archivados
                    <input
                      type="checkbox"
                      className="checkRanking"
                      name="checkRanking"
                      onChange={() => setshowArchived(!showArchived)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div className={styles.chatsSect}>
                  <div
                    className={
                      (usuariosConCita.length !== 0 &&
                        citasHoy &&
                        !showArchived) ||
                      (usuariosConCita.length !== 0 &&
                        citasPasadas &&
                        showArchived)
                        ? styles.chats
                        : ""
                    }
                  >
                    <>
                      {desplegarCitas && usuariosConCita.length !== 0 ? (
                        <>
                          {showArchived ? (
                            <>
                              {citasPasadas ? (
                                <>
                                  {usuariosConCita.map((u) => {
                                    return (
                                      <>
                                        {u.today === "ayer" ? (
                                          <>
                                            <ChatCard key={u.id} usuario={u} />
                                          </>
                                        ) : (
                                          <div></div>
                                        )}
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                <p>¡No tienes chats archivados!</p>
                              )}
                            </>
                          ) : (
                            <>
                              {citasHoy ? (
                                <>
                                  {usuariosConCita.map((u) => {
                                    return (
                                      <>
                                        {u.today === "hoy" ? (
                                          <>
                                            <ChatCard key={u.id} usuario={u} />
                                          </>
                                        ) : (
                                          <div></div>
                                        )}
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                <p>¡No tienes citas para hoy!</p>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <p>¡Aún no tienes citas!</p>
                      )}
                    </>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <Cargando />
          )}
        </>
      )}
    </>
  );
};

export default Chats;
