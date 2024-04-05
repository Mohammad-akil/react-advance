"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/header.module.css";
import {
  Box,
  Container,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import {
  logout,
  getUserDetail,
  checkIsAuthenticated,
  checkAuthUpdateCookie,
} from "../../utils/auth";
import Image from "next/image";
import { handleUpdateAuthPreview, quickLogin } from "../../store/auth";
import { useAppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Avatar from "../shared/avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { handleUpdateAuth } from "../../store/auth";
import Logout from "@mui/icons-material/Logout";
import ResponseAlert from "../shared/alert";
import { usePathname } from "next/navigation";
import { openAlert } from "../../store/notification";
import { datasets } from "../../utils/datasets";
import { getSiteDetail } from "../../store/sites/getSite";
import { getFavoriteProperties } from "../../store/property-list/getFavoriteProperties";
import { handleResetFavorite } from "../../store/property-list";
import { useRouter } from "next/navigation";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { handleResetSearchValue } from "../../store/property-list";
import { saveUTMToLocalStorage } from "../../utils/utm";
import ReactGA from "react-ga4";
import { isVisitedTimeGtTwoHrs } from "../../utils/auth";
import { storeEvent } from "../../store/events/storeEvent";
const navLogo: any = `https://method-idx.s3.us-east-1.amazonaws.com/midx-assets/${process.env.NEXT_PUBLIC_SITE_ID}/navLogo.png`;

export const StyledBadge = styled(Badge)(
  ({ theme, customColor, disableShadow }: any) => ({
    "& .MuiBadge-badge": {
      backgroundColor: customColor,
      color: customColor,
      boxShadow: disableShadow
        ? ""
        : `0 0 0 2px ${theme.palette.background.paper}`,
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
);
interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 575px)");
  const openMenu = Boolean(anchorEl);
  const { isAuthenticated, authDetail } = useSelector(
    (state: RootState) => state.auth
  );
  const site = useSelector((state: RootState) => state.siteInfo.site);
  const favoriteProperties = useSelector(
    (state: RootState) => state.propertyList.favoriteProperties
  );
  const listDetail = useSelector(
    (state: RootState) => state.propertyDetail.listDetail
  );
  const paginationList = useSelector(
    (state: RootState) => state.propertyList.paginationList
  );
  const dispatch = useAppDispatch();
  const { open, type, message } = useSelector(
    (state: RootState) => state.notification.alert
  );
  const handleSuccess = () => {
    router.push(
      `${pathname}${window.location.search?.split("token")?.[0] || ""} ${
        window.location.search?.split("token")?.[1]?.split("&")?.slice(1) || ""
      }`
    );

    dispatch(
      openAlert({
        type: "success",
        message: "You have successfully logged in!",
        open: true,
      })
    );

    dispatch(handleUpdateAuthPreview({ open: false, isOpenedManually: false }));
    if (localStorage.authPreview === "register") {
      ReactGA.event({
        category: "Signed up via google",
        action: "Signed up via google",
        label: "Signed up via google",
      });
    } else {
      ReactGA.event({
        category: "Logged in with google",
        action: "Logged in with google",
        label: "Logged in with google",
      });
    }
  };

  useEffect(() => {
    let queryParams: any = new URLSearchParams(window.location.search);
    let token: any = queryParams.get("token");

    if (checkAuthUpdateCookie() && localStorage.token && !token) {
      dispatch(quickLogin({ token: localStorage.token }));
    }

    if (token) {
      dispatch(quickLogin({ token: token, handleSuccess, isUpdate: true }));
    }
    saveUTMToLocalStorage();
  }, []);

  useEffect(() => {
    if (isVisitedTimeGtTwoHrs() && checkIsAuthenticated()) {
      dispatch(storeEvent({ type: "Visited Website" }));
    }
  }, [authDetail?._id]);

  useEffect(() => {
    // Initialize GA with your GA4 measurement ID
    ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_ID}`);
  }, []);

  useEffect(() => {
    if (window?.gtag) {
      window.gtag("config", `${process.env.NEXT_PUBLIC_GA_ID}`, {
        page_path: `${window.location.pathname}`,
      });
    }
    if (window?.dataLayer) {
      window.dataLayer.push({
        event: "virtualPageview",
        page_path: window.location.pathname,
        page_title: document.title, //some arbitrary name for the page/state
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (checkIsAuthenticated()) {
      dispatch(
        handleUpdateAuth({
          isAuthenticated: true,
          authDetail: getUserDetail(),
        })
      );
      if (!favoriteProperties?.data?.length) {
        dispatch(getFavoriteProperties({}));
      }
    }

    if (!site?._id) {
      dispatch(getSiteDetail());
    }
  }, []);

  const handleLogin = () => {
    dispatch(
      handleUpdateAuthPreview({
        open: true,
        previewType: "login",
        isOpenedManually: true,
      })
    );
  };
  const handleRegister = () => {
    dispatch(
      handleUpdateAuthPreview({
        open: true,
        previewType: "register",
        isOpenedManually: true,
      })
    );
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isSmallScreen) {
      setAnchorEl(event.currentTarget);
    }
    setIsNavExpanded(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/");
    setIsNavExpanded(false);
    logout();
    handleClose();
    dispatch(
      handleUpdateAuth({
        isAuthenticated: false,
        authDetail: {},
      })
    );
    setTimeout(() => {
      dispatch(handleResetFavorite({}));
    }, 1000);
  };
  useEffect(() => {
    let dis = new URLSearchParams(window.location?.search).get("dis");
    if (dis) {
      localStorage.setItem("dis", dis);
    }
    let props = new URLSearchParams(window.location?.search).get("props");
    if (props) {
      localStorage.setItem("props", props);
    }
    let rp = new URLSearchParams(window.location?.search).get("rp");
    if (rp) {
      localStorage.setItem("rp", rp);
    }
  }, []);
  return datasets?.includes(pathname?.split("/")[1]) ||
    (isExtraSmallScreen &&
      process.env.NEXT_PUBLIC_THEME === "2" &&
      paginationList?.findIndex(
        (it: any) => it?.ListingId === listDetail?.data?.ListingId
      ) >= 0 &&
      (pathname?.includes("/property/") ||
        pathname?.includes("/properties/"))) ? null : (
    <Box className={styles.headerArea}>
      <Container maxWidth="xl" className={styles.NavContainer}>
        <nav
          className={
            isNavExpanded
              ? `${styles.navigation} ${styles.nav__open}`
              : styles.navigation
          }
        >
          <Link href="/" className={styles.brandName}>
            <Box sx={{ position: "relative", width: "206px", height: "36px" }}>
              {" "}
              <Image
                fill
                style={{
                  cursor: "pointer",
                  objectFit: "contain",
                  zIndex: "999",
                }}
                src={
                  pathname === "/"
                    ? site?.account?.logo_white || navLogo
                    : site?.account?.logo_black || navLogo
                }
                alt="MediaURL"
              />
            </Box>
          </Link>
          <button
            className={styles.nav__toggle}
            role="button"
            aria-expanded="false"
            aria-controls="menu"
            style={{
              backgroundColor: pathname === "/" ? "" : "rgba(0, 0, 0, .5)",
            }}
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <svg
              className={styles.menuicon}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 50 50"
            >
              <title>Toggle Menu</title>
              <g>
                <line
                  className={styles.menuicon__bar}
                  x1="13"
                  y1="16.5"
                  x2="37"
                  y2="16.5"
                />
                <line
                  className={styles.menuicon__bar}
                  x1="13"
                  y1="24.5"
                  x2="37"
                  y2="24.5"
                />
                <line
                  className={styles.menuicon__bar}
                  x1="13"
                  y1="24.5"
                  x2="37"
                  y2="24.5"
                />
                <line
                  className={styles.menuicon__bar}
                  x1="13"
                  y1="32.5"
                  x2="37"
                  y2="32.5"
                />
                <circle
                  className={styles.menuicon__circle}
                  r="23"
                  cx="25"
                  cy="25"
                />
              </g>
            </svg>
          </button>
          {isSmallScreen ? (
            <Box className={styles.smallNavigationArea}>
              <ul className={styles.nav__menu}>
                <li
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  className={styles.nav__item}
                >
                  <Link
                    style={{}}
                    href="/property-search/advance-search"
                    onClick={() => {
                      if (
                        new URLSearchParams(window.location?.search).get(
                          "searchId"
                        )
                      ) {
                        dispatch(
                          handleResetSearchValue({ resetSearchDetail: true })
                        );
                      }
                    }}
                    className={styles.nav__link}
                  >
                    Search Properties
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                  className={styles.nav__item}
                >
                  <Link style={{}} href="/agents" className={styles.nav__link}>
                    Agents
                  </Link>
                </li>

                {isAuthenticated ? (
                  <li
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                    className={styles.nav__item}
                  >
                    <Link
                      style={{}}
                      className={styles.nav__link}
                      href="/saved-searches"
                    >
                      Saved Searches
                    </Link>
                  </li>
                ) : null}

                {/* <li
            onClick={() => {
              setIsNavExpanded(false);
            }}
          >
            <Link
              style={{
                
              }}
              href="/contact"
            >
              Contact Us
            </Link>
          </li> */}

                {isAuthenticated ? (
                  <li
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                    className={`${styles.nav__item} ${styles.userBadgeArea} ${styles.nav__link}`}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant={"dot"}
                        color={"success"}
                      >
                        <Avatar
                          sx={{
                            width: "26px",
                            height: "26px",
                            fontSize: "14px",
                          }}
                        >
                          {authDetail?.firstName?.slice(0, 1)}
                        </Avatar>
                      </StyledBadge>
                      <Box style={{}}>{authDetail?.firstName}</Box>
                    </Stack>
                  </li>
                ) : (
                  <li
                    className={`${styles.loginRegisterLinkWhite} ${styles.nav__item} ${styles.nav__link}`}
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                  >
                    <span
                      onClick={() => {
                        setTimeout(() => {
                          handleLogin();
                        }, 500);
                      }}
                    >
                      Login
                    </span>
                    /{" "}
                    <span
                      onClick={() => {
                        setTimeout(() => {
                          handleRegister();
                        }, 500);
                      }}
                    >
                      Register
                    </span>
                  </li>
                )}

                {isAuthenticated && isSmallScreen ? (
                  <li
                    style={{
                      marginTop: "0px",
                    }}
                    className={styles.nav__item}
                    onClick={handleLogout}
                  >
                    <Link className={styles.nav__link} href="/">
                      Logout
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </Box>
          ) : (
            <div className={styles.navigationMenu}>
              <ul
                style={{
                  marginTop: isAuthenticated ? "8px" : "",
                }}
              >
                {/* <li>
              <Link href="/">Home</Link>
            </li> */}
                <li
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  <Link
                    style={{
                      color: pathname === "/" ? "white" : "#4c516d",
                    }}
                    href="/property-search/advance-search"
                    onClick={() => {
                      if (
                        new URLSearchParams(window.location?.search).get(
                          "searchId"
                        )
                      ) {
                        dispatch(
                          handleResetSearchValue({ resetSearchDetail: true })
                        );
                      }
                    }}
                  >
                    Search Properties
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  <Link
                    style={{
                      color: pathname === "/" ? "white" : "#4c516d",
                    }}
                    href="/agents"
                  >
                    Agents
                  </Link>
                </li>

                {isAuthenticated ? (
                  <li
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                  >
                    <Link
                      style={{
                        color: pathname === "/" ? "white" : "#4c516d",
                      }}
                      href="/saved-searches"
                    >
                      Saved Searches
                    </Link>
                  </li>
                ) : null}

                {/* <li
              onClick={() => {
                setIsNavExpanded(false);
              }}
            >
              <Link
                style={{
                  
                }}
                href="/contact"
              >
                Contact Us
              </Link>
            </li> */}

                {isAuthenticated ? (
                  <li onClick={handleClick} style={{ cursor: "pointer" }}>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                      className={styles.userBadgeArea}
                    >
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant={"dot"}
                        color={"success"}
                      >
                        <Avatar
                          sx={{
                            width: "26px",
                            height: "26px",
                            fontSize: "14px",
                          }}
                        >
                          {authDetail?.firstName?.slice(0, 1)}
                        </Avatar>
                      </StyledBadge>
                      <Box
                        sx={{
                          color: pathname === "/" ? "white" : "#4c516d",
                        }}
                      >
                        {authDetail?.firstName}
                      </Box>
                    </Stack>
                  </li>
                ) : (
                  <li
                    className={
                      pathname === "/"
                        ? styles.loginRegisterLinkWhite
                        : styles.loginRegisterLink
                    }
                    onClick={() => {
                      setIsNavExpanded(false);
                    }}
                  >
                    <span onClick={handleLogin}>Login</span>/{" "}
                    <span onClick={handleRegister}>Register</span>
                  </li>
                )}

                {isAuthenticated && isSmallScreen ? (
                  <li
                    style={{
                      marginTop: "0px",
                    }}
                    onClick={handleLogout}
                  >
                    <Link href="/">Logout</Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          )}

          <Box
            sx={{
              "&:after": {
                backgroundColor:
                  process.env.NEXT_PUBLIC_MOBILE_NAVIGATION_COLOR || "#000000",
              },
            }}
            className={styles.splash}
          ></Box>
        </nav>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            zIndex: 999999,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ minWidth: "200px" }}
          onClick={() => {
            router.push("/property-search/results?favs=true");
            handleClose();
          }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <FavoriteBorderOutlinedIcon fontSize="small" />
          </ListItemIcon>
          {favoriteProperties?.meta?.count > 0
            ? favoriteProperties?.meta?.count
            : "No "}{" "}
          Saved Listings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <ResponseAlert
        open={open}
        setOpen={() =>
          dispatch(openAlert({ type: "", message: "", open: false }))
        }
        alertType={type}
        alertMessage={message}
      />
    </Box>
  );
};

export default Header;
