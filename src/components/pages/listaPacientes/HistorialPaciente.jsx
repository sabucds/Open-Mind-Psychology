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
    console.log(params)
    return ( 
    <>
      <Navbar />
        <section className={styles.sect}>
          <div>Historia del Paciente</div>
          <p>este es el user id: {params.userId}</p>

        </section>
    </>
  )};
  
  export default HistorialPaciente;