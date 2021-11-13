import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../../utils/firebaseConfig";
import "./PerfilEspecialista.css";

const PerfilEspecialista = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  return (
    <section className="main-RegistroUser">
      {!!user ? (
        <div className="todo-user">
          <div className="encabezado1">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
              className="imagen-user"
            />
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

          <Link to="./config" className="register-button">
            EDITAR PERFIL
          </Link>
        </div>
      ) : (
        <div className="cargando">Loading User...</div>
      )}
    </section>
  );
};

export default PerfilEspecialista;
