import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSearchResultParams = createAsyncThunk(
  "propertyList/getSearchResultParams",
  async (data: any, thunkAPI: any) => {
    let pageNumber =
      thunkAPI.getState()?.propertyList?.searchResults.pageNumber;
    try {
      let url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/save-search/results/${process.env.NEXT_PUBLIC_SITE_ID}/${data?.paramPath}?pageNumber=${pageNumber}&pageSize=20`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      });
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
