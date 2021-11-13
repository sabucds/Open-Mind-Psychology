import { useEffect, useState, createContext } from "react";
import { auth, bd } from "../utils/firebaseConfig.js";
import { getFirstElementArrayCollection } from "../utils/parser.js";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setuser] = useState(null);
  const [type, settype] = useState(false);
  const [loading, setloading] = useState(true);

  const createUser = async (user, uid) => {
    await bd.collection("users").doc(uid).set(user);
  };
  const getUserByEmail = async (email) => {
    const usersReference = bd.collection("users");
    const snapshot = await usersReference.where("email", "==", email).get();
    if (!snapshot.size) return null;
    const loggedUser = getFirstElementArrayCollection(snapshot);

    console.log({ loggedUser });

    return loggedUser;
  };

  useEffect(() => {
    setloading(true);
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      console.log("ON AUTH STATE CHANGED");
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);

        if (!profile) {
          if (!type) {
            const newProfile = {
              name: loggedUser.displayName,
              email: loggedUser.email,
              phone: loggedUser.phoneNumber,
              country: "",
              info: "",
              role: "usuario",
            };
            await createUser(newProfile, loggedUser.uid);
            setuser(newProfile);
          } else {
            const newProfile = {
              name: loggedUser.displayName,
              email: loggedUser.email,
              phone: loggedUser.phoneNumber,
              country: "",
              info: "",
              specialty: [],
              education: [],
              schedule: [],
              feedback: [],
              ranking: 0,
              role: "especialista",
              status: "standby",
            };
            await createUser(newProfile, loggedUser.uid);
            setuser(newProfile);
          }
        } else {
          setuser(profile);
        }
      } else {
        setuser(null);
      }
      setloading(false);
    });

    return () => {
      unlisten();
    };
  }, [type]);
  console.log(user);
  return (
    <UserContext.Provider
      value={{
        user,
        setuser,
        createUser,
        type,
        settype,
        getUserByEmail,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
