import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Styles from "../../styles/property-detail-1/tourWidget.module.css";
import Slider from "react-slick";
import { weekData } from "../property-detail/scheduleTour";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import ScheduleContactForm from "../property-detail/scheduleContactForm";
import tourHomeIcon from "../../assests/images/tourHome.png";
import mobileIcon from "../../assests/images/mobile.png";
import { storeEvent } from "../../store/events/storeEvent";
import { useAppDispatch } from "../../store/store";
import Image from "next/image";
import ListingAgent from "./listingAgent";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const sliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "99",
  fontSize: "32px",
  color: "#666666",
  border: "1px solid #dcdcdc",
  backgroundColor: "white",
  borderRadius: "8px",
  top: "30%",
};

interface tourProps {
  [key: string]: any;
}

function TourWidget(props: tourProps) {
  let { isAllowOnlyCalendar } = props;
  const [selectedDate, setSelectedDate] = useState<Number | string>(2);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [tourType, setTourType] = useState("in-person");
  const [isNeedMoreHelp, setIsNeedMoreHelp] = useState<Boolean>(false);

  const authDetail = useSelector((state: RootState) => state.auth.authDetail);

  const ArrowLeft = ({ onClick }: any) => (
    <NavigateBefore
      sx={{ ...sliderArrowStyle, left: "-10px" }}
      onClick={onClick}
    />
  );

  const ArrowRight = ({ onClick }: any) => (
    <NavigateNext
      sx={{ ...sliderArrowStyle, right: "-10px" }}
      onClick={onClick}
    />
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    initialSlide: 0,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 7000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <ArrowRight />,
    prevArrow: activeSlide > 0 ? <ArrowLeft /> : <></>,
  };

  return (
    <Box className={Styles.tourWidgetArea}>
      <Typography className={Styles.tourWidgetHeading}>
        Go tour this home
      </Typography>
      <Box className={Styles.scheduleDateSelectionArea}>
        <Slider {...settings}>
          {weekData?.slice(1).map((item, index) => (
            <Box
              onClick={() => {
                setSelectedDate(item.id);
                if (isAllowOnlyCalendar) {
                  setOpen(true);
                  setIsNeedMoreHelp(false);
                }
              }}
              key={index}
              className={Styles.scheduleDateSelectionItem}
            >
              <Box
                className={Styles.scheduleDateSelectionItemBox}
                sx={{
                  background: item.id === selectedDate ? "#e3eefe" : "",
                  borderColor:
                    item.id === selectedDate ? "#0064f5!important" : "",
                  color:
                    item.id === selectedDate
                      ? "black !important"
                      : "#666666 !important",
                }}
              >
                {item.icon ? null : (
                  <Typography className={Styles.scheduleDateSelectionItemDay}>
                    {item.weekDay}
                  </Typography>
                )}
                {item.icon ? (
                  item.icon
                ) : (
                  <Typography
                    sx={{
                      color:
                        item.id == selectedDate
                          ? "black !important"
                          : "#666666",
                    }}
                    className={Styles.scheduleDateSelectionItemDayNo}
                  >
                    {item.dateNumber}
                  </Typography>
                )}

                <Typography
                  sx={{
                    color:
                      item.id === selectedDate ? "black !important" : "#666666",
                  }}
                  className={Styles.scheduleDateSelectionItemMonth}
                >
                  {item.weekMonth}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
      <Box className={Styles.tourWidgetContentOutline}>
        <Box className={Styles.tourWidgetContent}>
          <Box className={Styles.tourTypeButtons}>
            <Box
              onClick={() => setTourType("in-person")}
              className={
                tourType === "in-person"
                  ? Styles.tourTypeButtonsItemLeftActive
                  : Styles.tourTypeButtonsItemLeft
              }
            >
              {" "}
              <Image
                src={tourHomeIcon}
                width={30}
                height={34}
                alt="Picture of the author"
                style={{ marginTop: "2px" }}
                loading="lazy"
              />
              <Typography
                className={
                  tourType === "in-person"
                    ? Styles.tourTypeButtonsContentActive
                    : Styles.tourTypeButtonsContent
                }
              >
                Tour in person
              </Typography>{" "}
            </Box>
            <Box
              onClick={() => setTourType("video-chat")}
              className={
                tourType === "video-chat"
                  ? Styles.tourTypeButtonsItemRightActive
                  : Styles.tourTypeButtonsItemRight
              }
            >
              <Image
                src={mobileIcon}
                width={30}
                height={34}
                style={{ marginTop: "2px" }}
                alt="Picture of the author"
                loading="lazy"
              />
              <Typography
                className={
                  tourType === "video-chat"
                    ? Styles.tourTypeButtonsContentActive
                    : Styles.tourTypeButtonsContent
                }
              >
                Tour via video chat
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => {
              if (selectedDate) {
                setOpen(true);
                setIsNeedMoreHelp(false);
              }
            }}
            fullWidth
            size="large"
            className={Styles.scheduleTourButton}
          >
            Schedule Tour
          </Button>
          <Typography className={Styles.scheduleTourContent}>
            It's free, cancel anytime
          </Typography>
          <Box className={Styles.dividerArea}>
            <Divider>
              <Typography className={Styles.scheduleTourDividerContent}>
                OR
              </Typography>
            </Divider>
          </Box>
          {(authDetail?.stage === "Buying" ||
            authDetail?.stage === "Engaged" ||
            authDetail?.source === "Agent Sourced") &&
          authDetail?.assignedAgent?.profileImg ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <ListingAgent assignedAgent={authDetail?.assignedAgent} />
            </Box>
          ) : null}

          <Button
            fullWidth
            variant="outlined"
            size="large"
            className={Styles.askQuestionButton}
            onClick={() => {
              setOpen(true);
              setIsNeedMoreHelp(true);
            }}
          >
            Ask a Question
          </Button>
          <Box className={Styles.callUsArea}>
            <Typography className={Styles.callUsContent}>Call Us</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              component={"a"}
              href={`tel:(404) 585-7355`}
              className={Styles.callUsContent}
              onClick={() => {
                dispatch(
                  storeEvent({
                    type: "Incoming Call",
                    description: `Lead called (404) 585-7355`,
                  })
                );
              }}
            >
              (404) 585-7355
            </Typography>
          </Box>
        </Box>
      </Box>
      <ScheduleContactForm
        open={open}
        isNeedMoreHelp={isNeedMoreHelp}
        setOpen={setOpen}
        tourDateTime={
          selectedDate
            ? weekData.find((item) => item.id === selectedDate)?.ISODate
            : null
        }
        tourType={tourType}
      />
    </Box>
  );
}
export default TourWidget;
