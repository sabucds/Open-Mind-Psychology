import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import "./PerfilEspecialista.css";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";

const PerfilEspecialista = () => {
  console.log(useContext(UserContext).user);
  return <Perfil user={useContext(UserContext).user} />;
};

export default PerfilEspecialista;
