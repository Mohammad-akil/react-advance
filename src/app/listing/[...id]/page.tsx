import type { NextPage } from "next";
import type { Metadata, ResolvingMetadata } from "next";
import { formatDescription } from "../../../utils/propertyAddressFormat";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { staticRoutes } from "../../../utils/common";
import dynamic from "next/dynamic";
import PageLoader from "../../../components/loader/pageLoader";


const PropertyListingTemplate = dynamic(
  () => import("../../../views/listing"),
  {
    loading: () => <PageLoader />, // Optional loading component
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
  const id: any = params.id?.[0];
  let siteId: any = staticRoutes.find((item: any) => item.to === id)
    ? process.env.NEXT_PUBLIC_SITE_ID
    : process.env.NEXT_PUBLIC_SITE_ID;
  // fetch data
  const propertyDetail = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/listings/${siteId}/${id}`
  ).then((res) => res.json());

  if (propertyDetail?.data) {
    return {
      title: `${propertyDetail?.data?.transaction_listings_v2?.street || ""} ${
        propertyDetail?.data?.transaction_listings_v2?.city
      }, ${propertyDetail?.data?.transaction_listings_v2?.state} ${
        propertyDetail?.data?.transaction_listings_v2?.zipcode
      }`,
      description: formatDescription(propertyDetail?.data),
      openGraph: {
        images: propertyDetail?.data?.images?.length
          ? propertyDetail?.data?.images?.find((item: any) => item.isPrimary)
              ?.MediaUrl
            ? [
                propertyDetail?.data?.images?.find(
                  (item: any) => item.isPrimary
                )?.MediaUrl,
              ]
            : [propertyDetail?.data?.images[0]?.MediaUrl]
          : [],
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

const PropertyDetailPage: NextPage = ({ params, searchParams }: any) => {
  return <PropertyListingTemplate {...params} {...searchParams} />;
};

export default PropertyDetailPage;
