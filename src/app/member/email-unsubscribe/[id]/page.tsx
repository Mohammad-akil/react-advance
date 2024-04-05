import type { NextPage } from "next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageLoader from "../../../../components/loader/pageLoader";
const EmailUnSubscribe = dynamic(
  () => import("../../../../views/email-unsubscribe"),
  {
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
const QuickLoginPage: NextPage = ({ params, searchParams }: any) => {
  return <EmailUnSubscribe {...params} {...searchParams} />;
};

export default QuickLoginPage;
