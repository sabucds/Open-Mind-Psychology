import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import "./PerfilEspecialista.css";

import "../../Navbar/Navbar.css";
import Navbar from "../../Navbar/Navbar";

const PerfilEspecialista = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const handleConfig = () => {
    history.push("/config");
  };
  return (
    <>
      <Navbar />
      <section className="main-RegistroUser">
        <div className="todo-user">
          <div className="encabezado1">
            <img src={user.img} alt="Not found" className="imagen-user" />
            <div className="nombre-user">{user.name}</div>
          </div>

          <div className="relleno">
            <div className="correo-user">
              <div className="titles">Correo electrónico</div>
              <div className="sub">{user.email}</div>
            </div>
            <div className="line"></div>
            <div className="number-user">
              <div className="titles">Número telefónico</div>
              <div className="sub">{user.phone}</div>
            </div>
            <div className="line"></div>
            <div className="pais-user">
              <div className="titles">País</div>
              <div className="sub">
                {/* {user.country} */}
                Venezuela
              </div>
            </div>
          </div>
          <div className="info-edu">
            <div className="edu-box">
              <div className="titles" id="titles-ed1">
                Áreas de
                <br />
                atención
              </div>
              <div className="line"></div>
            </div>
            <div className="edu-box">
              <div className="titles" id="titles-ed">
                Formación Académica
              </div>
              <div className="line"></div>
            </div>
          </div>
          <div className="about-user">
            <div className="info">
              <div className="titles">Sobre mi</div>
              <div className="line"></div>

              <div className="text-info">
                {/* {user.info} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                mollitia soluta et sapiente, quisquam, ratione eveniet,
                excepturi tempore harum ex veritatis officiis autem itaque nemo
                explicabo unde beatae distinctio reiciendis id corrupti atque
                maiores rerum? Expedita vitae ipsum ab architecto quae
                accusamus, atque dolores quia sit ex sunt eaque magni.
              </div>
            </div>
          </div>

          <div className="div-button">
            <p className="register-button" onClick={handleConfig}>
              EDITAR PERFIL
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerfilEspecialista;
