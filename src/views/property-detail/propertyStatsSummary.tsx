import Styles from "../../styles/property-detail/statdetail.module.css";
import { Box, Stack, Typography, Chip } from "@mui/material";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { NumberFormat } from "../../utils/numberFormat";
import { ListingColors } from "../../utils/listingStatusColor";
import moment from "moment-timezone";
import { getAcres } from "../../utils/propertyAddressFormat";
function PropertyStatSummary() {
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
    <Box className={Styles.statSummaryArea}>
      <Box className={Styles.statSummaryStats}>
        <Box
          className={Styles.statSummaryStatsItem}
          sx={{ paddingBottom: "5px !important" }}
        >
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              Status:
            </Typography>
            <Chip
              size="small"
              label={listDetail?.data?.StandardStatus}
              color="success"
              sx={{
                fontWeight: "600",
                minWidth: "80px",
                backgroundColor:
                  ListingColors[listDetail?.data?.StandardStatus] || "#000000",
              }}
            />
          </Stack>
        </Box>
        <Box className={Styles.statSummaryStatsItem}>
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              Property Type:
            </Typography>
            <Typography className={Styles.statSummaryStatsItemValues}>
              {listDetail?.data?.PropertySubType ||
                listDetail?.data?.PropertyType}
            </Typography>
          </Stack>
        </Box>
        <Box className={Styles.statSummaryStatsItem}>
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              MLS #:
            </Typography>
            <Typography className={Styles.statSummaryStatsItemValues}>
              {listDetail?.data?.ListingId}
            </Typography>
          </Stack>
        </Box>
        
        {(listDetail?.data?.BuildingAreaTotal &&
          listDetail?.data?.BuildingAreaTotal > 0) ||
        (listDetail?.data?.AboveGradeFinishedArea &&
          listDetail?.data?.AboveGradeFinishedArea > 0) ? (
          <Box className={Styles.statSummaryStatsItem}>
            <Stack direction={"row"} spacing={1}>
              <Typography className={Styles.statSummaryStatsItemHeading}>
                Sq. Feet:
              </Typography>
              <Typography className={Styles.statSummaryStatsItemValues}>
                {NumberFormat({
                  number: listDetail?.data?.BuildingAreaTotal,
                }) || "0"}
              </Typography>
            </Stack>
          </Box>
        ) : null}

        <Box className={Styles.statSummaryStatsItem}>
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              Days on Site:
            </Typography>
            {listDetail?.data?.CumulativeDaysOnMarket ||
            listDetail?.data?.DaysOnMarket ? (
              <Typography className={Styles.statSummaryStatsItemValues}>
                {listDetail?.data?.CumulativeDaysOnMarket ||
                  listDetail?.data?.DaysOnMarket}{" "}
              </Typography>
            ) : (
              <Typography className={Styles.statSummaryStatsItemValues}>
                {" "}
                {handleCalcDaysOnMarket()}
              </Typography>
            )}
          </Stack>
        </Box>
        <Box className={Styles.statSummaryStatsItem}>
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              Lot Size:
            </Typography>
            <Typography className={Styles.statSummaryStatsItemValues}>
              {getAcres(listDetail?.data)} Acres
            </Typography>
          </Stack>
        </Box>
        <Box className={Styles.statSummaryStatsItem}>
          <Stack direction={"row"} spacing={1}>
            <Typography className={Styles.statSummaryStatsItemHeading}>
              County:
            </Typography>
            <Typography className={Styles.statSummaryStatsItemValues}>
              {listDetail?.data?.CountyOrParish}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Typography className={Styles.statSummaryContent}>
        {listDetail?.data?.PublicRemarks}
      </Typography>
    </Box>
  );
}
export default PropertyStatSummary;
