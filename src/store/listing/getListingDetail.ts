import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getListingDetail = createAsyncThunk("listingDetail/getListingDetail", async (data:{id?:string,siteId?:any}, thunkAPI) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/listings/${data?.siteId?data?.siteId:process.env.NEXT_PUBLIC_SITE_ID}/${data?.id}`, 
    {

      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json", 
      },
    });
    return resp.data?.data;
  } catch (error:any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
