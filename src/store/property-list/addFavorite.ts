import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addFavorite = createAsyncThunk("propertyList/addFavorite", async (data:any, thunkAPI:any) => {
  try {
    let url=`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/favorite-property/${process.env.NEXT_PUBLIC_SITE_ID}`; 
    const resp = await axios.post(url, {
        listingId:data?.listingId
    },
    {

      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
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
