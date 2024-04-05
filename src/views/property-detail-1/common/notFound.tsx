import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Styles from "../../../styles/property-detail-1/main.module.css";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useRouter } from "next/navigation";
function NotFoundProperty(props: any) {
  let { MlsStatus } = props;
  const router = useRouter();
  return (
    <Box className={Styles.outerBoxNotFound}>
      <Box className={Styles.innerBoxNotFound}>
        <center>
          <ContentPasteSearchIcon sx={{ fontSize: "120px", color: "grey" }} />
          <Typography className={Styles.NotFoundText}>
            {" "}
            {MlsStatus === "Withdrawn"
              ? "This listing has been withdrawn and is no longer available"
              : " Sorry that record doesn't exist, try a new search"}
          </Typography>
          <Button
            onClick={() => {
              router.push("/property-search/advance-search");
            }}
            className={Styles.NotFoundButton}
          >
            New Search
          </Button>
        </center>
      </Box>
    </Box>
  );
}
export default NotFoundProperty;
