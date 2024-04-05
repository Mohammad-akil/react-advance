import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSearchProperties } from "./getSearchProperties";
export const getSavedSearches = createAsyncThunk(
  "propertyList/getSavedSearches",
  async (data: any, thunkAPI: any) => {
    let pageNumber =
      thunkAPI.getState()?.propertyList?.savedSearches.pageNumber;
    let previousLink = thunkAPI.getState()?.auth?.previousLink;
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/save-search/${
        process.env.NEXT_PUBLIC_SITE_ID
      }?pageNumber=${pageNumber || 1}&pageSize=${
        data?.pageSize || 10
      }&sortOrder=${data?.sortOrder || "-1"}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      if (
        resp.data?.data?.length === 1 &&
        data?.handleRedirect &&
        previousLink === "quick-login"
      ) {
        data?.handleRedirect(resp.data?.data?.[0]?.searchId);
      }
      if (resp.data?.data?.length > 0 && previousLink !== "quick-login") {
        let Ids = resp.data?.data?.map((item: any) => {
          if (item?.totalPropertyCount > 0) {
            return item?.searchId;
          } else {
            return null;
          }
        });

        thunkAPI.dispatch(
          getSearchProperties(Ids?.filter((it: any) => it !== null))
        );
      }
      let newData = resp.data?.data?.sort(
        (a: any, b: any) =>
          Number(b.totalPropertyCount) - Number(a.totalPropertyCount)
      );
      return { ...resp.data, data: newData };
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
