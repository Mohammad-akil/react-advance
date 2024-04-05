import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { NumberFormat } from "../../../utils/numberFormat";
import { formatAddress, getAcres } from "../../../utils/propertyAddressFormat";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Styles from "../../../styles/property-search/result.module.css";
import { Box, Typography, Card, Grid, Stack, Divider } from "@mui/material";
import Image from "next/image";
import { handleUpdateBackLink } from "../../../store/property-list";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useAppDispatch } from "../../../store/store";
import { addFavorite } from "../../../store/property-list/addFavorite";
import { removeFavorite } from "../../../store/property-list/removeFavorite";
import { handleUpdateAuthPreview } from "../../../store/auth";
import { getOptimizedImageUrl, isOptimizedImage } from "../../../utils/common";
import { capitalizeParagraph } from "../../../utils/propertyAddressFormat";
import { handleReturnPrimaryImage } from "../../../utils/propertyData";
import { samplePropertyIMage } from "../../../utils/propertyData";
import Link from "next/link";

export const route = (listingDetail: any) => {
  let StreetNumber = listingDetail?.StreetNumber
    ? `${listingDetail?.StreetNumber?.toString()?.replaceAll(" ", "-")}-`
    : listingDetail?.AddressNumber
    ? `${listingDetail?.AddressNumber?.toString()?.replaceAll(" ", "-")}-`
    : "";
  let StreetName = listingDetail?.StreetName
    ? `${listingDetail?.StreetName?.replaceAll(" ", "-")}-`
    : "";
  let StreetSuffix = listingDetail?.StreetSuffix
    ? `${listingDetail?.StreetSuffix?.replaceAll(" ", "-")}-`
    : "";
  let StreetDirSuffix = listingDetail?.StreetDirSuffix
    ? `${listingDetail?.StreetDirSuffix?.replaceAll(" ", "-")}-`
    : "";
  let UnitNumber = listingDetail?.UnitNumber
    ? `${listingDetail?.UnitNumber?.toString()?.replaceAll(" ", "-")}-`
    : "";
  let City = listingDetail?.City
    ? `${listingDetail?.City?.replaceAll(" ", "-")}-`
    : "-";
  let StateOrProvince = listingDetail?.StateOrProvince
    ? `${listingDetail?.StateOrProvince?.replaceAll(" ", "-")}-`
    : "";
  let PostalCode = listingDetail?.PostalCode
    ? `${listingDetail?.PostalCode?.toString()?.replaceAll(" ", "-")}`
    : "";
  return `${StreetNumber}${StreetName}${StreetSuffix}${StreetDirSuffix}${UnitNumber}${City}${StateOrProvince}${PostalCode} `;
};
interface PropertyTileCardProps {
  [key: string]: any;
}

