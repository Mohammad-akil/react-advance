import React, { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Styles from "../../styles/makeover/getInTouch.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ResponseAlert from "../../components/shared/alert";
import ReactGA from "react-ga4";
import { useAppDispatch } from "../../store/store";
import { agentContact } from "../../store/property-detail/agentContact";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
interface GetInTechProps {
  [key: string]: any;
}
function GetInTech(props: GetInTechProps) {
  let { open, setOpen } = props;
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState<Boolean>(false);
  const [contactDetail, setContactDetail] = useState<{
    [key: string]: any;
  }>({
    name: "",
    email: "",
    phone: "",
    message: "",
    street: "",
    city: "",
    state: "",
    code: "",
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
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );

  const contactForm = useSelector(
    (state: RootState) => state.propertyDetail.agentContact
  );

  useEffect(() => {
    if (isAuthenticated && authDetail?.firstName) {
      setContactDetail((detail: any) => ({
        ...detail,
        name: authDetail?.firstName + " " + authDetail?.lastName,
        email: authDetail?.email,
        phone: authDetail?.phoneNumber,
      }));
    }
  }, [isAuthenticated]);

  const handleClose = () => {
    setOpen(false);
    setContactDetail({
      name: "",
      email: "",
      phone: "",
      message: "",
      street: "",
      city: "",
      state: "",
      code: "",
    });
    setTimeout(() => {
      setIsSuccess(false);
    }, 500);
  };

  const handleUpdateDetail = (field: any, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    if (contactDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
  };

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!contactDetail.name) {
      isFormValid = false;
      errorMsg["name"] = "Please enter the  name";
      setErrorAlert({
        errorMsg: "Please enter the  name",
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
    setIsSuccess(true);
    setErrorAlert({
      errorMsg: "Your request is submitted successfully!",
      errorType: "success",
      isOpen: true,
    });
    setContactDetail({
      name: "",
      email: "",
      phone: "",
      message: "",
      street: "",
      city: "",
      state: "",
      code: "",
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
          firstName: contactDetail?.name?.split(" ")[0],
          lastName: contactDetail?.name?.split(" ")[1],
          email: contactDetail?.email,
          phone: contactDetail?.phone?.replaceAll(" ", ""),
          message: `${contactDetail?.message} \n\n\n Name: ${contactDetail?.name} \n Email: ${contactDetail?.email} \n Phone :${contactDetail?.phone} \n  URL: ${window.location.href}`,
          property: {
            street: contactDetail.street,
            city: contactDetail.city,
            state: contactDetail.state,
            code: contactDetail.code,
            url: `${window.location.href}`,
          },
        },
        handleSuccess,
        handleError,
      };
      dispatch(agentContact(obj));
      ReactGA.event({
        category: "Contact Form Submitted",
        action: "Contact Form Submitted",
        label: contactDetail?.firstName
          ? contactDetail?.firstName
          : "Contact Form Submitted",
      });
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: "Contact Form Submitted",
      });
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="get-in-touch-modal"
        aria-describedby="get-in-touch-modal-description"
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#FAFAFA !important",
          },
        }}
      >
        {" "}
        <Box className={Styles.closeButtonArea}>
          {!isSuccess ? (
            <IconButton
              onClick={handleClose}
              className={Styles.modalCloseButton}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          ) : null}{" "}
        </Box>
        <DialogContent
          sx={{ paddingTop: isSuccess ? "30px" : "0px", mb: "20px" }}
        >
          <Typography className={Styles.getInTouchHeading}>
            {isSuccess
              ? "Thank you for REACHING OUT"
              : "Does your home need a makeover?"}
          </Typography>
          <Typography className={Styles.getInTouchSubHeading}>
            {isSuccess
              ? "ONE OF OUR TEAM MEMBERS WILL BE IN TOUCH SHORTLY!"
              : "Fill out the form below to get in touch"}{" "}
          </Typography>
          {!isSuccess ? (
            <Box>
              <br /> <br />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InputLabel className={Styles.inputLabel}>
                    First & Last Name
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="John Smith"
                    fullWidth
                    size="small"
                    value={contactDetail.name}
                    onChange={(e) => handleUpdateDetail("name", e.target.value)}
                    error={errMsg.name}
                    helperText={errMsg.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel className={Styles.inputLabel}>
                    Phone Number
                  </InputLabel>
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
                      className={Styles.textField}
                      placeholder="J(123) 555-4567"
                      fullWidth
                      size="small"
                      value={contactDetail.phone}
                      onChange={(e) =>
                        handleUpdateDetail("phone", e.target.value)
                      }
                      error={errMsg.phone}
                      helperText={errMsg.phone}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel className={Styles.inputLabel}>
                    Email Address
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="john@mail.com"
                    fullWidth
                    size="small"
                    value={contactDetail.email}
                    onChange={(e) =>
                      handleUpdateDetail("email", e.target.value)
                    }
                    error={errMsg.email}
                    helperText={errMsg.email}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel className={Styles.inputLabel}>
                    Street Address <span>(optional)</span>
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="123 Main Street"
                    fullWidth
                    size="small"
                    value={contactDetail.street}
                    onChange={(e) =>
                      handleUpdateDetail("street", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <InputLabel className={Styles.inputLabel}>
                    City <span>(optional)</span>
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="Atlanta"
                    fullWidth
                    size="small"
                    value={contactDetail.city}
                    onChange={(e) => handleUpdateDetail("city", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <InputLabel className={Styles.inputLabel}>
                    State <span>(optional)</span>
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="GA"
                    fullWidth
                    size="small"
                    value={contactDetail.state}
                    onChange={(e) =>
                      handleUpdateDetail("state", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputLabel className={Styles.inputLabel}>
                    Zip Code <span>(optional)</span>
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="30350"
                    fullWidth
                    size="small"
                    value={contactDetail.code}
                    onChange={(e) => handleUpdateDetail("code", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel className={Styles.inputLabel}>
                    Additional Information/Comments <span>(optional)</span>
                  </InputLabel>
                  <TextField
                    className={Styles.textField}
                    placeholder="123 Main Street"
                    multiline
                    rows={4}
                    fullWidth
                    size="small"
                    value={contactDetail.message}
                    onChange={(e) =>
                      handleUpdateDetail("message", e.target.value)
                    }
                    error={errMsg.message}
                    helperText={errMsg.message}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : null}
          {!isSuccess ? (
            <Box className={Styles.submitArea}>
              <LoadingButton
                variant="contained"
                className={Styles.submitButton}
                onClick={handleSubmit}
                loading={Boolean(contactForm?.isLoading)}
                loadingPosition="start"
              >
                Submit Form
              </LoadingButton>
            </Box>
          ) : (
            <Box className={Styles.submitArea}>
              <Button
                variant="contained"
                className={Styles.submitButton}
                onClick={() => handleClose()}
              >
                BACK TO SITE
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Fragment>
  );
}
export default GetInTech;
