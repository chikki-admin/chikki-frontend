import React from "react";
import { useLocation } from "react-router-dom";
import { buyFish } from "../api/client";

const PaymentSuccessComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySessionId = queryParams.get('session_id');
  const updateFish = () => {
    if (querySessionId){
        buyFish(querySessionId).then((response) => console.log(response))
    }
  }
  updateFish();

  return (
    <div>
      <h1>Payment Success with {querySessionId}</h1>
    </div>
  );
}

export default PaymentSuccessComponent;