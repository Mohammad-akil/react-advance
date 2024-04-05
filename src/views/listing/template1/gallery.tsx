import React, { useState } from "react";
import { Box, Typography, Grid, Container, useMediaQuery } from "@mui/material";
import Styles from "../../../styles/listing/gallery.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import ImageViewer from "../../../components/imageViewer/index";
import { getMediaForWebp } from "../../../utils/common";
function Gallery() {
  const [imageViewerOpen, setImageViewerOpen] = useState<any>(false);
  const [imageViewerStartingImage, setImageViewerStartingImage] =
    useState<any>(0);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  return (
    <Box className={Styles.galleryArea}>
      {" "}
      <Container>
        <Typography className={Styles.galleryHeading}>Photo Gallery</Typography>
        <Grid container spacing={0.7} sx={{ mt: "60px" }}>
          {listDetail?.data?.images?.map((item: any, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  position: "relative",
                  height: isLargeScreen ? "200px" : "280px",
                  width: "100%",
                }}
              >
                <Image
                  layout="fill"
                  onClick={() => {
                    setImageViewerOpen(true);
                    setImageViewerStartingImage(index);
                  }}
                  objectFit="contain"
                  style={{
                    cursor: "pointer",
                    zIndex: "5",
                    objectFit: "cover",
                  }}
                  src={getMediaForWebp(item?.MediaUrl || "", "medium")}
                  alt="MediaURL"
                  loading="lazy"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <ImageViewer
        images={listDetail?.data?.images?.map((item: any) =>
          getMediaForWebp(item?.MediaUrl || "", "large")
        )}
        open={imageViewerOpen}
        setOpen={setImageViewerOpen}
        currentImage={imageViewerStartingImage}
      />
    </Box>
  );
}
export default Gallery;
