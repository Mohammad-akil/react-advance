"use client"
import React from "react";
import { Box, Container } from "@mui/material";
import Styles from "../../styles/makeover/main.module.css";
import TopMainArea from "./topMainArea";
import Coverage from "./coverage";
import EligibilityArea from "./eligibility";
import MakeoverDetail from "./detail";
function MethodMakeOver() {
  return (
    <Container maxWidth="xl">
      <Box className={Styles.makeoverPage}>
        <TopMainArea />
        <Coverage />
        <EligibilityArea />
        <MakeoverDetail />
      </Box>
    </Container>
  );
}
export default MethodMakeOver;
