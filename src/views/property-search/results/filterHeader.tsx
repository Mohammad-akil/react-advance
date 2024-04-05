import React, { Fragment, useState, RefObject, useEffect, useRef } from "react";
import {
  Box,
  Divider,
  Typography,
  Menu,
  Autocomplete,
  TextField,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  Chip,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Button,
  useMediaQuery,
} from "@mui/material";
import Styles from "../../../styles/property-search/topFilters.module.css";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  priceList,
  SqftList,
  LostSizeList,
  bedroomsList,
  yearBuiltList,
  searchKeys,
  generateValue,
} from "../../../utils/propertyData";
import { useSelector } from "react-redux";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import {
  handleUpdateParams,
  handleResetSearchValue,
} from "../../../store/property-list";
import type { RootState } from "../../../store/store";
import { useAppDispatch } from "../../../store/store";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  decodeRangeValue,
  decodeMultipleValue,
  isChecked,
  splitMultipleValue,
  returnKeyMultipleExistsInObject,
} from "../../../utils/common";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { useRouter, usePathname } from "next/navigation";
import SwitchLeftRoundedIcon from "@mui/icons-material/SwitchLeftRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { formateKeys } from "../../../utils/common";
import { handleUpdateAuthPreview } from "../../../store/auth";
import { getSuggestions } from "../../../store/property-list/getSuggestions";
import { updateSavedSearch } from "../../../store/property-list/updateSaveSearch";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AdvanceSearchForm from "../advanceSearch";
import SaveSearch from "./saveSearch";
import ResponseAlert from "../../../components/shared/alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import locationIcon from "../../../assests/images/location.png";
import listingIcon from "../../../assests/images/listingIcon.png";
import schoolIcon from "../../../assests/images/schoolIcon.png";
import buildingIcon from "../../../assests/images/buildingIcon.png";
import { keysConfig } from "../../../utils/keysConfig";
import { capitalizeParagraph } from "../../../utils/propertyAddressFormat";

