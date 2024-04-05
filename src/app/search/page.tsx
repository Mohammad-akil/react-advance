import type { NextPage } from "next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageLoader from "../../components/loader/pageLoader";
const PropertySearchResultsDirect = dynamic(
  () => import("../../views/property-search/directSearch"), {
    loading: () => <PageLoader />, // Optional loading component
  }
);

// either Static metadata
export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}`,
  icons: {
    icon: `https://method-idx.s3.us-east-1.amazonaws.com/midx-assets/${process.env.NEXT_PUBLIC_SITE_ID}/favIcon.png`,
  },
};

const PropertyDetailPage: NextPage = ({ params, searchParams }: any) => {
  return <PropertySearchResultsDirect {...params} {...searchParams} />;
};
export default PropertyDetailPage;
