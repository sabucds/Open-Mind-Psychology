import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";
import Cargando from "../cargando/Cargando";

// Esto es para los clientes (no rechazados) Y admin
const PrivateRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;

  return (
    <Route
      {...args}
      render={({ location }) =>
        // Revisamos esté cargado
        !loading ? (
          // Revisamos que esté logged in
          isLoggedIn ? (
            <View />
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
//   if (isLoggedIn) {
//     return <Route {...args} render={() => <View />} />;
//   }
//   return (
//     <Route
//       {...args}
//       render={({ location }) => (
//         <Redirect to={{ pathname: "iniciar", state: { from: location } }} />
//       )}
//     />
//   );
// };

export default PrivateRoute;
