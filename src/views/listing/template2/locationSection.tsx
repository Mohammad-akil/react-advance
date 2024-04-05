import React, { useEffect, useState,useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import Styles from "../../../styles/listing1/location.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
function LocationSection() {
  const [isActiveView, setActiveView] = useState<Boolean>(false);
  const shouldScrollRef = useRef<boolean>(false);
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  useEffect(() => {
    const handleScroll = () => {
      // Replace 'targetElementId' with the actual ID of the element you want to track
      const targetElement = document.getElementById("listing-location-section");

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
  return listDetail?.data?.GoogleMapUrl ? (
    <Box id="listing-location-section" className={Styles.section}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} sx={{ position: "relative" }}>
            <Box
              className={`${Styles.arrowMaskWrap} ${
                isActiveView
                  ? Styles.arrowMaskRightAffix
                  : Styles.arrowMaskRight
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
            </Box>
            <h2 className={Styles.sectionTitle}>Location</h2>
            <Box className={Styles.mapAddress}>
              <Box className={Styles.propertyAddressTop}>
                <span className={Styles.thoroughfare}>
                  {listDetail?.data?.transaction_listings_v2?.street}
                </span>
              </Box>
              <Box className={Styles.propertyAddressBottom}>
                <span className={Styles.locality}>
                  {" "}
                  {listDetail?.data?.transaction_listings_v2?.city}
                </span>
                <span className={Styles.administrative_area}>
                  {" "}
                  {listDetail?.data?.transaction_listings_v2?.state}
                </span>
                <span className="postal_code">
                  {" "}
                  {listDetail?.data?.transaction_listings_v2?.zipcode}
                </span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            {" "}
            <Box className={Styles.propertyMap}>
              <Box sx={{ width: "100%", height: "400px" }}>
                <iframe
                  src={listDetail?.data?.GoogleMapUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  ) : null;
}
export default LocationSection;
