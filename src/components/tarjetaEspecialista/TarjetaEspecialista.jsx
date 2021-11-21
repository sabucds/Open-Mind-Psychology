import React from "react";
import "./TarjetaEspecialista.css";
import { useHistory } from "react-router-dom";
import labelsList from "../inputTags/labelsList";

const TarjetaEspecialista = (props) => {
  const history = useHistory();
  function handleClick() {
    history.push(`/especialistas/${props.especialista.id}`);
  }

  function starCalc(ranking) {
    const percentage = (ranking * 100) / 5;

    if (percentage < 10) {
      return (
        <div>
          <span class="stars-container stars-0">★★★★★</span>
        </div>
      );
    } else if (percentage >= 10 && percentage < 20) {
      return (
        <div>
          <span class="stars-container stars-10">★★★★★</span>
        </div>
      );
    } else if (percentage >= 20 && percentage < 30) {
      return (
        <div>
          <span class="stars-container stars-20">★★★★★</span>
        </div>
      );
    } else if (percentage >= 30 && percentage < 40) {
      return (
        <div>
          <span class="stars-container stars-30">★★★★★</span>
        </div>
      );
    } else if (percentage >= 40 && percentage < 50) {
      return (
        <div>
          <span class="stars-container stars-40">★★★★★</span>
        </div>
      );
    } else if (percentage >= 50 && percentage < 60) {
      return (
        <div>
          <span class="stars-container stars-50">★★★★★</span>
        </div>
      );
    } else if (percentage >= 60 && percentage < 70) {
      return (
        <div>
          <span class="stars-container stars-60">★★★★★</span>
        </div>
      );
    } else if (percentage >= 70 && percentage < 80) {
      return (
        <div>
          <span class="stars-container stars-70">★★★★★</span>
        </div>
      );
    } else if (percentage >= 80 && percentage < 90) {
      return (
        <div>
          <span class="stars-container stars-80">★★★★★</span>
        </div>
      );
    } else if (percentage >= 90 && percentage < 100) {
      return (
        <div>
          <span class="stars-container stars-90">★★★★★</span>
        </div>
      );
    } else {
      return (
        <div>
          <span class="stars-container stars-100">★★★★★</span>
        </div>
      );
    }
  }
  return (
    <div className="especialistaCard-1" onClick={handleClick}>
      <div className="img-box-esp">
        <img
          src={props.especialista.img}
          alt="Not found"
          className="imagen-especialista"
        />
      </div>
      <div className="esp-name">
        <p className="espInfo-1" title={props.especialista.name}>
          {props.especialista.name}
        </p>
      </div>
      <div className="ranking-esp">{starCalc(props.especialista.ranking)}</div>
      <div className="lista-esp">
        <div className="especialidades-are">Áreas de atención</div>
        {props.especialista.specialty.length !== 0 ? (
          <ul className="lista-especialidades">
            {labelsList(props.especialista.specialty).map((esp) => {
              return <li key={esp}>{esp}</li>;
            })}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default TarjetaEspecialista;
