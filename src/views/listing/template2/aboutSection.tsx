import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Button } from "@mui/material";
import Styles from "../../../styles/listing1/about.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
function AboutSection() {
  const [isActiveView, setActiveView] = useState<Boolean>(false);
  const shouldScrollRef = useRef<boolean>(false);
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  useEffect(() => {
    const handleScroll = () => {
      // Replace 'targetElementId' with the actual ID of the element you want to track
      const targetElement = document.getElementById("listing-01-about-section");

      if (targetElement) {
        const { top, bottom } = targetElement.getBoundingClientRect();
        const isInViewport = top >= 0 && bottom <= window.innerHeight;

        if (isInViewport && !shouldScrollRef.current) {
          // Element is in the viewport, show alert or perform any action
          setActiveView(true);
          shouldScrollRef.current = true;
        } else if (!isInViewport && shouldScrollRef.current) {
          setActiveView(false);
          shouldScrollRef.current = false;
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box id="listing-01-about-section" className={Styles.section}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          {" "}
          <div
            id="arrow-overview"
            className={`${Styles.arrowMaskWrap} ${
              isActiveView ? Styles.arrowMaskRightAffix : Styles.arrowMaskRight
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94.33 17.9">
              <defs>
                <style>
                  {".cls-1{fill:#fff;stroke:#231f20;stroke-miterlimit:10}"}
                </style>
              </defs>
              <g id="arrow-right-long" data-name="arrow-right-long-Layer 2">
                <g
                  id="arrow-right-long-Layer_1-2"
                  data-name="arrow-right-long-Layer 1"
                >
                  <path
                    className="cls-1"
                    d="M84.59 0.37L93.6 8.57 84.59 17.55"
                  />
                  <path className="cls-1" d="M93.6 8.57L0 8.57" />
                </g>
              </g>
            </svg>
          </div>
          <h2 className={Styles.sectionTitle}>
            About <br /> the Property
          </h2>
          <Box
            className={`${Styles.fullWidth} ${Styles.my4} ${Styles.aboutButtonArea}`}
          >
            <Button
              onClick={() => {
                document
                  .getElementById("listing-01-contact-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start",
                  });
              }}
              variant="outlined"
              className={Styles.getInTouchButton}
            >
              Get in Touch
            </Button>
            <Button
              className={Styles.scheduleTourButton}
              startIcon={<CalendarMonthIcon />}
              variant="contained"
              onClick={() => {
                document
                  .getElementById("listing-01-contact-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start",
                  });
              }}
            >
              Schedule a Tour
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          {" "}
          <Box className={Styles.propertyDescription}>
            <Box
              className={`${Styles.viewOpenHouseDate}`} /* className="view view-virtual-open-house view-id-virtual_open_house view-display-id-panel_property view-open-house-date view-display-id-block-plain voh-slider mls-hide view-dom-id-968c63f436012fbfc94850d137869495" */
            ></Box>
            <p>{listDetail?.data?.PublicRemarks}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default AboutSection;
