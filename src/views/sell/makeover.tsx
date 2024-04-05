import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import Style from "../../styles/sell.module.css";
import before_after from "../../assests/images/before_after.jpg";
import Image from "next/image";
import EastIcon from "@mui/icons-material/East";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { useRouter } from "next/navigation";
function MakeOverSection() {
  const router = useRouter();
  return (
    <Box className={Style.makeoverSection}>
      <Container>
        <Typography className={Style.makeoverSectionHeading}>
          Could your home use a Makeover?
        </Typography>
        <Box className={Style.descriptionSection}>
          <Typography className={Style.makeoverSectionDesc}>
            The Method Makeover program is designed to prepare your home for
            market. From deep-cleaning to painting, carpet, lighting,
            countertops… you name it, we will work together to assess
            opportunities to elevate your homes value.
          </Typography>
        </Box>
        <Box className={Style.makeoverContentSection}>
          <Grid container spacing={6} alignItems={"center"}>
            <Grid item xs={12} sm={12} md={5.5}>
              {" "}
              <Box className={Style.imageContainer}>
                <Image
                  sizes="100vw"
                  width={500}
                  height={300}
                  className={Style.responsiveImage}
                  objectFit="contain"
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  src={before_after}
                  priority
                  alt="MediaURL"
                />
              </Box>
              <br />
              <br /> <br />
              <Box className={Style.buttonSection}>
                <Button
                  endIcon={<EastIcon />}
                  className={Style.submitButton}
                  variant="contained"
                  onClick={() => router.push(`/method-makeover`)}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6.5}>
              <Typography className={Style.makeoverContentRightTop}>
                Our program fronts all of the costs associated with updating
                your home, and payment for the work is collected at closing,
                with <span>NO</span> interest and <span>NO</span> fees to the
                Seller, <span>ever</span>.
              </Typography>
              <Typography className={Style.coverageHeading}>
                Coverage Includes:
              </Typography>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  {" "}
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />{" "}
                    Deep Cleaning
                  </Typography>
                  <Typography className={Style.coverageItemContent}>
                    Examples: Carpet Cleaning, Stain Removal, Scratch Repair,
                    Bathroom and Kitchen Sink/Tub Resurfacing, Appliance
                    Cleaning
                  </Typography>
                  <br />
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />{" "}
                    Landscaping
                  </Typography>
                  <Typography className={Style.coverageItemContent}>
                    Examples: Lawn and Bed Maintenance, Flower Bedding, Tree
                    Trimming, PowerWashing, Deck Painting, Gutter Cleaning,
                    Pruning, Mulching, Flower Beds
                  </Typography>
                  <br />
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />{" "}
                    Cosmetic Renovations
                  </Typography>
                  <Typography className={Style.coverageItemContent}>
                    Examples: Cabinetry Refinishing, New Cabinetry/Countertops,
                    Light Fixtures, Window Furnishings, Window Replacement,
                    Carpet and Hardwood replacement, Popcorn Ceiling Removal
                  </Typography>
                  <br />
                </Grid>
                <Grid item sm={12} md={6}>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />{" "}
                    Interior and Exterior Painting
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />{" "}
                    Water Heater Replacement
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Appliance Replacement
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Pool Maintenance
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Electrical Work
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Plumbing Repairs
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Sewer Lateral Inspections & Remediation
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Custom Closet Work
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Seller Side Inspections and Evaluations
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Pest Control & Remediation
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Moving and Storage
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Roof Repairs
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    Water Mitigation
                  </Typography>
                  <Typography className={Style.coverageSubHeading}>
                    {" "}
                    <FiberManualRecordRoundedIcon
                      sx={{
                        color: "black",
                        fontSize: "8px !important",
                        mt: "8px",
                      }}
                    />
                    HVAC Repair/Replacement
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default MakeOverSection;
