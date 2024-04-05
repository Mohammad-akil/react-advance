import { createSlice } from "@reduxjs/toolkit";
import {getAgentsList} from "./getAgents";
import {getAgentPropertyList} from "./getAgentProperties";
import {getAgentDetail} from "./getAgentDetail";
interface siteInfoTypes{
  agentList:{
    data?:any,
    meta?:{
      [key:string]:any,
  },
  isLoading:Boolean,
  errMsg:any,
  pageNumber:any,
  pageSize:any
  }
  agentListings:{
    isLoading:Boolean,
    errMsg:any,
    data:any,
    meta:any
  },
  agentDetail:{
    isLoading:Boolean,
    errMsg:any,
    data:any,
  }
}
const initialState:siteInfoTypes = {
  agentList:{
    data: [],
    meta:{},
    isLoading:true,
    errMsg:null,
    pageNumber:1,
    pageSize:20
  },
  agentListings:{
    isLoading:true,
    errMsg:null,
    data:[],
    meta:{},
  },
  agentDetail:{isLoading:false,
    errMsg:null,
    data:[]
  }
};
const AgentsInfo = createSlice({
  name: "AgentsInfo",
  initialState,
  reducers:{
    handleUpdatePageNumber:(state, action) => { 
      state.agentList.pageNumber=state.agentList.pageNumber+1;
  }
},
  extraReducers: (builder) => {
    builder.addCase(getAgentsList.pending, (state, action) => {
      state.agentList.isLoading = true;
      state.agentList.errMsg = null;
    }),
    builder.addCase(getAgentsList.fulfilled, (state, action) => {
      state.agentList.meta=action.payload.meta;
      state.agentList.isLoading = false;
      if(state.agentList.pageNumber>1){
        state.agentList.data=[...state.agentList.data,...action.payload.data]?.filter((item:any,index:any,self:any)=>self.findIndex((it:any)=>it.agentId===item.agentId)==index);
      }else{
        state.agentList.data=action.payload.data;
      }
      state.agentListings.data=[]
     }),
    builder.addCase(getAgentsList.rejected, (state, action) => {
      state.agentList.isLoading = false;
      state.agentList.errMsg = action.payload;
    }),
    builder.addCase(getAgentPropertyList.pending, (state, action) => {
      state.agentListings.isLoading = true;
      state.agentListings.errMsg = null;
    }),
    builder.addCase(getAgentPropertyList.fulfilled, (state, action) => {
      state.agentListings.meta=action.payload.meta;
      state.agentListings.isLoading = false;
      if(action.payload.reset){
        state.agentListings.data=action.payload.data;
      }else{
        state.agentListings.data=[...state.agentListings.data,...action.payload.data];
      }
    }),
    builder.addCase(getAgentPropertyList.rejected, (state, action) => {
      state.agentListings.isLoading = false;
      state.agentListings.errMsg = action.payload;
    })
    // get agent detail
    builder.addCase(getAgentDetail.pending, (state, action) => {
      state.agentDetail.isLoading = true;
      state.agentDetail.errMsg = null;
      state.agentListings.data=[]
    }),
    builder.addCase(getAgentDetail.fulfilled, (state, action) => {
      state.agentDetail.isLoading = false;
      state.agentDetail.errMsg = null;
      state.agentDetail.data = action.payload;
    }),
    builder.addCase(getAgentDetail.rejected, (state, action) => {
      state.agentDetail.isLoading = false;
      state.agentDetail.errMsg = action.payload;
    })
  }
});
export const {handleUpdatePageNumber}=AgentsInfo.actions;
export default AgentsInfo.reducer;
export * from "./getAgents"
export * from "./getAgentProperties";
export * from "./getAgentDetail"