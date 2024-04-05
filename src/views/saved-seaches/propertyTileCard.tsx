import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { NumberFormat } from "../../utils/numberFormat";
import { formatAddress } from "../../utils/propertyAddressFormat";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Styles from "../../styles/property-search/result.module.css";
import { Box, Typography, Card, Stack, Divider } from "@mui/material";
import Image from "next/image";
import { route } from "../property-search/results/propertyTileCard";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useAppDispatch } from "../../store/store";
import { addFavorite } from "../../store/property-list/addFavorite";
import { removeFavorite } from "../../store/property-list/removeFavorite";
import { handleUpdateAuthPreview } from "../../store/auth";
import { getOptimizedImageUrl, isOptimizedImage } from "../../utils/common";
import { handleReturnPrimaryImage } from "../../utils/propertyData";
const sampleIMage =
  "https://method-idx.s3.amazonaws.com/midx-assets/defaultPropertyNoImage.png";

interface PropertyTileCardProps {
  [key: string]: any;
}

function PropertyTileCard(props: PropertyTileCardProps) {
  const dispatch = useAppDispatch();
  let { item, key, isHomePage, setSelectedMarker, searchId } = props;
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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
    <Box
      onClick={() => {
        router.push(`/property/${item.ListingId}/${route(item)}`);
      }}
      key={key}
      sx={{ width: "95%", padding: "40px 0px" }}
    >
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
            width={500}
            height={300}
            src={getOptimizedImageUrl(
              item?.MediaURL?.[0] || item?.Media?.[0]?.MediaURL
                ? handleReturnPrimaryImage(item?.MediaURL, item?.Media)
                : sampleIMage,
              "640x480"
            )}
            unoptimized={
              isOptimizedImage(item?.MediaURL?.[0] || sampleIMage)
                ? true
                : false
            }
            alt="MediaURL"
            loading="lazy"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = sampleIMage;
            }}
          />
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
                ? item?.PhotosCount
                : "1"}
            </Typography>
            <CameraAltRoundedIcon
              sx={{ color: "white", zIndex: "999" }}
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
            <span>{item.City?.toLowerCase()}</span>, {item.StateOrProvince}{" "}
            {item.PostalCode}
          </Typography>
          <Box>
            {" "}
            {process.env.NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION === "1" ? (
              <Image
                width={85}
                height={20}
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
              {item.BathroomsFull}
            </Typography>
            <Typography className={Styles.propertyResultsItemSubTitle}>
              Baths{" "}
            </Typography>
          </Box>
          <Box>
            <Typography className={Styles.propertyResultsItemStatsValue}>
              {item.BuildingAreaTotal > 0
                ? NumberFormat({
                    number: item?.BuildingAreaTotal,
                  })
                : item?.LotSizeAcres}
            </Typography>
            <Typography className={Styles.propertyResultsItemSubTitle}>
              {item.BuildingAreaTotal > 0 ? "Sq.Ft." : "Acres"}
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
    </Box>
  );
}
export default PropertyTileCard;
