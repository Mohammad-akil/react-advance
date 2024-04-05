import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAgentDetail = createAsyncThunk("AgentsInfo/getAgentDetail", async (data:any, thunkAPI) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/agents/${process.env.NEXT_PUBLIC_ACCOUNT_ID}/${data?.agentId}`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
         "x-access-token": process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN
      },
    });
    return resp.data.data;
  } catch (error:any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
