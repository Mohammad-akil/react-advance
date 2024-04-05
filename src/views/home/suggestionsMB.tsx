import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import Styles from "../../styles/home/suggestions.module.css";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { handleUpdateParams } from "../../store/property-list";
import { useRouter } from "next/navigation";
import locationIcon from "../../assests/images/location.png";
import listingIcon from "../../assests/images/listingIcon.png";
import schoolIcon from "../../assests/images/schoolIcon.png";
import buildingIcon from "../../assests/images/buildingIcon.png";
import Image from "next/image";
import Styles1 from "../../styles/home/home.module.css";
import { searchKeys, generateValue } from "../../utils/propertyData";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SuggestionMBProps {
  [key: string]: any;
}

export default function SuggestionMB(props: SuggestionMBProps) {
  let { open, setOpen } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const suggestions = useSelector(
    (state: RootState) => state.propertyList.suggestions
  );

  const handleReturnOptions = () => {
    if (search?.length > 1) {
      let options: any = [];
      // Custom comparison function to sort based on the custom order
      const customSort = (a: any, b: any) => {
        const indexOfA = searchKeys.indexOf(a.group);
        const indexOfB = searchKeys.indexOf(b.group);
        if (indexOfA === -1) return 1; // Place unrecognized values at the end
        if (indexOfB === -1) return -1; // Place unrecognized values at the end

        return indexOfA - indexOfB;
      };
      let sortedArray = searchKeys.sort(customSort);

      sortedArray.map((item: any, index: number) => {
        let newOptions: any = suggestions[item]?.filter((option: any) =>
          generateValue(option, false)
            .toLowerCase()
            ?.startsWith(search.toLowerCase())
        );
        if (newOptions?.length) {
          let obj: any = {
            options: newOptions?.slice(0, 200),
            group: item,
          };
          options.push(obj);
        }
      });

      return options;
    } else {
      return [];
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box className={Styles.searchBar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <KeyboardBackspaceRoundedIcon />
        </IconButton>
        <Box className={Styles.searchField}>
          <TextField
            placeholder="City, Neighborhood, School, ZIP, MLS #"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Hide the border
                },
              },
            }}
            autoFocus
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
      <List sx={{ padding: "15px" }}>
        {handleReturnOptions()?.length ? (
          handleReturnOptions().map((group: any) => (
            <div key={group.group}>
              <h3 className={Styles1.groupIconArea}>
                {group.group === "City" ? (
                  <Image
                    src={locationIcon}
                    alt="locationIcon"
                    width={26}
                    height={26}
                  />
                ) : null}
                {group.group === "SubdivisionName" ? (
                  <Image
                    src={buildingIcon}
                    alt="buildingIcon"
                    width={26}
                    height={26}
                  />
                ) : null}
                {group.group === "PostalCode" ? (
                  <Image
                    src={listingIcon}
                    alt="listingIcon"
                    width={26}
                    height={26}
                  />
                ) : null}
                {group.group === "ElementarySchool" ||
                group.group === "HighSchool" ||
                group.group === "MiddleSchool" ||
                group.group === "MiddleOrJuniorSchool" ? (
                  <Image
                    src={schoolIcon}
                    alt="locationIcon"
                    width={26}
                    height={26}
                  />
                ) : null}
                {group.group.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              {group.options
                .filter((option: any) =>
                  generateValue(option, false)
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )

                .map((option: any) => (
                  <ListItem
                    onClick={() => {
                      dispatch(
                        handleUpdateParams({
                          field: group.group,
                          value: generateValue(option, true)?.includes("OR")
                            ? `(${generateValue(option, true)})`
                            : generateValue(option, true),
                          isReset: true,
                        })
                      );
                      handleClose();
                      router.push(`/property-search/results`);
                    }}
                    key={option?.friendlyName}
                    button
                  >
                    <ListItemText primary={option?.friendlyName} />
                  </ListItem>
                ))}
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary={"Start typing above to see suggested results"}
              sx={{
                "& .MuiTypography-root": {
                  color: "#999",
                  fontFamily: "AvenirNextLTPro-Regular",
                  fontSize: "15px",
                },
              }}
            />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
