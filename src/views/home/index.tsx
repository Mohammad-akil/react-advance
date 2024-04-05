"use client";
import React, { useState, useEffect } from "react";
import Styles from "../../styles/home/home.module.css";
import {
  Box,
  Container,
  TextField,
  Typography,
  Autocomplete,
  Grid,
  Skeleton,
  Card,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import method_banner from "../../assests/images/method_banner.webp";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PropertyTileCard from "../property-search/results/propertyTileCard";
import { useAppDispatch } from "../../store/store";
import {
  getPropertyList,
  handleUpdateParams,
  handleAddOrRemoveKeyFromSearch,
  handleResetSearchValue,
  handleUpdatePageNumber,
} from "../../store/property-list";
import {
  returnKeyExistsInObject,
  searchKeys,
  generateValue,
} from "../../utils/propertyData";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { getSuggestions } from "../../store/property-list/getSuggestions";
import SuggestionMB from "./suggestionsMB";
import locationIcon from "../../assests/images/location.png";
import listingIcon from "../../assests/images/listingIcon.png";
import schoolIcon from "../../assests/images/schoolIcon.png";
import buildingIcon from "../../assests/images/buildingIcon.png";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { capitalizeParagraph } from "../../utils/propertyAddressFormat";
interface propertyDetailProps {}
function PropertyListing(props: propertyDetailProps) {
  const [open, setOpen] = useState<Boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("buy");
  const isSmallScreen = useMediaQuery("(max-width:575px)");
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
  );
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const suggestions = useSelector(
    (state: RootState) => state.propertyList.suggestions
  );

  useEffect(() => {
    if (!Object.keys(suggestions)?.length) {
      dispatch(getSuggestions());
    }
  }, []);

  useEffect(() => {
    dispatch(
      getPropertyList({
        status: "(Active OR 'Coming Soon')",
        rows: 6,
        allowPrefix: true,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(handleResetSearchValue({}));
  }, []);

  const renderGroup = (params: any) => (
    <Box>
      <Box className={Styles.groupIconArea}>
        {" "}
        {params.group === "City" ? (
          <Image src={locationIcon} alt="locationIcon" width={26} height={26} />
        ) : null}
        {params.group === "SubdivisionName" ? (
          <Image src={buildingIcon} alt="buildingIcon" width={26} height={26} />
        ) : null}
        {params.group === "PostalCode" ? (
          <Image src={listingIcon} alt="listingIcon" width={26} height={26} />
        ) : null}
        {params.group === "ElementarySchool" ||
        params.group === "HighSchool" ||
        params.group === "MiddleSchool" ||
        params.group === "MiddleOrJuniorSchool" ? (
          <Image src={schoolIcon} alt="locationIcon" width={26} height={26} />
        ) : null}
        {params.group === "CountyOrParish"
          ? "County"
          : params.group.replace(/([A-Z])/g, " $1").trim()}
      </Box>
      <Box className={Styles.groupItem}>{params.children}</Box>
    </Box>
  );
  const filterOptions = (options: any, { inputValue }: any) => {
    if (inputValue?.length > 1) {
      if (inputValue) {
        const firstLetters = inputValue.trim().toLowerCase();
        return options
          .filter((option: any) =>
            option.title.toLowerCase().startsWith(firstLetters)
          )
          ?.slice(0, 500);
      } else {
        return options?.slice(0, 500);
      }
    } else {
      return [];
    }
  };

  const handleReturnOptions = () => {
    let options: any = [];
    const customSort = (a: any, b: any) => {
      const indexOfA = searchKeys.indexOf(a.group);
      const indexOfB = searchKeys.indexOf(b.group);
      if (indexOfA === -1) return 1;
      if (indexOfB === -1) return -1;

      return indexOfA - indexOfB;
    };

    searchKeys.map((item: any, index: number) => {
      suggestions[item]?.map((it: any) => {
        let obj: any = {
          title: capitalizeParagraph(it.friendlyName),
          group: item,
          value: it.value,
        };
        options.push(obj);
      });
    });

    return options.sort(customSort);
  };

  return (
    <Box>
      <Box className={Styles.imageContainer}>
        <Image
          src={method_banner}
          alt="Banner Image"
          sizes="100vw"
          className={Styles.responsiveImage}
          height={620}
          width={380}
          placeholder="blur"
          priority
        />
        <Box className={Styles.searchContainer}>
          <Box className={Styles.searchContainerInner}>
            <Typography className={Styles.searchContainerHeading}>
              A Better Way Home
            </Typography>
            <Box className={Styles.searchTabsArea}>
              <Box
                onClick={() => setActiveTab("buy")}
                className={
                  activeTab === "buy"
                    ? Styles.searchTabsAreaItemActive
                    : Styles.searchTabsAreaItem
                }
              >
                Buy
              </Box>
              <Box
                onClick={() => {
                  setActiveTab("sell");
                  router.push(`/sell`);
                }}
                className={
                  activeTab === "sell"
                    ? Styles.searchTabsAreaItemActive
                    : Styles.searchTabsAreaItem
                }
              >
                Sell
              </Box>
            </Box>
            <Box
              onClick={() => {
                if (isSmallScreen) {
                  setOpen(true);
                }
              }}
              className={Styles.searchFieldArea}
            >
              <Box className={Styles.searchField}>
                <Autocomplete
                  options={handleReturnOptions()}
                  filterOptions={filterOptions}
                  fullWidth
                  freeSolo
                  size="small"
                  renderGroup={renderGroup}
                  clearIcon={<CancelRoundedIcon sx={{ color: "black" }} />}
                  groupBy={(option: any) => option.group}
                  getOptionLabel={(option: any) => option.title}
                  onChange={(event: any, newValue: any | null) => {
                    if (
                      returnKeyExistsInObject(searchParams, searchKeys) ===
                      newValue?.group
                    ) {
                      dispatch(
                        handleUpdateParams({
                          field: newValue?.group,
                          value: generateValue(newValue, true)?.includes("OR")
                            ? `(${generateValue(newValue, true)})`
                            : generateValue(newValue, true),
                          isReset: true,
                        })
                      );
                    } else {
                      dispatch(
                        handleAddOrRemoveKeyFromSearch({
                          fieldToRemove: returnKeyExistsInObject(
                            searchParams,
                            searchKeys
                          ),
                          fieldToAdd: newValue?.group,
                          fieldToAddValue: generateValue(
                            newValue,
                            true
                          )?.includes("OR")
                            ? `(${generateValue(newValue, true)})`
                            : generateValue(newValue, true),
                          isReset: true,
                        })
                      );
                    }
                    router.push(`/property-search/results`);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Hide the border
                      },
                    },
                  }}
                  autoComplete
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="City, Neighborhood, School, ZIP, MLS #"
                    />
                  )}
                />
              </Box>
              <Box className={Styles.searchIconBox}>
                <SearchIcon sx={{ color: "white" }} />
              </Box>
            </Box>
          </Box>
          {/* 
          <TextField type="text" placeholder="Search" /> */}
        </Box>
      </Box>
      <Container maxWidth="lg" className={Styles.homePage}>
        <Typography className={Styles.homePageHeading} variant="h1">
          Latest Listings
        </Typography>
        <Typography className={Styles.homePageContent}>
          Be the first to browse exclusive listings as they come to market.
        </Typography>{" "}
        <Grid container spacing={3} sx={{ mt: "10px" }}>
          {responseList?.isLoading
            ? Array.from(Array(6).keys()).map((item, index: number) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
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
                <PropertyTileCard item={item} key={index} isHomePage={"true"} />
              ))
            ) : (
              <Box className={Styles.noResultArea}>
                <Box className={Styles.noResultAreaInner}>
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
                    No coming soon listing exists yet!.
                  </Typography>
                </Box>
              </Box>
            )
          ) : null}
        </Grid>
        <Button
          className={Styles.viewAllExclusiveButton}
          endIcon={<EastRoundedIcon />}
          onClick={() => {
            dispatch(handleUpdatePageNumber({ isRemoveSubProps: true }));
            router.push(`/property-search/results`);
          }}
        >
          View All Recent Listings
        </Button>
      </Container>
      <SuggestionMB open={open} setOpen={setOpen} />
    </Box>
  );
}

