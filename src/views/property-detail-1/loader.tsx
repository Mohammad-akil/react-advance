import React from "react";
import { Container, Skeleton, Grid, Box } from "@mui/material";
import Styles from "../../styles/property-detail-1/main.module.css";
import Image from "next/image";
function LoadingSkelton(props: any) {
  let { paginationList, ListingId } = props;
  return (
    <Container className={Styles.propertyContainer} sx={{ minHeight: "100vh" }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="60px"
        width="100%"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ mt: "10px" }}
            height="50px"
            width="100%"
          />{" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ mt: "10px" }}
            height="500px"
            width="100%"
          />{" "}
          {Array.from(Array(15).keys()).map((item: any, index: number) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rectangular"
              sx={{ mt: index === 0 ? "30px" : "5px" }}
              height="30px"
              width="100%"
            />
          ))}
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ mt: "30px" }}
            height="40px"
            width="60%"
          />{" "}
          <Grid container spacing={3} sx={{ mt: "30px" }}>
            {Array.from(Array(15).keys()).map((item: any, index: number) => (
              <Grid key={index} item xs={6} md={6}>
                <Skeleton
                  key={index}
                  animation="wave"
                  variant="rectangular"
                  sx={{ mt: "0px" }}
                  height="40px"
                  width="100%"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          {Array.from(Array(8).keys()).map((item: any, index: number) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rectangular"
              sx={{ mt: index === 0 ? "70px" : "5px" }}
              height="50px"
              width="100%"
            />
          ))}

          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ mt: "100px" }}
            height="500px"
            width="100%"
          />
        </Grid>
      </Grid>
      {paginationList?.length &&
      paginationList?.find((it: any) => it.ListingId === ListingId)?.image ? (
        <Box sx={{ visibility: "hidden", height: "0px", overflow: "none" }}>
          <Image
            sizes="100vw"
            width={500}
            height={300}
            className={Styles.responsiveImage}
            alt="MediaURL"
            src={
              paginationList?.find((it: any) => it.ListingId === ListingId)
                ?.image
            }
            unoptimized={true}
            priority
          />
        </Box>
      ) : null}
    </Container>
  );
}
export default LoadingSkelton;
