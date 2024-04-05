import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { searchKeys } from "../../utils/propertyData";
const sortQuery = (q: string) => {
  let newQArray = q
    ?.replaceAll("undefined:undefined", "")
    ?.replace("q=", "")
    ?.split(" AND ");
  let orArray: any = [];
  let andArray: any = [];

  newQArray?.forEach((it, i) => {
    if (searchKeys?.includes(it?.split(":")?.[0])) {
      orArray.push(it);
    } else {
      andArray.push(it);
    }
  });

  if (orArray?.length || andArray?.length) {
    return `q=${andArray?.join(" AND ")} ${
      orArray?.length ? ` AND (${orArray?.join(" OR ")})` : ""
    }`;
  } else {
    return "";
  }
};

export const getPropertyList = createAsyncThunk(
  "propertyList/getPropertyList",
  async (data: any, thunkAPI: any) => {
    try {
      let searchParams = { ...thunkAPI.getState()?.propertyList?.searchParams };
      if (data.customParams) {
        delete searchParams.ListPrice;
        delete searchParams.PropertySubType;
        searchParams = {
          ...data.customParams,
          PropertyType: "Residential",
          sort: "ModificationTimestamp desc",
          start: searchParams?.start,
          rows: searchParams?.rows,
        };
      }
      let query: string = "";
      let query1: string = "";
      if (data?.coordinates) {
        Object.keys(searchParams).forEach((k) => {
          if (!searchParams[k] && searchParams[k] !== 0) {
            delete searchParams[k];
          } else {
            if (query && k !== "sort" && k !== "start" && k !== "rows") {
              query = query + ` AND ${k}:${searchParams[k]}`;
            } else if (k !== "sort" && k !== "start" && k !== "rows") {
              query = `q=${k}:${searchParams[k]}`;
            }
          }
        });

        if (!data?.overwrite) {
          query1 = `&fq={!geofilt}&sfield=Coordinates&pt=${
            data?.coordinates?.lat
          },${data?.coordinates?.lng}&d=20&rows=${
            data?.rows ? data?.rows : "150"
          }`;
        } else {
          query1 = `&&rows=${
            data?.rows ? data?.rows : "150"
          }&start=0&sort=ModificationTimestamp desc`;
        }
      } else if (data?.status) {
        query = `q=MlsStatus:${data?.status} AND PropertyType:Residential AND ListPrice:[300000 TO *]&rows=${data?.rows}&start=${searchParams?.start}&sort=ModificationTimestamp desc`;
      } else {
        Object.keys(searchParams).forEach((k) => {
          if (
            (!searchParams[k] && searchParams[k] !== 0) ||
            k === undefined ||
            k === null ||
            k === ""
          ) {
            delete searchParams[k];
          } else {
            if (
              query &&
              k !== "sort" &&
              k !== "start" &&
              k !== "rows" &&
              searchParams[k]
            ) {
              query = query + ` AND ${k}:${searchParams[k]}`;
            } else if (
              k !== "sort" &&
              k !== "start" &&
              k !== "rows" &&
              searchParams[k]
            ) {
              query = `q=${k}:${searchParams[k]}`;
            }
            if (k === "sort" || k === "start" || k === "rows") {
              if (k === "rows" && data?.rows) {
                query1 = query1 + `&${k}=${data?.rows}`;
              } else {
                query1 = query1 + `&${k}=${searchParams[k]}`;
              }
            }
          }
        });
      }
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties${
        data?.allowPrefix || data.customParams ? "/ns" : ""
      }/${process.env.NEXT_PUBLIC_SITE_ID}?${
        data?.overwrite
          ? sortQuery(query)
          : data?.searchId
          ? ""
          : sortQuery(query)
      }${query1}${data?.searchId ? `&searchId=${data?.searchId}` : ""}${
        data?.editSource ? `&editSource=${data?.editSource}` : ""
      }${data?.fq ? data?.fq : ""}${
        data?.overwrite && data?.searchId ? `&overwrite=true` : ``
      }`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          
        },
      });
      return {
        ...resp.data,
        isConcat: data?.newPolygon
          ? true
          : data?.reset
          ? false
          : data?.fq
          ? false
          : data?.coordinates?.lat && !data?.overwrite
          ? true
          : false,
        customParams: data?.customParams,
        searchId: data?.searchId,
        overwrite: data?.overwrite,
      };
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.errorMessage || error.response.data.message
        );
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
