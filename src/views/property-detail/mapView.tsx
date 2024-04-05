import React, { useState, useEffect } from "react";
import Styles from "../../styles/property-detail/map.module.css";
import {
  Box,
  Typography,
  Button,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StreetViewPanorama,
  LatLngLiteral,
} from "@react-google-maps/api";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import StreetviewIcon from "@mui/icons-material/Streetview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import { formatAddress } from "../../utils/propertyAddressFormat";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
function PropertyDetailMap() {
  const [panoPosition, setPanoPosition] = useState<
    LatLngLiteral | null | Boolean
  >(null);
  const [activeMapType, setActiveMapType] = useState("");
  const [center, setCenter] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_APP_MAP_API}`,
    libraries: ["drawing"],
  });
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );

  const containerStyle = {
    height: "540px",
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
          setCenter({ lat: lat(), lng: lng() });
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

  const handleOnLoad = () => {
    setTimeout(() => {
      setActiveMapType("roadmap");
    }, 5000);
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
          height: "540px",
          width: "100%",
          position: "relative",
          border: "1px solid lightgrey",
        }}
      >
        <Button
          startIcon={<MapOutlinedIcon sx={{ ml: "-10px" }} />}
          variant="contained"
          onClick={() => setActiveMapType("roadmap")}
          className={Styles.mapViewButton}
          sx={{
            backgroundColor:
              activeMapType === "roadmap" || activeMapType === ""
                ? "#4c516d !important"
                : "#1a1a1a !important",
          }}
        >
          Map View
        </Button>
        <Button
          startIcon={<SatelliteAltRoundedIcon />}
          variant="contained"
          onClick={() => setActiveMapType("hybrid")}
          className={Styles.satelliteViewButton}
          sx={{
            backgroundColor:
              activeMapType === "hybrid"
                ? "#4c516d !important"
                : "#1a1a1a !important",
          }}
        >
          Aerial View
        </Button>
        <Button
          startIcon={<StreetviewIcon />}
          variant="contained"
          onClick={() => setActiveMapType("street")}
          className={Styles.streetViewButton}
          sx={{
            backgroundColor:
              activeMapType === "street"
                ? "#4c516d !important"
                : "#1a1a1a !important",
          }}
        >
          Street View
        </Button>

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={() => handleOnLoad()}
            mapTypeId={activeMapType || "roadmap"}
          >
            {activeMapType === "roadmap" || activeMapType === "hybrid" ? (
              <Marker
                position={center} /* icon={{ url: messageIcon }} */
              ></Marker>
            ) : null}
            {panoPosition && activeMapType === "street" && (
              <StreetViewPanorama position={panoPosition} visible />
            )}
          </GoogleMap>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ height: "540px", width: "100%" }}
          />
        )}
        {/* <GoogleMapReact
    bootstrapURLKeys={{ key: "AIzaSyCDqh1uJXV0q8ltkiA8Ijp5B9cE9oZ2WsM" }}
    defaultCenter={{
      lat: parseFloat(`34.0632049`),
      lng: parseFloat(`-84.395413`),
    }}
    defaultZoom={16}
  >
    <AnyReactComponent lat={34.0632049} lng={-84.395413} text="Property" />
  </GoogleMapReact> */}
      </Box>
    );
  };
  return (
    <Box id="property-map">
      <Box className={Styles.mapViewSectionMB}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Detailed Maps</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {listDetail?.data?.Coordinates ? handleReturnMap() : null}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className={Styles.mapViewSection}>
        <Typography className={Styles.mapViewSectionHeading}>
          Detailed Maps
        </Typography>
        {listDetail?.data?.Coordinates ? handleReturnMap() : null}
      </Box>
    </Box>
  );
}
export default PropertyDetailMap;
