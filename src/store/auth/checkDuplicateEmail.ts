import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const checkDuplicateEmail = createAsyncThunk("auth/checkDuplicateEmail", async (data:{[key:string]:any}, thunkAPI) => {
    let {schema,handleSuccess,handleError}=data;
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/validate-email/${process.env.NEXT_PUBLIC_SITE_ID}`, 
    schema,
    {
      headers: {   
        "Content-Type": "application/json", 
      },
    });
    if(resp.data){
        handleSuccess()
    }
    return resp.data;
  } catch (error:any) {
    if (error.response) {
        handleError(error.response?.data?.message || error.response?.data?.errorMessage)
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.response?.data?.errorMessage);
    } else {
        handleError(error.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
