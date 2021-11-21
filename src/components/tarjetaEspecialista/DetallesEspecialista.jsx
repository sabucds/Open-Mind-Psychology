import Perfil from "../perfilEspecialistaComp/Perfil";
import { useParams } from "react-router-dom";
import { bd } from "../../utils/firebaseConfig";
import { useState, useEffect, useRef } from "react";
import Cargando from "../cargando/Cargando";

const DetallesEspecialista = () => {
  const [loading, setLoading] = useState(false);
  const [especialista, setEspecialista] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const componentMounted = useRef(true);

  async function getEspecialista() {
    try {
      setLoading(true);
      const userRef = await bd.collection("users").doc(params.characterId);
      const userDoc = await userRef.get();
      let user = userDoc.data();
      user.id = userDoc.id;
      if (componentMounted.current){
        setEspecialista(user);
        setLoading(false);
      }
      
    } catch (e) {
      console.log(e);
      if (componentMounted.current){
        setError(e);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getEspecialista();
    return () => {
      componentMounted.current = false;
    }
  }, []);

  return loading && !especialista && !error ? <Cargando /> : 
    (especialista? <Perfil user={especialista} /> : 
    <h1>Hubo un error al intentar cargar el especialista.</h1>
  );
};

export default DetallesEspecialista;
