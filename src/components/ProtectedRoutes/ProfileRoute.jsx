import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PerfilUser from "../pages/perfilUser/PerfilUser";
import PerfilEspecialista from "../pages/perfilEspecialista/PerfilEspecialista";
import { Route } from "react-router-dom";

const ProfileRoute = () => {
  const { user } = useContext(UserContext);
  if (user.role === "especialista") {
    return <PerfilEspecialista />;
  } else if (user.role === "usuario") {
    return <PerfilUser />;
  }
};

export default ProfileRoute;
