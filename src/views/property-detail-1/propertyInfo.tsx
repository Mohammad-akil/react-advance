import React, { memo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Styles from "../../styles/property-detail-1/propertyInfo.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAddress } from "../../utils/propertyAddressFormat";
function PropertyInfo() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Box id="property-info" className={Styles.propertyInfoArea}>
      <Typography className={Styles.propertyInfoHeading}>
        Property Information for {formatAddress(listDetail?.data)}
      </Typography>
      <Box
        className={Styles.propertyInfoDetailBox}
        sx={{ mt: "20px  !important" }}
      >
        <Typography
          className={Styles.propertyInfoDetailBoxHeading}
          variant="subtitle2"
          display="block"
          gutterBottom
        >
          Summary
        </Typography>
        <Box className={Styles.propertyInfoDetailBoxInner}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Location and General Information
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.CommunityFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Community Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.CommunityFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Directions ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Directions:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Directions}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.lakeName ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Lake Name:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        None
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.View?.length ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      View:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.View?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Coordinates ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Coordinates:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {typeof listDetail?.data?.Coordinates === "string"
                          ? listDetail?.data?.Coordinates
                          : listDetail?.data?.Coordinates?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                School Information
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.ElementarySchool ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Elementary School:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.ElementarySchool}
                      </span>
                    </Typography>
                  </li>
                ) : null}

                {listDetail?.data?.MiddleOrJuniorSchool ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Middle School:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.MiddleOrJuniorSchool}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.HighSchool ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      High School:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.HighSchool}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>

            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Taxes and HOA Information
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.ParcelNumber ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Parcel Number:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.ParcelNumber}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.TaxYear ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Tax Year:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.TaxYear}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.AssociationFeeIncludes ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Association Fee Includes:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.AssociationFeeIncludes?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.TaxLegalDescription ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Tax Legal Description:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.TaxLegalDescription}
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.TaxLot ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Tax Lot:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.TaxLot}
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
            <Grid item sm={12} md={6}>
              {listDetail?.data?.FMLS_VirtualTourURLUnbranded2 ? (
                <Typography
                  className={Styles.propertyInfoDetailBoxInnerHeading}
                >
                  Virtual Tour
                </Typography>
              ) : null}
              <ul>
                {listDetail?.data?.FMLS_VirtualTourURLUnbranded2 ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Virtual Tour Link PP:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                      component={"a"}
                      href={listDetail?.data?.FMLS_VirtualTourURLUnbranded2}
                      sx={{ color: "#7444A0 !important" }}
                    >
                      {listDetail?.data?.FMLS_VirtualTourURLUnbranded2}
                    </Typography>
                  </li>
                ) : null}
              </ul>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Parking
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                <li>
                  <Typography className={Styles.propertyInfoDetailBoxInnerDes}>
                    Open Parking:
                  </Typography>
                  <Typography
                    className={Styles.propertyInfoDetailBoxInnerDes}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {listDetail?.data?.OpenParkingYN ? "Yes" : "No"}
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        className={Styles.propertyInfoDetailBox}
        sx={{ borderBottom: "none !important" }}
      >
        <Typography
          className={Styles.propertyInfoDetailBoxHeading}
          variant="subtitle2"
          display="block"
          gutterBottom
        >
          Interior and Exterior Features
        </Typography>
        <Box className={Styles.propertyInfoDetailBoxInner}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Interior Features
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.Cooling ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Cooling:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.Cooling?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Heating ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Heating:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.Heating?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Appliances ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Appliances:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.Appliances?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Basement ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Basement:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Basement?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.FireplaceFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Fireplace Features:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.FireplaceFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Flooring ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Flooring:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Flooring?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.InteriorFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Interior Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.InteriorFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Levels ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Levels/Stories:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Levels?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.OtherEquipment ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Other Equipment:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.OtherEquipment?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.WindowFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Window Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.WindowFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.RoomKitchenFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Kitchen Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.RoomKitchenFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.RoomMasterBathroomFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Master Bathroom Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.RoomMasterBathroomFeatures?.join(
                          ", "
                        )}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.FoundationDetails ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Foundation:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.FoundationDetails?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.MainLevelBedrooms ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Main Bedrooms:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.MainLevelBedrooms}
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.BathroomsHalf ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Total Half Baths:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.BathroomsHalf}
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.BathroomsTotalInteger ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Bathrooms Total Integer:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.BathroomsTotalInteger}
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.MainLevelBathrooms ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Main Full Baths:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.MainLevelBathrooms}
                    </Typography>
                  </li>
                ) : null}

                {/* <li>
                  <Typography className={Styles.propertyInfoDetailBoxInnerDes}>
                    Additional Rooms:
                  </Typography>
                  <Typography
                 className={Styles.propertyInfoDetailBoxInnerSubHeading}
                    variant="subtitle2"
                    gutterBottom
                  >
                    --
                  </Typography>
                </li> */}
                {listDetail?.data?.BathroomsTotalDecimal ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Bathrooms Total Decimal:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.BathroomsTotalDecimal}
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Exterior Features
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.AccessibilityFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Accessibility Features:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.AccessibilityFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.ConstructionMaterials ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Construction Materials:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.ConstructionMaterials?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Fencing ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Fencing:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.Fencing?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.HorseAmenities ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Horse Amenities:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.HorseAmenities?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.PatioAndPorchFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Patio And Porch Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.PatioAndPorchFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.PoolFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Pool Features:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.PoolFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.RoadSurfaceType ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Road Surface Type:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.RoadSurfaceType?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Roof ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Roof Type:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Roof?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.SecurityFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Security Features:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.SecurityFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.SpaFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Spa Features:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.SpaFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.LaundryFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Laundry Features:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.LaundryFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}

                <li>
                  <Typography className={Styles.propertyInfoDetailBoxInnerDes}>
                    Pool Private:
                  </Typography>
                  <Typography
                    className={Styles.propertyInfoDetailBoxInnerDes}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {listDetail?.data?.PoolPrivateYN ? "Yes" : "No"}
                  </Typography>
                </li>
                {listDetail?.data?.RoadFrontageType ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Road Frontage Type:
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.RoadFrontageType?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.OtherStructures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Other Structures:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.OtherStructures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        className={Styles.propertyInfoDetailBox}
        sx={{ borderBottom: "none  !important" }}
      >
        <Typography
          className={Styles.propertyInfoDetailBoxHeading}
          variant="subtitle2"
          display="block"
          gutterBottom
        >
          Property
        </Typography>
        <Box className={Styles.propertyInfoDetailBoxInner}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Utilities
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.Sewer ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Sewer:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Sewer?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Utilities ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Utilities:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.Utilities?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.WaterSource ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Water Source:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.WaterSource?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.Electric ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Electric:{" "}
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.Electric?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
              <br />
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Property and Assessments
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                <li>
                  <Typography className={Styles.propertyInfoDetailBoxInnerDes}>
                    Home Warranty:
                  </Typography>
                  <Typography
                    className={Styles.propertyInfoDetailBoxInnerDes}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {listDetail?.data?.View?.HomeWarrantyYN ? "Yes" : "No"}
                  </Typography>
                </li>
                {listDetail?.data?.PropertyCondition ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Property Condition:
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.PropertyCondition?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Green Features
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.GreenEnergyEfficient ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Green Energy Efficient:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.GreenEnergyEfficient?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.GreenEnergyGeneration ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Green Energy Generation:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.GreenEnergyGeneration?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
              <br />
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Lot Information
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                {listDetail?.data?.AboveGradeFinishedArea ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Above Grade Finished Area:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.AboveGradeFinishedArea}
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.CommonWalls ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Common Walls:
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.CommonWalls?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.LotFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Lot Features:
                      <span
                        className={Styles.propertyInfoDetailBoxInnerSubHeading}
                      >
                        {listDetail?.data?.LotFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
                {listDetail?.data?.WaterfrontFeatures ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Waterfront Footage:{" "}
                      <span className={Styles.propertyInfoDetailBoxInnerDes}>
                        {listDetail?.data?.WaterfrontFeatures?.join(", ")}
                      </span>
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {listDetail?.data?.UnitNumber || listDetail?.data?.BuildingAreaUnits ? (
        <Box
          className={Styles.propertyInfoDetailBox}
          sx={{ borderBottom: "none  !important" }}
        >
          <Typography
            className={Styles.propertyInfoDetailBoxHeading}
            variant="subtitle2"
            display="block"
            gutterBottom
          >
            Multi Family
          </Typography>
          <Box className={Styles.propertyInfoDetailBoxInner}>
            <Grid container spacing={4}>
              {listDetail?.data?.UnitNumber ||
              listDetail?.data?.BuildingAreaUnits ? (
                <Grid item sm={12} md={6}>
                  <Typography
                    className={Styles.propertyInfoDetailBoxInnerHeading}
                    variant="subtitle2"
                    gutterBottom
                  >
                    Multi-Family Information
                  </Typography>
                  <ul style={{ paddingLeft: "16px" }}>
                    {listDetail?.data?.UnitNumber ? (
                      <li>
                        <Typography
                          className={Styles.propertyInfoDetailBoxInnerDes}
                        >
                          # Of Units In Community:{" "}
                        </Typography>
                        <Typography
                          className={Styles.propertyInfoDetailBoxInnerDes}
                          variant="subtitle2"
                          gutterBottom
                        >
                          {listDetail?.data?.UnitNumber}
                        </Typography>
                      </li>
                    ) : null}
                    {listDetail?.data?.BuildingAreaUnits ? (
                      <li>
                        <Typography
                          className={Styles.propertyInfoDetailBoxInnerDes}
                        >
                          Number of Units To Be Built:
                        </Typography>
                        <Typography
                          className={Styles.propertyInfoDetailBoxInnerDes}
                          variant="subtitle2"
                          gutterBottom
                        >
                          {listDetail?.data?.BuildingAreaUnits}
                        </Typography>
                      </li>
                    ) : null}
                  </ul>
                </Grid>
              ) : null}
            </Grid>
          </Box>
        </Box>
      ) : null}

      <Box className={Styles.propertyInfoDetailBox}>
        <Typography
          className={Styles.propertyInfoDetailBoxHeading}
          variant="subtitle2"
          display="block"
          gutterBottom
        >
          Rental
        </Typography>
        <Box className={Styles.propertyInfoDetailBoxInner}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Typography className={Styles.propertyInfoDetailBoxInnerHeading}>
                Rent Information
              </Typography>
              <ul style={{ paddingLeft: "16px" }}>
                <li>
                  <Typography className={Styles.propertyInfoDetailBoxInnerDes}>
                    Land Lease:{" "}
                  </Typography>
                  <Typography
                    className={Styles.propertyInfoDetailBoxInnerDes}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {listDetail?.data?.LandLeaseYN ? "Yes" : "No"}
                  </Typography>
                </li>
                {listDetail?.data?.OccupantType ? (
                  <li>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                    >
                      Occupant Types:
                    </Typography>
                    <Typography
                      className={Styles.propertyInfoDetailBoxInnerDes}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {listDetail?.data?.OccupantType}
                    </Typography>
                  </li>
                ) : null}
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
export default memo(PropertyInfo);
