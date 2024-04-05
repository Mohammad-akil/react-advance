"use client";
import React, { useState, useEffect, memo } from "react";
import Styles from "../../styles/property-detail-1/main.module.css";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import PropertyStatsBar from "./statsBar";
import ShortCutBar from "./shortCutBar";
import SliderView from "./sliderView";
import ListingDetailStats from "./listingDetail";
import PropertyDetail from "./propertyDetail";
import PropertyLocation from "./propertyLocation";
import PropertyBuildingInfo from "./buildingInfo";
import PropertyInfo from "./propertyInfo";
import PublicRecordsInfo from "./publicRecord";
import NearSchoolsData from "./schoolData";
import PropertyContactForm from "./contactForm";
import ListingAgent from "./listingAgent";
import LoadingSkelton from "./loader";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { formatAddress, getAcres } from "../../utils/propertyAddressFormat";
import { checkVisitorCount } from "../../utils/visitorCookies";
import { getPropertyDetail } from "../../store/property-detail";
import { handleUpdateAuthPreview } from "../../store/auth";
import { useAppDispatch } from "../../store/store";
import moment from "moment-timezone";
import { NumberFormat } from "../../utils/numberFormat";
import Image from "next/image";
import { checkIsAuthenticated } from "../../utils/auth";
import PaymentCalculator from "./paymentCalculator";
import { getAgentDetail } from "../../store/property-detail";
import { useRouter } from "next/navigation";
import TourWidget from "./tourWidget";
import SimilarHomes from "./similarHomes";
import { staticRoutes } from "../../utils/common";
import NotFoundProperty from "./common/notFound";
import MBPaginationHeader from "./mbHeader";
import ReactGA from "react-ga4";
import { getPropertyList, handleUpdateParams } from "../../store/property-list";
interface propertyDetailProps {
  id: any;
  withDataset?: any;
}
interface payloadObj {
  id: any;
  handleRedirectBack: any;
  dataset?: any;
}

