import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";
import Cargando from "../cargando/Cargando";

const ClientRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;

  // Esta ruta es SOLO para que puedan ingresar especialistas (no rechazados) Y pacientes
  return (
    <Route
      {...args}
      render={({ location }) =>
        // Verificamos que el usuario esté cargado
        !loading ? (
          // Verificamos que esté logged in
          isLoggedIn ? (
            // Verificamos que sea admin, para redirigirlo a su perfil
            user.role !== "admin" ? (
              <View />
            ) : (
              <Redirect
                to={{ pathname: "/perfil", state: { from: location } }}
              />
            )
          ) : (
            <Redirect
              to={{ pathname: "/iniciar", state: { from: location } }}
            />
          )
        ) : (
          <Cargando />
        )
      }
    />
  );
};

export default ClientRoute;
