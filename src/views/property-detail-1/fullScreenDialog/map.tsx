import React, { useState, useEffect } from "react";
import Styles from "../../../styles/property-detail-1/map.module.css";
import { Box, Skeleton, Typography } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { formatAddress } from "../../../utils/propertyAddressFormat";
import Styles1 from "../../../styles/property-detail-1/location.module.css";
interface mapProps {
  height?: any;
}
function MapView(props: mapProps) {
  let { height } = props;
  const [boundaryCoordinates, setBoundaryCoordinates] = useState<any>([]);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_APP_MAP_API}`,
    libraries: ["drawing"],
  });
  const [center, setCenter] = useState<any>({
    lat: 0,
    lng: 0,
  });

  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );

  const containerStyle = {
    height: height ? height : "90vh",
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
            const southwest = results[0].geometry.bounds.getSouthWest();
            const northeast = results[0].geometry.bounds.getNorthEast();
            // Create an array of coordinates to define the polygon
            const boundary = [
              { lat: southwest.lat(), lng: southwest.lng() }, // southwest corner
              { lat: southwest.lat(), lng: northeast.lng() }, // southeast corner
              { lat: northeast.lat(), lng: northeast.lng() }, // northeast corner
              { lat: northeast.lat(), lng: southwest.lng() }, // northwest corner
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

  const handleReturnMap = () => {
    return (
      <Box
        sx={{
          height: height ? height : "90vh",
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
            <Marker position={center}></Marker>
          </GoogleMap>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ height: height ? height : "90vh", width: "100%" }}
          />
        )}
      </Box>
    );
  };
  return (
    <Box id="property-map">
      <Box className={Styles.mapViewSection}>
        {listDetail?.data?.Coordinates ? handleReturnMap() : null}
      </Box>
    </Box>
  );
}
export default MapView;
