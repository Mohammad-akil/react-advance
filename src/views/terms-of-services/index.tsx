"use client";
import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Styles from "../../styles/terms.module.css";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
function TermsOfServices() {
  const site = useSelector((state: RootState) => state.siteInfo.site);
  return (
    <Box className={Styles.termsOfServicePage}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={9}>
            <Typography variant="h1" className={Styles.termsOfServiceHeading}>
              Terms of Service
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              <span>Important.</span> Please read this agreement carefully
              before accessing or using{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} ("Company") website,
              located at{" "}
              <a target="_blank" href={site?.site_url}>
                {site?.site_domain}
              </a>
              , or voice and mobile applications or before participating in any
              online features, services and/or programs offered by the Company
              related to lead generation, responding to inquiries and management
              as related to the real estate industry and related industries
              (collectively, the "Service"). Each time you access or use the
              Service, you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to be bound by all of these Terms,
              you may not access or use the Service. In addition, certain areas
              of the Service may be subject to additional terms of use that will
              be made available for your review in conjunction with accessing
              such areas. By using such areas or any part thereof, you are
              expressly indicating that you have read and agree to be bound by
              the applicable additional terms of use. In the unlikely event that
              any of the additional terms of use governing such an area are in
              conflict with these Terms, the additional terms shall control.
            </Typography>
            <Typography
              variant="h2"
              className={Styles.termsOfServiceSubHeading}
            >
              User Obligations
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You agree to abide by all applicable local, state, national and
              international laws and regulations pertaining to accessing and
              using the Service. You also acknowledge and agree that your use of
              the Internet to access the Service is solely at your own risk.
            </Typography>
            <Typography
              variant="h2"
              className={Styles.termsOfServiceSubHeading}
            >
              Communications
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              By creating an account for the purposes of using the Service
              ("Account"), you agree to subscribe to newsletters, marketing or
              promotional materials and other information the Company may send,
              including by e-mail, SMS, text messaging, automated voicemail
              drops and push notifications. However, you may opt out of
              receiving any, or all, of these communications from the Company,
              at any time and upon your preference. You may opt out of receiving
              e-mail communications by clicking on the unsubscribe link provided
              in any e-mail sent by the Company and then following the
              affiliated instructions provided. You may opt out of receiving SMS
              and text messaging by replying "STOP" to any text sent by the
              Company. You may opt out of receiving phone calls by communicating
              that preference with receiving a phone call from the Company. The
              Company will make commercially reasonable efforts to comply with
              any communications from you requesting an opt out of
              communications.
            </Typography>{" "}
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Purchases
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              To purchase any product or service made available through the
              Service ("Purchase"), you may be required to supply certain
              information relevant to your Purchase, including, but not limited
              to, your credit card number, card expiration, billing address, and
              shipping preference and address.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You represent and warrant that: (i) you have the legal right to
              use any credit card(s) or other payment method(s) used in
              connection with any Purchase and that (ii) the information you
              supply to the Company related to a Purchase is true and accurate.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Service may employ third-party services to facilitate payment
              and completion of Purchases. By submitting your information to the
              Service, you grant the Company the right to provide that
              information to its third-party service providers subject to our
              Privacy Policy.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Company reserves the right to refuse or cancel your order at
              any time for reasons including, but not limited to: suspicion of
              fraudulent, unauthorized, or illegal Purchase transactions;
              availability of a product or service; errors in the description or
              listed price of a product or service; or other errors or related
              reasons.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Availability, Errors and Inaccuracies
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Company is constantly updating product and service offerings
              on the Service, and sometimes there are delays between an update
              of information on the Service and a corresponding update to the
              Company's advertising. There is also potential for the information
              on the Service to contain errors or inaccuracies or be incomplete
              or outdated. The Company does not guarantee the accuracy or
              completeness of any information found on the Service and reserves
              the right to update information and correct errors, inaccuracies,
              or omissions at any time without prior notice.
            </Typography>{" "}
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Content
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Service allows you to post, link to, store, share and
              otherwise make available certain information, text, graphics,
              videos, or other material ("Content"). You are responsible for the
              Content that you post on or through the Service, including its
              legality, reliability, and appropriateness.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              Specifically, you must not:
            </Typography>
            <ol style={{ paddingLeft: "15px", marginBottom: "30px" }}>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or other materials that are in any way libelous
                or defame; harass; abuse; threaten; intimidate; or, in any other
                way, infringe on the rights of others&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post or upload personal information, pictures, videos or any
                other media belonging to another person without their express
                permission, or anything else that violates the privacy or
                publicity rights of another person or entity&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post anything that interferes with or disrupts the operation of
                the Service, including, but not limited to, posting files that
                contain malware, viruses, corrupted files, or any other type of
                file or data that may damage the functionality of another's
                computer or the Service&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Repeatedly post the same message or similar messages within an
                unreasonable timeframe&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Delete or revise any material from the Service posted by another
                user or the Company, without the express written permission of
                the Company&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or materials that encourage criminal conduct or
                that would give rise to civil liability or otherwise violate any
                law or regulation in any jurisdiction&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or other materials that are bigoted, hateful,
                racist, vulgar, obscene, pornographic, profane or otherwise
                objectionable, including language and images&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or materials that in any way could harm minor
                children&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or materials that impersonate another person or
                entity, whether actual or fictitious&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or materials that in any way misrepresent your
                affiliation with any entity, including, but not limited to, the
                Company&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post statements or materials that constitute spam or
                unauthorized advertising or promotional materials, including,
                but not limited to, links to commercial products or
                services&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                Post material that infringes or may infringe on any copyright,
                patent, trademark, trade secret, or other intellectual or
                property rights of any party that you are not authorized to make
                available.&#59;
              </li>
            </ol>
            <Typography className={Styles.termsOfServiceContent}>
              The Company has the right, but not the obligation, to monitor and
              edit all Content provided by users. Please be aware that the
              Company can remove any material posted by a user that it finds, in
              its sole discretion, to be objectionable, with or without notice
              to said user. Any user failing to comply with these guidelines may
              be expelled from and refused continued access to forums maintained
              by the Company in the future. The Company expressly disclaims any
              and all responsibility and makes no representations as to the
              validity of any opinion, advice, information or statements made or
              displayed in forums by third parties, nor is the Company
              responsible for any errors or omissions in any such postings or
              for hyperlinks embedded in any message.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              By posting Content on or through the Service, you represent and
              warrant that: (i) the Content is yours (you own it), and/or you
              have the right to use it and the right to grant the Company the
              rights and license as provided in these Terms, and (ii) that the
              posting of your Content on or through the Service does not violate
              the privacy rights, publicity rights, copyrights, contract rights
              or any other rights of any person or entity. We reserve the right
              to terminate the account of anyone found to be infringing on a
              copyright.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You retain any and all of your rights to any Content you submit,
              post or display on or through the Service and are responsible for
              protecting those rights. We take no responsibility and assume no
              liability for Content you or any third-party posts on or through
              the Service. However, by posting Content using the Service, you
              grant the Company the right and license to use, modify, publicly
              perform, publicly display, reproduce, and distribute such Content
              on and through the Service. In addition, Content found on or
              through this Service is the property of the Company or used with
              permission. You may not distribute, modify, transmit, reuse,
              download, repost, copy, or use said Content, whether in whole or
              in part, for commercial purposes or for personal gain, without
              express advance written permission from the Company.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading}
            >
              Accounts
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              When you create an account with the Company, you warrant and
              guarantee that you are above the age of 18 and that the
              information you provide the Company is accurate, complete, and
              current at all times. Inaccurate, incomplete, or obsolete
              information may result in the immediate termination of your
              account and/or access to the Service. The Company reserves the
              right to refuse service, terminate accounts, remove or edit
              content, or cancel orders in our sole discretion. You agree that
              you will not use the Service in a manner that is inconsistent with
              the rights and restrictions as set forth in this Terms of Service.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You are responsible for maintaining the confidentiality of your
              account and password, including, but not limited to, the
              restriction of access to your computer and/or account. You agree
              to accept responsibility for any and all activities or actions
              that occur under your account and/or password, whether your
              password is for our Service or a third-party service. You must
              notify the Company immediately upon becoming aware of any breach
              of security or unauthorized use of your account.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You may not use as a username the name of another person or entity
              or one not lawfully available for use, a name or trademark subject
              to any rights of another person without appropriate authorization.
              You may not use as a username any name that is offensive, vulgar
              or obscene. If you choose to communicate with or meet other users
              of the Service, associated content or forums, you do so entirely
              at your own risk. You hereby understand and acknowledge that there
              are risks involved with meeting people in person from an online
              community, including, but not limited to, risks of physical harm.
              You assume any and all risks associated with in-person contact
              with other users outside of the use of the Service and associated
              content and forums.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading}
            >
              Intellectual Property
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Service and its original content (excluding Content provided
              by users), features and functionality are and will remain the
              exclusive property of the Company and its licensors. The Service
              is protected by copyright, trademark, and other laws of both the
              United States and foreign countries. The Company's trademarks and
              trade dress may not be used in connection with any product or
              service without the prior written consent of the Company. The
              Service and its original content may not be reproduced,
              transmitted or distributed without the prior written consent of
              the Company. The Company respects the intellectual property rights
              of others. It is our policy to respond to any claim that Content
              posted on the Service infringes on the copyright or other
              intellectual property rights ("Infringement") of any person or
              entity.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              If you are a copyright owner, or authorized on behalf of one, and
              you believe that the copyrighted work has been copied in a way
              that constitutes copyright infringement, please submit your claim
              via e-mail to{" "}
              <a href={`mailto:${site?.contact_email || site?.email}`}>
                {site?.contact_email || site?.email}
              </a>
              , with the subject line "Copyright Infringement" and include a
              description of the alleged Infringement as detailed below under
              "DMCA Notice and Procedure for Copyright Infringement Claims."
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You may be held accountable for damages (including costs and
              attorneys' fees) for misrepresentation or bad-faith claims on the
              infringement of any Content found on and/or through the Service on
              your copyright.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              DMCA Notice and Procedure for Copyright Infringement Claims
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You may submit notification of a claim of copyright infringement,
              pursuant to the Digital Millennium Copyright Act (DMCA), by
              providing our Copyright Agent with the following information in
              writing (see 17 U.S.C 512(c)(3) for further detail):
            </Typography>
            <ul style={{ paddingLeft: "15px", marginBottom: "30px" }}>
              <li className={Styles.termsOfServiceListItem}>
                an electronic or physical signature of the person authorized to
                act on behalf of the owner of the copyright's interest&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                a description of the copyrighted work that you claim has been
                infringed, including an URL for or copy of the copyrighted
                work&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                identification of the URL or other specific location on the
                Service where the material that you claim is infringing is
                located&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                your address, telephone number, and e-mail address&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                a statement by you that you have a good faith belief that the
                disputed use is not authorized by the copyright owner, its
                agent, or the law&#59;
              </li>
              <li className={Styles.termsOfServiceListItem}>
                a statement by you, made under penalty of perjury, that the
                information provided in your notification is accurate and that
                you are the copyright owner or authorized to act on the
                copyright owner's behalf.
              </li>
            </ul>
            <Typography className={Styles.termsOfServiceContent}>
              You can contact our Copyright Agent via via e-mail at{" "}
              <a href={`mailto:${site?.contact_email || site?.email}`}>
                {site?.contact_email || site?.email}
              </a>{" "}
              or by mail {site?.mailing_address}.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading}
            >
              Disclaimer - Links to Third-Party Web Sites
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              Some links on the Service will direct you to a third-party website
              ("Linked Site"). The Company may provide such links as a
              convenience. You understand and acknowledge that the Company does
              not control such a Linked Site or its contents. The Company is not
              responsible for the legality, accuracy or appropriateness of any
              content, advertising, products, services, or other materials on or
              available from a Linked Site. You acknowledge and agree that the
              Company shall not be responsible or liable, either directly or
              indirectly, for any and all damage or loss caused or allegedly
              caused by or in connection with the use of any of the links,
              content, goods or services available via a Linked Site. The
              Company strongly advises you to read the terms and conditions and
              privacy policies of any third-party site you access.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading}
            >
              Termination
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Company may terminate or suspend your account and bar access
              to the Service immediately, without prior notice or liability, in
              the Company's sole discretion, for any reason whatsoever and
              without limitation, including, but not limited to, a breach of the
              Terms.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              If you wish to terminate your Account, you may send notice to the
              Company by e-mailing{" "}
              <a href={`mailto:${site?.contact_email || site?.email}`}>
                {site?.contact_email || site?.email}
              </a>
              .
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              All provisions of the Terms which, by their nature, should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Indemnification
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              You agree to defend, indemnify and hold harmless{" "}
              {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME} and its licensee and
              licensors, and their employees, contractors, agents, officers and
              directors, from and against any and all claims, damages,
              obligations, losses, liabilities, costs or debt, and expenses
              (including, but not limited to, attorneys' fees) resulting from or
              arising out of a) the use of and access to the Service by you or
              any person using your account and password; b) a breach of these
              Terms; or c) Content posted on the Service.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Limitation of Liability
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              THE COMPANY, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS,
              REPRESENTATIVES AND ASSIGNS SHALL NOT BE LIABLE TO YOU OR ANYONE
              ELSE FOR ANY LOSS OR INJURY OR ANY INDIRECT, INCIDENTAL,
              CONSEQUENTIAL, SPECIAL, EXEMPLARY, PUNITIVE OR OTHER DAMAGES UNDER
              ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR ANY OTHER REASON
              ARISING OUT OF OR IN ANY WAY RELATED TO (1) THE USE OF OR
              INABILITY TO USE THE SERVICE; (2) ANY CONTENT CONTAINED ON THE
              SERVICE; (3) ANY STATEMENTS OR CONDUCT POSTED OR MADE PUBLICLY
              AVAILABLE ON THE SERVICE AND/OR WITHIN ITS CONTENT; (4) ANY
              PRODUCT OR SERVICE PURCHASED OR OBTAINED THROUGH THE SERVICE
              AND/OR ITS CONTENT; (5) ANY ACTION OR INACTION TAKEN IN RESPONSE
              TO OR RESULTING FROM ANY AND ALL INFORMATION AVAILABLE ON THE
              SERVICE AND/OR WITHIN ITS CONTENT AND ANY DAMAGE CAUSED BY LOSS OF
              ACCESS; (6) ANY OTHER MATTER ARISING FROM OR RELATING TO THE USE
              OF THE SERVICE AND/OR ITS CONTENT; (7) ANY OTHER MATTER ARISING
              FROM OR RELATING TO THE INABILITY TO USE OR ACCESS THE SERVICE
              AND/OR ITS CONTENT.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              UNDER NO CIRCUMSTANCES SHALL THE TOTAL LIABILITY OF THE COMPANY OR
              ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, REPRESENTATIVES OR
              ASSIGNS, TO YOU FOR ANY AND ALL DAMAGES, LOSSES OR CAUSES OF
              ACTION, EXCEED THE AMOUNT PAID BY YOU FOR USING THE SERVICE OR ITS
              CONTENT.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Disclaimer
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              THE SERVICE AND ANY CONTENT, TOOLS, PRODUCTS OR SERVICES
              DISPLAYED, ACCESSED OR OBTAINED ON OR THROUGH THE SERVICE ARE
              PROVIDED "AS IS" AND "AS AVAILABLE" AND WITHOUT WARRANTIES OF ANY
              KIND, WHETHER EXPRESS OR IMPLIED OR STATUTORY, INCLUDING, BUT NOT
              LIMITED TO, WARRANTIES OF TITLE, NON-INFRINGEMENT,
              MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY
              CANNOT AND DOES NOT WARRANT THAT THE SERVICE, THE INFORMATION,
              CONTENT, MATERIALS, PRODUCTS OR SERVICES INCLUDED THEREON OR
              OTHERWISE MADE AVAILABLE THROUGH THE SERVICE, THE SERVERS, OR ANY
              E-MAILS SENT FROM THE COMPANY ARE FREE OF VIRUSES AND ANY OTHER
              HARMFUL COMPONENTS. THE COMPANY SHALL NOT BE LIABLE FOR DAMANGES
              OF ANY KIND ARISING FROM THE USE OF THE SERVICE OR FROM ANY
              INFORMATION, CONTENT, MATERIALS, PRODUCTS OR SERVICES MADE
              AVAILABLE THROUGH THE SERVICE, INCLUDING, BUT NOT LIMITED TO,
              DIRECT, INDIRECT, INCIDENTAL, PUNITIVE AND CONSEQUENTIAL DAMAGES.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Exclusions
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              Some jurisdictions do not allow the exclusion of certain
              warranties or the exclusion or limitation of liability for
              consequential or incidental damages, so the limitations above may
              not apply to you.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Force Majeure
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Company shall not be liable for any delay or failure to
              perform resulting from causes outside the reasonable control of
              the Company, including, but not limited to, any failure to perform
              the obligations hereunder or those found in any additional terms,
              due to unforeseen circumstances or causes beyond the control of
              the Company, such as acts of God; fire; flood; earthquake;
              accidents; strikes; war; terrorism; governmental acts; failure of
              common carriers (including, but not limited to, Internet service
              providers and website hosting providers); and shortages of
              transportation facilities, fuel, energy, labor or materials.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Governing Law and Jurisdiction
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              By accessing or using the Service, you agree to be bound by these
              Terms, which shall be governed by, and construed in accordance
              with, the laws of the state of Indiana, exclusive of its choice of
              law rules. For any Disputes deemed not subject to binding,
              individual arbitration, as provided in the section immediately
              below, you and the Company agree to submit to the exclusive
              jurisdiction of the state of Indiana, or, if federal court
              jurisdiction exists, the United States District Court for the
              state of Indiana. You and the Company agree to waive any
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
              className={Styles.termsOfServiceSubHeading}
            >
              Class Action Waiver
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              Any claim or other proceedings by or between you and the Company
              shall be conducted on an individual basis and not in any class
              action, mass action, or on a consolidated or representative basis.
              You further agree to waive any right to a jury trial. Any claim
              that all or part of this Class Action Waiver is unenforceable,
              unconscionable, void, or voidable may be determined only by a
              court of competent jurisdiction.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading}
            >
              State Specific Notes:
            </Typography>
            <ul style={{ paddingLeft: "15px", marginBottom: "30px" }}>
              <li className={Styles.termsOfServiceListItem}>
                <span>California.</span> Under California Civil Code Section
                1789.3, California website users are entitled to know that they
                may file grievances and complaints in writing with The Complaint
                Assistance Unit of the Division of Consumer Services of the
                California Department of Consumer Affairs, 1625 North Market
                Blvd., Suite N 112, Sacramento, CA 95834, or via telephone at
                (916) 445-1254 or 1-800-952-5210, or via e-mail at
                dca@dca.ca.gov.
              </li>
              <li className={Styles.termsOfServiceListItem}>
                <span>New Jersey.</span> Any disclaimer, limitation of
                liability, indemnification or damages provision contained herein
                shall apply to New Jersey residents and/or New Jersey
                transactions only to the extent permitted either by New Jersey
                law or public policy.
              </li>
            </ul>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Severability
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              If any part of these Terms is deemed to be unlawful, void, or, for
              any reason, unenforceable, that provision shall be deemed
              severable from these Terms and shall not affect the validity or
              enforceability of any remaining provisions of these Terms.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Entire Agreement
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              These Terms, as well as the Company's Privacy Policy and any other
              terms or agreements that may be posted on the Service as amended
              from time to time ("Website Agreements") contain the entire
              agreement between you and the Company relating to the Service and
              your use of the Service and supersede any and all previous
              agreements, arrangements, undertakings or proposals, whether
              written or oral, between you and the Company regarding such
              matters.
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              To understand our privacy practices, please review our Privacy
              Policy, which governs your visits to the Service and is herein
              incorporated by reference into these terms.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              Updates
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              The Company may modify these Terms at any time. If, at any time,
              you disagree with the changes made to the Terms, you must
              discontinue your use of the Service and its content and forums,
              and if you have registered for any services through the Service,
              cancel your registration for such services. Your continued access
              or use of the Service following such notice constitutes your
              acceptance of the modified Terms. It is your responsibility to be
              aware of any such modifications to the Terms. The Company reserves
              the right to modify or discontinue the Service with or without
              notice and will not be held liable to you or any third party
              should the Company choose to exercise its right to modify or
              discontinue the Service. IF YOU OBJECT TO ANY SUCH CHANGES, YOUR
              SOLE RECOURSE SHALL BE TO CEASE ACCESS TO AND USE OF THE SERVICE.
              CONTINUED ACCESS TO AND USE OF THE SERVICE AND/OR ITS CONTENT AND
              FORUMS FOLLOWING NOTICE OF ANY SUCH CHANGE INDICATES YOUR
              ACKNOWLEDGEMENT OF SUCH CHANGE AND ACCEPTANCE OF THE SERVICE AS SO
              MODIFIED, AND YOUR USE OF THE SERVICE AND ITS CONENTS AND FORUMS
              SHALL BE GOVERNED BY THE UPDATED TERMS.
            </Typography>
            <Typography
              variant="h3"
              className={Styles.termsOfServiceSubHeading1}
            >
              How to Contact Us
            </Typography>
            <Typography className={Styles.termsOfServiceContent}>
              If you have any questions or comments about this policy, if you
              need to report a problem with the Service, or if you would like to
              exercise one of your rights under this policy, please contact the
              Company at:
              <Typography className={Styles.termsOfServiceContent}>
                {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}
                <br />
                {site?.mailing_address}
                <br />
                Contact Email:{" "}
                <a href={`mailto:${site?.contact_email || site?.email}`}>
                  {site?.contact_email || site?.email}
                </a>
              </Typography>
              <Typography className={Styles.termsOfServiceContent}>
                Please include in your correspondence your name, contact
                information, and the nature of your request so that we can
                respond appropriately and promptly. Please allow thirty (30)
                calendar days for a response to any inquiry you submit to the
                Company.
              </Typography>
            </Typography>
            <br />
            <br />
            <Typography className={Styles.termsOfServiceContent}>
              Last updated on 6/15/2021.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TermsOfServices;
