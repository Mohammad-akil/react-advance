import React, { Fragment } from "react";
import { Box, Grid, Typography,useMediaQuery } from "@mui/material";
import Styles from "../../styles/property-detail-1/propertyDetail.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NumberFormat } from "../../utils/numberFormat";
import { formatAddress } from "../../utils/propertyAddressFormat";
function PublicRecordsInfo() {
  const isExtraSmallScreen = useMediaQuery("(max-width: 575px)");
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Fragment>
      <Typography
        id="property-public-records"
        className={Styles.listingStatsHeadingPC}
      >
        Public Records for {formatAddress(listDetail?.data)}
      </Typography>
      <Grid container spacing={3} sx={{ mt: "10px" }}>
        {listDetail?.data?.TaxAnnualAmount &&
        listDetail?.data?.TaxAnnualAmount !== "0" &&
        listDetail?.data?.TaxAnnualAmount !== "null" ? (
          <Grid item xs={12} md={12} lg={6}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={Styles.publicRecordsHeading}
            >
              Tax Record
            </Typography>
            {listDetail?.data?.TaxAnnualAmount ? (
              <Box className={Styles.publicRecordsItemTotal}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  className={Styles.publicRecordsItemHeading}
                >
                  {listDetail?.data?.TaxYear}
                </Typography>
                <Typography
                  className={Styles.publicRecordsItemValues}
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                >
                  {" "}
                  {listDetail?.data?.TaxAnnualAmount
                    ? NumberFormat({
                        number: listDetail?.data?.TaxAnnualAmount,
                        currency: "USD",
                      })
                    : null}{" "}
                  (
                  {listDetail?.data?.TaxAnnualAmount
                    ? NumberFormat({
                        number: Number(listDetail?.data?.TaxAnnualAmount) / 12,
                        currency: "USD",
                      })
                    : null}{" "}
                  / month)
                </Typography>
              </Box>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        className={Styles.publicRecordsHeading}
        sx={{ mt: "40px" }}
      >
        Home Facts
      </Typography>
      <Grid container spacing={isExtraSmallScreen?0:3}>
        <Grid item xs={12} md={12} lg={6}>
          {listDetail?.data?.BedroomsTotal ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Beds
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.BedroomsTotal}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.BuildingAreaTotal ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Total Finished SqFt
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.BuildingAreaTotal
                  ? NumberFormat({
                      number: listDetail?.data?.BuildingAreaTotal,
                    }) + " SqFt"
                  : null}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.Levels ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Stories
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.Levels?.join(", ")}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.PropertySubType ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Style
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.PropertySubType}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.Zoning ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Zoning
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.Zoning}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.ParcelNumber ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                APN
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.ParcelNumber}
              </Typography>
            </Box>
          ) : null}
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          {listDetail?.data?.BathroomsFull ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Baths
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.BathroomsFull || "-"}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.AboveGradeFinishedArea &&
          listDetail?.data?.AboveGradeFinishedArea !== "0" ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Above Grade Finished
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {listDetail?.data?.AboveGradeFinishedArea
                  ? NumberFormat({
                      number: listDetail?.data?.AboveGradeFinishedArea,
                    }) + " SqFt"
                  : null}
              </Typography>
            </Box>
          ) : null}
          {listDetail?.data?.BelowGradeFinishedArea &&
          listDetail?.data?.BelowGradeFinishedArea !== "0" ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Below Grade Finished
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {listDetail?.data?.BelowGradeFinishedArea
                  ? NumberFormat({
                      number: listDetail?.data?.BelowGradeFinishedArea,
                    }) + " SqFt"
                  : null}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.LotSizeAcres ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Lot Size
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.LotSizeAcres} Acres
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.YearBuilt ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Year Built
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.YearBuilt}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.CountyOrParish ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                County
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {" "}
                {listDetail?.data?.CountyOrParish}
              </Typography>
            </Box>
          ) : null}

          {listDetail?.data?.FireplacesTotal ? (
            <Box className={Styles.publicRecordsItem}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                className={Styles.publicRecordsItemHeading}
              >
                Fireplaces
              </Typography>
              <Typography
                className={Styles.publicRecordsItemValues}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {listDetail?.data?.FireplacesTotal}
              </Typography>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default PublicRecordsInfo;
