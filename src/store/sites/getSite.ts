import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSiteDetail = createAsyncThunk("SiteInfo/getSiteDetail", async (data, thunkAPI) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/sites/${process.env.NEXT_PUBLIC_ACCOUNT_ID}/${process.env.NEXT_PUBLIC_SITE_ID}`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
         "x-access-token": process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN
      },
    });
    return resp.data;
  } catch (error:any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
