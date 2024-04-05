import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSchoolsData = createAsyncThunk("propertyDetail/getSchoolsData", async (data:any, thunkAPI:any) => {
  try {
    let url=`https://gs-api.greatschools.org/nearby-schools?lat=${data?.lat}&lon=${data?.lon}&limit=40&school_type=public&distance=50`; 
    const resp = await axios.get(url, 
    {

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_SCHOOL_RANKING_DATA_API_KEY || "JYzfq0933gyad5dc52mt4tQV5T47fb65tv7GTQc3"
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
