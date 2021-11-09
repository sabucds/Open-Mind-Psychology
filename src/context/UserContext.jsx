import { useEffect, useState, createContext } from "react";
import { auth, bd } from "../utils/firebaseConfig.js";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setuser] = useState(null);

  const createUser = async (user, uid) => {
    await bd.collection("users").doc(uid).set(user);
  };
  const getUserByEmail = async (email) => {
    const usersReference = bd.collection("users");
    const snapshot = await usersReference.where("email", "==", email).get();
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((loggedUser) => {
      console.log("ON AUTH STATE CHANGED", loggedUser);
      if (loggedUser) {
        setuser({
          name: loggedUser.displayName,
          email: loggedUser.email,
        });
      } else setuser(null);
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider value={{ setuser, user }}>
      {children}
    </UserContext.Provider>
  );
}
