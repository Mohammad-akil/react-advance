import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Style from "../../styles/sell.module.css";
import Image from "next/image";
import image_02 from "../../assests/images/sell/image_02.png";
import image_03 from "../../assests/images/sell/image_03.jpg";
function MethodSection() {
  return (
    <Box className={Style.methodSection}>
      <Container>
        <Typography className={Style.makeoverSectionHeading}>
          Your Home, Our Method
        </Typography>
        <Box className={Style.descriptionSection}>
          <Typography className={Style.makeoverSectionDesc}>
            Collaborating with our internal marketing team, your agent will
            focus on reaching the ideal audience through the most impactful
            channels. Our unified brand identity will enhance the aesthetic and
            narrative of your home.
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: "30px" }}>
          <Grid item xs={12} sm={12} md={6}>
            {" "}
            <Box className={Style.methodImageArea}>
              <Box className={Style.methodImageContainer1}>
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
                  src={image_02}
                  priority
                  alt="MediaURL"
                />
              </Box>
            </Box>
            <br />
            <br />
            <Typography
              className={Style.makeoverSectionDesc}
              sx={{ textAlign: "center !important", mt: "20px" }}
            >
              Alongside in-person marketing strategies, we utilize over 120
              online portals to enable us to tap into diverse audiences,
              ensuring that your property is visible to anyone, regardless of
              their preferred online platform.
            </Typography>
            <Typography
              className={Style.makeoverSectionDesc}
              sx={{ textAlign: "center !important" }}
            >
              Our commitment lies in leaving no stone unturned when it comes to
              presenting your home to potential buyers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {" "}
            <Box className={Style.methodImageArea}>
              <Box className={Style.methodImageContainer}>
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
                  src={image_03}
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

export default MethodSection;
