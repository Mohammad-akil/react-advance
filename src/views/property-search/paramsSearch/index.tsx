"use client";
import React, { useEffect, Fragment } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Divider,
  Skeleton,
  Button,
  Stack,
} from "@mui/material";
import Styles from "../../../styles/property-search/result.module.css";
import { getSearchResultParams } from "../../../store/property-list/getSearchResultsParams";
import { handleUpdateSearchPageNumber } from "../../../store/property-list";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import Link from "next/link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PropertyTileCard from "../results/propertyTileCard";
import Pagination from "@mui/material/Pagination";

interface searchProps {
  [key: string]: any;
}
function ParamsBasedSearch(props: searchProps) {
  const dispatch = useAppDispatch();
  const site = useSelector((state: RootState) => state.siteInfo.site);

  const searchResults = useSelector(
    (state: RootState) => state.propertyList.searchResults
  );

  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (props.slug?.length && localStorage.token) {
      dispatch(
        getSearchResultParams({
          paramPath: props.slug.join("/"),
        })
      );
    }
  }, [props.slug, searchResults.pageNumber, isAuthenticated, authDetail?._id]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      handleUpdateSearchPageNumber({
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
        {searchResults?.data?.length ? (
          <Typography
            className={Styles.propertyResultsPageHeading}
            sx={{ mb: "8px" }}
          >
            {searchResults?.meta?.numFound || ""} Results{" "}
          </Typography>
        ) : null}

        <Grid container spacing={1}>
          {searchResults?.isLoading
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
          {!searchResults?.isLoading ? (
            searchResults?.data?.length ? (
              searchResults?.data?.map((item: any, index: number) => (
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
                    Try modifying your search criteria, or click on following
                    search button
                  </Typography>
                  <center>
                    <Link
                      href="/property-search/advance-search"
                      className={Styles.breadCrumpPCLink}
                    >
                      <Button
                        startIcon={<NotificationsIcon />}
                        className={Styles.notifyButton}
                      >
                        Modify Search
                      </Button>
                    </Link>
                  </center>
                </Box>
              </Box>
            )
          ) : null}
        </Grid>
        {(!searchResults?.isLoading || searchResults?.pageNumber > 1) &&
        searchResults?.data?.length ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ mt: "30px" }}
          >
            <Pagination
              count={Math.ceil(Number(searchResults?.meta?.numFound || 0) / 20)}
              onChange={handleChange}
              color="secondary"
              page={searchResults?.pageNumber}
            />
          </Stack>
        ) : null}
        <Box sx={{ margin: "30px 0px" }}>
          <Typography
            dangerouslySetInnerHTML={{
              __html: site?.longDisclaimer,
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
            src={site?.logo}
            alt={site?.dataset}
          />
        </Box>
      </Container>
    </Fragment>
  );
}
export default ParamsBasedSearch;
