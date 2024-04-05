import React, { useState } from "react";
import {
  Box,
  Typography,
  DialogTitle,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import Style from "../../../styles/registration/altRegister.module.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { openAlert } from "../../../store/notification";
import { useAppDispatch } from "../../../store/store";
import { checkDuplicateEmail, userSignUp } from "../../../store/auth";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import LoadingButton from "@mui/lab/LoadingButton";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";
import AppleIcon from "@mui/icons-material/Apple";
import Image from "next/image";
import { saveUTMToLocalStorage } from "../../../utils/utm";
import googleIcon from "../../../assests/images/googleIcon.svg";
import {
  handleUpdateAuthPreview,
  userGmailLogin,
  userFacebookLogin,
} from "../../../store/auth";

function AlternativeRegistration(props: any) {
  let {
    getDismissCount,
    handleClose,
    handleUpdateView,
    setSocialButtonsPreview,
    handleCloseOnSuccess,
    setUpdateEmail,
    socialButtonsPreview,
  } = props;
  const [isReadMore, setIsReadMore] = useState<Boolean>(false);
  const [userDetail, setUserDetail] = useState<{
    [key: string]: any;
  }>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { open, previewType, isOpenedManually } = useSelector(
    (state: RootState) => state.auth.modal
  );

  const duplicateEmailChecking = useSelector(
    (state: RootState) => state.auth.duplicateEmailChecking
  );
  const signup = useSelector((state: RootState) => state.auth.signup);

  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});

  const handleUpdateDetail = (field: any, value: any) => {
    setUserDetail({ ...userDetail, [field]: value });
    if (errMsg[field]) {
      setErrMsg((error: any) => ({ ...error, [field]: null }));
    }
  };

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!userDetail.firstName) {
      isFormValid = false;
      errorMsg["firstName"] = "Please enter the first name";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the first name",
          open: true,
        })
      );
    } else if (!userDetail.lastName) {
      isFormValid = false;
      errorMsg["lastName"] = "Please enter the last name";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the last name",
          open: true,
        })
      );
    } else if (!userDetail.email) {
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
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetail.email)
    ) {
      isFormValid = false;
      errorMsg["email"] = "Please enter a valid email address";
    } else if (!userDetail.phoneNumber) {
      isFormValid = false;
      errorMsg["phoneNumber"] = "Please enter the phoneNumber";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the phone Number",
          open: true,
        })
      );
    }
    setErrMsg(errorMsg);
    return isFormValid;
  };

  const handleSuccess = () => {
    dispatch(
      userSignUp({
        schema: {
          ...userDetail,
          phoneNumber: userDetail?.phoneNumber?.replaceAll(" ", ""),
        },
        utm: saveUTMToLocalStorage(),
        handleSuccessSignUp,
        handleError,
      })
    );
    localStorage.removeItem("utm");
    ReactGA.event({
      category: "Signup Form Submitted",
      action: "Signup Form Submitted",
      label: "Signup Form Submitted",
    });
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Signup Form Submitted",
    });
  };

  const handleSuccessSignUp = () => {
    setSocialButtonsPreview(false);
    dispatch(
      openAlert({
        type: "success",
        message: "You have successfully registered and logged in!",
        open: true,
      })
    );
    setUserDetail({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
    handleCloseOnSuccess(true);
  };

  const handleError = (error: any) => {
    if (error === "Aleardy Exist Please Login") {
      setUpdateEmail((data: any) => ({ ...data, email: userDetail?.email }));
      handleUpdateView("login");
      setSocialButtonsPreview(true);
    }
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
        checkDuplicateEmail({
          schema: {
            email: userDetail?.email,
          },
          handleSuccess,
          handleError,
        })
      );
    }
  };
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
  
  return (
    <Box>
      <DialogTitle sx={{ position: "relative" }}>
        <Typography className={Style.modalHeading}>Free Access</Typography>
        {(localStorage.dis &&
          Number(localStorage.dis || 0) > getDismissCount()) ||
        Number(localStorage.dis || 1) == 0 ? (
          <IconButton onClick={handleClose} className={Style.modalCloseButton}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        ) : (getDismissCount() <
            Number(
              process.env.NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT
            ) ||
            isOpenedManually ||
            process.env.NEXT_PUBLIC_POPUP_DISPLAY_BEFORE_CLOSE_HIDDEN_COUNT ===
              "0" ||
            Number(localStorage.dis || 0) == 0) &&
          !localStorage.dis ? (
          <IconButton onClick={handleClose} className={Style.modalCloseButton}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Typography className={Style.altDescription}>
        Access full property details and exclusive listings.
      </Typography>
      <Box className={Style.altModalRoot}>
        {process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE !== "false" ||
        process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK !== "false" ||
        process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE !== "false" ? (
          <Box className={Style.socialMediaSection}>
            {process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK !== "false" ? (
              <Button
                variant="contained"
                startIcon={<FacebookRoundedIcon />}
                fullWidth
                size="large"
                className={Style.facebookButton}
                onClick={handleFaceBookLogin}
              >
                Continue with Facebook
              </Button>
            ) : null}
            {process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE !== "false" ? (
              <Button
                variant="contained"
                startIcon={
                  <Box className={Style.signInWithGoogleIconOuterBox}>
                    <Box className={Style.signInWithGoogleIcon}>
                      <Image fill alt="Google Icon" src={googleIcon} />
                    </Box>
                  </Box>
                }
                fullWidth
                size="large"
                className={Style.signInWithGoogle}
                onClick={handleGoogleLogin}
              >
                Sign in with Google
              </Button>
            ) : null}
            {process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE !== "false" ? (
              <Button
                variant="contained"
                startIcon={
                  <AppleIcon
                    sx={{ fontSize: "30px !important" }}
                    className={Style.signInWithFaceBookIcon}
                  />
                }
                fullWidth
                size="large"
                className={Style.signInWithFaceApple}
              >
                Continue with Apple
              </Button>
            ) : null}
          </Box>
        ) : null}
        <Box className={Style.fieldsSection}>
          <TextField
            size="small"
            placeholder="*First Name"
            value={userDetail.firstName}
            onChange={(e) => handleUpdateDetail("firstName", e.target.value)}
            error={errMsg.firstName}
            helperText={errMsg.firstName}
          />
          <TextField
            size="small"
            placeholder="*Last Name"
            value={userDetail.lastName}
            onChange={(e) => handleUpdateDetail("lastName", e.target.value)}
            error={errMsg.lastName}
            helperText={errMsg.lastName}
          />
          <TextField
            size="small"
            placeholder="*Email"
            value={userDetail.email}
            onChange={(e) => handleUpdateDetail("email", e.target.value)}
            error={errMsg.email}
            helperText={errMsg.email}
          />
          {process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE === "true" ? (
            <PhoneInput
              country={"us"}
              value={userDetail.phoneNumber}
              onChange={(phone, country, e, formattedValue) =>
                handleUpdateDetail("phoneNumber", formattedValue)
              }
              masks={{ us: "...-...-...." }}
              enableSearch={true}
              countryCodeEditable={false}
            />
          ) : (
            <TextField
              placeholder="*Phone Number (Used as Password)"
              variant="outlined"
              fullWidth
              size="small"
              value={userDetail.phoneNumber}
              onChange={(e) =>
                handleUpdateDetail("phoneNumber", e.target.value)
              }
              error={errMsg.phoneNumber}
              helperText={errMsg.phoneNumber}
            />
          )}
        </Box>
        <Box className={Style.submitArea}>
          <LoadingButton
            loading={Boolean(
              duplicateEmailChecking?.isLoading || signup?.isLoading
            )}
            loadingPosition="end"
            className={Style.submitButton}
            variant="text"
            color="inherit"
            onClick={handleSubmit}
          >
            Continue to Photos &gt;
          </LoadingButton>
          <Box className={Style.loginLinkArea}>
            <span
              onClick={() => {
                handleUpdateView("login");
                setSocialButtonsPreview(true);
              }}
            >
              Already have an account?
            </span>
          </Box>
        </Box>
        <Typography
          sx={{ mt: "15px", mb: "10px" }}
          className={Style.privacyDescription}
        >
          This site is protected by reCAPTCHA and the Google{" "}
          <span onClick={() => router.push("/privacy-policy")}>
            Privacy Policy
          </span>{" "}
          and
          <span> Terms of Service</span> apply.
        </Typography>
        {isReadMore ? (
          <Typography className={Style.privacyDescription}>
            By proceeding, you expressly consent to receive texts at the number
            you provided, including marketing, from{" "}
            {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
            related matters, but not as a condition of purchase. Message
            frequency varies. You can text Help for help and Stop to cancel. You
            also agree to our Terms of Service and to our{" "}
            <span onClick={() => router.push("/privacy-policy")}>
              Privacy Policy
            </span>{" "}
            regarding the information relating to you. Message and data rates
            may apply.
            <br />
            Additionally, you expressly consent to receiving calls at the number
            you provided, including marketing by auto-dialer, pre-recorded or
            artificial voice, and email, from{" "}
            {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
            related matters, but not as a condition of purchase. This consent
            applies even if you are on a corporate, state or national Do Not
            Call list. <span onClick={() => setIsReadMore(false)}>Less</span>
          </Typography>
        ) : (
          <Typography className={Style.privacyDescription}>
            By proceeding, you expressly consent to receive texts at the number
            you provided, including marketing, from{" "}
            {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
            related matters, but not as a condition of purchase. Message
            frequency varies. You can text Help for help{" "}
            <span onClick={() => setIsReadMore(true)}>More...</span>
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AlternativeRegistration;
