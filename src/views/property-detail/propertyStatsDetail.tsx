import Styles from "../../styles/property-detail/statdetail.module.css";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NumberFormat } from "../../utils/numberFormat";
import { formatAddress,getAcres } from "../../utils/propertyAddressFormat";
function PropertyStatDetail() {
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  return (
    <Box className={Styles.statDetailArea}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6} >
          <Box className={Styles.statDetailAreaPC}>
            <Typography className={Styles.statDetailHeading}>
              COMMUNITY INFORMATION
            </Typography>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Address:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {formatAddress(listDetail?.data)}, {listDetail?.data?.City},{" "}
                  {listDetail?.data?.StateOrProvince}{" "}
                  {listDetail?.data?.PostalCode}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  County:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.CountyOrParish}
                </Typography>
              </Stack>
            </Box>

            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  City:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.City}
                </Typography>
              </Stack>
            </Box>

            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Township:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  --
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Subdivision:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.SubdivisionName}
                </Typography>
              </Stack>
            </Box>

            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Zip Code:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.PostalCode}
                </Typography>
              </Stack>
            </Box>
            <br />
            <br />
            <Typography className={Styles.statDetailHeading}>
              FEATURES / AMENITIES
            </Typography>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Interior Features:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.InteriorFeatures?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Appliances:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.Appliances?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Exterior Features:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.ExteriorFeatures?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Heating:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.Heating?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Total Rooms:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  7
                </Typography>
              </Stack>
            </Box>

            <br />
            <br />
            <Typography className={Styles.statDetailHeading}>
              PROPERTY FEATURES
            </Typography>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Lot Size:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {getAcres(listDetail?.data)} Acres
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Lot Dimensions:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.LotSizeDimensions}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Lot Features:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.LotFeatures?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Directions:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.Directions}
                </Typography>
              </Stack>
            </Box>

            <br />
            <br />
            <Typography className={Styles.statDetailHeading}>
              TAX AND FINANCIAL INFO
            </Typography>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Tax Year:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.TaxYear}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Tax Annual Amount:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {NumberFormat({
                    number: listDetail?.data?.TaxAnnualAmount,
                    currency: "USD",
                  })}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Listing Terms:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.BuyerFinancing?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Association Fee:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {NumberFormat({
                    number: listDetail?.data?.AssociationFee,
                    currency: "USD",
                  })}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box className={Styles.statDetailAreaMB}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>COMMUNITY INFORMATION</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Address:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {formatAddress(listDetail?.data)},{" "}
                      {listDetail?.data?.City},{" "}
                      {listDetail?.data?.StateOrProvince}{" "}
                      {listDetail?.data?.PostalCode}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      County:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.CountyOrParish}
                    </Typography>
                  </Stack>
                </Box>

                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      City:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.City}
                    </Typography>
                  </Stack>
                </Box>

                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Township:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      --
                    </Typography>
                  </Stack>
                </Box>

                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Subdivision:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.SubdivisionName}
                    </Typography>
                  </Stack>
                </Box>

                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Zip Code:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.PostalCode}
                    </Typography>
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>FEATURES / AMENITIES</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Interior Features:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.InteriorFeatures?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Appliances:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.Appliances?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Exterior Features:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.ExteriorFeatures?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Heating:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.Heating?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Total Rooms:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      7
                    </Typography>
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>PROPERTY FEATURES</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Lot Size:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.LotSizeAcres} Acres
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Lot Dimensions:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.LotSizeDimensions}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Lot Features:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.LotFeatures?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Directions:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.Directions}
                    </Typography>
                  </Stack>
                </Box>{" "}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>TAX AND FINANCIAL INFO</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Tax Year:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.TaxYear}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Tax Annual Amount:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {NumberFormat({
                        number: listDetail?.data?.TaxAnnualAmount,
                        currency: "USD",
                      })}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Listing Terms:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.BuyerFinancing?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Association Fee:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {NumberFormat({
                        number: listDetail?.data?.AssociationFee,
                        currency: "USD",
                      })}
                    </Typography>
                  </Stack>
                </Box>{" "}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>SCHOOL INFORMATION</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                {listDetail?.data?.MiddleOrJuniorSchool ? (
                  <Box className={Styles.statDetailStatsItem}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography className={Styles.statDetailStatsItemHeading}>
                        Middle Or Junior School:
                      </Typography>
                      <Typography className={Styles.statDetailStatsItemValues}>
                        {listDetail?.data?.MiddleOrJuniorSchool}
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
                {listDetail?.data?.ElementarySchool ? (
                  <Box className={Styles.statDetailStatsItem}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography className={Styles.statDetailStatsItemHeading}>
                        Elementary School:
                      </Typography>
                      <Typography className={Styles.statDetailStatsItemValues}>
                        {listDetail?.data?.ElementarySchool}
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
                {listDetail?.data?.HighSchool ? (
                  <Box className={Styles.statDetailStatsItem}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography className={Styles.statDetailStatsItemHeading}>
                        High School:
                      </Typography>
                      <Typography className={Styles.statDetailStatsItemValues}>
                        {listDetail?.data?.HighSchool}
                      </Typography>
                    </Stack>
                  </Box>
                ) : null}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>ARCHITECTURE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Unit Number:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      #1
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Bedrooms:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.BedroomsTotal}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Bathrooms:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.BathroomsFull} Full /{" "}
                      {listDetail?.data?.BathroomsHalf} Half
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Year Built:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.YearBuilt}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Style:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.ArchitecturalStyle?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>
                <Box className={Styles.statDetailStatsItem}>
                  <Stack direction={"row"} spacing={1}>
                    <Typography className={Styles.statDetailStatsItemHeading}>
                      Parking Features:
                    </Typography>
                    <Typography className={Styles.statDetailStatsItemValues}>
                      {listDetail?.data?.ParkingFeatures?.join(", ")}
                    </Typography>
                  </Stack>
                </Box>{" "}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box className={Styles.statDetailAreaPC}>
            <Typography className={Styles.statDetailHeading}>
              SCHOOL INFORMATION
            </Typography>
            {listDetail?.data?.MiddleOrJuniorSchool ? (
              <Box className={Styles.statDetailStatsItem}>
                <Stack direction={"row"} spacing={1}>
                  <Typography className={Styles.statDetailStatsItemHeading}>
                    Middle Or Junior School:
                  </Typography>
                  <Typography className={Styles.statDetailStatsItemValues}>
                    {listDetail?.data?.MiddleOrJuniorSchool}
                  </Typography>
                </Stack>
              </Box>
            ) : null}
            {listDetail?.data?.ElementarySchool ? (
              <Box className={Styles.statDetailStatsItem}>
                <Stack direction={"row"} spacing={1}>
                  <Typography className={Styles.statDetailStatsItemHeading}>
                    Elementary School:
                  </Typography>
                  <Typography className={Styles.statDetailStatsItemValues}>
                    {listDetail?.data?.ElementarySchool}
                  </Typography>
                </Stack>
              </Box>
            ) : null}
            {listDetail?.data?.HighSchool ? (
              <Box className={Styles.statDetailStatsItem}>
                <Stack direction={"row"} spacing={1}>
                  <Typography className={Styles.statDetailStatsItemHeading}>
                    High School:
                  </Typography>
                  <Typography className={Styles.statDetailStatsItemValues}>
                    {listDetail?.data?.HighSchool}
                  </Typography>
                </Stack>
              </Box>
            ) : null}
            <br />
            <br />
            <Typography className={Styles.statDetailHeading}>
              ARCHITECTURE
            </Typography>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Unit Number:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  #1
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Bedrooms:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.BedroomsTotal}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Bathrooms:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.BathroomsFull} Full /{" "}
                  {listDetail?.data?.BathroomsHalf} Half
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Year Built:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.YearBuilt}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Style:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.ArchitecturalStyle?.join(", ")}
                </Typography>
              </Stack>
            </Box>
            <Box className={Styles.statDetailStatsItem}>
              <Stack direction={"row"} spacing={1}>
                <Typography className={Styles.statDetailStatsItemHeading}>
                  Parking Features:
                </Typography>
                <Typography className={Styles.statDetailStatsItemValues}>
                  {listDetail?.data?.ParkingFeatures?.join(", ")}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default PropertyStatDetail;
