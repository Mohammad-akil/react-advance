import React, { useState } from "react";
import {
  Box,
  MenuItem,
  ListItemIcon,
  Typography,
  TextField,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import { shareProperty } from "../../../store/property-detail/shareProperty";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { formatAddress } from "../../../utils/propertyAddressFormat";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {handleReturnPrimaryImage} from "../../../utils/propertyData";
interface ShareProps {
  [key: string]: any;
}
function Share(props: ShareProps) {
  let {
    handleClose,
    setErrorAlert,
    isExtraSmallScreen,
    setIsShareViaDialog,
    isShareViaDialog,
  } = props;
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [shareDetail, setShareDetail] = useState<{
    [key: string]: any;
  }>({
    sharedWithEmail: "",
    message: "",
  });
  const [errMsg, setErrMsg] = useState<{
    [key: string]: any;
  }>({});
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );

  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const share = useSelector((state: RootState) => state.propertyDetail.share);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setErrorAlert({
      errorMsg: "Copied Successfully!",
      errorType: "success",
      isOpen: true,
    });
    handleClose();
  };

  const handleValidate = () => {
    let isFormValid: Boolean = true;
    let errorMsg: { [key: string]: any } = {};
    if (!shareDetail.sharedWithEmail) {
      isFormValid = false;
      errorMsg["sharedWithEmail"] = "Please enter the share with email";
      setErrorAlert({
        errorMsg: "Please enter the share with email",
        errorType: "warning",
        isOpen: true,
      });
    }
    setErrMsg(errorMsg);
    return isFormValid;
  };

  const handleSuccess = () => {
    setErrorAlert({
      errorMsg: "Your have successfully shared!",
      errorType: "success",
      isOpen: true,
    });
    setShareDetail({
      sharedWithEmail: "",
      message: "",
    });
    setOpenSendEmail(false);
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
          ...shareDetail,
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
            image: handleReturnPrimaryImage(listDetail?.data?.MediaURL,listDetail?.data?.Media),
          },
          shareType: "email",
          name: isAuthenticated
            ? authDetail?.firstName + " " + authDetail?.lastName
            : undefined,
          email: isAuthenticated ? authDetail?.email : undefined,
          phone: isAuthenticated ? authDetail?.phoneNumber : undefined,
          shareEmailCopy: true,
        },
        handleSuccess,
        handleError,
      };
      dispatch(shareProperty(obj));
    }
  };
  const handleUpdateDetail = (field: any, value: any) => {
    setShareDetail({ ...shareDetail, [field]: value });
    if (shareDetail[field]) {
      setErrMsg({ ...errMsg, [field]: "" });
    }
  };
  return (
    <Box>
      <MenuItem
        onClick={() => {
          if (!isShareViaDialog) {
            setOpenSendEmail((open: any) => !open);
            if (isExtraSmallScreen) {
              setIsShareViaDialog((open: any) => !open);
            }
          }
        }}
        divider
        sx={{ minWidth: "280px" }}
      >
        <ListItemIcon>
          <EmailRoundedIcon sx={{ color: "#0064f5" }} />
        </ListItemIcon>
        <Typography
          sx={{
            color: "black",
            fontSize: "14px",
            fontFamily: "AvenirNextLTPro-Demi !important",
          }}
        >
          {" "}
          Share via Email
        </Typography>
        {isShareViaDialog ? (
          <ListItemSecondaryAction onClick={handleClose}>
            <IconButton>
              <CloseRoundedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}
      </MenuItem>
      {openSendEmail || isShareViaDialog ? (
        <Box
          sx={{
            minWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px 10px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="example@gmail.com"
            fullWidth
            size="small"
            value={shareDetail.sharedWithEmail}
            onChange={(e) =>
              handleUpdateDetail("sharedWithEmail", e.target.value)
            }
            error={errMsg.sharedWithEmail}
            helperText={errMsg.sharedWithEmail}
          />
          <TextField
            variant="outlined"
            multiline
            rows={5}
            placeholder="Message(optional)"
            fullWidth
            size="small"
            value={shareDetail.message}
            onChange={(e) => handleUpdateDetail("message", e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="contained"
              sx={{
                width: "70%",
                background: "#0064f5 !important",
                color: "white",
              }}
              loading={Boolean(share?.isLoading)}
              loadingPosition="start"
              onClick={handleSubmit}
            >
              Send
            </LoadingButton>
          </Box>
        </Box>
      ) : (
        <MenuItem onClick={handleCopy} sx={{ minWidth: "170px" }}>
          <ListItemIcon>
            <InsertLinkRoundedIcon sx={{ color: "#0064f5" }} />
          </ListItemIcon>
          <Typography
            sx={{
              color: "black",
              fontSize: "14px",
              fontFamily: "AvenirNextLTPro-Demi !important",
            }}
          >
            {" "}
            Copy Link
          </Typography>
        </MenuItem>
      )}
    </Box>
  );
}
export default Share;
