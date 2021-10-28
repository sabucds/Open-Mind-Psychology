import React from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";

const Navbar = () => {
  const menulist = MenuList.map(({ url, title }, index) => {
    return (
      <li className="bar-options" key={index}>
        <NavLink exact className="nav-links" activeClassName="active" to={url}>
          {title}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="logo"></div>
      </div>
      <ul className="menu-options">{menulist}</ul>
    </nav>
  );
};

export default Navbar;
