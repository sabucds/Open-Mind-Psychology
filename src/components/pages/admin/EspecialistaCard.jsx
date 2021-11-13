import React from 'react'
import "./EspecialistaCard.css";

const EspecialistaCard = (props) => {

    return (
        <div className="especialistaCard">
            <div className="espCardTop">
                <button type="button" className="credencialButton" title="Click para ver credenciales." onClick={()=>{props.handleCredentials(props.especialista)}}></button>
            </div>
            <div className="espBox">
                <div className="espBoxCategory">Nombre</div>
                <p className="espInfo" title={props.especialista.name}>{props.especialista.name}</p>
            </div>
            <div className="espBox">
                <div className="espBoxCategory">Correo</div>
                <p className="espInfo" title={props.especialista.email}>{props.especialista.email}</p>
            </div>
            <div className="choiceEspBox">
                <button type="button" className="aceptarEsp" title="Click para aceptar al especialista." onClick={()=>{props.handleAccept(props.especialista)}}></button>
                <button type="button" className="rechazarEsp" title="Click para rechazar al especialista." onClick={()=>{props.handleReject(props.especialista)}}></button>
            </div>
        </div>
    )
}


export default EspecialistaCard;