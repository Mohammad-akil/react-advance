import { createSlice } from "@reduxjs/toolkit";
import { getPropertyList } from "./getPropertyList";
import { getSuggestions } from "./getSuggestions";
import { route } from "../../views/property-search/results/propertyTileCard";
import { getSavedSearches } from "./getSavedSearches";
import { getSearchResultParams } from "./getSearchResultsParams";
import { getSavedSearch } from "./getSaveSearch";
import { getSearchProperties } from "./getSearchProperties";
import { getFavoriteProperties } from "./getFavoriteProperties";
import { addFavorite } from "./addFavorite";
import { removeFavorite } from "./removeFavorite";
import { updateSavedSearch } from "./updateSaveSearch";
import { getOptimizedImageUrl } from "../../utils/common";
import {
  handleReturnPrimaryImage,
  queryParsing,
} from "../../utils/propertyData";
function removeDuplicates(arr: any) {
  const uniqueObjects: any = {};
  const uniqueArray: any = [];
  for (const obj of arr) {
    // Convert each object to a JSON string to check for uniqueness
    const objString: any = JSON.stringify(obj);
    // Check if the JSON string is already in the uniqueObjects dictionary
    if (!uniqueObjects[objString]) {
      uniqueObjects[objString] = true; // Mark as seen
      uniqueArray.push(obj); // Add to the unique array
    }
  }
  return uniqueArray;
}

interface propertyDetail {
  list: {
    success: Boolean;
    data: any;
    meta: { [key: string]: any };
    isLoading: Boolean;
    errMsg: any;
  };
  searchParams: {
    [key: string]: any;
  };
  customParams: {
    [key: string]: any;
  };
  center: {
    lat: number;
    lng: number;
  };
  pageNumber: number;
  suggestions: {
    [key: string]: any;
  };
  backLink: string;
  currentScroll: number;
  paginationList: any;
  paginationCount: number;
  searchId: any;
  overwrite: Boolean;
  savedSearches: {
    success: Boolean;
    data: any;
    meta: { [key: string]: any };
    isLoading: Boolean;
    errMsg: any;
    pageNumber: number;
  };
  savedSearchesProperties: {
    success: Boolean;
    data: any;
    isLoading: Boolean;
    errMsg: any;
  };
  favoriteProperties: {
    success: Boolean;
    data: any;
    isLoading: Boolean;
    errMsg: any;
    meta: any;
  };
  addFavorite: {
    isLoading: Boolean;
    errMsg: any;
    success: Boolean;
  };
  removeFavorite: {
    isLoading: Boolean;
    errMsg: any;
    success: Boolean;
  };
  updateSaveSearch: {
    isLoading: Boolean;
    errMsg: any;
    success: Boolean;
  };
  searchResults: {
    isLoading: Boolean;
    errMsg: any;
    success: Boolean;
    data: any;
    pageNumber: number;
    meta: any;
  };
  searchDetail: any;
}

const initialState: propertyDetail = {
  list: {
    success: false,
    data: [],
    meta: {},
    isLoading: false,
    errMsg: null,
  },
  suggestions: {},
  pageNumber: 1,
  currentScroll: 0,
  customParams: {},
  searchParams: {
    // ListPrice: "[100000 TO 900000]",
    ListPrice: "",
    select: "",
    BedroomsTotal: "",
    BathroomsTotalDecimal: "",
    BuildingAreaTotal: "",
    LotSizeAcres: "",
    YearBuilt: "",
    PropertyType: "Residential",
    PropertySubType: `("single family residence" OR condominium OR townhouse)`,
    MlsStatus: `(Active OR "Active Under Contract" OR "Coming Soon")`,
    City: ``,
    sort: "ModificationTimestamp desc",
    start: 0,
    rows: 20,
  },
  center: {
    lat: 33.283316,
    lng: -84.699896,
  },
  searchId: "",
  overwrite: false,
  backLink: "/property-search/results",
  paginationList: [],
  paginationCount: 0,
  savedSearches: {
    success: false,
    data: [],
    meta: {},
    isLoading: true,
    errMsg: null,
    pageNumber: 1,
  },
  savedSearchesProperties: {
    success: false,
    data: [],
    isLoading: true,
    errMsg: null,
  },
  favoriteProperties: {
    success: false,
    data: [],
    isLoading: true,
    errMsg: null,
    meta: { count: 0 },
  },
  addFavorite: {
    success: false,
    isLoading: false,
    errMsg: null,
  },
  updateSaveSearch: {
    isLoading: false,
    errMsg: null,
    success: false,
  },
  removeFavorite: {
    success: false,
    isLoading: false,
    errMsg: null,
  },
  searchResults: {
    success: false,
    isLoading: true,
    errMsg: null,
    data: [],
    pageNumber: 1,
    meta: { numFound: 10 },
  },
  searchDetail: { isLoading: false },
};

