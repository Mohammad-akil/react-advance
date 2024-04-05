import { createSlice } from "@reduxjs/toolkit";
import { checkDuplicateEmail } from "./checkDuplicateEmail";
import { userSignUp } from "./signup";
import { userLogin } from "./login";
import { quickLogin } from "./quickLogin";
import { UnsubscribedAccount } from "./unSubscribeAccount";
import { emailUnsubscribe } from "./emailUnsubscribe";
interface auth {
  modal: {
    open?: any;
    previewType: string;
    isOpenedManually?: Boolean;
  };
  duplicateEmailChecking: {
    isLoading?: Boolean;
  };
  isAuthenticated: Boolean;
  authDetail: {
    [key: string]: any;
  };
  signup: {
    [key: string]: any;
  };
  login: {
    [key: string]: any;
  };
  previousLink: any;
  ubSubscribe: {
    isLoading: Boolean;
    success: Boolean;
    errMsg: any;
  };
  emailUbSubscribe: {
    isLoading: Boolean;
    success: Boolean;
    errMsg: any;
  };
}
const initialState: auth = {
  modal: {
    open: false,
    previewType: "register",
    isOpenedManually: false,
  },
  isAuthenticated: false,
  authDetail: {},
  signup: {
    isLoading: false,
    success: false,
    errMsg: null,
  },
  login: {
    isLoading: false,
    success: false,
    errMsg: null,
  },
  duplicateEmailChecking: {
    isLoading: false,
  },
  ubSubscribe: {
    isLoading: true,
    success: false,
    errMsg: null,
  },
  previousLink: null,
  emailUbSubscribe: {
    isLoading: true,
    success: false,
    errMsg: null,
  },
};
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleUpdateAuthPreview: (state, action) => {
      if (typeof action.payload.open === "boolean") {
        state.modal.open = action.payload.open;
      }
      if (action.payload.previewType) {
        state.modal.previewType = action.payload.previewType;
      }
      if (action.payload.isOpenedManually) {
        state.modal.isOpenedManually = action.payload.isOpenedManually;
      } else {
        state.modal.isOpenedManually = false;
      }
    },
    handleUpdateAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.authDetail = action.payload.authDetail;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkDuplicateEmail.pending, (state, action) => {
      state.duplicateEmailChecking.isLoading = true;
    }),
      builder.addCase(checkDuplicateEmail.fulfilled, (state, action) => {
        state.duplicateEmailChecking.isLoading = false;
      }),
      builder.addCase(checkDuplicateEmail.rejected, (state, action) => {
        state.duplicateEmailChecking.isLoading = false;
      }),
      builder.addCase(userSignUp.pending, (state, action) => {
        state.signup.isLoading = true;
      }),
      builder.addCase(userSignUp.fulfilled, (state, action) => {
        state.signup.isLoading = false;
        state.signup.success = true;
        state.authDetail = action.payload;
        state.isAuthenticated = true;
      }),
      builder.addCase(userSignUp.rejected, (state, action) => {
        state.signup.isLoading = false;
        state.signup.errMsg = action.payload;
      });
    builder.addCase(userLogin.pending, (state, action) => {
      state.login.isLoading = true;
    }),
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.success = true;
        state.authDetail = action.payload;
        state.isAuthenticated = true;
      }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.errMsg = action.payload;
      }),
      // quick login handling here
      builder.addCase(quickLogin.fulfilled, (state, action) => {
        state.authDetail = action.payload;
        state.isAuthenticated = true;
        state.previousLink=" "
      }),
      builder.addCase(UnsubscribedAccount.pending, (state, action) => {
        state.ubSubscribe.isLoading = true;
      }),
      builder.addCase(UnsubscribedAccount.fulfilled, (state, action) => {
        state.ubSubscribe.isLoading = false;
        state.ubSubscribe.success = true;
        state.ubSubscribe.errMsg = null;
      }),
      builder.addCase(UnsubscribedAccount.rejected, (state, action) => {
        state.ubSubscribe.isLoading = false;
        state.ubSubscribe.success = false;
        state.ubSubscribe.errMsg = action.payload;
      });
    builder.addCase(emailUnsubscribe.pending, (state, action) => {
      state.emailUbSubscribe.isLoading = true;
    }),
      builder.addCase(emailUnsubscribe.fulfilled, (state, action) => {
        state.emailUbSubscribe.isLoading = false;
        state.emailUbSubscribe.success = true;
        state.emailUbSubscribe.errMsg = null;
      }),
      builder.addCase(emailUnsubscribe.rejected, (state, action) => {
        state.emailUbSubscribe.isLoading = false;
        state.emailUbSubscribe.success = false;
        state.emailUbSubscribe.errMsg = action.payload;
      });
  },
});
export const { handleUpdateAuthPreview, handleUpdateAuth } = auth.actions;
export default auth.reducer;
export * from "./checkDuplicateEmail";
export * from "./signup";
export * from "./login";
export * from "./quickLogin";
export * from "./unSubscribeAccount";
export * from "./gmailSignIn";
export * from "./faceboolSignIn";
export * from "./emailUnsubscribe";
