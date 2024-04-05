import { NumberFormat } from "./numberFormat";
export const getAcres = (data: any) => {
  if (data?.LotSizeAcres && data?.LotSizeAcres > 0) {
    return data?.LotSizeAcres;
  } else if (data?.LotSizeSquareFeet && data?.LotSizeSquareFeet > 0) {
    return (data?.LotSizeSquareFeet / 43560).toFixed(1);
  } else {
    return 0;
  }
};

export const capitalizeParagraph = (paragraph: string) => {
  // Split the paragraph into an array of words
  let words: any = paragraph?.toLowerCase().split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word: string) => word?.charAt(0).toUpperCase() + word?.slice(1)
  );

  // Join the capitalized words back into a paragraph
  const capitalizedParagraph = capitalizedWords.join(" ");

  return capitalizedParagraph;
};

export const formatAddress = (listingDetail: any) => {
  let StreetNumber =
    listingDetail?.StreetNumber || listingDetail?.AddressNumber || "";
  let StreetName = listingDetail?.StreetName || "";
  let StreetSuffix = listingDetail?.StreetSuffix
    ? ` ${listingDetail?.StreetSuffix}`
    : "";
  let StreetDirPrefix = listingDetail?.StreetDirPrefix
    ? ` ${listingDetail?.StreetDirPrefix}`
    : "";
  let StreetDirSuffix = listingDetail?.StreetDirSuffix
    ? ` ${listingDetail?.StreetDirSuffix}`
    : "";
  let UnitNumber = listingDetail?.UnitNumber
    ? ` Unit ${listingDetail?.UnitNumber}`
    : "";
  let City = listingDetail?.City || "";
  let StateOrProvince = listingDetail?.StateOrProvince || "";
  let PostalCode = listingDetail?.PostalCode || "";

  if (listingDetail?.isFullAddressNeeded) {
    return capitalizeParagraph(
      `${StreetNumber} ${StreetDirPrefix} ${StreetName}${StreetSuffix}${StreetDirSuffix}${UnitNumber} ${City}, ${StateOrProvince} ${PostalCode}`
    );
  } else {
    return capitalizeParagraph(
      `${StreetNumber} ${StreetDirPrefix} ${StreetName} ${StreetSuffix} ${StreetDirSuffix} ${UnitNumber}`
    );
  }
};

export const formatDescription = (listingDetail: any) => {
  return `${listingDetail?.BedroomsTotal || "0"} Bedrooms | ${
    listingDetail?.BathroomsFull || "0"
  } Bathrooms | ${
    listingDetail?.BuildingAreaTotal > 0 ||
    listingDetail?.AboveGradeFinishedArea > 0
      ? `${NumberFormat({
          number:
            listingDetail?.BuildingAreaTotal > 0
              ? listingDetail?.BuildingAreaTotal
              : listingDetail?.AboveGradeFinishedArea,
        })} Sqft`
      : `${getAcres(listingDetail)} Acres`
  }  | ${
    listingDetail?.ListPrice || listingDetail?.LeasePrice
      ? NumberFormat({
          number: listingDetail?.ListPrice || listingDetail?.LeasePrice,
          currency: "USD",
        })
      : null
  } - ${listingDetail?.PublicRemarks}`?.length > 350
    ? `${listingDetail?.BedroomsTotal || "0"} Bedrooms | ${
        listingDetail?.BathroomsFull || "0"
      } Bathrooms | ${
        listingDetail?.BuildingAreaTotal > 0 ||
        listingDetail?.AboveGradeFinishedArea > 0
          ? `${NumberFormat({
              number:
                listingDetail?.BuildingAreaTotal > 0
                  ? listingDetail?.BuildingAreaTotal
                  : listingDetail?.AboveGradeFinishedArea,
            })} Sqft`
          : `${getAcres(listingDetail)} Acres`
      } | ${
        listingDetail?.ListPrice || listingDetail?.LeasePrice
          ? NumberFormat({
              number: listingDetail?.ListPrice || listingDetail?.LeasePrice,
              currency: "USD",
            })
          : null
      } - ${listingDetail?.PublicRemarks}`?.slice(0, 350) + "..."
    : `${listingDetail?.BedroomsTotal || "0"} Bedrooms | ${
        listingDetail?.BathroomsFull || "0"
      } Bathrooms | ${
        listingDetail?.BuildingAreaTotal > 0 ||
        listingDetail?.AboveGradeFinishedArea > 0
          ? `${NumberFormat({
              number:
                listingDetail?.BuildingAreaTotal > 0
                  ? listingDetail?.BuildingAreaTotal
                  : listingDetail?.AboveGradeFinishedArea,
            })} Sqft`
          : `${getAcres(listingDetail)} Acres`
      } | ${
        listingDetail?.ListPrice || listingDetail?.LeasePrice
          ? NumberFormat({
              number: listingDetail?.ListPrice || listingDetail?.LeasePrice,
              currency: "USD",
            })
          : null
      } - ${listingDetail?.PublicRemarks}`;
};
