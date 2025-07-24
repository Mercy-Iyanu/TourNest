import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ConfirmationDialog = ({ open, onCancel, onConfirm }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Confirm Submission</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to submit this tour package? This action will save
        it to the database.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="contained" onClick={onConfirm}>
        Yes, Submit
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
