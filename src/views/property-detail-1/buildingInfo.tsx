import React, { Fragment } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Styles from "../../styles/property-detail-1/propertyDetail.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAddress, getAcres } from "../../utils/propertyAddressFormat";
function PropertyBuildingInfo() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Fragment>
      <Typography
        id="property-building-information"
        className={Styles.listingStatsHeadingPC}
      >
        Building Information for {formatAddress(listDetail?.data)}
      </Typography>
      <Grid container spacing={2} sx={{ mt: "10px" }}>
        <Grid item xs={12} md={12} lg={6}>
          <Box className={Styles.propertyDetailItem}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={Styles.propertyDetailItemHeading}
            >
              Stories
            </Typography>
            <Typography
              className={Styles.propertyDetailItemValues}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              {" "}
              {listDetail?.data?.Levels?.join(", ")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box className={Styles.propertyDetailItem}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={Styles.propertyDetailItemHeading}
            >
              Year Built
            </Typography>
            <Typography
              className={Styles.propertyDetailItemValues}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              {listDetail?.data?.YearBuilt}
            </Typography>
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={12} lg={6}>
          <Box className={Styles.propertyDetailItem}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={Styles.propertyDetailItemHeading}
            >
              Building Size
            </Typography>
            <Typography
              className={Styles.propertyDetailItemValues}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              {listDetail?.data?.stories || "-"}
            </Typography>
          </Box>
        </Grid> */}
        <Grid item xs={12} md={12} lg={6}>
          <Box className={Styles.propertyDetailItem}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={Styles.propertyDetailItemHeading}
            >
              Lot Size
            </Typography>
            <Typography
              className={Styles.propertyDetailItemValues}
              variant="subtitle2"
              display="block"
              gutterBottom
            >
              {getAcres(listDetail?.data)} Acres
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default PropertyBuildingInfo;
