import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputLabel,
  Button,
} from "@mui/material";
import Styles from "../../../styles/listing1/contact.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { agentContact } from "../../../store/property-detail/agentContact";
import { useAppDispatch } from "../../../store/store";
import ResponseAlert from "../../../components/shared/alert";
import ReactGA from "react-ga4";

interface contactProps {
  [key: string]: any;
}
function ContactSection(props: contactProps) {
  const [contactDetail, setContactDetail] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const dispatch = useAppDispatch();
  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const contactForm = useSelector(
    (state: RootState) => state.listingDetail.contactUs
  );
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );

  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && authDetail?.firstName) {
      setContactDetail((detail: any) => ({
        ...detail,
        firstName: authDetail?.firstName,
        lastName: authDetail?.lastName,
        email: authDetail?.email,
        phone: authDetail?.phoneNumber,
      }));
    }
  }, [isAuthenticated]);

  const handleUpdateDetail = (field: string, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    setErrMsg({});
  };
  const handleValidate = () => {
    let isFormValid: any = true;
    let errorMsg: any = {};
    if (!contactDetail.firstName) {
      isFormValid = false;
      errorMsg["firstName"] = "Please enter your first name";
      setErrorAlert({
        errorMsg: "Please enter your first name",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.lastName) {
      isFormValid = false;
      errorMsg["lastName"] = "Please enter your last name";
      setErrorAlert({
        errorMsg: "Please enter your last name",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.email) {
      isFormValid = false;
      errorMsg["email"] = "Please enter your email address";
      setErrorAlert({
        errorMsg: "Please enter your email address",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.phone) {
      isFormValid = false;
      errorMsg["phone"] = "Please enter your phone number";
      setErrorAlert({
        errorMsg: "Please enter your phone number",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.message) {
      isFormValid = false;
      errorMsg["message"] = "Please enter your message";
      setErrorAlert({
        errorMsg: "Please enter your phone number",
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
      name: "",
      email: "",
      phone: "",
      message: "",
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
    if (handleValidate() && !contactForm.isLoading) {
      let obj: any = {
        schema: {
          ...contactDetail,
          phone: contactDetail?.phone.replaceAll("-", ""),
          property: {
            type: listDetail?.data?.PropertySubType,
            street: listDetail?.data?.transaction_listings_v2?.street,
            city: listDetail?.data?.transaction_listings_v2?.city,
            state: listDetail?.data?.transaction_listings_v2?.state,
            code: `${listDetail?.data?.transaction_listings_v2?.zipcode}`,
            mlsNumber: `${listDetail?.data?.ListingId}`,
            price: listDetail?.data?.ListPrice || listDetail?.data?.LeasePrice,
            forRent: false,
            url: `${window.location.href}`,
            bedrooms: listDetail?.data?.BedroomsTotal,
            bathrooms: listDetail?.data?.BathroomsFull,
            area: listDetail?.data?.BuildingAreaTotal.toString(),
          },
        },
        agent_id:
          listDetail?.data?.transaction_listings_v2?.agent_id ||
          listDetail?.data?.transaction_listings_v2?.agent?.id,
        handleError,
        handleSuccess,
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
    <Box id="listing-01-contact-section" className={Styles.contactSection}>
      <Box className={Styles.contactSectionOuter}>
        <Box className={Styles.contactSectionInner}>
          <Typography className={Styles.sectionTitle}>Get in touch</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <InputLabel className={Styles.fieldLabel}>
                First Name *
              </InputLabel>
              <TextField
                fullWidth
                variant="standard"
                onChange={(e: any) =>
                  handleUpdateDetail("firstName", e.target.value)
                }
                className={Styles.contactFormField}
                value={contactDetail?.firstName}
                error={errMsg.firstName}
                helperText={errMsg.firstName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#666 !important",
                    "& fieldset": {
                      borderRadius: "0px",
                      fontFamily: "AvenirNextLTPro-Regular",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel className={Styles.fieldLabel}>Last Name *</InputLabel>
              <TextField
                fullWidth
                variant="standard"
                onChange={(e: any) =>
                  handleUpdateDetail("lastName", e.target.value)
                }
                className={Styles.contactFormField}
                value={contactDetail?.lastName}
                error={errMsg.lastName}
                helperText={errMsg.lastName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#666 !important",
                    "& fieldset": {
                      borderRadius: "0px",
                      fontFamily: "AvenirNextLTPro-Regular",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={Styles.fieldLabel}>Email *</InputLabel>
              <TextField
                fullWidth
                type="email"
                variant="standard"
                onChange={(e: any) =>
                  handleUpdateDetail("email", e.target.value)
                }
                className={Styles.contactFormField}
                value={contactDetail?.email}
                error={errMsg.email}
                helperText={errMsg.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#666 !important",
                    "& fieldset": {
                      borderRadius: "0px",
                      fontFamily: "AvenirNextLTPro-Regular",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={Styles.fieldLabel}>Phone *</InputLabel>
              <TextField
                fullWidth
                variant="standard"
                onChange={(e: any) =>
                  handleUpdateDetail("phone", e.target.value)
                }
                className={Styles.contactFormField}
                value={contactDetail?.phone}
                error={errMsg.phone}
                helperText={errMsg.phone}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#666 !important",
                    "& fieldset": {
                      borderRadius: "0px",
                      fontFamily: "AvenirNextLTPro-Regular",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className={Styles.fieldLabel}>Comment *</InputLabel>
              <TextField
                fullWidth
                variant="standard"
                onChange={(e: any) =>
                  handleUpdateDetail("message", e.target.value)
                }
                multiline
                rows={4}
                className={Styles.contactFormField}
                value={contactDetail?.message}
                error={errMsg.message}
                helperText={errMsg.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#666 !important",
                    "& fieldset": {
                      borderRadius: "0px",
                      fontFamily: "AvenirNextLTPro-Regular",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                className={Styles.submitButton}
                size="large"
                variant="outlined"
                color="inherit"
                onClick={() => handleSubmit()}
                loading={Boolean(contactForm?.isLoading)}
                loadingPosition="start"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={Styles.cut}></Box>
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Box>
  );
}
export default ContactSection;
