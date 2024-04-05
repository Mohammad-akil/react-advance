"use client";
import { Container, Box, Typography } from "@mui/material";
import Styles from "../../styles/footer.module.css";
import { datasets } from "../../utils/datasets";
import { usePathname } from "next/navigation";
interface FooterProps {}
const Footer: React.FC<FooterProps> = (props) => {
  const pathname = usePathname();
  return datasets?.includes(pathname?.split("/")[1]) ? null : (
    <Box className={Styles.footerArea}>
      <Container maxWidth="xl" className={Styles.footerContainer}>
        <Typography variant="h6" gutterBottom>
          Property Site
        </Typography>
        <Typography sx={{ color: "grey", fontSize: "13px" }}>
          {process.env.NEXT_PUBLIC_COMPANY_FULL_NAME}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
