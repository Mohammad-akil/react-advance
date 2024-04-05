"use client";
import React, { useEffect } from "react";
import Styles from "../../styles/property-detail/main.module.css";
import {
  Box,
  Container,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import BreadCrumpBar from "./breadCrumpBar";
import PropertyStatsBar from "./statsBar";
import PropertyDetailGallery from "./gallery";
import PropertyDetailGallerySM from "./gallerySM";
import PropertyStatSummary from "./propertyStatsSummary";
import PropertyDetailMap from "./mapView";
import PropertyStatDetail from "./propertyStatsDetail";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import ScheduleTour from "./scheduleTour";
import gmlsIcon from "../../assests/gmls-icon.png";
import Image from "next/image";
import { useAppDispatch } from "../../store/store";
import { checkVisitorCount } from "../../utils/visitorCookies";
import { getPropertyDetail } from "../../store/property-detail";
import { handleUpdateAuthPreview } from "../../store/auth";
import moment from "moment-timezone";
import { NumberFormat } from "../../utils/numberFormat";
import { formatAddress, getAcres } from "../../utils/propertyAddressFormat";
import { checkIsAuthenticated } from "../../utils/auth";
import TourDirection from "./tourDirection";
import SimilarHomes from "../property-detail-1/similarHomes";
import { useRouter } from "next/navigation";
import { staticRoutes } from "../../utils/common";
import NotFoundProperty from "../property-detail-1/common/notFound";
import NearSchoolsData from "../property-detail-1/schoolData";
import ReactGA from "react-ga4";
import { getPropertyList, handleUpdateParams } from "../../store/property-list";
interface payloadObj {
  id: any;
  handleRedirectBack: any;
  dataset?: any;
}
const propertyType: string = "fmls";
interface propertyDetailProps {
  id: any;
  [key: string]: any;
}
function PropertyDetail(props: propertyDetailProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 575px)");
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const {
    paginationList,
    paginationCount,
    pageNumber,
    backLink,
    customParams,
    searchId,
    overwrite,
  } = useSelector((state: RootState) => state.propertyList);
  const handleRedirectBack = () => {
    router.push("/property-search/results");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: isSmallScreen ? 65 : 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [listDetail?.data?.ListingId]);

  useEffect(() => {
    if (staticRoutes.find((item: any) => item.from === props.id?.[0])) {
      router.push(
        `/listing/${
          staticRoutes.find((item: any) => item.from === props.id?.[0])?.to
        }`
      );
    } else {
      if (props.withDataset) {
        if (props.id?.[0] || props.id) {
          let obj: payloadObj = {
            id: props.id?.[1] || props.id,
            dataset: props.id?.[0],
            handleRedirectBack,
          };
          dispatch(getPropertyDetail(obj));
        }
      } else {
        if (props.id?.[0] || props.id) {
          let obj: payloadObj = {
            id: props.id?.[0] || props.id,
            handleRedirectBack,
          };
          if (!checkIsAuthenticated() && !isAuthenticated) {
            let count = checkVisitorCount("visitor_count");
            if (
              localStorage.props &&
              count >= Number(localStorage.props || 0) &&
              Number(localStorage.props || 0) !== 0
            ) {
              setTimeout(() => {
                if (window.location.pathname?.split("/")[1] === "property") {
                  dispatch(
                    handleUpdateAuthPreview({
                      open: true,
                      previewType: "register",
                    })
                  );
                }
              }, 2000);
            } else if (
              count >=
                Number(
                  process.env.NEXT_PUBLIC_UN_LOGGED_PROPERTY_VISIT_COUNT || 10
                ) &&
              process.env.NEXT_PUBLIC_UN_LOGGED_PROPERTY_VISIT_COUNT !== "0" &&
              Number(localStorage.props || 0) !== 0
            ) {
              setTimeout(() => {
                if (window.location.pathname?.split("/")[1] === "property") {
                  dispatch(
                    handleUpdateAuthPreview({
                      open: true,
                      previewType: "register",
                    })
                  );
                }
              }, 2000);
            }
          }
          dispatch(getPropertyDetail(obj));
        }
      }
    }
  }, [props.id, dispatch, isAuthenticated]);

  // useEffect(() => {
  //   if (listDetail?.data?.ListingId) {
  //     ReactGA.send({
  //       hitType: "pageview",
  //       page: window.location.pathname,
  //       title: `${formatAddress(listDetail?.data)} Property detail viewed`,
  //     });
  //   }
  // }, [listDetail?.data?.ListingId]);

  useEffect(() => {
    if (listDetail?.data?.ListingId && paginationList?.length) {
      let index = paginationList?.findIndex(
        (it: any) => it?.ListingId === listDetail?.data?.ListingId
      );
      if (
        !paginationList[index + 2] &&
        paginationCount > paginationList?.length
      ) {
        dispatch(
          handleUpdateParams({
            field: "start",
            value: pageNumber * 20,
            pageNumber: pageNumber + 1,
          })
        );
        setTimeout(() => {
          if (backLink?.split("?")[0] === "/") {
            dispatch(
              getPropertyList({
                status: "(Active OR 'Coming Soon')",
                rows: 20,
                allowPrefix: true,
              })
            );
          } else if (searchId) {
            dispatch(
              getPropertyList({ searchId: searchId, overwrite: overwrite })
            );
          } else if (Object.keys(customParams)?.length) {
            dispatch(getPropertyList({ customParams: customParams }));
          } else {
            dispatch(getPropertyList({}));
          }
        }, 3000);
      }
    }
  }, [listDetail?.data?.ListingId]);
  return listDetail?.isLoading ? (
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="100px"
        width="100%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ mt: "10px" }}
        height="400px"
        width="100%"
      />{" "}
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="100px"
        width="100%"
      />
    </Container>
  ) : listDetail?.data?.MlsStatus === "Expired" ||
    listDetail?.data?.MlsStatus === "Withdrawn" ||
    listDetail?.data?.MlsStatus === "Terminated" ? (
    <NotFoundProperty MlsStatus={listDetail?.data?.MlsStatus} />
  ) : (
    <Box className={Styles.mainPage}>
      <BreadCrumpBar />
      <PropertyDetailGallerySM />
      {listDetail?.isLoading ? "loading" : <PropertyStatsBar />}
      <PropertyDetailGallery />
      <Box className={Styles.scheduleTourMbView}>
        <ScheduleTour />
      </Box>
      <Container maxWidth="xl" className={Styles.mainPageContainer}>
        <Box className={Styles.customGrid}>
          <Box className={Styles.customGridFirst}>
            {" "}
            <PropertyStatSummary />
            <PropertyDetailMap />
            <PropertyStatDetail />
            <TourDirection />
            <NearSchoolsData
              padding="0px 15px"
              ListingId={
                props.withDataset
                  ? props.id?.[1] || props.id
                  : props.id?.[0] || props.id
              }
            />
            <br />
            <br />
            <Box className={Styles.similarHomesArea}>
              <SimilarHomes />
            </Box>
            <Box className={Styles.disclaimerSection}>
              {propertyType === "gmls" ? (
                <Box>
                  <Typography className={Styles.disclaimerText}>
                    Listing courtesy of Keller Williams Realty ?
                  </Typography>
                  <Image
                    width={200}
                    height={43}
                    style={{
                      cursor: "pointer",
                      objectFit: "cover",
                      margin: "30px 0px",
                    }}
                    src={gmlsIcon}
                    alt="gmls icon"
                  />
                  <Typography className={Styles.disclaimerText}>
                    Information deemed reliable but not guaranteed. The data
                    relating to real estate for sale on this web site comes in
                    part from the Broker Reciprocity Program of Georgia MLS.
                    Real estate listings held by brokerage firms other than this
                    office are marked with the Broker Reciprocity logo and
                    detailed information about them includes the name of the
                    listing brokers. Copyright © 2020-present Georgia MLS. All
                    rights reserved.
                  </Typography>
                  <Typography className={Styles.disclaimerText}>
                    Data last updated at: 2023-08-08 11:15 AM UTC
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography className={Styles.moreInfoHeadingSeo}>
                    More information about{" "}
                    {formatAddress({
                      ...listDetail?.data,
                      isFullAddressNeeded: true,
                    })}
                  </Typography>
                  <Typography className={Styles.moreInfoDescriptionSeo}>
                    {(
                      listDetail?.data?.StreetNumber ||
                      listDetail?.data?.AddressNumber
                    )?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetName?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetSuffix?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetDirSuffix?.toLowerCase()} is a{" "}
                    {listDetail?.data?.PropertySubType?.toLowerCase()} for sale
                    in {listDetail?.data?.City?.toLowerCase()},{" "}
                    {listDetail?.data?.StateOrProvince}{" "}
                    {listDetail?.data?.PostalCode}. This property was listed for
                    sale on{" "}
                    {moment(listDetail?.data?.ListingContractDate).format("LL")}{" "}
                    by {listDetail?.data?.ListOfficeName?.toLowerCase()}. at{" "}
                    {listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number: listDetail?.data?.ListPrice,
                          currency: "USD",
                        })
                      : null}
                    . This listing's school district is{" "}
                    {listDetail?.data?.CountyOrParish?.split("-")?.[0]} County
                    School District. Nearby schools include{" "}
                    {listDetail?.data?.ElementarySchool?.split(
                      "-"
                    )?.[0]?.toLowerCase()}{" "}
                    Elementary School,{" "}
                    {listDetail?.data?.MiddleOrJuniorSchool?.split(
                      "-"
                    )?.[0]?.toLowerCase()}{" "}
                    Middle School and{" "}
                    {listDetail?.data?.HighSchool?.split(
                      "-"
                    )?.[0]?.toLowerCase()}{" "}
                    High School. {listDetail?.data?.StreetNumber?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetName?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetSuffix?.toLowerCase()}{" "}
                    {listDetail?.data?.StreetDirSuffix?.toLowerCase()} is a{" "}
                    {listDetail?.data?.BedroomsTotal} bed,{" "}
                    {listDetail?.data?.BathroomsTotalDecimal} bath,{" "}
                    {(listDetail?.data?.BuildingAreaTotal &&
                      listDetail?.data?.BuildingAreaTotal > 0) ||
                    (listDetail?.data?.AboveGradeFinishedArea &&
                      listDetail?.data?.AboveGradeFinishedArea > 0)
                      ? NumberFormat({
                          number:
                            listDetail?.data?.BuildingAreaTotal ||
                            listDetail?.data?.AboveGradeFinishedArea,
                        })
                      : getAcres(listDetail?.data)}{" "}
                    {(listDetail?.data?.BuildingAreaTotal &&
                      listDetail?.data?.BuildingAreaTotal > 0) ||
                    (listDetail?.data?.AboveGradeFinishedArea &&
                      listDetail?.data?.AboveGradeFinishedArea > 0)
                      ? "sqft"
                      : "Acres"}{" "}
                    {listDetail?.data?.PropertySubType} built in{" "}
                    {listDetail?.data?.YearBuilt}.
                  </Typography>

                  {process.env.NEXT_PUBLIC_DISPLAY_LIST_AGENT_NAME === "true" &&
                  listDetail?.data?.ListAgentFullName ? (
                    <Typography className={Styles.disclaimerText}>
                      Listing courtesy of {listDetail?.data?.ListAgentFullName}
                    </Typography>
                  ) : null}

                  <br />

                  {site?.logo ? (
                    <Image
                      width={150}
                      height={40}
                      style={{
                        cursor: "pointer",
                        objectFit: "contain",
                        margin: "30px 0px",
                      }}
                      src={site?.logo}
                      alt="gmls icon"
                    />
                  ) : null}
                  {site?.longDisclaimer ? (
                    <Typography className={Styles.disclaimerText}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: site?.longDisclaimer,
                        }}
                      ></div>
                    </Typography>
                  ) : null}
                </Box>
              )}
            </Box>
          </Box>
          <Box className={Styles.customGridSecond}>
            {" "}
            <ScheduleTour />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default PropertyDetail;
