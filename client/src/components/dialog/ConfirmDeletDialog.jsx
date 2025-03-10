import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <Button  onClick={handleClose}>No</Button>
      <Button  onClick={deleteHandler} color='error'> Yes</Button>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
