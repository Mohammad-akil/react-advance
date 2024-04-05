import React, { Fragment, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Styles from "../../../styles/agents/detail.module.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "@mui/lab/LoadingButton";
import ResponseAlert from "../../../components/shared/alert";
import { agentContact } from "../../../store/property-detail/agentContact";
import ReactGA from "react-ga4";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface agentProps {
  [key: string]: any;
}

function AgentContact(props: agentProps) {
  let { open, setOpen, agentDetail } = props;
  const dispatch = useAppDispatch();
  const [contactDetail, setContactDetail] = useState<{
    [key: string]: any;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [contactPurpose, setContactPurpose] = useState("");
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

  const handleClose = () => {
    setOpen(false);
    setContactDetail({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setContactPurpose("");
  };

  const handleUpdateDetail = (field: any, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    if (contactDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactPurpose((event.target as HTMLInputElement).value);
  };

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!contactDetail.firstName) {
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
    handleClose();
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
          ...contactDetail,
          phone: contactDetail?.phone.replaceAll("-", ""),
          message: `Name: ${contactDetail?.firstName} ${
            contactDetail?.lastName
          } \n Email: ${contactDetail?.email} \n Phone :${
            contactDetail?.phone
          } \n  URL: ${window.location.href}. \n ${
            contactPurpose
              ? ` description: lead submitted a request to ${contactPurpose} your home`
              : ""
          } `,
        },
        agent_id: agentDetail?.agentId,
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
    <Fragment>
      <Dialog open={open} onClose={() => handleClose()} maxWidth="xs" fullWidth>
        <DialogTitle className={Styles.agentFormHeader}>
          <Typography className={Styles.agentFormHeaderTitle}>
            Work with {agentDetail?.firstName} {agentDetail?.lastName}
          </Typography>
          <IconButton
            className={Styles.agentFormCloseIcon}
            onClick={() => handleClose()}
            size="small"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
          <Box className={Styles.dashBox}>
            <Box className={Styles.dashBoxInner}></Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6} item>
              <InputLabel className={Styles.contactFieldLabel}>
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
              <InputLabel className={Styles.contactFieldLabel}>
                Last Name:
              </InputLabel>
              <TextField
                size="small"
                placeholder="Enter your last name"
                fullWidth
                className={Styles.scheduleTourFormBoxField}
                value={contactDetail.lastName}
                onChange={(e) => handleUpdateDetail("lastName", e.target.value)}
                error={errMsg.lastName}
                helperText={errMsg.lastName}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <InputLabel className={Styles.contactFieldLabel}>
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
            <Grid xs={12} sm={12} item>
              <InputLabel className={Styles.contactFieldLabel}>
                Phone:
              </InputLabel>
              {process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE === "true" ? (
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
                  onChange={(e) => handleUpdateDetail("phone", e.target.value)}
                  error={errMsg.phone}
                  helperText={errMsg.phone}
                />
              )}
            </Grid>
            <Grid xs={12} sm={12} item>
              <FormControl>
                <FormLabel className={Styles.interestedInLabel}>
                  I am interested in:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={contactPurpose}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="sell"
                    control={<Radio />}
                    label="Sell"
                    sx={{
                      mr: "20px",
                      "& .MuiTypography-root": { fontSize: "15px" },
                    }}
                  />
                  <FormControlLabel
                    value="buy"
                    control={<Radio />}
                    label="Buy"
                    sx={{
                      mr: "20px",
                      "& .MuiTypography-root": { fontSize: "15px" },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <LoadingButton
                className={Styles.requestInfoButton}
                color="inherit"
                variant="contained"
                onClick={handleSubmit}
                loading={Boolean(contactForm?.isLoading)}
                loadingPosition="start"
                fullWidth
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
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

export default AgentContact;
