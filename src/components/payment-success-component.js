import React from "react";
import { useLocation } from "react-router-dom";
import { buyFish } from "../api/client";
import Container from '@mui/material/Container';
import { Button } from "@mui/material";

import { useNavigate } from 'react-router-dom';

const PaymentSuccessComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySessionId = queryParams.get('session_id');
  const updateFish = () => {
    if (querySessionId){
        buyFish(querySessionId).then((response) => console.log(response))
    }
  }
  updateFish();

  const styles = {
    color: '#00a69c'
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="30%">
      <p style={styles}> Payment Success with id: <br/> {querySessionId}</p>
      <Button size="medium"
            color='primary'
            style={{ backgroundColor: '#ADD8E6' }}
            onClick={() => navigate("/")}
            > Continue Shopping</Button>
    </Container>
  );
}

export default PaymentSuccessComponent;