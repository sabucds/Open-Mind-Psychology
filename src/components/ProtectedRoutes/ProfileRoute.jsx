import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PerfilUser from "../pages/perfilUser/PerfilUser";
import PerfilEspecialista from "../pages/perfilEspecialista/PerfilEspecialista";

const ProfileRoute = () => {
  const { user } = useContext(UserContext);
  if (user.role === "especialista") {
    console.log(user);
    return <PerfilEspecialista />;
  } else if (user.role === "usuario") {
    console.log(user);
    return <PerfilUser />;
  }
};

export default ProfileRoute;
