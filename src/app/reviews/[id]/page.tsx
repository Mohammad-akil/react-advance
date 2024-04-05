import type { NextPage } from "next";
import { Metadata } from "next";
import PageLoader from "../../../components/loader/pageLoader";
import dynamic from "next/dynamic";
const AgentReviewSection = dynamic(() => import("../../../views/agentReview"), {
  loading: () => <PageLoader />, // Optional loading component
});

// either Static metadata
export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}`,
  icons: {
    icon: `https://method-idx.s3.us-east-1.amazonaws.com/midx-assets/${process.env.NEXT_PUBLIC_SITE_ID}/favIcon.png`,
  },
};

const AgentReviewPage: NextPage = ({ params, searchParams }: any) => {
  return <AgentReviewSection params={params} searchParams={searchParams} />;
};
export default AgentReviewPage;
