import React from 'react'
import "./EspecialistaCard.css";

const EspecialistaCard = (props) => {

    return (
        <div className="especialistaCard">
            <div className="espCardTop">
                <button type="button" className="credencialButton" title="Click para ver credenciales."></button>
            </div>
            <div className="espBox">
                <div className="espBoxCategory">Nombre</div>
                <p className="espInfo">{props.especialista.name}</p>
            </div>
            <div className="espBox">
                <div className="espBoxCategory">Correo</div>
                <p className="espInfo">{props.especialista.email}</p>
            </div>
            <div className="choiceEspBox">
                <button type="button" className="aceptarEsp" title="Click para aceptar al especialista."></button>
                <button type="button" className="rechazarEsp" title="Click para rechazar al especialista."></button>
            </div>

           
        </div>
    )
}

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default EspecialistaCard;