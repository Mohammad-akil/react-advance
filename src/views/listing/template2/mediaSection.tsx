import React, { useState, useEffect,useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import Styles from "../../../styles/listing1/media.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
function MediaSection() {
  const [isActiveView, setActiveView] = useState<Boolean>(false);
  const shouldScrollRef = useRef<boolean>(false);
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  useEffect(() => {
    const handleScroll = () => {
      // Replace 'targetElementId' with the actual ID of the element you want to track
      const targetElement = document.getElementById("showcase");

      if (targetElement) {
        const { top, bottom } = targetElement.getBoundingClientRect();
        const isInViewport = top >= 0 && bottom <= window.innerHeight;

        if (isInViewport && !shouldScrollRef.current) {
          // Element is in the viewport, show alert or perform any action
          // console.log('Scrolling to the target element!');
          setActiveView(true);
          shouldScrollRef.current = true;
        } else if (!isInViewport && shouldScrollRef.current) {
          // console.log('Scrolling to the other elements!');
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
  return listDetail?.data?.Matterport ? (
    <Box id="showcase" className={Styles.section}>
      <Box>
        <Box className={Styles.bgDots}></Box>
        <Box className={Styles.cut}></Box>
        <Container>
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ order: [1, 2], textAlign: ["left", "right"] ,position:"relative"}}
            >
              <Box
                className={`${Styles.arrowMaskWrap} ${
                  isActiveView
                    ? Styles.arrowMaskLeftAffix
                    : Styles.arrowMaskLeft
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 94.33 17.9"
                >
                  <defs>
                    <style>
                      {".cls-1{fill:#fff;stroke:#231f20;stroke-miterlimit:10;}"}
                    </style>
                  </defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <polyline
                        className="cls-1"
                        points="9.74 17.54 0.72 9.34 9.74 0.35"
                      />
                      <line
                        className="cls-1"
                        x1="0.73"
                        y1="9.34"
                        x2="94.33"
                        y2="9.34"
                      />
                    </g>
                  </g>
                </svg>
              </Box>
              <h2 className={Styles.sectionTitle}>Media</h2>
              <Box className={Styles.tourContentSM}>
                {" "}
                <ViewInArOutlinedIcon />{" "}
              </Box>
              <Box className={Styles.tourContent}>
                {" "}
                <KeyboardArrowLeftOutlinedIcon /> 3D Tour
              </Box>
            </Grid>
            <Grid item xs={12} md={8} sx={{ order: [2, 1] }}>
              <Box id="showcase-vtour" className={Styles.showcaseContent}>
                <Box
                  id="vtour"
                  data-scroll-offset="200"
                  className={Styles.showcaseSection}
                >
                  <Box className="owl-container">
                    <Box
                      id="vtour-embed-wrapper"
                      className={Styles.overlaySixteenNine}
                    >
                      <Box className={Styles.aspectRatioContent}>
                        <iframe
                          title="3D Virtual Tour"
                          id="frame-vtour"
                          className="vtour-frame vtour-nid-83661581"
                          src={listDetail?.data?.Matterport}
                          width="100%"
                          height="100%"
                        ></iframe>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  ):null;
}
export default MediaSection;
