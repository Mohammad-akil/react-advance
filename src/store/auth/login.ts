import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { eraseCookie } from "../../utils/visitorCookies";
import { checkAuthUpdateCookie } from "../../utils/auth";
import { getFavoriteProperties } from "../property-list/getFavoriteProperties";
import { getPropertyDetail } from "../property-detail";
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data: { [key: string]: any }, thunkAPI) => {
    let { schema, handleSuccess, handleError } = data;
    try {
      let ListingId =
        thunkAPI.getState()?.propertyDetail.listDetail?.data?.ListingId;

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/signin/${process.env.NEXT_PUBLIC_ACCOUNT_ID}?site_id=${process.env.NEXT_PUBLIC_SITE_ID}`,
        schema,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data?.data) {
        handleSuccess();
        let newData = resp?.data?.data;
        if (newData?.assignedAgent?.bio) {
          newData.assignedAgent.bio = "";
        }
        Cookies.set("user", JSON.stringify(newData), { expires: 365 });
        eraseCookie("visitor_count");
        checkAuthUpdateCookie();
        Cookies.remove("dismissCount");
        localStorage.removeItem("props");
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
