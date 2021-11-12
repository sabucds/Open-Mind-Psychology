import React from 'react'
import { bd } from "../../../utils/firebaseConfig";
import EspecialistaCard from './EspecialistaCard';
import { useState, useEffect } from "react";
import './Admin.css'

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [especialistas, setEspecialistas] = useState({});
    const [error, setError] = useState(null);
    var flag = 0;

    async function getEspecialistas () {
        try{
            setLoading(true);
            const usersRef = bd.collection("users");
            const users = await usersRef.get();
            let especialistaDocs = {};
            let docData;
            let docId;
            users.forEach(doc => {
                docData = doc.data();
                docId = doc.id;
                if (docData.role==="especialista" && docData.status==="standby"){
                    especialistaDocs[docId] = docData;
                    especialistaDocs[docId]['id'] = docId;}
                });
            
            setEspecialistas(especialistaDocs);
            setLoading(false);
            console.log("setEspecialistas: ");
            console.log(especialistas);
        }catch (e) {
            setError(e);
            setLoading(false);
            console.log(e.message);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        getEspecialistas();
    }, [flag]); //se llama a la función cuando cambie el valor de flag
        
    
    // function handleAccept (especialista) {
    //     bd.ref("users/"+especialista['id']).update({status: "aceptado"});
    //     flag++; //se cambia el valor de flag para que en el useEffect se llame a la función de especialistas y se vuelva a cargar el componente
    // }

    // function handleReject (especialista) {
    //     bd.ref("users/"+especialista['id']).update({status: "rechazado"});
    //     flag++; //se cambia el valor de flag para que en el useEffect se llame a la función de especialistas y se vuelva a cargar el componente
    // }


    return (
        <section className="admin">
            <div className="titulo">¡Bienvenido administrador!</div>
            <div className="containerEspecialistasAdmin">
                <p className="introAdmin">Se le presentarán los candidatos postulados, considere su decisión:</p>
                <hr />
                { 
                //si está cargando, muestra "Cargando..."; si no: si hay un error muestra el mensaje de error; 
                //si no: si hay especialistas que mostrar se muestran y si no, muestra "No hay especialistas nuevos."
                (loading && !error) ? <div className="altText">Cargando...</div> :
                    (error) ? <div className="altText">Error: {error.message}</div> :
                    (Object.entries(especialistas).length !== 0) ? 
                    <div className="especialistaList">{Object.keys(especialistas).map((key) => { 
                        const especialista = especialistas[key]; 
                        return <EspecialistaCard
                            key={especialista.id}
                            especialista={especialista}
                            />})}</div> : 
                    <div className="altText">No hay especialistas nuevos.</div>
                }                        
            </div>   
        </section>
    )
}

// handleAccept={()=>{handleAccept(especialista)}}
// handleReject={()=>{handleReject(especialista)}}

export default Admin
