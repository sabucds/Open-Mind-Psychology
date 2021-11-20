import React from "react";
import "./TarjetaEspecialista.css";
import { useHistory } from "react-router-dom";

const TarjetaEspecialista = (props) => {
  const history = useHistory();
  function handleClick() {
    history.push(`/especialistas/${props.especialista.id}`);
  }
  return (
    <div className="especialistaCard-1" onClick={handleClick}>
      <div className="espBox-1">
        <div>
          <img
            src={props.especialista.img}
            alt="Not found"
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
