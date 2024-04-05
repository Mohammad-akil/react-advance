"use client";
import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { getListingDetail } from "../../store/listing";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { staticRoutes } from "../../utils/common";
import dynamic from "next/dynamic";

const PropertyListingTemplate1 = dynamic(() => import("./template1"));
const PropertyListingTemplate2 = dynamic(() => import("./template2"));
interface propertyListingTemplate {
  [key: string]: any;
}
interface payloadObj {
  id: any;
  siteId: any;
}

function PropertyListingTemplate(props: propertyListingTemplate) {
  let { id } = props;
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );

  useEffect(() => {
    let ListingId: any = id?.[0] || id;
    if (ListingId) {
      let obj: payloadObj = {
        id: ListingId,
        siteId: staticRoutes.find((item: any) => item.to === ListingId)
          ? process.env.NEXT_PUBLIC_SITE_ID
          : null,
      };
      dispatch(getListingDetail(obj));
    }
  }, [id, dispatch]);

  return listDetail?.isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : listDetail?.data?.template === 2 || listDetail?.data?.template === "2" ? (
    <PropertyListingTemplate2 {...props} />
  ) : (
    <PropertyListingTemplate1 {...props} />
  );
}
export default PropertyListingTemplate;
