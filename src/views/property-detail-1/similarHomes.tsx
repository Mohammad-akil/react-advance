import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { getSimilarHomes } from "../../store/property-detail/getSimilarHomes";
import Styles from "../../styles/property-detail-1/propertyInfo.module.css";
import PropertyTileCard from "../property-search/results/propertyTileCard";
interface similarHomeProps {
  [key: string]: any;
}

const getPrice = (price: number, type: string) => {
  let pricePer = Math.ceil(price * 0.3);
  if (type === "min") {
    return price - pricePer;
  } else {
    return price + pricePer;
  }
};

function SimilarHomes(props: similarHomeProps) {
  let { isMPListing } = props;
  const dispatch = useAppDispatch();
  const [isScrollHalf, setIsScrollHalf] = useState(false);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const listDetailMP = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  const similarHomes = useSelector(
    (state: RootState) => state.propertyDetail.similarHomes
  );

  useEffect(() => {
    if (listDetail?.data?.ListingId && isScrollHalf && !isMPListing) {
      let obj: any = {
        minPrice: getPrice(Number(listDetail?.data?.ListPrice || 0), "min"),
        maxPrice: getPrice(Number(listDetail?.data?.ListPrice || 0), "max"),
        City: listDetail?.data?.City?.includes(" ")
          ? `"${listDetail?.data?.City}"`
          : listDetail?.data?.City,
      };
      dispatch(getSimilarHomes(obj));
    }
  }, [listDetail?.data?.ListingId, isScrollHalf]);

  useEffect(() => {
    if (listDetailMP?.data?.id && isScrollHalf && isMPListing) {
      let obj: any = {
        minPrice: getPrice(
          Number(
            listDetailMP?.data?.transaction_listings_v2?.is_rental
              ? listDetailMP?.data?.LeasePrice
              : listDetailMP?.data?.ListPrice || 0
          ),
          "min"
        ),
        maxPrice: getPrice(
          Number(
            listDetailMP?.data?.transaction_listings_v2?.is_rental
              ? listDetailMP?.data?.LeasePrice
              : listDetailMP?.data?.ListPrice || 0
          ),
          "max"
        ),
        City: listDetailMP?.data?.transaction_listings_v2?.city?.includes(" ")
          ? `"${listDetailMP?.data?.transaction_listings_v2?.city}"`
          : listDetailMP?.data?.transaction_listings_v2?.city,
      };
      dispatch(getSimilarHomes(obj));
    }
  }, [listDetailMP?.data?.id, isScrollHalf]);

  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = document.body.offsetHeight / 2;
      if (window.scrollY > halfwayPoint) {
        if (!isScrollHalf) {
          setIsScrollHalf(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [listDetail?.data?.ListingId]);

  return similarHomes && similarHomes?.length ? (
    <Box>
      {" "}
      <Typography className={process.env.NEXT_PUBLIC_THEME === "2"?Styles.propertyInfoHeading:Styles.theme1Heading}>
        Similar Homes
      </Typography>
      <br />
      <Grid container spacing={1}>
        {similarHomes
          .filter((ite: any) => ite.ListingId !== listDetail?.data?.ListingId)
          ?.slice(0, 8)
          ?.map((item: any, index: number) => (
            <PropertyTileCard item={item} key={index} />
          ))}
      </Grid>
    </Box>
  ) : null;
}
export default SimilarHomes;
