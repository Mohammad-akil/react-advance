import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAgentPropertyList = createAsyncThunk(
  "AgentsInfo/getAgentPropertyList",
  async (data: any, thunkAPI: any) => {
    try {
      let query: string = `q=(ListAgentMlsId:${
        data?.agentMlsId
      } OR CoListAgentMlsId:${data?.agentMlsId} OR BuyerAgentMlsId:${
        data?.agentMlsId
      } OR CoBuyerAgentMlsId:${
        data?.agentMlsId
      }) AND MlsStatus:(Active OR 'Active Under Contract' OR 'Coming Soon' OR Pending OR Closed)&rows=${
        data?.rows || 20
      }&start=${data?.start || 0}&sort=ModificationTimestamp desc`;
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties${
        data?.allowPrefix ? "/ns" : ""
      }/${process.env.NEXT_PUBLIC_SITE_ID}?${query}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
      return { ...resp.data, reset: data?.reset };
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
