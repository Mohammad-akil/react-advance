import React, { Fragment, useState } from "react";
import {
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import Styles from "../../styles/property-detail-1/schoolData.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAddress } from "../../utils/propertyAddressFormat";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import icon1 from "../../assests/images/RatingIcons/1-large.png";
import icon2 from "../../assests/images/RatingIcons/2-large.png";
import icon3 from "../../assests/images/RatingIcons/3-large.png";
import icon4 from "../../assests/images/RatingIcons/4-large.png";
import icon5 from "../../assests/images/RatingIcons/5-large.png";
import icon6 from "../../assests/images/RatingIcons/6-large.png";
import icon7 from "../../assests/images/RatingIcons/7-large.png";
import icon8 from "../../assests/images/RatingIcons/8-large.png";
import icon9 from "../../assests/images/RatingIcons/9-large.png";
import icon10 from "../../assests/images/RatingIcons/10-large.png";
import iconNA from "../../assests/images/RatingIcons/na-large.png";
import greatSchoolsIcon from "../../assests/images/greatSchools.png";
import Image from "next/image";

const IconObj: any = {
  "1": icon1,
  "2": icon2,
  "3": icon3,
  "4": icon4,
  "5": icon5,
  "6": icon6,
  "7": icon7,
  "8": icon8,
  "9": icon9,
  "10": icon10,
};
interface schoolProps {
  [key: string]: any;
}
function NearSchoolsData(props: schoolProps) {
  const [limit, setLimit] = useState<number>(4);
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const schoolsData = useSelector(
    (state: RootState) => state.propertyDetail.schoolsData
  );
  const getActualSchoolName = (schoolName: string) => {
    if (schoolName?.includes("-")) {
      return schoolName?.split(" -")[0];
    } else {
      return schoolName;
    }
  };

  const getFilteredTopSchoolData = () => {
    let ourSchools: any = [];
    if (schoolsData?.length && listDetail?.data?.Coordinates) {
      let elementarySchool = schoolsData.find((option: any) =>
        option.name
          ?.replaceAll(" Charter", "")
          ?.toLowerCase()
          ?.includes(
            `${getActualSchoolName(
              listDetail?.data?.ElementarySchool
            )} Elementary`?.toLowerCase()
          )
      );

      let middleSchool = schoolsData.find((option: any) =>
        option.name
          ?.replaceAll(" Charter", "")
          ?.toLowerCase()
          ?.includes(
            `${getActualSchoolName(
              listDetail?.data?.MiddleOrJuniorSchool
            )} Middle`?.toLowerCase()
          )
      );
      let highSchool = schoolsData.find((option: any) =>
        option.name
          ?.replaceAll(" Charter", "")
          ?.toLowerCase()
          ?.includes(
            `${getActualSchoolName(
              listDetail?.data?.HighSchool
            )} High`?.toLowerCase()
          )
      );
      let otherSchools = schoolsData.filter(
        (option: any) =>
          !option.name
            ?.replaceAll(" Charter", "")
            ?.toLowerCase()
            ?.includes(
              `${getActualSchoolName(
                listDetail?.data?.ElementarySchool
              )} Elementary`?.toLowerCase()
            ) &&
          !option.name
            ?.replaceAll(" Charter", "")
            ?.toLowerCase()
            ?.includes(
              `${getActualSchoolName(
                listDetail?.data?.MiddleOrJuniorSchool
              )} Middle`?.toLowerCase()
            ) &&
          !option.name
            ?.replaceAll(" Charter", "")
            ?.toLowerCase()
            ?.includes(
              `${getActualSchoolName(
                listDetail?.data?.HighSchool
              )} High`?.toLowerCase()
            )
      );
      if (elementarySchool) {
        ourSchools.push({
          ...elementarySchool,
          schoolType: "Serves this Home",
        });
      }
      if (middleSchool) {
        ourSchools.push({ ...middleSchool, schoolType: "Serves this Home" });
      }
      if (highSchool) {
        ourSchools.push({ ...highSchool, schoolType: "Serves this Home" });
      }
      return [...ourSchools, ...otherSchools];
    } else {
      return [];
    }
  };

  return schoolsData?.length ? (
    <Fragment>
      <br />
      <Typography
        id="property-public-records"
        className={
          process.env.NEXT_PUBLIC_THEME === "2"
            ? Styles.listingStatsHeadingPC
            : Styles.theme1Heading
        }
        sx={{ padding: props.padding ? props.padding : "" }}
      >
        Schools near {formatAddress(listDetail?.data)}
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 300, mt: "10px" }} aria-label="simple table">
          <TableHead className={Styles.tableHeader}>
            <TableRow>
              <TableCell className={Styles.tableHeaderRow}>Rating</TableCell>
              <TableCell className={Styles.tableHeaderRow} align="left">
                School
              </TableCell>
              {isLargeScreen ? (
                <TableCell className={Styles.tableHeaderRow} align="left">
                  Type
                </TableCell>
              ) : null}
              {isLargeScreen ? (
                <TableCell className={Styles.tableHeaderRow} align="left">
                  Grades
                </TableCell>
              ) : null}

              <TableCell className={Styles.tableHeaderRow} align="left">
                Distance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredTopSchoolData()
              ?.slice(0, limit)
              .map((row: any) => (
                <TableRow
                  key={row["universal-id"]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={Styles.tableCell}
                    component="th"
                    scope="row"
                  >
                    {row.rating ? (
                      <Image
                        src={IconObj[row.rating]}
                        width={37}
                        height={37}
                        alt="rating"
                        priority
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={iconNA}
                        width={37}
                        height={37}
                        alt="rating na"
                        priority
                        unoptimized
                      />
                    )}
                  </TableCell>
                  <TableCell className={Styles.tableCell} align="left">
                    <a
                      className={Styles.tableCellLink}
                      href={row["overview-url"] || row["web-site"]}
                      target="_blank"
                    >
                      {" "}
                      {row.name}{" "}
                    </a>
                    {isLargeScreen ? null : (
                      <>
                        <br />
                        <span>
                          {row.type} -{" "}
                          {row["level"]
                            ? `${row["level"]?.split(",")[0]} to ${row["level"]
                                ?.split(",")
                                ?.slice(-1)}`
                            : null}
                        </span>
                        <br />
                        {row?.schoolType ? (
                          <span>{row?.schoolType}</span>
                        ) : (
                          <>Choice school</>
                        )}
                      </>
                    )}
                  </TableCell>
                  {isLargeScreen ? (
                    <TableCell className={Styles.tableCell} align="left">
                      {row.type} -{" "}
                      {row?.schoolType ? (
                        <span>{row?.schoolType}</span>
                      ) : (
                        <>Choice school</>
                      )}
                    </TableCell>
                  ) : null}
                  {isLargeScreen ? (
                    <TableCell className={Styles.tableCell} align="left">
                      {row["level"]
                        ? `${row["level"]?.split(",")[0]} to ${row["level"]
                            ?.split(",")
                            ?.slice(-1)}`
                        : null}
                    </TableCell>
                  ) : null}

                  <TableCell className={Styles.tableCell} align="left">
                    {row.distance?.toFixed(1)} mi
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          if (limit == 4) {
            setLimit(10);
          } else {
            setLimit(4);
          }
        }}
        variant="text"
        color="inherit"
        className={Styles.viewMoreButton}
        endIcon={limit == 10 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        {limit == 4 ? "View more" : "View less"}
      </Button>
      <Box className={Styles.greatSchoolsArea}>
        {" "}
        <Typography
          className={Styles.schoolDataDes}
          sx={{ padding: props.padding ? props.padding : "" }}
        >
          Data provided by Precisely and{" "}
          <a
            target="_blank"
            rel="nofollow"
            href={"https://www.greatschools.org/"}
          >
            GreatSchools.org
          </a>{" "}
          © 2024. All rights reserved. This information should only be used as a
          reference. Proximity or boundaries shown here are not a guarantee of
          enrollment. Please reach out to schools directly to verify all
          information and enrollment eligibility.
        </Typography>
        <a target="_blank" rel="nofollow" href={"https://www.greatschools.org"}>
          <Image
            src={greatSchoolsIcon}
            width={75}
            height={30}
            alt="rating"
            priority
            unoptimized
          />{" "}
        </a>
      </Box>
    </Fragment>
  ) : null;
}
export default NearSchoolsData;
