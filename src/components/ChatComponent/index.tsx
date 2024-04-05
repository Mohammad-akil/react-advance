"use client";
import React, { useEffect } from "react";

const ChatComponent = () => {
  useEffect(() => {
    // Load and initialize the chat script
    if (process.env.NEXT_PUBLIC_CHAT_BOOT === "true") {
      (function (d, t) {
        var BASE_URL = "https://testmethodchats.ourmethod.com";
        var g: any = d.createElement(t),
          s: any = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSDK.run({
            websiteToken: "fF4qF6WDTxzQJbEuWRuKVY7w",
            baseUrl: BASE_URL,
          });
        };
      })(document, "script");
    }
  }, []);
  return null;
};

export default ChatComponent;
