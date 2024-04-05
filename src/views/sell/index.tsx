"use client";
import React from "react";
import { Box } from "@mui/material";
import Style from "../../styles/sell.module.css";
import BannerSection from "./banner";
import ContactSection from "./contact";
import MakeOverSection from "./makeover";
// import MethodSection from "./method";
function SellWithMethod() {
  return (
    <Box className={Style.sellWithMethod}>
      <BannerSection />
      <ContactSection />
      <MakeOverSection />
      {/* <MethodSection /> */}
    </Box>
  );
}

export default SellWithMethod;
