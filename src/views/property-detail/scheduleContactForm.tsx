import React, { Fragment, useState, useEffect } from "react";
import Styles from "../../styles/property-detail/scheduleTour.module.css";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputLabel,
  Grid,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { agentContact } from "../../store/property-detail/agentContact";
import { handleScheduleTour } from "../../store/property-detail/scheduleTour";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment-timezone";
import ResponseAlert from "../../components/shared/alert";
import { formatAddress } from "../../utils/propertyAddressFormat";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
interface contactFormProps {
  open: any;
  setOpen: any;
  isNeedMoreHelp?: Boolean;
  tourDateTime?: any;
  tourType?: any;
}

function ScheduleContactForm(props: contactFormProps) {
  let { open, setOpen, isNeedMoreHelp, tourDateTime, tourType } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [contactDetail, setContactDetail] = useState<{
    [key: string]: any;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
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
  const [isReadMore, setIsReadMore] = useState<Boolean>(false);

  const contactForm = useSelector(
    (state: RootState) => state.propertyDetail.agentContact
  );
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateDetail = (field: any, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    if (contactDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
  };
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

  useEffect(() => {
    if (open && tourDateTime) {
      setContactDetail((detail) => ({
        ...detail,
        message:
          tourType === "video-chat"
            ? `I would like a virtual showing of the property on ${moment(
                tourDateTime
              )
                .tz("America/New_York")
                .format("l")}`
            : `I would like to see the property on ${moment(tourDateTime)
                .tz("America/New_York")
                .format("l")}`,
      }));
    }
  }, [open]);

  useEffect(() => {
    if (open && isNeedMoreHelp) {
      setContactDetail((detail) => ({
        ...detail,
        message: `I have a question about ${formatAddress({
          ...listDetail?.data,
          isFullAddressNeeded: true,
        })}`,
      }));
    }
  }, [open]);

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!isNeedMoreHelp && !tourDateTime) {
      isFormValid = false;
      setErrorAlert({
        errorMsg: "Please select the date first",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.firstName) {
      isFormValid = false;
      errorMsg["firstName"] = "Please enter the first name";
      setErrorAlert({
        errorMsg: "Please enter the first name",
        errorType: "warning",
        isOpen: true,
      });
    } else if (!contactDetail.lastName) {
      isFormValid = false;
      errorMsg["lastName"] = "Please enter the last name";
      setErrorAlert({
        errorMsg: "Please enter the last name",
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
    } else if (!contactDetail.message && !tourDateTime) {
      isFormValid = false;
      errorMsg["message"] = "Please enter the address";
      setErrorAlert({
        errorMsg: "Please enter the address",
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    handleClose();
  };

  const handleError = (error: any) => {
    setErrorAlert({
      errorMsg: JSON.stringify(error),
      errorType: "error",
      isOpen: true,
    });
  };

  useEffect(() => {
    if (open) {
      if (tourDateTime) {
        ReactGA.event({
          category: "Tour Request Form Displayed",
          action: "Tour Request Form Displayed",
          label: contactDetail?.firstName
            ? contactDetail?.firstName
            : "Tour Request Form Displayed",
        });
        ReactGA.send({
          hitType: "pageview",
          page: window.location.pathname,
          title: "Tour Request Form Displayed",
        });
      } else {
        ReactGA.event({
          category: "Contact Request form Displayed",
          action: "Contact Request form Displayed",
          label: contactDetail?.firstName
            ? contactDetail?.firstName
            : "Contact Request form Displayed",
        });
        ReactGA.send({
          hitType: "pageview",
          page: window.location.pathname,
          title: "Contact Request form Displayed",
        });
      }
    }
  }, [open]);

  const handleSubmit = () => {
    if (handleValidate()) {
      if (tourDateTime) {
        let obj = {
          schema: {
            ...contactDetail,
            phone: contactDetail?.phone?.replaceAll(" ", ""),
            tourDateTime: tourDateTime,
            property: {
              type: listDetail?.data?.PropertySubType,
              street: formatAddress(listDetail?.data),
              city: listDetail?.data?.City,
              state: listDetail?.data?.StateOrProvince,
              code: listDetail?.data?.PostalCode,
              mlsNumber: listDetail?.data?.ListingId,
              price:
                listDetail?.data?.ListPrice ||
                listDetail?.data?.OriginalListPrice,
              forRent: false,
              url: `${window.location.href}`,
              bedrooms: listDetail?.data?.BedroomsTotal,
              bathrooms: listDetail?.data?.BathroomsTotalInteger,
              area: listDetail?.data?.BuildingAreaTotal.toString(),
            },
          },
          handleSuccess,
          handleError,
        };
        dispatch(handleScheduleTour(obj));
        ReactGA.event({
          category: "Tour Request Form Submitted",
          action: "Tour Request Form Submitted",
          label: contactDetail?.firstName
            ? contactDetail?.firstName
            : "Tour Request Form Submitted",
        });
        ReactGA.send({
          hitType: "pageview",
          page: window.location.pathname,
          title: "Tour Request Form Submitted",
        });
      } else {
        let obj = {
          schema: {
            ...contactDetail,
            phone: contactDetail?.phone.replaceAll("-", ""),
            property: {
              type: listDetail?.data?.PropertySubType,
              street: formatAddress(listDetail?.data),
              city: listDetail?.data?.City,
              state: listDetail?.data?.StateOrProvince,
              code: listDetail?.data?.PostalCode,
              mlsNumber: listDetail?.data?.ListingId,
              price:
                listDetail?.data?.ListPrice ||
                listDetail?.data?.OriginalListPrice,
              forRent: false,
              url: `${window.location.href}`,
              bedrooms: listDetail?.data?.BedroomsTotal,
              bathrooms: listDetail?.data?.BathroomsTotalInteger,
              area: listDetail?.data?.BuildingAreaTotal.toString(),
            },
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
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateDetail(
      "contactReference",
      (event.target as HTMLInputElement).value
    );
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        sx={{
          "& .MuiDialog-container": { margin: "8px -24px", zIndex: 9999999999 },
          "& .MuiDialog-paper": { maxHeight: "100% !important" },
        }}
        aria-labelledby="contact-form-dialog-title"
        aria-describedby="contact-form-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className={Styles.ScheduleFormHeader}>
          <Typography className={Styles.ScheduleFormHeaderTitle}>
            {isNeedMoreHelp
              ? "Request More Info About This Listing"
              : "Schedule a Tour"}
          </Typography>
          <IconButton onClick={() => handleClose()} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: "0px" }}>
          <Typography className={Styles.ScheduleFormInfo}>
            {isNeedMoreHelp
              ? "Complete the form below to request more info about this listing."
              : "Complete the form below to submit a tour request for this listing."}
          </Typography>
          <Box className={Styles.scheduleTourFormBox}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={6} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  First Name:
                </InputLabel>
                <TextField
                  size="small"
                  placeholder="Enter your first name"
                  fullWidth
                  className={Styles.scheduleTourFormBoxField}
                  value={contactDetail.firstName}
                  onChange={(e) =>
                    handleUpdateDetail("firstName", e.target.value)
                  }
                  error={errMsg.firstName}
                  helperText={errMsg.firstName}
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  Last Name:
                </InputLabel>
                <TextField
                  size="small"
                  placeholder="Enter your last name"
                  fullWidth
                  className={Styles.scheduleTourFormBoxField}
                  value={contactDetail.lastName}
                  onChange={(e) =>
                    handleUpdateDetail("lastName", e.target.value)
                  }
                  error={errMsg.lastName}
                  helperText={errMsg.lastName}
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  Email Address:
                </InputLabel>
                <TextField
                  type="email"
                  placeholder="name@website.com"
                  size="small"
                  fullWidth
                  className={Styles.scheduleTourFormBoxField}
                  value={contactDetail.email}
                  onChange={(e) => handleUpdateDetail("email", e.target.value)}
                  error={errMsg.email}
                  helperText={errMsg.email}
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  Phone:
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
                    placeholder="201-555-0123"
                    size="small"
                    fullWidth
                    className={Styles.scheduleTourFormBoxField}
                    value={contactDetail.phone}
                    onChange={(e) =>
                      handleUpdateDetail("phone", e.target.value)
                    }
                    error={errMsg.phone}
                    helperText={errMsg.phone}
                  />
                )}
              </Grid>
              {/* <Grid xs={12} sm={12} md={6} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  Contact Preference:
                </InputLabel>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={contactDetail.contactReference}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Phone"
                      control={<Radio />}
                      label="Phone"
                    />
                    <FormControlLabel
                      value="email"
                      control={<Radio />}
                      label="Email"
                    />
                    {isNeedMoreHelp ? null : (
                      <FormControlLabel
                        value="either"
                        control={<Radio />}
                        label="Either"
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid> */}

              <Grid xs={12} sm={12} item>
                <InputLabel className={Styles.scheduleTourFormBoxLabel}>
                  {isNeedMoreHelp
                    ? "How can we help you?"
                    : "Questions / Comments"}
                </InputLabel>
                <TextField
                  fullWidth
                  className={Styles.scheduleTourFormBoxField}
                  multiline
                  rows={3}
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
          <Box className={Styles.requestInfoButtonArea}>
            <LoadingButton
              className={Styles.requestInfoButton}
              color="inherit"
              variant="contained"
              onClick={handleSubmit}
              loading={Boolean(contactForm?.isLoading)}
              loadingPosition="start"
            >
              Request Info
            </LoadingButton>
          </Box>
          {isReadMore ? (
            <Typography className={Styles.termsAndConditions}>
              By proceeding, you expressly consent to receive calls and texts at
              the number you provided, including marketing by auto-dialer,
              pre-recorded or artificial voice, and email, from{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
              related matters, but not as a condition of purchase. Message
              frequency varies. You can text Help for help and Stop to cancel.
              You also agree to our{" "}
              <span onClick={() => router.push("/terms-of-service")}>
                Terms of Service
              </span>{" "}
              and to our{" "}
              <span onClick={() => router.push("/privacy-policy")}>
                Privacy Policy
              </span>{" "}
              regarding the information relating to you. Message and data rates
              may apply.
              <br />
              Additionally, you expressly consent to receiving calls at the
              number you provided, including marketing by auto-dialer,
              pre-recorded or artificial voice, and email, from{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
              related matters, but not as a condition of purchase. This consent
              applies even if you are on a corporate, state or national Do Not
              Call list.
              <span onClick={() => setIsReadMore(false)}>Less</span>
            </Typography>
          ) : (
            <Typography className={Styles.termsAndConditions}>
              By proceeding, you expressly consent to receive calls and texts at
              the number you provided, including marketing by auto-dialer,
              pre-recorded or artificial voice, and email, from{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} about real estate
              related matters, but not as a condition of purchase. Message
              frequency varies. You can text Help{" "}
              <span onClick={() => setIsReadMore(true)}>More...</span>
            </Typography>
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
export default ScheduleContactForm;
