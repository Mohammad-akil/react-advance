"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle, Typography, IconButton, Chip, Box } from "@mui/material";
import Style from "../../styles/registration/register.module.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import googleIcon from "../../assests/images/googleIcon.svg";
import Image from "next/image";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import RegisterUser from "./register";
import LoginUser from "./login";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import {
  handleUpdateAuthPreview,
  userGmailLogin,
  userFacebookLogin,
} from "../../store/auth";
import AppleIcon from "@mui/icons-material/Apple";
import { getDismissCount, setDismissCount } from "../../utils/visitorCookies";
import { usePathname, useRouter } from "next/navigation";
import AlternativeRegistration from "./alternativeRegistration";
export default function Registration() {
  const [socialButtonsPreview, setSocialButtonsPreview] = useState(true);
  const [forceLogin, setForceLogin] = useState(false);
  const [userDetail, setUserDetail] = useState<{
    [key: string]: any;
  }>({
    email: "",
    phoneNumber: "",
  });
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { open, previewType, isOpenedManually } = useSelector(
    (state: RootState) => state.auth.modal
  );

  const handleClose = () => {
    setSocialButtonsPreview(true);
    if (
      (localStorage.dis && Number(localStorage.dis || 0) > getDismissCount()) ||
      Number(localStorage.dis || 1) == 0
    ) {
      dispatch(
        handleUpdateAuthPreview({ open: false, isOpenedManually: false })
      );
      if (previewType === "register") {
        setDismissCount();
      }
      setUserDetail({ email: "", phoneNumber: "" });
    } else if (
      (getDismissCount() <
        Number(
          process.env.NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT
        ) ||
        previewType === "login" ||
        isOpenedManually ||
        process.env.NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT ===
          "0" ||
        Number(localStorage.dis || 0) == 0) &&
      !localStorage.dis
    ) {
      dispatch(
        handleUpdateAuthPreview({ open: false, isOpenedManually: false })
      );
      if (previewType === "register") {
        setDismissCount();
      }
      setUserDetail({ email: "", phoneNumber: "" });
    }
  };
  const handleCloseOnSuccess = () => {
    dispatch(handleUpdateAuthPreview({ open: false, isOpenedManually: false }));
    setSocialButtonsPreview(true);
    if (previewType === "register") {
      setDismissCount();
    }
  };

  useEffect(() => {
    if (open) {
      dispatch(
        handleUpdateAuthPreview({ open: false, isOpenedManually: false })
      );
    }
  }, [pathname]);

  const handleGoogleLogin = () => {
    localStorage.setItem("authPreview", previewType);
    dispatch(userGmailLogin({}));
  };

  const handleFaceBookLogin = () => {
    window.location.href = `${
      process.env.NEXT_PUBLIC_APP_BASE_URL
    }api/v1/leads/facebook-signin/${
      process.env.NEXT_PUBLIC_SITE_ID
    }?redirect_uri=${window.location.href?.split("?")[0]}`;
    // dispatch(userFacebookLogin({}))
  };
  const handleCheckAlt = () => {
    // (process.env.NEXT_PUBLIC_RP === "2" && localStorage.rp==="2") && !isOpenedManually
    if (
      localStorage.rp === "2" &&
      !isOpenedManually &&
      !forceLogin &&
      previewType === "register"
    ) {
      return true;
    } else if (
      localStorage.rp === "1" &&
      !isOpenedManually &&
      !forceLogin &&
      previewType === "register"
    ) {
      return false;
    } else if (
      process.env.NEXT_PUBLIC_RP === "2" &&
      !isOpenedManually &&
      !forceLogin &&
      previewType === "register"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleUpdateView = (type: any) => {
    dispatch(handleUpdateAuthPreview({ previewType: type, isOpenedManually }));
    if (handleCheckAlt()) {
      setForceLogin((flg) => !flg);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-container": {
          zIndex: "999999999999999",
          "@media (min-width: 575px)": { margin: "0px -24px" },
          "@media (max-width: 575px)": {
            margin: "-24px -24px",
            alignItems: "flex-start",
          },
          "@media (min-width: 1800px)": {
            alignItems: "flex-start",
            mt: "160px !important",
          },
        },
        "& .MuiDialog-paper": {
          maxHeight: "100% !important",
          zIndex: "999999999999999",
          animation: "3s ease-in-out",
        },
      }}
    >
      {handleCheckAlt() ? (
        <AlternativeRegistration
          getDismissCount={getDismissCount}
          handleClose={handleClose}
          handleUpdateView={handleUpdateView}
          setSocialButtonsPreview={setSocialButtonsPreview}
          handleCloseOnSuccess={handleCloseOnSuccess}
          setUpdateEmail={setUserDetail}
          socialButtonsPreview={socialButtonsPreview}
        />
      ) : (
        <Box>
          <DialogTitle sx={{ position: "relative" }}>
            <Typography className={Style.modalHeading}>
              {" "}
              {previewType === "register" ? (
                <>
                  Continue Your{" "}
                  <span className={Style.modalHeadingSp}>Home</span> Search
                </>
              ) : (
                "Returning User Login"
              )}
            </Typography>
            {(localStorage.dis &&
              Number(localStorage.dis || 0) > getDismissCount()) ||
            Number(localStorage.dis || 1) == 0 ? (
              <IconButton
                onClick={handleClose}
                className={Style.modalCloseButton}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            ) : (getDismissCount() <
                Number(
                  process.env
                    .NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT
                ) ||
                isOpenedManually ||
                process.env
                  .NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT ===
                  "0" ||
                Number(localStorage.dis || 0) == 0) &&
              !localStorage.dis ? (
              <IconButton
                onClick={handleClose}
                className={Style.modalCloseButton}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            ) : null}
          </DialogTitle>
          {socialButtonsPreview &&
          (process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE !== "false" ||
            process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK !== "false" ||
            process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE !== "false") ? (
            <DialogContent sx={{ overflowY: "visible" }}>
              <Box className={Style.socialLoginButtonsArea}>
                <Box className={Style.socialLoginButtons}>
                  {process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE !== "false" ? (
                    <Button
                      fullWidth
                      variant="contained"
                      className={Style.signInWithGoogle}
                      size="small"
                      startIcon={
                        <Box className={Style.signInWithGoogleIconOuterBox}>
                          <Box className={Style.signInWithGoogleIcon}>
                            <Image fill alt="Google Icon" src={googleIcon} />
                          </Box>
                        </Box>
                      }
                      onClick={handleGoogleLogin}
                    >
                      Sign in with Google
                    </Button>
                  ) : null}
                  {process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE !== "false" ? (
                    <Button
                      fullWidth
                      variant="contained"
                      className={Style.signInWithFaceApple}
                      size="small"
                      startIcon={
                        <AppleIcon
                          sx={{ fontSize: "30px !important", ml: "6px" }}
                          className={Style.signInWithFaceBookIcon}
                        />
                      }
                    >
                      Continue with Apple
                    </Button>
                  ) : null}
                  {process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK !== "false" ? (
                    <Button
                      fullWidth
                      variant="outlined"
                      className={Style.signInWithFaceBook}
                      size="small"
                      startIcon={
                        <FacebookRoundedIcon
                          sx={{ fontSize: "30px !important", ml: "6px" }}
                          className={Style.signInWithFaceBookIcon}
                        />
                      }
                      onClick={handleFaceBookLogin}
                    >
                      Continue with Facebook
                    </Button>
                  ) : null}
                </Box>
              </Box>
            </DialogContent>
          ) : null}

          <Box className={Style.customModalDivider}></Box>
          <Box className={Style.customModalDividerChipArea}>
            {" "}
            {socialButtonsPreview &&
            (process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE !== "false" ||
              process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK !== "false" ||
              process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE !== "false") ? (
              <Chip className={Style.customModalDividerChip} label="or" />
            ) : null}
          </Box>
          <DialogContent
            sx={{ bgcolor: "#f9f9f9", paddingTop: "0px", overflowY: "visible" }}
          >
            {previewType === "register" ? (
              <RegisterUser
                setSocialButtonsPreview={setSocialButtonsPreview}
                handleUpdateView={handleUpdateView}
                handleClose={handleClose}
                handleCloseOnSuccess={handleCloseOnSuccess}
                socialButtonsPreview={socialButtonsPreview}
                setUpdateEmail={setUserDetail}
              />
            ) : (
              <LoginUser
                handleUpdateView={handleUpdateView}
                handleClose={handleClose}
                handleCloseOnSuccess={handleCloseOnSuccess}
                userDetail={userDetail}
                setUserDetail={setUserDetail}
              />
            )}
            <Typography
              sx={{ mt: "15px" }}
              className={Style.privacyDescription}
            >
              This site is protected by reCAPTCHA and the Google{" "}
              <span onClick={() => router.push("/privacy-policy")}>
                Privacy Policy
              </span>{" "}
              and
              <span> Terms of Service</span> apply.
            </Typography>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
}
