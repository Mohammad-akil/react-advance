import React, { useState } from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import Style from "../../styles/sell.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
import ResponseAlert from "../../components/shared/alert";
import { agentContact } from "../../store/property-detail/agentContact";
import ReactGA from "react-ga4";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function ContactSection() {
  const dispatch = useAppDispatch();
  const [contactDetail, setContactDetail] = useState<{
    [key: string]: any;
  }>({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
  });
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});
  const contactForm = useSelector(
    (state: RootState) => state.propertyDetail.agentContact
  );
  const handleUpdateDetail = (field: any, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    if (contactDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
  };

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!contactDetail.fullName) {
      isFormValid = false;
      errorMsg["fullName"] = "Please enter the full name";
      setErrorAlert({
        errorMsg: "Please enter the full name",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.email) {
      isFormValid = false;
      errorMsg["email"] = "Please enter the email";
      setErrorAlert({
        errorMsg: "Please enter the email",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.postalCode) {
      isFormValid = false;
      errorMsg["postalCode"] = "Please enter the postal code";
      setErrorAlert({
        errorMsg: "Please enter the postal code",
        errorType: "warning",
        isOpen: true,
      });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactDetail.email)
    ) {
      isFormValid = false;
      errorMsg["email"] = "Please enter the valid email address";
      setErrorAlert({
        errorMsg: "Please enter the valid email address",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.phone) {
      isFormValid = false;
      errorMsg["phone"] = "Please enter the phone";
      setErrorAlert({
        errorMsg: "Please enter the phone",
        errorType: "warning",
        isOpen: true,
      });
    } else if (
      contactDetail.phone &&
      contactDetail.phone?.replaceAll("-", "")?.length !== 10 &&
      process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE === "false"
    ) {
      isFormValid = false;
      errorMsg["phone"] = "Please enter the valid phone number";
      setErrorAlert({
        errorMsg: "Please enter the valid phone number like 123-456-7890",
        errorType: "warning",
        isOpen: true,
      });
    }
    setErrMsg(errorMsg);
    return isFormValid;
  };

  const handleSuccess = () => {
    setErrorAlert({
      errorMsg: "Your request is submitted successfully!",
      errorType: "success",
      isOpen: true,
    });
    setContactDetail({
      fullName: "",
      postalCode: "",
      email: "",
      phone: "",
    });
  };

  const handleError = (error: any) => {
    setErrorAlert({
      errorMsg: JSON.stringify(error),
      errorType: "error",
      isOpen: true,
    });
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      let obj = {
        schema: {
          firstName: contactDetail?.fullName?.split(" ")[0],
          lastName: contactDetail?.fullName?.split(" ")?.slice(1)?.join(""),
          email: contactDetail?.email,
          phone: contactDetail?.phone.replaceAll("-", ""),
          message: `Name: ${contactDetail?.fullName} \n Email: ${contactDetail?.email} \n Phone :${contactDetail?.phone} \n  URL: ${window.location.href}. description: lead submitted a sell your home request  `,
        },
        handleSuccess,
        handleError,
      };
      dispatch(agentContact(obj));
      ReactGA.event({
        category: "Contact Request form submitted",
        action: "Contact Request form submitted",
        label: contactDetail?.firstName
          ? contactDetail?.firstName
          : "Contact Request form submitted",
      });
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: "Contact Request form submitted",
      });
    }
  };

  return (
    <>
      <Box className={Style.contactSection}>
        <Box className={Style.contactArea}>
          <Typography className={Style.contactHeading}>
            Get Connected with a Local Advisor
          </Typography>
          <Box className={Style.descriptionSection}>
            <Typography className={Style.contactDesc}>
              We’ll match you with a Method agent who knows your market best.
              Fill out the form below to get started.
            </Typography>
          </Box>
          <Box className={Style.contactForm}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Full Name"
                  value={contactDetail.fullName}
                  onChange={(e) =>
                    handleUpdateDetail("fullName", e.target.value)
                  }
                  error={errMsg.fullName}
                  helperText={errMsg.fullName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Email"
                  value={contactDetail.email}
                  onChange={(e) => handleUpdateDetail("email", e.target.value)}
                  error={errMsg.email}
                  helperText={errMsg.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="ZIP code"
                  value={contactDetail.postalCode}
                  onChange={(e) =>
                    handleUpdateDetail("postalCode", e.target.value)
                  }
                  error={errMsg.postalCode}
                  helperText={errMsg.postalCode}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE ===
                "true" ? (
                  <PhoneInput
                    country={"us"}
                    value={contactDetail.phone}
                    onChange={(phone, country, e, formattedValue) =>
                      handleUpdateDetail("phone", formattedValue)
                    }
                    masks={{ us: "...-...-...." }}
                    enableSearch={true}
                  />
                ) : (
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Phone Number"
                    value={contactDetail.phone}
                    onChange={(e) =>
                      handleUpdateDetail("phone", e.target.value)
                    }
                    error={errMsg.phone}
                    helperText={errMsg.phone}
                  />
                )}
              </Grid>
            </Grid>
            <Box className={Style.buttonSection}>
              <LoadingButton
                className={Style.submitButton}
                color="inherit"
                variant="contained"
                onClick={handleSubmit}
                loading={Boolean(contactForm?.isLoading)}
                loadingPosition="start"
              >
                Submit
              </LoadingButton>
            </Box>
            <Typography className={Style.contactBottomContent}>
              By submitting this form you agree that Method, its affiliates or
              associated third parties may contact you, including with calls or
              texts by automated means. Consent is not a condition to access
              real estate services.
            </Typography>
          </Box>
        </Box>
      </Box>{" "}
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </>
  );
}

export default ContactSection;
