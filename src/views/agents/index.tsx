"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import Styles from "../../styles/agents/list.module.css";
import Image from "next/image";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { getAgentsList, handleUpdatePageNumber } from "../../store/agents";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "../../utils/common";

const sampleIMage =
  "https://method-platform-sandbox.s3.amazonaws.com/noProfileImage.png";

function AgentsList() {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading, pageNumber, meta } = useSelector(
    (state: RootState) => state.agentsInfo.agentList
  );

  useEffect(() => {
    if((data?.length/20)<pageNumber){
      dispatch(getAgentsList());
    }
  }, [pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isLoading || pageNumber === 1) {
        if (
          Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
          document.documentElement.offsetHeight
        ) {
          if (Number(data?.length || 0) < Number(meta?.count || 0)) {
            dispatch(handleUpdatePageNumber({}));
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNumber, data?.length]);

  return (
    <Container maxWidth="xl">
      <Box className={Styles.agentListPage}>
        <Typography
          sx={{ textAlign: isSmallScreen ? "center" : "left" }}
          className={Styles.agentListHeading}
        >
          Our Agents
        </Typography>
        <Grid container spacing={2} sx={{ mt: "15px" }}>
          {data?.length ? (
            data?.map((item: any, index: number) => (
              <Grid
                onClick={() => {
                  router.push(`/agents/${item?.slug}`);
                }}
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display={isSmallScreen ? "flex" : ""}
                justifyContent={"center"}
              >
                <Card
                  sx={{
                    maxWidth: isSmallScreen ? "330px" : "100%",
                    minWidth: isSmallScreen ? "300px" : "",
                  }}
                  variant="outlined"
                >
                  <CardActionArea>
                    <Image
                      sizes="100vw"
                      style={{
                        zIndex: "5",
                        width: "100%",
                        height: "330px",
                        cursor: "pointer",
                        objectFit: "cover",
                        borderBottom: "1px solid lightgrey",
                      }}
                      width={500}
                      height={300}
                      src={item?.profileImg || sampleIMage}
                      alt="MediaURL"
                      loading="lazy"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = sampleIMage;
                      }}
                    />
                    <Box className={Styles.agentCardDetail}>
                      <Typography className={Styles.agentName}>
                        {item?.firstName} {item?.lastName}
                      </Typography>
                      <Typography className={Styles.agentEmail}>
                        {item?.email}
                      </Typography>
                      <Typography className={Styles.agentPhone}>
                        M : {formatPhoneNumber(item?.phone)}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : !isLoading ? (
            <Box className={Styles.noResultArea}>
              <Box className={Styles.noResultAreaInner}>
                <center>
                  {" "}
                  <PersonSearchIcon sx={{ fontSize: "150px", color: "grey" }} />
                </center>
                <Typography className={Styles.noResultFoundHeading}>
                  No Agent Found{" "}
                </Typography>
                <Typography className={Styles.noResultFoundContent}>
                  No agent found yet, But shortly agents list will be available
                  here thanks!
                </Typography>
              </Box>
            </Box>
          ) : null}
          {isLoading
            ? Array.from(Array(20).keys()).map((item, index: number) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ cursor: "pointer" }}
                  display={isSmallScreen ? "flex" : ""}
                  justifyContent={"center"}
                >
                  <Card
                    variant="outlined"
                    className={Styles.propertyResultsAreaItem}
                    sx={{
                      maxWidth: isSmallScreen ? "330px" : "100%",
                      minWidth: isSmallScreen ? "300px" : "",
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height={330}
                      width="100%"
                      style={{ marginBottom: 3 }}
                    />
                    <Box sx={{ padding: "10px 15px", height: "106px" }}>
                      <Skeleton animation="wave" height={35} width="100%" />
                      <Skeleton animation="wave" height={25} width="100%" />
                      <Skeleton animation="wave" height={25} width="100%" />
                    </Box>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
    </Container>
  );
}
export default AgentsList;
