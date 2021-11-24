import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

import Perfil from "../../perfilEspecialistaComp/Perfil";

const PerfilEspecialista = () => {
  return Perfil(useContext(UserContext));
};

export default PerfilEspecialista;
