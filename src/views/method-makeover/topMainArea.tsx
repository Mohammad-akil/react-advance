import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Styles from "../../styles/makeover/main.module.css";
import before_after from "../../assests/images/before_after.jpg";
import Image from "next/image";
function TopMainArea() {
  return (
    <Box className={Styles.topMainArea}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Box className={Styles.topBanner}>
            <Image
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={300}
              height={500}
              src={before_after}
              alt="MediaURL"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography className={Styles.bannerHeading}>
            COULD YOUR HOME USE A MAKEOVER?
          </Typography>
          <Typography className={Styles.bannerDescription}>
            The Method Makeover program is designed to prepare your home for
            market. From deep-cleaning to painting, carpet, lighting,
            countertops…you name it, we will work together to assess
            opportunities to elevate your homes value.
          </Typography>
          <br />
          <Typography className={Styles.bannerDescription}>
            The Method Makeover program fronts all of the costs associated with
            updating your home, and payment for the work is collected at
            closing, with <span>NO interest</span> and <span>NO fees</span> to
            the Seller, <span>ever</span>.
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography className={Styles.topAreaDescription}>
        While the below is not a comprehensive guide of all services that may be
        covered, it should serve as a high level reference for what its
        generally allowed. Some work may require additional details before
        approval and Method reserves the right to deny any services, at any
        time, for any reason.
      </Typography>
      <br />
      <Typography className={Styles.topAreaDescription}>
        If you have any questions please reach out to makeover@ourmethod.com
      </Typography>
    </Box>
  );
}
export default TopMainArea;
