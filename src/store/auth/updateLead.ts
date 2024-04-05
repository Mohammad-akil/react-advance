import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const updateLead = createAsyncThunk(
  "auth/updateLead",
  async (data: { [key: string]: any }, thunkAPI) => {
    try {
      let utm: any = data?.utmValues;
      let query: string = "";
      if (utm) {
        Object.keys(utm).forEach((k) => {
          if (utm[k]) {
            if (query) {
              query = `${query}&${k}=${(k = utm[k])}`;
            } else {
              query = `?${k}=${utm[k]}`;
            }
          }
        });
      }

      const resp = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/${process.env.NEXT_PUBLIC_SITE_ID}/${data?.leadId}${query}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${data?.token || localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return resp.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.response?.data?.errorMessage
        );
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
