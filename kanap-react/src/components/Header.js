import React from "react";
import { Link } from "react-router-dom";
import "./css/header.css";
import { ReactComponent as AdressIcon } from "../assets/images/icons/adress.svg";
import { ReactComponent as MailIcon } from "../assets/images/icons/mail.svg";
import { ReactComponent as PhoneIcon } from "../assets/images/icons/phone.svg";
import logo from "../assets/images/logo.png";
import banner from "../assets/images/banniere.png";

function Header() {
  return (
    <>
      <div className="contact-bar">
        <p>
          <PhoneIcon className="icons" data-testid="svg-1" /> 01 23 45 67 89
        </p>
        <p>
          <MailIcon className="icons" data-testid="svg-2" /> support@name.com
        </p>
        <p>
          <AdressIcon className="icons" data-testid="svg-3" />
          01 23 45 67 89
        </p>
      </div>

      <nav>
        <Link to={"/"}>
          <img src={logo} alt="logo de kanap" />
        </Link>

        <div className="links">
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <p data-testid="acceuil-btn">Acceuil</p>
          </Link>

          <Link to={"/cart"} style={{ textDecoration: "none", color: "inherit" }}>
            <p data-testid="panier-btn">Panier</p>
          </Link>
        </div>
      </nav>
      <img src={banner} alt="banniere de kanap" className="banner" />
    </>
  );
}

export default Header;
