import { Box, CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import {
  formatAddress,
  formatDescription,
} from "../../../../utils/propertyAddressFormat";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyListing = dynamic(
  () => import("../../../../views/property-detail"),
  {
    loading: () => (
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
    ), // Optional loading component
  }
);

const PropertyListing1 = dynamic(
  () => import("../../../../views/property-detail-1"),
  {
    loading: () => (
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
    ), // Optional loading component
  }
);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id?.[1];
  // fetch data
  const propertyDetail = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}/${id}?select=StreetNumber,StreetName,StreetSuffix,StreetDirSuffix,UnitNumber,City,StateOrProvince,PostalCode,BedroomsTotal,BathroomsTotalDecimal,BuildingAreaTotal,OriginalListPrice,ListPrice,PublicRemarks,MediaURL,Media,BathroomsFull,AddressNumber`
  ).then((res) => res.json());
  if (Object.keys(propertyDetail?.data || {})?.length) {
    return {
      title: formatAddress({
        ...propertyDetail?.data,
        isFullAddressNeeded: true,
      }),
      description: formatDescription(propertyDetail?.data),
      openGraph: {
        images: [
          propertyDetail?.data?.MediaURL?.[0] ||
            propertyDetail?.data?.Media?.[0]?.src ||
            "",
        ],
      },
      icons: {
        icon: `https://method-idx.s3.us-east-1.amazonaws.com/midx-assets/${process.env.NEXT_PUBLIC_SITE_ID}/favIcon.png`,
      },
    };
  } else {
    return {
      title: `${process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}`,
      icons: {
        icon: `https://method-idx.s3.us-east-1.amazonaws.com/midx-assets/${process.env.NEXT_PUBLIC_SITE_ID}/favIcon.png`,
      },
    };
  }
}

const PropertyDetailPage: NextPage = ({ params }: any) => {
  return process.env.NEXT_PUBLIC_THEME === "2" ? (
    <PropertyListing1 {...params} withDataset={true} />
  ) : (
    <PropertyListing {...params} withDataset={true} />
  );
};

export default PropertyDetailPage;
