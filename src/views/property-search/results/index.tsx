"use client";
import React, { useEffect, Fragment, useState } from "react";
import Styles from "../../../styles/property-search/result.module.css";
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Stack,
  Divider,
  Skeleton,
  Button,
} from "@mui/material";
import Link from "next/link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import {
  getPropertyList,
  handleUpdateParams,
  getSavedSearch,
} from "../../../store/property-list";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FilterHeader from "./filterHeader";
import PropertyTileCard from "./propertyTileCard";
interface propertyDetailProps {
  [key: string]: any;
}
function PropertySearchResults(props: propertyDetailProps) {
  const dispatch = useAppDispatch();
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const storedSearchId = useSelector(
    (state: RootState) => state.propertyList.searchId
  );
  const overwrite = useSelector(
    (state: RootState) => state.propertyList.overwrite
  );
  const pageNumber = useSelector(
    (state: RootState) => state.propertyList.pageNumber
  );
  const currentScroll = useSelector(
    (state: RootState) => state.propertyList.currentScroll
  );
  const searchDetail = useSelector(
    (state: RootState) => state.propertyList.searchDetail
  );
  const favoriteProperties = useSelector(
    (state: RootState) => state.propertyList.favoriteProperties
  );
  let favs = new URLSearchParams(window.location?.search).get("favs");

  useEffect(() => {
    let searchId = new URLSearchParams(window.location?.search).get("searchId");
    if (!favs && !searchId && !responseList?.isLoading) {
      dispatch(
        getPropertyList({
          editSource: pageNumber === 1 ? "website" : null,
          searchId: pageNumber > 1 || overwrite ? storedSearchId : "",
          overwrite: overwrite,
        })
      );
    }
  }, [searchParams]);

  useEffect(() => {
    let searchId = new URLSearchParams(window.location?.search).get("searchId");
    if (searchId) {
      dispatch(getSavedSearch({ searchId, isGetProps: true }));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        currentScroll &&
        Number(currentScroll || 0) > 0 &&
        responseList?.data?.length > 5 &&
        !responseList?.isLoading
      ) {
        window.scrollTo({
          top: Number(currentScroll || 0),
          behavior: "smooth",
        });
      }
    }, 1500);
  }, [responseList?.data?.length]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      handleUpdateParams({
        field: "start",
        value: (value - 1) * 20,
        pageNumber: value,
      })
    );
    let searchId = new URLSearchParams(window.location?.search).get("searchId");
    if (searchId) {
      setTimeout(() => {
        let searchId = new URLSearchParams(window.location?.search).get(
          "searchId"
        );
        dispatch(getPropertyList({ searchId }));
      }, 200);
    }
  };

  return (
    <Fragment>
      {favs ? null : <FilterHeader {...props} />}

      <Container
        maxWidth="xl"
        sx={{ mt: "30px" }}
        className={Styles.propertyResultsPage}
      >
        {(responseList?.data?.length && !responseList?.isLoading) ||
        (favoriteProperties?.data?.length &&
          new URLSearchParams(window.location?.search).get("favs")) ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={1}
            flexWrap={"wrap"}
          >
            {favs ? (
              <Typography className={Styles.propertyResultsPageHeading}>
                {favoriteProperties?.meta.count} Saved Properties
              </Typography>
            ) : new URLSearchParams(window.location?.search).get("searchId") ? (
              <Typography className={Styles.propertyResultsPageHeading}>
                Saved Search: {searchDetail?.title} (
                {responseList?.meta?.numFound} Properties)
              </Typography>
            ) : (
              <Typography className={Styles.propertyResultsPageHeading}>
                {responseList?.meta?.numFound || ""} Results{" "}
              </Typography>
            )}

            <Link
              href="/property-search/advance-search"
              className={Styles.breadCrumpPCLink}
            >
              {" "}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />{" "}
                <Typography className={Styles.backText}>
                  Back to Search*-*-
                </Typography>
              </Stack>
            </Link>
          </Stack>
        ) : null}

        <Grid container spacing={1}>
          {favs
            ? null
            : responseList?.isLoading
            ? Array.from(Array(20).keys()).map((item, index: number) => (
                <Grid
                  key={index}
                  item
                  xs={12}
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
          {favs && favoriteProperties?.data?.length ? (
            favoriteProperties?.data?.map((item: any, index: number) => (
              <PropertyTileCard item={item} key={index} />
            ))
          ) : !responseList?.isLoading ? (
            responseList?.data?.length ? (
              responseList?.data?.map((item: any, index: number) => (
                <PropertyTileCard item={item} key={index} />
              ))
            ) : (
              <Box className={Styles.noResultArea}>
                <Box className={Styles.noResultAreaInner}>
                  <Typography className={Styles.noResultFoundHeadingMain}>
                    Property Search{" "}
                  </Typography>
                  <center>
                    {" "}
                    <TravelExploreIcon
                      sx={{ fontSize: "150px", color: "grey" }}
                    />
                  </center>
                  <Typography className={Styles.noResultFoundHeading}>
                    No Matching Listings
                  </Typography>
                  <Typography className={Styles.noResultFoundContent}>
                    Try modifying your search criteria, or click below to get
                    notified when matching listings become available.
                  </Typography>
                  <center>
                    <Button
                      startIcon={<NotificationsIcon />}
                      className={Styles.notifyButton}
                    >
                      Notify Me About New Listings
                    </Button>
                  </center>
                </Box>
              </Box>
            )
          ) : null}
        </Grid>
        {(!responseList?.isLoading || pageNumber > 1) &&
        responseList?.data?.length &&
        !favs ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ mt: "30px" }}
          >
            <Pagination
              count={Math.ceil(Number(responseList?.meta?.numFound || 0) / 20)}
              onChange={handleChange}
              color="secondary"
              page={pageNumber}
            />
          </Stack>
        ) : null}

        <Box sx={{ margin: "30px 0px" }}>
          <Typography
            dangerouslySetInnerHTML={{
              __html:
                site?.longDisclaimer ||
                responseList?.meta?.siteInfo?.longDisclaimer,
            }}
            className={Styles.disclaimerText}
          ></Typography>
          <Image
            width={150}
            height={40}
            style={{
              cursor: "pointer",
              objectFit: "contain",
              margin: "30px 0px",
            }}
            src={site?.logo || responseList?.meta?.siteInfo?.logo}
            alt={site?.dataset || responseList?.meta?.siteInfo?.dataset}
          />
        </Box>
      </Container>
    </Fragment>
  );
}
export default PropertySearchResults;
