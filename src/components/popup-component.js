import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const SimpleDialog = (props) => {
  const { handleClose, open } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
}

export default SimpleDialog;