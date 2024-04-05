import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAgentsList = createAsyncThunk(
  "AgentsInfo/getAgentsList",
  async (data, thunkAPI) => {
    try {
      let pageNumber: any =
        thunkAPI.getState()?.agentsInfo?.agentList?.pageNumber;
      let pageSize: any = thunkAPI.getState()?.agentsInfo?.agentList?.pageSize;
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/agents/${
          process.env.NEXT_PUBLIC_SITE_ID
        }?source=MP&pageNumber=${pageNumber}&pageSize=${pageSize}&role=Agent,Team Leader${
          process.env.NEXT_PUBLIC_DATASET === "fmls" ? "&marketId=1" : ""
        }&sortBy=firstName&sortOrder=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
            "x-access-token": process.env.NEXT_PUBLIC_SECRET_ACCESS_TOKEN,
          },
        }
      );
      return resp.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(
          error.response.data.errorMessage || error.response.data.message
        );
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
