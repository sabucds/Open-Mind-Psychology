import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";
import Cargando from "../cargando/Cargando";

const NoAdminRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;
  // Esta ruta es para todos menos los administradores
  return (
    <Route
      {...args}
      render={({ location }) =>
        // Verificamos que el usuario esté cargado
        !loading ? (
          // Verificamos que sea admin, para redirigirlo a su perfil
          isLoggedIn && user.role === "admin" ? (
            <Redirect to={{ pathname: "/perfil", state: { from: location } }} />
          ) : (
            <View />
          )
        ) : (
          <Cargando />
        )
      }
    />
  );
};

export default NoAdminRoute;
