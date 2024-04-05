import React, { useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Styles from "../../../styles/listing/agent.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import Slider from "react-slick";
import { formatPhoneNumber } from "../../../utils/common";
import { storeEvent } from "../../../store/events/storeEvent";
import { useAppDispatch } from "../../../store/store";
const sampleIMage =
  "https://method-platform-sandbox.s3.amazonaws.com/noProfileImage.png";
function AgentSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setActiveSlide(newIndex);
    },
    customPaging: (i: any) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: i === activeSlide ? "white" : "grey", // Change the color based on your condition
          borderRadius: "50%",
        }}
        onClick={() => alert(i)}
      >
        {" "}
      </div>
    ),
  };

  return (
    <Box
      className={Styles.agentSection}
      sx={{
        paddingBottom: listDetail?.data?.transaction_listings_v2?.agent?.reviews
          ?.length
          ? ""
          : "50px",
      }}
    >
      <Container>
        <Typography className={Styles.listingAgentHeading}>
          {listDetail?.data?.transaction_listings_v2?.agent?.full_name}
        </Typography>
        {listDetail?.data?.transaction_listings_v2?.agent?.license_type ? (
          <Typography className={Styles.listingAgentContent}>
            {listDetail?.data?.transaction_listings_v2?.agent?.license_type ===
              "SLSP" ||
            listDetail?.data?.transaction_listings_v2?.agent?.license_type ===
              "Salesperson"
              ? "Realtor®"
              : listDetail?.data?.transaction_listings_v2?.agent
                  ?.license_type === "AKBR"
              ? "Associate Broker"
              : listDetail?.data?.transaction_listings_v2?.agent
                  ?.license_type}{" "}
            • Method Real Estate Advisors
          </Typography>
        ) : null}

        <Box className={Styles.agentInfoSection}>
          <Box className={Styles.agentInfoSectionInner}>
            <Box sx={{ position: "relative", height: "300px", width: "300px" }}>
              <Image
                layout="fill"
                objectFit="contain"
                style={{
                  cursor: "pointer",
                  zIndex: "5",
                  objectFit: "cover",
                }}
                src={
                  listDetail?.data?.transaction_listings_v2?.agent
                    ?.profile_images?.profile_img ||
                  listDetail?.data?.transaction_listings_v2?.agent
                    ?.profile_images?.profile_img_thumbnail ||
                  sampleIMage
                }
                alt="MediaURL"
                loading="lazy"
              />
            </Box>
            <Box className={Styles.agentInfoSectionInnerDesc}>
              <Typography
                component={"a"}
                href={`tel:${listDetail?.data?.transaction_listings_v2?.agent?.phone}`}
                className={Styles.agentInfoSectionInnerDescItem}
                onClick={() =>
                  dispatch(
                    storeEvent({
                      type: "Incoming Call",
                      description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                    })
                  )
                }
              >
                {" "}
                <PhoneIphoneOutlinedIcon /> Cell:{" "}
                {formatPhoneNumber(
                  listDetail?.data?.transaction_listings_v2?.agent?.phone
                )}
              </Typography>
              {listDetail?.data?.transaction_listings_v2?.agent
                ?.officeNumber ? (
                <Typography
                  component={"a"}
                  href={`tel:${listDetail?.data?.transaction_listings_v2?.agent?.officeNumber}`}
                  className={Styles.agentInfoSectionInnerDescItem}
                  onClick={() =>
                    dispatch(
                      storeEvent({
                        type: "Incoming Call",
                        description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                      })
                    )
                  }
                >
                  {" "}
                  <PhoneIphoneOutlinedIcon /> Office:{" "}
                  {
                    listDetail?.data?.transaction_listings_v2?.agent
                      ?.officeNumber
                  }
                </Typography>
              ) : null}

              <Typography className={Styles.agentInfoSectionInnerDescItem}>
                {" "}
                <EmailIcon />{" "}
                {listDetail?.data?.transaction_listings_v2?.agent?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <center>
          <Typography className={Styles.listingAgentExplanation}>
            If you’re in the market to buy or sell a home, you’ve come to the
            right spot! Whatever your real estate needs may be, I can help you
            reach your goals with confidence.
          </Typography>
        </center>
      </Container>
      {listDetail?.data?.transaction_listings_v2?.agent?.reviews?.length ? (
        <Box className={Styles.clientTestimonialsArea}>
          <Typography className={Styles.clientTestimonialsHeading}>
            Client Testimonials
          </Typography>
          <Container>
            {" "}
            <Slider {...settings}>
              {listDetail?.data?.transaction_listings_v2?.agent?.reviews?.map(
                (item: any, index: number) => (
                  <Typography
                    key={index}
                    className={Styles.clientTestimonialsContent}
                  >
                    {item?.review}
                  </Typography>
                )
              )}
            </Slider>
          </Container>
        </Box>
      ) : null}
    </Box>
  );
}
export default AgentSection;
