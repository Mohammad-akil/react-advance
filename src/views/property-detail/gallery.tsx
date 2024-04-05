import React, { useState } from "react";
import Styles from "../../styles/property-detail/gallery.module.css";
import { Box, Button } from "@mui/material";
import Slider, { LazyLoadTypes } from "react-slick";
import Image from "next/image";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import ImageViewer from "../../components/imageViewer/index";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";
import { samplePropertyIMage } from "../../utils/propertyData";
const sliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "999",
  fontSize: "28px",
  color: "#fff",
  background: "#433F3F",
  borderRadius: "50%",
  top: "45.4%",
};
function PropertyDetailGallery() {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [imageViewerStartingImage, setImageViewerStartingImage] = useState(0);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const ArrowLeft = ({ onClick }: any) => (
    <NavigateBefore
      sx={{ ...sliderArrowStyle, left: "10px" }}
      onClick={onClick}
    />
  );

  const ArrowRight = ({ onClick }: any) => (
    <NavigateNext
      sx={{ ...sliderArrowStyle, right: "10px" }}
      onClick={onClick}
    />
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

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "0px",
    swipeToSlide: true,
    speed: 500,
    rows: 2,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: !handleIsAllPhotoShow()
      ? []
      : [
          {
            breakpoint: 7370,
            settings: {
              slidesToShow: 22,
              slidesToScroll: 22,
              infinite: true,
            },
          },
          {
            breakpoint: 7030,
            settings: {
              slidesToShow: 21,
              slidesToScroll: 21,
              infinite: true,
            },
          },
          {
            breakpoint: 6690,
            settings: {
              slidesToShow: 20,
              slidesToScroll: 20,
              infinite: true,
            },
          },
          {
            breakpoint: 6350,
            settings: {
              slidesToShow: 19,
              slidesToScroll: 19,
              infinite: true,
            },
          },
          {
            breakpoint: 6110,
            settings: {
              slidesToShow: 18,
              slidesToScroll: 18,
              infinite: true,
            },
          },
          {
            breakpoint: 5770,
            settings: {
              slidesToShow: 17,
              slidesToScroll: 17,
              infinite: true,
            },
          },
          {
            breakpoint: 5430,
            settings: {
              slidesToShow: 16,
              slidesToScroll: 16,
              infinite: true,
            },
          },
          {
            breakpoint: 5090,
            settings: {
              slidesToShow: 15,
              slidesToScroll: 15,
              infinite: true,
            },
          },
          {
            breakpoint: 4750,
            settings: {
              slidesToShow: 14,
              slidesToScroll: 14,
              infinite: true,
            },
          },
          {
            breakpoint: 4410,
            settings: {
              slidesToShow: 13,
              slidesToScroll: 13,
              infinite: true,
            },
          },
          {
            breakpoint: 4070,
            settings: {
              slidesToShow: 12,
              slidesToScroll: 12,
              infinite: true,
            },
          },
          {
            breakpoint: 3730,
            settings: {
              slidesToShow: 11,
              slidesToScroll: 11,
              infinite: true,
            },
          },
          {
            breakpoint: 3390,
            settings: {
              slidesToShow: 10,
              slidesToScroll: 10,
              infinite: true,
            },
          },
          {
            breakpoint: 3050,
            settings: {
              slidesToShow: 9,
              slidesToScroll: 9,
              infinite: true,
            },
          },
          {
            breakpoint: 2710,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
              infinite: true,
            },
          },
          {
            breakpoint: 2370,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7,
              infinite: true,
            },
          },
          {
            breakpoint: 2040,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              infinite: true,
            },
          },
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
            },
          },
          {
            breakpoint: 1360,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
  };

  const handleReturnImages = (images: any, images1?: any) => {
    if (handleIsAllPhotoShow()) {
      let MediaOrder = listDetail?.data?.MediaOrder;
      if (images1) {
        let newImages: any =
          typeof images1?.[0] === "string" ? JSON.parse(images1?.[0]) : images1;
        if (MediaOrder?.length) {
          let newOrderedImages: any = [];
          let startOrder = newImages?.find((it: any) => it.Order === 0) ? 0 : 1;
          MediaOrder?.map((order: any, index: number) => {
            let newFind: any = newImages?.find(
              (it: any) => it?.Order == index + startOrder
            );
            if (newFind) {
              newOrderedImages.push(newFind?.MediaURL);
            }
          });
          return newOrderedImages?.length
            ? newOrderedImages?.filter((it: any) => it !== undefined)
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
      } else if (images) {
        return images?.filter((item: any) => item !== "null" && item !== "[]")
          ?.length
          ? images?.filter((item: any) => item !== "null" && item !== "[]")
          : [samplePropertyIMage];
      } else {
        return [samplePropertyIMage];
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
      } else if (images) {
        return images?.filter((item: any) => item !== "null" && item !== "[]")
          ?.length > 0
          ? images
              ?.filter((item: any) => item !== "null" && item !== "[]")
              ?.slice(0, 1)
          : [samplePropertyIMage];
      } else {
        return [samplePropertyIMage];
      }
    }
  };
  const handleLength = () => {
    let images = listDetail?.data?.MediaURL;
    let images1 = listDetail?.data?.Media;
    if (images) {
      return images?.filter((item: any) => item !== "null" && item !== "[]")
        ?.length;
    } else if (images1 && images1?.[0] !== "null") {
      let newImages: any =
        typeof images1?.[0] === "string" ? JSON.parse(images1?.[0]) : images1;
      return newImages?.filter((item: any) => item !== "null" && item !== "[]")
        ?.length;
    } else {
      return 0;
    }
  };
  return (
    <Box className={Styles.galleryAreaPc}>
      <Box sx={{ zIndex: "10", height: "540px", overflow: "hidden" }}>
        {!handleIsAllPhotoShow() ||
        handleLength() == 1 ||
        handleLength() == 0 ? (
          <Box sx={{ position: "relative", height: "600px", width: "100%" }}>
            <Image
              onClick={() => {
                setImageViewerOpen(true);
                setImageViewerStartingImage(0);
              }}
              layout="fill"
              objectFit="contain"
              style={{
                cursor: "pointer",
                zIndex: "5",
                border: "1px solid lightgrey",
                objectFit: "cover",
              }}
              src={getOptimizedImageUrl(
                listDetail?.data?.MediaURL?.[0] ||
                  listDetail?.data?.Media?.[0]?.MediaURL ||
                  samplePropertyIMage,
                "640x480"
              )}
              unoptimized={
                isOptimizedImage(
                  listDetail?.data?.MediaURL?.[0] ||
                    listDetail?.data?.Media?.[0]?.MediaURL ||
                    samplePropertyIMage
                )
                  ? true
                  : false
              }
              priority
              alt="MediaURL"
            />
            <Box className={Styles.galleryButtons}>
              <Button
                onClick={() => {
                  setImageViewerOpen(true);
                  setImageViewerStartingImage(0);
                }}
                startIcon={<ZoomOutMapOutlinedIcon />}
                className={Styles.galleryFullSizeButton}
              >
                Full-Size Photos
              </Button>
              <Button
                component={"a"}
                href={
                  listDetail?.data?.FMLS_VirtualTourURLUnbranded2 ||
                  "https://my.matterport.com/show/?m=aSx1MpRRqif"
                }
                target="_blank"
                startIcon={<PlayCircleOutlineRoundedIcon />}
                className={Styles.galleryVirtualTourButton}
              >
                Virtual Tour
              </Button>
            </Box>
          </Box>
        ) : null}
        {handleIsAllPhotoShow() && handleLength() > 1 && handleLength() < 5 ? (
          <Box className={Styles.simpleGalleryView}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Image
                onClick={() => {
                  setImageViewerOpen(true);
                  setImageViewerStartingImage(0);
                }}
                height={540}
                width={675}
                style={{
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                src={getOptimizedImageUrl(
                  listDetail?.data?.MediaURL?.[0] ||
                    listDetail?.data?.Media?.[0]?.MediaURL ||
                    samplePropertyIMage,
                  "640x480"
                )}
                unoptimized={
                  isOptimizedImage(
                    listDetail?.data?.MediaURL?.[0] ||
                      listDetail?.data?.Media?.[0]?.MediaURL ||
                      samplePropertyIMage
                  )
                    ? true
                    : false
                }
                priority
                alt="MediaURL"
              />
            </Box>
            <Box className={Styles.simpleGalleryViewRight}>
              <Box className={Styles.simpleGalleryViewRightTop}>
                {handleReturnImages(
                  listDetail?.data?.MediaURL,
                  listDetail?.data?.Media
                )
                  ?.slice(1)
                  ?.filter((it: any, index: number) => index !== 1)
                  ?.map((item: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "350px",
                        height: "270px",
                        mb: "-3.5px",
                        ml: index == 1 ? "-1px" : "",
                      }}
                    >
                      {" "}
                      <Image
                        onClick={() => {
                          setImageViewerOpen(true);
                          setImageViewerStartingImage(1);
                        }}
                        fill={true}
                        style={{
                          cursor: "pointer",
                          border: "2px solid lightgrey",
                          borderTop: "none",
                          objectFit: "cover",
                        }}
                        src={getOptimizedImageUrl(item, "640x480")}
                        unoptimized={isOptimizedImage(item) ? true : false}
                        priority
                        alt="MediaURL"
                      />
                    </Box>
                  ))}
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "350px",
                  height: "270px",
                  mb: "-3.5px",
                  mt: "3px",
                }}
              >
                {" "}
                <Image
                  onClick={() => {
                    setImageViewerOpen(true);
                    setImageViewerStartingImage(1);
                  }}
                  fill={true}
                  style={{
                    cursor: "pointer",
                    border: "2px solid lightgrey",
                    borderTop: "none",
                    objectFit: "cover",
                  }}
                  src={getOptimizedImageUrl(
                    listDetail?.data?.MediaURL?.[3] ||
                      listDetail?.data?.Media?.[3]?.MediaURL ||
                      samplePropertyIMage,
                    "640x480"
                  )}
                  unoptimized={
                    isOptimizedImage(
                      listDetail?.data?.MediaURL?.[3] ||
                        listDetail?.data?.Media?.[3]?.MediaURL ||
                        samplePropertyIMage
                    )
                      ? true
                      : false
                  }
                  priority
                  alt="MediaURL"
                />
              </Box>
            </Box>
          </Box>
        ) : null}
        {handleIsAllPhotoShow() && handleLength() > 4 ? (
          <Slider {...settings}>
            {handleReturnImages(
              listDetail?.data?.MediaURL,
              listDetail?.data?.Media
            )?.map((item: any, index: number, self: any) => {
              if (index === 1 || index === 2 || index === 3) {
                return (
                  <Box
                    key={index}
                    style={{ height: "0px", visibility: "hidden" }}
                  ></Box>
                );
              } else if (index === 4) {
                return [
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: "280px",
                      height: "270px",
                      borderLeft: "1px solid white",
                      mb: "-3.5px",
                    }}
                  >
                    {" "}
                    <Image
                      onClick={() => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(1);
                      }}
                      fill={true}
                      style={{
                        cursor: "pointer",
                        border: "1px solid lightgrey",
                        objectFit: "cover",
                      }}
                      src={self[1]}
                      alt="MediaURL"
                    />
                  </Box>,
                  <Box
                    key={index + 1}
                    sx={{
                      position: "relative",
                      width: "280px",
                      height: "270px",
                      borderLeft: "1px solid white",
                      mb: "-3.5px",
                    }}
                  >
                    <Image
                      onClick={() => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(2);
                      }}
                      fill={true}
                      style={{
                        cursor: "pointer",
                        zIndex: "1",
                        objectFit: "cover",
                      }}
                      priority
                      src={getOptimizedImageUrl(self[2], "640x480")}
                      unoptimized={isOptimizedImage(self[2]) ? true : false}
                      alt="MediaURL"
                    />
                  </Box>,
                  <Box
                    key={index + 3}
                    sx={{
                      position: "relative",
                      width: "280px",
                      height: "270px",
                      mb: "-3.5px",
                    }}
                  >
                    <Image
                      onClick={() => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(3);
                      }}
                      fill={true}
                      style={{
                        cursor: "pointer",
                        zIndex: "1",
                        border: "1px solid lightgrey",
                        objectFit: "cover",
                      }}
                      priority
                      src={getOptimizedImageUrl(self[3], "640x480")}
                      unoptimized={isOptimizedImage(self[3]) ? true : false}
                      alt="MediaURL"
                    />
                  </Box>,
                  <Box
                    key={index + 4}
                    sx={{
                      position: "relative",
                      width: "280px",
                      height: "270px",
                      mb: "-3.5px",
                      borderLeft: "1px solid white",
                    }}
                  >
                    <Image
                      onClick={() => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(4);
                      }}
                      fill={true}
                      style={{
                        cursor: "pointer",
                        zIndex: "1",
                        border: "1px solid lightgrey",
                        objectFit: "cover",
                      }}
                      priority
                      src={getOptimizedImageUrl(self[4], "640x480")}
                      unoptimized={isOptimizedImage(self[4]) ? true : false}
                      alt="MediaURL"
                    />
                  </Box>,
                ];
              } else {
                return index == 0 ? (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Image
                      onClick={() => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(index);
                      }}
                      height={540}
                      width={675}
                      style={{
                        cursor: "pointer",
                      }}
                      src={getOptimizedImageUrl(item, "640x480")}
                      unoptimized={isOptimizedImage(item) ? true : false}
                      priority
                      alt="MediaURL"
                    />
                    <Box className={Styles.galleryButtons}>
                      <Button
                        onClick={() => {
                          setImageViewerOpen(true);
                          setImageViewerStartingImage(index);
                        }}
                        startIcon={<ZoomOutMapOutlinedIcon />}
                        className={Styles.galleryFullSizeButton}
                      >
                        Full-Size Photos
                      </Button>
                      <Button
                        component={"a"}
                        href={
                          listDetail?.data?.FMLS_VirtualTourURLUnbranded2 ||
                          "https://my.matterport.com/show/?m=aSx1MpRRqif"
                        }
                        target="_blank"
                        startIcon={<PlayCircleOutlineRoundedIcon />}
                        className={Styles.galleryVirtualTourButton}
                      >
                        Virtual Tour
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      cursor: "pointer",
                      width: "280px",
                      height: "270px",
                      mb: "-3.5px",
                      position: "relative",
                      borderLeft: "1px solid white",
                    }}
                  >
                    <Image
                      onClick={(e) => {
                        setImageViewerOpen(true);
                        setImageViewerStartingImage(index);
                      }}
                      fill
                      style={{
                        cursor: "pointer",
                        objectFit: "cover",
                        border: "1px solid lightgrey",
                      }}
                      src={getOptimizedImageUrl(item, "640x480")}
                      unoptimized={isOptimizedImage(item) ? true : false}
                      priority
                      alt="MediaURL"
                    />
                  </Box>
                );
              }
            })}
          </Slider>
        ) : null}
      </Box>
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
export default PropertyDetailGallery;
