import React from 'react'
import { bd } from "../../../utils/firebaseConfig";
import EspecialistaCard from './EspecialistaCard';
import { useState, useEffect } from "react";
import './Admin.css';
import 'firebase/firestore';

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [especialistas, setEspecialistas] = useState({});
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

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
        }catch (e) {
            setError(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        getEspecialistas();
    }, [refresh]); //cambios en refresh harán que se llame getEspecialistas
        
    async function handleAccept (especialista) {
        try {
            setLoading(true);
            const especialistaDoc = await bd.collection("users").doc(especialista.id);
            await especialistaDoc.update({status: "aceptado"});
            setRefresh(refresh+1);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    async function handleReject (especialista) {
        try {
            setLoading(true);
            const especialistaDoc = await bd.collection("users").doc(especialista.id);
            await especialistaDoc.update({status: "rechazado"});
            setRefresh(refresh+1);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

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
                    (error) ? <div className="altText">Error: {error.message}. Intente refrescar la página.</div> :
                    (Object.entries(especialistas).length !== 0) ? 
                    <div className="especialistaList">{Object.keys(especialistas).map((key) => { 
                        const especialista = especialistas[key]; 
                        return <EspecialistaCard
                            key={especialista.id}
                            especialista={especialista}
                            handleAccept={handleAccept}
                            handleReject={handleReject}
                            />})}</div> : 
                    <div className="altText">No hay especialistas nuevos.</div>
                }                        
            </div>   
        </section>
    )
}

export default Admin
