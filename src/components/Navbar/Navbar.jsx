import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MenuList } from "./MenuList";
import { ClienteList } from "./ClienteList";
import { EspecialistaList } from "./EspecialistaList";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [clickedMenu, setClickedMenu] = useState(false);
  const handleClickMenu = () => {
    setClickedMenu(!clickedMenu);
  };
  const [clickedProfile, setClickedProfile] = useState(false);
  const handleClickProfile = () => {
    setClickedProfile(!clickedProfile);
  };
  const [clickedCuenta, setClickedCuenta] = useState(false);
  const handleClickCuenta = () => {
    setClickedCuenta(!clickedCuenta);
  };
  const { user } = useContext(UserContext);
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    // setUser(null);
    setClickedProfile(!clickedProfile);
    history.push("/");
  };

  function mapear(estructura, clicked) {
    return estructura.map(({ url, title }, index) => {
      return (
        <li className="bar-options" key={index}>
          <NavLink
            exact
            className="nav-links"
            activeClassName={clickedCuenta ? "not-active" : "active"}
            onClick={clicked}
            to={url}
          >
            <div className="nav-link">{title}</div>
          </NavLink>
        </li>
      );
    });
  }
  const menulist = mapear(MenuList, handleClickMenu);
  const especialistalist = mapear(EspecialistaList, handleClickCuenta);
  const clientelist = mapear(ClienteList, handleClickCuenta);

  function ValidarRol(user, especialistalist, clientelist) {
    const userRol = user.role;
    if (userRol === "usuario") {
      return clientelist;
    }
    return especialistalist;
  }
  return (
    <div className="navbar">
      {!!user ? (
        <div
          className={
            clickedProfile
              ? "profile-icon times"
              : clickedMenu
              ? "hideProfile"
              : "profile-icon barProfile"
          }
          onClick={handleClickProfile}
        ></div>
      ) : (
        <div className=""></div>
      )}
      <div className="nav-wrapper">
        <a href="/">
          <div className={user ? "logo" : "logo sin-profile"}></div>
        </a>
      </div>
      <div
        className={
          clickedMenu
            ? "menu-icon times"
            : clickedProfile
            ? "hideMenuIcon"
            : "menu-icon bar"
        }
        onClick={handleClickMenu}
      ></div>
      <ul className={clickedMenu ? "menu-options" : "menu-options close"}>
        {menulist}
        {!!user ? (
          <li className="bar-options">
            <div
              className={
                clickedCuenta ? "nav-links cuenta-iniciada" : "nav-links close"
              }
              onClick={handleClickCuenta}
            >
              <div className="nav-link clic-cuenta">
                Cuenta{" "}
                <div
                  className={
                    clickedCuenta
                      ? "cuenta-icon-arrow voltea-arrow"
                      : "cuenta-icon-arrow voltea-arrow-again"
                  }
                ></div>
              </div>
            </div>
          </li>
        ) : (
          <li className="bar-options">
            <NavLink
              exact
              className="nav-links"
              activeClassName="active"
              onClick={handleClickMenu}
              to="/iniciar"
            >
              <div className="nav-link">Iniciar sesión</div>
            </NavLink>
          </li>
        )}
      </ul>
      {!!user ? (
        <ul
          className={
            clickedCuenta ? "cuenta-options" : "cuenta-options cuenta-close"
          }
        >
          {ValidarRol(user, especialistalist, clientelist)}
          <li className="bar-options" onClick={handleLogout}>
            <div className="nav-link nav-links">Cerrar sesión</div>
          </li>
        </ul>
      ) : (
        <div className="nada_porque_no_inicio"></div>
      )}
      {!!user ? (
        <ul
          className={
            clickedProfile ? "menu-options" : "menu-options close profileHidden"
          }
        >
          {ValidarRol(user, especialistalist, clientelist)}
          <li className="bar-options" onClick={handleLogout}>
            <div className="nav-link nav-links">Cerrar sesión</div>
          </li>
        </ul>
      ) : (
        <div className="nada_porque_no_inicio"></div>
      )}
    </div>
  );
};

export default Navbar;
