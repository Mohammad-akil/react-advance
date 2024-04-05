import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Styles from "../../../styles/listing/topBanner.module.css";
import Image from "next/image";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import { NumberFormat } from "../../../utils/numberFormat";
import { getMediaForWebp } from "../../../utils/common";
const sampleIMage =
  "https://method-idx.s3.amazonaws.com/midx-assets/defaultPropertyNoImage.png";
function TopBanner() {
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  return (
    <Box className={Styles.imageContainer}>
      <Image
        src={
          listDetail?.data?.images?.find((item: any) => item.isPrimary)
            ?.MediaUrl
            ? getMediaForWebp(
                listDetail?.data?.images?.find((item: any) => item.isPrimary)
                  ?.MediaUrl || "",
                "large"
              )
            : listDetail?.data?.images?.[0]?.MediaUrl
            ? getMediaForWebp(
                listDetail?.data?.images?.[0]?.MediaUrl || "",
                "large"
              )
            : sampleIMage
        }
        alt="Banner Image"
        sizes="100vw"
        className={Styles.responsiveImage}
        height={600}
        width={600}
        loading="lazy"
      />
      <Box className={Styles.bannerContent}>
        <Box className={Styles.bannerContentInner}>
          <Typography className={Styles.bannerContentHeading}>
      {listDetail?.data?.transaction_listings_v2?.street}
          </Typography>
          <Typography className={Styles.bannerContentContent}>
            {listDetail?.data?.transaction_listings_v2?.city},{" "}
            {listDetail?.data?.transaction_listings_v2?.state}{" "}
            {listDetail?.data?.transaction_listings_v2?.zipcode}
          </Typography>
          <Box className={Styles.bannerStats}>
            <Box className={Styles.bannerStatsItem}>
              {listDetail?.data?.BedroomsTotal} Bedrooms
            </Box>
            <CircleIcon sx={{ fontSize: "10px", color: "white" }} />
            <Box className={Styles.bannerStatsItem}>
              {" "}
              {listDetail?.data?.BathroomsFull}
              {listDetail?.data?.BathroomsHalf
                ? `/${listDetail?.data?.BathroomsHalf}`
                : null}{" "}
              Bathrooms
            </Box>
            <CircleIcon sx={{ fontSize: "10px", color: "white" }} />
            <Box className={Styles.bannerStatsItem}>
              {listDetail?.data?.ListPrice || listDetail?.data?.LeasePrice
                ? NumberFormat({
                    number: listDetail?.data?.transaction_listings_v2?.is_rental
                      ? listDetail?.data?.LeasePrice
                      : listDetail?.data?.ListPrice,
                    currency: "USD",
                  })
                : null}
            </Box>
          </Box>
          <Box className={Styles.buttonArea}>
            <Button
              onClick={() => {
                document
                  .getElementById("listing-contact-form")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start",
                  });
              }}
              variant="contained"
              className={Styles.scheduleVisitBtn}
            >
              Schedule Visit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default TopBanner;
