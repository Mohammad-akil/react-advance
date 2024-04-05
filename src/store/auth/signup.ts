import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { eraseCookie } from "../../utils/visitorCookies";
import { getFavoriteProperties } from "../property-list/getFavoriteProperties";
import { getPropertyDetail } from "../property-detail";
export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (data: { [key: string]: any }, thunkAPI) => {
    let ListingId =
      thunkAPI.getState()?.propertyDetail.listDetail?.data?.ListingId;
    if (ListingId && window.location.pathname?.includes("/property/")) {
      thunkAPI.dispatch(getPropertyDetail({ id: ListingId }));
    }

    let { schema, handleSuccessSignUp, handleError, utm } = data;
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
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/signup/${process.env.NEXT_PUBLIC_SITE_ID}${query}`,
        schema,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data?.data) {
        handleSuccessSignUp();
        Cookies.set("user", JSON.stringify(resp?.data?.data), { expires: 365 });
        eraseCookie("visitor_count");
        Cookies.remove("dismissCount");
      }
      if (resp?.data?.data?.token) {
        localStorage.setItem("token", resp?.data?.data?.token);
        thunkAPI.dispatch(getFavoriteProperties({}));
      }

      if (ListingId && window.location.pathname?.includes("/property/")) {
        thunkAPI.dispatch(
          getPropertyDetail({ id: ListingId, disableLoading: true })
        );
      }

      return resp.data.data;
    } catch (error: any) {
      if (error.response) {
        handleError(
          error.response.data.errorMessage || error.response.data.message
        );
        return thunkAPI.rejectWithValue(
          error.response.data.errorMessage || error.response.data.message
        );
      } else {
        handleError(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
