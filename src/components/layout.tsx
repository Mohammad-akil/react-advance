import React from "react";
import Footer from "./footer";
import Header from "./header";
import Registration from "../views/registration";
import { useAppDispatch } from "../store/store";
import ResponseAlert from "./shared/alert";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { openAlert } from "../store/notification";
import { useRouter } from "next/router";
interface LayoutProps {
  children: React.ReactElement;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { open, type, message } = useSelector(
    (state: RootState) => state.notification.alert
  );

  return (
    <>
      {router?.pathname === "/[...id]" ? null : <Header />}

      <main>{children}</main>
      {router?.pathname === "/[...id]" ? null : <Footer />}

      <Registration />
      <ResponseAlert
        open={open}
        setOpen={() =>
          dispatch(openAlert({ type: "", message: "", open: false }))
        }
        alertType={type}
        alertMessage={message}
      />
    </>
  );
};
export default Layout;