function PropertyTileCard(props: PropertyTileCardProps) {
  const dispatch = useAppDispatch();
  let { item, key, isHomePage, setSelectedMarker } = props;
  const router = useRouter();
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
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
  const handleIsAllPhotoShow = (data: any) => {
    if (
      data?.StandardStatus === "Closed" ||
      data?.StandardStatus === "Expired" ||
      data?.StandardStatus === "Withdrawn"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleFavorite = (e: any) => {
    e.stopPropagation();
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
          (it: any) => it.ListingId === item?.ListingId
        )
      ) {
        if (!removeFav.isLoading) {
          dispatch(
            removeFavorite({
              listingId: item?.ListingId,
              listingDetail:
                favoriteProperties?.data?.find(
                  (it: any) => it.ListingId === item?.ListingId
                ) || {},
            })
          );
        }
      } else {
        if (!addFav.isLoading) {
          dispatch(
            addFavorite({
              listingId: item?.ListingId,
              listingDetail: item,
            })
          );
        }
      }
    }
  };

  return (
    <Grid
      onClick={() => {
        dispatch(
          handleUpdateBackLink({
            path: `${window.location.pathname}${window.location.search}`,
            currentScroll:
              document.body.scrollTop ||
              document.documentElement.scrollTop ||
              0,
          })
        );
      }}
      key={key}
      item
      xs={12}
      sm={6}
      md={setSelectedMarker ? 12 : 4}
      lg={isHomePage ? 4 : setSelectedMarker ? 6 : 3}
      sx={{ cursor: "pointer" }}
    >
      <Link href={`/property/${item.ListingId}/${route(item)}`}>
        <Card variant="outlined" className={Styles.propertyResultsAreaItem}>
          <Box className={Styles.propertyResultsTopImage}>
            <Image
              sizes="100vw"
              style={{
                zIndex: "5",
                width: "100%",
                height: "230px",
                cursor: "pointer",
                objectFit:
                  item?.MediaURL?.[0] || item?.Media?.[0]?.MediaURL
                    ? "cover"
                    : "inherit",
              }}
              width={100}
              height={230}
              alt="MediaURL"
              src={getOptimizedImageUrl(
                item?.MediaURL?.[0] || item?.Media?.[0]?.MediaURL
                  ? handleReturnPrimaryImage(item?.MediaURL, item?.Media)
                  : samplePropertyIMage,
                "416x276"
              )}
              unoptimized={
                isOptimizedImage(
                  item?.MediaURL?.[0] ||
                    item?.Media?.[0]?.MediaURL ||
                    samplePropertyIMage
                )
                  ? true
                  : false
              }
              priority
              // unoptimized
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = samplePropertyIMage;
              }}
            />

            {/* <CardMedia
        height="230px"
        component="img"
        image={item?.MediaURL?.[0] || samplePropertyIMage}
        alt={item?.UnparsedAddress}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = sampleIMage;
        }}
      ></CardMedia> */}
            <Box className={Styles.propertyResultsMedia}></Box>
            <Typography className={Styles.propertyResultsItemPrice}>
              {item?.ListPrice
                ? NumberFormat({
                    number: item?.ListPrice,
                    currency: "USD",
                  })
                : null}
            </Typography>
            <Stack
              className={Styles.propertyResultsItemPhotos}
              direction={"row"}
              spacing={1}
              alignItems={"center"}
            >
              <Typography className={Styles.propertyResultsItemPhotosCount}>
                {process.env.NEXT_PUBLIC_PHOTO_COUNT === "true" ||
                handleIsAllPhotoShow(item)
                  ? item?.PhotosCount || item.MediaURL?.length
                  : "1"}
              </Typography>
              <CameraAltRoundedIcon
                sx={{ color: "white", zIndex: 2 }}
                fontSize="small"
              />
            </Stack>
            {favoriteProperties?.data?.find(
              (it: any) => it.ListingId === item?.ListingId
            ) ? (
              <FavoriteRoundedIcon
                onClick={handleFavorite}
                className={Styles.propertyResultsItemFavoriteIcon}
                sx={{ color: "orange" }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                onClick={handleFavorite}
                className={Styles.propertyResultsItemFavoriteIcon}
              />
            )}
          </Box>
          <Typography className={Styles.propertyResultsItemTitle}>
            {formatAddress(item)}
          </Typography>

          <Box className={Styles.propertyResultsItemHeader}>
            <Typography className={Styles.propertyResultsItemSubTitle}>
              {capitalizeParagraph(item.City)}, {item.StateOrProvince}{" "}
              {item.PostalCode}
            </Typography>
            <Box>
              {" "}
              {process.env.NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION === "1" ? (
                <Image
                  width={72}
                  height={17}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                  src={site?.logo || responseList?.meta?.siteInfo?.logo}
                  alt="MediaURL"
                />
              ) : null}
            </Box>
          </Box>
          <Divider />
          <Stack
            direction={"row"}
            spacing={3}
            sx={{ padding: "10px" }}
            justifyContent={"space-around"}
          >
            <Box>
              <Typography className={Styles.propertyResultsItemStatsValue}>
                {item.BedroomsTotal}
              </Typography>
              <Typography className={Styles.propertyResultsItemSubTitle}>
                Beds{" "}
              </Typography>
            </Box>
            <Box>
              <Typography className={Styles.propertyResultsItemStatsValue}>
                {item.BathroomsFull || item?.BathroomsTotalInteger}
              </Typography>
              <Typography className={Styles.propertyResultsItemSubTitle}>
                Baths{" "}
              </Typography>
            </Box>
            <Box>
              <Typography className={Styles.propertyResultsItemStatsValue}>
                {(item?.BuildingAreaTotal && item?.BuildingAreaTotal > 0) ||
                (item?.AboveGradeFinishedArea &&
                  item?.AboveGradeFinishedArea > 0)
                  ? NumberFormat({
                      number:
                        item?.BuildingAreaTotal || item?.AboveGradeFinishedArea,
                    })
                  : getAcres(item)}
              </Typography>
              <Typography className={Styles.propertyResultsItemSubTitle}>
                {(item?.BuildingAreaTotal && item?.BuildingAreaTotal > 0) ||
                (item?.AboveGradeFinishedArea &&
                  item?.AboveGradeFinishedArea > 0)
                  ? "Sq.Ft."
                  : "Acres"}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          {process.env.NEXT_PUBLIC_DISPLAY_BROKER_NAME === "true" &&
          item.ListOfficeName ? (
            <Typography className={Styles.brokerNameGMLS}>
              {process.env.NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION === "2" ? (
                <Image
                  width={50}
                  height={20}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                  src={site?.logo || responseList?.meta?.siteInfo?.logo}
                  alt="MediaURL"
                />
              ) : null}
              <span>{item.ListOfficeName}</span>
            </Typography>
          ) : null}
          {process.env.NEXT_PUBLIC_DISPLAY_LIST_AGENT_NAME === "true" &&
          item.ListAgentFullName ? (
            <Typography className={Styles.brokerNameGMLS}>
              {process.env.NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION === "2" ? (
                <Image
                  width={50}
                  height={20}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                  }}
                  src={site?.logo || responseList?.meta?.siteInfo?.logo}
                  alt="MediaURL"
                />
              ) : null}

              <span> Listing courtesy of {item.ListAgentFullName}</span>
            </Typography>
          ) : null}
        </Card>
      </Link>
    </Grid>
  );
}
export default PropertyTileCard;
