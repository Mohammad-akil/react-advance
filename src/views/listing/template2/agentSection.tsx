import React from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import Styles from "../../../styles/listing1/agent.module.css";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import navLogo from "../../../assests/images/navLogo.png";
import { formatPhoneNumber } from "../../../utils/common";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { storeEvent } from "../../../store/events/storeEvent";
import { useAppDispatch } from "../../../store/store";
const sampleIMage =
  "https://method-platform-sandbox.s3.amazonaws.com/noProfileImage.png";
function AgentSection() {
  const dispatch = useAppDispatch();
  const listDetail = useSelector(
    (state: RootState) => state.listingDetail.listDetail
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);
  return (
    <Box
      className={Styles.section}
      //   id="contact"
    >
      <Box className={Styles.cut}></Box>
      <Container className={Styles.cardWrapper}>
        <Box className={Styles.logoTitleWrap}>
          <h2 className={Styles.sectionTitle}>Presented By</h2>
          <Box className={Styles.contactLogo}>
            <Image
              className={Styles.aspectWide}
              height="63"
              width="264"
              alt="Logo"
              src={site?.account?.logo_black || navLogo}
            />
          </Box>
        </Box>

        <Box className={Styles.agentDetailSection}>
          <Box className={Styles.agentDetailSectionLeft}>
            <Image
              src={
                listDetail?.data?.transaction_listings_v2?.agent?.profile_images
                  ?.profile_img ||
                listDetail.data.agent?.profile_images?.profile_img_thumbnail ||
                sampleIMage
              }
              width="250"
              height="250"
              className={Styles.agentProfile}
              alt=""
            />
          </Box>
          <Box className={Styles.agentDetailSectionRight}>
            <Box>
              <Typography className={Styles.agentDetailHeading}>
                {listDetail?.data?.transaction_listings_v2?.agent?.full_name}
              </Typography>
              <Typography
                sx={{ mt: "15px" }}
                className={Styles.agentDetailContent}
                component={"a"}
                href={`tel:${listDetail?.data?.transaction_listings_v2?.agent?.phone}`}
                onClick={() => {
                  dispatch(
                    storeEvent({
                      type: "Incoming Call",
                      description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                    })
                  );
                }}
              >
                {" "}
                Cell:{" "}
                {formatPhoneNumber(
                  listDetail?.data?.transaction_listings_v2?.agent?.phone
                )}
              </Typography>
              <Typography className={Styles.agentDetailContent}>
                Email:{" "}
                <a
                  href={`mailto:${listDetail?.data?.transaction_listings_v2?.agent?.email}`}
                >
                  {listDetail?.data?.transaction_listings_v2?.agent?.email}
                </a>
              </Typography>
              <Typography
                component={"a"}
                href={`tel:404-585-7355`}
                className={Styles.agentDetailContent}
                onClick={() => {
                  dispatch(
                    storeEvent({
                      type: "Incoming Call",
                      description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                    })
                  );
                }}
              >
                Office: 404-585-7355
              </Typography>
            </Box>
            <Box className={Styles.buttonSection}>
              <Button
                className={Styles.contactButton}
                startIcon={<LocalPhoneRoundedIcon />}
                component={"a"}
                href={`tel:${listDetail?.data?.transaction_listings_v2?.agent?.phone}`}
                variant="outlined"
                onClick={() => {
                  dispatch(
                    storeEvent({
                      type: "Incoming Call",
                      description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                    })
                  );
                }}
              >
                Call
              </Button>
              <Button
                className={Styles.contactButton}
                startIcon={<EmailRoundedIcon />}
                component={"a"}
                href={`mailto:${listDetail?.data?.transaction_listings_v2?.agent?.email}`}
                variant="outlined"
              >
                Email
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "none" }} className={Styles.fullWidth}>
          <Box>
            <Box className="view-content">
              <Box className="views-row views-row-1 views-row-odd views-row-first">
                <Box
                  id="node-2446"
                  className="node node-agent-card clearfix card_3"
                >
                  <Box className="content">
                    <Box className="group-contact-3-left field-group-div">
                      <Box className="field field-name-field-user-headshot field-type-image field-label-hidden">
                        <Box className="field-items">
                          <Box
                            className="field-item even"
                            id="agent_image"
                          ></Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="group-contact-3-right field-group-div">
                      <Box className="field field-name-field-agent-name field-type-text field-label-hidden">
                        <Box className="field-items">
                          <Box className="field-item even">
                            <Box
                              className="agent-card-name h4"
                              id="agent_name"
                            ></Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="field field-name-field-user-phone field-type-text field-label-hidden">
                        <Box className="field-items">
                          <Box className="field-item even" id="agent_cell">
                            Cell:
                            {formatPhoneNumber(
                              listDetail?.data?.transaction_listings_v2?.agent
                                ?.phone
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <Box className="field field-name-field-agent-email field-type-email field-label-hidden">
                        <Box className="field-items">
                          <Box className="field-item even" id="agent_email">
                            Email :{" "}
                            <a
                              href={`mailto:${listDetail?.data?.transaction_listings_v2?.agent?.email}`}
                            >
                              {
                                listDetail?.data?.transaction_listings_v2?.agent
                                  ?.email
                              }
                            </a>
                          </Box>
                        </Box>
                      </Box>
                      {listDetail?.data?.transaction_listings_v2?.agent
                        ?.officeNumber ? (
                        <Box
                          component={"a"}
                          href={`tel:${listDetail?.data?.transaction_listings_v2?.agent?.officeNumber}`}
                          className="field field-name-field-agent-bre field-type-text field-label-hidden"
                          onClick={() => {
                            dispatch(
                              storeEvent({
                                type: "Incoming Call",
                                description: `Lead called ${listDetail?.data?.transaction_listings_v2?.agent?.phone}`,
                              })
                            );
                          }}
                        >
                          <Box className="field-items">
                            <Box className="field-item even">
                              Office:{" "}
                              {
                                listDetail?.data?.transaction_listings_v2?.agent
                                  ?.officeNumber
                              }
                            </Box>
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default AgentSection;
