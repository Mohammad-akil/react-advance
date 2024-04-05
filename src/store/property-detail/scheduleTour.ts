import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { eraseCookie } from "../../utils/visitorCookies";
import { checkAuthUpdateCookie } from "../../utils/auth";
import {handleUpdateAuth} from "../auth"
export const handleScheduleTour = createAsyncThunk("propertyDetail/handleScheduleTour", async (data:{[key:string]:any}, thunkAPI) => {
    let {schema,handleSuccess,handleError}=data;
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}api/v1/properties/${process.env.NEXT_PUBLIC_SITE_ID}/tour-request`, 
    schema,
    {

      headers: {      
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json", 
      },
    });
    if(resp.data){
        handleSuccess()
    }
    if(resp?.data?.data?.lead?._id){
      Cookies.set("user", JSON.stringify(resp?.data?.data?.lead), { expires: 365 });
      eraseCookie("visitor_count");
      checkAuthUpdateCookie();
      Cookies.remove("dismissCount");
      localStorage.setItem("token", resp?.data?.data?.lead?.token);
      thunkAPI.dispatch(handleUpdateAuth({isAuthenticated:true,
        authDetail:resp?.data?.data?.lead}))
    }
    return resp.data;
  } catch (error:any) {
    if (error.response) {
        handleError(error.response.data.errorMessage || error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.errorMessage || error.response.data.message);
    } else {
        handleError(error.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
