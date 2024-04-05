import React, { useState, useEffect, useRef } from "react";
import Styles from "../../styles/property-detail-1/statsBar.module.css";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  Menu,
  Divider,
  useMediaQuery,
  Dialog,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { NumberFormat } from "../../utils/numberFormat";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Share from "./common/share";
import { formatAddress, getAcres } from "../../utils/propertyAddressFormat";
import { useAppDispatch } from "../../store/store";
import { addFavorite } from "../../store/property-list/addFavorite";
import { removeFavorite } from "../../store/property-list/removeFavorite";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import { handleUpdateAuthPreview } from "../../store/auth";
import ResponseAlert from "../../components/shared/alert";

interface statsProps {
  [key: string]: any;
}
function PropertyStatsBar(props: statsProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShareViaDialog, setIsShareViaDialog] = useState<Boolean>(false);
  const isExtraSmallScreen = useMediaQuery("(max-width: 575px)");
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const shouldScrollRef = useRef<boolean>(false);
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      shouldScrollRef.current = true;
    }
  };

  const handleClose = (event: any, reason: any) => {
    setIsShareViaDialog(false);
    if (reason === "tabKeyDown") {
    } else {
      setAnchorEl(null);
    }
    shouldScrollRef.current = false;
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
        dispatch(
          removeFavorite({
            listingId: listDetail?.data?.ListingId,
            listingDetail:
              favoriteProperties?.data?.find(
                (it: any) => it.ListingId === listDetail?.data?.ListingId
              ) || {},
          })
        );
      } else {
        dispatch(
          addFavorite({
            listingId: listDetail?.data?.ListingId,
            listingDetail: listDetail?.data,
          })
        );
      }
    }
  };

  // we need to disable the popup on scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (shouldScrollRef.current) {
        shouldScrollRef.current = false;
        setAnchorEl(null);
      }
    };
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Box className={Styles.statsBarArea}>
     <Container className={Styles.propertyContainer}>
        <Box className={Styles.smallScreens}>
          <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={12} md={12}>
              <Box className={Styles.statsBarItemArea}>
                <Box className={Styles.statsBarItem}>
                  <Typography className={Styles.statsBarItemTitle}>
                    {listDetail?.data?.ListPrice
                      ? NumberFormat({
                          number: listDetail?.data?.ListPrice,
                          currency: "USD",
                        })
                      : null}
                  </Typography>
                  <Typography className={Styles.statsBarItemValue}>
                    Price
                  </Typography>
                </Box>
                <Box className={Styles.statsBarSmallView}>
                  {Number(listDetail?.data?.BedroomsTotal || 0) > 0 ? (
                    <Box className={Styles.statsBarItem}>
                      <Typography className={Styles.statsBarItemTitle}>
                        {listDetail?.data?.BedroomsTotal}
                      </Typography>
                      <Typography className={Styles.statsBarItemValue}>
                        Beds
                      </Typography>
                    </Box>
                  ) : null}
                  {Number(listDetail?.data?.BathroomsFull || 0) > 0 ? (
                    <Box className={Styles.statsBarItem}>
                      <Typography className={Styles.statsBarItemTitle}>
                        {listDetail?.data?.BathroomsFull}
                      </Typography>
                      <Typography className={Styles.statsBarItemValue}>
                        Baths
                      </Typography>
                    </Box>
                  ) : null}
                  {Number(listDetail?.data?.BathroomsHalf || 0) > 0 ? (
                    <Box className={Styles.statsBarItem}>
                      <Typography className={Styles.statsBarItemTitle}>
                        {listDetail?.data?.BathroomsHalf}
                      </Typography>
                      <Typography className={Styles.statsBarItemValue}>
                        1/2 Bath
                      </Typography>
                    </Box>
                  ) : null}
                  {(listDetail?.data?.BuildingAreaTotal &&
                    listDetail?.data?.BuildingAreaTotal > 0) ||
                  (listDetail?.data?.AboveGradeFinishedArea &&
                    listDetail?.data?.AboveGradeFinishedArea > 0) ? (
                    <Box className={Styles.statsBarItem}>
                      <Typography className={Styles.statsBarItemTitle}>
                        {NumberFormat({
                          number:
                            listDetail?.data?.BuildingAreaTotal > 0
                              ? listDetail?.data?.BuildingAreaTotal
                              : listDetail?.data?.AboveGradeFinishedArea,
                        })}{" "}
                      </Typography>
                      <Typography className={Styles.statsBarItemValue}>
                        {NumberFormat({
                          number:
                            Number(
                              listDetail?.data?.ListPrice ||
                                listDetail?.data?.OriginalListPrice
                            ) /
                            Number(
                              listDetail?.data?.BuildingAreaTotal > 0
                                ? listDetail?.data?.BuildingAreaTotal
                                : listDetail?.data?.AboveGradeFinishedArea
                            ),
                          currency: "USD",
                        })}
                        / Sq.Ft.
                      </Typography>
                    </Box>
                  ) : (
                    <Box className={Styles.statsBarItem}>
                      <Typography className={Styles.statsBarItemTitle}>
                        {getAcres(listDetail?.data)}
                      </Typography>
                      <Typography className={Styles.statsBarItemValue}>
                        Acres
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography className={Styles.statsBarHeading}>
                {formatAddress(listDetail?.data)}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography className={Styles.statsBarCityZip}>
                  <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                  {listDetail?.data?.StateOrProvince}{" "}
                  {listDetail?.data?.PostalCode}
                </Typography>{" "}
              </Stack>
            </Grid>
            {props.withDataset ? null : (
              <Grid item xs={12} md={12}>
                <Box className={Styles.statsBarItemAreaShare}>
                  <Box
                    sx={{ width: "49%" }}
                    className={Styles.statsBarShareItem}
                  >
                    {" "}
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
                        className={Styles.statsSaveButton}
                        variant="contained"
                        fullWidth
                        onClick={handleFavorite}
                        loading={Boolean(removeFav?.isLoading)}
                        loadingPosition="end"
                      >
                        Remove
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        startIcon={<StarOutlineIcon />}
                        className={Styles.statsSaveButton}
                        variant="contained"
                        onClick={handleFavorite}
                        loading={Boolean(addFav?.isLoading)}
                        fullWidth
                        loadingPosition="end"
                      >
                        Save
                      </LoadingButton>
                    )}
                  </Box>
                  <Box
                    sx={{ width: "49%" }}
                    onClick={handleClick}
                    className={Styles.statsBarShareItem}
                  >
                    <Button
                      startIcon={<LogoutIcon />}
                      className={Styles.statsShareButton}
                      variant="outlined"
                      fullWidth
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box className={Styles.largeScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} sm={8} md={8} lg={4}>
              <Typography className={Styles.statsBarHeading}>
                {formatAddress(listDetail?.data)}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography className={Styles.statsBarCityZip}>
                  <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                  {listDetail?.data?.StateOrProvince}{" "}
                  {listDetail?.data?.PostalCode}
                </Typography>{" "}
              </Stack>
            </Grid>
            {props.withDataset ? null : (
              <Grid item xs={12} sm={4} md={4} lg={2}>
                <Stack
                  direction={"row"}
                  className={Styles.statsBarItemAreaShare}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
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
                        className={Styles.statsSaveButton}
                        variant="contained"
                        fullWidth
                        onClick={handleFavorite}
                        loading={Boolean(removeFav?.isLoading)}
                        loadingPosition="end"
                      >
                        Remove
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        startIcon={<StarOutlineIcon />}
                        className={Styles.statsSaveButton}
                        variant="contained"
                        onClick={handleFavorite}
                        fullWidth
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
                      variant="outlined"
                    >
                      Share
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{ paddingTop: "0px !important", mt: "-3px" }}
            >
              <Box className={Styles.statsBarItemArea}>
                <Box className={Styles.statsBarItem}>
                  <Typography className={Styles.statsBarItemTitle}>
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
                  <Typography className={Styles.statsBarItemValue}>
                    Price
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BedroomsTotal || 0) > 0 ? (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BedroomsTotal}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Beds
                    </Typography>
                  </Box>
                ) : null}
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BathroomsFull || 0) > 0 ? (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BathroomsFull}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Baths
                    </Typography>
                  </Box>
                ) : null}
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BathroomsHalf || 0) > 0 ? (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BathroomsHalf}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      1/2 Bath
                    </Typography>
                  </Box>
                ) : null}
                {Number(listDetail?.data?.BathroomsHalf || 0) > 0 ? (
                  <Divider orientation="vertical" flexItem />
                ) : null}

                {(listDetail?.data?.BuildingAreaTotal &&
                  listDetail?.data?.BuildingAreaTotal > 0) ||
                (listDetail?.data?.AboveGradeFinishedArea &&
                  listDetail?.data?.AboveGradeFinishedArea > 0) ? (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {NumberFormat({
                        number:
                          listDetail?.data?.BuildingAreaTotal > 0
                            ? listDetail?.data?.BuildingAreaTotal
                            : listDetail?.data?.AboveGradeFinishedArea,
                      })}{" "}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Sq.Ft.
                    </Typography>
                  </Box>
                ) : (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {getAcres(listDetail?.data)}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Acres
                    </Typography>
                  </Box>
                )}

                <Divider orientation="vertical" flexItem />
                {(listDetail?.data?.BuildingAreaTotal &&
                  listDetail?.data?.BuildingAreaTotal > 0) ||
                (listDetail?.data?.AboveGradeFinishedArea &&
                  listDetail?.data?.AboveGradeFinishedArea > 0) ? (
                  <Box className={Styles.statsBarItem}>
                    <Typography className={Styles.statsBarItemTitle}>
                      {NumberFormat({
                        number:
                          Number(
                            listDetail?.data?.ListPrice ||
                              listDetail?.data?.OriginalListPrice
                          ) /
                          Number(
                            listDetail?.data?.BuildingAreaTotal > 0
                              ? listDetail?.data?.BuildingAreaTotal
                              : listDetail?.data?.AboveGradeFinishedArea
                          ),
                        currency: "USD",
                      })}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      {" "}
                      per Sq.Ft.
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={Styles.extraLargeScreens}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} md={4} lg={4}>
              <Typography className={Styles.statsBarHeading}>
                {formatAddress(listDetail?.data)}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography className={Styles.statsBarCityZip}>
                  <span>{listDetail?.data?.City?.toLowerCase() || ""}</span>,{" "}
                  {listDetail?.data?.StateOrProvince}{" "}
                  {listDetail?.data?.PostalCode}
                </Typography>{" "}
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={props.withDataset ? 8 : 6}>
              <Box className={Styles.statsBarItemArea}>
                <Box>
                  <Typography className={Styles.statsBarItemTitle}>
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
                  <Typography className={Styles.statsBarItemValue}>
                    Price
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BedroomsTotal || 0) > 0 ? (
                  <Box>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BedroomsTotal}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Beds
                    </Typography>
                  </Box>
                ) : null}
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BathroomsFull || 0) > 0 ? (
                  <Box>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BathroomsFull}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Baths
                    </Typography>
                  </Box>
                ) : null}
                <Divider orientation="vertical" flexItem />
                {Number(listDetail?.data?.BathroomsHalf || 0) > 0 ? (
                  <Box>
                    <Typography className={Styles.statsBarItemTitle}>
                      {listDetail?.data?.BathroomsHalf}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      1/2 Bath
                    </Typography>
                  </Box>
                ) : null}
                {Number(listDetail?.data?.BathroomsHalf || 0) > 0 ? (
                  <Divider orientation="vertical" flexItem />
                ) : null}
                {(listDetail?.data?.BuildingAreaTotal &&
                  listDetail?.data?.BuildingAreaTotal > 0) ||
                (listDetail?.data?.AboveGradeFinishedArea &&
                  listDetail?.data?.AboveGradeFinishedArea > 0) ? (
                  <Box>
                    <Typography className={Styles.statsBarItemTitle}>
                      {NumberFormat({
                        number:
                          listDetail?.data?.BuildingAreaTotal > 0
                            ? listDetail?.data?.BuildingAreaTotal
                            : listDetail?.data?.AboveGradeFinishedArea,
                      })}{" "}
                      Sq.Ft.
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      {" "}
                      {NumberFormat({
                        number:
                          Number(
                            listDetail?.data?.ListPrice ||
                              listDetail?.data?.OriginalListPrice
                          ) /
                          Number(
                            listDetail?.data?.BuildingAreaTotal > 0
                              ? listDetail?.data?.BuildingAreaTotal
                              : listDetail?.data?.AboveGradeFinishedArea
                          ),
                        currency: "USD",
                      })}{" "}
                      / Sq.Ft.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography className={Styles.statsBarItemTitle}>
                      {getAcres(listDetail?.data)}
                    </Typography>
                    <Typography className={Styles.statsBarItemValue}>
                      Acres
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            {props.withDataset ? null : (
              <Grid item xs={12} lg={2}>
                <Stack
                  direction={"row"}
                  className={Styles.statsBarItemAreaShare}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
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
                        className={Styles.statsSaveButton}
                        variant="contained"
                        fullWidth
                        onClick={handleFavorite}
                        loading={Boolean(removeFav?.isLoading)}
                        loadingPosition="end"
                      >
                        Remove
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        startIcon={<StarOutlineIcon />}
                        className={Styles.statsSaveButton}
                        variant="contained"
                        fullWidth
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
                      variant="outlined"
                    >
                      Share
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
      {isShareViaDialog ? (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={() => {}}>
          <Share
            handleClose={handleClose}
            setErrorAlert={setErrorAlert}
            isExtraSmallScreen={isExtraSmallScreen}
            setIsShareViaDialog={setIsShareViaDialog}
            isShareViaDialog={isShareViaDialog}
          />
        </Dialog>
      ) : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          // onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              zIndex: 9999,
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
          disableAutoFocusItem
        >
          <Share
            handleClose={handleClose}
            setErrorAlert={setErrorAlert}
            isExtraSmallScreen={isExtraSmallScreen}
            setIsShareViaDialog={setIsShareViaDialog}
          />
        </Menu>
      )}

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
