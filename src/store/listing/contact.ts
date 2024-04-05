import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const handleContact = createAsyncThunk("listingDetail/handleContact", async (data:any, thunkAPI) => {
  try {
    const resp = await axios.post(`${process.env.NODE_ENV === "production"?"https://api.ourmethod.com/":"https://testv2api.ourmethod.com/"}api/common/contact-us-email`, 
    {...data.schema},
    {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json", 
        "contact_email_key":"apqdbyk1D5pJfR2TfLBMjkl3a7ZV8wud9Lm2Gc9nYqSXYZHjabUzU"
      },
    });
    if(resp.data){
        data?.handleSuccess()
    }
    return resp.data;
  } catch (error:any) {
    if (error.response) {
       data?.handleError(error.response.data.errorMessage || error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
        data?.handleError(error.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
