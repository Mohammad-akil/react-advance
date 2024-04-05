import React, { useState, useEffect } from "react";
import Styles from "../../../styles/property-detail-1/map.module.css";
import { Box, Skeleton, Typography } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  StreetViewPanorama,
  LatLngLiteral,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
interface mapProps {
  height?: any;
}
function StreetView(props: mapProps) {
  const [panoPosition, setPanoPosition] = useState<
    LatLngLiteral | null | Boolean
  >(null);
  let { height } = props;
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_APP_MAP_API}`,
    libraries: ["drawing"],
  });

  const containerStyle = {
    height: height ? height : "90vh",
    width: "100%",
  };
  const center: any = {
    lat: panoPosition?.lat(),
    lng: panoPosition?.lng(),
  };

  useEffect(() => {
    if (isLoaded && !loadError) {
      const service = new google.maps.StreetViewService();
      // Define the LatLng object
      const latLng = new google.maps.LatLng(
        typeof listDetail?.data?.Coordinates === "string"
          ? Number(listDetail?.data?.Coordinates?.split(",")?.[0] || 0)
          : listDetail?.data?.Coordinates?.[0],
        typeof listDetail?.data?.Coordinates === "string"
          ? Number(listDetail?.data?.Coordinates?.split(",")?.[1] || 0)
          : listDetail?.data?.Coordinates?.[1]
      );

      // Function to find the nearest panorama
      const findNearestPanorama = () => {
        service.getPanorama(
          {
            location: latLng,
            radius: 50, // You can adjust the radius as needed
          },
          (data, status) => {
            if (status === "OK" && data?.location?.latLng) {
              setPanoPosition(data?.location?.latLng);
            } else {
              console.error("No nearby panorama found.");
            }
          }
        );
      };

      findNearestPanorama();
    }
  }, [listDetail?.data?.Coordinates, isLoaded, loadError]);

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
        {isLoaded ? (
          panoPosition && !loadError ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={panoPosition || center}
              zoom={20}
              mapTypeId={"street"}
            >
              {panoPosition && (
                <StreetViewPanorama position={panoPosition} visible />
              )}
            </GoogleMap>
          ) : (
            <Box className={Styles.mapStreetViewNotAvailable}>
              <Box>
                <center>
                  <TravelExploreIcon sx={{ fontSize: "150px" }} />
                </center>
                <Typography className={Styles.notAvailableText}>
                  Street view not available for this listing
                </Typography>
              </Box>
            </Box>
          )
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
export default StreetView;
