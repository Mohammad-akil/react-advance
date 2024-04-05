import React, { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import Styles from "../../../styles/listing1/features.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
function FeaturesSection() {
  const shouldScrollRef = useRef<boolean>(false);
  const [isActiveView, setActiveView] = useState<Boolean>(false);
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  useEffect(() => {
    const handleScroll = () => {
      // Replace 'targetElementId' with the actual ID of the element you want to track
      const targetElement = document.getElementById("amenities");
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

  return listDetail?.data?.features?.length ? (
    <Grid id="amenities" className={Styles.section} container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        sx={{ order: [1, 2], textAlign: ["left", "right"] }}
      >
        <Box
          id="arrow-amenities"
          className={`${Styles.arrowMaskWrap} ${
            isActiveView ? Styles.arrowMaskLeftAffix : Styles.arrowMaskLeft
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94.33 17.9">
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
        <h2
          className={`${Styles.sectionTitle}`}
          /*     className="section-title text-right" */
        >
          Features & <br />
          Amenities
        </h2>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        sx={{ order: [2, 1], textAlign: ["right", "left"] }}
      >
        <Box className="item-list">
          <ul id="property-amenities-list" className={Styles.amenityItemList}>
            {listDetail?.data?.features
              ?.filter(
                (value: any, index: any, self: any) =>
                  index ===
                  self.findIndex(
                    (t: any) =>
                      t.listing_category.id === value.listing_category.id
                  )
              )
              ?.map((item: any, index: number) => (
                <li key={index} className="amenity-item first">
                  {item?.name}
                </li>
              ))}
          </ul>
        </Box>
      </Grid>
    </Grid>
  ) : null;
}
export default FeaturesSection;
