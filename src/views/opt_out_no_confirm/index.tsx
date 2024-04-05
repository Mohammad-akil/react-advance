"use client";
import React, { useEffect } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import Style from "../../styles/quickLogin.module.css";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { UnsubscribedAccount } from "../../store/auth";
import { useAppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface OptOutConfirmProps {
  [key: string]: any;
}
function OptOutConfirm(props: OptOutConfirmProps) {
  const dispatch = useAppDispatch();
  const ubSubscribe = useSelector((state: RootState) => state.auth.ubSubscribe);
  
  useEffect(() => {
    if (props.id) {
      dispatch(
        UnsubscribedAccount({
          id: props.id,
        })
      );
    }
  }, [props.id]);

  return ubSubscribe?.isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Container maxWidth="xl">
      <Box className={Style.quickLoginArea}>
        {" "}
        <Box
          className={Style.quickLoginInnerBox}
          sx={{ display: "block !important" }}
        >
          <Box className={Style.quickLoginInnerBoxIconArea}>
            <UnsubscribeIcon className={Style.quickLoginInnerBoxIcon} />
          </Box>
          {ubSubscribe?.success ? (
            <Typography className={Style.quickLoginText}>
              You have been successfully <br /> unsubscribed
            </Typography>
          ) : (
            <Typography className={Style.quickLoginText}>
              {JSON.stringify(ubSubscribe.errMsg)}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
export default OptOutConfirm;
