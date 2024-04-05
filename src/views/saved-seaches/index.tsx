"use client";
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Card,
  Skeleton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Styles from "../../styles/saved-searches/main.module.css";
import { useAppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {
  getSavedSearches,
  handleUpdateSaveSearchPage,
  handleUpdateBackLink,
} from "../../store/property-list";
import { checkIsAuthenticated } from "../../utils/auth";
import { useRouter } from "next/navigation";
import PropertyTileCard from "./propertyTileCard";
import Slider, { LazyLoadTypes } from "react-slick";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SavedSearches() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedSearches = useSelector(
    (state: RootState) => state.propertyList.savedSearches
  );

  const savedSearchesProperties = useSelector(
    (state: RootState) => state.propertyList.savedSearchesProperties
  );

  const handleRedirectForOneSearch = (searchId: string) => {
    router.push(`/property-search/results?searchId=${searchId}`);
  };

  useEffect(() => {
    if (!checkIsAuthenticated()) {
      router.push("/");
    }
    dispatch(getSavedSearches({ handleRedirect: handleRedirectForOneSearch }));
    dispatch(handleUpdateBackLink({ currentScroll: 0 }));
  }, [savedSearches.pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      if (!savedSearches.isLoading || savedSearches.pageNumber === 1) {
        if (
          Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
          document.documentElement.offsetHeight
        ) {
          if (
            Number(savedSearches?.data?.length || 0) <
            Number(savedSearches?.meta?.count || 0)
          ) {
            dispatch(handleUpdateSaveSearchPage({}));
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [savedSearches.pageNumber, savedSearches?.data?.length]);

  const sliderArrowStyle = {
    cursor: "pointer",
    position: "absolute",
    zIndex: "2",
    fontSize: "28px",
    color: "#fff",
    background: "#433F3F",
    borderRadius: "50%",
    top: isSmallScreen ? "15%" : "45.4%",
  };
  const ArrowLeft = ({ onClick }: any) => (
    <NavigateBefore
      sx={{ ...sliderArrowStyle, left: "10px" }}
      onClick={onClick}
    />
  );

  const ArrowRight = ({ onClick }: any) => (
    <NavigateNext
      sx={{ ...sliderArrowStyle, right: "10px" }}
      onClick={onClick}
    />
  );
  const settings = {
    className: "right",
    variableWidth: isSmallScreen ? true : false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    rtl: true,
    swipe: true,
    swipeToSlide: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: [
      {
        breakpoint: 10070,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return savedSearches?.isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box className={Styles.saveSearchPage}>
      <Container maxWidth="xl">
        {savedSearches?.data?.length ? (
          savedSearches?.data?.map((item: any, index: number) => (
            <Box key={index} className={Styles.savedSearchesItem}>
              <Box className={Styles.searchesHeader}>
                <Box className={Styles.searchesCount}>
                  {item?.totalPropertyCount}
                </Box>
                <Typography className={Styles.searchTitle}>
                  {item?.title}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  className={Styles.viewAllButton}
                  onClick={() => {
                    if (
                      savedSearchesProperties?.data?.find(
                        (it: any) => it.meta?.searchId === item.searchId
                      )?.data?.length ||
                      savedSearchesProperties?.isLoading
                    ) {
                      router.push(
                        `/property-search/results?searchId=${item.searchId}`
                      );
                    }
                  }}
                >
                  {savedSearchesProperties?.data?.find(
                    (it: any) => it.meta?.searchId === item.searchId
                  )?.data?.length || savedSearchesProperties?.isLoading
                    ? "View All"
                    : "No results"}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  className={Styles.editButton}
                  size={"small"}
                  onClick={() => {
                    router.push(
                      `/property-search/advance-search?searchId=${item.searchId}`
                    );
                  }}
                >
                  Edit Search
                </Button>
              </Box>
              <Box
                sx={{
                  height:
                    savedSearchesProperties?.data?.find(
                      (it: any) => it.meta?.searchId === item.searchId
                    )?.data?.length || savedSearchesProperties?.isLoading
                      ? "455px"
                      : "0px",
                }}
                className={Styles.searchesMainArea}
              >
                <Slider key={index} {...settings}>
                  {savedSearchesProperties?.data
                    ?.find((it: any) => it.meta?.searchId === item.searchId)
                    ?.data?.map((values: any) => (
                      <PropertyTileCard item={values} key={values.ListingId} />
                    ))}
                </Slider>
                <Grid container spacing={3} sx={{ mt: "10px" }}>
                  {savedSearchesProperties?.isLoading
                    ? Array.from(Array(4).keys()).map((item, index: number) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          sm={6}
                          md={3}
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
              </Box>
            </Box>
          ))
        ) : (
          <Box className={Styles.noResultArea}>
            <Box className={Styles.noResultAreaInner}>
              <center>
                {" "}
                <TravelExploreIcon sx={{ fontSize: "150px", color: "grey" }} />
              </center>
              <Typography className={Styles.noResultFoundHeading}>
                No Saved Searches Found
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
export default SavedSearches;
