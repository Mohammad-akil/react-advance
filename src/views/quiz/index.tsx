"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Radio,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Styles from "../../styles/quiz/main.module.css";
import questionsData from "./questions.json";
import ResponseAlert from "../../components/shared/alert";
import { handleContact } from "../../store/listing/contact";
import { useAppDispatch } from "../../store/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
interface quizProps {
  [key: string]: any;
}

function QuizTemplate() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizDetail, setQuizDetail] = useState<quizProps>({
    refinance_home: null,
    first_time_purchasing: null,
    property_use: null,
    loan_amount_range: null,
    down_payment: null,
    credit_score: null,
    US_Military: null,
    employment_status: null,
    annual_income: null,
    first_name: null,
    last_name: null,
    email_address: null,
    phone_home: null,
  });
  const [errorAlert, setErrorAlert] = useState<{
    [key: string]: any;
  }>({
    errorMsg: "",
    errorType: "",
    isOpen: false,
  });
  const dispatch = useAppDispatch();
  const contactUs = useSelector(
    (state: RootState) => state.listingDetail.contactUs
  );
  const handleCalculatePercentage = () => {
    let diff = Math.ceil(100 / questionsData?.length);
    if (activeQuestion > 5) {
      return activeQuestion * diff + (100 - diff * (questionsData?.length - 1));
    } else {
      return activeQuestion * diff;
    }
  };

  const handleValidate = () => {
    let isValid = true;
    questionsData[activeQuestion].fields?.map((item: any, index: number) => {
      if (!quizDetail[item]) {
        setErrorAlert({
          errorMsg: `Please enter ${questionsData[activeQuestion].options[index]}`,
          errorType: "warning",
          isOpen: true,
        });
        isValid = false;
      }
    });
    return isValid;
  };

  const handleNext = () => {
    if (questionsData[activeQuestion].type === "input") {
      if (handleValidate()) {
        if (activeQuestion < questionsData.length - 1) {
          setActiveQuestion((active) => active + 1);
        }
      }
    } else {
      if (activeQuestion < questionsData.length - 1) {
        setActiveQuestion((active) => active + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeQuestion > 0) {
      setActiveQuestion((active) => active - 1);
    }
  };

  const handleSelectOption = (field: string, value: any) => {
    setQuizDetail({
      ...quizDetail,
      [field]: value,
    });
    setActiveQuestion((active) => active + 1);
  };

  const handleUpdateValue = (field: string, value: any) => {
    setQuizDetail({
      ...quizDetail,
      [field]: value,
    });
  };

  const handleSuccess = () => {
    setErrorAlert({
      errorMsg: "Your request is submitted successfully!",
      errorType: "success",
      isOpen: true,
    });
    setQuizDetail({
      refinance_home: null,
      first_time_purchasing: null,
      property_use: null,
      loan_amount_range: null,
      down_payment: null,
      credit_score: null,
      US_Military: null,
      employment_status: null,
      annual_income: null,
      first_name: null,
      last_name: null,
      email_address: null,
      phone_home: null,
    });
  };

  const handleError = (error: any) => {
    setErrorAlert({
      errorMsg: JSON.stringify(error),
      errorType: "error",
      isOpen: true,
    });
  };

  const handleSubmit = () => {
    if (handleValidate()) {
      let obj: any = {
        schema: {
          name: quizDetail.first_name + " " + quizDetail.last_name,
          email: quizDetail?.email_address,
          message: `Are you looking to buy or refinance a home? <br />
          ${quizDetail.refinance_home} <br /><br />
          Is this your first time purchasing a home? <br />
          ${quizDetail.first_time_purchasing} <br /><br />
          How will you use this home? <br />
          ${quizDetail.property_use} <br /><br />
          What is your price range? <br />
          ${quizDetail.loan_amount_range} <br /><br />
          How much are you saving for a down payment? <br />
          ${quizDetail.down_payment} <br /><br />
          What is your current employment status?  <br />
          ${quizDetail.employment_status} <br /><br />
          What is your household gross annual income (before taxes)? <br />
          ${quizDetail.annual_income} <br /><br />
          What is your current credit score? <br />
          ${quizDetail.credit_score} <br /><br />
          Have you (or your spouse) ever served in the US Military? <br />
          ${quizDetail.US_Military} <br /><br /><br />
          Name:  ${quizDetail?.first_name || ""} ${
            quizDetail?.last_name || ""
          }<br /><br />
          Email: ${quizDetail?.email_address || ""} <br />
          Phone:  ${quizDetail?.phone_home || ""} <br />
 ${window.location.href}`,
          phone: quizDetail?.phone_home,
          type: "quiz",
        },
        handleError,
        handleSuccess,
      };
      dispatch(handleContact(obj));
    }
  };
  return (
    <Container>
      <Box className={Styles.templateSection}>
        <Box className={Styles.templateSectionInner}>
          <Box className={Styles.percentageArea}>
            <Box className={Styles.percentageBox}>
              {handleCalculatePercentage() || 0}%
            </Box>
          </Box>
          <Box className={Styles.lineTop}></Box>
          <Box className={Styles.lineBottom}></Box>
          <Box className={Styles.quizSection}>
            <Box className={Styles.quizSectionInner}>
              <Typography className={Styles.questionHeading} variant="h1">
                {questionsData[activeQuestion]?.question}
              </Typography>

              {questionsData[activeQuestion]?.type === "multiple choice" ? (
                <Box
                  className={Styles.multiChoicesArea}
                  sx={{
                    flexDirection:
                      questionsData[activeQuestion]?.type === "half"
                        ? "row"
                        : "column",
                  }}
                >
                  {questionsData[activeQuestion]?.options?.map(
                    (item: any, index: number) => (
                      <Box
                        key={index}
                        className={Styles.choiceOption}
                        sx={{
                          width:
                            questionsData[activeQuestion]?.type === "half"
                              ? "220px"
                              : "300px",
                        }}
                        onClick={() =>
                          handleSelectOption(
                            questionsData[activeQuestion].field,
                            item
                          )
                        }
                      >
                        <Radio
                          checked={
                            quizDetail[questionsData[activeQuestion].field] ===
                            item
                              ? true
                              : false
                          }
                        />{" "}
                        <Typography className={Styles.choiceOptionText}>
                          {item}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              ) : null}
              {questionsData[activeQuestion]?.type === "input" ? (
                <Box className={Styles.questionTextFields}>
                  {questionsData[activeQuestion]?.options?.map(
                    (item: any, index: number) => (
                      <TextField
                        key={`${questionsData[activeQuestion]?.id}${index}`}
                        value={
                          quizDetail[
                            questionsData[activeQuestion]?.fields[index]
                          ]
                        }
                        className={Styles.textField}
                        fullWidth
                        onChange={(e: any) =>
                          handleUpdateValue(
                            questionsData[activeQuestion]?.fields[index],
                            e.target.value
                          )
                        }
                        variant="outlined"
                        placeholder={
                          questionsData[activeQuestion]?.placeholder || item
                        }
                      />
                    )
                  )}
                </Box>
              ) : null}

              {questionsData[activeQuestion]?.type === "dropdown" ? (
                <TextField
                  value={quizDetail[questionsData[activeQuestion]?.field]}
                  select
                  fullWidth
                >
                  {questionsData[activeQuestion]?.options?.map(
                    (item: any, index: number) => (
                      <MenuItem
                        onClick={() =>
                          handleSelectOption(
                            questionsData[activeQuestion].field,
                            item
                          )
                        }
                        key={index}
                        value={item}
                      >
                        {item}{" "}
                      </MenuItem>
                    )
                  )}
                </TextField>
              ) : null}

              <Box className={Styles.buttonsArea}>
                {activeQuestion > 0 ? (
                  <Button
                    size="large"
                    className={Styles.backButton}
                    variant="text"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : null}
                {(quizDetail[questionsData[activeQuestion].field] ||
                  questionsData[activeQuestion].type === "input") &&
                activeQuestion !== questionsData?.length - 1 ? (
                  <Button
                    size="large"
                    className={Styles.nextButton}
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : null}
                {activeQuestion === questionsData?.length - 1 ? (
                  <LoadingButton
                    size="large"
                    className={Styles.nextButton}
                    variant="contained"
                    onClick={handleSubmit}
                    loading={Boolean(contactUs?.isLoading)}
                    loadingPosition="start"
                  >
                    Let’s go!
                  </LoadingButton>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
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
export default QuizTemplate;
