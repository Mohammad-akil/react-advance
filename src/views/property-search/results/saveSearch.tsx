import React, { useState, Fragment } from "react";
import {
  Dialog,
  Typography,
  Box,
  IconButton,
  InputLabel,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Styles from "../../../styles/property-search/topFilters.module.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ResponseAlert from "../../../components/shared/alert";
import { useAppDispatch } from "../../../store/store";
import { saveSearch } from "../../../store/property-list/saveSearch";
import LoadingButton from "@mui/lab/LoadingButton";
interface SaveSearchProps {
  [key: string]: any;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
  open?: Boolean
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SaveSearch(props: SaveSearchProps) {
  let { open, setOpen } = props;
  const [searchName, setSearchName] = useState<any>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [emailNotification, setEmailNotification] = useState<string>("daily");
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    setSearchName("");
    setEmailNotification("daily");
  };
  const handleSuccess = () => {
    setErrorAlert({
      errorMsg: "Your have successfully! saved the search",
      errorType: "success",
      isOpen: true,
    });
    handleClose();
    setLoading(false);
  };

  const handleError = (error: any) => {
    setErrorAlert({
      errorMsg: JSON.stringify(error),
      errorType: "error",
      isOpen: true,
    });
    setLoading(false);
  };
  const handleSubmit = () => {
    if (searchName) {
      dispatch(
        saveSearch({
          title: searchName,
          emailNotification,
          handleError,
          handleSuccess,
        })
      );
      setLoading(true);
    } else {
      setErrorAlert({
        errorMsg: "Please enter the search name first!",
        errorType: "warning",
        isOpen: true,
      });
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
      >
        <Box className={Styles.saveSearchHeader}>
          <Typography className={Styles.saveSearchHeading}>
            Save This Search
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box className={Styles.saveSearchDesc}>
          <Typography className={Styles.saveSearchDescContent}>
            Give your search a name and decide whether or not you want to
            receive an email notification when new listings matching your saved
            search criteria come on the market.
          </Typography>
        </Box>
        <Box className={Styles.searchFieldsArea}>
          <Box>
            <InputLabel>Search Name:</InputLabel>
            <TextField
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
              placeholder="Search Name"
              size="small"
            />
          </Box>
          <br />
          <Box>
            <InputLabel>Notification Frequency</InputLabel>
            <TextField
              value={emailNotification}
              onChange={(e) => {
                setEmailNotification(e.target.value);
              }}
              fullWidth
              variant="outlined"
              size="small"
              select
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"weekly"}>Weekly </MenuItem>
              <MenuItem value={"monthly"}>Monthly </MenuItem>
              <MenuItem value={"never"}>Never </MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box className={Styles.searchButtonArea}>
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            className={Styles.searchSubmitButton}
            loading={Boolean(loading)}
            loadingPosition="start"
          >
            Save Search
          </LoadingButton>
          <Button
            variant="contained"
            onClick={handleClose}
            className={Styles.searchCloseButton}
          >
            Close
          </Button>
        </Box>
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
export default SaveSearch;
