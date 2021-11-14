import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

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
            // Verificamos que sea admin o un especialista RECHAZADO, para redirigirlo a su perfil
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
          <h1>Loading...</h1>
        )
      }
    />
  );
};

export default ClientRoute;
