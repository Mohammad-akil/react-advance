"use client";
import React from "react";
import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Providers } from "../store/provider";
import Registration from "../views/registration";
import ChatComponent from "../components/ChatComponent";
import "@fontsource/playfair-display";
// import { HighlightInit } from "@highlight-run/next/client";

// const inter = Inter({ subsets: ["latin"] });
interface LayoutProps {
  children: React.ReactElement;
}
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <HighlightInit
        projectId={process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID || "0dqv0p9g"}
        serviceName="my-nextjs-frontend"
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      /> */}
      <html lang="en">
        <body>
          <Providers>
            <Header />
            {children}
            <Footer />
            <Registration />
            <ChatComponent />
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
// console.warn = console.error = () => {};
