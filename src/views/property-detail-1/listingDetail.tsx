import React from "react";
import { Box, Typography } from "@mui/material";
import Styles from "../../styles/property-detail-1/listingStats.module.css";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { NumberFormat } from "../../utils/numberFormat";
import moment from "moment-timezone";
import { formatAddress } from "../../utils/propertyAddressFormat";
function ListingDetailStats() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const handleCalcDaysOnMarket = () => {
    if (listDetail?.data?.StandardStatus === "Active") {
      let date1 = moment(listDetail?.data?.ListingContractDate);
      let date2 = moment();
      return date2.diff(date1, "days") >= 1
        ? date2.diff(date1, "days")
        : moment(listDetail?.data?.ListingContractDate).fromNow();
    } else if (listDetail?.data?.StandardStatus === "Active Under Contract") {
      let date1 = moment(listDetail?.data?.ListingContractDate);
      let date2 = moment(listDetail?.data?.PurchaseContractDate);
      return date2.diff(date1, "days") >= 1
        ? date2.diff(date1, "days")
        : moment(listDetail?.data?.PurchaseContractDate).fromNow();
    } else if (listDetail?.data?.StandardStatus === "Closed") {
      let date1 = moment(listDetail?.data?.CloseDate);
      let date2 = moment(listDetail?.data?.ListingContractDate);
      return date2.diff(date1, "days") >= 1
        ? date2.diff(date1, "days")
        : moment(listDetail?.data?.ListingContractDate).fromNow();
    } else if (
      listDetail?.data?.StandardStatus === "Withdrawn" ||
      listDetail?.data?.StandardStatus === "Expired"
    ) {
      let date1 = moment(listDetail?.data?.ListingContractDate);
      let date2 = moment(
        listDetail?.data?.OffMarketDate || listDetail?.data?.WithdrawnDate
      );
      return date2.diff(date1, "days") >= 1
        ? date2.diff(date1, "days")
        : moment(
            listDetail?.data?.OffMarketDate || listDetail?.data?.WithdrawnDate
          ).fromNow();
    } else if (listDetail?.data?.StandardStatus === "Coming Soon") {
      return "0";
    } else {
      return "0";
    }
  };
  return (
    <Box className={Styles.listingStatsRoot}>
      <Typography className={Styles.listingStatsHeading}>
        LISTING UPDATED:{" "}
        {moment(listDetail?.data?.ModificationTimestamp).format("l")}{" "}
        {moment(listDetail?.data?.ModificationTimestamp).format("LT")}
      </Typography>
      <Typography className={Styles.listingStatsHeadingMB}>
        Property Details for {formatAddress(listDetail?.data)}
      </Typography>
      <Box className={Styles.listingStatsArea}>
        <Box className={Styles.listingStatsItem}>
          <Typography className={Styles.listingStatsItemLeft}>
            Status
          </Typography>
          <Typography className={Styles.listingStatsItemRight}>
            {listDetail?.data?.StandardStatus}
          </Typography>
        </Box>

        {listDetail?.data?.ListingId ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              MLS #
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.ListingId}
            </Typography>
          </Box>
        ) : null}

        {listDetail?.data?.CumulativeDaysOnMarket ||
        listDetail?.data?.DaysOnMarket ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              Days on Site
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.CumulativeDaysOnMarket ||
                listDetail?.data?.DaysOnMarket}
            </Typography>
          </Box>
        ) : (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              Days on Site
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {handleCalcDaysOnMarket()}
            </Typography>
          </Box>
        )}

        {listDetail?.data?.TaxAnnualAmount && Number(listDetail?.data?.TaxAnnualAmount)>0 ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              Taxes
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {NumberFormat({
                number: listDetail?.data?.TaxAnnualAmount,
                currency: "USD",
              })}{" "}
              / year
            </Typography>
          </Box>
        ) : null}

        {listDetail?.data?.AssociationFee ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              HOA Fees
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {NumberFormat({
                number: listDetail?.data?.AssociationFee,
                currency: "USD",
              })}{" "}
              /{" "}
              {listDetail?.data?.AssociationFeeFrequency === "Annually"
                ? "year"
                : "month"}
            </Typography>
          </Box>
        ) : null}

        {/* <Box className={Styles.listingStatsItem}>
          <Typography className={Styles.listingStatsItemLeft}>
            Condo/Co-op Fees
          </Typography>
          <Typography className={Styles.listingStatsItemRight}>
            {NumberFormat({
                number: listDetail?.data?.AssociationFee2,
                currency: "USD",
              })}
          </Typography>
        </Box> */}

        {/* {listDetail?.data?.PropertySubType || listDetail?.data?.PropertyType ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              {process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME} Type
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.PropertySubType ||
                listDetail?.data?.PropertyType}
            </Typography>
          </Box>
        ) : null} */}

        {listDetail?.data?.PropertyType || listDetail?.data?.PropertySubType ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              MLS Type
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.PropertyType ||
                listDetail?.data?.PropertySubType}
            </Typography>
          </Box>
        ) : null}

        {listDetail?.data?.YearBuilt ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              Year Built
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.YearBuilt}
            </Typography>
          </Box>
        ) : null}

        {listDetail?.data?.LotSizeAcres &&
        listDetail?.data?.PropertySubType !== "Condominium" ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              Lot Size
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.LotSizeAcres} Acres
            </Typography>
          </Box>
        ) : null}
        {listDetail?.data?.CountyOrParish ? (
          <Box className={Styles.listingStatsItem}>
            <Typography className={Styles.listingStatsItemLeft}>
              County
            </Typography>
            <Typography className={Styles.listingStatsItemRight}>
              {listDetail?.data?.CountyOrParish}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
export default ListingDetailStats;
