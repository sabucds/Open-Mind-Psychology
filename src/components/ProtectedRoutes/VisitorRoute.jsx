import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Route, Redirect } from "react-router-dom";

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
          <h1>Loading...</h1>
        )
      }
    />
  );
};

// const VisitorRoute = ({ component: View, ...args }) => {
//   const { user } = useContext(UserContext);
//   const isLoggedIn = !!user;

//   if (!isLoggedIn) {
//     return <Route {...args} render={() => <View />} />;
//   }
//   return (
//     <Route
//       {...args}
//       render={({ location }) => (
//         <Redirect to={{ pathname: "/perfil", state: { from: location } }} />
//       )}
//     />
//   );
// };

export default VisitorRoute;
