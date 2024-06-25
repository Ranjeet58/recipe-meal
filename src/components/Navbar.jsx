import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import logoImage from "../assets/images/Logo.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
       <div className="navbar__wrapper">
          <div className="nav__logo" >
           <Link to = "/" > <img src={logoImage} alt="logo" /></Link>
          </div>
          <div className={`nav__menu-icon ${menuOpen ? "menuactive" : ""}`} onClick={toggleMenu} >
            {menuOpen ? <LiaTimesSolid className="cross_menu" /> : <CiMenuFries  />}
          </div>
          <ul className={`navbar__list ${menuOpen ? "active" : ""}`}>
            <div className="navbardrop"></div>
             <div className="nav__barmenu">
             <li className="navbar__item">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="navbar__item">
              <Link to="/menu" onClick={toggleMenu}>Menu</Link>
            </li>
            <li className="navbar__item">
              <Link to="/favourites" onClick={toggleMenu}>My Favourites</Link>
            </li>
            <li className="navbar__item">
              <Link to="/random-meal" onClick={toggleMenu}>Random meal generate</Link>
            </li>
            <li className="navbar__item">
              <Link to="/about-me" onClick={toggleMenu}>About Me</Link>
            </li>
             </div>
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;
