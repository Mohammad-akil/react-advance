"use client";
import React, { useEffect } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import Style from "../../styles/quickLogin.module.css";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { emailUnsubscribe } from "../../store/auth";
import { useAppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface EmailUnSubscribeProps {
  [key: string]: any;
}
function EmailUnSubscribe(props: EmailUnSubscribeProps) {
  const dispatch = useAppDispatch();
  const emailUbSubscribe = useSelector(
    (state: RootState) => state.auth.emailUbSubscribe
  );

  useEffect(() => {
    if (props.id) {
      dispatch(
        emailUnsubscribe({
          id: props.id,
        })
      );
    }
  }, [props.id]);

  return emailUbSubscribe?.isLoading ? (
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
          {emailUbSubscribe?.success ? (
            <Typography className={Style.quickLoginText}>
              You have been successfully <br /> unsubscribed
            </Typography>
          ) : (
            <Typography className={Style.quickLoginText}>
              {JSON.stringify(emailUbSubscribe.errMsg)}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
export default EmailUnSubscribe;
