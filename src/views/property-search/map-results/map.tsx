import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import Styles from "../../../styles/property-detail-1/map.module.css";
import { Box, Skeleton, Typography, Button } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { formatAddress } from "../../../utils/propertyAddressFormat";
import type { RootState } from "../../../store/store";
import { NumberFormat } from "../../../utils/numberFormat";
import Image from "next/image";
import { getPropertyList } from "../../../store/property-list";
import { useAppDispatch } from "../../../store/store";
import { getAcres } from "../../../utils/propertyAddressFormat";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getOptimizedImageUrl } from "../../../utils/common";
import { handleReturnPrimaryImage } from "../../../utils/propertyData";
import CircleIcon from "@mui/icons-material/Circle";
import { samplePropertyIMage } from "../../../utils/propertyData";
interface mapProps {
  height?: any;
  [key: string]: any;
}

function CustomInfoWindow(props: { [key: string]: any }) {
  let {
    BedroomsTotal,
    BathroomsTotalDecimal,
    BuildingAreaTotal,
    AboveGradeFinishedArea,
    LotSizeAcres,
    LotSizeSquareFeet,
    MlsStatus,
    ListingId,
  } = props;
  return (
    <Box className={Styles.infoWindowArea}>
      <Box>
        {" "}
        <Image
          src={getOptimizedImageUrl(
            props?.MediaURL?.[0] || props?.Media?.[0]?.MediaURL
              ? handleReturnPrimaryImage(props?.MediaURL, props?.Media)
              : samplePropertyIMage,
            "416x276"
          )}
          width={285}
          className={Styles.infoWindowImage}
          height={184}
          unoptimized
          alt={formatAddress(props)}
          style={{ objectFit: "cover" }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = samplePropertyIMage;
          }}
        />
      </Box>
      <Box className={Styles.infoWindowAreaRight}>
        <Typography className={Styles.infoWindowAreaRightPrice}>
          {NumberFormat({
            number: props?.ListPrice || 0,
            media: props?.MediaURL?.[0] || props?.Media?.[0],
            currency: "USD",
          })}
        </Typography>
        <Typography className={Styles.infoWindowAreaRightStats}>
          {BedroomsTotal} Beds{" "}
          <CircleIcon
            sx={{ fontSize: "7px", ml: "4px", mr: "4px", color: "grey" }}
          />{" "}
          {BathroomsTotalDecimal} Baths{" "}
          <CircleIcon
            sx={{ fontSize: "7px", ml: "4px", mr: "4px", color: "grey" }}
          />{" "}
          {(BuildingAreaTotal && BuildingAreaTotal > 0) ||
          (AboveGradeFinishedArea && AboveGradeFinishedArea > 0)
            ? NumberFormat({
                number: BuildingAreaTotal || AboveGradeFinishedArea,
              })
            : getAcres({ LotSizeAcres, LotSizeSquareFeet })}{" "}
          {(BuildingAreaTotal && BuildingAreaTotal > 0) ||
          (AboveGradeFinishedArea && AboveGradeFinishedArea > 0)
            ? "Sq.Ft."
            : "Acres"}{" "}
          <CircleIcon
            sx={{ fontSize: "7px", ml: "4px", mr: "4px", color: "grey" }}
          />{" "}
          {MlsStatus}
        </Typography>
        <Typography className={Styles.infoWindowAreaRightHeading}>
          {formatAddress({ ...props, isFullAddressNeeded: true })}
        </Typography>
        <Typography className={Styles.infoWindowMlsNumber}>
          MLS®: {ListingId}
        </Typography>
      </Box>
    </Box>
  );
}

