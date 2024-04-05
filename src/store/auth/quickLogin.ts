import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { eraseCookie } from "../../utils/visitorCookies";
import { checkAuthUpdateCookie } from "../../utils/auth";
import { saveUTMToLocalStorage } from "../../utils/utm";
import { getFavoriteProperties } from "../property-list/getFavoriteProperties";
import { storeEvent } from "../events/storeEvent";
import { updateLead } from "./updateLead";
import { getPropertyDetail } from "../property-detail";
export const quickLogin = createAsyncThunk(
  "auth/quickLogin",
  async (data: { [key: string]: any }, thunkAPI) => {
    let { token, handleSuccess, handleError } = data;
    try {
      let ListingId =
        thunkAPI.getState()?.propertyDetail.listDetail?.data?.ListingId;
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/leads/quick-login/${process.env.NEXT_PUBLIC_SITE_ID}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp?.data?.data) {
        let newData = resp?.data?.data;
        if (newData?.assignedAgent?.bio) {
          newData.assignedAgent.bio = "";
        }
        Cookies.set("user", JSON.stringify(newData), { expires: 365 });
        localStorage.setItem("token", token);
        eraseCookie("visitor_count");
        Cookies.remove("dismissCount");
        localStorage.removeItem("props");
        const currentTime = new Date();
        Cookies.set("lastVisitTime", currentTime.toString());
        checkAuthUpdateCookie();
        thunkAPI.dispatch(storeEvent({ type: "Visited Website" }));
        thunkAPI.dispatch(getFavoriteProperties({}));
        if (handleSuccess) {
          handleSuccess();
        }
      }

      if (
        data?.isUpdate &&
        resp.data.data?._id &&
        Object.keys(saveUTMToLocalStorage())?.length
      ) {
        thunkAPI.dispatch(
          updateLead({
            leadId: resp.data.data?._id,
            utmValues: saveUTMToLocalStorage(),
            token,
          })
        );
        localStorage.removeItem("utm");
      }
      if (ListingId && window.location.pathname?.includes("/property/")) {
        thunkAPI.dispatch(
          getPropertyDetail({ id: ListingId, disableLoading: true })
        );
      }
      return resp.data.data;
    } catch (error: any) {
      if (error.response) {
        if (handleError) {
          handleError(
            error.response.data.errorMessage || error.response.data.message
          );
        }
        return thunkAPI.rejectWithValue(
          error.response.data.errorMessage || error.response.data.message
        );
      } else {
        if (handleError) {
          handleError(error.message);
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
