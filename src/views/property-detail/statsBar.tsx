import React, { useState, useEffect } from "react";
import Styles from "../../styles/property-detail/statsBar.module.css";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  Menu,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { NumberFormat } from "../../utils/numberFormat";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  MailruShareButton,
  MailruIcon,
  WorkplaceShareButton,
  WorkplaceIcon,
} from "next-share";
import ScheduleContactForm from "./scheduleContactForm";
import { formatAddress, getAcres } from "../../utils/propertyAddressFormat";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useAppDispatch } from "../../store/store";
import { addFavorite } from "../../store/property-list/addFavorite";
import { removeFavorite } from "../../store/property-list/removeFavorite";
import { handleUpdateAuthPreview } from "../../store/auth";
import Share from "../property-detail-1/common/share";
import ResponseAlert from "../../components/shared/alert";

function PropertyStatsBar() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElShare, setAnchorElShare] = useState<null | HTMLElement>(null);
  const [openScheduleTour, setOpenScheduleTour] = useState<Boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
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
  const favoriteProperties = useSelector(
    (state: RootState) => state.propertyList.favoriteProperties
  );
  const addFav = useSelector(
    (state: RootState) => state.propertyList.addFavorite
  );
  const removeFav = useSelector(
    (state: RootState) => state.propertyList.removeFavorite
  );
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location?.href || "");
    }
  }, []);

  const handleClickShare = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorElShare(null);
    } else {
      setAnchorElShare(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleCloseShare = (event: any, reason: any) => {
    if (reason === "tabKeyDown") {
    } else {
      setAnchorElShare(null);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleReturnGeneralStats = (isHorizontal?: any) => (
    <Stack
      direction={"row"}
      className={Styles.statsBarItemArea}
      spacing={4}
      justifyContent={"space-around"}
    >
      <Box className={isHorizontal ? Styles.horizontalStatsView : ""}>
        <Typography className={Styles.statsBarItemTitle}>Beds</Typography>
        <Typography className={Styles.statsBarItemValue}>
          {listDetail?.data?.BedroomsTotal || "0"}
        </Typography>
      </Box>
      <Box className={isHorizontal ? Styles.horizontalStatsView : ""}>
        <Typography className={Styles.statsBarItemTitle}>Baths</Typography>
        <Typography className={Styles.statsBarItemValue}>
          {listDetail?.data?.BathroomsFull || "0"}
        </Typography>
      </Box>
      <Box className={isHorizontal ? Styles.horizontalStatsView : ""}>
        <Typography className={Styles.statsBarItemTitle}>
          {(listDetail?.data?.BuildingAreaTotal &&
            listDetail?.data?.BuildingAreaTotal > 0) ||
          (listDetail?.data?.AboveGradeFinishedArea &&
            listDetail?.data?.AboveGradeFinishedArea > 0)
            ? "Sq.Ft."
            : "Acres"}
        </Typography>
        <Typography className={Styles.statsBarItemValue}>
          {" "}
          {(listDetail?.data?.BuildingAreaTotal &&
            listDetail?.data?.BuildingAreaTotal > 0) ||
          (listDetail?.data?.AboveGradeFinishedArea &&
            listDetail?.data?.AboveGradeFinishedArea > 0)
            ? NumberFormat({
                number:
                  listDetail?.data?.BuildingAreaTotal ||
                  listDetail?.data?.AboveGradeFinishedArea,
              })
            : getAcres(listDetail?.data) || "0"}
        </Typography>
      </Box>
      <Box className={isHorizontal ? Styles.horizontalStatsView : ""}>
        <Typography className={Styles.statsBarItemTitle}>Year</Typography>
        <Typography className={Styles.statsBarItemValue}>
          {listDetail?.data?.YearBuilt || "--"}
        </Typography>
      </Box>
    </Stack>
  );
  const handleReturnShareButton = (isPadding?: any) => (
    <Stack
      direction={"row"}
      className={Styles.statsBarItemAreaShare}
      spacing={4}
      justifyContent={"space-around"}
      sx={{ padding: isPadding ? "0px 70px" : "" }}
    >
      <Box onClick={handleFavorite} className={Styles.statsBarShareItem}>
        <Typography className={Styles.statsBarItemTitle}>
          {favoriteProperties?.data?.find(
            (it: any) => it.ListingId === listDetail?.data?.ListingId
          )
            ? "Remove"
            : "Save"}
        </Typography>
        <Box className={Styles.statsBarShareIIcon}>
          {favoriteProperties?.data?.find(
            (it: any) => it.ListingId === listDetail?.data?.ListingId
          ) ? (
            <FavoriteRoundedIcon
              sx={{ color: "orange", textAlign: "center" }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              sx={{ color: "#666666", textAlign: "center" }}
            />
          )}
        </Box>
      </Box>
      <Box onClick={handleClickShare} className={Styles.statsBarShareItem}>
        <Typography className={Styles.statsBarItemTitle}>Share</Typography>
        <Box className={Styles.statsBarShareIIcon}>
          <EmailOutlinedIcon sx={{ color: "#666666", textAlign: "center" }} />
        </Box>
      </Box>
      <Box onClick={handleClick} className={Styles.statsBarShareItem}>
        <Typography className={Styles.statsBarItemTitle}>Social</Typography>
        <Box className={Styles.statsBarShareIIcon}>
          <ShareOutlinedIcon sx={{ color: "#666666", textAlign: "center" }} />
        </Box>
      </Box>
    </Stack>
  );
  return (
    <Box className={Styles.statsBarArea}>
      <Container maxWidth="xl" className={Styles.statsBarAreaContainer}>
        <Box className={Styles.smallScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} sm={12} md={12}>
              <Box className={Styles.statsBarMBView}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <Typography className={Styles.statsBarHeadingMB}>
                      {formatAddress(listDetail?.data)}
                    </Typography>
                    <Typography className={Styles.statsBarCityZipMB}>
                      <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>
                      , {listDetail?.data?.StateOrProvince}{" "}
                      {listDetail?.data?.PostalCode}
                    </Typography>
                  </Box>
                  <Typography className={Styles.statsBarPriceMB}>
                    {listDetail?.data?.OriginalListPrice ||
                    listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number:
                            listDetail?.data?.ListPrice ||
                            listDetail?.data?.OriginalListPrice,
                          currency: "USD",
                        })
                      : null}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              {handleReturnGeneralStats()}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              {handleReturnShareButton()}
            </Grid>
          </Grid>
        </Box>
        <Box className={Styles.mediumScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item sm={12} md={12} lg={12}>
              <Box
                className={Styles.statsBarPCView}
                sx={{ padding: "10px 0px" }}
              >
                <Typography className={Styles.statsBarHeading}>
                  {formatAddress(listDetail?.data)}
                </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography className={Styles.statsBarCityZip}>
                    <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                    {listDetail?.data?.StateOrProvince}{" "}
                    {listDetail?.data?.PostalCode}
                  </Typography>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    className={Styles.statsBarMap}
                    alignItems={"center"}
                  >
                    <FmdGoodOutlinedIcon fontSize="small" />
                    <Typography
                      component="a"
                      href="#property-map"
                      sx={{ fontSize: "14px" }}
                    >
                      View Map
                    </Typography>
                  </Stack>
                  <Typography className={Styles.statsBarPrice}>
                    {listDetail?.data?.OriginalListPrice ||
                    listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number:
                            listDetail?.data?.ListPrice ||
                            listDetail?.data?.OriginalListPrice,
                          currency: "USD",
                        })
                      : null}
                  </Typography>
                  <Button
                    onClick={() => setOpenScheduleTour(true)}
                    component="a"
                    href="#schedule-tour"
                    size="small"
                    variant="contained"
                    className={Styles.statsBarScheduleButton}
                  >
                    Schedule a Tour
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item sm={8} md={8}>
              {handleReturnGeneralStats(true)}
            </Grid>
            <Grid item sm={4} md={4}>
              {handleReturnShareButton()}
            </Grid>
          </Grid>
        </Box>
        <Box className={Styles.largeScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} md={7} lg={7}>
              <Box className={Styles.statsBarPCView}>
                <Typography className={Styles.statsBarHeading}>
                  {formatAddress(listDetail?.data)}
                </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography className={Styles.statsBarCityZip}>
                    <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                    {listDetail?.data?.StateOrProvince}{" "}
                    {listDetail?.data?.PostalCode}
                  </Typography>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    className={Styles.statsBarMap}
                    alignItems={"center"}
                  >
                    <FmdGoodOutlinedIcon fontSize="small" />
                    <Typography
                      component="a"
                      href="#property-map"
                      sx={{ fontSize: "14px" }}
                    >
                      View Map
                    </Typography>
                  </Stack>
                  <Typography className={Styles.statsBarPrice}>
                    {listDetail?.data?.OriginalListPrice ||
                    listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number:
                            listDetail?.data?.ListPrice ||
                            listDetail?.data?.OriginalListPrice,
                          currency: "USD",
                        })
                      : "0"}
                  </Typography>
                  <Button
                    onClick={() => setOpenScheduleTour(true)}
                    component="a"
                    href="#schedule-tour"
                    size="small"
                    variant="contained"
                    className={Styles.statsBarScheduleButton}
                  >
                    Schedule a Tour
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} lg={3}>
              {handleReturnShareButton(true)}
            </Grid>
            <Grid item xs={12} lg={2}>
              {handleReturnGeneralStats(true)}
            </Grid>
          </Grid>
        </Box>
        <Box className={Styles.extraLargeScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} md={8} lg={7}>
              <Box className={Styles.statsBarPCView}>
                <Typography className={Styles.statsBarHeading}>
                  {formatAddress(listDetail?.data)}
                </Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography className={Styles.statsBarCityZip}>
                    <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                    {listDetail?.data?.StateOrProvince}{" "}
                    {listDetail?.data?.PostalCode}
                  </Typography>

                  <Stack
                    direction={"row"}
                    spacing={1}
                    className={Styles.statsBarMap}
                    alignItems={"center"}
                  >
                    <FmdGoodOutlinedIcon fontSize="small" />
                    <Typography
                      component="a"
                      href="#property-map"
                      sx={{ fontSize: "14px" }}
                    >
                      View Map
                    </Typography>
                  </Stack>
                  <Typography className={Styles.statsBarPrice}>
                    {listDetail?.data?.OriginalListPrice ||
                    listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number:
                            listDetail?.data?.ListPrice ||
                            listDetail?.data?.OriginalListPrice,
                          currency: "USD",
                        })
                      : null}
                  </Typography>
                  <Button
                    onClick={() => setOpenScheduleTour(true)}
                    component="a"
                    href="#schedule-tour"
                    size="small"
                    variant="contained"
                    className={Styles.statsBarScheduleButton}
                  >
                    Schedule a Tour
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {handleReturnGeneralStats()}
            </Grid>
            <Grid item xs={12} lg={2}>
              {handleReturnShareButton()}
            </Grid>
          </Grid>
        </Box>

        <Grid
          sx={{ display: "none !important" }}
          container
          spacing={2}
          alignItems={"center"}
        >
          <Grid item xs={12} md={8} lg={7}>
            <Box className={Styles.statsBarMBView}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography className={Styles.statsBarHeadingMB}>
                    {formatAddress(listDetail?.data)}
                  </Typography>
                  <Typography className={Styles.statsBarCityZipMB}>
                    <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                    {listDetail?.data?.StateOrProvince}{" "}
                    {listDetail?.data?.PostalCode}
                  </Typography>
                </Box>
                <Typography className={Styles.statsBarPriceMB}>
                  {listDetail?.data?.OriginalListPrice ||
                  listDetail?.data?.ListPrice
                    ? NumberFormat({
                        number:
                          listDetail?.data?.ListPrice ||
                          listDetail?.data?.OriginalListPrice,
                        currency: "USD",
                      })
                    : null}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statsBarPCView}>
              <Typography className={Styles.statsBarHeading}>
                {formatAddress(listDetail?.data)}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography className={Styles.statsBarCityZip}>
                  <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                  {listDetail?.data?.StateOrProvince}{" "}
                  {listDetail?.data?.PostalCode}
                </Typography>

                <Stack
                  direction={"row"}
                  spacing={1}
                  className={Styles.statsBarMap}
                  alignItems={"center"}
                >
                  <FmdGoodOutlinedIcon fontSize="small" />
                  <Typography
                    component="a"
                    href="#property-map"
                    sx={{ fontSize: "14px" }}
                  >
                    View Map
                  </Typography>
                </Stack>
                <Typography className={Styles.statsBarPrice}>
                  {listDetail?.data?.OriginalListPrice ||
                  listDetail?.data?.ListPrice
                    ? NumberFormat({
                        number:
                          listDetail?.data?.ListPrice ||
                          listDetail?.data?.OriginalListPrice,
                        currency: "USD",
                      })
                    : null}
                </Typography>
                <Button
                  onClick={() => setOpenScheduleTour(true)}
                  component="a"
                  href="#schedule-tour"
                  size="small"
                  variant="contained"
                  className={Styles.statsBarScheduleButton}
                >
                  Schedule a Tour
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            {handleReturnGeneralStats()}
          </Grid>
          <Grid item xs={12} lg={2}>
            {handleReturnShareButton()}
          </Grid>
        </Grid>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        <Stack
          direction="row"
          alignItems={"center"}
          sx={{ padding: "0px 10px" }}
          spacing={1}
        >
          <FacebookShareButton
            url={currentUrl}
            quote={listDetail?.data?.PublicRemarks}
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LineShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <LineIcon size={32} round />
          </LineShareButton>
          <PinterestShareButton
            url={currentUrl}
            media={listDetail?.data?.PublicRemarks}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TelegramShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TumblrShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <TumblrIcon size={32} round />
          </TumblrShareButton>
          <TwitterShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <ViberShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <ViberIcon size={32} round />
          </ViberShareButton>
          <WhatsappShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <MailruShareButton
            url={currentUrl}
            title={listDetail?.data?.PublicRemarks}
          >
            <MailruIcon size={32} round />
          </MailruShareButton>
          <WorkplaceShareButton
            url={currentUrl}
            quote={listDetail?.data?.PublicRemarks}
          >
            <WorkplaceIcon size={32} round />
          </WorkplaceShareButton>
        </Stack>
      </Menu>
      <ScheduleContactForm
        open={openScheduleTour}
        setOpen={setOpenScheduleTour}
      />
      <Menu
        anchorEl={anchorElShare}
        id="account-menu"
        open={Boolean(anchorElShare)}
        onClose={handleCloseShare}
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
        <Share handleClose={handleCloseShare} setErrorAlert={setErrorAlert} />
      </Menu>
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Box>
  );
}
export default PropertyStatsBar;
