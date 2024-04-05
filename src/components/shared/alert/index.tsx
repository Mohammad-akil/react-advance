'use client'
import React from "react";
import { Stack, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

interface alertProps {
  [key: string]: any;
}

const Alert = React.forwardRef(function Alert(props: alertProps, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ResponseAlert = ({
  setOpen,
  open,
  alertType,
  alertMessage,
  anchorOrigin,
}: alertProps) => {
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open ? true : false}
        autoHideDuration={2000}
        onClose={handleClose}
        sx={{ mt: "45px" }}
        anchorOrigin={
          anchorOrigin ? anchorOrigin : { vertical: "top", horizontal: "right" }
        }
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%", mt: "42px" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ResponseAlert;
