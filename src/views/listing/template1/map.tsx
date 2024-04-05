import React, { useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Styles from "../../../styles/listing/map.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
function ListingMap() {
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  return listDetail?.data?.GoogleMapUrl ? (
    <Box className={Styles.listingMapSection}>
      <Typography className={Styles.listingMapHeading}>Map</Typography>
      <Box className={Styles.iframeContainer}>
        <iframe
          frameBorder="0"
          allowFullScreen
          src={listDetail?.data?.GoogleMapUrl}
          allow="xr-spatial-tracking"
        ></iframe>
      </Box>
    </Box>
  ) : null;
}
export default ListingMap;
