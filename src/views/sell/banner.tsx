import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import Style from "../../styles/sell.module.css";
import image_01 from "../../assests/images/sell/image_01.png";
import Image from "next/image";
function BannerSection() {
  return (
    <Box className={Style.bannerSection}>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={5}>
            <Box className={Style.bannerLeftSection}>
              <Box className={Style.bannerLeftSectionInner}>
                <Typography className={Style.bannerSectionHeading}>
                  Sell your home with Method
                </Typography>
                <Typography className={Style.bannerSectionDes}>
                  Whether you're ready to sell or in search of solutions, we'll
                  offer region-specific guidance to support you every step of
                  the way.
                </Typography>
                <Box className={Style.borderBottom}></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Box className={Style.bannerImageArea}>
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
                  src={image_01}
                  priority
                  alt="MediaURL"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BannerSection;
