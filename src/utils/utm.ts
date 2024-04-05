// utils/utm.js

export const saveUTMToLocalStorage = () => {
  const queryParams: any = new URLSearchParams(window.location.search);
  const utmParams: any = {};

  // Check for UTM parameters and save them to utmParams
  if (queryParams.has("utm_source")) {
    utmParams.utm_source = queryParams.get("utm_source");
  }

  if (queryParams.has("utm_medium")) {
    utmParams.utm_medium = queryParams.get("utm_medium");
  }

  if (queryParams.has("utm_campaign")) {
    utmParams.utm_campaign = queryParams.get("utm_campaign");
  }
  if (queryParams.has("utm_keyword")) {
    utmParams.utm_keyword = queryParams.get("utm_keyword");
  }
  if (queryParams.has("gclid")) {
    utmParams.gclid = queryParams.get("gclid");
  }
  if (queryParams.has("agent_id")) {
    utmParams.agent_id = queryParams.get("agent_id");
  }
  if (queryParams.has("utm_content")) {
    utmParams.utm_content = queryParams.get("utm_content");
  }
  if (queryParams.has("utm_term")) {
    utmParams.utm_term = queryParams.get("utm_term");
  }
  // Get existing UTM values from local storage
  const storedUTM = JSON.parse(`${localStorage.getItem("utm")}`) || {};

  // Merge new and existing UTM values
  const updatedUTM = { ...storedUTM, ...utmParams };

  // Save updated UTM values to local storage
  localStorage.setItem("utm", JSON.stringify(updatedUTM));

  return updatedUTM;
};

export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_keyword",
  "gclid",
  "agent_id",
  "utm_content",
  "utm_term",
  "props",
  "dis",
  "token",
  "rp",
];