export default PropertyListing;

// following UI we can use in future for home page tiles
{
  /* <Grid
onClick={() => {
  if (process.env.NEXT_PUBLIC_THEME === "2") {
    router.push(
      `/property/${item.ListingId}/${route(item)}`
    );
  }
  if (process.env.NEXT_PUBLIC_THEME === "1") {
    router.push(
      `/property-detail/${item.ListingId}/${route(item)}`
    );
  }
}}
key={index}
item
xs={12}
md={4}
sx={{ cursor: "pointer" }}
>
<Card
  variant="outlined"
  className={Styles.propertyResultsAreaItem}
>
  <Box className={Styles.propertyResultsTopImage}>
    <Image
      sizes="100vw"
      style={{
        zIndex: "5",
        width: "100%",
        height: "230px",
        cursor: "pointer",
        objectFit: "cover",
      }}
      width={500}
      height={300}
      src={item?.MediaURL?.[0] || sampleIMage}
      alt="MediaURL"
      loading="lazy"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = sampleIMage;
      }}
    />
    <Box className={Styles.propertyResultsMedia}></Box>
    <Box className={Styles.propertyStatusArea}>
      {" "}
      {process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}{" "}
      {item.MlsStatus}
    </Box>
    <Box className={Styles.propertyStatsArea}>
      <Box className={Styles.propertyStatsAreaLeft}>
        <Typography
          className={Styles.propertyStatsAreaLeftPrice}
        >
          {item?.ListPrice
            ? NumberFormat({
                number: item?.ListPrice,
                currency: "USD",
              })
            : null}
        </Typography>
        <Typography
          className={Styles.propertyStatsAreaLeftAddress}
        >
          {" "}
          {formatAddress({
            ...item,
            isFullAddressNeeded: true,
          })}
        </Typography>
      </Box>
      <Box className={Styles.propertyStatsAreaRight}>
        <Box>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            {item.BedroomsTotal}
          </Typography>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            Beds
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: "white" }}
        />
        <Box>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            {item.BathroomsFull}
          </Typography>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            Baths
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: "white" }}
        />
        <Box>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            {item.BuildingAreaTotal > 0
              ? NumberFormat({
                  number: item?.BuildingAreaTotal,
                })
              : item?.LotSizeAcres}
          </Typography>
          <Typography
            className={Styles.propertyStatsAreaLeftStats}
          >
            {item.BuildingAreaTotal > 0 ? "Sq.Ft." : "Acres"}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
</Card>
</Grid> */
}
