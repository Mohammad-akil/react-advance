"use client";
import React, { useState, useEffect } from "react";
import Styles from "../../../styles/property-search/advanceSearch.module.css";
import {
  Box,
  Container,
  Typography,
  Grid,
  Autocomplete as MuiAutocomplete,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  Checkbox,
  Stack,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  CircularProgress,
  Chip,
} from "@mui/material";
import Link from "next/link";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  handleUpdateParams,
  handleResetSearchValue,
  getSavedSearch,
  handleUpdatePageNumber,
} from "../../../store/property-list";
import { useAppDispatch } from "../../../store/store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import {
  priceList,
  SqftList,
  LostSizeList,
  bedroomsList,
  yearBuiltList,
  searchKeys,
  returnKeyMultipleExistsInObject,
  generateValue,
} from "../../../utils/propertyData";
import { capitalizeParagraph } from "../../../utils/propertyAddressFormat";
import { getSuggestions } from "../../../store/property-list/getSuggestions";
import {
  decodeRangeValue,
  decodeMultipleValue,
  isChecked,
} from "../../../utils/common";
import { keysConfig } from "../../../utils/keysConfig";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { updateSavedSearch } from "../../../store/property-list/updateSaveSearch";
import LoadingButton from "@mui/lab/LoadingButton";
import ResponseAlert from "../../../components/shared/alert";
import Image from "next/image";
import locationIcon from "../../../assests/images/location.png";
import listingIcon from "../../../assests/images/listingIcon.png";
import schoolIcon from "../../../assests/images/schoolIcon.png";
import buildingIcon from "../../../assests/images/buildingIcon.png";

