import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {getPropertyList} from "./getPropertyList"
export const updateSavedSearch = createAsyncThunk(
  "propertyList/updateSavedSearch",
  async (data: any, thunkAPI: any) => {
    try {
      let searchParams = { ...thunkAPI.getState()?.propertyList?.searchParams };
      let query: string = "";
      Object.keys(searchParams).forEach((k) => {
        if (!searchParams[k] && searchParams[k] !== 0) {
          delete searchParams[k];
        } else {
          if (query && k !== "sort" && k !== "start" && k !== "rows") {
            query =
              query +
              ` AND ${k}:${
                k === "City" &&
                !searchParams[k]?.includes("OR") &&
                searchParams[k]?.includes(" ")
                  ? `"${searchParams[k]}"`
                  : searchParams[k]
              }`;
          } else if (k !== "sort" && k !== "start" && k !== "rows") {
            query = `${k}:${searchParams[k]}`;
          }
        }
      });
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}/${data?.searchId}`;
      const resp = await axios.put(
        url,
        {
          q: query,
          sort: searchParams?.sort,
          start: searchParams?.start,
          rows: searchParams?.rows,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp?.data && data?.handleSuccess) {
        data?.handleSuccess();
      }
      if(data?.isGetProps){
        setTimeout(()=>{
          thunkAPI.dispatch(getPropertyList({}))
          },200)
      }
      return resp.data;
    } catch (error: any) {
      if (error.response) {
        if (data?.handleError) {
          data?.handleError(
            error.response.data.errorMessage || error.response.data.message
          );
        }
        return thunkAPI.rejectWithValue(
          error.response.data.errorMessage || error.response.data.message
        );
      } else {
        if (data?.handleError) {
          data?.handleError(error.message);
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
