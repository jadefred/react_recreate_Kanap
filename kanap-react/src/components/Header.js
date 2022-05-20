import React from "react";
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
          <PhoneIcon className="icons" /> 01 23 45 67 89
        </p>
        <p>
          <MailIcon className="icons" /> support@name.com
        </p>
        <p>
          <AdressIcon className="icons" />
          01 23 45 67 89
        </p>
      </div>

      <nav>
        <img src={logo} alt="logo de kanap" />
        <div className="links">
          <p>Acceuil</p>
          <p>Panier</p>
        </div>
      </nav>
      <img src={banner} alt="banniere de kanap" className="banner" />
    </>
  );
}

export default Header;
