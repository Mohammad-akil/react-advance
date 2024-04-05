import React, { useState, Fragment, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import Styles from "../../../styles/listing/contact.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import ResponseAlert from "../../../components/shared/alert";
import { useAppDispatch } from "../../../store/store";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactGA from "react-ga4";
import { getMediaForWebp } from "../../../utils/common";
import { agentContact } from "../../../store/property-detail/agentContact";
interface ContactSectionProps {
  [key: string]: any;
}
function ContactSection(props: ContactSectionProps) {
  const [contactDetail, setContactDetail] = useState<any>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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

  const contactUs = useSelector(
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
        name: authDetail?.firstName + " " + authDetail?.lastName,
        email: authDetail?.email,
        phone: authDetail?.phoneNumber,
      }));
    }
  }, [isAuthenticated]);

  const dispatch = useAppDispatch();

  const handleUpdateDetail = (field: string, value: any) => {
    setContactDetail({ ...contactDetail, [field]: value });
    setErrMsg({});
  };
  const handleValidate = () => {
    let isFormValid: any = true;
    let errorMsg: any = {};
    if (!contactDetail.name) {
      isFormValid = false;
      errorMsg["name"] = "Please enter your name";
      setErrorAlert({
        errorMsg: "Please enter your name",
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
    if (handleValidate() && !contactUs.isLoading) {
      let obj: any = {
        schema: {
          phone: contactDetail?.phone.replaceAll("-", ""),
          firstName: contactDetail?.name?.split(" ")[0],
          lastName: contactDetail?.name?.split(" ")[1],
          email: contactDetail?.email,
          message: contactDetail?.message,
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
        label: contactDetail?.name
          ? contactDetail?.name
          : "Contact Form Submitted",
      });
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: "Contact Form Submitted",
      });
    }
  };

  useEffect(() => {
    if (listDetail?.data?.images) {
      let element = document.getElementById(
        "listing-contact-form"
      ) as HTMLDivElement;
      element.style.backgroundImage = `url(${
        listDetail?.data?.images?.find((item: any) => item.isPrimary)?.MediaUrl
          ? getMediaForWebp(
              listDetail?.data?.images?.find((item: any) => item.isPrimary)
                ?.MediaUrl || "",
              "large"
            )
          : listDetail?.data?.images[0]?.MediaUrl
          ? getMediaForWebp(
              listDetail?.data?.images[0]?.MediaUrl || "",
              "large"
            )
          : ""
      })`;
    }
  }, [listDetail?.data?.images]);

  return (
    <Fragment>
      {" "}
      <Box className={Styles.contactSection} id="listing-contact-form">
        <Box className={Styles.contactSectionForm}>
          <Typography className={Styles.contactFormHeading}>
            Request Info
          </Typography>
          <Typography className={Styles.contactFormDesc}>
            Ask Questions or Schedule a Visit
          </Typography>
          <Box className={Styles.contactForm}>
            <TextField
              placeholder="Name"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgrey",
                    borderRadius: "0px",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              onChange={(e: any) => handleUpdateDetail("name", e.target.value)}
              className={Styles.contactFormField}
              value={contactDetail?.name}
              error={errMsg.name}
              helperText={errMsg.name}
            />
            <TextField
              placeholder="Email"
              type="email"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgrey",
                    borderRadius: "0px",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              className={Styles.contactFormField}
              onChange={(e: any) => handleUpdateDetail("email", e.target.value)}
              value={contactDetail?.email}
              error={errMsg.email}
              helperText={errMsg.email}
            />
            <TextField
              placeholder="Phone"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgrey",
                    borderRadius: "0px",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              className={Styles.contactFormField}
              onChange={(e: any) => handleUpdateDetail("phone", e.target.value)}
              value={contactDetail?.phone}
              error={errMsg.phone}
              helperText={errMsg.phone}
            />
            <TextField
              placeholder="Message"
              type="email"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgrey",
                    borderRadius: "0px",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              className={Styles.contactFormField}
              onChange={(e: any) =>
                handleUpdateDetail("message", e.target.value)
              }
              value={contactDetail?.message}
              error={errMsg.message}
              helperText={errMsg.message}
            />
            <LoadingButton
              size="large"
              className={Styles.contactFormButton}
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              loading={Boolean(contactUs?.isLoading)}
              loadingPosition="end"
            >
              {" "}
              Send Message
            </LoadingButton>
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
    </Fragment>
  );
}
export default ContactSection;