const propertyList = createSlice({
  name: "propertyList",
  initialState,
  reducers: {
    handleUpdateParams: (state, action) => {
      if (action.payload?.isReset) {
        state.searchParams = {
          ...initialState.searchParams,
          PropertySubType: "",
          [action.payload.field]: action.payload.value,
        };
      } else {
        state.searchParams[action.payload.field] = action.payload.value;
        if (action.payload.field !== "start") {
          state.searchParams.start = 0;
        }
      }

      if (action.payload?.pageNumber) {
        state.pageNumber = action.payload.pageNumber;
      } else {
        state.pageNumber = 1;
      }
      if (action.payload?.overwrite) {
        state.overwrite = action.payload?.overwrite;
      }
    },
    handleAddOrRemoveKeyFromSearch: (state, action) => {
      let newSearchParams = { ...state.searchParams };
      if (action.payload?.isReset) {
        newSearchParams = { ...initialState.searchParams, PropertySubType: "" };
      }
      delete newSearchParams[action.payload.fieldToRemove];
      state.searchParams = {
        [action.payload.fieldToAdd]: action.payload.fieldToAddValue
          ? action.payload.fieldToAddValue
          : "",
        start: 0,
        ...newSearchParams,
      };
      state.pageNumber = 1;
    },
    handleResetSearchValue: (state, action) => {
      state.searchParams = initialState.searchParams;
      state.pageNumber = 1;
      if (action.payload.resetSearchDetail) {
        state.searchDetail = { isLoading: false };
      }
    },
    handleUpdateSearchId: (state, action) => {
      state.searchId = action.payload.searchId;
    },
    handleUpdateSaveSearchPage: (state, action) => {
      state.savedSearches.pageNumber = state.savedSearches.pageNumber + 1;
    },
    handleResetFavorite: (state, action) => {
      state.favoriteProperties.data = [];
    },
    handleUpdateSearchPageNumber: (state, action) => {
      state.searchResults.pageNumber = action.payload.pageNumber;
    },
    handleUpdatePageNumber: (state, action) => {
      if (action.payload.isRemoveSubProps) {
        state.searchParams = {
          ...initialState.searchParams,
          PropertySubType: "",
        };
      }
      state.pageNumber = 1;
      state.searchParams.start = 0;
    },
    handleUpdateBackLink: (state, action) => {
      if (action.payload.path) {
        state.backLink = action.payload.path;
      }
      if (action.payload.currentScroll) {
        state.currentScroll = action.payload.currentScroll;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPropertyList.pending, (state, action) => {
      if (action?.meta?.arg?.loading === true) {
        state.list.isLoading = true;
        state.list.errMsg = null;
      } else if (action?.meta?.arg?.loading === false) {
        state.list.isLoading = false;
        state.list.errMsg = null;
      } else {
        state.list.isLoading = true;
        state.list.errMsg = null;
      }
      if (action?.meta?.arg?.reset && !action?.meta?.arg?.newPolygon) {
        state.list.data = [];
      }
    }),
      builder.addCase(getPropertyList.fulfilled, (state, action) => {
        state.list.success = true;
        state.list.isLoading = false;
        state.paginationCount = action.payload?.meta?.numFound;
        if (action.payload.customParams) {
          state.customParams = action.payload.customParams;
        } else {
          state.customParams = {};
        }
        if (action.payload?.overwrite) {
          state.overwrite = true;
        } else {
          state.overwrite = false;
        }
        if (action.payload.searchId) {
          state.searchId = action.payload.searchId;
        } else if (action.payload?.meta?.searchId) {
          state.searchId = action.payload?.meta?.searchId;
        } else {
          state.searchId = "";
        }
        if (action.payload?.data?.length) {
          state.center = {
            lat:
              typeof action.payload?.data[0]?.Coordinates === "string"
                ? Number(
                    action.payload?.data[0]?.Coordinates?.split(",")?.[0] || 0
                  )
                : action.payload?.data[0]?.Coordinates?.[0],
            lng:
              typeof action.payload?.data[0]?.Coordinates === "string"
                ? Number(
                    action.payload?.data[0]?.Coordinates?.split(",")?.[1] || 0
                  )
                : action.payload?.data[0]?.Coordinates?.[1],
          };
        }

        if (action.payload.isConcat) {
          state.list.data = removeDuplicates([
            ...state.list.data,
            ...action.payload?.data,
          ]);
          state.list.meta = action.payload?.meta;
          state.list.meta.searchId = action.payload?.meta?.searchId;
          let newList: any = [];
          removeDuplicates([...state.list.data, ...action.payload?.data])?.map(
            (item: any) => {
              let obj: any = {
                ListingId: item.ListingId,
                route: route(item),
                image: getOptimizedImageUrl(
                  handleReturnPrimaryImage(item?.MediaURL, item?.Media),
                  "2048x1536"
                ),
              };
              newList.push(obj);
            }
          );
          state.paginationList = newList;
        } else {
          if (action.payload?.data) {
            state.list.data = action.payload?.data;
            state.list.meta = action.payload?.meta;
            state.list.meta.searchId = action.payload?.meta?.searchId;

            let newList: any = [];
            if (state.pageNumber > 1) {
              action.payload?.data?.map((item: any) => {
                let obj: any = {
                  ListingId: item.ListingId,
                  route: route(item),
                  image: getOptimizedImageUrl(
                    handleReturnPrimaryImage(item?.MediaURL, item?.Media),
                    "2048x1536"
                  ),
                };
                newList.push(obj);
              });
              state.paginationList = [
                ...state.paginationList?.slice(0, (state.pageNumber - 1) * 20),
                ...newList,
              ].filter(
                (it, index, self) =>
                  self.findIndex((item) => item.ListingId === it.ListingId) ==
                  index
              );
            } else {
              action.payload?.data?.map((item: any) => {
                let obj: any = {
                  ListingId: item.ListingId,
                  route: route(item),
                  image: getOptimizedImageUrl(
                    handleReturnPrimaryImage(item?.MediaURL, item?.Media),
                    "2048x1536"
                  ),
                };
                newList.push(obj);
              });
              state.paginationList = newList;
            }
          } else {
            state.list.data = [];
            state.list.meta = action.payload?.meta;
          }
        }
      }),
      builder.addCase(getPropertyList.rejected, (state, action) => {
        state.list.success = false;
        state.list.isLoading = false;
        state.list.errMsg = action.payload;
      }),
      builder.addCase(getSuggestions.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.suggestions = action.payload?.data;
        }
      }),
      builder.addCase(getSavedSearches.pending, (state, action) => {
        state.savedSearches.isLoading = true;
        state.savedSearches.errMsg = null;
      }),
      builder.addCase(getSavedSearches.fulfilled, (state, action) => {
        state.savedSearches.isLoading = false;
        state.savedSearches.errMsg = null;
        if (state.savedSearches.pageNumber > 1) {
          state.savedSearches.data = [
            ...state.savedSearches.data,
            ...action.payload.data,
          ];
        } else {
          state.savedSearches.data = action.payload.data;
        }
        state.savedSearches.meta = action.payload.meta;
      }),
      builder.addCase(getSavedSearches.rejected, (state, action) => {
        state.savedSearches.success = false;
        state.savedSearches.isLoading = false;
        state.savedSearches.errMsg = action.payload;
      }),
      builder.addCase(getSearchProperties.pending, (state, action) => {
        state.savedSearchesProperties.isLoading = true;
        state.savedSearchesProperties.errMsg = null;
      }),
      builder.addCase(getSearchProperties.fulfilled, (state, action) => {
        state.savedSearchesProperties.isLoading = false;
        state.savedSearchesProperties.errMsg = null;
        state.savedSearchesProperties.data = [
          ...action.payload,
          ...state.savedSearchesProperties.data,
        ];
      }),
      builder.addCase(getSearchProperties.rejected, (state, action) => {
        state.savedSearchesProperties.success = false;
        state.savedSearchesProperties.isLoading = false;
        state.savedSearchesProperties.errMsg = action.payload;
      }),
      builder.addCase(getFavoriteProperties.pending, (state, action) => {
        state.favoriteProperties.isLoading = true;
        state.favoriteProperties.errMsg = null;
      }),
      builder.addCase(getFavoriteProperties.fulfilled, (state, action) => {
        state.favoriteProperties.isLoading = false;
        state.favoriteProperties.errMsg = null;
        state.favoriteProperties.data = action.payload.data;
        state.favoriteProperties.meta = action.payload.meta;
      }),
      builder.addCase(getFavoriteProperties.rejected, (state, action) => {
        state.favoriteProperties.success = false;
        state.favoriteProperties.isLoading = false;
        state.favoriteProperties.errMsg = action.payload;
      }),
      // remove favorite
      builder.addCase(removeFavorite.pending, (state, action) => {
        state.removeFavorite.isLoading = true;
        state.removeFavorite.errMsg = null;
      }),
      builder.addCase(removeFavorite.fulfilled, (state, action) => {
        state.removeFavorite.isLoading = false;
        state.removeFavorite.errMsg = null;
        state.removeFavorite.success = true;
        let newProperties = [...state.favoriteProperties.data];
        state.favoriteProperties.data = newProperties.filter(
          (it: any) => it.ListingId !== action.payload.data?.ListingId
        );
      }),
      builder.addCase(removeFavorite.rejected, (state, action) => {
        state.removeFavorite.success = false;
        state.removeFavorite.isLoading = false;
        state.removeFavorite.errMsg = action.payload;
      }),
      // update saved search
      builder.addCase(updateSavedSearch.pending, (state, action) => {
        state.updateSaveSearch.isLoading = true;
        state.updateSaveSearch.errMsg = null;
      }),
      builder.addCase(updateSavedSearch.fulfilled, (state, action) => {
        state.updateSaveSearch.isLoading = false;
        state.updateSaveSearch.errMsg = null;
        state.updateSaveSearch.success = true;
      }),
      builder.addCase(updateSavedSearch.rejected, (state, action) => {
        state.updateSaveSearch.success = false;
        state.updateSaveSearch.isLoading = false;
        state.updateSaveSearch.errMsg = action.payload;
      }),
      // add favorite
      builder.addCase(addFavorite.pending, (state, action) => {
        state.addFavorite.isLoading = true;
        state.addFavorite.errMsg = null;
      }),
      builder.addCase(addFavorite.fulfilled, (state, action) => {
        state.addFavorite.isLoading = false;
        state.addFavorite.errMsg = null;
        state.addFavorite.success = true;
        let newProperties = [...state.favoriteProperties.data];
        newProperties.push(action.payload.data);
        state.favoriteProperties.data = newProperties;
        state.favoriteProperties.meta.count =
          Number(state.favoriteProperties.meta.count || 0) + 1;
      }),
      builder.addCase(addFavorite.rejected, (state, action) => {
        state.addFavorite.success = false;
        state.addFavorite.isLoading = false;
        state.addFavorite.errMsg = action.payload;
      }),
      // get search based on params
      builder.addCase(getSearchResultParams.pending, (state, action) => {
        state.searchResults.isLoading = true;
        state.searchResults.errMsg = null;
      }),
      builder.addCase(getSearchResultParams.fulfilled, (state, action) => {
        state.searchResults.isLoading = false;
        state.searchResults.errMsg = null;
        state.searchResults.data = action.payload.data;
        state.searchResults.meta = action.payload.meta;
        state.paginationList = [];
        state.paginationCount = 0;
        // let newList: any = [];
        // if (state.searchResults.pageNumber > 1) {
        //   action.payload?.data?.map((item: any) => {
        //     let obj: any = {
        //       ListingId: item.ListingId,
        //       route: route(item),
        //     };
        //     newList.push(obj);
        //   });
        //   state.paginationList = [
        //     ...state.paginationList?.slice(
        //       0,
        //       (state.searchResults.pageNumber - 1) * 20
        //     ),
        //     ...newList,
        //   ].filter(
        //     (it, index, self) =>
        //       self.findIndex((item) => item.ListingId === it.ListingId) == index
        //   );
        // } else {
        //   action.payload?.data?.map((item: any) => {
        //     let obj: any = {
        //       ListingId: item.ListingId,
        //       route: route(item),
        //     };
        //     newList.push(obj);
        //   });
        //   state.paginationList = newList;
        // }
        // state.paginationCount = action.payload.meta.numFound;
      }),
      builder.addCase(getSearchResultParams.rejected, (state, action) => {
        state.searchResults.success = false;
        state.searchResults.isLoading = false;
        state.searchResults.errMsg = action.payload;
      }),
      // get specific search detail
      builder.addCase(getSavedSearch.pending, (state, action) => {
        state.searchDetail.isLoading = true;
      }),
      builder.addCase(getSavedSearch.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
        let newSearchParam: any = {};
        let filterString = action.payload.advanceSearchId?.filter?.replaceAll(
          "q=",
          ""
        );

        newSearchParam = queryParsing(filterString);
        if (Object.keys(newSearchParam)?.length) {
          state.searchParams = {
            ...newSearchParam,
            start: 0,
            rows: 20,
          };
          state.pageNumber = 1;
        }
        state.searchDetail = { ...action.payload, isLoading: false };
      }),
      builder.addCase(getSavedSearch.rejected, (state, action) => {
        state.searchDetail.isLoading = false;
      });
  },
});
export const {
  handleUpdateParams,
  handleAddOrRemoveKeyFromSearch,
  handleResetSearchValue,
  handleUpdateSearchId,
  handleUpdateSaveSearchPage,
  handleResetFavorite,
  handleUpdateSearchPageNumber,
  handleUpdatePageNumber,
  handleUpdateBackLink,
} = propertyList.actions;
export default propertyList.reducer;
export * from "./getPropertyList";
export * from "./getSavedSearches";
export * from "./getSaveSearch";
export * from "./getSearchProperties";
