import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: View, ...args }) => {
  const { user, loading } = useContext(UserContext);
  const isLoggedIn = !!user;

  return (
    <Route
      {...args}
      render={({ location }) =>
        !loading ? (
          isLoggedIn ? (
            <View />
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
