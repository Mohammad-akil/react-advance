import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import Styles from "../../../styles/listing1/gallery.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ImageViewer from "../../../components/imageViewer/index";
import { getMediaForWebp } from "../../../utils/common";
function GallerySection() {
  const [isActiveView, setActiveView] = useState<Boolean>(false);
  const [imageViewerOpen, setImageViewerOpen] = useState<any>(false);
  const shouldScrollRef = useRef<boolean>(false);
  const [imageViewerStartingImage, setImageViewerStartingImage] =
    useState<any>(0);
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  useEffect(() => {
    const handleScroll = () => {
      // Replace 'targetElementId' with the actual ID of the element you want to track
      const targetElement = document.getElementById("gallerySection000");

      if (targetElement) {
        const { top, bottom } = targetElement.getBoundingClientRect();
        const isInViewport = top >= -300 && bottom - 200 <= window.innerHeight;
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

  return (
    <Box id="gallerySection000" className={`${Styles.photoSection}`}>
      <Box className={Styles.cut}></Box>
      <Container className={Styles.photoGridWrap}>
        <Box className={Styles.bgDotsTop}></Box>
        <Grid container>
          <Grid item xs={12}>
            <Box className={Styles.titleWrap}>
              <div
                className={`${Styles.arrowMaskWrap} ${
                  isActiveView
                    ? Styles.arrowMaskRightAffix
                    : Styles.arrowMaskRight
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 94.33 17.9"
                >
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
                Photo <br />
                Gallery
              </h2>
              <Button
                variant="text"
                startIcon={<GridViewOutlinedIcon />}
                color="inherit"
                className={Styles.gridViewButton}
                onClick={() => {
                  setImageViewerOpen(true);
                  setImageViewerStartingImage(0);
                }}
              >
                {" "}
                View {listDetail?.data?.images?.length || "0"} Photos
              </Button>
            </Box>
            <Box className={Styles.galleryPreviewWrapper}>
              {listDetail?.data?.images
                ?.slice(0, 6)
                ?.map((item: any, index: number) => (
                  <Box
                    className={`${Styles.galleryPreviewImage} ${
                      Styles[`galleryPreviewImage${index}`]
                    }`}
                    sx={{ padding: "1rem" }}
                    key={index}
                    onClick={() => {
                      setImageViewerOpen(true);
                      setImageViewerStartingImage(index);
                    }}
                  >
                    <Box
                      sx={{
                        backgroundPosition: "50%",
                        backgroundImage: `url(${getMediaForWebp(
                          item.MediaUrl,
                          "medium"
                        )})`,
                      }}
                      className={Styles.bgImage}
                    >
                      <Box className={Styles.galleryCtaInner}></Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Grid>
        <Box className={Styles.bgDotsBottom}></Box>
      </Container>
      <ImageViewer
        images={listDetail?.data?.images?.map((item: any) =>
          getMediaForWebp(item.MediaUrl, "large")
        )}
        open={imageViewerOpen}
        setOpen={setImageViewerOpen}
        currentImage={imageViewerStartingImage}
      />
    </Box>
  );
}
export default GallerySection;
