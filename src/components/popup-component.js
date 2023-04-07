import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import { createCheckoutSession } from '../api/client';

const SimpleDialog = (props) => {
  const { handleClose, open, fishId, fishName, fishPrice, imgSource } = props;

  const handleOnClick = (fishId, fishPrice, fishName, imgSource) => {
    createCheckoutSession(fishId, fishPrice, fishName, imgSource).then((response) => {
      window.location.href = response.data.url
    })}


  return (
    <Dialog onClose={handleClose} open={open}>
        <img src={imgSource} alt="default"/>
        <h3>Fish name: {fishName}</h3>
        <h3>Fish price: {fishPrice}$  + Shipping: $52 (1 day shipping by UPS)</h3>
        <h3>Total: {parseInt(fishPrice) + 52 }$</h3>
        <Button 
          onClick={() => handleOnClick(fishId, fishPrice, fishName, imgSource)}
          color='primary'
          type='submit'
          style={{ 
            backgroundColor: '#ADD8E6',borderRadius: '20px', width: '30%', position: 'relative', left: '35%', fontSize: '1.2rem' }}
          >
          Buy</Button>
    </Dialog>
  );
}

export default SimpleDialog;