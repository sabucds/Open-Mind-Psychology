import React from 'react'
import "./EspecialistaCard.css";

const EspecialistaCard = (props) => {

    return (
        <div className="especialistaCard">
            <div className="espCardTop">
                <div className="credencialImg"></div>
            </div>
            <div className="nombreEspBox">
                <div className="nombreEsp">Nombre</div>
                <p>{props.especialista.name}</p>
            </div>
            <div className="correoEspBox">
                <div className="correoEsp">Correo</div>
                <p>{props.especialista.email}</p>
            </div>
            <div className="choiceEspBox">
                <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
                <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
            </div>
        </div>
    )
}

export default EspecialistaCard;