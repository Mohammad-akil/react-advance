"use client";
import React, { Fragment, useEffect, useState } from "react";
import Styles from "../../../styles/property-search/result.module.css";
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Divider,
  Skeleton,
  Button,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { getPropertyList } from "../../../store/property-list";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ResultsMap from "./map";
import FilterHeader from "../results/filterHeader";
import PropertyTileCard from "../results/propertyTileCard";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import { returnKeyExistsInObject } from "../../../utils/propertyData";
import { searchKeys } from "../../../utils/propertyData";
interface propertyDetailProps {
  [key: string]: any;
}

function PropertySearchResults(props: propertyDetailProps) {
  const [activeView, setActiveView] = useState("list");
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<Boolean>(false);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const dispatch = useAppDispatch();
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
  );

  const storedSearchId = useSelector(
    (state: RootState) => state.propertyList.searchId
  );
  const overwrite = useSelector(
    (state: RootState) => state.propertyList.overwrite
  );
  const defaultCenter = useSelector(
    (state: RootState) => state.propertyList.center
  );
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const suggestions = useSelector(
    (state: RootState) => state.propertyList.suggestions
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);

  const handleCheckIsCordsReq = () => {
    if (searchKeys?.find((it: any) => searchParams?.hasOwnProperty(it))) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    dispatch(
      getPropertyList({
        coordinates: handleCheckIsCordsReq() ? defaultCenter : null,
        rows: 50,
        overwrite: overwrite,
        searchId: overwrite ? storedSearchId : "",
        loading: true,
        reset: true,
      })
    );
  }, [searchParams]);

  return (
    <Fragment>
      <FilterHeader />
      <Container
        maxWidth="xl"
        sx={{ mt: "30px" }}
        className={Styles.propertyResultsPage}
      >
        {!isLargeScreen &&
        searchParams[
          returnKeyExistsInObject(searchParams, Object.keys(suggestions))
        ] ? (
          <Typography className={Styles.resultsDemoTitle}>
            Results for{" "}
            {
              searchParams[
                returnKeyExistsInObject(searchParams, Object.keys(suggestions))
              ]
            }{" "}
            {returnKeyExistsInObject(searchParams, Object.keys(suggestions))}
          </Typography>
        ) : (
          ""
        )}

        {!isLargeScreen ? (
          activeView === "list" ? (
            <Box
              onClick={() => setActiveView("map")}
              className={Styles.mapViewButtonSM}
            >
              {" "}
              <MapOutlinedIcon /> Map
            </Box>
          ) : (
            <Box
              onClick={() => setActiveView("list")}
              className={Styles.mapViewButtonSM}
            >
              {" "}
              <ReorderRoundedIcon /> List
            </Box>
          )
        ) : null}

        <Grid container spacing={2}>
          {isLargeScreen || activeView === "map" ? (
            <Grid item xs={12} sm={12} md={8} lg={7}>
              <Box className={Styles.mapViewAreaFixed}>
                {responseList?.isLoading &&
                !isMapLoaded /*  && !responseList?.data?.length */ ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="99%"
                    style={{
                      marginBottom: 3,
                      height: "calc(100vh - 178px) !important",
                      minHeight: "90vh",
                    }}
                  />
                ) : null}
                {!responseList?.isLoading || isMapLoaded ? (
                  <ResultsMap
                    setCenter={setCenter}
                    center={center}
                    selectedMarker={selectedMarker}
                    setSelectedMarker={setSelectedMarker}
                    setIsMapLoaded={setIsMapLoaded}
                    height={
                      !isLargeScreen && activeView === "map"
                        ? "calc(100vh - 65px)"
                        : "calc(100vh - 185px)"
                    }
                  />
                ) : null}
              </Box>{" "}
            </Grid>
          ) : null}

          {isLargeScreen || activeView === "list" ? (
            <Grid item xs={12} sm={12} md={4} lg={5}>
              <Grid
                container
                spacing={1}
                className={
                  !isLargeScreen && activeView === "list"
                    ? Styles.resultItemAreaWithMapSM
                    : Styles.resultItemAreaWithMap
                }
              >
                {responseList?.isLoading /* && !responseList?.data?.length */
                  ? Array.from(Array(20).keys()).map((item, index: number) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
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

                {!responseList?.isLoading ? (
                  responseList?.data?.length ? (
                    responseList?.data?.map((item: any, index: number) => (
                      <PropertyTileCard
                        item={item}
                        key={index}
                        setSelectedMarker={setSelectedMarker}
                      />
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
                          Try modifying your search criteria, or click below to
                          get notified when matching listings become available.
                        </Typography>
                        <center>
                          <Button
                            startIcon={<NotificationsIcon />}
                            className={Styles.notifyButton}
                          >
                            Notify Me About New Listings Matching
                          </Button>
                        </center>
                      </Box>
                    </Box>
                  )
                ) : null}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
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
