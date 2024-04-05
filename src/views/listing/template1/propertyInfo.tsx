import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Styles from "../../../styles/listing/propertyInfo.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import DomainIcon from "@mui/icons-material/Domain";
import InfoIcon from "@mui/icons-material/Info";
import garage from "../../../assests/images/garage.png";
import parking from "../../../assests/images/parking.png";
import carport from "../../../assests/images/carport.png";
import Image from "next/image";
function PropertyInfo() {
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  return (
    <Box className={Styles.propertyInfoArea}>
      <Container>
        <Typography className={Styles.propertyInfoHeading}>
          Property Information
        </Typography>
        <Typography className={Styles.propertyInfoContent}>
          {listDetail?.data?.PublicRemarks}
        </Typography>
        <Box className={Styles.propertyInfoStatsArea}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <HotelIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading}>
                  {listDetail?.data?.BedroomsTotal}
                </Typography>
                <Typography className={Styles.propertyInfoStatsContent}>
                  Bedrooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <BathtubIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading}>
                  {listDetail?.data?.BathroomsFull}
                  {listDetail?.data?.BathroomsHalf
                    ? `/${listDetail?.data?.BathroomsHalf}`
                    : null}
                </Typography>
                <Typography className={Styles.propertyInfoStatsContent}>
                  Bathrooms
                </Typography>
              </Box>
            </Grid>
            {listDetail?.data?.parkingSpace ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className={Styles.propertyInfoStatsItem}>
                  <Image
                    width={80}
                    height={80}
                    style={{
                      cursor: "pointer",
                      objectFit: "contain",
                      zIndex: "999",
                      marginBottom: "25px",
                    }}
                    src={parking}
                    alt="MediaURL"
                  />
                  <Typography className={Styles.propertyInfoStatsHeading}>
                    {listDetail?.data?.parkingSpace || "0"}
                  </Typography>
                  <Typography className={Styles.propertyInfoStatsContent}>
                    Parking Spaces
                  </Typography>
                </Box>
              </Grid>
            ) : null}
            {listDetail?.data?.garageSpace ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className={Styles.propertyInfoStatsItem}>
                  <Image
                    width={80}
                    height={80}
                    style={{
                      cursor: "pointer",
                      objectFit: "contain",
                      zIndex: "999",
                      marginBottom: "25px",
                    }}
                    src={garage}
                    alt="MediaURL"
                  />
                  <Typography className={Styles.propertyInfoStatsHeading}>
                    {listDetail?.data?.garageSpace || "0"}
                  </Typography>
                  <Typography className={Styles.propertyInfoStatsContent}>
                    Garage Spaces
                  </Typography>
                </Box>
              </Grid>
            ) : null}
            {listDetail?.data?.carportSpace ? (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className={Styles.propertyInfoStatsItem}>
                  <Image
                    width={80}
                    height={80}
                    style={{
                      cursor: "pointer",
                      objectFit: "contain",
                      zIndex: "999",
                      marginBottom: "25px",
                    }}
                    src={carport}
                    alt="MediaURL"
                  />
                  <Typography className={Styles.propertyInfoStatsHeading}>
                    {listDetail?.data?.carportSpace || "0"}
                  </Typography>
                  <Typography className={Styles.propertyInfoStatsContent}>
                    Carport Spaces
                  </Typography>
                </Box>
              </Grid>
            ) : null}

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <AppsOutlinedIcon
                  sx={{ fontSize: "90px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  Living Space
                </Typography>
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  {listDetail?.data?.BuildingAreaTotal} sq/ft
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <CalendarMonthOutlinedIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  Year Built
                </Typography>
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  {listDetail?.data?.YearBuilt}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <CropSquareRoundedIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  Lot Size
                </Typography>
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  {listDetail?.data?.LotSizeAcres} Acres
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <DomainIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  Property Type
                </Typography>
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  {listDetail?.data?.PropertyType}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box className={Styles.propertyInfoStatsItem}>
                <InfoIcon
                  sx={{ fontSize: "80px", mb: "25px", color: "black" }}
                />
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  MLS Number
                </Typography>
                <Typography className={Styles.propertyInfoStatsHeading1}>
                  {listDetail?.data?.ListingIdMlsType1 ||
                    listDetail?.data?.ListingIdMlsType2 ||
                    listDetail?.data?.ListingId_FMLS}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />
        {listDetail?.data?.features?.length ? (
          <Box>
            <Typography className={Styles.propertyInfoHeading}>
              Included Amenities
            </Typography>
            <Box className={Styles.propertyInfoStatsArea}>
              <Grid container spacing={4}>
                {listDetail?.data?.features
                  ?.filter(
                    (value: any, index: number, self: any) =>
                      index ===
                      self.findIndex(
                        (t: any) =>
                          t.listing_category.id === value.listing_category.id
                      )
                  )
                  ?.map((item: any, index: number) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                      <Typography className={Styles.propertyFeatureItem}>
                        {item.listing_category.name}:{" "}
                        <span className={Styles.propertyFeatureItemContent}>
                          {listDetail?.data?.features
                            .filter(
                              (it: any) =>
                                item.listing_category.id ===
                                it.listing_category.id
                            )
                            ?.map((val: any) => val.name)
                            ?.join(", ")}
                        </span>
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
export default PropertyInfo;
