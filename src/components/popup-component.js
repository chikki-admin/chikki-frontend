import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import { createCheckoutSession } from '../api/client';

const SimpleDialog = (props) => {
  const { handleClose, open } = props;

  const handleOnClick = () => {
    createCheckoutSession().then((response) => {
      window.location.href = response.data.url
    })}


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
        <h3>show picture of fish</h3>
        <h3>show price of fish</h3>
        <h3>show shipping price</h3>
        <Button onClick={() => handleOnClick()}>Buy</Button>
    </Dialog>
  );
}

export default SimpleDialog;