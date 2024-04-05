import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userFacebookLogin = createAsyncThunk(
  "auth/userFacebookLogin",
  async (data: { [key: string]: any }, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/facebook-signin/${process.env.NEXT_PUBLIC_SITE_ID}?redirect_uri=${window.location.href?.split("?")[0]}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.data) {
        window.location.href= resp.data.data;
      } else {
        // Handle other types of responses or further processing
        console.log('Received response:', resp.data);
      }

      return resp.data.data;
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
