import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Style from "../../../styles/registration/register.module.css";
import { userLogin } from "../../../store/auth";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { openAlert } from "../../../store/notification";

interface loginProps {
  handleUpdateView?: any;
  handleClose?: any;
  handleCloseOnSuccess?: any;
  userDetail?: any;
  setUserDetail?: any;
}

function LoginUser(props: loginProps) {
  let { handleUpdateView, handleCloseOnSuccess, userDetail, setUserDetail } =
    props;
  const dispatch = useAppDispatch();

  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});
  const login = useSelector((state: RootState) => state.auth.login);
  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!userDetail.email) {
      isFormValid = false;
      errorMsg["email"] = "Please enter the email";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the email",
          open: true,
        })
      );
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        userDetail.email?.replaceAll("+", "")
      )
    ) {
      isFormValid = false;
      errorMsg["email"] = "Please enter the valid email address";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the valid email address",
          open: true,
        })
      );
    } else if (!userDetail.phoneNumber) {
      isFormValid = false;
      errorMsg["phoneNumber"] = "Please enter the password";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the password",
          open: true,
        })
      );
    }
    setErrMsg(errorMsg);
    return isFormValid;
  };

  const handleSuccess = () => {
    dispatch(
      openAlert({
        type: "success",
        message: "You have successfully  logged in!",
        open: true,
      })
    );
    setUserDetail({
      email: "",
      phoneNumber: "",
    });
    handleCloseOnSuccess();
  };
  const handleError = (error: any) => {
    dispatch(
      openAlert({
        type: "error",
        message: JSON.stringify(error),
        open: true,
      })
    );
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      dispatch(
        userLogin({
          schema: {
            ...userDetail,
          },
          handleSuccess,
          handleError,
        })
      );
    }
  };
  const handleUpdateDetail = (field: any, value: any) => {
    setUserDetail({ ...userDetail, [field]: value });
  };
  return (
    <Box className={Style.continueWithEmailArea}>
      <Box className={Style.continueWithEmailAreaInner}>
        <TextField
          size="medium"
          fullWidth
          placeholder="E-mail"
          className={Style.continueEmailTextField}
          sx={{ mb: "15px" }}
          value={userDetail.email}
          onChange={(e) => handleUpdateDetail("email", e.target.value)}
          error={errMsg.email}
          helperText={errMsg.email}
          onKeyDown={(event: any) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <TextField
          size="medium"
          fullWidth
          type="password"
          placeholder="Enter password"
          className={Style.continueEmailTextField}
          value={userDetail.phoneNumber}
          onChange={(e) => handleUpdateDetail("phoneNumber", e.target.value)}
          error={errMsg.phoneNumber}
          helperText={errMsg.phoneNumber}
          onKeyDown={(event: any) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <LoadingButton
          className={Style.continueWithEmailButton}
          variant="contained"
          fullWidth
          size="small"
          onClick={handleSubmit}
          loading={Boolean(login?.isLoading)}
          loadingPosition="start"
        >
          Login
        </LoadingButton>
        <Box className={Style.loginLinkArea}>
          Not a member yet?{" "}
          <span onClick={() => handleUpdateView("register")}>Register Now</span>
        </Box>
      </Box>
    </Box>
  );
}
export default LoginUser;
