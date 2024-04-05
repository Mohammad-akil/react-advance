import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSchoolsData } from "./getSchoolData";
export const getPropertyDetail = createAsyncThunk(
  "propertyDetail/getPropertyDetail",
  async (data: any, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${
          process.env.NEXT_PUBLIC_SITE_ID
        }/${data?.id}?dataset=${data?.dataset || ""}&overwrite=${
          data?.dataset ? true : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data?.data?.Coordinates) {
        let obj: any = {
          lat:
            typeof resp.data?.data?.Coordinates === "string"
              ? Number(resp.data?.data?.Coordinates?.split(",")?.[0] || 0)
              : resp.data?.data?.Coordinates?.[0],
          lon:
            typeof resp.data?.data?.Coordinates === "string"
              ? Number(resp.data?.data?.Coordinates?.split(",")?.[1] || 0)
              : resp.data?.data?.Coordinates?.[1],
        };
        thunkAPI.dispatch(getSchoolsData(obj));
      }
      if (data?.handleRedirectBack && !resp.data?.data?.ListingId) {
        data.handleRedirectBack();
      }
      return resp.data;
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
