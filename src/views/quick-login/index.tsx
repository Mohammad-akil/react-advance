"use client";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { quickLogin } from "../../store/auth/quickLogin";
import { useAppDispatch } from "../../store/store";

interface quickLoginProps {
  [key: string]: any;
}
function QuickLogin(props: quickLoginProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSuccess = () => {};

  const handleError = (error: any) => {};
  useEffect(() => {
    if (props.id) {
      dispatch(
        quickLogin({
          token: props.id,
          handleSuccess,
          handleError,
        })
      );
      let utm_source: any = props?.utm_source
        ? `?utm_source=${props?.utm_source}`
        : ``;
      router.push(
        props.next
          ? `/${props.next}${utm_source}`
          : `/property-search/results${utm_source}`
      );
    }
  }, [props.id]);

  return <Box></Box>;
}
export default QuickLogin;
