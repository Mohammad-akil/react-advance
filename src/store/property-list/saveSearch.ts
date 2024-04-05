import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const saveSearch = createAsyncThunk("propertyList/saveSearch", async (data:any, thunkAPI:any) => {
    let searchId:any=thunkAPI.getState()?.propertyList?.list?.meta?.searchId
  try {
    let url=`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/save-search/${process.env.NEXT_PUBLIC_SITE_ID}`; 
    const resp = await axios.post(url,
        {
            title:data?.title,
            emailNotification:data?.emailNotification,
            searchId:searchId
        }, 
    {

      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
    });
    if(data?.handleSuccess && resp.data){
        data?.handleSuccess()
    }
    return resp.data;
  } catch (error:any) {
    if (error.response) {
        if(data?.handleError){
            data.handleError(error.response.data.errorMessage || error.response.data.message)
        }
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
        if(data?.handleError){
            data.handleError(error.message)
        }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
