import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Styles from "../../styles/property-detail/tourDirection.module.css";
import Image from "next/image";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { formatAddress } from "../../utils/propertyAddressFormat";
import ScheduleTour from "./scheduleTour";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";

const sampleIMage =
  "https://method-idx.s3.amazonaws.com/midx-assets/defaultPropertyNoImage.png";
function TourDirection() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Box className={Styles.tourDirectionsArea}>
      <Typography className={Styles.tourDirectionsHeading}>
        SCHEDULE A TOUR
      </Typography>
      <Grid container spacing={0} className={Styles.tourDirectionsContainer}>
        <Grid item xs={12} sm={12} md={6}>
          <Image
            sizes="100vw"
            style={{
              zIndex: "5",
              width: "100%",
              height: "100%",
              cursor: "pointer",
              objectFit: "cover",
            }}
            width={500}
            height={300}
            src={getOptimizedImageUrl(
              listDetail?.data?.MediaURL?.[0] ||
                listDetail?.data?.Media?.[0]?.MediaURL ||
                sampleIMage,
              "640x480"
            )}
            unoptimized={
              isOptimizedImage(
                listDetail?.data?.MediaURL?.[0] ||
                  listDetail?.data?.Media?.[0]?.MediaURL ||
                  sampleIMage
              )
                ? true
                : false
            }
            alt="MediaURL"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box className={Styles.tourDirectionArea}>
            <Typography className={Styles.tourDirectionAreaHeading}>
              GO SEE THIS LISTING
            </Typography>
            <Typography className={Styles.tourDirectionAreaAddress}>
              {formatAddress({
                ...listDetail?.data,
                isFullAddressNeeded: true,
              })}
            </Typography>
            <ScheduleTour isAllowOnlyCalendar={"true"} />
            <Box className={Styles.tourDirectionButtons}>
              <a
                href={`https://www.google.com/maps/dir/${formatAddress({
                  ...listDetail?.data,
                  isFullAddressNeeded: true,
                })?.replaceAll(" ", "+")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  startIcon={<NearMeOutlinedIcon />}
                  variant="outlined"
                  size="large"
                  color="inherit"
                  className={Styles.tourDirectionButton}
                >
                  Get Directions
                </Button>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default TourDirection;
