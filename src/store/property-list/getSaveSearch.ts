import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getPropertyList } from "./getPropertyList";
export const getSavedSearch = createAsyncThunk(
  "propertyList/getSavedSearch",
  async (data: any, thunkAPI: any) => {
    try {
      if (data?.isGetProps) {
        thunkAPI.dispatch(
          getPropertyList({ searchId: data?.searchId, editSource: "website" })
        );
      }
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/save-search/${process.env.NEXT_PUBLIC_SITE_ID}/${data?.searchId}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });

      return resp.data.data;
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
