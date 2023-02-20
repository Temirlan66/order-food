import { Alert } from "@mui/material";
import React from "react";
import { Snackbar as MuiSnackbar } from "@mui/material";
const Snackbar = ({ isOpen, onClose, message, severits, autoHideDuration }) => {
  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={autoHideDuration || 4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severits} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
