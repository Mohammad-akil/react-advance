"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Card,
  Skeleton,
  Divider,
} from "@mui/material";
import Styles from "../../../styles/agents/detail.module.css";
import Image from "next/image";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import PropertyTileCard from "../../property-search/results/propertyTileCard";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { getAgentPropertyList, getAgentDetail } from "../../../store/agents";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AgentContact from "./contact";
const sampleIMage =
  "https://method-platform-sandbox.s3.amazonaws.com/noProfileImage.png";

interface AgentDetailProps {
  [Key: string]: any;
}

function AgentDetail(props: AgentDetailProps) {
  const [open, setOpen] = useState(false);
  let { id } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const agentDetail = useSelector(
    (state: RootState) => state.agentsInfo.agentDetail.data
  );
  const isLoading = useSelector(
    (state: RootState) => state.agentsInfo.agentDetail.isLoading
  );

  const agentListings = useSelector(
    (state: RootState) => state.agentsInfo.agentListings
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!agentListings?.isLoading) {
        if (
          Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
          document.documentElement.offsetHeight
        ) {
          if (
            Number(agentListings?.meta?.numFound || 0) >
            agentListings?.data?.length
          ) {
            if (agentDetail?.mlsUserNames) {
              dispatch(
                getAgentPropertyList({
                  agentMlsId:
                    agentDetail?.mlsUserNames[
                      `${process.env.NEXT_PUBLIC_DATASET || 0}`
                    ],
                  rows: 8,
                  start: agentListings?.data?.length,
                  allowPrefix: true,
                })
              );
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [agentListings?.data?.length]);

  useEffect(() => {
    if (agentDetail?.mlsUserNames && agentDetail?._id) {
      dispatch(
        getAgentPropertyList({
          agentMlsId:
            agentDetail?.mlsUserNames[
              `${process.env.NEXT_PUBLIC_DATASET || 0}`
            ],
          rows: 8,
          reset: true,
          allowPrefix: true,
        })
      );
    }
  }, [agentDetail?._id]);

  useEffect(() => {
    if (id && !isLoading && agentDetail?._id !== id) {
      dispatch(getAgentDetail({ agentId: id }));
    }
  }, [id]);

  return (
    <Fragment>
      <Container maxWidth="xl" className={Styles.agentDetailArea}>
        <Grid container spacing={2} className={Styles.profileTopArea}>
          <Grid item xs={12} md={4} lg={3.5}>
            <Box className={Styles.agentProfilePicArea}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={250}
                  height={250}
                />
              ) : (
                <Image
                  style={{
                    objectFit: "cover",
                  }}
                  width={250}
                  height={250}
                  src={agentDetail?.profileImg || sampleIMage}
                  alt="MediaURL"
                  loading="lazy"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = sampleIMage;
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={8.5}>
            {isLoading ? (
              <Skeleton
                variant="text"
                animation="wave"
                width={300}
                height={50}
              />
            ) : (
              <Typography
                className={Styles.agentNameHeading}
                sx={{ mb: "50px" }}
              >
                {agentDetail?.firstName} {agentDetail?.lastName}
              </Typography>
            )}

            {/* <Typography
              className={Styles.agentNameSubHeading}
            >
              Joined At {moment(agentDetail?.createdAt).format("l")}{" "}
              {moment(agentDetail?.createdAt).format("LT")}
            </Typography> */}
            {isLoading ? (
              <Skeleton
                variant="text"
                animation="wave"
                width={280}
                height={40}
                sx={{ mt: "50px" }}
              />
            ) : (
              <Typography className={Styles.profileContent}>
                {" "}
                {agentDetail?.email}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton
                variant="text"
                animation="wave"
                width={280}
                height={40}
              />
            ) : (
              <Typography className={Styles.profileContent}>
                {" "}
                M: {agentDetail?.phone}
              </Typography>
            )}
            <Box className={Styles.agentProfileButtonArea}>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={250}
                  height={60}
                />
              ) : (
                <Button
                  className={Styles.workWithButton}
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                >
                  Work with {agentDetail?.firstName} {agentDetail?.lastName}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={Styles.profileTopArea}>
          <Grid item xs={12} md={4} lg={3.5}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosRoundedIcon sx={{ fontSize: "18px" }} />}
              className={Styles.backButton}
              color="inherit"
              onClick={() => router.push("/agents")}
            >
              Back to Agent List
            </Button>
          </Grid>
          <Grid item xs={12} md={8} lg={8.5}>
            {" "}
            {isLoading ? (
              <Skeleton
                variant="text"
                animation="wave"
                width={300}
                height={50}
              />
            ) : agentDetail?.bio ? (
              <Typography className={Styles.agentNameHeading}>
                About {agentDetail?.firstName} {agentDetail?.lastName}
              </Typography>
            ) : null}{" "}
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={400}
              />
            ) : (
              <Typography className={Styles.profileContent}>
                {agentDetail?.bio || ""}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
      {agentDetail?.mlsUserNames ? (
        <Box>
          <Box className={Styles.agentListingHeadingArea}>
            <Typography className={Styles.agentListingHeading}>
              {agentDetail?.firstName} {agentDetail?.lastName}'s Transactions
            </Typography>
          </Box>
          <Container maxWidth="xl" className={Styles.agentDetailArea}>
            <Grid container spacing={3} sx={{ mt: "10px" }}>
              {agentListings?.data?.length ? (
                agentListings?.data?.map((item: any, index: number) => (
                  <PropertyTileCard item={item} key={index} />
                ))
              ) : !agentListings?.isLoading ? (
                <Box className={Styles.noResultArea}>
                  <Box className={Styles.noResultAreaInner}>
                    <center>
                      {" "}
                      <TravelExploreIcon
                        sx={{ fontSize: "150px", color: "grey" }}
                      />
                    </center>
                    <Typography className={Styles.noResultFoundHeading}>
                      No Listings Found
                    </Typography>
                  </Box>
                </Box>
              ) : null}
              {agentListings?.isLoading
                ? Array.from(Array(8).keys()).map((item, index: number) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      sx={{ cursor: "pointer" }}
                    >
                      <Card
                        variant="outlined"
                        className={Styles.propertyResultsAreaItem}
                      >
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={230}
                          width="100%"
                          style={{ marginBottom: 3 }}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={50}
                          width="100%"
                          style={{ marginTop: 3 }}
                        />
                        <Divider />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height={120}
                          width="100%"
                          style={{ marginTop: 3 }}
                        />
                      </Card>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Container>
        </Box>
      ) : null}
      <AgentContact open={open} setOpen={setOpen} agentDetail={agentDetail} />
    </Fragment>
  );
}
export default AgentDetail;
