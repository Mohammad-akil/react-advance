"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import Styles from "../../../styles/listing/main.module.css";
import TopBanner from "./topBanner";
import VirtualTour from "./virtualTour";
import Gallery from "./gallery";
import PropertyInfo from "./propertyInfo";
import ListingMap from "./map";
import AgentSection from "./agentSection";
import ContactSection from "./contactSection";
import SimilarHomes from "../../property-detail-1/similarHomes";
interface propertyListingTemplate {
  [key: string]: any;
}
function PropertyListingTemplate1(props: propertyListingTemplate) {
  return (
    <Box className={Styles.listingTemplateArea}>
      <TopBanner {...props} />
      <VirtualTour {...props} />
      <Gallery {...props} />
      <PropertyInfo {...props} />
      <ListingMap {...props} />
      <AgentSection {...props} />
      <ContactSection {...props} />
      <Container sx={{mt:"80px",mb:"100px"}}>
        <SimilarHomes isMPListing={true} {...props} />
      </Container>
    </Box>
  );
}
export default PropertyListingTemplate1;
