import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Styles from "../../styles/makeover/detail.module.css";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GetInTech from "./getInTech";
function MakeoverDetail() {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <Box className={Styles.makeoverDetailArea}>
      <Typography className={Styles.makeoverDetailHeading}>DETAILS</Typography>
      <Typography className={Styles.detailDescription}>
        You will send all invoices to your agent for payment by Method. At
        closing, Method Makeover will issue an invoice for the exact cost of the
        services rendered. In the event the property does not sell or the
        listing agreement is terminated for any reason, Method Makeover will
        still only collect the cost of the services performed.
      </Typography>
      <br />
      <Typography className={Styles.detailDescription}>
        No matter if it takes 4 days or 4 months to sell your home,{" "}
        <span>you will never be charged any interest or fees.</span>
      </Typography>
      <Box className={Styles.buttonArea}>
        <Button
          onClick={() => setOpen(true)}
          endIcon={<ChevronRightRoundedIcon />}
          className={Styles.button}
        >
          Get In Touch
        </Button>
      </Box>
      <GetInTech open={open} setOpen={setOpen} />
    </Box>
  );
}
export default MakeoverDetail;
