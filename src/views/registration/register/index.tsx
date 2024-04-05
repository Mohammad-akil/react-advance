import React, { Fragment, useState, useEffect } from "react";
import { Box, TextField, Typography, Grid, InputLabel } from "@mui/material";
import Style from "../../../styles/registration/register.module.css";
import { checkDuplicateEmail, userSignUp } from "../../../store/auth";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { openAlert } from "../../../store/notification";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";
import { saveUTMToLocalStorage } from "../../../utils/utm";
import { useRouter } from "next/navigation";
import axios from "axios";
const API_KEY = "fOJZy6qSme5oA404J4MCE";
const API_URL = "https://apps.emaillistverify.com";
interface registerProps {
  handleUpdateView?: any;
  handleSuccessSignIn?: any;
  [key: string]: any;
}
function RegisterUser(props: registerProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isReadMore, setIsReadMore] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<{
    [key: string]: any;
  }>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});

  let {
    handleUpdateView,
    setSocialButtonsPreview,
    handleCloseOnSuccess,
    socialButtonsPreview,
    setUpdateEmail,
  } = props;

  const duplicateEmailChecking = useSelector(
    (state: RootState) => state.auth.duplicateEmailChecking
  );
  const signup = useSelector((state: RootState) => state.auth.signup);

  const handleUpdateDetail = (field: any, value: any) => {
    setUserDetail({ ...userDetail, [field]: value });
  };
  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!userDetail.email && step == 0) {
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
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetail.email) &&
      step == 0
    ) {
      isFormValid = false;
      errorMsg["email"] = "Please enter a valid email address";
    } else if (!userDetail.firstName && step == 1) {
      isFormValid = false;
      errorMsg["firstName"] = "Please enter the first name";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the first name",
          open: true,
        })
      );
    } else if (!userDetail.lastName && step == 1) {
      isFormValid = false;
      errorMsg["lastName"] = "Please enter the last name";
      dispatch(
        openAlert({
          type: "warning",
          message: "Please enter the last name",
          open: true,
        })
      );
    } else if (!userDetail.phoneNumber && step == 1) {
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
    setSocialButtonsPreview(false);
    setStep(1);
  };

  const handleSuccessSignUp = () => {
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
  const validateEmail = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/verifyEmail?secret=${
          process.env.NEXT_PUBLIC_EMAIL_VERIFY_API_KEY || API_KEY
        }&email=${userDetail.email}`,
        {
          timeout: 3000,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.data === "ok" || response.data === "error_credit") {
        dispatch(
          checkDuplicateEmail({
            schema: {
              email: userDetail?.email,
            },
            handleSuccess,
            handleError,
          })
        );
      } else {
        setErrMsg({ email: "Please enter a valid email address" });
      }
      setLoading(false);
    } catch (error: any) {
      if (error.message === "timeout of 3000ms exceeded") {
        dispatch(
          checkDuplicateEmail({
            schema: {
              email: userDetail?.email,
            },
            handleSuccess,
            handleError,
          })
        );
        console.log("Email validation timed out:", error.message);
      }
      setLoading(false);
      console.log("Email validation error:", error.message);
    }
  };
  const handleSubmit = () => {
    if (handleValidate()) {
      if (step == 0) {
        dispatch(
          checkDuplicateEmail({
            schema: {
              email: userDetail?.email,
            },
            handleSuccess,
            handleError,
          })
        );
        // validateEmail();
        // setLoading(true);
      } else {
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
      }
    }
  };

  useEffect(() => {
    if (step == 1 && socialButtonsPreview) {
      setSocialButtonsPreview(false);
    }
    if (step == 0 && !socialButtonsPreview) {
      setSocialButtonsPreview(true);
    }
  }, [step]);

  useEffect(() => {
    ReactGA.event({
      category: "Signup Form Displayed",
      action: "Signup Form Displayed",
      label: "Signup Form Displayed",
    });
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Signup Form Displayed",
    });
  }, []);

  return (
    <Fragment>
      <Box className={Style.continueWithEmailArea}>
        <Box
          className={step == 1 ? Style.signUpAreaWider : Style.signUpAreaNarrow}
        >
          {step == 0 ? (
            <TextField
              size="medium"
              fullWidth
              placeholder="E-mail"
              className={Style.continueEmailTextField}
              type="email"
              value={userDetail.email}
              onChange={(e) => handleUpdateDetail("email", e.target.value)}
              error={errMsg.email}
              helperText={errMsg.email}
            />
          ) : null}
          {step == 1 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                {" "}
                <InputLabel className={Style.customLabel}>
                  First Name
                </InputLabel>
                <TextField
                  className={Style.contactFormField}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userDetail.firstName}
                  onChange={(e) =>
                    handleUpdateDetail("firstName", e.target.value)
                  }
                  error={errMsg.firstName}
                  helperText={errMsg.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <InputLabel className={Style.customLabel}>Last Name</InputLabel>
                <TextField
                  className={Style.contactFormField}
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userDetail.lastName}
                  onChange={(e) =>
                    handleUpdateDetail("lastName", e.target.value)
                  }
                  error={errMsg.lastName}
                  helperText={errMsg.lastName}
                />
              </Grid>
              <Grid item xs={12} className={Style.contactFormFieldArea}>
                <InputLabel className={Style.customLabel}>
                  Phone (This will be used as your password)
                </InputLabel>
                {process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE ===
                "true" ? (
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
                    className={Style.contactFormField}
                    placeholder="Phone"
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
              </Grid>
            </Grid>
          ) : null}
          <Box className={Style.continueWithEmailButtonArea}>
            <LoadingButton
              className={Style.continueWithEmailButton}
              variant="contained"
              fullWidth
              size="small"
              onClick={handleSubmit}
              sx={{ width: step == 1 ? "50% !important" : "100%" }}
              loading={Boolean(
                duplicateEmailChecking?.isLoading ||
                  signup?.isLoading ||
                  loading
              )}
              loadingPosition="start"
            >
              {step == 1 ? "Submit" : "Continue With Email"}
            </LoadingButton>
          </Box>
          <Box className={Style.loginLinkArea}>
            Returning User{" "}
            <span
              onClick={() => {
                handleUpdateView("login");
                setSocialButtonsPreview(true);
              }}
            >
              Login here
            </span>
          </Box>
        </Box>
      </Box>
      {/* Term and conditions links need to add yet here */}
      {isReadMore ? (
        <Typography className={Style.privacyDescription}>
          By proceeding, you expressly consent to receive texts at the number
          you provided, including marketing, from{" "}
          {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate related
          matters, but not as a condition of purchase. Message frequency varies.
          You can text Help for help and Stop to cancel. You also agree to our
          Terms of Service and to our{" "}
          <span onClick={() => router.push("/privacy-policy")}>
            Privacy Policy
          </span>{" "}
          regarding the information relating to you. Message and data rates may
          apply.
          <br />
          Additionally, you expressly consent to receiving calls at the number
          you provided, including marketing by auto-dialer, pre-recorded or
          artificial voice, and email, from{" "}
          {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate related
          matters, but not as a condition of purchase. This consent applies even
          if you are on a corporate, state or national Do Not Call list.{" "}
          <span onClick={() => setIsReadMore(false)}>Less</span>
        </Typography>
      ) : (
        <Typography className={Style.privacyDescription}>
          By proceeding, you expressly consent to receive texts at the number
          you provided, including marketing, from{" "}
          {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate related
          matters, but not as a condition of purchase. Message frequency varies.
          You can text Help for help{" "}
          <span onClick={() => setIsReadMore(true)}>More...</span>
        </Typography>
      )}
    </Fragment>
  );
}
export default RegisterUser;
