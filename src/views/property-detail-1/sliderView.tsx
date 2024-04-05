import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Slider, { LazyLoadTypes } from "react-slick";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Styles from "../../styles/property-detail-1/slider.module.css";
import GridViewIcon from "@mui/icons-material/GridView";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import StreetviewOutlinedIcon from "@mui/icons-material/StreetviewOutlined";
import FullScreenDialog from "./fullScreenDialog/index";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";
import { samplePropertyIMage } from "../../utils/propertyData";

const sliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "2",
  "@media (max-width: 575px)": {
    fontSize: "26px",
  },
  "@media (min-width: 575px)": {
    fontSize: "35px !important",
    padding: "6px",
  },
  color: "#000000",
  background: "#d6d6d6",
  borderRadius: "50%",
  top: "43%",
};
const multiSliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "2",
  fontSize: "35px",
  color: "#fff",
  background: "#433F3F",
  height: "77.5px",
  top: "2.5%",
};
function SliderView() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [open, setOpen] = useState<Boolean>(false);
  const [activeView, setActiveView] = useState<string>("photos");
  const isSmallScreen = useMediaQuery("(max-width: 575px)");
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

  const MultiSliderArrowLeft = ({ onClick }: any) => (
    <NavigateBefore
      sx={{ ...multiSliderArrowStyle, left: "-30px" }}
      onClick={onClick}
    />
  );

  const MultiSliderArrowRight = ({ onClick }: any) => (
    <NavigateNext
      sx={{ ...multiSliderArrowStyle, right: "-30px" }}
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
    dots: false,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    // adaptiveHeight: true,
    slidesToShow: 1,
    initialSlide: 0,
    slidesToScroll: 1,
    nextArrow: <ArrowRight />,
    lazyLoad: "ondemand" as LazyLoadTypes | undefined,
    prevArrow: <ArrowLeft />,
    style: {
      backgroundColor: isSmallScreen ? "white" : "black",
    },
  };

  const handleReturnImages = (images: any, images1?: any) => {
    if (handleIsAllPhotoShow()) {
      let MediaOrder = listDetail?.data?.MediaOrder;
      if (images1 && images1?.[0] !== "null") {
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

  const multiSetting = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    initialSlide: 0,
    slidesToScroll: 6,
    lazyLoad: "ondemand" as LazyLoadTypes | undefined,
    arrows: true,
    focusOnSelect: true,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    responsive: !handleIsAllPhotoShow()
      ? []
      : [
          {
            breakpoint: 7000,
            settings: {
              slidesToShow: Math.min(handleLength(), 5),
              slidesToScroll: 1,
              infinite: handleLength() > 5 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: Math.min(handleLength(), 4),
              slidesToScroll: 1,
              infinite: handleLength() > 4 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: Math.min(handleLength(), 3),
              slidesToScroll: 1,
              infinite: handleLength() > 3 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: Math.min(handleLength(), 2),
              slidesToScroll: 1,
              infinite: handleLength() > 2 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: handleLength() > 1 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: handleLength() > 4 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: handleLength() > 3 ? true : false,
              dots: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: handleLength() > 1 ? true : false,
              dots: false,
              initialSlide: 1,
            },
          },
        ],
    nextArrow: <MultiSliderArrowRight />,
    prevArrow: <MultiSliderArrowLeft />,
  };

  // useEffect(() => {
  //   if (listDetail?.data?.ListingId) {
  //     let maxHeight = 0;
  //     const imageElements = document.querySelectorAll(".slick-slide img");
  //     imageElements.forEach((img: any) => {
  //       if (window.innerWidth > 575) {
  //         if (img.height > maxHeight) {
  //           maxHeight = img.height;
  //         }
  //       } else {
  //         if (img.height < maxHeight || maxHeight === 0) {
  //           maxHeight = img.height;
  //         }
  //       }
  //     });
  //     setMaxImageHeight(maxHeight);
  //   }
  // }, [listDetail?.data?.ListingId]);

  return (
    <Box className={Styles.SliderArea}>
      <Slider
        {...settings}
        asNavFor={nav1}
        ref={(slider2: any) => setNav2(slider2)}
      >
        {handleReturnImages(
          listDetail?.data?.MediaURL,
          listDetail?.data?.Media
        )?.map((item: any, index: number, self: any) => (
          <Box
            onClick={() => {
              if (handleIsAllPhotoShow() && handleLength() > 0) {
                setOpen(true);
                setActiveView("photos");
              }
            }}
            key={item?.ListingId || index}
            className={Styles.imageContainer}
          >
            <Image
              sizes="100vw"
              width={500}
              height={300}
              className={Styles.responsiveImage}
              placeholder="blur"
              alt="MediaURL"
              style={{
                objectFit: item?.includes("defaultPropertyNoImage")
                  ? "inherit"
                  : "cover",
              }}
              blurDataURL={getOptimizedImageUrl(
                item,
                isSmallScreen ? "416x276" : "2048x1536"
              )}
              src={getOptimizedImageUrl(
                item,
                isSmallScreen ? "416x276" : "2048x1536"
              )}
              unoptimized
              priority
            />
          </Box>
        ))}
      </Slider>
      {isSmallScreen ? null : (
        <Box
          sx={{
            display:
              handleIsAllPhotoShow() &&
              handleReturnImages(
                listDetail?.data?.MediaURL,
                listDetail?.data?.Media
              )?.length > 1
                ? ""
                : "none !important",
          }}
          className={Styles.sliderSettingArea}
        >
          <Box
            className={Styles.sliderSettingSlider}
            sx={{ "& .slick-slide": { maxWidth: "110px" } }}
          >
            <Slider
              {...multiSetting}
              asNavFor={nav2}
              ref={(slider1: any) => setNav1(slider1)}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {handleReturnImages(
                listDetail?.data?.MediaURL,
                listDetail?.data?.Media
              )?.map((item: any, index: number, self: any) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: "80px",
                    maxWidth: "110px",
                    position: "relative",
                    mt: "3px",
                  }}
                >
                  <Image
                    sizes="100vw"
                    style={{
                      zIndex: "5",
                      width: "100%",
                      height: "100%",
                      opacity: activeSlide == index ? "1" : ".6",
                      cursor: "pointer",
                      borderLeft: "1.5px solid white",
                      borderRight: "1.5px solid white",
                      objectFit: "cover",
                    }}
                    priority
                    width={500}
                    height={300}
                    src={getOptimizedImageUrl(item, "165x165")}
                    unoptimized={isOptimizedImage(item) ? true : false}
                    alt="MediaURL"
                  />
                </Box>
              ))}
            </Slider>
          </Box>

          <Box className={Styles.sliderSettingButtonsArea}>
            <Box
              onClick={() => {
                setOpen(true);
                setActiveView("photos");
              }}
              className={Styles.sliderSettingButton}
            >
              <Box className={Styles.sliderSettingButtonInside}>
                <GridViewIcon />
                <Typography className={Styles.sliderSettingButtonInsideDes}>
                  View All
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => {
                setOpen(true);
                setActiveView("map");
              }}
              className={Styles.sliderSettingButton}
            >
              {" "}
              <Box className={Styles.sliderSettingButtonInside}>
                <MapOutlinedIcon />
                <Typography className={Styles.sliderSettingButtonInsideDes}>
                  Map
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => {
                setOpen(true);
                setActiveView("streetView");
              }}
              className={Styles.sliderSettingButton}
            >
              {" "}
              <Box className={Styles.sliderSettingButtonInside}>
                <StreetviewOutlinedIcon />
                <Typography className={Styles.sliderSettingButtonInsideDes}>
                  Street View
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {handleReturnImages(listDetail?.data?.MediaURL, listDetail?.data?.Media)
        ?.length > 1 ? (
        <Box>
          {activeSlide === 0 &&
          handleReturnImages(
            listDetail?.data?.MediaURL,
            listDetail?.data?.Media
          )[activeSlide + 1] ? (
            <Box sx={{ visibility: "hidden", height: "0px", overflow: "none" }}>
              <Image
                sizes="100vw"
                width={500}
                height={300}
                className={Styles.responsiveImage}
                alt="MediaURL"
                src={getOptimizedImageUrl(
                  handleReturnImages(
                    listDetail?.data?.MediaURL,
                    listDetail?.data?.Media
                  )[activeSlide + 1],
                  isSmallScreen ? "416x276" : "2048x1536"
                )}
                unoptimized={
                  isOptimizedImage(
                    handleReturnImages(
                      listDetail?.data?.MediaURL,
                      listDetail?.data?.Media
                    )[activeSlide + 1]
                  )
                    ? true
                    : false
                }
              />
            </Box>
          ) : null}
          {activeSlide === 0 &&
          handleReturnImages(
            listDetail?.data?.MediaURL,
            listDetail?.data?.Media
          )[activeSlide + 2] ? (
            <Box sx={{ visibility: "hidden", height: "0px", overflow: "none" }}>
              <Image
                sizes="100vw"
                width={500}
                height={300}
                className={Styles.responsiveImage}
                alt="MediaURL"
                src={getOptimizedImageUrl(
                  handleReturnImages(
                    listDetail?.data?.MediaURL,
                    listDetail?.data?.Media
                  )[activeSlide + 2],
                  isSmallScreen ? "416x276" : "2048x1536"
                )}
                unoptimized={
                  isOptimizedImage(
                    handleReturnImages(
                      listDetail?.data?.MediaURL,
                      listDetail?.data?.Media
                    )[activeSlide + 2]
                  )
                    ? true
                    : false
                }
              />
            </Box>
          ) : null}
          {handleReturnImages(
            listDetail?.data?.MediaURL,
            listDetail?.data?.Media
          )[activeSlide + 3] ? (
            <Box sx={{ visibility: "hidden", height: "0px", overflow: "none" }}>
              <Image
                sizes="100vw"
                width={500}
                height={300}
                className={Styles.responsiveImage}
                alt="MediaURL"
                src={getOptimizedImageUrl(
                  handleReturnImages(
                    listDetail?.data?.MediaURL,
                    listDetail?.data?.Media
                  )[activeSlide + 3],
                  isSmallScreen ? "416x276" : "2048x1536"
                )}
                unoptimized={
                  isOptimizedImage(
                    handleReturnImages(
                      listDetail?.data?.MediaURL,
                      listDetail?.data?.Media
                    )[activeSlide + 3]
                  )
                    ? true
                    : false
                }
              />
            </Box>
          ) : null}
        </Box>
      ) : null}
      {/* 
  1  1*1+1=2 1*1+2=3 1*1+3=4
  2  2*2+1=5 2*2+2=6 2*2+3=7
  3  3*2+1=1
*/}
      <FullScreenDialog
        open={open}
        activeView={activeView}
        setActiveView={setActiveView}
        setOpen={setOpen}
      />
    </Box>
  );
}
export default SliderView;
