import React, { useState, useEffect, Fragment } from "react";
import Styles from "../../styles/property-detail-1/shortCutBar.module.css";
import {
  Box,
  Container,
  Typography,
  Button,
  Menu,
  IconButton,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Share from "./common/share";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { formatAddress } from "../../utils/propertyAddressFormat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { handleUpdateAuthPreview } from "../../store/auth";
import { useAppDispatch } from "../../store/store";
import { addFavorite } from "../../store/property-list/addFavorite";
import { removeFavorite } from "../../store/property-list/removeFavorite";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import ResponseAlert from "../../components/shared/alert";
import { getPropertyList, handleUpdateParams } from "../../store/property-list";
interface shortCutProps {
  [key: string]: any;
}

function ShortCutBar(props: shortCutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });

  const open = Boolean(anchorEl);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const {
    paginationList,
    paginationCount,
    pageNumber,
    backLink,
    customParams,
  } = useSelector((state: RootState) => state.propertyList);
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const favoriteProperties = useSelector(
    (state: RootState) => state.propertyList.favoriteProperties
  );
  const addFav = useSelector(
    (state: RootState) => state.propertyList.addFavorite
  );
  const removeFav = useSelector(
    (state: RootState) => state.propertyList.removeFavorite
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleScrollToId = (id: string, id1?: string) => {
    if (id1) {
      const element = document.getElementById(id1) as HTMLDivElement;
      let targetPosition: any = element?.offsetTop;
      let offset = 20; // Adjust as needed
      // Scroll to the target position with the offset
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    } else {
      const element = document.getElementById(id) as HTMLDivElement;
      const targetPosition: any = element?.offsetTop;
      let offset =
        id === "property-building-information" ||
        id === "property-public-records"
          ? 60
          : 40; // Adjust as needed
      // Scroll to the target position with the offset
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "tabKeyDown") {
    } else {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 260;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    let currentScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (currentScroll < 1300 && activeTab !== "property-overview") {
      setActiveTab("property-overview");
    } else if (
      currentScroll > 1300 &&
      currentScroll < 1850 &&
      activeTab !== "property-location"
    ) {
      setActiveTab("property-location");
    } else if (
      currentScroll > 1850 &&
      currentScroll < 2440 &&
      activeTab !== "property-building-information"
    ) {
      setActiveTab("property-building-information");
    } else if (
      currentScroll > 2440 &&
      currentScroll < 4300 &&
      activeTab !== "property-info"
    ) {
      setActiveTab("property-info");
    } else if (
      currentScroll > 4300 &&
      activeTab !== "property-public-records"
    ) {
      setActiveTab("property-public-records");
    }
  };

  const handleFindList = (type: any) => {
    let index = paginationList?.findIndex(
      (it: any) => it?.ListingId === listDetail?.data?.ListingId
    );
    if (type === "prev") {
      return paginationList[index - 1] ? true : false;
    } else {
      return paginationList[index + 1] ? true : false;
    }
  };

  const handleRedirect = (type: any) => {
    let index = paginationList?.findIndex(
      (it: any) => it?.ListingId === listDetail?.data?.ListingId
    );
    if (type === "prev") {
      router.push(
        `/property/${paginationList[index - 1].ListingId}/${
          paginationList[index - 1].route
        }`
      );
    } else {
      router.push(
        `/property/${paginationList[index + 1].ListingId}/${
          paginationList[index + 1].route
        }`
      );
    }
  };

  const getCurrentIndex = () => {
    return (
      paginationList?.findIndex(
        (it: any) => it?.ListingId === listDetail?.data?.ListingId
      ) + 1
    );
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      dispatch(
        handleUpdateAuthPreview({
          open: true,
          previewType: "register",
        })
      );
    } else {
      if (
        favoriteProperties?.data?.length &&
        favoriteProperties?.data?.find(
          (it: any) => it.ListingId === listDetail?.data?.ListingId
        )
      ) {
        if (!removeFav.isLoading) {
          dispatch(
            removeFavorite({
              listingId: listDetail?.data?.ListingId,
              listingDetail:
                favoriteProperties?.data?.find(
                  (it: any) => it.ListingId === listDetail?.data?.ListingId
                ) || {},
            })
          );
        }
      } else {
        if (!addFav.isLoading) {
          dispatch(
            addFavorite({
              listingId: listDetail?.data?.ListingId,
              listingDetail: listDetail?.data,
            })
          );
        }
      }
    }
  };

  const handleBackLink = () => {
    if (
      paginationList?.findIndex(
        (it: any) => it?.ListingId === listDetail?.data?.ListingId
      ) >= 0
    ) {
      router.push(`${backLink}`);
    }
  };
  return (
    <Fragment>
      {" "}
      {isVisible ? (
        <Box className={Styles.fixedShortCutBarPc}>
          <Container
            className={Styles.propertyContainer}
            sx={{ mr: open ? "46px" : "" }}
          >
            <Box className={Styles.fixedShortCutBarArea}>
              {paginationList?.findIndex(
                (it: any) => it?.ListingId === listDetail?.data?.ListingId
              ) >= 0 ? (
                <IconButton
                  className={Styles.backButtonMb}
                  onClick={handleBackLink}
                >
                  <ArrowBackIcon sx={{ color: "black" }} />
                </IconButton>
              ) : null}

              <Box className={Styles.shortCutBarAreaMB}>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaMBHeading}
                >
                  {formatAddress(listDetail?.data)}
                </Typography>
              </Box>
              <Box className={Styles.shortCutBarAreaFixed}>
                {paginationList?.findIndex(
                  (it: any) => it?.ListingId === listDetail?.data?.ListingId
                ) >= 0 ? (
                  <Typography
                    variant="subtitle2"
                    display="block"
                    gutterBottom
                    className={Styles.shortCutBarBackLink}
                    onClick={handleBackLink}
                  >
                    <ArrowBackIosRoundedIcon
                      sx={{ color: "black", fontSize: "30px" }}
                    />
                    <Typography
                      sx={{ mt: "1px" }}
                      className={Styles.shortCutBarBackLink}
                    >
                      {" "}
                      Search Results
                    </Typography>
                  </Typography>
                ) : null}

                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaItem}
                  sx={{
                    borderBottom:
                      activeTab === "property-overview"
                        ? "3px solid #0064e5"
                        : "3px solid white",
                  }}
                  onClick={() => handleScrollToId("property-overview")}
                >
                  Overview
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaItem}
                  onClick={() =>
                    handleScrollToId("property-location", "property-locationPC")
                  }
                  sx={{
                    borderBottom:
                      activeTab === "property-location"
                        ? "3px solid #0064e5"
                        : "3px solid white",
                  }}
                >
                  Location
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaItem}
                  onClick={() =>
                    handleScrollToId("property-building-information")
                  }
                  sx={{
                    borderBottom:
                      activeTab === "property-building-information"
                        ? "3px solid #0064e5"
                        : "3px solid white",
                  }}
                >
                  Building information
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaItem}
                  onClick={() => handleScrollToId("property-info")}
                  sx={{
                    borderBottom:
                      activeTab === "property-info"
                        ? "3px solid #0064e5"
                        : "3px solid white",
                  }}
                >
                  Property Info
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  className={Styles.shortCutBarAreaItem}
                  onClick={() => handleScrollToId("property-public-records")}
                  sx={{
                    borderBottom:
                      activeTab === "property-public-records"
                        ? "3px solid #0064e5"
                        : "3px solid white",
                  }}
                >
                  Public Records
                </Typography>
              </Box>

              {props.withDataset ? null : (
                <Box className={Styles.statsBarItemAreaShare}>
                  <Box className={Styles.statsBarShareItem}>
                    {favoriteProperties?.data?.find(
                      (it: any) => it.ListingId === listDetail?.data?.ListingId
                    ) ? (
                      <LoadingButton
                        startIcon={
                          <StarRateRoundedIcon
                            sx={{
                              color: "orange",
                              mt: "-3px",
                              fontSize: "25px !important",
                            }}
                          />
                        }
                        className={Styles.statsShareButton}
                        variant="text"
                        onClick={handleFavorite}
                        loading={Boolean(removeFav?.isLoading)}
                        loadingPosition="end"
                      >
                        Remove
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        startIcon={<StarOutlineIcon />}
                        className={Styles.statsShareButton}
                        variant="text"
                        onClick={handleFavorite}
                        loading={Boolean(addFav?.isLoading)}
                        loadingPosition="end"
                      >
                        Save
                      </LoadingButton>
                    )}
                  </Box>
                  <Box
                    onClick={handleClick}
                    className={Styles.statsBarShareItem}
                  >
                    <Button
                      startIcon={<LogoutIcon />}
                      className={Styles.statsShareButton}
                      variant="text"
                    >
                      Share
                    </Button>
                  </Box>
                  {paginationList?.findIndex(
                    (it: any) => it?.ListingId === listDetail?.data?.ListingId
                  ) >= 0 ? (
                    <Box className={Styles.paginationArea}>
                      <Button
                        variant="text"
                        size="small"
                        className={Styles.paginationAreaItem}
                        onClick={() => handleRedirect("prev")}
                        disabled={handleFindList("prev") ? false : true}
                      >
                        <ArrowBackIosRoundedIcon
                          fontSize="small"
                          sx={{
                            color: handleFindList("prev") ? "black" : "#dddddd",
                            fontSize: "17px",
                          }}
                        />
                        <Typography className={Styles.paginationAreaItemText}>
                          Previous
                        </Typography>
                      </Button>

                      <Typography className={Styles.paginationAreaItemText}>
                        {getCurrentIndex()} of {paginationCount}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        className={Styles.paginationAreaItem}
                        onClick={() => handleRedirect("next")}
                        disabled={handleFindList("next") ? false : true}
                      >
                        <Typography className={Styles.paginationAreaItemText}>
                          Next
                        </Typography>
                        <ArrowForwardIosRoundedIcon
                          sx={{
                            color: handleFindList("next") ? "black" : "#dddddd",
                            fontSize: "17px",
                          }}
                        />
                      </Button>
                    </Box>
                  ) : null}
                </Box>
              )}
              <Box className={Styles.statsBarItemAreaShareMB}>
                <IconButton onClick={handleFavorite}>
                  {favoriteProperties?.data?.find(
                    (it: any) => it.ListingId === listDetail?.data?.ListingId
                  ) ? (
                    <StarRateRoundedIcon
                      sx={{
                        color: "orange",
                        mt: "-3px",
                        fontSize: "25px !important",
                      }}
                    />
                  ) : (
                    <StarOutlineIcon
                      sx={{ color: "black", fontSize: "24px" }}
                    />
                  )}
                </IconButton>
                <IconButton onClick={handleClick}>
                  <LogoutIcon sx={{ color: "black", fontSize: "20px" }} />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : null}
      <Container className={Styles.propertyContainer}>
        <Box className={Styles.shortCutBarContainer}>
          <Box className={Styles.shortCutBarArea}>
            {paginationList?.findIndex(
              (it: any) => it?.ListingId === listDetail?.data?.ListingId
            ) >= 0 ? (
              <Typography
                variant="subtitle2"
                display="block"
                gutterBottom
                className={Styles.shortCutBarBackLink}
                onClick={handleBackLink}
              >
                <ArrowBackIosRoundedIcon
                  sx={{ color: "black", fontSize: "30px" }}
                />
                <Typography
                  sx={{ mt: "1px" }}
                  className={Styles.shortCutBarBackLink}
                >
                  {" "}
                  Search Results
                </Typography>
              </Typography>
            ) : null}
            <Typography
              variant="subtitle2"
              display="block"
              gutterBottom
              className={Styles.shortCutBarAreaItem}
              onClick={() => handleScrollToId("property-overview")}
            >
              Overview
            </Typography>
            <Typography
              variant="subtitle2"
              display="block"
              gutterBottom
              className={Styles.shortCutBarAreaItem}
              onClick={() =>
                handleScrollToId("property-location", "property-locationPC")
              }
            >
              Location
            </Typography>
            <Typography
              variant="subtitle2"
              display="block"
              gutterBottom
              className={Styles.shortCutBarAreaItem}
              onClick={() => handleScrollToId("property-building-information")}
            >
              Building information
            </Typography>
            <Typography
              variant="subtitle2"
              display="block"
              gutterBottom
              className={Styles.shortCutBarAreaItem}
              onClick={() => handleScrollToId("property-info")}
            >
              Property Info
            </Typography>
            <Typography
              variant="subtitle2"
              display="block"
              gutterBottom
              className={Styles.shortCutBarAreaItem}
              onClick={() => handleScrollToId("property-public-records")}
            >
              Public Records
            </Typography>
          </Box>
          {paginationList?.findIndex(
            (it: any) => it?.ListingId === listDetail?.data?.ListingId
          ) >= 0 ? (
            <Box className={Styles.paginationArea}>
              <Button
                variant="text"
                size="small"
                className={Styles.paginationAreaItem}
                onClick={() => handleRedirect("prev")}
                disabled={handleFindList("prev") ? false : true}
              >
                <ArrowBackIosRoundedIcon
                  fontSize="small"
                  sx={{
                    color: handleFindList("prev") ? "black" : "#dddddd",
                    fontSize: "17px",
                  }}
                />
                <Typography className={Styles.paginationAreaItemText}>
                  Previous
                </Typography>
              </Button>

              <Typography className={Styles.paginationAreaItemText}>
                {getCurrentIndex()} of {paginationCount}
              </Typography>
              <Button
                variant="text"
                size="small"
                className={Styles.paginationAreaItem}
                onClick={() => handleRedirect("next")}
                disabled={handleFindList("next") ? false : true}
              >
                <Typography className={Styles.paginationAreaItemText}>
                  Next
                </Typography>
                <ArrowForwardIosRoundedIcon
                  sx={{
                    color: handleFindList("next") ? "black" : "#dddddd",
                    fontSize: "17px",
                  }}
                />
              </Button>
            </Box>
          ) : null}
        </Box>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Share handleClose={handleClose} setErrorAlert={setErrorAlert} />
      </Menu>
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Fragment>
  );
}
export default ShortCutBar;
