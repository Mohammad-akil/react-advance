import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Styles from "../../styles/property-detail-1/propertyDetail.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function PropertyDetail() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Grid container spacing={2} className={Styles.propertyDetailArea}>
      {listDetail?.data?.SubdivisionName ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Subdivision Complex
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {" "}
              {listDetail?.data?.SubdivisionName}
            </Typography>
          </Box>
        </Grid>
      ) : null}

      {listDetail?.data?.ArchitecturalStyle?.length ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Architectural Style
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.ArchitecturalStyle?.join(", ")}
            </Typography>
          </Box>
        </Grid>
      ) : null}

      {listDetail?.data?.ExteriorFeatures?.length ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Exterior
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.ExteriorFeatures?.join(", ")}
            </Typography>
          </Box>
        </Grid>
      ) : null}
      {listDetail?.data?.GarageSpaces ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Num Of Garage Spaces
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.GarageSpaces}
            </Typography>
          </Box>
        </Grid>
      ) : null}
      {listDetail?.data?.ParkingTotal ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Num Of Parking Spaces
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.ParkingTotal}
            </Typography>
          </Box>
        </Grid>
      ) : null}

      {listDetail?.data?.ParkingFeatures?.length ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Parking Features
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.ParkingFeatures?.join(", ")}
            </Typography>
          </Box>
        </Grid>
      ) : null}

      <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
        <Box className={Styles.propertyDetailItem}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            className={Styles.propertyDetailItemHeading}
          >
            Property Attached
          </Typography>
          <Typography
            className={Styles.propertyDetailItemValues}
            variant="subtitle2"
            display="block"
            gutterBottom
          >
            {listDetail?.data?.PropertyAttachedYN ? "Yes" : "No"}
          </Typography>
        </Box>
      </Grid>
      {listDetail?.data?.WaterfrontFeatures ? (
        <Grid item xs={12} md={12} lg={6} sx={{ paddingTop: "0px !important" }}>
          <Box className={Styles.propertyDetailItem}>
            <Typography className={Styles.propertyDetailItemHeading}>
              Waterfront Features
            </Typography>
            <Typography className={Styles.propertyDetailItemValues}>
              {listDetail?.data?.WaterfrontFeatures?.join(", ")}
            </Typography>
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
export default PropertyDetail;
