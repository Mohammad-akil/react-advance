import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import ImageViewer from "../../../components/imageViewer/index";
import { getOptimizedImageUrl, isOptimizedImage } from "../../../utils/common";
const sampleIMage =
  "https://method-idx.s3.amazonaws.com/midx-assets/defaultPropertyNoImage.png";
function PhotoGrid() {
  const isSmallScreen = useMediaQuery("(max-width: 575px)");
  const [imageViewerOpen, setImageViewerOpen] = useState<any>(false);
  const [imageViewerStartingImage, setImageViewerStartingImage] =
    useState<any>(0);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const handleReturnImages = (images: any, images1?: any) => {
    if (images) {
      return images?.filter((item: any) => item !== "null")?.length
        ? images?.filter((item: any) => item !== "null")
        : [sampleIMage];
    } else {
      return images1?.filter((item: any) => item !== "null")?.length
        ? images1
            ?.filter((item: any) => item !== "null")
            ?.map((item: any) => item.MediaURL)
        : [sampleIMage];
    }
  };
  return (
    <Box>
      <Grid container spacing={isSmallScreen ? 0 : 1}>
        {handleReturnImages(
          listDetail?.data?.MediaURL,
          listDetail?.data?.Media
        )?.map((item: string, index: Number) => (
          <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ position: "relative", height: "380px", width: "100%" }}>
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
                  border: "1px solid lightgrey",
                  objectFit: "cover",
                }}
                src={getOptimizedImageUrl(
                  item,
                  isSmallScreen ? "original" : "640x480"
                )}
                unoptimized={isOptimizedImage(item) ? true : false}
                alt="MediaURL"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <ImageViewer
        images={handleReturnImages(
          listDetail?.data?.MediaURL,
          listDetail?.data?.Media
        )}
        open={imageViewerOpen}
        setOpen={setImageViewerOpen}
        currentImage={imageViewerStartingImage}
      />
    </Box>
  );
}
export default PhotoGrid;
