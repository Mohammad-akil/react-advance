"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import propertyDetail from "./property-detail";
import listingDetail from "./listing";
import auth from "./auth";
import notification from "./notification";
import propertyList from "./property-list";
import { useDispatch } from "react-redux";
import SiteInfo from "./sites";
import AgentsInfo from "./agents";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["siteInfo"],
};
const filtersConfig = {
  key: "filters",
  storage,
  whitelist: [
    "searchParams",
    "paginationList",
    "favoriteProperties",
    "paginationCount",
    "pageNumber",
    "backLink",
    "customParams",
    "searchId",
    "overwrite",
  ],
};

const rootReducer = combineReducers({
  propertyDetail,
  auth,
  notification,
  propertyList: persistReducer(filtersConfig, propertyList),
  siteInfo: SiteInfo,
  agentsInfo: AgentsInfo,
  listingDetail,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore(
  {
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
  }
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     propertyDetail,
//     auth,
//     notification,
//     propertyList,
//     siteInfo:SiteInfo,
//     agentsInfo:AgentsInfo
//   }
// })
// create types for state and dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
