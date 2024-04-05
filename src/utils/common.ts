import { NumberFormat } from "./numberFormat";
export const decodeRangeValue = (value: any, type: any, notation?: string) => {
  let newValue = value
    ?.replaceAll("[", "")
    ?.replaceAll(" ", "")
    ?.replaceAll("]", "")
    ?.split("TO");
  if (type === "min") {
    return notation && newValue[0] !== "*"
      ? NumberFormat({
          number: newValue[0] || 0,
          notation: "compact",
        })
      : newValue?.[0];
  }
  if (type === "max") {
    return notation && newValue[1] !== "*"
      ? NumberFormat({
          number: newValue[1] || 0,
          notation: "compact",
        })
      : newValue?.[1];
  }
};
export const decodeMultipleValue = (newValue: any) => {
  if (newValue?.split("OR")?.length > 1) {
    let filterValues = newValue
      ?.split(" OR ")
      ?.map((item: any) => {
        if (item.includes(" ")) {
          return `"${item}"`;
        } else {
          return item;
        }
      })
      ?.join(" OR ");
    return `(${filterValues})`;
  } else {
    return newValue?.includes(" ") ? `"${newValue}"` : newValue;
  }
};
export const splitMultipleValue = (newValue: any) => {
  if (newValue?.split("OR")?.length > 1) {
    return newValue
      ?.replaceAll("(", "")
      ?.replaceAll(")", "")
      ?.replaceAll(`"`, "")
      ?.split(" OR ");
  } else {
    return newValue;
  }
};
export const returnKeyMultipleExistsInObject = (object: any, keys: any) => {
  let newKeys = [];
  for (let i = 0; i < keys.length; i++) {
    if (object.hasOwnProperty(keys[i])) {
      newKeys.push(keys[i]);
    }
  }
  return newKeys;
};

export const isChecked = (value: any, type: any) => {
  return value
    ?.replaceAll(")", "")
    ?.replaceAll("(", "")
    ?.replaceAll(`"`, "")
    ?.split(" OR ")
    ?.includes(type);
};

interface keysProps {
  [key: string]: any;
}

export const formateKeys: keysProps = {
  ListPrice: "Price",
  MlsStatus: "Status",
  BedroomsTotal: "Beds",
  BathroomsTotalDecimal: "Baths",
  BathroomsTotalInteger: "Baths",
  LotSizeAcres: "Lot Size",
  BuildingAreaTotal: "SqFt",
  YearBuilt: "Year Built",
  PropertySubType: "Property Type",
  PropertyType: "Listing Type",
};

