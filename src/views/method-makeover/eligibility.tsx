import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Styles from "../../styles/makeover/eligibility.module.css";
function EligibilityArea() {
  return (
    <Box className={Styles.eligibilityArea}>
      <Typography className={Styles.eligibilityHeading}>
        ELIGIBILITY & RESTRICTIONS
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={Styles.eligibilityItem}>
            <Typography className={Styles.eligibilityItemContent}>
              The program is available to all Sellers with an exclusive listing
              agreement with Method.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={Styles.eligibilityItem}>
            <Typography className={Styles.eligibilityItemContent}>
              There must be sufficient equity in your home to cover the cost of
              the improvements. Properties that are in foreclosure or short sale
              are not eligible or the program
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className={Styles.eligibilityItem}>
            <Typography className={Styles.eligibilityItemContent}>
              Prospective Sellers interested in participating must review and
              execute the Method Makeover service agreement outlining the
              program services.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {" "}
          <Box className={Styles.eligibilityItemL}>
            <Typography className={Styles.eligibilityItemContent}>
              Structural improvements (additions, foundations, etc) will not be
              covered.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default EligibilityArea;
