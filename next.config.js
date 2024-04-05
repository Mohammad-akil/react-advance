// if (process.env.NODE_ENV !== 'production') {
//   /** @type {import('next').NextConfig} */
//   require('dotenv').dotenv.config({ path: `environments/.env.${process.env.SITE_ENV}` });
// }
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)", // Matches all pages
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate", // Set max-age to 10 minutes
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 600, // Set max-age to 10 minutes
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2hgc8fzob0byo.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "dvvjkgh94f2v6.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "method-platform-sandbox.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "rets.fmlsd.mlsmatrix.com",
      },
      {
        protocol: "http",
        hostname: "mredllc.media-cs.connectmls.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "method-idx.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "method-platform.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "method-idx.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "d1u37eiosi7wb.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "cdn.rets.ly",
      },
      {
        protocol: "https",
        hostname: "nhg-method.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdnparap90.paragonrels.com",
      },
      {
        protocol: "https",
        hostname: "d2bvtii6wos6sc.cloudfront.net",
      },
    ],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    // Set a flag to disable WebSocket
    disableWebSocket: true,
  },
  publicRuntimeConfig: {
    // Set the same flag for the client-side code
    disableWebSocket: true,
  },
  env: {
    NEXT_PUBLIC_APP_BASE_URL: String(process.env.NEXT_PUBLIC_APP_BASE_URL)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_APP_MAP_API: String(process.env.NEXT_PUBLIC_APP_MAP_API)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_PHOTO_COUNT: String(process.env.NEXT_PUBLIC_PHOTO_COUNT)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_DISPLAY_BROKER_NAME: String(
      process.env.NEXT_PUBLIC_DISPLAY_BROKER_NAME
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_DISPLAY_LIST_AGENT_NAME: String(
      process.env.NEXT_PUBLIC_DISPLAY_LIST_AGENT_NAME
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_DISPLAY_LIST_AGENT_EMAIL_ON_PROPERTY_DETAIL: String(
      process.env.NEXT_PUBLIC_DISPLAY_LIST_AGENT_EMAIL_ON_PROPERTY_DETAIL
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_THEME: String(process.env.NEXT_PUBLIC_THEME)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_LISTING_THEME: String(process.env.NEXT_PUBLIC_LISTING_THEME)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_DATASET: String(process.env.NEXT_PUBLIC_DATASET)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_SITE_ID: String(process.env.NEXT_PUBLIC_SITE_ID)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_ACCOUNT_ID: String(process.env.NEXT_PUBLIC_ACCOUNT_ID)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_SITE_URL: String(process.env.NEXT_PUBLIC_SITE_URL)
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_COMPANY_SHORT_NAME: String(
      process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_COMPANY_FULL_NAME: String(
      process.env.NEXT_PUBLIC_COMPANY_FULL_NAME
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_COMPANY_LICENSE_NUMBER: String(
      process.env.NEXT_PUBLIC_COMPANY_LICENSE_NUMBER
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_CONTACT_PERSON_NAME: String(
      process.env.NEXT_PUBLIC_CONTACT_PERSON_NAME
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_CONTACT_PERSON_PHONE: String(
      process.env.NEXT_PUBLIC_CONTACT_PERSON_PHONE
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_CONTACT_PERSON_PROFILE_URL: String(
      process.env.NEXT_PUBLIC_CONTACT_PERSON_PROFILE_URL
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE: String(
      process.env.NEXT_PUBLIC_ALLOW_INTERNATIONAL_PHONE
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION: String(
      process.env.NEXT_PUBLIC_RESULTS_DATASET_LOGO_POSITION
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
    NEXT_PUBLIC_SECRET_ACCESS_TOKEN: String(
      process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN
    )
      .replaceAll('"', "")
      .replaceAll("'", ""),
  },
};

module.exports = nextConfig;
