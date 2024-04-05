import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSuggestions = createAsyncThunk(
  "propertyList/getSuggestions",
  async (data, thunkAPI: any) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/suggestions/optimized?dataset=${process.env.NEXT_PUBLIC_DATASET}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
          "x-access-token": process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN,
        },
      });
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
