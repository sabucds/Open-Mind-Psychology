import React from "react";
import "./TarjetaEspecialista.css";

const TarjetaEspecialista = (props) => {
  return (
    <div className="especialistaCard-1">
      <div className="espBox-1">
        <div>
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
            className="imagen-especialista"
          />
        </div>
        <p className="espInfo-1"></p>
      </div>
      <div className="espBox-1">
        <p className="espInfo-1" title={props.especialista.name}>
          {props.especialista.name}
        </p>
      </div>
    </div>
  );
};

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default TarjetaEspecialista;
