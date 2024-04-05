"use client";
import React, { useEffect, Fragment } from "react";
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
} from "../../../store/property-list";
import { useAppDispatch } from "../../../store/store";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PropertyTileCard from "../results/propertyTileCard";
import { utmKeys } from "../../../utils/utm";
interface propertyDetailProps {
  [key: string]: any;
}
function PropertySearchResultsDirect(props: propertyDetailProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const pageNumber = useSelector(
    (state: RootState) => state.propertyList.pageNumber
  );
  const currentScroll = useSelector(
    (state: RootState) => state.propertyList.currentScroll
  );

  const parseSearchParams = (searchParams: any) => {
    let paramsObject: any = {};
    let rangeObject: any = {};
    let finalizedRangObject: any = {};
    for (let [key, value] of searchParams.entries()) {
      if (!utmKeys?.includes(key)) {
        if (key?.includes("Min") || key?.includes("Max")) {
          rangeObject[key] = value;
        } else {
          if (value?.includes(" ")) {
            let newValues = value.split(" ")?.map((it: any) => {
              if (it.includes("-")) {
                return `"${it.replaceAll("-", " ")}"`;
              } else {
                return it;
              }
            });
            paramsObject[key] = `(${newValues?.join(" OR ")})`;
          } else {
            paramsObject[key] = value?.includes("-")
              ? `"${value.replaceAll("-", " ")}"`
              : value.replaceAll("-", " ");
          }
        }
      }
    }
    for (let [key, value] of Object.entries(rangeObject)) {
      let keyName = key.replaceAll("Min", "").replaceAll("Max", "");
      finalizedRangObject[keyName] = `[${rangeObject[`${keyName}Min`] || "*"
        } TO ${rangeObject[`${keyName}Max`] || "*"}]`;
    }
    return { ...finalizedRangObject, ...paramsObject };
  };

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location?.search);
    if (!responseList?.isLoading) {
      dispatch(getPropertyList({ customParams: parseSearchParams(urlParams) }));
    }
  }, [searchParams]);

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
  };

  return (
    <Fragment>
      <Container
        maxWidth="xl"
        sx={{ mt: "30px" }}
        className={Styles.propertyResultsPage}
      >
        {responseList?.data?.length ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={1}
          >
            <Typography className={Styles.propertyResultsPageHeading}>
              {responseList?.meta?.numFound || ""} Results{" "}
            </Typography>
            <Link
              rel="preload"
              href="/property-search/advance-search"
              className={Styles.breadCrumpPCLink}
            >
              {" "}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />{" "}
                <Typography className={Styles.backText}>
                  Back to Search---
                </Typography>
              </Stack>
            </Link>
          </Stack>
        ) : null}

        <Grid container spacing={1}>
          {responseList?.isLoading
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
          {!responseList?.isLoading ? (
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
                      Notify Me About New Listings Matching
                    </Button>
                  </center>
                </Box>
              </Box>
            )
          ) : null}
        </Grid>
        {(!responseList?.isLoading || pageNumber > 1) &&
          responseList?.data?.length ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ mt: "30px" }}
          >
            <Pagination
              count={Math.ceil(Number(responseList?.meta?.numFound || 0) / 30)}
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
export default PropertySearchResultsDirect;
