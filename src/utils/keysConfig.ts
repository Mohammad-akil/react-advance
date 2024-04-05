export const keysConfig = {
  bathrooms:
    process.env.NEXT_PUBLIC_DATASET === "galmls"
      ? "BathroomsTotalInteger"
      : "BathroomsTotalDecimal",
};
