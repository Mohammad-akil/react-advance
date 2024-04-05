import React, { useState } from "react";
import { Dialog, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Style from "../../styles/imageViewer.module.css";
import Slider, { LazyLoadTypes } from "react-slick";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Image from "next/image";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";
const sliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "99",
  fontSize: "50px !important",
  padding: "6px",
  color: "#fff",
  background: "#433F3F",
  borderRadius: "50%",
  top: "43%",
};
const multiSliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "99",
  fontSize: "35px",
  color: "#fff",
  background: "#433F3F",
  height: "80px",
  top: "0.8%",
};

interface imageViewerProps {
  [key: string]: any;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ImageViewer(props: imageViewerProps) {
  let { open, setOpen, images, currentImage } = props;
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const handleClose = () => {
    setOpen(false);
  };
  const [activeSlide, setActiveSlide] = useState<Number>(0);
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

  const settings = {
    dots: false,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: currentImage,
    slidesToScroll: 1,
    lazyLoad: "ondemand" as LazyLoadTypes | undefined,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  const multiSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images?.length < 8 ? images?.length : 8,
    initialSlide: currentImage,
    slidesToScroll: images?.length < 8 ? images?.length : 8,
    lazyLoad: "ondemand" as LazyLoadTypes | undefined,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    responsive:
      images?.length < 8
        ? []
        : [
            {
              breakpoint: 2048,
              settings: {
                slidesToShow: 8,
                slidesToScroll: 8,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 1500,
              settings: {
                slidesToShow: 7,
                slidesToScroll: 7,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                initialSlide: 1,
              },
            },
          ],
    nextArrow: <MultiSliderArrowRight />,
    prevArrow: <MultiSliderArrowLeft />,
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "transparent",
          width: "100%",
          overflow: "hidden",
        },
      }}
      TransitionComponent={Transition}
    >
      <Box className={Style.dialogCustomHeader}>
        <IconButton
          onClick={handleClose}
          className={Style.dialogHeaderCloseButton}
        >
          <CloseIcon sx={{ color: "white" }} fontSize="large" />
        </IconButton>
      </Box>

      <Box className={Style.imageViewerArea}>
        <Box className={Style.imageViewerAreaInner}>
          {" "}
          <Box className={Style.SliderArea}>
            <Box className={Style.mainSliderArea}>
              <Slider
                {...settings}
                asNavFor={nav1}
                ref={(slider2: any) => setNav2(slider2)}
              >
                {images?.map((item: any, index: number, self: any) => (
                  <Box key={item?.id} className={Style.SliderAreaItem}>
                    <Image
                      fill={true}
                      style={{
                        objectFit: "contain",
                      }}
                      src={getOptimizedImageUrl(item, "original")}
                      unoptimized={isOptimizedImage(item) ? true : false}
                      priority
                      alt="MediaURL"
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
            <Box className={Style.sliderSettingArea}>
              <Box className={Style.sliderSettingSlider}>
                <Slider
                  {...multiSetting}
                  asNavFor={nav2}
                  ref={(slider1: any) => setNav1(slider1)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {images?.map((item: any, index: number, self: any) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        height: "78px",
                        position: "relative",
                        mt: "1.5px",
                      }}
                    >
                      <Image
                        sizes="100vw"
                        style={{
                          zIndex: "5",
                          width: "100%",
                          height: "77.5px",
                          opacity: activeSlide == index ? "1" : ".6",
                          cursor: "pointer",
                          borderLeft: "1.5px solid white",
                          borderRight: "1.5px solid white",
                          objectFit: "cover",
                        }}
                        width={500}
                        height={300}
                        src={getOptimizedImageUrl(item, "original")}
                        unoptimized={isOptimizedImage(item) ? true : false}
                        priority
                        alt="MediaURL"
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ImageViewer;
