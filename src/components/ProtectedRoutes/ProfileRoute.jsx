import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PerfilUser from "../pages/perfilUser/PerfilUser";
import PerfilEspecialista from "../pages/perfilEspecialista/PerfilEspecialista";
import IniciarSesion from "../pages/IniciarSesion/IniciarSesion";
import Admin from "../pages/admin/Admin";
import { auth } from "../../utils/firebaseConfig";
import { useHistory } from "react-router-dom";

// Esto unifica los perfiles y la vista del administrador, ES UN COMPONENTE
const ProfileRoute = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  if (user.role === "especialista") {
    // Si está rechazado, al iniciar sesión se redirigira al inicio y se hará un logout automático acompañado por un alert notificando la situación.
    if (user.status === "rechazado") {
      alert("Usted ha sido rechazado de la plataforma");
      auth.signOut();
      history.push("/");
      return <IniciarSesion />;
    } else if (user.status === "standby") {
      alert(
        "¡La evaluación de sus credenciales sigue en pie, mientras tanto, puede ir configurando su perfil!"
      );
      return <PerfilEspecialista />;
    } else {
      return <PerfilEspecialista />;
    }
  } else if (user.role === "usuario") {
    return <PerfilUser />;
  } else if (user.role === "admin") {
    return <Admin />;
  }
};

export default ProfileRoute;
