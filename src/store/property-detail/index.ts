import { createSlice } from "@reduxjs/toolkit";
import { getPropertyDetail } from "./getPropertyDetail";
import { agentContact } from "./agentContact";
import { handleScheduleTour } from "./scheduleTour";
import { getAgentDetail } from "./getAgentDetail";
import { getSimilarHomes } from "./getSimilarHomes";
import { shareProperty } from "./shareProperty";
import { getSchoolsData } from "./getSchoolData";
interface propertyDetail {
  listDetail: {
    success: Boolean;
    data: {
      [key: string]: any;
    };
    isLoading: Boolean;
    errMsg: any;
  };
  search: {
    success: Boolean;
    data: {
      [key: string]: any;
    };
    isLoading: Boolean;
    errMsg: any;
  };
  suggestions: {
    success: Boolean;
    data: {
      [key: string]: any;
    };
    isLoading: Boolean;
    errMsg: any;
  };
  agentContact: {
    isLoading: Boolean;
  };
  share: {
    isLoading: Boolean;
  };
  agentDetail: any;
  similarHomes: any;
  isBackLink: Boolean;
  schoolsData: any;
}

const initialState: propertyDetail = {
  listDetail: {
    success: false,
    data: {},
    isLoading: true,
    errMsg: null,
  },
  search: {
    success: false,
    data: {},
    isLoading: false,
    errMsg: null,
  },
  suggestions: {
    success: false,
    data: {},
    isLoading: false,
    errMsg: null,
  },
  agentContact: {
    isLoading: false,
  },
  share: {
    isLoading: false,
  },
  agentDetail: {},
  similarHomes: [],
  isBackLink: false,
  schoolsData: [],
};
const propertyDetail = createSlice({
  name: "propertyDetail",
  initialState,
  reducers: {
    handleResetAgentDetail: (state, action) => {
      state.agentDetail = {};
    },
    handleUpdateBackLink: (state, action) => {
      state.isBackLink = action.payload.flag;
      state.similarHomes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPropertyDetail.pending, (state, action) => {
      if (action?.meta?.arg?.disableLoading) {
      } else {
        state.listDetail.isLoading = true;
        state.listDetail.errMsg = null;
        state.similarHomes = [];
      }
    }),
      builder.addCase(getPropertyDetail.fulfilled, (state, action) => {
        state.listDetail.success = true;
        state.listDetail.isLoading = false;
        state.agentDetail = {};
        if (action.payload?.data) {
          state.listDetail.data = action.payload?.data;
        }
      }),
      builder.addCase(getPropertyDetail.rejected, (state, action) => {
        state.listDetail.success = false;
        state.listDetail.isLoading = false;
        state.listDetail.errMsg = action.payload;
      }),
      builder.addCase(agentContact.pending, (state, action) => {
        state.agentContact.isLoading = true;
      }),
      builder.addCase(agentContact.fulfilled, (state, action) => {
        state.agentContact.isLoading = false;
      }),
      builder.addCase(agentContact.rejected, (state, action) => {
        state.agentContact.isLoading = false;
      }),
      // share property
      builder.addCase(shareProperty.pending, (state, action) => {
        state.share.isLoading = true;
      }),
      builder.addCase(shareProperty.fulfilled, (state, action) => {
        state.share.isLoading = false;
      }),
      builder.addCase(shareProperty.rejected, (state, action) => {
        state.share.isLoading = false;
      }),
      // end property share
      builder.addCase(handleScheduleTour.pending, (state, action) => {
        state.agentContact.isLoading = true;
      }),
      builder.addCase(handleScheduleTour.fulfilled, (state, action) => {
        state.agentContact.isLoading = false;
      }),
      builder.addCase(handleScheduleTour.rejected, (state, action) => {
        state.agentContact.isLoading = false;
      });
    builder.addCase(getAgentDetail.fulfilled, (state, action) => {
      if (action.payload) {
        state.agentDetail = action.payload;
      }
    }),
      builder.addCase(getSimilarHomes.fulfilled, (state, action) => {
        state.similarHomes = action.payload.data;
      }),
      builder.addCase(getSchoolsData.fulfilled, (state, action) => {
        state.schoolsData = action.payload.schools;
      });
  },
});
export const { handleResetAgentDetail, handleUpdateBackLink } =
  propertyDetail.actions;
export default propertyDetail.reducer;
export * from "./getPropertyDetail";
export * from "./getAgentDetail";
export * from "./getSimilarHomes";
