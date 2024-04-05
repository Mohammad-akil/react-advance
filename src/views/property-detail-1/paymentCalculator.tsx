import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
  Slider,
  Button,
} from "@mui/material";
import Styles from "../../styles/property-detail-1/calculator.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import SquareIcon from "@mui/icons-material/Square";
import { CustomTooltip } from "../../components/shared/tooltip";
import { NumberFormat } from "../../utils/numberFormat";
function PaymentCalculator() {
  const [isReadMore, setIsReadMore] = useState<Boolean>(false);
  const [propertyInfo, setPropertyInfo] = useState<{ [key: string]: any }>({
    interestRate: Number(process.env.NEXT_PUBLIC_PROPERTY_INTEREST_RATE || 0),
    loanTerm: 30,
    downPayment: 0,
    downPaymentPercent: 20,
    propertyPrice: 0,
  });
  const [focusedField, setFocusedField] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<any>(0);
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );

  const calculatePayment = (
    propertyPrice: any,
    downPayment: any,
    interestRate: any,
    loanTerm: any
  ) => {
    // Convert annual interest rate to monthly rate
    const monthlyInterestRate =
      interestRate && interestRate > 0 ? interestRate / 100 / 12 : 0;
    // Calculate the number of monthly payments
    const numberOfPayments = loanTerm * 12;

    // Calculate the monthly payment using the formula
    if (monthlyInterestRate > 0) {
      const monthlyPayment =
        ((propertyPrice - downPayment) *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setMonthlyPayment(monthlyPayment?.toFixed(0));
    } else {
      let payment: any = (propertyPrice - downPayment) / numberOfPayments;
      setMonthlyPayment(payment?.toFixed(0));
    }
  };

  useEffect(() => {
    if (propertyInfo?.propertyPrice > 0) {
      let downPaymentNew =
        (Number(propertyInfo.downPaymentPercent) / 100) *
        Number(listDetail?.data?.ListPrice || 0);
      calculatePayment(
        propertyInfo?.propertyPrice,
        downPaymentNew,
        propertyInfo?.interestRate,
        propertyInfo?.loanTerm
      );
    }
  }, [propertyInfo]);

  useEffect(() => {
    if (listDetail?.data?.ListingId) {
      setPropertyInfo({
        ...propertyInfo,
        propertyPrice: Number(listDetail?.data?.ListPrice || 0),
        downPayment:
          (Number(propertyInfo.downPaymentPercent) / 100) *
          Number(listDetail?.data?.ListPrice || 0),
      });
    }
  }, [listDetail?.data?.ListingId]);

  const handleUpdateValue = (field: string, value: any) => {
    if (field === "downPayment") {
      let downPaymentPercentNew = value
        ? (value / propertyInfo.propertyPrice) * 100
        : 0;
      setPropertyInfo((info) => ({
        ...info,
        [field]: value,
        downPaymentPercent: downPaymentPercentNew,
      }));
    } else if (field === "downPaymentPercent") {
      let downPaymentNew = value
        ? (value / 100) * propertyInfo.propertyPrice
        : 0;
      setPropertyInfo((info) => ({
        ...info,
        [field]: value,
        downPayment: downPaymentNew,
      }));
    } else {
      setPropertyInfo((info) => ({ ...info, [field]: value }));
    }
  };

  const calculateAnnualTaxAmount = () => {
    if (listDetail?.data?.TaxAnnualAmount) {
      return Number(listDetail?.data?.TaxAnnualAmount);
    } else {
      return (
        Number(
          listDetail?.data?.ListPrice ||
            listDetail?.data?.OriginalListPrice ||
            0
        ) * 0.06
      );
    }
  };

  return (
    <Box className={Styles.paymentCalculator}>
      <Typography className={Styles.paymentCalculatorHeading}>
        Payment Calculator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box className={Styles.calculatorMainArea}>
            <Typography className={Styles.calculatorMainAmount}>
              {NumberFormat({
                number:
                  Number(monthlyPayment) +
                  calculateAnnualTaxAmount() / 12 +
                  Number(listDetail?.data?.AssociationFee || 0) / 12,
                currency: "USD",
              })}{" "}
              per month
            </Typography>
            <Typography className={Styles.calculatorMainInterest}>
              {propertyInfo.loanTerm} year fixed, {propertyInfo.interestRate}%
              Interest
            </Typography>
            <Box className={Styles.calculatorBar}>
              <Box
                className={Styles.calculatorBarInterest}
                sx={{
                  width: `${
                    ((Number(monthlyPayment) -
                      (calculateAnnualTaxAmount() / 12 +
                        Number(listDetail?.data?.AssociationFee || 0) / 12)) /
                      Number(monthlyPayment)) *
                    100
                  }%`,
                }}
              ></Box>
              <Box
                className={Styles.calculatorBarTax}
                sx={{
                  width: `${
                    (calculateAnnualTaxAmount() / 12 / Number(monthlyPayment)) *
                    100
                  }%`,
                }}
              ></Box>
              <Box
                className={Styles.calculatorBarDues}
                sx={{
                  width: `${
                    (Number(listDetail?.data?.AssociationFee || 0) /
                      12 /
                      Number(monthlyPayment)) *
                    100
                  }%`,
                }}
              ></Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box className={Styles.calculatorStatsArea}>
            <Box className={Styles.calculatorStatsAreaItem}>
              <Box className={Styles.calculatorStatsAreaItemLeft}>
                {" "}
                <SquareIcon
                  fontSize="small"
                  sx={{ color: "#1b39ef", fontSize: "15px" }}
                />{" "}
                <Typography
                  className={Styles.calculatorStatsAreaItemLeftContent}
                >
                  Principal and Interest
                </Typography>
              </Box>
              <Typography className={Styles.calculatorStatsAreaRight}>
                {NumberFormat({
                  number: monthlyPayment,
                  currency: "USD",
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Box className={Styles.calculatorStatsAreaItem}>
              <Box className={Styles.calculatorStatsAreaItemLeft}>
                {" "}
                <SquareIcon
                  fontSize="small"
                  sx={{ color: "#59a1fa", fontSize: "15px" }}
                />{" "}
                <Typography
                  className={Styles.calculatorStatsAreaItemLeftContent}
                >
                  Property Taxes
                </Typography>
              </Box>
              <Typography className={Styles.calculatorStatsAreaRight}>
                {listDetail?.data?.TaxAnnualAmount
                  ? NumberFormat({
                      number: Number(listDetail?.data?.TaxAnnualAmount) / 12,
                      currency: "USD",
                      maximumFractionDigits: 2,
                    })
                  : NumberFormat({
                      number: calculateAnnualTaxAmount() / 12,
                      currency: "USD",
                      maximumFractionDigits: 2,
                    }) || "$0"}
              </Typography>
            </Box>
            <Box className={Styles.calculatorStatsAreaItem}>
              <Box className={Styles.calculatorStatsAreaItemLeft}>
                {" "}
                <SquareIcon
                  fontSize="small"
                  sx={{ color: "#b0c5e8", fontSize: "15px" }}
                />{" "}
                <Typography
                  className={Styles.calculatorStatsAreaItemLeftContent}
                >
                  HOA Dues
                </Typography>
              </Box>
              <Typography className={Styles.calculatorStatsAreaRight}>
                {listDetail?.data?.AssociationFee
                  ? NumberFormat({
                      number:
                        Number(listDetail?.data?.AssociationFee || 0) / 12,
                      currency: "USD",
                    })
                  : "$0"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "15px" }}>
        <Grid item xs={12} sm={12} md={6}>
          <InputLabel className={Styles.fieldLabelCal}>Term</InputLabel>
          <TextField
            select
            onChange={(e) => handleUpdateValue("loanTerm", e.target.value)}
            value={propertyInfo?.loanTerm}
            fullWidth
            size="small"
          >
            <MenuItem value={30}>30 Years Fixed</MenuItem>
            <MenuItem value={20}>20 Years Fixed</MenuItem>
            <MenuItem value={15}>15 Years Fixed</MenuItem>
            <MenuItem value={10}>10 Years Fixed</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputLabel className={Styles.fieldLabelCal}>Interest</InputLabel>
          <TextField
            value={
              focusedField === "interestRate"
                ? propertyInfo?.interestRate
                : `${propertyInfo?.interestRate}%`
            }
            onFocus={() => setFocusedField("interestRate")}
            onBlur={() => setFocusedField("")}
            onChange={(e) => {
              if (
                (Number(e.target.value) > 0 && Number(e.target.value) < 11) ||
                !e.target.value
              ) {
                handleUpdateValue("interestRate", e.target?.value);
              }
            }}
            type={focusedField === "interestRate" ? "number" : "text"}
            fullWidth
            size="small"
          />
          <Slider
            max={10}
            min={0}
            step={0.1}
            value={propertyInfo?.interestRate}
            onChange={(e: any) =>
              handleUpdateValue("interestRate", e.target?.value)
            }
            sx={{ mt: "15px" }}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputLabel className={Styles.fieldLabelCal}>
            Home Price{" "}
            <CustomTooltip
              title={
                listDetail?.data?.OriginalListPrice ||
                listDetail?.data?.ListPrice
                  ? NumberFormat({
                      number:
                        listDetail?.data?.ListPrice ||
                        listDetail?.data?.OriginalListPrice,
                      currency: "USD",
                    })
                  : null
              }
              placement="top"
            >
              <ErrorIcon fontSize="small" sx={{ cursor: "pointer" }} />
            </CustomTooltip>
          </InputLabel>
          <TextField
            value={
              focusedField === "propertyPrice"
                ? propertyInfo?.propertyPrice
                : `${NumberFormat({
                    number: propertyInfo?.propertyPrice,
                    currency: "USD",
                  })}`
            }
            onFocus={() => setFocusedField("propertyPrice")}
            onBlur={() => setFocusedField("")}
            onChange={(e) => {
              if (
                (Number(e.target.value) > 0 &&
                  Number(e.target.value) <
                    Number(listDetail?.data?.ListPrice) +
                      Number(listDetail?.data?.ListPrice) * 0.25) ||
                !e.target.value
              ) {
                handleUpdateValue("propertyPrice", e.target?.value);
              }
            }}
            type={focusedField === "propertyPrice" ? "number" : "text"}
            fullWidth
            size="small"
          />
          <Slider
            max={
              Number(listDetail?.data?.ListPrice) +
              Number(listDetail?.data?.ListPrice) * 0.25
            }
            min={
              Number(listDetail?.data?.ListPrice) -
              Number(listDetail?.data?.ListPrice) * 0.25
            }
            step={1}
            value={propertyInfo?.propertyPrice}
            onChange={(e: any) =>
              handleUpdateValue("propertyPrice", e.target?.value)
            }
            sx={{ mt: "15px" }}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputLabel className={Styles.fieldLabelCal}>
            Down Payment{" "}
          </InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8}>
              {" "}
              <TextField
                value={
                  focusedField === "downPayment"
                    ? propertyInfo?.downPayment
                    : `${NumberFormat({
                        number: propertyInfo?.downPayment,
                        currency: "USD",
                      })}`
                }
                onFocus={() => setFocusedField("downPayment")}
                onBlur={() => setFocusedField("")}
                onChange={(e) => {
                  if (
                    (Number(e.target.value) > 0 &&
                      Number(e.target.value) <
                        Number(listDetail?.data?.ListPrice || 0)) ||
                    !e.target.value
                  ) {
                    handleUpdateValue("downPayment", e.target?.value);
                  }
                }}
                type={focusedField === "downPayment" ? "number" : "text"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              {" "}
              <TextField
                value={
                  focusedField === "downPaymentPercent"
                    ? propertyInfo?.downPaymentPercent
                    : `${NumberFormat({
                        number: propertyInfo?.downPaymentPercent,
                      })}%`
                }
                onFocus={() => setFocusedField("downPaymentPercent")}
                onBlur={() => setFocusedField("")}
                onChange={(e) => {
                  if (
                    (Number(e.target.value) > 0 &&
                      Number(e.target.value) < 100) ||
                    !e.target.value
                  ) {
                    handleUpdateValue("downPaymentPercent", e.target?.value);
                  }
                }}
                type={focusedField === "downPaymentPercent" ? "number" : "text"}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Slider
            max={Number(
              listDetail?.data?.ListPrice || listDetail?.data?.OriginalListPrice
            )}
            min={0}
            step={1}
            value={propertyInfo?.downPayment}
            onChange={(e: any) =>
              handleUpdateValue("downPayment", e.target?.value)
            }
            sx={{ mt: "15px" }}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      <Typography className={Styles.calculatorReadMore}>
        {isReadMore
          ? `The Payment Calculator is for illustrative purposes only. Calculations are dependent upon the information you enter; actual rates/costs fluctuate subject to the market, and may include costs not displayed. The Payment Calculator is not a commitment to lend. Use of the Payment Calculator is discretionary, and ${process.env.NEXT_PUBLIC_COMPANY_SHORT_NAME} expressly disclaims to the fullest extent permitted by law any liability in connection with any such use.`
          : "The Payment Calculator is for illustrative purposes only."}

        <Button
          variant="text"
          size="small"
          className={Styles.calculatorReadMoreButton}
          onClick={() => setIsReadMore(!isReadMore)}
        >
          {isReadMore ? "Read Less" : "Read More"}
        </Button>
      </Typography>
    </Box>
  );
}
export default PaymentCalculator;
