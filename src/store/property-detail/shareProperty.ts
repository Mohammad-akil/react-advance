import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const shareProperty = createAsyncThunk("propertyDetail/shareProperty", async (data:{[key:string]:any}, thunkAPI) => {
    let {schema,handleSuccess,handleError}=data;
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}/share-property`, 
    schema,
    {

      headers: {      
       Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json", 
      },
    });
    if(resp.data){
        handleSuccess()
    }
    return resp.data;
  } catch (error:any) {
    if (error.response) {
        handleError(error.response.data.errorMessage || error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
        handleError(error.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
