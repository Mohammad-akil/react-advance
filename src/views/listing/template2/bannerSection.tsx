"use client";
import React, { Fragment, useEffect } from "react";
import { Box } from "@mui/material";
import Styles from "../../../styles/listing1/bannerSection.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { NumberFormat } from "../../../utils/numberFormat";
import { getMediaForWebp } from "../../../utils/common";
const sampleIMage =
  "https://method-idx.s3.amazonaws.com/midx-assets/defaultPropertyNoImage.png";
function BannerSection() {
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );

  useEffect(() => {
    if (listDetail?.data?.images) {
      let element = document.getElementById(
        "template-01-banner"
      ) as HTMLDivElement;
      element.style.backgroundImage = `linear-gradient(360deg,rgba(0,0,0,0.41) 100%,rgba(0,0,0,0.32) 100%),url(${
        listDetail?.data?.images?.find((item: any) => item.isPrimary)?.MediaUrl
          ? getMediaForWebp(listDetail?.data?.images?.find((item: any) => item.isPrimary)
              ?.MediaUrl,"large")
          : listDetail?.data?.images[0]?.MediaUrl
          ? getMediaForWebp(listDetail?.data?.images[0]?.MediaUrl,"large")
          : sampleIMage
      })`;
    }
  }, [listDetail?.data?.images]);

  return (
    <Fragment>
      <Box id="template-01-banner" className={Styles.bannerSection}>
        <Box
          onClick={() => {
            document
              .getElementById("listing-01-about-section")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start",
              });
          }}
          className={`${Styles.scrollButton} ${Styles.animated}`}
        >
          <span className={Styles.text}>Scroll</span>
          <svg
            id="arrow-down-long"
            enable-background="new 0 0 100 100"
            height="512"
            viewBox="0 0 100 100"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m53.708 80.251-2.556 3.759-.002-71.489h-2l.002 71.041-2.035-3.541-1.734.996 4.682 8.149 5.297-7.79z" />
          </svg>
        </Box>
        <Box className={`${Styles.heroText}`}>
          <Box className={Styles.inner}>
            <Box
              className={`${Styles.propertyTitle} ${Styles.animated} ${Styles.fadeInUp}`}
            >
              <h1>{listDetail?.data?.transaction_listings_v2?.street}</h1>
            </Box>
            <Box
              className={`${Styles.animated} ${Styles.slideInUp} ${Styles.propertyTitleBottom} ${Styles.hasPrice1}`}
            >
              <Box className={Styles.propertyPrice}>
                <Box className={Styles.listPrice}>
                  {listDetail?.data?.ListPrice
                    ? NumberFormat({
                        number: listDetail?.data?.transaction_listings_v2
                          ?.is_rental
                          ? listDetail?.data?.LeasePrice
                          : listDetail?.data?.ListPrice,
                        currency: "USD",
                      })
                    : null}
                </Box>
              </Box>
              <Box className="property-address-bottom">
                <span className={Styles.locality}>
                  {listDetail?.data?.transaction_listings_v2?.city},
                </span>
                <span className={Styles.administrative_area}>
                  {listDetail?.data?.transaction_listings_v2?.state}{" "}
                </span>
                <span className={Styles.administrative_area}>
                  {listDetail?.data?.transaction_listings_v2?.zipcode}
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={`${Styles.cutAnimateWrapper} ${Styles.animated} ${Styles.fadeInUp}`}
        >
          <Box className={Styles.cut}></Box>
        </Box>
        <Box className={Styles.underlay}></Box>
      </Box>
      {/* Banner stats section */}
      <Box
        className={`${Styles.propertyContentWrap}  ${Styles.posR} ${Styles.dInlineBlock} ${Styles.fullWidth}`}
      >
        <Box className={Styles.detailsBoxWrap}>
          <Box
            className={`${Styles.animated} ${Styles.fadeInUp} ${Styles.propertyDetails} ${Styles.posR}`}
          >
            <Box className={Styles.groupPropertyDetails}>
              <Box className={Styles.propDetail}>
                <span className={Styles.fieldPrefix}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="512"
                      height="512"
                      viewBox="0 0 512 512"
                    >
                      <path d="M496,344h-8V280a32.042,32.042,0,0,0-32-32V112a32.042,32.042,0,0,0-32-32H88a32.042,32.042,0,0,0-32,32V248a32.042,32.042,0,0,0-32,32v64H16a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8h8v32a8,8,0,0,0,8,8H56a7.99,7.99,0,0,0,7.84-6.43L70.56,392H441.44l6.72,33.57A7.99,7.99,0,0,0,456,432h24a8,8,0,0,0,8-8V392h8a8,8,0,0,0,8-8V352A8,8,0,0,0,496,344ZM72,112A16.021,16.021,0,0,1,88,96H424a16.021,16.021,0,0,1,16,16V248H424V216a32.042,32.042,0,0,0-32-32H296a32.042,32.042,0,0,0-32,32v32H248V216a32.042,32.042,0,0,0-32-32H120a32.042,32.042,0,0,0-32,32v32H72ZM408,216v32H280V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,408,216Zm-176,0v32H104V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,232,216ZM40,280a16.021,16.021,0,0,1,16-16H456a16.021,16.021,0,0,1,16,16v64H40Zm9.44,136H40V392H54.24ZM472,416h-9.44l-4.8-24H472Zm16-40H24V360H488Z" />
                    </svg>
                  </span>
                </span>
                <span className={Styles.count}>
                  {" "}
                  {listDetail?.data?.BedroomsTotal} Bedrooms
                </span>
              </Box>

              <Box className={Styles.propDetail}>
                <span className={Styles.fieldPrefix}>
                  <span>
                    <svg
                      id="Layer_1"
                      height="512"
                      viewBox="0 0 512 512"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                    >
                      <path d="m474.073 261h-359.073v-169.7a32.5 32.5 0 0 1 65 0v6.7h-15.18a5.9 5.9 0 0 0 -5.82 6.055v17.945h-12.308a5.578 5.578 0 0 0 -5.692 5.8v25.974c0 3.314 2.379 6.224 5.692 6.224h80.087a6.386 6.386 0 0 0 6.221-6.222v-25.976a6.027 6.027 0 0 0 -6.221-5.8h-11.779v-17.945a6.354 6.354 0 0 0 -6.349-6.055h-16.651v-6.7a44.5 44.5 0 0 0 -89 0v169.7h-65.073a31.5 31.5 0 0 0 0 63h12.073v37.568a92.519 92.519 0 0 0 44.564 79.195l-14.174 14.12a5.983 5.983 0 1 0 8.437 8.484l16.818-16.9a92 92 0 0 0 36.718 7.533h227.274a91.985 91.985 0 0 0 37.473-7.858l16.07 16.106a5.989 5.989 0 1 0 8.484-8.454l-13.564-13.449a92.5 92.5 0 0 0 43.9-78.777v-37.568h12.073a31.5 31.5 0 0 0 0-63zm-253.073-113h-68v-14h68zm-18-26h-32v-12h32zm247 239.568a80.549 80.549 0 0 1 -43.733 71.681 5.391 5.391 0 0 0 -1.532.739 79.791 79.791 0 0 1 -35.1 8.012h-227.272a80.36 80.36 0 0 1 -80.363-80.432v-37.568h388zm24.073-49.568h-436.146a19.5 19.5 0 0 1 0-39h436.146a19.5 19.5 0 0 1 0 39z" />
                      <path d="m193 174.339a6 6 0 0 0 -12 0v6.493a6 6 0 0 0 12 0z" />
                      <path d="m171 174.339a6 6 0 0 0 -12 0v6.493a6 6 0 0 0 12 0z" />
                      <path d="m214 174.339a6 6 0 0 0 -12 0v6.493a6 6 0 0 0 12 0z" />
                      <path d="m187 196.478a6 6 0 0 0 -6 6v6.493a6 6 0 0 0 12 0v-6.493a6 6 0 0 0 -6-6z" />
                      <path d="m165 196.478a6 6 0 0 0 -6 6v6.493a6 6 0 0 0 12 0v-6.493a6 6 0 0 0 -6-6z" />
                      <path d="m208 196.478a6 6 0 0 0 -6 6v6.493a6 6 0 0 0 12 0v-6.493a6 6 0 0 0 -6-6z" />
                    </svg>
                  </span>
                </span>
                <span className={Styles.count}>
                  {listDetail?.data?.BathroomsFull} Bathrooms
                </span>
              </Box>
              <Box className={Styles.propDetail}>
                <span className={Styles.fieldPrefix1}>
                  <span className={Styles.fieldPrefix}>
                    <svg
                      id="Layer_1"
                      enable-background="new 0 0 100 100"
                      height="512"
                      viewBox="0 0 100 100"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m89 10h-78c-.5522461 0-1 .4472656-1 1v78c0 .5527344.4477539 1 1 1h78c.5522461 0 1-.4472656 1-1v-78c0-.5527344-.4477539-1-1-1zm-25.9907227 78v-10.0830078c0-.5527344-.4477539-1-1-1s-1 .4472656-1 1v10.0830078h-49.0092773v-33.2783203h34.2763672v7.8535156c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-8.8535156c0-.5527344-.4477539-1-1-1h-35.2763672v-13.6123047h35.2763672c.5522461 0 1-.4472656 1-1v-8.8525391c0-.5527344-.4477539-1-1-1s-1 .4472656-1 1v7.8525391h-34.2763672v-25.109375h34.2763672v8.1513672c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-8.1513672h12.7329102v8.1513672c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-8.1513672h24.9907226v25.109375h-24.9907227v-7.8525391c0-.5527344-.4477539-1-1-1s-1 .4472656-1 1v24.4648438c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-14.6123047h24.9907227v23.4384766h-25.9907227c-.5522461 0-1 .4472656-1 1v6.3886719c0 .5527344.4477539 1 1 1s1-.4472656 1-1v-5.3886719h24.9907227v23.4521484z" />
                    </svg>
                  </span>
                </span>
                <span className={Styles.count}>
                  {NumberFormat({
                    number: listDetail?.data.BuildingAreaTotal,
                  })}{" "}
                  sqft
                </span>
                {/* <span className={Styles.fieldSuffix}>Home Size</span> */}
              </Box>
              <Box className={Styles.propDetail}>
                <span className={Styles.fieldPrefix}>
                  <span>
                    <svg
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 511.999 511.999"
                      // style="enable-background:new 0 0 511.999 511.999;"
                    >
                      <g>
                        <g>
                          <path
                            d="M510.062,328.728c-0.351-0.387-0.746-0.742-1.18-1.053c-0.001-0.001-0.004-0.003-0.008-0.006
                                             c-0.392-0.281-0.813-0.525-1.254-0.726l-67.207-32.069l67.082-32.009c2.114-0.917,3.747-2.791,4.304-5.145
                                             c0.356-1.51,0.227-3.041-0.303-4.41c-0.338-0.877-0.833-1.667-1.447-2.341c-0.345-0.379-0.73-0.724-1.153-1.029
                                             c0-0.001,0-0.001,0-0.001c-0.003-0.002-0.005-0.003-0.007-0.005c-0.398-0.286-0.823-0.534-1.272-0.739l-67.204-32.067
                                             l67.083-32.01c2.114-0.917,3.747-2.79,4.303-5.144c0.355-1.506,0.227-3.032-0.299-4.4c-0.336-0.875-0.827-1.664-1.439-2.338
                                             c-0.351-0.387-0.746-0.742-1.18-1.053c-0.001-0.002-0.004-0.003-0.008-0.006c-0.392-0.281-0.812-0.525-1.254-0.726
                                             l-140.573-67.077c-3.723-1.779-8.188-0.2-9.966,3.528c-1.778,3.726-0.198,8.188,3.528,9.966l126.552,60.388l-231.364,110.4
                                             l-230.984-110.4l230.984-110.4l56.037,26.739c3.723,1.78,8.188,0.2,9.966-3.528c1.778-3.726,0.199-8.188-3.528-9.966
                                             l-59.258-28.277c-2.038-0.974-4.406-0.973-6.443,0.002L4.499,171.393c-2.112,0.918-3.743,2.79-4.298,5.142
                                             c-0.356,1.506-0.228,3.032,0.299,4.4c0.335,0.875,0.827,1.664,1.438,2.338c0.351,0.387,0.746,0.742,1.18,1.053
                                             c0.003,0.003,0.006,0.004,0.008,0.006c0.391,0.28,0.81,0.523,1.25,0.724l67.1,32.071L4.5,249.139
                                             c-2.112,0.917-3.744,2.79-4.299,5.142c-0.355,1.505-0.228,3.03,0.297,4.397c0.34,0.888,0.84,1.686,1.463,2.366
                                             c0.341,0.374,0.723,0.714,1.141,1.016c0.003,0.002,0.004,0.003,0.008,0.006c0.397,0.286,0.823,0.534,1.272,0.739l67.095,32.068
                                             L4.5,326.885c-2.113,0.917-3.744,2.789-4.299,5.142c-0.356,1.509-0.227,3.038,0.302,4.407c0.331,0.86,0.813,1.638,1.411,2.304
                                             c0.002,0.002,0.004,0.005,0.005,0.005c0.369,0.411,0.786,0.784,1.246,1.109c0.004,0.002,0.006,0.004,0.009,0.006
                                             c0.377,0.266,0.779,0.497,1.202,0.69l248.196,118.627c1.02,0.488,2.121,0.731,3.224,0.731c1.1,0,2.201-0.243,3.219-0.729
                                             L507.496,340.61c2.114-0.917,3.747-2.79,4.303-5.144c0.355-1.506,0.227-3.033-0.299-4.4
                                             C511.165,330.191,510.673,329.401,510.062,328.728z M255.798,444.146l-230.984-110.4l63.997-30.587l44.026,21.043
                                             c1.041,0.497,2.138,0.733,3.219,0.733c2.79,0,5.467-1.569,6.75-4.254c1.781-3.725,0.204-8.188-3.521-9.968L93.313,288.74
                                             c-0.713-0.512-1.51-0.887-2.349-1.123L24.814,256l63.996-30.587l163.761,78.27c1.02,0.488,2.121,0.731,3.224,0.731
                                             c1.1,0,2.201-0.243,3.219-0.729l164.154-78.329c0.315,0.215,0.643,0.415,0.998,0.584l62.995,30.06L255.798,366.4l-68.459-32.72
                                             c-3.728-1.783-8.189-0.203-9.968,3.521c-1.781,3.725-0.204,8.188,3.521,9.968l71.681,34.26c1.02,0.488,2.121,0.731,3.224,0.731
                                             c1.1,0,2.201-0.243,3.219-0.729l164.041-78.275l64.106,30.59L255.798,444.146z"
                          />
                        </g>
                      </g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </svg>
                  </span>
                </span>
                <span className={Styles.count}>
                  {" "}
                  {new Intl.NumberFormat().format(
                    listDetail?.data.LotSizeAcres || 0
                  )}{" "}
                  acres
                </span>
                {/* <span className={Styles.fieldSuffix}>Lot Size</span> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
export default BannerSection;
