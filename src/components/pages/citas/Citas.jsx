import React from "react";
import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import styles from "./Citas.module.css";

const Citas = () => {
  const { user } = useContext(UserContext);
  const [Loading, setLoading] = useState(false);
  const [citas, setcitas] = useState([]);
  //lista de personas con las que user tendra chat
  const [usuariosConCita, setusuariosConCita] = useState([]);
  const [usuarios, setusuarios] = useState([]);
  const [refresh, setrefresh] = useState(0);
  const [listaLista, setlistaLista] = useState(false);
  const currentUser = useContext(UserContext).user;

  function getDatosOtraPersona() {
    if (citas.length > 0) {
      if (user.role === "especialista") {
        for (let index = 0; index < usuarios.length; index++) {
          for (let j = 0; j < citas.length; j++) {
            if (usuarios[index].id === citas[j].usuario) {
              if (!usuariosConCita.includes(usuarios[index])) {
                console.log(usuarios[index]);
                usuariosConCita.push(usuarios[index]);
              }
            }
          }
        }
      } else {
        for (let index = 0; index < usuarios.length; index++) {
          for (let j = 0; j < citas.length; j++) {
            if (usuarios[index].id === citas[j].especialista) {
              if (!usuariosConCita.includes(usuarios[index])) {
                console.log(usuarios[index]);
                usuariosConCita.push(usuarios[index]);
              }
            }
          }
        }
      }
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
                citas.push(doc.data());
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
                console.log(doc.data());
                citas.push(doc.data());
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
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
    getCitas();
  }, []);

  return ( 
  <>
    <Navbar />
      <section className={styles.sect}>
        <div className = {styles.encabezado}>
        <div className={styles.tit}> Sección de ver citas programadas</div>
        <div className={styles.line}></div>
        </div>


      </section>
  </>
)};

export default Citas;
