import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const emailUnsubscribe = createAsyncThunk("auth/emailUnsubscribe", async (data:{[key:string]:any}, thunkAPI) => {

  try {
    const resp = await axios.put(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/email-unsubscribe/${process.env.NEXT_PUBLIC_SITE_ID}?token=${data?.id}`,{},
    {
      headers: {   
        "Content-Type": "application/json", 
        Authorization: `Bearer ${localStorage.token}`,
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
