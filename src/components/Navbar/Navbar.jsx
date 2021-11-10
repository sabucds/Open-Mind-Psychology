import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const menulist = MenuList.map(({ url, title }, index) => {
    return (
      <li className="bar-options" key={index}>
        <NavLink
          exact
          className="nav-links"
          activeClassName="active"
          onClick={handleClick}
          to={url}
        >
          <div className="nav-link">{title}</div>
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <a href="/">
          <div className="logo"></div>
        </a>
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
