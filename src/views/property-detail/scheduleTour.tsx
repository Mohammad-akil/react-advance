import React, { useState, useEffect } from "react";
import Styles from "../../styles/property-detail/scheduleTour.module.css";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import moment from "moment-timezone";
import ScheduleContactForm from "./scheduleContactForm";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { formatPhoneNumber } from "../../utils/common";
import { storeEvent } from "../../store/events/storeEvent";
import { useAppDispatch } from "../../store/store";
const sliderArrowStyle = {
  cursor: "pointer",
  position: "absolute",
  zIndex: "2",
  fontSize: "28px",
  color: "#666666",
  background: "#eaeaed",
  borderRadius: "10%",
  top: "43%",
};

export const weekData = [
  {
    weekDay: "",
    icon: <AccessAlarmIcon sx={{ fontSize: "25px" }} />,
    weekMonth: "ASAP",
    dateNumber: "",
    id: 1,
    ISODate: moment().tz("America/New_York").format(),
  },
  {
    weekDay: moment().tz("America/New_York").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").format("MMM"),
    dateNumber: moment().tz("America/New_York").date(),
    ISODate: moment().tz("America/New_York").format(),
    id: 2,
  },
  {
    weekDay: moment().tz("America/New_York").add(1, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(1, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(1, "day").date(),
    ISODate: moment().tz("America/New_York").add(1, "day").format(),
    id: 3,
  },
  {
    weekDay: moment().tz("America/New_York").add(2, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(2, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(2, "day").date(),
    ISODate: moment().tz("America/New_York").add(2, "day").format(),
    id: 4,
  },
  {
    weekDay: moment().tz("America/New_York").add(3, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(3, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(3, "day").date(),
    ISODate: moment().tz("America/New_York").add(3, "day").format(),
    id: 5,
  },
  {
    weekDay: moment().tz("America/New_York").add(4, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(4, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(4, "day").date(),
    ISODate: moment().tz("America/New_York").add(4, "day").format(),
    id: 6,
  },
  {
    weekDay: moment().tz("America/New_York").add(5, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(5, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(5, "day").date(),
    ISODate: moment().tz("America/New_York").add(5, "day").format(),
    id: 7,
  },
  {
    weekDay: moment().tz("America/New_York").add(6, "day").format("ddd"),
    icon: "",
    weekMonth: moment().tz("America/New_York").add(6, "day").format("MMM"),
    dateNumber: moment().tz("America/New_York").add(6, "day").date(),
    ISODate: moment().tz("America/New_York").add(6, "day").format(),
    id: 8,
  },
];

interface ScheduleTourProps {
  [key: string]: string;
}

function ScheduleTour(props: ScheduleTourProps) {
  let { isAllowOnlyCalendar } = props;
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Number | string>(1);
  const [isNeedMoreHelp, setIsNeedMoreHelp] = useState<Boolean>(false);
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const [tourType, setTourType] = useState("in-person");
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const ArrowLeft = ({ onClick }: any) => (
    <NavigateBefore
      sx={{ ...sliderArrowStyle, left: "-30px" }}
      onClick={onClick}
    />
  );

  const ArrowRight = ({ onClick }: any) => (
    <NavigateNext
      sx={{ ...sliderArrowStyle, right: "-30px" }}
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
    responsive: isAllowOnlyCalendar
      ? [
          {
            breakpoint: 7000,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              initialSlide: 1,
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
        ]
      : [
          {
            breakpoint: 7000,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 3,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 800,
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
    prevArrow: <ArrowLeft />,
  };
  const isListingActive = () => {
    if (
      listDetail?.data?.StandardStatus === "Active" ||
      listDetail?.data?.StandardStatus === "Active Under Contract"
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 800;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  return (
    <Box
      id="schedule-tour"
      className={Styles.ScheduleTourArea}
      sx={{
        backgroundColor: isAllowOnlyCalendar ? "white !important" : "",
        border: isAllowOnlyCalendar ? "1px solid white !important" : "",
        top: isAllowOnlyCalendar ? "0px !important" : "",
      }}
    >
      {isListingActive() && !isAllowOnlyCalendar ? (
        <Typography className={Styles.ScheduleTourHeading}>
          Schedule a Tour
        </Typography>
      ) : null}
      {!isAllowOnlyCalendar ? (
        <Box className={Styles.scheduleContact}>
          <Card elevation={0} sx={{ backgroundColor: "transparent" }}>
            <CardHeader
              classes={{
                title: Styles.scheduleContactHeading,
                subheader: Styles.scheduleContactSubHeading,
              }}
              title={
                isAuthenticated && authDetail?.assignedAgent
                  ? authDetail?.assignedAgent?.firstName +
                    " " +
                    authDetail?.assignedAgent?.lastName
                  : site?.defaultDisplayingAgent?.firstName
                  ? site?.defaultDisplayingAgent?.firstName +
                    " " +
                    site?.defaultDisplayingAgent?.lastName
                  : process.env.NEXT_PUBLIC_CONTACT_PERSON_NAME
              }
              subheader={
                <Typography
                  component={"a"}
                  href={`tel:${
                    isAuthenticated && authDetail?.assignedAgent
                      ? authDetail?.assignedAgent?.phone === "n/a"
                        ? authDetail?.assignedAgent?.email
                        : formatPhoneNumber(authDetail?.assignedAgent?.phone)
                      : site?.defaultDisplayingAgent?.phone
                      ? formatPhoneNumber(site?.defaultDisplayingAgent?.phone)
                      : formatPhoneNumber(
                          process.env.NEXT_PUBLIC_CONTACT_PERSON_PHONE
                        )
                  }`}
                  className={Styles.scheduleContactSubHeading}
                  onClick={() => {
                    dispatch(
                      storeEvent({
                        type: "Incoming Call",
                        description: `Lead called ${
                          isAuthenticated && authDetail?.assignedAgent
                            ? authDetail?.assignedAgent?.phone === "n/a"
                              ? authDetail?.assignedAgent?.email
                              : formatPhoneNumber(
                                  authDetail?.assignedAgent?.phone
                                )
                            : site?.defaultDisplayingAgent?.phone
                            ? formatPhoneNumber(
                                site?.defaultDisplayingAgent?.phone
                              )
                            : formatPhoneNumber(
                                process.env.NEXT_PUBLIC_CONTACT_PERSON_PHONE
                              )
                        }`,
                      })
                    );
                  }}
                >
                  {isAuthenticated && authDetail?.assignedAgent
                    ? authDetail?.assignedAgent?.phone === "n/a"
                      ? authDetail?.assignedAgent?.email
                      : formatPhoneNumber(authDetail?.assignedAgent?.phone)
                    : site?.defaultDisplayingAgent?.phone
                    ? formatPhoneNumber(site?.defaultDisplayingAgent?.phone)
                    : formatPhoneNumber(
                        process.env.NEXT_PUBLIC_CONTACT_PERSON_PHONE
                      )}
                </Typography>
              }
              avatar={
                <Avatar
                  sx={{ width: "50px", height: "70px" }}
                  src={
                    isAuthenticated && authDetail?.assignedAgent
                      ? authDetail?.assignedAgent?.profileImg
                      : site?.defaultDisplayingAgent?.profileImg
                      ? site?.defaultDisplayingAgent?.profileImg
                      : process.env.NEXT_PUBLIC_CONTACT_PERSON_PROFILE_URL
                  }
                  aria-label="recipe"
                  alt={process.env.NEXT_PUBLIC_CONTACT_PERSON_NAME}
                  variant="rounded"
                />
              }
            />
          </Card>
        </Box>
      ) : null}

      {isListingActive() ? (
        <Box className={Styles.scheduleTypeArea}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#666666",
                },
              }}
              onChange={(e) => {
                setTourType(e.target.value);
              }}
              value={tourType}
            >
              <FormControlLabel
                value="in-person"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: "#666666",
                      },
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                  />
                }
                label="In-Person Tour"
              />
              <FormControlLabel
                value="video-chat"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: "#666666",
                      },
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                  />
                }
                label="Video Chat Tour"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      ) : null}
      {isListingActive() ? (
        <Box className={Styles.scheduleDateSelectionArea}>
          <Slider {...settings}>
            {weekData.map((item, index) => (
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
                <Typography className={Styles.scheduleDateSelectionItemDay}>
                  {item.weekDay}
                </Typography>
                <Box
                  className={Styles.scheduleDateSelectionItemBox}
                  sx={{
                    background: item.id === selectedDate ? "#4c516d" : "",
                    color:
                      item.id === selectedDate
                        ? "white !important"
                        : "#666666 !important",
                  }}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <Typography
                      sx={{
                        color:
                          item.id == selectedDate
                            ? "white !important"
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
                        item.id === selectedDate
                          ? "white !important"
                          : "#666666",
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
      ) : null}
      {isListingActive() ? (
        <Typography className={Styles.scheduleDateDescription}>
          Choose Your Date -- It's Free, Cancel Anytime
        </Typography>
      ) : (
        <Typography className={Styles.NeedMoreDescription}>
          Need more info?
        </Typography>
      )}
      {isListingActive() && !isAllowOnlyCalendar ? (
        <Box className={Styles.scheduleBottomButtons}>
          <Button
            variant="contained"
            className={Styles.scheduleBottomTour}
            fullWidth
            onClick={() => {
              if (selectedDate) {
                setOpen(true);
                setIsNeedMoreHelp(false);
              }
            }}
          >
            Tour This Home
          </Button>
          <Button
            variant="outlined"
            className={Styles.scheduleBottomEmail}
            color="inherit"
            fullWidth
            onClick={() => {
              setOpen(true);
              setIsNeedMoreHelp(true);
              setSelectedDate("");
            }}
          >
            Email Agent
          </Button>
        </Box>
      ) : !isAllowOnlyCalendar ? (
        <Box className={Styles.scheduleBottomButtons}>
          <Button
            variant="contained"
            className={Styles.scheduleBottonAskQuestion}
            fullWidth
            onClick={() => {
              setOpen(true);
              setIsNeedMoreHelp(true);
              setSelectedDate("");
            }}
          >
            Ask a Question
          </Button>
        </Box>
      ) : null}
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
      {isVisible ? (
        <Stack
          direction={"row"}
          className={Styles.scheduleTourStickBox}
          spacing={2}
          alignItems={"center"}
        >
          <Button
            size="small"
            sx={{ height: "30px" }}
            fullWidth
            className={Styles.scheduleBottomTour}
            onClick={() => {
              setOpen(true);
              setIsNeedMoreHelp(false);
            }}
          >
            Schedule Tour
          </Button>
          <Box sx={{ minWidth: "50px" }} className={Styles.statsBarShareItem}>
            <Typography className={Styles.statsBarItemTitle}>Save</Typography>
            <Box className={Styles.statsBarShareIIcon}>
              <FavoriteBorderOutlinedIcon
                sx={{ color: "#666666", textAlign: "center" }}
              />
            </Box>
          </Box>
          <Box sx={{ minWidth: "50px" }} className={Styles.statsBarShareItem}>
            <Typography className={Styles.statsBarItemTitle}>Share</Typography>
            <Box className={Styles.statsBarShareIIcon}>
              <EmailOutlinedIcon
                sx={{ color: "#666666", textAlign: "center" }}
              />
            </Box>
          </Box>
        </Stack>
      ) : null}
    </Box>
  );
}
export default ScheduleTour;
