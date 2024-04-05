import React from "react";
import { Box, useMediaQuery, Button, Typography } from "@mui/material";
import Styles from "../../styles/property-detail-1/mbHeader.module.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
function MBPaginationHeader() {
  const isExtraSmallScreen = useMediaQuery("(max-width: 575px)");
  const router = useRouter();
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { paginationList, backLink } = useSelector(
    (state: RootState) => state.propertyList
  );
  const handleFindList = (type: any) => {
    let index = paginationList?.findIndex(
      (it: any) => it?.ListingId === listDetail?.data?.ListingId
    );
    if (type === "prev") {
      return paginationList[index - 1] ? true : false;
    } else {
      return paginationList[index + 1] ? true : false;
    }
  };

  const handleRedirect = (type: any) => {
    let index = paginationList?.findIndex(
      (it: any) => it?.ListingId === listDetail?.data?.ListingId
    );
    if (type === "prev") {
      router.push(
        `/property/${paginationList[index - 1].ListingId}/${
          paginationList[index - 1].route
        }`
      );
    } else {
      router.push(
        `/property/${paginationList[index + 1].ListingId}/${
          paginationList[index + 1].route
        }`
      );
    }
  };

  return isExtraSmallScreen &&
    process.env.NEXT_PUBLIC_THEME === "2" &&
    paginationList?.findIndex(
      (it: any) => it?.ListingId === listDetail?.data?.ListingId
    ) >= 0 ? (
    <Box className={Styles.mbHeaderArea}>
      {" "}
      <Typography
        variant="subtitle2"
        display="block"
        gutterBottom
        className={Styles.shortCutBarBackLink}
        onClick={() => router.push(`${backLink}`)}
      >
        <ArrowBackIosRoundedIcon sx={{ color: "black", fontSize: "22px" }} />
        <Typography sx={{ mt: "1px" }} className={Styles.shortCutBarBackLink}>
          {" "}
          Back to Results
        </Typography>
      </Typography>
      {paginationList?.findIndex(
        (it: any) => it?.ListingId === listDetail?.data?.ListingId
      ) >= 0 ? (
        <Box className={Styles.paginationArea}>
          <Button
            variant="text"
            size="small"
            className={Styles.paginationAreaItem}
            onClick={() => handleRedirect("prev")}
            disabled={handleFindList("prev") ? false : true}
          >
            <ArrowBackIosRoundedIcon
              fontSize="small"
              sx={{
                color: handleFindList("prev") ? "black" : "#dddddd",
                fontSize: "17px",
              }}
            />
            <Typography className={Styles.paginationAreaItemText}>
              Previous
            </Typography>
          </Button>

          <Typography className={Styles.paginationAreaItemText}>
            {paginationList?.findIndex(
              (it: any) => it?.ListingId === listDetail?.data?.ListingId
            ) + 1}{" "}
            of {paginationList?.length}
          </Typography>
          <Button
            variant="text"
            size="small"
            className={Styles.paginationAreaItem}
            onClick={() => handleRedirect("next")}
            disabled={handleFindList("next") ? false : true}
          >
            <Typography className={Styles.paginationAreaItemText}>
              Next
            </Typography>
            <ArrowForwardIosRoundedIcon
              sx={{
                color: handleFindList("next") ? "black" : "#dddddd",
                fontSize: "17px",
              }}
            />
          </Button>
        </Box>
      ) : null}{" "}
    </Box>
  ) : null;
}

export default MBPaginationHeader;
