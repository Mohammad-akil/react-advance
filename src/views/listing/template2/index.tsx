"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import Styles from "../../../styles/listing1/main.module.css";
import BannerSection from "./bannerSection";
import AboutSection from "./aboutSection";
import FeaturesSection from "./featuresSection";
import GallerySection from "./gallerySection";
import MediaSection from "./mediaSection";
import LocationSection from "./locationSection";
import AgentSection from "./agentSection";
import ContactSection from "./contactSection";
import SimilarHomes from "../../property-detail-1/similarHomes";
interface templateProps {
  [key: string]: any;
}
function PropertyListingTemplate2(props: templateProps) {
  return (
    <Box className={Styles.listingTemplateArea}>
      <BannerSection {...props} />
      <Box
        className={`${Styles.propertyContentWrap}  ${Styles.posR} ${Styles.dInlineBlock} ${Styles.fullWidth}`}
      >
        <Container>
          <AboutSection {...props} />
          <FeaturesSection {...props} />
        </Container>
        <GallerySection {...props} />
        <MediaSection {...props} />
        <LocationSection {...props} />
        <AgentSection {...props} />
        <ContactSection {...props} />
      </Box>
      <Container sx={{ mt: "-80px", mb: "100px" }}>
        <SimilarHomes isMPListing={true} {...props} />
      </Container>
    </Box>
  );
}
export default PropertyListingTemplate2;