export const formatPhoneNumber = (phoneNumber: any) => {
  // Remove non-numeric characters
  if (phoneNumber) {
    const numericOnly = phoneNumber.replace(/\D/g, "");

    // Check if the numericOnly string has enough characters
    if (numericOnly.length >= 6) {
      // Format as 121-455-
      return `${numericOnly.slice(0, 3)}-${numericOnly.slice(
        3,
        6
      )}-${numericOnly.slice(6)}`;
    } else {
      // If not enough characters, return the original string
      return numericOnly;
    }
  } else {
    return null;
  }
};
export const staticRoutes: any = [
  {
    from: "1515-fairwind-ct-alpharetta-ga-30004",
    to: "1515-fairwind-ct-alpharetta-ga-30004",
  },
  {
    from: "257-prominent-loop-mcdonough-ga-30253",
    to: "257-prominent-loop-mcdonough-ga-30253",
  },
  {
    from: "4172-n-shallowford-rd-chamblee-ga-30341",
    to: "4172-shallowford-rd-chamblee-ga-30341",
  },
  {
    from: "109-ivy-meadow-ct-ball-ground-ga-30107",
    to: "109-ivy-meadow-ct-ball-ground-ga-30107",
  },
  {
    from: "210-harper-rd-se-atlanta-ga-30315",
    to: "210-harper-rd-se-atlanta-ga-30315",
  },
  {
    from: "3200-rockport-ct-9c-cumming-ga-30041",
    to: "3200-rockport-ct-9c-cumming-ga-30041",
  },
  {
    from: "152-cedar-creek-crossing-cedartown-ga-30125",
    to: "152-cedar-creek-xing-cedartown-ga-30125",
  },
  {
    from: "705-anna-lane-alpharetta-ga-30004",
    to: "705-anna-lane-alpharetta-ga-30004",
  },
  {
    from: "1855-ellison-lakes-ct-nw-kennesaw-ga-30152",
    to: "1855-ellison-lakes-ct-kennesaw-ga-30152",
  },
  {
    from: "4020-nw-101st-dr-coral-springs-fl-33065",
    to: "4020-nw-101st-dr-coral-springs-fl-33065",
  },
  {
    from: "3649-hermitage-dr-berkeley-lake-ga-30096",
    to: "3649-hermitage-dr-berkeley-lake-ga-30096",
  },
  {
    from: "1137-shiloh-ln-nw-kennesaw-ga-30144",
    to: "1137-shiloh-ln-nw-kennesaw-ga-30144",
  },
  {
    from: "3023-coach-ln-marietta-ga-30062",
    to: "3023-coach-lane-marietta-ga-30062",
  },
  {
    from: "5332-5302-highway-119-montevallo-al-35115",
    to: "5332-5302-highway-119-montevallo-al-35115",
  },
  {
    from: "1544-bishop-hollow-run-atlanta-ga-30338",
    to: "1544-bishop-hollow-run-atlanta-ga-30338",
  },
  {
    from: "2503-vineyard-way-se-smyrna-ga-30082",
    to: "2503-vineyard-way-se-smyrna-ga-30082",
  },
  {
    from: "46-rumson-ct-se-smyrna-ga-30080",
    to: "46-rumson-ct-se-smyrna-ga-30080",
  },
  {
    from: "3915-bailey-park-dr-cumming-ga-30041",
    to: "3915-bailey-park-drive-cumming-ga-30041",
  },
  {
    from: "14235-thompson-rd-milton-ga-30004-house",
    to: "14235-thompson-road-house-milton-ga-30004",
  },
  {
    from: "456-overbrook-dr-nw-atlanta-ga-30318",
    to: "456-overbrook-dr-nw-atlanta-ga-30318",
  },
  {
    from: "621-86th-st-miami-beach-fl-33141",
    to: "621-86th-street-miami-beach-fl-33141",
  },
  {
    from: "2660-peachtree-rd-16c-atlanta-ga-30305",
    to: "2660-peachtree-rd-nw-unit-16c-atlanta-ga-30305",
  },
  {
    from: "433-12th-st-pleasant-grove-al-35127",
    to: "433-12th-st-pleasant-grove-al-35127",
  },
  {
    from: "56-cherry-blossom-walk-dallas-ga-30132",
    to: "56-cherry-blossom-walk-dallas-ga-30132",
  },
  {
    from: "0-river-dr-wilsonville-al-35186",
    to: "0-river-dr-wilsonville-al-35186",
  },
  {
    from: "8440-oakley-cir-union-city-ga-30291",
    to: "8440-oakley-cir-union-city-ga-30291",
  },
  {
    from: "1525-eastern-sunrise-ln-1525-decatur-ga-30034",
    to: "1525-eastern-sunrise-ln-1525-decatur-ga-30034",
  },
  {
    from: "haley-station-canton-ga-30115",
    to: "205-carrington-pt-canton-ga-30115",
  },
  {
    from: "164-aspen-hall-dr-canton-ga-30115",
    to: "164-aspen-hall-dr-canton-ga-30115",
  },
  {
    from: "100-aspen-hall-dr-canton-ga-30115",
    to: "100-aspen-hall-dr-canton-ga-30115",
  },
  {
    from: "176-aspen-hall-dr-canton-ga-30115",
    to: "176-aspen-hall-dr-canton-ga-30115",
  },
  {
    from: "621-hodgens-rd-chelsea-al-35043",
    to: "621-hodgens-rd-chelsea-al-35043",
  },
  {
    from: "4468-clear-creek-rd-ellijay-ga-30536",
    to: "4468-clear-creek-rd-ellijay-ga-30536",
  },
  {
    from: "132-moreland-ave-se-atlanta-ga-30316",
    to: "132-moreland-avenue-se-atlanta-ga-30316",
  },
  {
    from: "1315-gaddis-rd-canton-ga-30115",
    to: "1315-gaddis-road-canton-ga-30115",
  },
  {
    from: "286-gantt-rd-canton-ga-30115",
    to: "286-gantt-rd-canton-ga-30115",
  },
  {
    from: "127-amanda-drive-vincent-al-35178",
    to: "127-amanda-drive-vincent-al-35178",
  },
  {
    from: "100-hendrix-dr-canton-ga-30115",
    to: "100-hendrix-dr-canton-ga-30115",
  },
  {
    from: "5162-lakefront-blvd-unit-d-delray-beach-fl-33484",
    to: "5162-lakefront-blvd-unit-d-delray-beach-fl-33484",
  },
  {
    from: "0-doncaster-drive-14-rome-ga-30161",
    to: "0-doncaster-drive-14-rome-ga-30161",
  },
  {
    from: "400-w-peachtree-st-nw-3114-atlanta-ga-30308",
    to: "400-w-peachtree-st-nw-unit-3114-atlanta-ga-30308",
  },
  {
    from: "lot-308-lake-pointe-dr-lincoln-al-35096",
    to: "lot-308-lake-pointe-dr-lincoln-al-35096",
  },
  {
    from: "6695-wright-rd-sandy-springs-ga-30328",
    to: "6695-wright-road-sandy-springs-georgia-30328",
  },
  {
    from: "58-pineywoods-rd-hartwell-ga-30643",
    to: "58-pineywoods-rd-hartwell-georgia-30643",
  },
  {
    from: "1019-madison-ln",
    to: "1019-madison-hall-lane-milton-ga-30004",
  },
  {
    from: "0-headland-dr-east-point-ga-30344",
    to: "0-headland-dr-east-point-ga-30344",
  },
  {
    from: "5162-lakefront-blvd-unit-d-delray-beach-fl-33484",
    to: "5162-lakefront-blvd-d-delray-beach-fl-33484",
  },
  {
    from: "2160-prestwick-ct-ne-brookhaven-ga-30319",
    to: "2160-prestwick-ct-brookhaven-ga-30319",
  },
  {
    from: "1400-liberty-ln-roswell-ga-30075",
    to: "1400-liberty-ln-roswell-ga-30075",
  },
  {
    from: "4710-bridle-point-pkwy-snellville-ga-30039",
    to: "4710-bridle-point-pkwy-snellville-ga-30039",
  },
  {
    from: "0-hudlow-rd-forest-city-nc-28043",
    to: "0-hudlow-road-forest-city-nc-28043",
  },
  {
    from: "594-farmbrook-trl-ne-kennesaw-ga-30144",
    to: "594-farmbrook-trl-ne-kennesaw-ga-30144",
  },
  {
    from: "1481-annapolis-way-grayson-georgia-30017",
    to: "1481-annapolis-way-grayson-ga-30017",
  },
  {
    from: "544-old-rocky-rd-canton-ga-30115",
    to: "544-old-rocky-rd-canton-ga-30115",
  },
  {
    from: "14295-thompson-road-milton-ga-30004",
    to: "14295-thompson-road-milton-ga-30004",
  },
  {
    from: "4132-cumberland-point-dr-gainesville-ga-30504",
    to: "4132-cumberland-point-dr-gainesville-ga-30504",
  },
  {
    from: "975-buckhorn-e-sandy-springs-ga-30350",
    to: "975-buckhorn-e-atlanta-ga-30350",
  },
  {
    from: "1629-alemeda-ave-sw-birmingham-al-35211",
    to: "1629-alemeda-ave-sw-birmingham-al-35211",
  },
  {
    from: "lot-309-lake-pointe-drive-lincoln-al-35096",
    to: "lot-309-lake-pointe-drive-lincoln-al-35096",
  },
  {
    from: "14225-thompson-road-milton-ga-30004",
    to: "14225-thompson-road-milton-ga-30004",
  },
  {
    from: "140-wyatt-rd-canton-georgia-30115",
    to: "140-wyatt-rd-canton-georgia-30115",
  },
  {
    from: "235-johnson-st-millen-ga-30442",
    to: "235-johnson-street-millen-ga-30442",
  },
  {
    from: "5162-lakefront-blvd-unit-d-delray-beach-fl-33484",
    to: "5162-lakefront-blvd-d-delray-beach-fl-33484",
  },
];

