import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";
import Cargando from "../cargando/Cargando";

const UserRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;

  // Esta ruta es SOLO para los PACIENTES
  return (
    <Route
      {...args}
      render={({ location }) =>
        // Verificamos que el usuario esté cargado
        !loading ? (
          // Verificamos que esté logged in
          isLoggedIn ? (
            // Verificamos que sea igual usuario para mostrarle la página, de lo contrario, redirigirlo a su perfil
            user.role === "usuario" ? (
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

export default UserRoute;
