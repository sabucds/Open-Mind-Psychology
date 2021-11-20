import Perfil from "../perfilEspecialistaComp/Perfil";
import { useParams } from "react-router-dom";
import { bd } from "../../utils/firebaseConfig";
import { useState, useEffect } from "react";
import Cargando from "../cargando/Cargando";

const DetallesEspecialista = () => {
  const [loading, setLoading] = useState(false);
  const [especialistas, setEspecialistas] = useState({});
  const params = useParams();

  async function getEspecialistas() {
    try {
      setLoading(true);
      const usersRef = bd.collection("users");
      const users = await usersRef.get();
      let especialistaDocs = {};
      let docData;
      let docId;
      users.forEach((doc) => {
        docData = doc.data();
        docId = doc.id;
        if (params.characterId === docId) {
          especialistaDocs["user"] = docData;
          especialistaDocs["user"]["id"] = docId;
        }
      });
      setEspecialistas(especialistaDocs);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    getEspecialistas();
  }, []);
  return loading ? <Cargando /> : Perfil(especialistas);
};

export default DetallesEspecialista;
