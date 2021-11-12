import React from 'react'
import EspecialistaCard from './EspecialistaCard';
import { bd } from "../../../utils/firebaseConfig";

const EspecialistaList = (props) => {

    async function handleAccept (especialista) {
        await bd.ref("users/"+especialista['id']).update({status: "aceptado"});
        props.flag++; //se cambia el valor de flag para que en el useEffect se llame a la función de especialistas y se vuelva a cargar el componente
    }

    async function handleReject (especialista) {
        await bd.collection("users").doc(especialista['id']).delete();
        props.flag++; //se cambia el valor de flag para que en el useEffect se llame a la función de especialistas y se vuelva a cargar el componente
    }

    return (
        <div className="especialistaListContainer">
            {
                Object.keys(props.especialistas).map((key) => { 
                    const especialista = props.especialistas[key]; 
                    return <EspecialistaCard
                        key={especialista.id}
                        especialista={especialista}
                        handleAccept={handleAccept(especialista)}
                        handleReject={handleReject(especialista)} />
                })
            }
        </div>
    )
}

export default EspecialistaList