function PropertyDetail01(props: propertyDetailProps) {
  const [collapse, setCollapse] = useState<any>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 575px)");
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const agentDetail = useSelector(
    (state: RootState) => state.propertyDetail.agentDetail
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const {
    paginationList,
    paginationCount,
    pageNumber,
    list,
    backLink,
    customParams,
    searchId,
    overwrite,
  } = useSelector((state: RootState) => state.propertyList);

  const handleRedirectBack = () => {
    router.push("/property-search/results");
  };

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
          setTimeout(() => {
            if (!checkIsAuthenticated() && !isAuthenticated) {
              let count = checkVisitorCount("visitor_count");
              if (
                localStorage.props &&
                count >= Number(localStorage.props || 0) &&
                Number(localStorage.props || 0) !== 0
              ) {
                if (window.location.pathname?.split("/")[1] === "property") {
                  dispatch(
                    handleUpdateAuthPreview({
                      open: true,
                      previewType: "register",
                    })
                  );
                }
              } else if (
                count >=
                  Number(
                    process.env.NEXT_PUBLIC_UN_LOGGED_PROPERTY_VISIT_COUNT || 10
                  ) &&
                process.env.NEXT_PUBLIC_UN_LOGGED_PROPERTY_VISIT_COUNT !==
                  "0" &&
                Number(localStorage.props || 0) !== 0
              ) {
                if (window.location.pathname?.split("/")[1] === "property") {
                  dispatch(
                    handleUpdateAuthPreview({
                      open: true,
                      previewType: "register",
                    })
                  );
                }
              }
            }
          }, 2000);
          dispatch(getPropertyDetail(obj));
        }
      }
    }
  }, [props.id, dispatch]);

  useEffect(() => {
    if (listDetail?.data?.ListingId && site?.office_mls_id) {
      if (listDetail?.data?.ListOfficeMlsId === site?.office_mls_id) {
        dispatch(
          getAgentDetail({ agentMlsId: listDetail?.data?.ListAgentMlsId })
        );
      }
    }
  }, [listDetail?.data?.ListingId, site?.office_mls_id]);

  useEffect(() => {
    if (typeof window !== "undefined" && isSmallScreen) {
      window.scrollTo({
        top: isSmallScreen ? 65 : 0,
        left: 0,
      });
    }
  }, [listDetail?.data?.ListingId]);

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
        !paginationList[index + 3] &&
        paginationCount > paginationList?.length &&
        !list?.isLoading
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
    return () => {
      if (
        !listDetail.isLoading &&
        !window.location.pathname?.includes("/property/")
      ) {
        dispatch(
          handleUpdateParams({
            field: "start",
            value: 0,
            pageNumber: 1,
          })
        );
      }
    };
  }, []);

  //ListAgentMlsId
  return !listDetail?.isLoading ? (
    listDetail?.data?.MlsStatus === "Expired" ||
    listDetail?.data?.MlsStatus === "Withdrawn" ||
    listDetail?.data?.MlsStatus === "Terminated" ? (
      <NotFoundProperty MlsStatus={listDetail?.data?.MlsStatus} />
    ) : (
      <Box id="property-overview" className={Styles.mainPage}>
        <MBPaginationHeader />
        <Box className={Styles.mobileView}>
          <SliderView />
        </Box>
        <PropertyStatsBar {...props} />
        <ShortCutBar {...props} />
        <Container className={Styles.propertyContainer}>
          <Grid container spacing={3} sx={{ mt: "0px" }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={7.5}
              lg={8}
              xl={7.5}
              sx={{ paddingTop: "0px !important" }}
            >
              <Box className={Styles.PCView}>
                <SliderView />
              </Box>
              <Box className={Styles.mobileView}>
                <ListingDetailStats />
                <ListingAgent />
                <TourWidget />
                <PropertyDetail />
                <PropertyLocation id="property-location" />
              </Box>
              <Typography
                className={Styles.publicNotesHeading}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                Description
              </Typography>
              <Typography
                className={Styles.publicNotes}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {listDetail?.data?.PublicRemarks}
              </Typography>
              <Typography
                className={Styles.publicNotesMb}
                variant="subtitle2"
                display="block"
                gutterBottom
              >
                {listDetail?.data?.PublicRemarks?.length > 450 && collapse
                  ? `${listDetail?.data?.PublicRemarks?.slice(0, 450)}...`
                  : listDetail?.data?.PublicRemarks}
              </Typography>
              {listDetail?.data?.PublicRemarks?.length > 450 ? (
                <Button
                  endIcon={
                    collapse ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                  }
                  className={Styles.ViewMoreButton}
                  variant="text"
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse ? "Continue Reading" : "Collapse"}
                </Button>
              ) : null}

              {agentDetail?._id ? (
                <Box className={Styles.agentDetailReplace}>
                  <ListingAgent isReplace={true} />
                </Box>
              ) : listDetail?.data?.ListAgentFullName ? (
                <Typography
                  className={Styles.listingBYAgent}
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  sx={{ mt: "20px" }}
                >
                  Listed by {listDetail?.data?.ListAgentFullName} -{" "}
                  {listDetail?.data?.ListOfficeName}
                </Typography>
              ) : null}

              <Box className={Styles.PCView}>
                <Typography className={Styles.listingStatsHeadingPC}>
                  Property Details for {formatAddress(listDetail?.data)}
                </Typography>
                <PropertyDetail />
                <PropertyLocation id="property-locationPC" />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4.5}
              lg={4}
              xl={4.5}
              sx={{ paddingTop: "0px !important" }}
            >
              <Box className={Styles.PCView}>
                <ListingDetailStats />
              </Box>
              <ListingAgent />
              {listDetail?.data?.StandardStatus === "Active" ? (
                <Box className={Styles.PCView}>
                  <TourWidget />
                </Box>
              ) : (
                <PropertyContactForm />
              )}
            </Grid>
          </Grid>
          <PropertyBuildingInfo />
          <PaymentCalculator />
          <PropertyInfo />
          <PublicRecordsInfo />
          <NearSchoolsData
            ListingId={
              props.withDataset
                ? props.id?.[1] || props.id
                : props.id?.[0] || props.id
            }
          />
          <br />
          <br />
          <SimilarHomes />
          <br />
          <br />
          <Typography className={Styles.moreInfoHeadingSeo}>
            More information about{" "}
            {formatAddress({ ...listDetail?.data, isFullAddressNeeded: true })}
          </Typography>
          <Typography className={Styles.moreInfoDescriptionSeo}>
            {(
              listDetail?.data?.StreetNumber || listDetail?.data?.AddressNumber
            )?.toLowerCase()}{" "}
            {listDetail?.data?.StreetName?.toLowerCase()}{" "}
            {listDetail?.data?.StreetSuffix?.toLowerCase()}{" "}
            {listDetail?.data?.StreetDirSuffix?.toLowerCase()} is a{" "}
            {listDetail?.data?.PropertySubType?.toLowerCase()} for sale in{" "}
            {listDetail?.data?.City?.toLowerCase()},{" "}
            {listDetail?.data?.StateOrProvince} {listDetail?.data?.PostalCode}.
            This property was listed for sale on{" "}
            {moment(listDetail?.data?.ListingContractDate).format("LL")} by{" "}
            {listDetail?.data?.ListOfficeName?.toLowerCase()}. at{" "}
            {listDetail?.data?.ListPrice
              ? NumberFormat({
                  number: listDetail?.data?.ListPrice,
                  currency: "USD",
                })
              : null}
            . This listing's school district is{" "}
            {listDetail?.data?.CountyOrParish?.split("-")?.[0]} County School
            District. Nearby schools include{" "}
            {listDetail?.data?.ElementarySchool?.split("-")?.[0]?.toLowerCase()}{" "}
            Elementary School,{" "}
            {listDetail?.data?.MiddleOrJuniorSchool?.split(
              "-"
            )?.[0]?.toLowerCase()}{" "}
            Middle School and{" "}
            {listDetail?.data?.HighSchool?.split("-")?.[0]?.toLowerCase()} High
            School. {listDetail?.data?.StreetNumber?.toLowerCase()}{" "}
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
        </Container>
      </Box>
    )
  ) : (
    <LoadingSkelton
      paginationList={paginationList}
      ListingId={props.id?.[0] || props.id}
    />
  );
}
export default memo(PropertyDetail01);
