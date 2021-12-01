import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

import Cargando from "../cargando/Cargando";

// Ruta para especial para los visitantes, solo ellos podrán acceder a esta

const VisitorRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;

  return (
    <Route
      {...args}
      render={({ location }) =>
        !loading ? (
          !isLoggedIn ? (
            <View />
          ) : (
            <Redirect to={{ pathname: "/perfil", state: { from: location } }} />
          )
        ) : (
          <>
            <Cargando />
          </>
        )
      }
    />
  );
};
export default VisitorRoute;
