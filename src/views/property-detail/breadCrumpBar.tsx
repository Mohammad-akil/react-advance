import React, { useEffect } from "react";
import Styles from "../../styles/property-detail/breadcrump.module.css";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import Link from "next/link";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/store";
import { getPropertyList, handleUpdateParams } from "../../store/property-list";
function BreadCrumpBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { paginationList, paginationCount, pageNumber, backLink,customParams } = useSelector(
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
      if (
        !paginationList[index + 2] &&
        paginationCount > paginationList?.length
      ) {
        dispatch(
          handleUpdateParams({
            field: "start",
            value: (pageNumber - 1) * 20,
            pageNumber: pageNumber,
          })
        );
        setTimeout(() => {
          if (backLink?.split("?")[0] === "/") {
            dispatch(
              getPropertyList({ status: "(Active OR 'Coming Soon')", rows: 20 })
            );
          }else if (Object.keys(customParams)?.length) {
            dispatch(getPropertyList({ customParams: customParams }));
          } else {
            dispatch(getPropertyList({}));
          }
        }, 3000);
      }
      router.push(
        `/property/${paginationList[index + 1].ListingId}/${
          paginationList[index + 1].route
        }`
      );
    }
  };


  return (
    <Box className={Styles.breadCrumpArea}>
      <Container maxWidth="xl">
        <Box className={Styles.breadCrumpInnerArea}>
          <Stack
            className={Styles.breadCrumpInnerAreaLeft}
            direction={"row"}
            alignItems={"center"}
            spacing={0.3}
          >
            <Typography className={Styles.breadCrumpText}>Home</Typography>
            <NavigateNextIcon fontSize="small" sx={{ color: "grey" }} />
            <Typography className={Styles.breadCrumpText}>
              Property Search
            </Typography>
            <NavigateNextIcon fontSize="small" sx={{ color: "grey" }} />
            <Typography className={Styles.breadCrumpTextLast}>
              {listDetail?.data?.ListingId
                ? `MLS #${listDetail?.data?.ListingId}`
                : "Property Detail"}{" "}
            </Typography>
          </Stack>
          <Box className={Styles.breadCrumpRightArea}>
            <Link
              href="/property-search/results"
              className={Styles.breadCrumpPCLink}
            >
              {" "}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />{" "}
                <Typography className={Styles.breadCrumpText}>
                  Back to Results
                </Typography>
              </Stack>
            </Link>
            <Link href="/" className={Styles.breadCrumpMobileLink}>
              {" "}
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ minWidth: "30px", color: "grey" }}
              >
                <KeyboardDoubleArrowUpOutlinedIcon
                  sx={{ color: "grey" }}
                  fontSize="small"
                />
              </Button>
            </Link>

            {handleFindList("prev") ? (
              <Typography
                onClick={() => handleRedirect("prev")}
                className={Styles.breadCrumpRightPcItem}
              >
                {" "}
                <ArrowBackIosNewRoundedIcon sx={{ fontSize: "16px" }} /> Prev
              </Typography>
            ) : null}
            {handleFindList("next") ? (
              <Typography
                onClick={() => handleRedirect("next")}
                className={Styles.breadCrumpRightPcItem}
              >
                {" "}
                Next <ArrowForwardIosRoundedIcon sx={{ fontSize: "16px" }} />
              </Typography>
            ) : null}

            {handleFindList("prev") ? (
              <Typography
                onClick={() => handleRedirect("prev")}
                className={Styles.breadCrumpRightMbItem}
              >
                {" "}
                <ArrowBackIosNewRoundedIcon sx={{ fontSize: "16px" }} />
              </Typography>
            ) : null}
            {handleFindList("next") ? (
              <Typography
                onClick={() => handleRedirect("next")}
                className={Styles.breadCrumpRightMbItem}
              >
                {" "}
                <ArrowForwardIosRoundedIcon sx={{ fontSize: "16px" }} />
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default BreadCrumpBar;
