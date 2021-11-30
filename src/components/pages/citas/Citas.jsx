import React from "react";
import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import styles from "./Citas.module.css";
import CitaCard from "./CitaCard";

const Citas = () => {
  return ( 
  <>
    <Navbar />
      <section className={styles.sect}>
        <div>Citas programadas</div>
      </section>
  </>
)};

export default Citas;
