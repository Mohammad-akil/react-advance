import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const storeEvent = createAsyncThunk("events/storeEvent", async (data:{[key:string]:any}, thunkAPI) => {
  if(localStorage.token){
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/events/${process.env.NEXT_PUBLIC_SITE_ID}/store`, 
      data,
      {
        headers: {   
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json", 
        },
      });
      return resp.data;
    } catch (error:any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.response?.data?.errorMessage);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
});
