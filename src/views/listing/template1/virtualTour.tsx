import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Styles from "../../../styles/listing/virtualTour.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
function VirtualTour() {
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  return listDetail?.data?.Matterport ? (
    <Box className={Styles.virtualTourArea}>
      <Container>
        <Typography className={Styles.virtualTourHeading}>
          Virtual Tour
        </Typography>
        <center>
          <Box className={Styles.iframeContainer}>
            <iframe
              frameBorder="0"
              allowFullScreen
              src={listDetail?.data?.Matterport}
              allow="xr-spatial-tracking"
            ></iframe>
          </Box>
        </center>
      </Container>
    </Box>
  ) : null;
}
export default VirtualTour;
