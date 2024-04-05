import { createSlice } from "@reduxjs/toolkit";
import {getListingDetail} from "./getListingDetail";
import {handleContact} from "./contact"
interface listingDetail{
    listDetail:{
        success:Boolean,
         data:{
            [key:string]:any,
         },
         isLoading:Boolean,
         errMsg:any
    },
    contactUs:{
      success:Boolean,
      isLoading:Boolean,
      errMsg:any
    }
}


const initialState:listingDetail = {
  listDetail: {
    success: false,
    data: {},
    isLoading: true,
    errMsg: null,
  },
  contactUs:{
    success: false,
    isLoading: false,
    errMsg: null,
  }
};
const listingDetail = createSlice({
  name: "listingDetail",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getListingDetail.pending, (state, action) => {
      state.listDetail.isLoading = true;
      state.listDetail.errMsg = null;
    }),
    builder.addCase(getListingDetail.fulfilled, (state, action) => {
      state.listDetail.success = true;
      state.listDetail.isLoading = false;
      if(action.payload){
        state.listDetail.data = action.payload;
      }
    }),
    builder.addCase(getListingDetail.rejected, (state, action) => {
      state.listDetail.success = false;
      state.listDetail.isLoading = false;
      state.listDetail.errMsg = action.payload;
    }),
    builder.addCase(handleContact.pending, (state, action) => {
      state.contactUs.isLoading = true;
      state.contactUs.errMsg = null;
    }),
    builder.addCase(handleContact.fulfilled, (state, action) => {
      state.contactUs.success = true;
      state.contactUs.isLoading = false;
    }),
    builder.addCase(handleContact.rejected, (state, action) => {
      state.contactUs.success = false;
      state.contactUs.isLoading = false;
      state.contactUs.errMsg = action.payload;
    })
}
});
export default listingDetail.reducer;
export * from "./getListingDetail";
export * from "./contact"
