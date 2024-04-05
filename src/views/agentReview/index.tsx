"use client";
import React, { useState, useEffect } from "react";
import Styles from "../../styles/agentReview.module.css";
import { Box, Container, Typography, Card, useMediaQuery } from "@mui/material";
import agentPic from "../../assests/images/agent/agentPic.png";
import savannah_reis1673450201 from "../../assests/images/agent/savannah_reis1673450201.png";
import rateMyAgent from "../../assests/images/agent/rateMyAgent.png";
import realtor from "../../assests/images/agent/realtor.png";
import zillow from "../../assests/images/agent/zillow.png";
import ciara_mcafee from "../../assests/images/agent/ciara_mcafee.png";
import taya_dabney from "../../assests/images/agent/taya_dabney.png";
import adrianna_toledo from "../../assests/images/agent/adrianna_toledo.png";
import cary_blumenfeld from "../../assests/images/agent/cary_blumenfeld.png";
import googleIcon from "../../assests/images/agent/Google_Icons-09-512.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";

const agentsData = [
  {
    id: "cheryllyn-smith",
    firstName: "Cheryllyn",
    lastName: "Smith",
    profileUrl: agentPic,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/cheryllynsmith",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/5f0c818a99d2170011bad901",
        icon: realtor,
      },
      {
        title: " Rate My Agent",
        url: "https://www.ratemyagent.com/real-estate-agent/cheryllyn-smith-b14iue/sales/overview",
        icon: rateMyAgent,
      },
    ],
  },
  {
    id: "savannah-reis",
    firstName: "Savannah",
    lastName: "Reis",
    profileUrl: savannah_reis1673450201,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/savannahreissells/",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/6231f7ea9fabff5ba5f53828",
        icon: realtor,
      },
      {
        title: " Rate My Agent",
        url: "https://www.ratemyagent.com/real-estate-agent/savannah-reis-b2akw0/sales/overview",
        icon: rateMyAgent,
      },
    ],
  },
  {
    id: "ciara-mcafee",
    firstName: "Ciara",
    lastName: "McAfee",
    profileUrl: ciara_mcafee,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/cmcafee2015/",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/61c21fa78a4c582105877543",
        icon: realtor,
      },
      // {
      //   title: " Rate My Agent",
      //   url: "https://www.ratemyagent.com/real-estate-agent/ciara-mcafee-b1l6de/sales/overview",
      //   icon: rateMyAgent,
      // },
    ],
  },
  {
    id: "taya-dabney",
    firstName: "Taya",
    lastName: "Dabney",
    profileUrl: taya_dabney,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/tayadabney",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/64188452d02d4dc3c1d1f2d5",
        icon: realtor,
      },
      {
        title: " Rate My Agent",
        url: "https://www.ratemyagent.com/real-estate-agent/taya-dabney-b2qgxz/sales/overview",
        icon: rateMyAgent,
      },
    ],
  },
  {
    id: "adrianna-toledo",
    firstName: "Adrianna",
    lastName: "Toledo",
    profileUrl: adrianna_toledo,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/Adrianna%20Toledo",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/6321b52447d30d9b28391720",
        icon: realtor,
      },
      {
        title: " Rate My Agent",
        url: "https://www.ratemyagent.com/real-estate-agent/adrianna-toledo-b1r38t/sales/overview",
        icon: rateMyAgent,
      },
    ],
  },
  {
    id: "cary-blumenfeld",
    firstName: "Cary",
    lastName: "Blumenfeld",
    profileUrl: cary_blumenfeld,
    sites: [
      {
        title: "Zillow",
        url: "https://www.zillow.com/profile/Cary%20Blumenfeld",
        icon: zillow,
      },
      {
        title: "Realtor.com",
        url: "https://www.realtor.com/realestateagents/567365737e54f701001db677",
        icon: realtor,
      },
      {
        title: " Rate My Agent",
        url: "https://www.ratemyagent.com/real-estate-agent/cary-blumenfeld-b1cm1p/sales/overview",
        icon: rateMyAgent,
      },
      {
        title: " Google",
        url: "https://g.co/kgs/7n6G1xB",
        icon: googleIcon,
      },
    ],
  },
];
interface agentProps {
  [key: string]: any;
}

function AgentReviewSection(props: agentProps) {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [agentData, setAgentData] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    let id = props?.params?.id || props?.params?.id?.[0];
    if (id && agentsData.find((item: any) => item.id === id)) {
      setAgentData(agentsData.find((item: any) => item.id === id));
    } else {
      router.push("/");
    }
  }, [props?.params?.id]);
  return (
    <Box className={Styles.agentReviewSection}>
      <Container maxWidth="xl">
        <Typography className={Styles.agentReviewHeading}>
          Thank you for taking the time to review{" "}
          <span>
            {agentData?.firstName} {agentData?.lastName}
          </span>
        </Typography>
        <Box className={Styles.agentReviewProfile}>
          {" "}
          <Image
            width={isSmallScreen ? 150 : 250}
            height={isSmallScreen ? 150 : 250}
            style={{
              cursor: "pointer",
              objectFit: "contain",
              zIndex: "2",
            }}
            src={agentData?.profileUrl}
            alt="MediaURL"
          />
        </Box>
        <br />
        <Typography className={Styles.agentReviewSubHeading}>
          {agentData?.firstName}’s Review Sites
        </Typography>
        <Box className={Styles.sitesSection}>
          {agentData?.sites?.length
            ? agentData?.sites?.map((item: any, index: number) => (
                <Card
                  variant="outlined"
                  key={index}
                  component={"a"}
                  href={item?.url}
                  target="_blank"
                  className={Styles.sitesSectionItem}
                >
                  <Box className={Styles.sitesSectionItemInner}>
                    <center>
                      <Image
                        width={isSmallScreen ? 100 : 200}
                        height={isSmallScreen ? 100 : 200}
                        style={{
                          cursor: "pointer",
                          objectFit: "contain",
                          zIndex: "1",
                        }}
                        src={item?.icon}
                        alt="MediaURL"
                      />
                    </center>
                    <Typography className={Styles.sitesSectionContent}>
                      {item.title}
                    </Typography>
                  </Box>
                </Card>
              ))
            : null}
        </Box>
      </Container>
    </Box>
  );
}

export default AgentReviewSection;