const PropertySubType = [
  { title: "Single Family", value: "single family residence" },
  { title: "Condo", value: "condominium" },
  { title: "Townhome", value: "townhouse" },
];
const statusList = ["Active", "Active Under Contract", "Coming Soon", "Closed"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
  open?: Boolean
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface filterProps {
  [key: string]: any;
}
type MyComponentRef = RefObject<HTMLElement | null>;

function FilterHeader(props: filterProps) {
  const [openFilter, setOpenFilters] = useState<Boolean>(false);
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");
  const [openedSelectBox, setOpenedSelectBox] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<any>("");
  const [openAutocomplete, setOpenAutocomplete] = useState<string>("");
  const [moreFilters, setMoreFilters] = useState<Boolean>(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const openSelectBox = Boolean(openMenu);
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(
    null
  );
  const [showMore, setShowMore] = useState<any>(false);
  const containerRef: any = useRef();
  const openSort = Boolean(anchorElSort);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSelector(
    (state: RootState) => state.propertyList.searchParams
  );
  const suggestions = useSelector(
    (state: RootState) => state.propertyList.suggestions
  );
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const SearchId = useSelector(
    (state: RootState) => state.propertyList.searchId
  );
  const update = useSelector(
    (state: RootState) => state.propertyList.updateSaveSearch
  );

  const handleOpenSelectBox = (type: string, e: any) => {
    if (type === openedSelectBox) {
      setOpenedSelectBox("");
      setOpenMenu("");
    } else {
      setOpenedSelectBox(type);
      setOpenMenu(e.currentTarget);
    }
  };
  const handleClose = () => {
    setOpenMenu("");
    setOpenedSelectBox("");
  };
  const handleClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };

  const handleUpdateSearchValue = (
    field: string,
    value: any,
    type: string,
    checked: any,
    rangeType?: any,
    setMaxAny?: any
  ) => {
    if (type === "range") {
      let newValue: string;
      if (searchParams[field]) {
        if (rangeType === "min") {
          let maxValue = decodeRangeValue(searchParams[field], "max");
          if (maxValue === "*" && (value === "*" || !value)) {
            newValue = ``;
          } else {
            newValue = setMaxAny
              ? value === "*"
                ? ``
                : `[${value ? value : "*"} TO *]`
              : `[${value ? value : "*"} TO ${maxValue}]`;
          }
        } else {
          let minValue = decodeRangeValue(searchParams[field], "min");
          if (minValue === "*" && (value === "*" || !value)) {
            newValue = ``;
          } else {
            newValue = `[${minValue} TO ${value ? value : "*"}]`;
          }
        }
        dispatch(
          handleUpdateParams({ field, value: newValue, overwrite: true })
        );
      } else {
        if (rangeType === "min") {
          newValue = value === "*" || !value ? "" : `[${value} TO *]`;
        } else {
          newValue = value === "*" || !value ? "" : `[* TO ${value}]`;
        }
        dispatch(
          handleUpdateParams({ field, value: newValue, overwrite: true })
        );
      }
    }
    if (type === "multiple") {
      if (checked) {
        if (searchParams[field]) {
          let newValue = `${searchParams[field]
            ?.replaceAll(")", "")
            ?.replaceAll(`"`, "")
            ?.replaceAll("(", "")} OR ${value}`;
          dispatch(
            handleUpdateParams({
              field,
              value: decodeMultipleValue(newValue),
              overwrite: true,
            })
          );
        } else {
          dispatch(
            handleUpdateParams({
              field,
              value: value?.includes(" ") ? `"${value}"` : value,
              overwrite: true,
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
          handleUpdateParams({
            field,
            value: decodeMultipleValue(newValue),
            overwrite: true,
          })
        );
      }
    }
  };

  const calculateTotalItemWidth = () => {
    // Calculate the total width of the items
    const itemElements: any =
      containerRef?.current?.querySelectorAll(`.MuiChip-root`);
    let totalWidth = 0;
    itemElements?.forEach((itemElement: any) => {
      totalWidth += itemElement.clientWidth + 10;
    });
    return totalWidth;
  };

  const calculateTotalDisplayed = () => {
    const containerWidth: any = containerRef?.current?.clientWidth;
    const itemElements: any =
      containerRef?.current?.querySelectorAll(`.MuiChip-root`);
    let totalWidth = 0;
    let totalDisplayed = 0;
    let labelDisplayed = 0;
    itemElements?.forEach((itemElement: any) => {
      if (totalWidth < containerWidth - 100) {
        totalWidth += itemElement.clientWidth + 20;
        totalDisplayed += 1;
      }
      if (
        itemElement.innerText === "Status:" ||
        itemElement.innerText === "PropertyType:" ||
        itemElement.innerText === ":"
      ) {
        labelDisplayed += 1;
      }
    });
    let countLabelChips =
      (searchParams?.PropertySubType ? 1 : 0) +
      (searchParams?.MlsStatus ? 1 : 0) -
      labelDisplayed;
    let remainingItems =
      itemElements?.length - countLabelChips - totalDisplayed;
    return remainingItems;
  };

  const handleResize = () => {
    const containerWidth: any = containerRef?.current?.clientWidth;
    if (
      calculateTotalItemWidth() > containerWidth &&
      calculateTotalDisplayed() !== showMore
    ) {
      setShowMore(calculateTotalDisplayed());
    } else if (showMore) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, [searchParams]);

  useEffect(() => {
    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setMoreFilters(false);
      } else {
      }
    }
    // Add a click event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!Object.keys(suggestions)?.length) {
      dispatch(getSuggestions());
    }
  }, []);

  // handle return selected options
  const handleReturnSelectedOption = () => {
    let newFilteredOptions = [];
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
          newFilteredOptions.push({ key: fondKey, value: fountKeyValue });
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
    searchKeys.map((item: any, index: number) => {
      suggestions[item]?.map((it: any) => {
        if (
          !selectedOptions.find(
            (val: any) => val.value === it?.value[0] && val.key === item
          )
        ) {
          let obj: any = {
            title: capitalizeParagraph(it.friendlyName),
            group: item,
            value: it.value,
          };
          options.push(obj);
        }
      });
    });

    return options.sort(customSort);

    /*     .sort((a:any, b:any) => {
      if (a.group < b.group) return -1;
      if (a.group > b.group) return 1;
      return a.title.localeCompare(b.title);
    }); */
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
  const handleCloseFilter = () => {
    setOpenFilters(false);
  };
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

  return (
    <Box className={Styles.filterArea}>
      <Box className={Styles.filterHeaderSM}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<SearchRoundedIcon />}
          className={Styles.FiltersSmBtn}
          onClick={() => setOpenFilters(true)}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<SwitchLeftRoundedIcon />}
          fullWidth
          size="large"
          className={Styles.SortSmBtn}
          onClick={handleClickSort}
        >
          Sort
        </Button>
      </Box>
      <Box className={Styles.filterHeaderLG}>
        <Box className={Styles.filterAreaTop}>
          <Box className={Styles.filterAreaTopLeft}>
            <SearchRoundedIcon />
            <Autocomplete
              options={handleReturnOptions()}
              filterOptions={filterOptions}
              fullWidth
              freeSolo
              size="small"
              value={selectedValue}
              renderGroup={renderGroup}
              groupBy={(option: any) => option.group}
              getOptionLabel={(option: any) => option.title}
              clearOnBlur
              clearOnEscape
              onChange={(event: any, newValue: any | null) => {
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
                      overwrite: true,
                    })
                  );
                }
                setTimeout(() => {
                  setSelectedValue(null);
                }, 200);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none", // Hide the border
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="City, Neighborhood, School, ZIP, MLS #"
                />
              )}
            />
          </Box>
          <Box className={Styles.filterAreaTopRight}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              onClick={(e: any) => handleOpenSelectBox("ListPrice", e)}
              className={
                openedSelectBox === "ListPrice"
                  ? Styles.filterSelectBoxActive
                  : Styles.filterSelectBox
              }
            >
              <Typography className={Styles.filterSelectBoxText}>
                Price
              </Typography>
              {openedSelectBox === "ListPrice" ? (
                <KeyboardArrowUpRoundedIcon sx={{ color: "#666666" }} />
              ) : (
                <KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />
              )}
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              onClick={(e: any) => handleOpenSelectBox("BedroomsTotal", e)}
              className={
                openedSelectBox === "BedroomsTotal"
                  ? Styles.filterSelectBoxActive
                  : Styles.filterSelectBox
              }
            >
              <Typography className={Styles.filterSelectBoxText}>
                Beds
              </Typography>
              {openedSelectBox === "BedroomsTotal" ? (
                <KeyboardArrowUpRoundedIcon sx={{ color: "#666666" }} />
              ) : (
                <KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />
              )}
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              onClick={(e: any) =>
                handleOpenSelectBox(keysConfig?.bathrooms, e)
              }
              className={
                openedSelectBox === keysConfig?.bathrooms
                  ? Styles.filterSelectBoxActive
                  : Styles.filterSelectBox
              }
            >
              <Typography className={Styles.filterSelectBoxText}>
                Baths
              </Typography>
              {openedSelectBox === keysConfig?.bathrooms ? (
                <KeyboardArrowUpRoundedIcon sx={{ color: "#666666" }} />
              ) : (
                <KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />
              )}
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            {isLargeScreen ? (
              <Box
                onClick={(e: any) => handleOpenSelectBox("PropertySubType", e)}
                className={
                  openedSelectBox === "PropertySubType"
                    ? Styles.filterSelectBoxActive1
                    : Styles.filterSelectBox1
                }
              >
                <Typography className={Styles.filterSelectBoxText}>
                  Property Type
                </Typography>
                {openedSelectBox === "PropertySubType" ? (
                  <KeyboardArrowUpRoundedIcon sx={{ color: "#666666" }} />
                ) : (
                  <KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />
                )}
              </Box>
            ) : null}
            {isLargeScreen ? (
              <Divider orientation="vertical" variant="middle" flexItem />
            ) : null}

            <Box
              onClick={(e: any) => handleOpenSelectBox("moreOptions", e)}
              className={
                openedSelectBox === "moreOptions"
                  ? Styles.filterSelectBoxActive1
                  : Styles.filterSelectBox1
              }
            >
              <Typography className={Styles.filterSelectBoxText}>
                More Options
              </Typography>
              {openedSelectBox === "moreOptions" ? (
                <KeyboardArrowUpRoundedIcon sx={{ color: "#666666" }} />
              ) : (
                <KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />
              )}
            </Box>
          </Box>
        </Box>
        <Box className={Styles.filterAreaBottom}>
          <Box className={Styles.filterAreaBottomLeft}>
            <Box className={Styles.bottomTabsArea}>
              <Box
                className={
                  pathname === "/property-search/results"
                    ? Styles.bottomTabsItemActive
                    : Styles.bottomTabsItem
                }
                onClick={() => {
                  router.push("/property-search/results");
                }}
              >
                <GridViewRoundedIcon sx={{ color: "#666666" }} />{" "}
                <Typography className={Styles.bottomTabsText}>
                  Gallery
                </Typography>
              </Box>
              <Box
                className={
                  pathname === "/property-search/results/list"
                    ? Styles.bottomTabsItemActive
                    : Styles.bottomTabsItem
                }
                onClick={() => {
                  router.push("/property-search/results");
                }}
              >
                <ListRoundedIcon sx={{ color: "#666666" }} />{" "}
                <Typography className={Styles.bottomTabsText}>List</Typography>
              </Box>
              <Box
                className={
                  pathname === "/property-search/results/map-view"
                    ? Styles.bottomTabsItemActive
                    : Styles.bottomTabsItem
                }
                onClick={() => {
                  router.push("/property-search/results/map-view");
                }}
              >
                <PlaceRoundedIcon sx={{ color: "#666666" }} />{" "}
                <Typography className={Styles.bottomTabsText}>Map</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              height: moreFilters ? "max-content" : "50px !important",
              boxShadow: moreFilters
                ? "0 0 10px rgba(0, 0, 0, .4) !important"
                : "none",
            }}
            className={Styles.filterAreaBottomCenter}
            ref={containerRef}
          >
            {Object.keys(searchParams).map((value, index) => {
              if (
                value !== "sort" &&
                searchParams[value] &&
                typeof searchParams[value] === "string" &&
                searchParams[value]?.slice(0, 1) !== "[" &&
                searchParams[value]?.slice(0, 1) !== "("
              ) {
                if (
                  value === "MlsStatus" ||
                  value === "PropertySubType" ||
                  value === "PropertyType" ||
                  value === "City" ||
                  value === "HighSchool" ||
                  value === "MiddleOrJuniorSchool" ||
                  value === "ElementarySchool" ||
                  value === "SubdivisionName" ||
                  value === "PostalCode"
                ) {
                  return (
                    <Box key={index} className={Styles.customChipArea}>
                      <Chip
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={`${formateKeys[value] || value}:`}
                        size="small"
                        className={Styles.customChipSimple}
                      />
                      <Chip
                        className={Styles.customChip}
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={
                          searchParams[value] === "Residential"
                            ? "For Sale"
                            : value === "PropertySubType"
                            ? `${
                                PropertySubType?.find(
                                  (et) => et?.value === searchParams[value]
                                )?.title || searchParams[value]
                              }`?.replaceAll(`"`, "")
                            : `${searchParams[value]?.replaceAll(`"`, "")}`
                        }
                        size="small"
                        onDelete={() => {
                          if (value !== "PropertyType") {
                            dispatch(
                              handleUpdateParams({
                                field: value,
                                value: "",
                                overwrite: true,
                              })
                            );
                          }
                        }}
                      />
                    </Box>
                  );
                } else {
                  return (
                    <Chip
                      key={index}
                      className={Styles.customChip}
                      deleteIcon={
                        <CloseRoundedIcon sx={{ color: "white !important" }} />
                      }
                      label={searchParams[value]?.replaceAll(`"`, "")}
                      size="small"
                      onDelete={() => {
                        dispatch(
                          handleUpdateParams({
                            field: value,
                            value: "",
                            overwrite: true,
                          })
                        );
                      }}
                    />
                  );
                }
              } else if (
                searchParams[value] &&
                typeof searchParams[value] === "string" &&
                searchParams[value]?.slice(0, 1) === "("
              ) {
                return splitMultipleValue(searchParams[value])?.map(
                  (ite: any, i: any) =>
                    i == 0 ? (
                      <Box key={index} className={Styles.customChipArea}>
                        <Chip
                          deleteIcon={
                            <CloseRoundedIcon
                              sx={{ color: "white !important" }}
                            />
                          }
                          label={`${formateKeys[value] || value}:`}
                          size="small"
                          className={Styles.customChipSimple}
                        />

                        <Chip
                          className={Styles.customChip}
                          deleteIcon={
                            <CloseRoundedIcon
                              sx={{ color: "white !important" }}
                            />
                          }
                          label={
                            value === "PropertySubType"
                              ? `${
                                  PropertySubType?.find(
                                    (et) => et?.value === ite
                                  )?.title || ite
                                }`?.replaceAll(`"`, "")
                              : ite?.replaceAll(`"`, "")
                          }
                          size="small"
                          onDelete={() => {
                            handleUpdateSearchValue(
                              value,
                              ite,
                              "multiple",
                              false
                            );
                          }}
                        />
                      </Box>
                    ) : (
                      <Chip
                        key={index}
                        className={Styles.customChip}
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={
                          value === "PropertySubType"
                            ? `${
                                PropertySubType?.find((et) => et?.value === ite)
                                  ?.title || ite
                              }`?.replaceAll(`"`, "")
                            : ite?.replaceAll(`"`, "")
                        }
                        size="small"
                        onDelete={() => {
                          handleUpdateSearchValue(
                            value,
                            ite,
                            "multiple",
                            false
                          );
                        }}
                      />
                    )
                );
              } else if (
                searchParams[value] &&
                typeof searchParams[value] === "string" &&
                searchParams[value]?.slice(0, 1) === "["
              ) {
                if (
                  decodeRangeValue(searchParams[value], "min") &&
                  decodeRangeValue(searchParams[value], "min") !== "*" &&
                  decodeRangeValue(searchParams[value], "max") &&
                  decodeRangeValue(searchParams[value], "max") !== "*"
                ) {
                  return searchParams[value]
                    ?.split("TO")
                    ?.map((item: any, index: any) => (
                      <Chip
                        key={index}
                        className={Styles.customChip}
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={
                          index == 0
                            ? `Min ${formateKeys[value] || value} ${
                                value === "ListPrice"
                                  ? decodeRangeValue(
                                      searchParams[value],
                                      "min",
                                      "notation"
                                    )
                                  : decodeRangeValue(searchParams[value], "min")
                              }`
                            : `Max ${formateKeys[value] || value} ${
                                value === "ListPrice"
                                  ? decodeRangeValue(
                                      searchParams[value],
                                      "max",
                                      "notation"
                                    )
                                  : decodeRangeValue(searchParams[value], "max")
                              }`
                        }
                        size="small"
                        onDelete={() => {
                          if (index == 0) {
                            handleUpdateSearchValue(
                              value,
                              "*",
                              "range",
                              false,
                              "min"
                            );
                          } else {
                            handleUpdateSearchValue(
                              value,
                              "*",
                              "range",
                              false,
                              "max"
                            );
                          }
                        }}
                      />
                    ));
                } else {
                  if (
                    decodeRangeValue(searchParams[value], "min") &&
                    decodeRangeValue(searchParams[value], "min") !== "*"
                  ) {
                    return (
                      <Chip
                        key={index}
                        className={Styles.customChip}
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={`Min ${formateKeys[value] || value} ${
                          value === "ListPrice"
                            ? decodeRangeValue(
                                searchParams[value],
                                "min",
                                "notation"
                              )
                            : decodeRangeValue(searchParams[value], "min")
                        }`}
                        size="small"
                        onDelete={() => {
                          handleUpdateSearchValue(
                            value,
                            "*",
                            "range",
                            false,
                            "min"
                          );
                        }}
                      />
                    );
                  } else {
                    return (
                      <Chip
                        key={index}
                        className={Styles.customChip}
                        deleteIcon={
                          <CloseRoundedIcon
                            sx={{ color: "white !important" }}
                          />
                        }
                        label={`Max ${formateKeys[value] || value} ${
                          value === "ListPrice"
                            ? decodeRangeValue(
                                searchParams[value],
                                "max",
                                "notation"
                              )
                            : decodeRangeValue(searchParams[value], "max")
                        }`}
                        size="small"
                        onDelete={() => {
                          handleUpdateSearchValue(
                            value,
                            "*",
                            "range",
                            false,
                            "max"
                          );
                        }}
                      />
                    );
                  }
                }
              }
            })}
            {showMore ? (
              <Button
                variant="contained"
                color="inherit"
                className={Styles.filterShowMoreBtn}
                size="small"
                onClick={() => {
                  setMoreFilters(!moreFilters);
                }}
              >
                More {showMore}+
              </Button>
            ) : null}
          </Box>
          <Box className={Styles.filterAreaBottomRight}>
            <Box className={Styles.filterAreaBottomRightItem}>
              {new URLSearchParams(window.location?.search).get("searchId") ===
              SearchId ? (
                <LoadingButton
                  onClick={() => {
                    if (!isAuthenticated) {
                      dispatch(
                        handleUpdateAuthPreview({
                          open: true,
                          previewType: "login",
                        })
                      );
                    } else {
                      dispatch(
                        updateSavedSearch({
                          searchId: new URLSearchParams(
                            window.location?.search
                          ).get("searchId"),
                          isGetProps: true,
                          handleSuccess,
                          handleError,
                        })
                      );
                    }
                  }}
                  className={Styles.filterAreaBottomSearchButton}
                  loading={Boolean(update?.isLoading)}
                  loadingPosition="start"
                >
                  Update Search
                </LoadingButton>
              ) : (
                <Button
                  onClick={() => {
                    if (!isAuthenticated) {
                      dispatch(
                        handleUpdateAuthPreview({
                          open: true,
                          previewType: "login",
                        })
                      );
                    } else {
                      setOpenSearch(true);
                    }
                  }}
                  className={Styles.filterAreaBottomSearchButton}
                >
                  Save Search
                </Button>
              )}
            </Box>
            <Divider orientation="vertical" variant="middle" />
            <Box
              onClick={handleClickSort}
              sx={{ cursor: "pointer" }}
              className={Styles.filterAreaBottomRightItem}
            >
              <SwitchLeftRoundedIcon sx={{ color: "grey", mr: "7px" }} />
              <Typography className={Styles.bottomTabsText}>Sort</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={openMenu}
        open={openSelectBox}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: "none",
            overflow: "visible",
            boxShadow: "0 0 10px rgba(0, 0, 0, .4) !important",
            mt: 0,
            zIndex: 0,
            borderRadius: "0px !important",
            bgcolor: "white",
            padding: openedSelectBox === "PropertySubType" ? "0px" : "0px 10px",
            "&:before": {
              background: "white",
              top: "-10px !important",
              content: '""',
              height: "10px",
              left: openedSelectBox === "moreOptions" ? "" : "0px !important",
              right: openedSelectBox === "moreOptions" ? "0px !important" : "",
              position: "absolute",
              width:
                openedSelectBox === "PropertySubType" ||
                openedSelectBox === "moreOptions"
                  ? "220px  !important"
                  : "140px !important",
              zIndex: 6,
            },
          },
        }}
        transformOrigin={{
          horizontal: openedSelectBox === "moreOptions" ? "right" : "left",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: openedSelectBox === "moreOptions" ? "right" : "left",
          vertical: "bottom",
        }}
      >
        <Box
          className={
            !openedSelectBox
              ? ""
              : openedSelectBox === "PropertySubType"
              ? Styles.selectBoxArea1
              : openedSelectBox === "moreOptions"
              ? Styles.selectBoxArea2
              : Styles.selectBoxArea
          }
        >
          {openedSelectBox === "ListPrice" ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Autocomplete
                filterOptions={filterOptionsPrice}
                options={
                  Number(
                    decodeRangeValue(searchParams?.ListPrice, "max") || 0
                  ) > 0
                    ? priceList?.filter(
                        (item: any) =>
                          Number(item.value) <
                            Number(
                              decodeRangeValue(searchParams?.ListPrice, "max")
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
                      )
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
              <Autocomplete
                filterOptions={filterOptionsPrice}
                options={
                  decodeRangeValue(searchParams?.ListPrice, "min") === "*" ||
                  !decodeRangeValue(searchParams?.ListPrice, "min")
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
                      )
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
          ) : null}
          {openedSelectBox === "BedroomsTotal" ? (
            <Fragment>
              <Box className={Styles.shortCutRangeSelection}>
                {Array.from(Array(7).keys()).map((item: any, index: any) => (
                  <Box
                    key={index}
                    className={
                      decodeRangeValue(searchParams?.BedroomsTotal, "min") ==
                        index ||
                      (decodeRangeValue(searchParams?.BedroomsTotal, "min") ===
                        "*" &&
                        index == 0)
                        ? Styles.shortCutRangeSelectionItemActive
                        : Styles.shortCutRangeSelectionItem
                    }
                    onClick={() => {
                      handleUpdateSearchValue(
                        "BedroomsTotal",
                        index == 0 ? "*" : index,
                        "range",
                        false,
                        "min",
                        true
                      );
                    }}
                  >
                    <Typography
                      className={
                        decodeRangeValue(searchParams?.BedroomsTotal, "min") ==
                          index ||
                        (decodeRangeValue(
                          searchParams?.BedroomsTotal,
                          "min"
                        ) === "*" &&
                          index == 0)
                          ? Styles.shortCutRangeSelectionItemTextActive
                          : Styles.shortCutRangeSelectionItemText
                      }
                    >
                      {decodeRangeValue(searchParams?.BedroomsTotal, "min") ==
                        index ||
                      (decodeRangeValue(searchParams?.BedroomsTotal, "min") ===
                        "*" &&
                        index == 0) ? (
                        <CheckRoundedIcon
                          fontSize="small"
                          sx={{ color: "white", display: "block", mb: -0.7 }}
                        />
                      ) : null}
                      {index == 0 ? "Any" : `${index}+`}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography className={Styles.rangeAboveText}>
                Or Select Bedroom Range
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Autocomplete
                  options={
                    Number(
                      decodeRangeValue(searchParams?.BedroomsTotal, "max") || 0
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
                            decodeRangeValue(searchParams?.BedroomsTotal, "min")
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
                <Autocomplete
                  options={
                    decodeRangeValue(searchParams?.BedroomsTotal, "min") ===
                      "*" ||
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
                            decodeRangeValue(searchParams?.BedroomsTotal, "max")
                        )
                      : null
                  }
                  fullWidth
                  id={"bedroomsMaxRang"}
                  getOptionLabel={(option) => option.title?.replace("+", "")}
                  open={openAutocomplete === "bedroomsMaxRang" ? true : false} // Control the open state of the dropdown
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
            </Fragment>
          ) : null}
          {openedSelectBox === keysConfig?.bathrooms ? (
            <Fragment>
              <Box className={Styles.shortCutRangeSelection}>
                {Array.from(Array(7).keys()).map((item: any, index: any) => (
                  <Box
                    key={index}
                    className={
                      decodeRangeValue(
                        searchParams[keysConfig?.bathrooms],
                        "min"
                      ) == index ||
                      (decodeRangeValue(
                        searchParams[keysConfig?.bathrooms],
                        "min"
                      ) === "*" &&
                        index == 0)
                        ? Styles.shortCutRangeSelectionItemActive
                        : Styles.shortCutRangeSelectionItem
                    }
                    onClick={() => {
                      handleUpdateSearchValue(
                        keysConfig?.bathrooms,
                        index == 0 ? "*" : index,
                        "range",
                        false,
                        "min",
                        true
                      );
                    }}
                  >
                    <Typography
                      className={
                        decodeRangeValue(
                          searchParams[keysConfig?.bathrooms],
                          "min"
                        ) == index ||
                        (decodeRangeValue(
                          searchParams[keysConfig?.bathrooms],
                          "min"
                        ) === "*" &&
                          index == 0)
                          ? Styles.shortCutRangeSelectionItemTextActive
                          : Styles.shortCutRangeSelectionItemText
                      }
                    >
                      {decodeRangeValue(
                        searchParams[keysConfig?.bathrooms],
                        "min"
                      ) == index ||
                      (decodeRangeValue(
                        searchParams[keysConfig?.bathrooms],
                        "min"
                      ) === "*" &&
                        index == 0) ? (
                        <CheckRoundedIcon
                          fontSize="small"
                          sx={{ color: "white", display: "block", mb: -0.7 }}
                        />
                      ) : null}
                      {index == 0 ? "Any" : `${index}+`}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography className={Styles.rangeAboveText}>
                Or Select Bathroom Range
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Autocomplete
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
                <Autocomplete
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
                  getOptionLabel={(option) => option.title?.replace("+", "")}
                  open={openAutocomplete === "bathroomsMaxRang" ? true : false} // Control the open state of the dropdown
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
            </Fragment>
          ) : null}
          {openedSelectBox === "PropertySubType" ? (
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              disablePadding
            >
              {PropertySubType.map((row) => {
                const labelId = `checkbox-list-label-${row.value}`;

                return (
                  <ListItem key={row.value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={() => {
                        handleUpdateSearchValue(
                          "PropertySubType",
                          row.value,
                          "multiple",
                          isChecked(searchParams?.PropertySubType, row.value)
                            ? false
                            : true
                        );
                      }}
                      dense
                    >
                      <ListItemIcon sx={{ minWidth: "40px" }}>
                        <Checkbox
                          edge="start"
                          checked={isChecked(
                            searchParams?.PropertySubType,
                            row.value
                          )}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                          sx={{
                            color: "#1a1a1a",
                            "&.Mui-checked": {
                              color: "#1a1a1a",
                            },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${row?.title}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : null}
          {openedSelectBox === "moreOptions" ? (
            <Fragment>
              <Box className={Styles.moreOptionsArea}>
                <Typography className={Styles.moreOptionsItemHeading}>
                  Status
                </Typography>
                <Box className={Styles.propertyTypeAreaItems}>
                  {statusList?.map((value: string, index: any) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={isChecked(searchParams?.MlsStatus, value)}
                          sx={{
                            "& .MuiSvgIcon-root": { fontSize: "28px" },
                            color: "#4c516d",
                            "&.Mui-checked": {
                              color: "#4c516d",
                            },
                          }}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleUpdateSearchValue(
                              "MlsStatus",
                              value,
                              "multiple",
                              event.target.checked
                            );
                          }}
                        />
                      }
                      label={value}
                      className={Styles.moreOptionsItemText}
                    />
                  ))}
                </Box>
                <Grid container spacing={4} sx={{ mt: "0px" }}>
                  <Grid item xs={12} md={6}>
                    <InputLabel className={Styles.moreOptionsItemHeading}>
                      Square Feet
                    </InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Autocomplete
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
                      <Autocomplete
                        options={
                          decodeRangeValue(
                            searchParams?.BuildingAreaTotal,
                            "min"
                          ) === "*" ||
                          !decodeRangeValue(
                            searchParams?.BuildingAreaTotal,
                            "min"
                          )
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
                        getOptionLabel={(option) =>
                          option.title?.replace("+", "")
                        }
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
                    <InputLabel className={Styles.moreOptionsItemHeading}>
                      Lot Size (Acres)
                    </InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Autocomplete
                        options={
                          Number(
                            decodeRangeValue(
                              searchParams?.LotSizeAcres,
                              "max"
                            ) || 0
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
                      <Autocomplete
                        options={
                          decodeRangeValue(
                            searchParams?.LotSizeAcres,
                            "min"
                          ) === "*" ||
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
                        getOptionLabel={(option) =>
                          option.title?.replace("+", "")
                        }
                        open={
                          openAutocomplete === "lotSizeMaxRang" ? true : false
                        } // Control the open state of the dropdown
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
                    <InputLabel className={Styles.moreOptionsItemHeading}>
                      Year Built
                    </InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Autocomplete
                        options={
                          Number(
                            decodeRangeValue(searchParams?.YearBuilt, "max") ||
                              0
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
                                  decodeRangeValue(
                                    searchParams?.YearBuilt,
                                    "min"
                                  )
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
                      <Autocomplete
                        options={
                          decodeRangeValue(searchParams?.YearBuilt, "min") ===
                            "*" ||
                          !decodeRangeValue(searchParams?.YearBuilt, "min")
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
                                  decodeRangeValue(
                                    searchParams?.YearBuilt,
                                    "max"
                                  )
                              )
                            : null
                        }
                        fullWidth
                        id={"yearMaxRang"}
                        getOptionLabel={(option) =>
                          option.title?.replace("+", "")
                        }
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
                            overwrite: true,
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
              </Box>
            </Fragment>
          ) : null}
        </Box>
      </Menu>

      <Menu
        anchorEl={anchorElSort}
        id="anchorElSort"
        open={openSort}
        onClose={handleCloseSort}
        onClick={handleCloseSort}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          selected={searchParams?.sort === "ListPrice desc" ? true : false}
          onClick={(e: any) => {
            dispatch(
              handleUpdateParams({
                field: "sort",
                value: "ListPrice desc",
                overwrite: true,
              })
            );
            handleCloseSort();
          }}
        >
          Price (High to Low)
        </MenuItem>
        <MenuItem
          selected={searchParams?.sort === "ListPrice asc" ? true : false}
          onClick={(e: any) => {
            dispatch(
              handleUpdateParams({
                field: "sort",
                value: "ListPrice asc",
                overwrite: true,
              })
            );
            handleCloseSort();
          }}
        >
          Price (Low to High)
        </MenuItem>
        <MenuItem
          selected={
            searchParams?.sort === "ModificationTimestamp desc" ? true : false
          }
          onClick={(e: any) => {
            dispatch(
              handleUpdateParams({
                field: "sort",
                value: "ModificationTimestamp desc",
                overwrite: true,
              })
            );
            handleCloseSort();
          }}
        >
          Newest
        </MenuItem>
      </Menu>
      <Dialog
        fullScreen
        open={openFilter && !isLargeScreen ? true : false}
        onClose={handleCloseFilter}
        TransitionComponent={Transition}
      >
        <Box className={Styles.smFilterTopTabs}>
          <Box
            onClick={handleCloseFilter}
            className={Styles.smFilterTopTabsItem}
          >
            <ArrowBackIosRoundedIcon sx={{ fontSize: "18px" }} />
            <Typography>Results</Typography>
          </Box>
          <Box
            onClick={() => {
              dispatch(handleResetSearchValue({}));
            }}
            className={Styles.smFilterTopTabsItem}
          >
            <CloseRoundedIcon sx={{ fontSize: "20px" }} />
            <Typography>Reset</Typography>
          </Box>
          <Box
            onClick={() => alert("Coming Soon")}
            className={Styles.smFilterTopTabsItem}
          >
            <StarRoundedIcon sx={{ fontSize: "23px" }} />
            <Typography>Save</Typography>
          </Box>
        </Box>
        <Box sx={{ paddingBottom: "20px", mt: "0px" }}>
          <AdvanceSearchForm />
        </Box>
      </Dialog>
      <SaveSearch open={openSearch} setOpen={setOpenSearch} />
      <ResponseAlert
        open={errorAlert.isOpen}
        setOpen={() =>
          setErrorAlert({ errorMsg: "", errorType: "", isOpen: false })
        }
        alertType={errorAlert.errorType}
        alertMessage={errorAlert.errorMsg}
      />
    </Box>
  );
}
export default FilterHeader;
