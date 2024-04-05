import React, { useState, useEffect, memo, useCallback } from "react";
import Styles from "../../styles/property-detail-1/map.module.css";
import Styles1 from "../../styles/property-detail-1/location.module.css";
import { Box, Skeleton } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { formatAddress } from "../../utils/propertyAddressFormat";
import { handleUpdateParams } from "../../store/property-list";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/store";
interface mapProps {
  height?: any;
  id?: any;
}

function PropertyLocation(props: mapProps) {
  let { id } = props;
  const [center, setCenter] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);
  const [boundaryCoordinates, setBoundaryCoordinates] = useState<any>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_APP_MAP_API}`,
    libraries: ["drawing"],
  });
  const containerStyle = {
    height: "400px",
    width: "100%",
  };

  const geocodeAddress = (address: any) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      {
        address,
      },
      (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          if (results[0]?.partial_match) {
            setIsLocationUnavailable(true);
          } else {
            setCenter({ lat: lat(), lng: lng() });

            const southwest = results[0]?.geometry?.bounds?.getSouthWest();
            const northeast = results[0]?.geometry?.bounds?.getNorthEast();
            const boundary = [
              { lat: southwest?.lat(), lng: southwest?.lng() }, // southwest corner
              { lat: southwest?.lat(), lng: northeast?.lng() }, // southeast corner
              { lat: northeast?.lat(), lng: northeast?.lng() }, // northeast corner
              { lat: northeast?.lat(), lng: southwest?.lng() }, // northwest corner
            ];
          }

          // setBoundaryCoordinates(boundary);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  useEffect(() => {
    if (listDetail?.data?.Coordinates) {
      let obj: any = {
        lat:
          typeof listDetail?.data?.Coordinates === "string"
            ? Number(listDetail?.data?.Coordinates?.split(",")?.[0] || 0)
            : listDetail?.data?.Coordinates?.[0],
        lng:
          typeof listDetail?.data?.Coordinates === "string"
            ? Number(listDetail?.data?.Coordinates?.split(",")?.[1] || 0)
            : listDetail?.data?.Coordinates?.[1],
      };
      setCenter(obj);
    }
  }, [listDetail?.data?.Coordinates]);

  useEffect(() => {
    if (isLoaded) {
      geocodeAddress(
        formatAddress({
          ...listDetail?.data,
          isFullAddressNeeded: true,
        })
      );
    }
  }, [isLoaded]);

  const handleReturnMap = useCallback(() => {
    return (
      <Box
        sx={{
          height: "400px",
          width: "100%",
          position: "relative",
          border: "1px solid lightgrey",
        }}
      >
        {isLocationUnavailable ? (
          <Box className={Styles1.locationUnavailableArea}>
            <Typography className={Styles1.locationUnavailableAreaContent}>
              Map Location is unavailable for this listing.
            </Typography>
          </Box>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            mapTypeId={"roadmap"}
          >
            {boundaryCoordinates.length > 0 && (
              <Polygon
                paths={boundaryCoordinates}
                options={{
                  strokeColor: "#0064e5",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#0064e5",
                  fillOpacity: 0.35,
                }}
              />
            )}
            <Marker
              position={center}
              // icon={{
              //   scaledSize: new google.maps.Size(40, 40),
              //   url: `https://cdn-icons-png.flaticon.com/512/11083/11083694.png `,
              //   origin: new google.maps.Point(0, 0),
              //   anchor: new google.maps.Point(0, 0),
              // }}
            ></Marker>
          </GoogleMap>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ height: "400px", width: "100%" }}
          />
        )}
      </Box>
    );
  }, [listDetail?.data?.Coordinates, isLoaded]);

  return (
    <Box id={id} className={Styles1.propertyLocationArea}>
      <Typography
        className={Styles1.propertyLocationHeading}
        variant="subtitle2"
        display="block"
        gutterBottom
      >
        Location
      </Typography>
      <Box className={Styles1.propertySubHeader}>
        {/* <Typography
          className={Styles1.propertySubHeaderItem}
          
        >
          {process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME}
        </Typography>
        <ArrowRightIcon sx={{ color: "black" }} /> */}
        <Typography className={Styles1.propertySubHeaderItem}>
          {listDetail?.data?.StateOrProvince}
        </Typography>
        <ArrowRightIcon sx={{ color: "black" }} />
        <Typography
          className={Styles1.propertySubHeaderItem}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(
              handleUpdateParams({
                field: "City",
                value: listDetail?.data?.City,
              })
            );
            router.push("/property-search/results");
          }}
        >
          {listDetail?.data?.City}
        </Typography>
        <ArrowRightIcon sx={{ color: "black" }} />
        <Typography
          className={Styles1.propertySubHeaderItem}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(
              handleUpdateParams({
                field: "PostalCode",
                value: listDetail?.data?.PostalCode,
              })
            );
            router.push("/property-search/results");
          }}
        >
          {listDetail?.data?.PostalCode}
        </Typography>
        <ArrowRightIcon sx={{ color: "black" }} />
        <Typography
          className={Styles1.propertySubHeaderItemInfo}
          sx={{ color: "black !important" }}
        >
          {formatAddress(listDetail?.data)}
        </Typography>
      </Box>
      <Box id="property-map">
        <Box className={Styles.mapViewSection}>
          {listDetail?.data?.Coordinates ? handleReturnMap() : null}
        </Box>
      </Box>
      <Typography className={Styles.mapListingDisclosure}>
        Listing Courtesy of {listDetail?.data?.ListOfficeName} -{" "}
        {listDetail?.data?.ListAgentFullName}
      </Typography>
      {listDetail?.data?.MlsStatus === "Closed" ? (
        <Typography className={Styles.mapListingDisclosure}>
          Sold By {listDetail?.data?.BuyerOfficeName},{" "}
          {listDetail?.data?.BuyerAgentFullName}
        </Typography>
      ) : null}
    </Box>
  );
}
export default memo(PropertyLocation);
