import React from "react";
import { useParams } from "react-router-dom";
import "../css/confirmation.css";

function Confirmation() {
  const { orderId } = useParams();

  return (
    <>
      <div className="confirmation-box">
        <p data-testid="orderId">
          Commande validée ! <br />
          Votre numéro de commande est : {orderId}
        </p>
      </div>
    </>
  );
}

export default Confirmation;
