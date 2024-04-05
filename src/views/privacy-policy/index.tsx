"use client";
import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Styles from "../../styles/privacy.module.css";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
function PrivacyPolicy() {
  const site = useSelector((state: RootState) => state.siteInfo.site);
  return (
    <Box className={Styles.privacyPolicyPage}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={9}>
            <Typography variant="h1" className={Styles.privacyPolicyHeading}>
              Privacy Policy
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We understand the importance of protecting your online privacy,
              specifically when conducting business. As such,{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} (the "Company") is
              committed to respecting your privacy. Our Privacy Policy pertains
              to users of our Site ("Visitors," "you" or "your") who visit
              without transacting business and Visitors who register to transact
              business on the Site ("Authorized Customers") and make use of the
              various services offered by the Company (collectively,
              "Services").
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              By accessing or using the Site (as defined hereinafter), you are
              entering into a binding legal agreement with the Company; the
              website, located at{" "}
              <a target="_blank" href={site?.site_url}>
                {site?.site_domain}
              </a>{" "}
              (the "Site"); and the third-party service vendors who use the Site
              and their parent companies, subsidiaries, and affiliates (the
              "Company," "us," "we," and "our") relating to terms and conditions
              of privacy ("Privacy Policy"). This Privacy Policy is in effect
              for any web page; mobile application; e-mail list; and
              information, including Personally Identifiable Information,
              collected/owned by us, regardless of the method of collection,
              including collection through any online features, services, and/or
              programs we offer. This Privacy Policy is not applicable to your
              use of any third-party web page, mobile application, social media
              site, or any information collected or owned by any entity other
              than us.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              This Privacy Policy is incorporated by reference in our Terms of
              Service, and by using the Site or the Services and/or submitting
              your information to search or create a user profile, you give
              express consent to all of the terms contained herein, as well as
              those provided in our Terms of Service, and such use and actions
              constitute your electronic signature. You may withdraw this
              consent by using the opt-out procedures described below.
            </Typography>
            <Typography variant="h2" className={Styles.privacyPolicySubHeading}>
              COMMUNICATIONS
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>EXPRESS WRITTEN CONSENT</span>. BY SUBMITTING YOUR CONTACT
              INFORMATION, YOU ARE PROVIDING YOUR{" "}
              <span>EXPRESS WRITTEN CONSENT</span> TO RECEIVE COMMUNICATIONS
              FROM US AT THE E-MAIL ADDRESS AND TELEPHONE NUMBERS YOU ENTERED
              INTO OUR CONTACT FORM, OR THAT YOU LATER PROVIDE TO US OR ENTER
              INTO YOUR CONTACT PAGE. YOUR CONSENT ALSO SERVES AS YOUR EXPRESS
              WRITTEN CONSENT TO YOUR PAST RECEIPT OF ELECTRONIC COMMUNICATIONS
              FROM US. YOU FURTHER REPRESENT AND WARRANT THAT: (I) YOU ARE AT
              LEAST 18 YEARS OLD; (II) YOU LIVE IN THE UNITED STATES (OR CANADA,
              IN SUCH CASE, THE CANADIAN CONSENTS BELOW SHALL APPLY); (III) YOU
              HAVE NOT REGISTERED ON A NATIONAL OR STATEWIDE DO-NOT-CALL LIST,
              OR OTHERWISE GRANT THE COMPANY A WAIVER TO SUCH REGISTRATION FOR
              THE USE HEREOF; (IV) YOU ARE THE ACCOUNT HOLDER OF, OR HAVE THE
              REQUIRED CONSENT TO PROVIDE THE PHONE NUMBERS AND E-MAIL ADDRESSES
              PROVIDED; (V) THE PHONE NUMBERS AND E-MAIL ADDRESSES PROVIDED ARE
              ACCURATE, AND YOU WILL PROVIDE US NOTICE IF YOU RELEASE EITHER
              SUCH ACCOUNT TO ANOTHER.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>COMMUNICATIONS INCLUDE</span>. THESE COMMUNICATIONS MAY
              INCLUDE, WITHOUT LIMITATION, TELEMARKETING MESSAGES, THROUGH THE
              USE OF E-MAIL, LANDLINE PHONE, FAX, CELLULAR PHONE, TEXT MESSAGES
              (INCLUDING SMS AND MMS), AND NOTIFICATIONS THROUGH ANY APP THAT WE
              PRODUCE.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>AUTODIALING</span>. WE MAY USE AN AUTOMATIC TELEPHONE
              DIALING SYSTEM (OR "AUTO-DIALER"), WHICH MAY EMPLOY AN ARTIFICIAL
              OR PRE-RECORDED VOICE OR "ROBOTEXTS." YOUR CARRIER'S STANDARD
              RATES AND CHARGES MAY APPLY.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>NO PURCHASE NECESSARY</span>. AGREEING TO THESE
              COMMUNICATIONS IS NOT A CONDITION OF PURCHASING ANY PROPERTY,
              GOODS, OR SERVICES FROM US.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>REVOKING CONSENT AND OPTING OUT</span>. YOU MAY REVOKE YOUR
              CONSENT TO RECEIVE CERTAIN COMMUNICATIONS AT ANY TIME. TO STOP
              RECEIVING TEXT MESSAGES, REPLY "STOP" TO ANY OF OUR TEXTS. TO STOP
              RECEIVING E-MAILS, CLICK THE "UNSUBSCRIBE" LINK WHEN PROVIDED, OR
              REPLY "UNSUBSCRIBE" TO THE E-MAIL WHEN AN AUTOMATED UNSUBSCRIBE
              LINK IS NOT AVAILABLE. TO STOP RECEIVING PHONE CALLS, COMMUNICATE
              THAT REQUEST TO US VIA PHONE, TEXT MESSAGE, OR E-MAIL. WE WILL
              MAKE A COMMERCIALLY REASONABLE EFFORT TO COMPLY WITH ANY
              COMMUNICATIONS FROM YOU OPTING OUT. BY CONTACTING US TO OPT-OUT OF
              A CERTAIN COMMUNICATION, YOU CONSENT TO RECEIVE A FINAL
              COMMUNICATION CONFIRMING YOUR OPT-OUT.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>COMMUNICATION FREQUENCY</span>. HOW OFTEN WE SEND YOU
              COMMUNICATIONS WILL VARY, BECAUSE THE INDIVIDUAL SALESPERSON WHO
              COMMUNICATE WITH YOU WILL DETERMINE SUCH FREQUENCY.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              <span>COMMUNICATIONS PROVISIONS</span> – CANADIAN RESIDENTS. IN
              ADDITION TO THE CONSENT PROVIDED ABOVE, CANADIAN RESIDENTS AGREE
              TO THE FOLLOWING COMPLIANCE PROVISIONS, WITH RESPECT TO CANADA'S
              ANTI-SPAM LEGISLATION, CANADA'S PERSONAL INFORMATION PROTECTION
              AND ELECTRONIC DOCUMENTS ACT, AND CANADIAN PROVINCIAL LAW,
              INCLUDING ALBERTA'S PERSONAL INFORMATION PROTECTION ACT, AND
              QUEBEC'S ACT RESPECTING THE PROTECTION OF PERSONAL INFORMATION IN
              THE PRIVATE SECTOR: (i) YOU AGREE TO THE PROVISIONS GOVERNING USE
              AND DISCLOSURE OF PERSONAL INFORMATION THAT ARE FOUND IN THIS
              PRIVACY POLICY; (ii) OUR COMMUNICATION WITH YOU SHALL CONTINUE
              UNTIL YOU OPT-OUT, WHICH INDICATES YOU ARE NO LONGER CONSIDERING
              REAL ESTATE OPPORTUNITIES OR THE SERVICES WE PROVIDE; AND (iii)
              YOUR PERSONAL INFORMATION MAY ALSO BE TRANSMITTED TO, USED IN, AND
              STORED IN THE U.S.
            </Typography>
            <Typography variant="h2" className={Styles.privacyPolicySubHeading}>
              "Personally Identifiable Information"
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Personally Identifiable Information refers to any information that
              identifies or can be used to identify, contact, or locate the
              person to whom such information pertains, including, but not
              limited to, name, address, phone number, fax number, e-mail
              address, financial profile, social security number, and credit
              card information. Personally Identifiable Information does not
              include information that is collected anonymously (that is,
              without identification of the individual user) or demographic
              information not connected to an identified individual.
            </Typography>{" "}
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              What Personally Identifiable Information is collected?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We may collect basic user profile information from all of our
              Visitors. We collect the following additional information from our
              Authorized Customers: name, address, phone number, internet
              protocol address (IP address), and e-mail address.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              What organizations are collecting the information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              In addition to our direct collection of information, our
              third-party service vendors (such as mortgage lenders, insurance
              brokers, and title companies), which may provide such services as
              mortgage lending, mortgage insurance, escrow services, and title
              insurance, may collect this information from our Visitors and
              Authorized Customers. We do not control how these third parties
              use such information, but we do ask them to disclose how they use
              personal information provided to them by Visitors and Authorized
              Customers. Some of these third parties may be intermediaries that
              act solely as links in the distribution chain, and do not store,
              retain, or use the information provided to them.
            </Typography>{" "}
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              How does the Site use Personally Identifiable Information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We use Personally Identifiable Information to customize the Site,
              to make appropriate service offerings, and to fulfill requests to
              buy or sell made on the Site. We may e-mail Visitors and
              Authorized Customers about research or opportunities to purchase
              and sell on the Site or information related to the subject matter
              of the Site. We may also use Personally Identifiable Information
              to contact Visitors and Authorized Customers in response to
              specific inquiries, or to provide requested information.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              With whom may the information be shared?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Personally Identifiable Information pertaining to Authorized
              Customers and other non-personally identifiable information will
              be shared with our employees and with third-party service
              providers who assist us with our Site operations or other services
              we may offer. Personally Identifiable Information about Authorized
              Customers may be shared with other Authorized Customers and other
              providers of real estate-related services, such as mortgage
              lenders we work with, which wish to evaluate potential
              transactions with other Authorized Customers and/or us. Further,
              we may share aggregated information about our Visitors and
              Authorized Customers, including demographics, with our affiliated
              agencies and third-party vendors. We also offer the opportunity to
              "opt out" of receiving information or being contacted by us or by
              any agency acting on our behalf. Our employees, agents,
              third-party service providers and partners are contractually bound
              to use Personally Identifiable Information solely in connection
              with providing the Services, and may not use it for any other
              purpose.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We may disclose information provided by Visitors as part of any
              merger, sale, acquisition, or financing of our company.
              Furthermore, in some instances, we may be legally required to
              provide information about Visitors to government authorities,
              including law enforcement, Homeland Security, and intelligence
              agencies. We cooperate with law enforcement in identifying persons
              using our Services for illegal activities and reserve the right to
              report any activities that we believe to be unlawful or in
              violation of our Terms and Conditions.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              How is Personally Identifiable Information stored?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Personally Identifiable Information collected by the Company is
              securely stored in accordance with current industry standards and
              is not accessible to third parties or employees of the Company
              except for use as indicated above.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              What choices are available to Visitors regarding collection, use
              and distribution of the information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Visitors and Authorized Customers may opt out of receiving
              unsolicited information from us or being contacted by us and/or
              our vendors and affiliated agencies, as well as request of us and
              receive from us information on the specific elements of their
              Personally Identifiable Information being held by us, by
              responding to e-mails as instructed, or by contacting us at:
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} <br />
              {site?.mailing_address} <br />
              Contact Email:{" "}
              <a href={`mailto:${site?.contact_email || site?.email}`}>
                {site?.contact_email || site?.email}
              </a>
            </Typography>
            <Typography variant="h3" className={Styles.privacyPolicySubHeading}>
              Are Cookies used on the Site?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Cookies are used on the Site for a variety of reasons. We use
              Cookies to obtain information about the preferences of our
              Visitors and the services they select. We also use Cookies for
              security purposes to protect our Authorized Customers. For
              example, if an Authorized Customer registers for a free account
              after using the Site services, Cookies allow us to securely
              associate the Authorized Customer's search preferences with the
              newly created account.
            </Typography>
            <Typography variant="h3" className={Styles.privacyPolicySubHeading}>
              How does the Company use log-in information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              The Company uses log-in information, including, but not limited
              to, IP addresses, ISPs, and browser types, to analyze trends,
              administer the Site, track a user's movement and use, and gather
              broad demographic information.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              What partners or service providers have access to Personally
              Identifiable Information from Visitors and/or Authorized Customers
              on the Site?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              The Company has entered into and will continue to enter into
              partnerships and other affiliations with a number of vendors. Such
              vendors may have access to certain Personally Identifiable
              Information on a need-to-know basis for evaluating Authorized
              Customers for service eligibility. Our Privacy Policy does not
              cover their collection or use of this information or disclosure of
              Personally Identifiable Information to comply with law. We will
              disclose Personally Identifiable Information in order to comply
              with a court order or subpoena or a request from a law enforcement
              agency to release information. We will also disclose Personally
              Identifiable Information when reasonably necessary to protect the
              safety of our Visitors and Authorized Customers.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              How does the Site keep Personally Identifiable Information secure?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              All of our employees are fully informed of our security policy and
              practices. The Personally Identifiable Information of our Visitors
              and Authorized Customers is only accessible to a limited number of
              qualified employees with a password for accessing the information.
              We audit our security systems and processes on a regular basis. We
              utilize encryption protocols to protect sensitive information sent
              over the Internet. While we take commercially reasonable measures
              to maintain a secure site, electronic communications and databases
              are subject to errors, tampering, and break-ins, and we cannot
              guarantee or warrant that such events will not take place and will
              not be liable to Visitors or Authorized Customers for any such
              occurrences.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              How can Visitors correct any inaccuracies in Personally
              Identifiable Information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Visitors and Authorized Customers may contact us to update
              Personally Identifiable Information related to them or to correct
              any inaccuracies by e-mailing us at{" "}
              <a href={`mailto:${site?.contact_email || site?.email}`}>
                {site?.contact_email || site?.email}
              </a>
              . We encourage Visitors and Authorized Customers to keep
              Personally Identifiable Information up to date at all times. With
              that said, changes and updates to Personally Identifiable
              Information will only be reflected going forward, and we cannot
              alter any information we may have provided to a third party
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              Can a Visitor delete or deactivate Personally Identifiable
              Information collected by the Site?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We provide Visitors and Authorized Customers with a mechanism to
              request data deletion of Personally Identifiable Information from
              the Site's database by contacting us via the information provided
              in this Privacy Policy, as well as to direct any of the
              third-party service providers which assist us with our Site
              operations or other services we may offer to delete/deactivate
              Personally Identifiable Information held by them which was
              originally received by them from us. However, because of backups
              and records of deletions, it may be impossible to delete a
              Visitor's entry without retaining some residual information. An
              individual who requests to have Personally Identifiable
              Information deactivated will have this information functionally
              deleted, and we will not sell, transfer, or use Personally
              Identifiable Information relating to that individual in any way
              moving forward.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              Do our Visitors and Authorized Customers have rights to
              non-discrimination for enacting their rights to protect their
              Personally Identifiable Information?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We do not and cannot, under the law, discriminate against Visitors
              and Authorized Customers for exercising any of their rights with
              regard to their Personally Identifiable Information, as detailed
              herein. Such forbidden discrimination includes, denying goods or
              services, charging different prices, or providing a different
              level or quality of service. However, we are, under the law, able
              to offer different services and rates if such differences are
              reasonably related to the value of the consumers' data.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              California users' rights
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We provide the following disclosures pursuant to Cal. Bus. & Prof.
              Code § 22575 - 22579.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We provide Visitors and Authorized Customers, including those
              claiming California residency, with information on how to exercise
              their respective disclosure options and choices pertaining to
              Personally Identifiable Information, such as the right to opt-out
              or unsubscribe, or opt-in for use of Personally Identifiable
              Information by third parties for marketing purposes. Accordingly,
              pursuant to the California Civil Code, we are not required to
              maintain or disclose a list of the third parties that have
              received Personally Identifiable Information for marketing
              purposes during the preceding year.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              California residents wishing to request information about how to
              exercise their disclosure options and choices pertaining to third
              party disclosures, please send requests by mail to "Request for
              California Disclosure Choices" at the mailing address provided
              above. With all requests, please include your name, street
              address, city, state, zip code and e-mail address. We do not
              accept requests via telephone or fax. We are not responsible for
              failure to respond to incomplete or incorrectly labeled or
              submitted notices.
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We do not abide by Do Not Track signals from a user's Internet
              browser. We make no representations concerning third parties that
              do not collect Personally Identifiable Information directly
              through our Site.
            </Typography>
            <Typography variant="h3" className={Styles.privacyPolicySubHeading}>
              Minors
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              Our Site is not intended for use by minors, and as such, no one
              under the age of 18 should use, or provide any personal
              information to, our Site. If we discover that we have mistakenly
              collected personal information from a child under the age of 13,
              we will delete that information as soon as possible.
            </Typography>
            <Typography variant="h3" className={Styles.privacyPolicySubHeading}>
              Links
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              The Site contains links to other web sites. Please note that when
              you click on one of these links, you are moving to another web
              site. We encourage you to read the privacy statements of these
              linked sites, as their privacy policies may differ from ours.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              Governing Law and Jurisdiction
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              By accessing or using the Service, you agree to be bound by this
              Privacy Policy, which shall be governed by, and construed in
              accordance with, the laws of the state of Indiana, exclusive of
              its choice of law rules. For any Disputes deemed not subject to
              binding, individual arbitration, as provided in the section
              immediately below, you and the Company agree to submit to the
              exclusive jurisdiction of the state of Indiana, or, if federal
              court jurisdiction exists, the United States District Court for
              the state of Indiana. You and the Company agree to waive any
              jurisdictional, venue, or inconvenient forum objections to such
              courts (without affecting either party's rights to remove a case
              to federal court if permissible), as well as any right to a jury
              trial. The Convention on Contracts for the International Sale of
              Goods will not apply. Any law or regulation which provides that
              the language of a contract shall be construed against the drafter
              will not apply to this Agreement. This Section will be interpreted
              as broadly as applicable law permits.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.privacyPolicySubHeading1}
            >
              What happens if the Privacy Policy Changes?
            </Typography>
            <Typography className={Styles.privacyPolicyContent}>
              We reserve the right to modify or amend this Privacy Policy at any
              time by posting the revised Privacy Policy. We will let our
              Visitors and Authorized Customers know about changes to our
              Privacy Policy by posting such changes on the Site.
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography className={Styles.privacyPolicyContent}>
              Last updated on 6/15/2021.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy;
