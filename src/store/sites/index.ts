import { createSlice } from "@reduxjs/toolkit";
import {getSiteDetail} from "./getSite";
interface siteInfoTypes{
    site?:{
        [key:string]:any,
    }
}
const initialState:siteInfoTypes = {
    site: {},
};

const SiteInfo = createSlice({
  name: "SiteInfo",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getSiteDetail.fulfilled, (state, action) => {
       state.site=action.payload.data
    })
  }
});
export default SiteInfo.reducer;
export * from "./getSite"