function ResultsMap(props: mapProps) {
  let { center, setCenter, setIsMapLoaded } = props;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const { selectedMarker, setSelectedMarker, height } = props;
  const [drawingMode, setDrawingMode] = useState<boolean>(false);
  const [polygonCount, setPolygonCount] = useState<number>(0);
  const drawingModeRef = useRef<boolean>(false);
  const [isMarkerHovered, setIsMarkerHovered] = useState("");
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const mapRef = useRef<google.maps.Map | null>(null);

  // const [reloadMap, setReloadMap] = useState(false);
  const dispatch = useAppDispatch();
  // id: "google-map-script", we can this later
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_APP_MAP_API}`,
    libraries: ["drawing"],
  });
  const responseList = useSelector(
    (state: RootState) => state.propertyList.list
  );
  const storedSearchId = useSelector(
    (state: RootState) => state.propertyList.searchId
  );
  const overwrite = useSelector(
    (state: RootState) => state.propertyList.overwrite
  );

  const containerStyle: React.CSSProperties = {
    height: height ? height : "calc(100vh - 185px)",
    width: "100%",
  };

  const handleMarkerLoad = (marker: any, data: any) => {
    // Attach event listener for mouseover when the marker loads
    if (marker) {
      marker.addListener("mouseover", () => {
        setIsMarkerHovered(data?.ListingId);
      });
      marker.addListener("mouseout", () => {
        setIsMarkerHovered("");
      });
    }
  };
  const onLoad = useCallback((map: any) => {
    setMap(map);
    mapRef.current = map;
    setIsMapLoaded(true);
    map.addListener("dragend", () => {
      if (!drawingModeRef.current) {
        const newCenter = map.getCenter().toJSON();
        dispatch(
          getPropertyList({
            coordinates: newCenter,
            rows: 30,
            loading: false,
          })
        );
      }
    });
    map.addListener(map, "click", function () {
      setSelectedMarker(null);
    });
  }, []);

  useEffect(() => {
    if (responseList?.data?.length && map) {
      const bounds = new window.google.maps.LatLngBounds();
      responseList?.data.forEach((marker: any) => {
        let lat =
          typeof marker?.Coordinates === "string"
            ? Number(marker?.Coordinates?.split(",")?.[0] || 0)
            : marker?.Coordinates?.[0];
        let lng =
          typeof marker?.Coordinates === "string"
            ? Number(marker?.Coordinates?.split(",")?.[1] || 0)
            : marker?.Coordinates?.[1];
        bounds.extend(new window.google.maps.LatLng(lat, lng));
      });
      map?.fitBounds(bounds);
      setZoomLevel(map?.getZoom() || 10);
      if (bounds.getCenter()) {
        setCenter(bounds.getCenter());
      }
    }

  }, [responseList?.data?.[0]?.Coordinates?.[0], map]);

  const handlePolygonComplete = (polygon: any) => {
    setPolygons([...polygons, polygon]);
    const paths: any = polygon
      .getPath()
      .getArray()
      .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));
    let fq = `&fq=%7B!field f=CoordinatesDistance%7DIntersects(POLYGON((${paths
      ?.map((it: any) => `${it.lng} ${it.lat}`)
      ?.join(",")},${paths[0]?.lng} ${paths[0]?.lat})))`;
    dispatch(
      getPropertyList({
        fq,
        rows: 150,
        reset: true,
        loading: polygonCount > 0 ? false : true,
        newPolygon: polygonCount > 0 ? true : false,
        overwrite: polygonCount > 0 ? true : false,
        searchId: polygonCount > 0 ? storedSearchId : "",
      })
    );
    drawingModeRef.current = true;
    setPolygonCount((pol: number) => pol + 1);
  };

  const handleClearButtonClick = () => {
    polygons.forEach((polygon) => {
      polygon.setMap(null); // Remove each polygon from the map
    });
    setPolygons([]);
    dispatch(
      getPropertyList({
        coordinates: center,
        rows: 50,
        reset: true,
        overwrite: overwrite,
        searchId: overwrite ? storedSearchId : "",
        loading: true,
      })
    );
    drawingModeRef.current = false;
    setPolygonCount(0);
    // setReloadMap(!reloadMap);
  };

  const handleMapClick = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
    }
  };
  return (
    <Box>
      <Box className={Styles.mapViewSection}>
        <Box
          sx={{
            height: height ? height : "calc(100vh - 185px)",
            width: "99%",
            position: "relative",
            border: "1px solid lightgrey",
          }}
          id="markers-map"
        >
          <Button
            color="inherit"
            className={Styles.polygonButton}
            variant="outlined"
            endIcon={drawingMode ? <CloseRoundedIcon /> : null}
            onClick={() => {
              if (drawingMode) {
                handleClearButtonClick();
                setDrawingMode((mode: any) => !mode);
              } else {
                setDrawingMode((mode: any) => !mode);
              }
            }}
            size="small"
          >
            {drawingMode ? (
              "Clear"
            ) : (
              <svg
                className="polygon-toggle-icon"
                viewBox="0 0 24 14"
                width="32"
                height="18"
                style={{ color: "black" }}
              >
                <path
                  d="M1.404 7.294l4.15-5.71-.56.182 6.705 2.18-.346-.476-.004 7.06.345-.475-6.7 2.18.56.18-4.15-5.71v.59zm-.808-.588L.382 7l.214.294 4.15 5.71.213.294.345-.113 6.7-2.18.345-.112v-.363l.004-7.06v-.363l-.345-.112L5.304.815 4.96.702l-.214.294-4.15 5.71z"
                  fill="currentColor"
                ></path>
                <circle r="1" cx="5.15" cy="1.29" fill="currentColor"></circle>
                <circle r="1" cx="11.85" cy="3.47" fill="currentColor"></circle>
                <circle
                  r="1"
                  cx="11.85"
                  cy="10.53"
                  fill="currentColor"
                ></circle>
                <circle r="1" cx="1" cy="7" fill="currentColor"></circle>
                <circle r="1" cx="5.15" cy="12.71" fill="currentColor"></circle>
                <path
                  d="M14.404 11.096l2.12-.707 5.658-5.658-1.414-1.414-5.657 5.657-.706 2.12zM21.475 2.61l1.414 1.415.706-.707c.707-.707-.707-2.12-1.414-1.414l-.707.707z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
          </Button>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoomLevel}
              mapTypeId={"roadmap"}
              onLoad={onLoad}
              options={{ streetViewControl: false }}
              onClick={handleMapClick}
              // key={String(reloadMap)}
            >
              {drawingMode ? (
                <DrawingManager
                  drawingMode={google.maps.drawing.OverlayType.POLYGON}
                  onPolygonComplete={handlePolygonComplete}
                  options={{
                    drawingControl: true,
                    drawingControlOptions: {
                      position: window.google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                    },
                    polygonOptions: {
                      editable: true,
                      draggable: true,
                    },
                  }}
                />
              ) : null}
              {polygons.map((polygon, index) => (
                <Polygon
                  key={index}
                  path={polygon.getPath().getArray()}
                  options={{
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              ))}
              {responseList?.data?.map((item: any, i: any) => (
                <Marker
                  key={i}
                  position={{
                    lat:
                      typeof item?.Coordinates === "string"
                        ? Number(item?.Coordinates?.split(",")?.[0] || 0)
                        : item?.Coordinates?.[0],
                    lng:
                      typeof item?.Coordinates === "string"
                        ? Number(item?.Coordinates?.split(",")?.[1] || 0)
                        : item?.Coordinates?.[1],
                  }}
                  icon={
                    item?.MlsStatus === "Active"
                      ? {
                          url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                            `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="25"
                            viewBox="0 0 60 25"
                            x="0"
                            y="0"
                          >
                            <rect
                              width="100%"
                              height="100%"
                              rx="5"
                              ry="5"
                              fill="${
                                isMarkerHovered === item?.ListingId
                                  ? "#eeeeee"
                                  : "white"
                              }"
                              stroke="grey"
                              stroke-width=".5"
                            />
                            <circle cx="10" cy="12" r="4" fill="black" />
                          </svg>`
                          )}`,
                          scaledSize: new google.maps.Size(80, 25),
                          origin: new google.maps.Point(5, 0),
                          anchor: new google.maps.Point(0, 0),
                        }
                      : item?.MlsStatus === "Active Under Contract"
                      ? {
                          path: "M7.5,0 A7.5,7.5 0 1,1 7.5,15 A7.5,7.5 0 1,1 7.5,0",
                          fillColor:
                            isMarkerHovered === item?.ListingId
                              ? "lightgrey"
                              : "grey",
                          fillOpacity: 5,
                          strokeWeight: 2,
                          strokeColor: "white",
                          rotation: 0,
                          scale: 1,
                        }
                      : {
                          path: "M7.5,0 A7.5,7.5 0 1,1 7.5,15 A7.5,7.5 0 1,1 7.5,0",
                          fillColor:
                            isMarkerHovered === item?.ListingId
                              ? "#36454F"
                              : "black",
                          fillOpacity: 2,
                          strokeWeight: 2,
                          strokeColor: "white",
                          rotation: 0,
                          scale: 1,
                        }
                  }
                  onClick={() => setSelectedMarker(item)}
                  onLoad={(marker: any) => handleMarkerLoad(marker, item)}
                  // animation={google.maps.Animation.BOUNCE}
                  label={
                    item?.MlsStatus === "Active"
                      ? {
                          text: ` ${NumberFormat({
                            number: item?.ListPrice || 0,
                            notation: "compact",
                          })}`, // The label text you want to display
                          color: "black", // Transparent text color
                          fontSize: "12px", // Font size
                          fontWeight: "bold", // Font weight
                          fontFamily: "AvenirNextLTPro-Demi", // Font family
                        }
                      : ""
                  }
                  // draggable={true}
                >
                  {selectedMarker?.ListingId === item?.ListingId && (
                    <InfoWindow
                      position={{
                        lat: selectedMarker?.lat,
                        lng: selectedMarker?.lng,
                      }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <CustomInfoWindow {...selectedMarker} />
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          ) : (
            <Skeleton
              variant="rectangular"
              sx={{ height: "calc(100vh - 178px) !important", width: "100%" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default memo(ResultsMap);
