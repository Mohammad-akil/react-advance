import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { eraseCookie } from "../../utils/visitorCookies";
import { checkAuthUpdateCookie } from "../../utils/auth";
import { handleUpdateAuth } from "../auth";
import Cookies from "js-cookie";
import { saveUTMToLocalStorage } from "../../utils/utm";

export const agentContact = createAsyncThunk(
  "propertyDetail/agentContact",
  async (data: { [key: string]: any }, thunkAPI) => {
    let { schema, handleSuccess, handleError } = data;
    try {
      let utm: any = saveUTMToLocalStorage();
      let query: string = "";
      if (utm && Object.keys(utm)?.length) {
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

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}/contact-request${query}`,
        schema,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data) {
        handleSuccess();
      }
      if (resp?.data?.meta) {
        let newData = resp?.data?.data.meta;
        if (newData?.assignedAgent?.bio) {
          newData.assignedAgent.bio = "";
        }
        Cookies.set("user", JSON.stringify(newData), {
          expires: 365,
        });
        eraseCookie("visitor_count");
        checkAuthUpdateCookie();
        Cookies.remove("dismissCount");
        localStorage.setItem("token", resp?.data?.meta?.token);
        thunkAPI.dispatch(
          handleUpdateAuth({
            isAuthenticated: true,
            authDetail: resp?.data?.meta,
          })
        );
      }
      localStorage.removeItem("utm");
      return resp.data;
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
