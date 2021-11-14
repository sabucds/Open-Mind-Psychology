import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ConfiguracionUser from "../pages/configuracion/ConfiguracionUser";

// Esto unifica las configuraciones, es un COMPONENTE
const ConfigRoute = () => {
  const { user } = useContext(UserContext);
  if (user.role === "especialista") {
    return <h1>None</h1>;
  } else if (user.role === "usuario") {
    return <ConfiguracionUser />;
  }
};

export default ConfigRoute;
