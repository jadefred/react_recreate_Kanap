import React from "react";
import "./css/footer.css";
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <>
      <div className="upper-footer">
        <div className="upper-footer-content-box">
          <img src={logo} alt="logo de kanap" />
          <p>10 quai de la charente 75019 Paris 19</p>
          <p>Téléphone : 01 23 45 67 89</p>
          <p>Email : support@name.com</p>
        </div>
      </div>
      <div className="lower-footer">
        <p>© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by Love</p>
      </div>
    </>
  );
}

export default Footer;