function updateImageExtension(imageUrl: string, newExtension: string) {
  // Extract the base URL without the extension
  const baseUrl = imageUrl.replace(/\.[^/.]+$/, "");
  // Append the new extension
  const updatedUrl = `${baseUrl}.${newExtension}`;
  return updatedUrl;
}

// this is for single property listing
export const getMediaForWebp = (url: string, type: string) => {
  let updateUrl = updateImageExtension(url, "webp");
  if (updateUrl) {
    let preUrl: string = updateUrl?.split("/listing-images")[0];
    let postUrl: string = updateUrl?.split("/listing-images")[1];
    if (type === "large") {
      return `${preUrl}/mediaLarge/listing-images${postUrl}`;
    } else if (type === "medium") {
      return `${preUrl}/mediaMedium/listing-images${postUrl}`;
    } else {
      return "";
    }
  } else {
    return "";
  }
};

let domain = "d2hgc8fzob0byo.cloudfront.net";
// this is property listing     >-original
export const getOptimizedImageUrl = (url: any, resolution: any) => {
  // if (url?.includes(domain)) {
  //   let splitted_url = url?.split("/");
  //   let New_base_url = splitted_url?.slice(0, splitted_url?.length - 1)?.join("/");
  //   if (resolution === "165x165") {
  //     return `${New_base_url}/165x165.webp`;
  //   } else if (resolution === "416x276") {
  //     return `${New_base_url}/416x276.webp`;
  //   } else if (resolution === "640x480") {
  //     return `${New_base_url}/640x480.webp`;
  //   } else {
  //     return url;
  //     // return `${New_base_url}/original.webp`;
  //   }
  // }

  if (url?.startsWith("//")) {
    url = "https:" + url;
  }
  if (resolution && !url?.includes(".ashx")) {
    if (resolution === "165x165") {
      return `https://d2bvtii6wos6sc.cloudfront.net/w_165,h_165,c_fill/${encodeURIComponent(
        url
      )}`;
    } else if (resolution === "416x276") {
      return `https://d2bvtii6wos6sc.cloudfront.net/w_416/${encodeURIComponent(
        url
      )}`;
    } else if (resolution === "640x480") {
      return `https://d2bvtii6wos6sc.cloudfront.net/w_640/${encodeURIComponent(
        url
      )}`;
    } else if (resolution === "2048x1536") {
      return `https://d2bvtii6wos6sc.cloudfront.net/w_2048/${encodeURIComponent(
        url
      )}`;
    } else if (resolution === "240x180") {
      return `https://d2bvtii6wos6sc.cloudfront.net/w_240/${encodeURIComponent(
        url
      )}`;
    } else {
      return `https://d2bvtii6wos6sc.cloudfront.net/${encodeURIComponent(url)}`;
    }
  } else {
    return url;
  }
  // } else {
  //   return url;
  // }
};

export const isOptimizedImage = (url: any) => {
  if (url?.includes(".ashx")) {
    return true;
  } else {
    return true;
  }
};


