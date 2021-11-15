import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ConfiguracionUser from "../pages/configuracion/ConfiguracionUser";
import ConfiguracionEsp from "../pages/configuracion/ConfiguracionEsp";

// Esto unifica las configuraciones, es un COMPONENTE
const ConfigRoute = () => {
  const { user } = useContext(UserContext);
  if (user.role === "especialista") {
    return <ConfiguracionEsp />;
  } else if (user.role === "usuario") {
    return <ConfiguracionUser />;
  }
};

export default ConfigRoute;
