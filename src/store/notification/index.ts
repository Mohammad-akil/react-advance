import { createSlice } from "@reduxjs/toolkit";
interface notificationProps{
    alert:{
      message?:any,
       type?:any,
       open?:any
    }
  }

const initialState:notificationProps = {
    alert: {
        open: false,
        type: "",
        message:""
  },

};
const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openAlert: (state, action) => { 
       state.alert.open=action.payload?.open;
       state.alert.type=action.payload?.type;
       state.alert.message=action.payload?.message;
    },
  }
});
export const {openAlert}=notification.actions;
export default notification.reducer;