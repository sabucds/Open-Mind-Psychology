import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

import Perfil from "../../perfilEspecialistaComp/Perfil";

const PerfilEspecialista = () => {
  console.log(useContext(UserContext).user);
  return <Perfil user={useContext(UserContext).user} />;
};

export default PerfilEspecialista;
