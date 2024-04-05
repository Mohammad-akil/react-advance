import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Styles from "../../../styles/property-detail-1/dialoge.module.css";
import MapView from "./map";
import PhotoGrid from "./photoGrid";
import StreetView from "./streetView";
interface fullScreenDialogProps {
  open?: any;
  setOpen?: any;
  activeView?: any;
  setActiveView?: any;
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

export default function FullScreenDialog(props: fullScreenDialogProps) {
  let { open, setOpen, activeView, setActiveView } = props;
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateActiveView = (view: string) => {
    setActiveView(view);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", listenToScroll);
  //   return () => window.removeEventListener("scroll", listenToScroll);
  // }, []);
  // const listenToScroll = () => {
  //   let heightToHideFrom = 260;
  //   const winScroll =
  //     document.body.scrollTop || document.documentElement.scrollTop;
  //   if (winScroll > heightToHideFrom) {
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // };

  return (
    <Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-root": {
            zIndex: "9999999999999999999999 !important",
          },
        }}
      >
        <Box sx={{ zIndex: "9999999999999999999999 !important" }}>
          <Box className={Styles.dialogHeader}>
            <Box className={Styles.dialogHeaderButtons}>
              <Button
                size="large"
                color="inherit"
                variant={activeView === "photos" ? "contained" : "outlined"}
                className={
                  activeView === "photos"
                    ? Styles.dialogActivePhotosButton
                    : Styles.dialogPhotosButton
                }
                onClick={() => handleUpdateActiveView("photos")}
              >
                Photos
              </Button>
              <Button
                className={
                  activeView === "map"
                    ? Styles.dialogActivePhotosButton
                    : Styles.dialogPhotosButton
                }
                variant={activeView === "map" ? "contained" : "outlined"}
                color="inherit"
                size="large"
                onClick={() => handleUpdateActiveView("map")}
              >
                Map
              </Button>
              <Button
                className={
                  activeView === "streetView"
                    ? Styles.dialogActivePhotosButton
                    : Styles.dialogPhotosButton
                }
                variant={activeView === "streetView" ? "contained" : "outlined"}
                color="inherit"
                size="large"
                onClick={() => handleUpdateActiveView("streetView")}
              >
                Street View
              </Button>
            </Box>
            <IconButton
              onClick={handleClose}
              className={Styles.dialogHeaderCloseButton}
            >
              <CloseIcon
                className={Styles.dialogHeaderCloseButtonIcon}
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                fontSize="large"
              />
            </IconButton>
          </Box>
          {activeView === "photos" ? (
            <PhotoGrid />
          ) : activeView === "map" ? (
            <MapView height="90vh" />
          ) : (
            <StreetView />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
