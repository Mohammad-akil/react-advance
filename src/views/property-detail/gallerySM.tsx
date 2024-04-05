import React, { useState } from "react";
import Styles from "../../styles/property-detail/gallery.module.css";
import { Box, Button, Dialog, Stack, Typography, Slide } from "@mui/material";
import Image from "next/image";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { TransitionProps } from "@mui/material/transitions";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { NumberFormat } from "../../utils/numberFormat";
import ScheduleContactForm from "./scheduleContactForm";
import { formatAddress } from "../../utils/propertyAddressFormat";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";
import { samplePropertyIMage } from "../../utils/propertyData";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PropertyDetailGallerySM() {
  const [open, setOpen] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const handleIsAllPhotoShow = () => {
    if (
      listDetail?.data?.StandardStatus === "Closed" ||
      listDetail?.data?.StandardStatus === "Expired" ||
      listDetail?.data?.StandardStatus === "Withdrawn"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleReturnImages = (images: any, images1?: any) => {
    if (handleIsAllPhotoShow()) {
      let MediaOrder = listDetail?.data?.MediaOrder;
      if (images1) {
        let newImages: any =
          typeof images1?.[0] === "string" ? JSON.parse(images1?.[0]) : images1;
        if (MediaOrder?.length) {
          let newOrderedImages: any = [];
          MediaOrder?.map((order: any, index: number) => {
            let newFind: any = newImages?.find(
              (it: any) => it?.Order == index + 1
            );
            if (newFind) {
              newOrderedImages.push(newFind?.MediaURL);
            }
          });
          return newOrderedImages?.length
            ? newOrderedImages
            : [samplePropertyIMage];
        } else {
          return newImages?.filter(
            (item: any) => item !== "null" && item !== "[]"
          )?.length
            ? newImages
                ?.filter((item: any) => item !== "null" && item !== "[]")
                ?.map((item: any) => item.MediaURL)
            : [samplePropertyIMage];
        }
      } else {
        return images?.filter((item: any) => item !== "null" && item !== "[]")
          ?.length
          ? images?.filter((item: any) => item !== "null" && item !== "[]")
          : [samplePropertyIMage];
      }
    } else {
      if (images1) {
        let newImages: any =
          typeof images1?.[0] === "string" ? JSON.parse(images1?.[0]) : images1;
        return newImages?.filter(
          (item: any) => item !== "null" && item !== "[]"
        )?.length > 0
          ? newImages
              ?.filter((item: any) => item !== "null" && item !== "[]")
              ?.map((item: any) => item.MediaURL)
              ?.slice(0, 1)
          : [samplePropertyIMage];
      } else {
        return images?.filter((item: any) => item !== "null" && item !== "[]")
          ?.length > 0
          ? images
              ?.filter((item: any) => item !== "null" && item !== "[]")
              ?.slice(0, 1)
          : [samplePropertyIMage];
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={Styles.galleryAreaMB}>
      <Box sx={{ zIndex: "2", position: "relative" }}>
        <Box className={Styles.galleryAreaMBImageBox}>
          <Image
            onClick={() => {
              if (
                handleReturnImages(
                  listDetail?.data?.MediaURL,
                  listDetail?.data?.Media
                )?.length > 1
              ) {
                setOpen(true);
              }
            }}
            sizes="100vw"
            style={{
              zIndex: "5",
              width: "100%",
              minHeight: "300px",
              height: "auto",
              cursor: "pointer",
            }}
            width={500}
            height={300}
            src={getOptimizedImageUrl(
              handleReturnImages(
                listDetail?.data?.MediaURL,
                listDetail?.data?.Media
              )[0],
              "416x276"
            )}
            unoptimized={
              isOptimizedImage(
                handleReturnImages(
                  listDetail?.data?.MediaURL,
                  listDetail?.data?.Media
                )[0]
              )
                ? true
                : false
            }
            priority
            alt="MediaURL"
          />
          {handleReturnImages(
            listDetail?.data?.MediaURL,
            listDetail?.data?.Media
          )?.length > 1 ? (
            <Button
              endIcon={<KeyboardDoubleArrowDownRoundedIcon />}
              className={Styles.galleryViewAllButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              View All{" "}
              {
                handleReturnImages(
                  listDetail?.data?.MediaURL,
                  listDetail?.data?.Media
                )?.length
              }{" "}
              Photos
            </Button>
          ) : null}
        </Box>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box className={Styles.photoViewHeader}>
          <Typography className={Styles.photoViewHeaderText}>
            Back to Listing Detail
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleClose}
            className={Styles.photoViewHeaderButton}
          >
            <KeyboardDoubleArrowUpRoundedIcon fontSize="small" />
          </Button>
        </Box>
        <Box className={Styles.galleryGridView}>
          {handleReturnImages(
            listDetail?.data?.MediaURL,
            listDetail?.data?.Media
          )?.map((item: any, index: any) => (
            <Box
              key={index}
              className={Styles.galleryGridViewItem}
              sx={{
                height: "auto",
                position: "relative",
              }}
            >
              <Image
                onClick={() => {
                  setOpen(true);
                }}
                sizes="100vw"
                style={{
                  zIndex: "5",
                  width: "100%",
                  height: "auto",
                }}
                width={300}
                height={300}
                src={getOptimizedImageUrl(item?.MediaURL || item, "416x276")}
                unoptimized={
                  isOptimizedImage(item?.MediaURL || item) ? true : false
                }
                priority
                alt="MediaURL"
              />
            </Box>
          ))}
        </Box>
        <Box className={Styles.statsBarMBView}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography className={Styles.statsBarHeadingMB}>
                {formatAddress(listDetail?.data)}
              </Typography>
              <Typography className={Styles.statsBarCityZipMB}>
                {listDetail?.data?.City}, {listDetail?.data?.StateOrProvince}{" "}
                {listDetail?.data?.PostalCode}
              </Typography>
            </Box>
            <Typography className={Styles.statsBarPriceMB}>
              {listDetail?.data?.OriginalListPrice ||
              listDetail?.data?.ListPrice
                ? NumberFormat({
                    number:
                      listDetail?.data?.ListPrice ||
                      listDetail?.data?.OriginalListPrice,
                    currency: "USD",
                  })
                : null}
            </Typography>
          </Stack>
        </Box>
        <Box className={Styles.galleryBottomButtonsArea}>
          <Button
            onClick={() => setOpenRequestModal(true)}
            fullWidth
            className={Styles.galleryBottomButtonsRequest}
          >
            Request Info
          </Button>
          <Button
            onClick={() => setOpenRequestModal(true)}
            fullWidth
            className={Styles.galleryBottomButtonsTour}
          >
            Schedule Tour
          </Button>
        </Box>
      </Dialog>
      <ScheduleContactForm
        open={openRequestModal}
        isNeedMoreHelp={true}
        setOpen={setOpenRequestModal}
        tourDateTime={null}
      />
    </Box>
  );
}
export default PropertyDetailGallerySM;