interface propertySearchProps {
  [key: string]: any;
}
function AdvanceSearchForm(props: propertySearchProps) {
  let { isDisplayAll } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [openAutocomplete, setOpenAutocomplete] = useState<string>("");
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const suggestions = useSelector(
    (state: RootState) => state.propertyList.suggestions
  );
  const update = useSelector(
    (state: RootState) => state.propertyList.updateSaveSearch
  );
  const searchDetail = useSelector(
    (state: RootState) => state.propertyList.searchDetail
  );

  const handleViewAllListing = () => {
    dispatch(handleUpdatePageNumber({}));
    router.push("/property-search/results");
  };

  const handleUpdateSearchValue = (
    field: string,
    value: any,
    type: string,
    checked: any,
    rangeType?: any
  ) => {
    if (type === "multiple") {
      if (checked) {
        if (searchParams[field]) {
          let newValue = `${searchParams[field]
            ?.replaceAll(")", "")
            ?.replaceAll(`"`, "")
            ?.replaceAll("(", "")} OR ${
            value?.includes(" ") ? `"${value}"` : value
          }`;
          dispatch(
            handleUpdateParams({ field, value: decodeMultipleValue(newValue) })
          );
        } else {
          dispatch(
            handleUpdateParams({
              field,
              value: value?.includes(" ") ? `"${value}"` : value,
            })
          );
        }
      } else {
        let newValue = searchParams[field]
          ?.replaceAll(")", "")
          ?.replaceAll("(", "")
          ?.replaceAll(`"`, "")
          ?.split(" OR ")
          ?.filter((item: any) => item !== value)
          ?.join(" OR ");
        dispatch(
          handleUpdateParams({ field, value: decodeMultipleValue(newValue) })
        );
      }
    }
    if (type === "range") {
      let newValue: string;
      if (searchParams[field]) {
        if (rangeType === "min") {
          let maxValue = decodeRangeValue(searchParams[field], "max");
          if (maxValue === "*" && (value === "*" || !value)) {
            newValue = ``;
          } else {
            newValue = `[${value ? value : "*"} TO ${maxValue}]`;
          }
        } else {
          let minValue = decodeRangeValue(searchParams[field], "min");
          if (minValue === "*" && (value === "*" || !value)) {
            newValue = ``;
          } else {
            newValue = `[${minValue} TO ${value ? value : "*"}]`;
          }
        }
        dispatch(handleUpdateParams({ field, value: newValue }));
      } else {
        if (rangeType === "min") {
          newValue = value === "*" || !value ? "" : `[${value} TO *]`;
        } else {
          newValue = value === "*" || !value ? "" : `[* TO ${value}]`;
        }
        dispatch(handleUpdateParams({ field, value: newValue }));
      }
    }
  };

  const handleSuccess = () => {
    setErrorAlert({
      errorMsg: "Your have successfully updated the search!",
      errorType: "success",
      isOpen: true,
    });
  };

  const handleError = (error: any) => {
    setErrorAlert({
      errorMsg: JSON.stringify(error),
      errorType: "error",
      isOpen: true,
    });
  };

  useEffect(() => {
    if (!Object.keys(suggestions)?.length) {
      dispatch(getSuggestions());
    }
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location?.search).get("searchId")) {
      dispatch(
        getSavedSearch({
          searchId: new URLSearchParams(window.location?.search).get(
            "searchId"
          ),
        })
      );
    }
  }, [new URLSearchParams(window.location?.search).get("searchId")]);

  const filterOptions = (options: any, { inputValue }: any) => {
    if (inputValue?.length > 1) {
      if (inputValue) {
        const firstLetters = inputValue.trim().toUpperCase();
        return options
          .filter((option: any) =>
            option.title.toUpperCase().startsWith(firstLetters)
          )
          ?.slice(0, 500);
      } else {
        return options?.slice(0, 500);
      }
    } else {
      return [];
    }
  };
  const filterOptionsPrice = (options: any, { inputValue }: any) => {
    if (inputValue) {
      const firstLetters = inputValue?.replaceAll(",", "");
      return options.filter((option: any) =>
        option.value?.startsWith(firstLetters)
      );
    } else {
      return options;
    }
  };

  const handleReturnSelectedOption = () => {
    let newFilteredOptions: any = [];
    let newKeys = returnKeyMultipleExistsInObject(searchParams, searchKeys);
    for (let i = 0; i < newKeys.length; i++) {
      let fondKey = newKeys[i];
      let fountKeyValue = searchParams[fondKey];
      if (fountKeyValue) {
        if (fountKeyValue?.includes("(") || fountKeyValue?.includes(")")) {
          let newSplitedValue = fountKeyValue
            ?.replaceAll("(", "")
            ?.replaceAll(")", "")
            ?.split(" OR ");
          for (let j = 0; j < newSplitedValue.length; j++) {
            newFilteredOptions.push({
              key: fondKey,
              value: newSplitedValue[j]?.replaceAll(`"`, ""),
            });
          }
        } else {
          newFilteredOptions.push({
            key: fondKey,
            value: fountKeyValue?.replaceAll(`"`, ""),
          });
        }
      }
    }
    return newFilteredOptions;
  };
  const handleReturnOptions = () => {
    let options: any = [];
    // Custom comparison function to sort based on the custom order
    const customSort = (a: any, b: any) => {
      const indexOfA = searchKeys.indexOf(a.group);
      const indexOfB = searchKeys.indexOf(b.group);
      if (indexOfA === -1) return 1; // Place unrecognized values at the end
      if (indexOfB === -1) return -1; // Place unrecognized values at the end

      return indexOfA - indexOfB;
    };
    let selectedOptions = handleReturnSelectedOption();
    searchKeys.map((item: any, index: any) => {
      suggestions[item]?.map((it: any) => {
        if (
          !selectedOptions.find(
            (val: any) =>
              (val.value === it?.value[0]) === it && val.key === item
          )
        ) {
          let obj = {
            title: capitalizeParagraph(it.friendlyName),
            group: item,
            value: it.value,
          };
          options.push(obj);
        }
      });
    });
    return options.sort(customSort);
    // .sort((a, b) => {
    //   if (a.group < b.group) return -1;
    //   if (a.group > b.group) return 1;
    //   return a.title.localeCompare(b.title);
    // });
  };

  const renderGroup = (params: any) => (
    <Box>
      <Box className={Styles.groupIconArea}>
        {" "}
        {params.group === "City" ? (
          <Image src={locationIcon} alt="locationIcon" width={26} height={26} />
        ) : null}
        {params.group === "SubdivisionName" ? (
          <Image src={buildingIcon} alt="buildingIcon" width={26} height={26} />
        ) : null}
        {params.group === "PostalCode" ? (
          <Image src={listingIcon} alt="listingIcon" width={26} height={26} />
        ) : null}
        {params.group === "ElementarySchool" ||
        params.group === "HighSchool" ||
        params.group === "MiddleSchool" ||
        params.group === "MiddleOrJuniorSchool" ? (
          <Image src={schoolIcon} alt="locationIcon" width={26} height={26} />
        ) : null}
        {params.group === "CountyOrParish"
          ? "County"
          : params.group.replace(/([A-Z])/g, " $1").trim()}
      </Box>
      <Box className={Styles.groupItem}>{params.children}</Box>
    </Box>
  );

  return (
    <Container maxWidth="xl" className={Styles.advanceSearchPage}>
      {isDisplayAll ? (
        <Typography className={Styles.advanceSearchPageHeading}>
          {new URLSearchParams(window.location?.search).get("searchId") &&
          searchDetail?.title
            ? `Edit Your Saved Search ${
                searchDetail?.title ? ` : ${searchDetail?.title} ` : ""
              }`
            : "Advanced Property Search"}{" "}
        </Typography>
      ) : null}
      {new URLSearchParams(window.location?.search).get("searchId") &&
      searchDetail?.isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={10}>
            <MuiAutocomplete
              disableClearable
              options={["leads", "contracts", "financing", "other"]}
              freeSolo
              getOptionLabel={(option) => option}
              sx={{ mt: "12px", display: "none" }}
              isOptionEqualToValue={(option, value) => option === value}
              // loading
              renderInput={(params) => (
                <OutlinedInput
                  {...params}
                  placeholder="Quick Search by Address or MLS Number"
                  aria-describedby="stepper-linear-event_types"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            ></MuiAutocomplete>
            <Box className={Styles.propertyTypeArea}>
              <Typography className={Styles.propertyTypeAreaHeading}>
                Listing Type
              </Typography>
              <Box className={Styles.propertyTypeAreaItems}>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    For Sale
                  </Typography>
                  <Checkbox
                    checked={
                      searchParams?.PropertyType === "Residential"
                        ? true
                        : false
                    }
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "white",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                  />
                </Card>
              </Box>
            </Box>
            <Box className={Styles.propertyTypeArea}>
              <Typography className={Styles.propertyTypeAreaHeading}>
                Property Type
              </Typography>
              <Box className={Styles.propertyTypeAreaItems}>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Single Family{" "}
                  </Typography>
                  <Checkbox
                    checked={isChecked(
                      searchParams?.PropertySubType,
                      "single family residence"
                    )}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "PropertySubType",
                        "single family residence",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Condo
                  </Typography>
                  <Checkbox
                    checked={isChecked(
                      searchParams?.PropertySubType,
                      "condominium"
                    )}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "PropertySubType",
                        "condominium",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Townhome
                  </Typography>
                  <Checkbox
                    checked={isChecked(
                      searchParams?.PropertySubType,
                      "townhouse"
                    )}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "PropertySubType",
                        "townhouse",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
              </Box>
            </Box>
            <Box className={Styles.propertyTypeArea}>
              <Typography className={Styles.propertyTypeAreaHeading}>
                Property Status
              </Typography>
              <Box className={Styles.propertyTypeAreaItems}>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Active
                  </Typography>
                  <Checkbox
                    checked={isChecked(searchParams?.MlsStatus, "Active")}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "MlsStatus",
                        "Active",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Active Under Contract
                  </Typography>
                  <Checkbox
                    checked={isChecked(
                      searchParams?.MlsStatus,
                      "Active Under Contract"
                    )}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "MlsStatus",
                        "Active Under Contract",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Coming Soon
                  </Typography>
                  <Checkbox
                    checked={isChecked(searchParams?.MlsStatus, "Coming Soon")}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "MlsStatus",
                        "Coming Soon",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
                <Card
                  variant="outlined"
                  className={Styles.propertyTypeAreaItem}
                >
                  <Typography className={Styles.propertyTypeAreaItemDes}>
                    Closed
                  </Typography>
                  <Checkbox
                    checked={isChecked(searchParams?.MlsStatus, "Closed")}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: "28px" },
                      color: "#4c516d",
                      "&.Mui-checked": {
                        color: "#4c516d",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleUpdateSearchValue(
                        "MlsStatus",
                        "Closed",
                        "multiple",
                        event.target.checked
                      );
                    }}
                  />
                </Card>
              </Box>
            </Box>

            <Box className={Styles.propertyTypeArea}>
              <Typography className={Styles.propertyTypeAreaHeading}>
                Search by Location Type
              </Typography>
              <InputLabel
                sx={{ mt: "15px" }}
                className={Styles.searchInputLabel}
              >
                Cities, Zip Codes, Schools, County, Subdivision
              </InputLabel>
              <MuiAutocomplete
                options={handleReturnOptions()}
                filterOptions={filterOptions}
                fullWidth
                freeSolo
                size="small"
                renderGroup={renderGroup}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.title}
                value={selectedValue}
                clearOnBlur
                clearOnEscape
                onChange={(event, newValue) => {
                  setSelectedValue(newValue);
                  if (
                    searchParams[newValue?.group] &&
                    searchParams[newValue?.group]?.length
                  ) {
                    handleUpdateSearchValue(
                      newValue?.group,
                      generateValue(newValue, true)?.includes("OR")
                        ? `(${generateValue(newValue, true)})`
                        : generateValue(newValue, true),
                      "multiple",
                      true
                    );
                  } else {
                    dispatch(
                      handleUpdateParams({
                        field: newValue?.group,
                        value: generateValue(newValue, true)?.includes("OR")
                          ? `(${generateValue(newValue, true)})`
                          : generateValue(newValue, true),
                      })
                    );
                  }
                  setTimeout(() => {
                    setSelectedValue(null);
                  }, 200);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Start Typing"
                    size="medium"
                  />
                )}
              />
              <Box className={Styles.selectedList}>
                {handleReturnSelectedOption()?.map(
                  (item: any, index: number) => (
                    <Chip
                      key={index}
                      label={item.value}
                      onDelete={() => {
                        handleUpdateSearchValue(
                          item.key,
                          `${item.value?.replaceAll(`"`, "")}`,
                          "multiple",
                          false
                        );
                      }}
                    />
                  )
                )}
              </Box>
            </Box>

            <Grid container spacing={4} sx={{ mt: "30px" }}>
              <Grid item xs={12} md={6}>
                <InputLabel className={Styles.customInputLabel}>
                  Price From
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MuiAutocomplete
                    /*      options={priceList?.filter(
                      (item: any) =>
                        item.value !==
                        decodeRangeValue(searchParams?.ListPrice, "max")
                    )} */
                    filterOptions={filterOptionsPrice}
                    options={
                      Number(
                        decodeRangeValue(searchParams?.ListPrice, "max") || 0
                      ) > 0
                        ? priceList?.filter(
                            (item: any) =>
                              Number(item.value) <
                                Number(
                                  decodeRangeValue(
                                    searchParams?.ListPrice,
                                    "max"
                                  )
                                ) || item.value === "*"
                          )
                        : priceList?.filter(
                            (item: any) =>
                              item.value !==
                              decodeRangeValue(searchParams?.ListPrice, "max")
                          )
                    }
                    value={
                      searchParams?.ListPrice
                        ? priceList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(searchParams?.ListPrice, "min")
                          ) || {
                            title: decodeRangeValue(
                              searchParams?.ListPrice,
                              "min"
                            ),
                            value: decodeRangeValue(
                              searchParams?.ListPrice,
                              "min"
                            ),
                          }
                        : null
                    }
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "ListPrice",
                        newValue?.value,
                        "range",
                        false,
                        "min"
                      );
                      setOpenAutocomplete("priceMaxRang");
                      document.getElementById("priceMaxRang")?.click();
                    }}
                    fullWidth
                    id={"priceMinRang"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Min"
                        variant="outlined"
                      />
                    )}
                  />
                  <HorizontalRuleIcon
                    sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                  />
                  <MuiAutocomplete
                    filterOptions={filterOptionsPrice}
                    options={
                      decodeRangeValue(searchParams?.ListPrice, "min") ===
                        "*" || !decodeRangeValue(searchParams?.ListPrice, "min")
                        ? priceList
                        : priceList?.filter(
                            (item: any) =>
                              Number(item?.value) >
                                Number(
                                  decodeRangeValue(
                                    searchParams?.ListPrice,
                                    "min"
                                  ) || 0
                                ) || item.value === "*"
                          )
                    }
                    value={
                      searchParams?.ListPrice
                        ? priceList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(searchParams?.ListPrice, "max")
                          ) || {
                            title: decodeRangeValue(
                              searchParams?.ListPrice,
                              "max"
                            ),
                            value: decodeRangeValue(
                              searchParams?.ListPrice,
                              "max"
                            ),
                          }
                        : null
                    }
                    fullWidth
                    id={"priceMaxRang"}
                    getOptionLabel={(option) => option.title}
                    open={openAutocomplete === "priceMaxRang" ? true : false} // Control the open state of the dropdown
                    onOpen={() => setOpenAutocomplete("priceMaxRang")} // Handle when the dropdown opens
                    onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "ListPrice",
                        newValue?.value,
                        "range",
                        false,
                        "max"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Max"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel className={Styles.customInputLabel}>
                  Square Feet
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MuiAutocomplete
                    options={
                      Number(
                        decodeRangeValue(
                          searchParams?.BuildingAreaTotal,
                          "max"
                        ) || 0
                      ) > 0
                        ? SqftList?.filter(
                            (item: any) =>
                              Number(item.value) <
                                Number(
                                  decodeRangeValue(
                                    searchParams?.BuildingAreaTotal,
                                    "max"
                                  )
                                ) || item.value === "*"
                          )
                        : SqftList
                    }
                    value={
                      searchParams?.BuildingAreaTotal
                        ? SqftList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(
                                searchParams?.BuildingAreaTotal,
                                "min"
                              )
                          )
                        : null
                    }
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "BuildingAreaTotal",
                        newValue?.value,
                        "range",
                        false,
                        "min"
                      );
                      setOpenAutocomplete("sqftMaxRang");
                      document.getElementById("sqftMaxRang")?.click();
                    }}
                    fullWidth
                    id={"sqftMinRang"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Min"
                        variant="outlined"
                      />
                    )}
                  />
                  <HorizontalRuleIcon
                    sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                  />
                  <MuiAutocomplete
                    options={
                      decodeRangeValue(
                        searchParams?.BuildingAreaTotal,
                        "min"
                      ) === "*" ||
                      !decodeRangeValue(searchParams?.BuildingAreaTotal, "min")
                        ? SqftList
                        : SqftList?.filter(
                            (item: any) =>
                              Number(item?.value) >
                                Number(
                                  decodeRangeValue(
                                    searchParams?.BuildingAreaTotal,
                                    "min"
                                  ) || 0
                                ) || item.value === "*"
                          )
                    }
                    value={
                      searchParams?.BuildingAreaTotal
                        ? SqftList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(
                                searchParams?.BuildingAreaTotal,
                                "max"
                              )
                          )
                        : null
                    }
                    fullWidth
                    id={"sqftMaxRang"}
                    getOptionLabel={(option) => option.title?.replace("+", "")}
                    open={openAutocomplete === "sqftMaxRang" ? true : false} // Control the open state of the dropdown
                    onOpen={() => setOpenAutocomplete("sqftMaxRang")} // Handle when the dropdown opens
                    onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "BuildingAreaTotal",
                        newValue?.value,
                        "range",
                        false,
                        "max"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Max"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel className={Styles.customInputLabel}>
                  Lot Size (Acres)
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MuiAutocomplete
                    options={
                      Number(
                        decodeRangeValue(searchParams?.LotSizeAcres, "max") || 0
                      ) > 0
                        ? LostSizeList?.filter(
                            (item: any) =>
                              Number(item.value) <
                                Number(
                                  decodeRangeValue(
                                    searchParams?.LotSizeAcres,
                                    "max"
                                  )
                                ) || item.value === "*"
                          )
                        : LostSizeList
                    }
                    value={
                      searchParams?.LotSizeAcres
                        ? LostSizeList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(
                                searchParams?.LotSizeAcres,
                                "min"
                              )
                          )
                        : null
                    }
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "LotSizeAcres",
                        newValue?.value,
                        "range",
                        false,
                        "min"
                      );
                      setOpenAutocomplete("lotSizeMaxRang");
                      document.getElementById("lotSizeMaxRang")?.click();
                    }}
                    fullWidth
                    id={"lotSizeMinRang"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Min"
                        variant="outlined"
                      />
                    )}
                  />
                  <HorizontalRuleIcon
                    sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                  />
                  <MuiAutocomplete
                    options={
                      decodeRangeValue(searchParams?.LotSizeAcres, "min") ===
                        "*" ||
                      !decodeRangeValue(searchParams?.LotSizeAcres, "min")
                        ? LostSizeList
                        : LostSizeList?.filter(
                            (item: any) =>
                              Number(item?.value) >
                                Number(
                                  decodeRangeValue(
                                    searchParams?.LotSizeAcres,
                                    "min"
                                  ) || 0
                                ) || item.value === "*"
                          )
                    }
                    value={
                      searchParams?.LotSizeAcres
                        ? LostSizeList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(
                                searchParams?.LotSizeAcres,
                                "max"
                              )
                          )
                        : null
                    }
                    fullWidth
                    id={"lotSizeMaxRang"}
                    getOptionLabel={(option) => option.title?.replace("+", "")}
                    open={openAutocomplete === "lotSizeMaxRang" ? true : false} // Control the open state of the dropdown
                    onOpen={() => setOpenAutocomplete("lotSizeMaxRang")} // Handle when the dropdown opens
                    onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "LotSizeAcres",
                        newValue?.value,
                        "range",
                        false,
                        "max"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Max"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={6}>
                    <InputLabel className={Styles.customInputLabel}>
                      Bedrooms
                    </InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MuiAutocomplete
                        options={
                          Number(
                            decodeRangeValue(
                              searchParams?.BedroomsTotal,
                              "max"
                            ) || 0
                          ) > 0
                            ? bedroomsList?.filter(
                                (item: any) =>
                                  Number(item.value) <
                                    Number(
                                      decodeRangeValue(
                                        searchParams?.BedroomsTotal,
                                        "max"
                                      )
                                    ) || item.value === "*"
                              )
                            : bedroomsList
                        }
                        value={
                          searchParams?.BedroomsTotal
                            ? bedroomsList?.find(
                                (item: any) =>
                                  item.value ===
                                  decodeRangeValue(
                                    searchParams?.BedroomsTotal,
                                    "min"
                                  )
                              )
                            : null
                        }
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue: any) => {
                          handleUpdateSearchValue(
                            "BedroomsTotal",
                            newValue?.value,
                            "range",
                            false,
                            "min"
                          );
                          setOpenAutocomplete("bedroomsMaxRang");
                          document.getElementById("bedroomsMaxRang")?.click();
                        }}
                        fullWidth
                        id={"bedroomsMinRang"}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Min"
                            variant="outlined"
                          />
                        )}
                      />
                      <HorizontalRuleIcon
                        sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                      />
                      <MuiAutocomplete
                        options={
                          decodeRangeValue(
                            searchParams?.BedroomsTotal,
                            "min"
                          ) === "*" ||
                          !decodeRangeValue(searchParams?.BedroomsTotal, "min")
                            ? bedroomsList
                            : bedroomsList?.filter(
                                (item: any) =>
                                  Number(item?.value) >
                                    Number(
                                      decodeRangeValue(
                                        searchParams?.BedroomsTotal,
                                        "min"
                                      ) || 0
                                    ) || item.value === "*"
                              )
                        }
                        value={
                          searchParams?.BedroomsTotal
                            ? bedroomsList?.find(
                                (item: any) =>
                                  item.value ===
                                  decodeRangeValue(
                                    searchParams?.BedroomsTotal,
                                    "max"
                                  )
                              )
                            : null
                        }
                        fullWidth
                        id={"bedroomsMaxRang"}
                        getOptionLabel={(option) =>
                          option.title?.replace("+", "")
                        }
                        open={
                          openAutocomplete === "bedroomsMaxRang" ? true : false
                        } // Control the open state of the dropdown
                        onOpen={() => setOpenAutocomplete("bedroomsMaxRang")} // Handle when the dropdown opens
                        onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                        onChange={(event, newValue: any) => {
                          handleUpdateSearchValue(
                            "BedroomsTotal",
                            newValue?.value,
                            "range",
                            false,
                            "max"
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Max"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <InputLabel className={Styles.customInputLabel}>
                      Bathrooms
                    </InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MuiAutocomplete
                        options={
                          Number(
                            decodeRangeValue(
                              searchParams[keysConfig?.bathrooms],
                              "max"
                            ) || 0
                          ) > 0
                            ? bedroomsList?.filter(
                                (item: any) =>
                                  Number(item.value) <
                                    Number(
                                      decodeRangeValue(
                                        searchParams[keysConfig?.bathrooms],
                                        "max"
                                      )
                                    ) || item.value === "*"
                              )
                            : bedroomsList
                        }
                        value={
                          searchParams[keysConfig?.bathrooms]
                            ? bedroomsList?.find(
                                (item: any) =>
                                  item.value ===
                                  decodeRangeValue(
                                    searchParams[keysConfig?.bathrooms],
                                    "min"
                                  )
                              )
                            : null
                        }
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue: any) => {
                          handleUpdateSearchValue(
                            keysConfig?.bathrooms,
                            newValue?.value,
                            "range",
                            false,
                            "min"
                          );
                          setOpenAutocomplete("bathroomsMaxRang");
                          document.getElementById("bathroomsMaxRang")?.click();
                        }}
                        fullWidth
                        id={"bathroomsMinRang"}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Min"
                            variant="outlined"
                          />
                        )}
                      />
                      <HorizontalRuleIcon
                        sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                      />
                      <MuiAutocomplete
                        options={
                          decodeRangeValue(
                            searchParams[keysConfig?.bathrooms],
                            "min"
                          ) === "*" ||
                          !decodeRangeValue(
                            searchParams[keysConfig?.bathrooms],
                            "min"
                          )
                            ? bedroomsList
                            : bedroomsList?.filter(
                                (item: any) =>
                                  Number(item?.value) >
                                    Number(
                                      decodeRangeValue(
                                        searchParams[keysConfig?.bathrooms],
                                        "min"
                                      ) || 0
                                    ) || item.value === "*"
                              )
                        }
                        value={
                          searchParams[keysConfig?.bathrooms]
                            ? bedroomsList?.find(
                                (item: any) =>
                                  item.value ===
                                  decodeRangeValue(
                                    searchParams[keysConfig?.bathrooms],
                                    "max"
                                  )
                              )
                            : null
                        }
                        fullWidth
                        id={"bathroomsMaxRang"}
                        getOptionLabel={(option) =>
                          option.title?.replace("+", "")
                        }
                        open={
                          openAutocomplete === "bathroomsMaxRang" ? true : false
                        } // Control the open state of the dropdown
                        onOpen={() => setOpenAutocomplete("bathroomsMaxRang")} // Handle when the dropdown opens
                        onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                        onChange={(event, newValue: any) => {
                          handleUpdateSearchValue(
                            keysConfig?.bathrooms,
                            newValue?.value,
                            "range",
                            false,
                            "max"
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Max"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel className={Styles.customInputLabel}>
                  Year Built
                </InputLabel>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MuiAutocomplete
                    options={
                      Number(
                        decodeRangeValue(searchParams?.YearBuilt, "max") || 0
                      ) > 0
                        ? yearBuiltList?.filter(
                            (item: any) =>
                              Number(item.value) <
                                Number(
                                  decodeRangeValue(
                                    searchParams?.YearBuilt,
                                    "max"
                                  )
                                ) || item.value === "*"
                          )
                        : yearBuiltList
                    }
                    value={
                      searchParams?.YearBuilt
                        ? yearBuiltList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(searchParams?.YearBuilt, "min")
                          )
                        : null
                    }
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "YearBuilt",
                        newValue?.value,
                        "range",
                        false,
                        "min"
                      );
                      setOpenAutocomplete("yearMaxRang");
                      document.getElementById("yearMaxRang")?.click();
                    }}
                    fullWidth
                    id={"yearMinRang"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Min"
                        variant="outlined"
                      />
                    )}
                  />
                  <HorizontalRuleIcon
                    sx={{ margin: "0px 3px", color: "#d9d9d9" }}
                  />
                  <MuiAutocomplete
                    options={
                      decodeRangeValue(searchParams?.YearBuilt, "min") ===
                        "*" || !decodeRangeValue(searchParams?.YearBuilt, "min")
                        ? yearBuiltList
                        : yearBuiltList?.filter(
                            (item: any) =>
                              Number(item?.value) >
                                Number(
                                  decodeRangeValue(
                                    searchParams?.YearBuilt,
                                    "min"
                                  ) || 0
                                ) || item.value === "*"
                          )
                    }
                    value={
                      searchParams?.YearBuilt
                        ? yearBuiltList?.find(
                            (item: any) =>
                              item.value ===
                              decodeRangeValue(searchParams?.YearBuilt, "max")
                          )
                        : null
                    }
                    fullWidth
                    id={"yearMaxRang"}
                    getOptionLabel={(option) => option.title?.replace("+", "")}
                    open={openAutocomplete === "yearMaxRang" ? true : false} // Control the open state of the dropdown
                    onOpen={() => setOpenAutocomplete("yearMaxRang")} // Handle when the dropdown opens
                    onClose={() => setOpenAutocomplete("")} // Handle when the dropdown closes
                    onChange={(event, newValue: any) => {
                      handleUpdateSearchValue(
                        "YearBuilt",
                        newValue?.value,
                        "range",
                        false,
                        "max"
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Max"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} md={3}>
                <InputLabel className={Styles.customInputLabel}>
                  Sort Results By
                </InputLabel>
                <TextField
                  value={searchParams?.sort}
                  onChange={(e: any) => {
                    dispatch(
                      handleUpdateParams({
                        field: "sort",
                        value: e.target.value,
                      })
                    );
                  }}
                  fullWidth
                  size="small"
                  select
                >
                  <MenuItem value={"ModificationTimestamp desc"}>
                    Newest
                  </MenuItem>
                  <MenuItem value={"ListPrice desc"}>
                    Price (High to Low)
                  </MenuItem>
                  <MenuItem value={"ListPrice asc"}>
                    Price (Low to High)
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {(isDisplayAll &&
              !new URLSearchParams(window.location?.search).get("searchId")) ||
            !searchDetail?.title ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={4}
                sx={{ mt: "40px" }}
              >
                <Button
                  startIcon={<ListRoundedIcon />}
                  className={Styles.listResultsButton}
                  variant="contained"
                  size="large"
                  onClick={handleViewAllListing}
                >
                  List Results
                </Button>
                <Link href="/property-search/results/map-view">
                  <Button
                    startIcon={<LocationOnIcon />}
                    className={Styles.listResultsButton}
                    variant="contained"
                    size="large"
                  >
                    Map Results
                  </Button>
                </Link>
              </Stack>
            ) : new URLSearchParams(window.location?.search).get("searchId") &&
              searchDetail?.title ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={4}
                sx={{ mt: "40px" }}
              >
                <LoadingButton
                  startIcon={<SearchRoundedIcon />}
                  className={Styles.listResultsButton}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    dispatch(
                      updateSavedSearch({
                        searchId: new URLSearchParams(
                          window.location?.search
                        ).get("searchId"),
                        handleSuccess,
                        handleError,
                      })
                    );
                  }}
                  loading={Boolean(update?.isLoading)}
                  loadingPosition="start"
                >
                  Save Search
                </LoadingButton>
              </Stack>
            ) : null}
            {(isDisplayAll &&
              !new URLSearchParams(window.location?.search).get("searchId")) ||
            searchDetail?.title ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                spacing={4}
                sx={{ mt: "40px" }}
              >
                <Button
                  className={Styles.resetResultsButton}
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={() => {
                    dispatch(handleResetSearchValue({}));
                  }}
                >
                  Reset
                </Button>
              </Stack>
            ) : null}
          </Grid>
          {isDisplayAll ? (
            <Grid item xs={12} md={2}>
              <Card className={Styles.advanceSearchStatCard}>
                <Box className={Styles.advanceSearchStatCardTop}>
                  <Typography
                    className={Styles.advanceSearchStatCardTopHeading}
                  >
                    1,529
                  </Typography>
                  <Typography className={Styles.advanceSearchStatCardTopDes}>
                    Listings Found
                  </Typography>
                </Box>
                <Box
                  onClick={handleViewAllListing}
                  className={Styles.advanceSearchStatCardBottom}
                >
                  <Typography
                    className={Styles.advanceSearchStatCardBottomHeading}
                  >
                    View All
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ) : null}
        </Grid>
      )}
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Container>
  );
}
export default AdvanceSearchForm;
