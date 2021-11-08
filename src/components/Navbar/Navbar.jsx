import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menulist = MenuList.map(({ url, title }, index) => {
    return (
      <li className="bar-options" key={index}>
        <NavLink exact className="nav-links" activeClassName="active" to={url}>
          <div className="nav-link">{title}</div>
        </NavLink>
      </li>
    );
  });
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="logo"></div>
      </div>
      <div
        className={clicked ? "menu-icon times" : "menu-icon bar"}
        onClick={handleClick}
      ></div>
      <ul className={clicked ? "menu-options" : "menu-options close"}>
        {menulist}
      </ul>
    </nav>
  );
};

export default Navbar;
