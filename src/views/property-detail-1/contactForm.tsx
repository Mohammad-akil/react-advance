import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Dialog,
  Slide,
  IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Styles from "../../styles/property-detail-1/contactForm.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ResponseAlert from "../../components/shared/alert";
import { agentContact } from "../../store/property-detail/agentContact";
import { useAppDispatch } from "../../store/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { formatAddress } from "../../utils/propertyAddressFormat";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
  open?: Boolean
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface propertyProps {
  setOpen?: any;
  open?: any;
}
function PropertyContactForm(props: propertyProps) {
  let { setOpen, open } = props;
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

  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const contactForm = useSelector(
    (state: RootState) => state.propertyDetail.agentContact
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

  useEffect(() => {
    if (formatAddress(listDetail?.data) && !contactDetail?.message) {
      setContactDetail((detail: any) => ({
        ...detail,
        message: `I would like more information about ${formatAddress(
          listDetail?.data
        )}.`,
      }));
    }
  }, [listDetail?.data]);

  const handleUpdateDetail = (field: any, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    if (contactDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
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
    } else if (!contactDetail.message) {
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
          phone: contactDetail?.phone?.replaceAll(" ", ""),
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
    <Box className={Styles.propertyContactFormArea}>
      <Box className={Styles.contactFormHeadingArea}>
        <Typography className={Styles.contactFormHeading}>
          Contact a {process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME} Agent
        </Typography>
        {setOpen ? (
          <IconButton onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        ) : null}
      </Box>
      <Card className={Styles.propertyContactFormBox} variant="outlined">
        <TextField
          className={Styles.contactFormField}
          sx={{ marginTop: "20px" }}
          placeholder="First Name"
          variant="outlined"
          fullWidth
          size="small"
          value={contactDetail.firstName}
          onChange={(e) => handleUpdateDetail("firstName", e.target.value)}
          error={errMsg.firstName}
          helperText={errMsg.firstName}
        />
        <TextField
          className={Styles.contactFormField}
          placeholder="Last Name"
          variant="outlined"
          fullWidth
          size="small"
          value={contactDetail.lastName}
          onChange={(e) => handleUpdateDetail("lastName", e.target.value)}
          error={errMsg.lastName}
          helperText={errMsg.lastName}
        />
        <TextField
          className={Styles.contactFormField}
          placeholder="Email"
          variant="outlined"
          fullWidth
          size="small"
          type="email"
          value={contactDetail.email}
          onChange={(e) => handleUpdateDetail("email", e.target.value)}
          error={errMsg.email}
          helperText={errMsg.email}
        />

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
            className={Styles.contactFormField}
            variant="outlined"
            fullWidth
            size="small"
            value={contactDetail.phone}
            onChange={(e) => handleUpdateDetail("phone", e.target.value)}
            error={errMsg.phone}
            helperText={errMsg.phone}
          />
        )}

        <TextField
          className={Styles.contactFormField}
          placeholder="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          size="small"
          value={contactDetail.message}
          onChange={(e) => handleUpdateDetail("message", e.target.value)}
          error={errMsg.message}
          helperText={errMsg.message}
          sx={{
            mt:
              process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE === "true"
                ? "15px"
                : "",
          }}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#0064e5",
                },
              }}
            />
          }
          classes={{ label: Styles.contactFormFieldLabel }}
          label="I want financing information."
        /> */}
        <LoadingButton
          variant={!open ? "contained" : "outlined"}
          fullWidth
          className={
            !open
              ? Styles.contactFormSendMessageButton
              : Styles.contactFormSendMessageButtonOutlined
          }
          onClick={handleSubmit}
          loading={Boolean(contactForm?.isLoading)}
          loadingPosition="start"
        >
          Send Message
        </LoadingButton>
        <Typography
          sx={{ mt: "10px" }}
          variant="caption"
          display="block"
          gutterBottom
          className={Styles.contactFormSendDescription}
        >
          By clicking "send message" you agree that{" "}
          {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}, its affiliates or
          associated third parties may contact you, including with calls or
          texts by automated means. You also agree to our Terms of Service and
          Privacy Policy. Message/data rates may apply. Consent is not a
          condition to access real estate services.
        </Typography>
      </Card>
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

function PropertyContact() {
  const [open, setOpen] = useState<any>(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box className={Styles.contactFormPCView}>
        {" "}
        <PropertyContactForm />
      </Box>
      {open ? null : (
        <Box className={Styles.contactFormMBView}>
          <Button
            variant="contained"
            fullWidth
            className={Styles.contactFormSendMessageButton}
            onClick={() => setOpen(true)}
          >
            Contact Agent
          </Button>
        </Box>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ "& .MuiDialog-container": { zIndex: "999999999999 !important" } }}
      >
        {" "}
        <PropertyContactForm setOpen={setOpen} open={open} />
      </Dialog>
    </Box>
  );
}
export default PropertyContact;
