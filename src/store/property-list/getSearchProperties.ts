import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSearchProperties = createAsyncThunk(
  "propertyList/getSearchProperties",
  async (data: any, thunkAPI: any) => {
    try {
      const responses = await Promise.all(
        data.map(async (searchId: any) => {
          let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}?start=0&rows=10&searchId=${searchId}&sort=ModificationTimestamp desc`;
          const resp = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              "Content-Type": "application/json",
            },
          });
          return resp.data;
        })
      );
      return responses;
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
