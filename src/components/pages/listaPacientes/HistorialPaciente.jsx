import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { bd } from "../../../utils/firebaseConfig";
import firebase from "firebase/app";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
// Components
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";
import { useParams } from "react-router-dom";
import styles from "./ListaPacientes.module.css";

const HistorialPaciente = () => {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [user2, setUser] = useState([]);

    async function getUserInfo(){
        try{
            const usersQuery = await bd
            .collection("users")
            .doc(params.userId)
            .get()
            const user2 = usersQuery.data()
            user2.id = usersQuery.id
            setUser(user2)
        }catch (error){
            console.log("Error getting documents: ", error);
        }
    }
    useEffect(()=>{
        getUserInfo()
    },[])

    console.log(user)
    return ( 
    <>
      <Navbar />
        <section className={styles.sect}>
          <div>Historia del Paciente</div>
          <p>{user2.name}</p>

        </section>
    </>
  )};
  
  export default HistorialPaciente;