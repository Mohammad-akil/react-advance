import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Styles from "../../styles/property-detail-1/listingAgent.module.css";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "../../utils/common";
import { storeEvent } from "../../store/events/storeEvent";
import { useAppDispatch } from "../../store/store";
interface agentProps {
  [key: string]: any;
}

function ListingAgent(props: agentProps) {
  const router = useRouter();
  let { isReplace, assignedAgent } = props;
  const dispatch = useAppDispatch();
  const agentDetail = useSelector(
    (state: RootState) => state.propertyDetail.agentDetail
  );
  const authDetail = useSelector((state: RootState) => state.auth.authDetail);

  return agentDetail?._id &&
    !assignedAgent &&
    !(
      (authDetail?.stage === "Buying" ||
        authDetail?.stage === "Engaged" ||
        authDetail?.source === "Agent Sourced") &&
      authDetail?.assignedAgent?.profileImg
    ) ? (
    <Box
      className={Styles.agentInfoArea}
      sx={{ mb: isReplace ? "40px !important" : "" }}
    >
      <Typography className={Styles.agentInfoHeading}>Listing Agent</Typography>
      <Box className={Styles.agentInfoContent}>
        <Avatar
          src={agentDetail?.profileImg}
          sx={{ width: "96px", height: "96px" }}
          title={agentDetail?.firstName}
        />
        <Box
          className={Styles.agentInfoContentDesc}
          sx={{
            display: isReplace ? "flex" : "block",
            justifyContent: isReplace ? "space-between" : "",
            alignItems: isReplace ? "center" : "",
          }}
        >
          <Box sx={{ width: isReplace ? "35%" : "100%" }}>
            <Typography
              onClick={() => router.push(`/agents/${agentDetail?._id}`)}
              className={Styles.agentInfoContentName}
            >
              {agentDetail?.firstName} {agentDetail?.lastName}
            </Typography>
            <Typography className={Styles.agentInfoContentNameBT}>
              Listing Agent
            </Typography>
          </Box>
          <Box sx={{ width: isReplace ? "60%" : "100%" }}>
            <Typography
              component={"a"}
              href={`mailto:${agentDetail?.email}`}
              className={Styles.agentInfoContentInfoEmail}
            >
              {agentDetail?.email}
            </Typography>
            <Typography
              component={"a"}
              href={`tel:${agentDetail?.phone}`}
              className={Styles.agentInfoContentInfoEmail}
              sx={{ display: "block" }}
              onClick={() => {
                dispatch(
                  storeEvent({
                    type: "Incoming Call",
                    description: `Lead called ${agentDetail?.phone}`,
                  })
                );
              }}
            >
              {formatPhoneNumber(agentDetail?.phone)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={Styles.contactTabsSm}>
        <Box
          component={"a"}
          href={`tel:${agentDetail?.phone}`}
          className={Styles.contactTabsSmItem}
          onClick={() => {
            dispatch(
              storeEvent({
                type: "Incoming Call",
                description: `Lead called ${agentDetail?.phone}`,
              })
            );
          }}
        >
          Call
        </Box>
        <Box
          component={"a"}
          href={`sms:${agentDetail?.phone}`}
          className={Styles.contactTabsSmItem}
        >
          Text
        </Box>
        <Box
          component={"a"}
          href={`mailto:${agentDetail?.email}`}
          className={Styles.contactTabsSmItem}
        >
          Email
        </Box>
      </Box>
    </Box>
  ) : assignedAgent?._id ? (
    <Box
      className={Styles.agentInfoArea}
      sx={{ mb: "-15px !important", mt: "-20px !important" }}
    >
      <Box className={Styles.agentInfoContent}>
        <Avatar
          src={assignedAgent?.profileImg}
          sx={{ width: "96px", height: "96px" }}
          title={assignedAgent?.firstName}
        />
        <Box
          className={Styles.agentInfoContentDesc}
          sx={{
            display: isReplace ? "flex" : "block",
            justifyContent: isReplace ? "space-between" : "",
            alignItems: isReplace ? "center" : "",
          }}
        >
          <Box sx={{ width: isReplace ? "35%" : "100%" }}>
            <Typography
              onClick={() => router.push(`/agents/${assignedAgent?._id}`)}
              className={Styles.agentInfoContentName}
            >
              {assignedAgent?.firstName} {assignedAgent?.lastName}
            </Typography>
          </Box>
          <Box sx={{ width: isReplace ? "60%" : "100%" }}>
            <Typography
              component={"a"}
              href={`mailto:${assignedAgent?.email}`}
              className={Styles.agentInfoContentInfoEmail}
            >
              {assignedAgent?.email}
            </Typography>
            <Typography
              component={"a"}
              href={`tel:${assignedAgent?.phone}`}
              className={Styles.agentInfoContentInfoEmail}
              sx={{ display: "block" }}
              onClick={() => {
                dispatch(
                  storeEvent({
                    type: "Incoming Call",
                    description: `Lead called ${assignedAgent?.phone}`,
                  })
                );
              }}
            >
              {formatPhoneNumber(assignedAgent?.phone)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : null;
}
export default ListingAgent;
