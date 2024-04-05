import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Styles from "../../styles/makeover/coverage.module.css";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import coverage from "../../assests/images/coverage.jpg";
import Image from "next/image";
function Coverage() {
  return (
    <Box className={Styles.coverageArea}>
      <Typography className={Styles.coverageHeading}>Coverage</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={4.5}>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />{" "}
            Deep Cleaning
          </Typography>
          <Typography className={Styles.coverageItemContent}>
            Examples: Carpet Cleaning, Stain Removal, Scratch Repair, Bathroom
            and Kitchen Sink/Tub Resurfacing, Appliance Cleaning
          </Typography>
          <br />
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />{" "}
            Landscaping
          </Typography>
          <Typography className={Styles.coverageItemContent}>
            Examples: Lawn and Bed Maintenance, Flower Bedding, Tree Trimming,
            PowerWashing, Deck Painting, Gutter Cleaning, Pruning, Mulching,
            Flower Beds
          </Typography>
          <br />
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />{" "}
            Cosmetic Renovations
          </Typography>
          <Typography className={Styles.coverageItemContent}>
            Examples: Cabinetry Refinishing, New Cabinetry/Countertops, Light
            Fixtures, Window Furnishings, Window Replacement, Carpet and
            Hardwood replacement, Popcorn Ceiling Removal
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />{" "}
            Interior and Exterior Painting
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />{" "}
            Water Heater Replacement
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Appliance Replacement
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Pool Maintenance
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Electrical Work
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Plumbing Repairs
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Sewer Lateral Inspections & Remediation
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Custom Closet Work
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Seller Side Inspections and Evaluations
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Pest Control & Remediation
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Moving and Storage
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Roof Repairs
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            Water Mitigation
          </Typography>
          <Typography className={Styles.coverageSubHeading}>
            {" "}
            <FiberManualRecordRoundedIcon
              sx={{ color: "black", fontSize: "8px !important", mt: "8px" }}
            />
            HVAC Repair/Replacement
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={3.5}>
          <Box className={Styles.coverageBanner}>
            <Image
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={300}
              height={500}
              src={coverage}
              alt="MediaURL"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Coverage;
