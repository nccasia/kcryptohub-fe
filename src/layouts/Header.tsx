import { useAppSelector } from "@/redux/hooks";
import {
  AccountCircleOutlined,
  AccountCircleRounded,
  Bookmark,
  BookmarkBorderOutlined,
  ChatOutlined,
  CreateOutlined,
  KeyboardArrowDownOutlined,
  Menu,
  PersonOutline,
  Search,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, ReactElement } from "react";
import { profileApi } from "@/api/profile-api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ClickAwayListener,
  createTheme,
  ThemeProvider,
  Tooltip,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "transparent",
          color: "#fff",
        },
        popper: {
          margin: "0px",
          top: "-10px !important",
        },
        tooltipPlacementBottom: {
          margin: "0px !important",
        },
      },
    },
  },
});

export const Header = () => {
  const user = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [isOpenHamburger, setIsOpenHamburger] = useState(false);
  const [userImage, setUserImage] = useState(
    profileApi.getImageUrl(user.avatarPath)
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const router = useRouter();

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setUserImage(profileApi.getImageUrl(user.avatarPath));
  }, [user.avatarPath]);

  const handleHamburger = () => {
    setIsOpenHamburger(!isOpenHamburger);
  };

  const handleShowPopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={` w-full relative mx-auto  z-50 `}>
        <div
          className={`overlay ${
            isOpenHamburger
              ? "fixed top-0 left-0 pointer-events-auto opacity-50 w-screen h-screen bg-[#000] z-[1000]"
              : "pointer-events-none"
          }`}
        ></div>
        <nav
          ref={headerRef}
          className={` flex items-center justify-between px-[15px] pt-[15px] font-nunito `}
        >
          <div className="py-5 relative">
            <Link href="/">
              <span
                className={`text-3xl font-bold text-center cursor-pointer  text-black 

                `}
              >
                Kryptohub
              </span>
            </Link>
          </div>
          <div className="px-5 hidden md-2:block">
            <div
              className={`w-full inline-flex  text-black items-center justify-center`}
            >
              <Link href="/teams">
                <span className="px-2 mx-4 cursor-pointer text-lg font-medium">
                  List Team
                </span>
              </Link>
              <Link href="/short-list">
                <div className="px-2 mx-4 cursor-pointer">
                  <div className="inline-flex items-center">
                    <span className="pr-2 text-lg font-medium">Short List</span>
                    <div className="relative">
                      <div
                        className={`absolute ${
                          user.shortList?.length ? "inline-block" : "hidden"
                        } top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 w-5 h-5 skew-x-0 skew-y-0 scale-x-100 scale-y-100 
                        ${
                          user.shortList?.length > 0 &&
                          user.shortList?.length < 10
                            ? "py-[5px] px-1"
                            : user.shortList?.length >= 10 &&
                              user.shortList?.length <= 99
                            ? "py-[5px] px-[3px]"
                            : "py-[5px] pl-[3px]"
                        } bg-[#848abd] text-[10px] leading-none text-center  align-baseline font-bold text-white rounded-full z-10`}
                      >
                        {user.shortList?.length >= 99
                          ? 99
                          : user.shortList?.length}
                        {user.shortList?.length > 99 ? <sup>+</sup> : ""}
                      </div>
                      <BookmarkBorderOutlined className="text-[#61619b] w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-2 mx-4 cursor-pointer ">
                <div className="inline-flex items-center ">
                  <span className="pr-2 text-lg font-medium">Message</span>
                  <div className="relative">
                    <div
                      className={`absolute !hidden inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 w-5 h-5 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-[5px] px-1 bg-[#848abd] text-[10px] leading-none text-center  align-baseline font-bold text-white rounded-full z-10`}
                    >
                      9{/* <sup>+</sup> */}
                    </div>
                    <ChatOutlined className="text-[#61619b] w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5">
            <div className="flex items-center justify-center w-full  py-5 h-full  ">
              <div
                className="block px-[5px] space-y-1 cursor-pointer md-2:hidden"
                onClick={handleHamburger}
              >
                <span
                  className={`block w-6 h-1 bg-black   ${
                    isOpenHamburger
                      ? "transform transition duration-500 ease-in-out rotate-45 translate-y-2"
                      : "transform transition duration-500 ease-in-out "
                  }`}
                />
                <span
                  className={`block w-6 h-1  bg-black ${
                    isOpenHamburger
                      ? "transform transition duration-500 ease-in-out opacity-0"
                      : "transform transition duration-500 ease-in-out "
                  }`}
                />
                <span
                  className={`block w-6 h-1  bg-black  ${
                    isOpenHamburger
                      ? "transform  transition duration-500 ease-in-out -rotate-45  -translate-y-2"
                      : "transform transition duration-500 ease-in-out "
                  }`}
                />
              </div>
              <div className="hidden px-[5px] md-2:block">
                <svg
                  className={`w-6 h-6 text-black cursor-pointer`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="hidden relative px-[5px] md-2:block tracking-wider ">
                {user?.username ? (
                  <>
                    <div className="inline-flex ">
                      {userImage ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 block relative">
                            <Image
                              src={userImage}
                              alt="avatar"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <ClickAwayListener onClickAway={handleClosePopUp}>
                            <div className="bg-transparent relative">
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleClosePopUp}
                                placement="bottom"
                                open={showPopUp}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <div
                                    className={`flex flex-col font-nunito absolute z-[900] top-7 p-1 border min-w-[230px] w-full h-fit bg-white text-cyan-800 md:right-[-20px] 
                              ${
                                !showPopUp ? "invisible" : "visible"
                              }  animate-slide-in-up hover:visible text-lg rounded-lg `}
                                  >
                                    <div className="text-gray-900">
                                      <Link href="/profile">
                                        <div className="p-1 my-1 border-l-2 border-white hover:border-[#848abd] hover:text-[#848abd] cursor-pointer ">
                                          <a>Profile</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <Link href="/manage-teams">
                                        <div className="p-1 my-1 border-l-2 border-white hover:border-[#848abd] hover:text-[#848abd] cursor-pointer ">
                                          <a>Manage Teams</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <div
                                        className="p-1 my-1 border-l-2  border-white hover:border-[#848abd] hover:text-[#848abd] cursor-pointer "
                                        onClick={() => {
                                          localStorage.removeItem(
                                            "accessToken"
                                          );
                                          signOut({
                                            callbackUrl: "/",
                                          });
                                        }}
                                      >
                                        <span>Logout</span>
                                      </div>
                                    </div>
                                  </div>
                                }
                              >
                                <span
                                  className={`
                                      text-black 
                                 px-2 font-semibold  cursor-pointer`}
                                  onClick={handleShowPopUp}
                                >
                                  {user.username}
                                </span>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </div>
                      ) : (
                        <>
                          <svg
                            className={`w-6 h-6 text-black `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <ClickAwayListener onClickAway={handleClosePopUp}>
                            <div className="bg-transparent relative">
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleClosePopUp}
                                placement="bottom"
                                open={showPopUp}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <div
                                    className={`flex flex-col font-nunito absolute z-[900] top-7 p-1 border min-w-[230px] w-full h-fit bg-white text-cyan-800 md:right-[-20px] 
                              ${
                                !showPopUp ? "invisible" : "visible rounded-lg"
                              }  animate-slide-in-up hover:visible text-lg`}
                                  >
                                    <div className="text-gray-900">
                                      <Link href="/profile">
                                        <div className="p-1 my-1 border-l-2 border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer ">
                                          <a>Profile</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <Link href="/manage-teams">
                                        <div className="p-1 my-1 border-l-2 border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer ">
                                          <a>Manage Teams</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <div
                                        className="p-1 my-1 border-l-2  border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer "
                                        onClick={() => {
                                          localStorage.removeItem(
                                            "accessToken"
                                          );
                                          signOut({
                                            callbackUrl: "/",
                                          });
                                        }}
                                      >
                                        <span>Logout</span>
                                      </div>
                                    </div>
                                  </div>
                                }
                              >
                                <span
                                  className={`
                                    "text-black "
                                 px-2 font-semibold  cursor-pointer`}
                                  onClick={handleShowPopUp}
                                >
                                  {user.username}
                                </span>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <span
                        className={`font-semibold mx-2 cursor-pointer text-black hover:underline`}
                      >
                        Sign in
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div
          className={`fixed top-0 bottom-0 bg-[#1e2228] w-[300px] left-0 px-6 pb-2 z-[1040] visible md-2:hidden ${
            isOpenHamburger
              ? "transition-transform duration-300 ease-in-out transform origin-top-left -translate-x-0"
              : "transition-transform duration-300 ease-in-out transform origin-top-left -translate-x-[300px]"
          }`}
        >
          <div className="relative">
            <div className="py-12 relative">
              <a
                href="index.html"
                className="text-3xl font-bold text-center text-white font-nunito"
              >
                <span>Kryptohub</span>
              </a>
            </div>
            <div
              className="absolute right-0 top-3 cursor-pointer"
              onClick={() => setIsOpenHamburger(false)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <div className="font-jost">
                {user?.username ? (
                  <Accordion
                    className={`bg-[#1e2228] shadow-none w-full relative ${
                      user?.username ? "block" : "hidden"
                    }`}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className="w-6 h-6 text-white" />
                      }
                      className="px-0"
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="inline-flex w-full">
                        <>
                          {userImage ? (
                            <div className="w-6 h-6 block relative mr-1">
                              <Image
                                src={userImage}
                                alt="avatar"
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          ) : (
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}

                          <span className="text-white px-2 font-semibold font-nunito">
                            {user.username}
                          </span>
                        </>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        className={`text-white flex flex-col w-full font-nunito`}
                      >
                        <Link href="/profile">
                          <div className="pr-1 py-2 my-1 cursor-pointer">
                            <a className="text-lg font-medium">Profile</a>
                          </div>
                        </Link>
                        <hr />
                        <Link href="/manage-teams">
                          <div className="pr-1 py-2 my-1 cursor-pointer">
                            <a className="text-lg font-medium">Manage Teams</a>
                          </div>
                        </Link>
                        <hr />
                        <div
                          className="pr-1 py-2 my-1 cursor-pointer"
                          onClick={() => {
                            localStorage.removeItem("accessToken");
                            signOut({
                              callbackUrl: "/",
                            });
                          }}
                        >
                          <span className="text-lg font-medium">Logout</span>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Link className="w-full" href="/login">
                    <span className="text-white cursor-pointer font-semibold">
                      Sign in
                    </span>
                  </Link>
                )}
              </div>
              <div>
                <div className="w-full text-white flex flex-col font-nunito">
                  <Link href="/teams">
                    <span className="pr-2 py-4 mr-4 cursor-pointer text-lg font-medium">
                      List Team
                    </span>
                  </Link>
                  <Link href="/short-list">
                    <div className="pr-2 py-4 mr-4 cursor-pointer">
                      <div className="inline-flex items-center">
                        <span className="pr-2 text-lg font-medium">
                          Short List
                        </span>
                        <div className="relative">
                          <div
                            className={`absolute ${
                              user.shortList?.length ? "inline-block" : "hidden"
                            } top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 w-5 h-5 skew-x-0 skew-y-0 scale-x-100 scale-y-100 
                        ${
                          user.shortList?.length > 0 &&
                          user.shortList?.length < 10
                            ? "py-[5px] px-1"
                            : user.shortList?.length >= 10 &&
                              user.shortList?.length <= 99
                            ? "py-[5px] px-[3px]"
                            : "py-[5px] pl-[3px]"
                        } bg-[#848abd] text-[10px] leading-none text-center  align-baseline font-bold text-white rounded-full z-10`}
                          >
                            {user.shortList?.length >= 99
                              ? 99
                              : user.shortList?.length}
                            {user.shortList?.length > 99 ? <sup>+</sup> : ""}
                          </div>
                          <BookmarkBorderOutlined className="text-[#61619b]  w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="pr-2 py-4 mr-4 cursor-pointer">
                    <div className="inline-flex items-center">
                      <span className="pr-4 text-lg font-medium">Message</span>
                      <div className="relative">
                        <div
                          className={`absolute !hidden inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 w-5 h-5 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-[5px] px-1 bg-[#848abd] text-[10px] leading-none text-center  align-baseline font-bold text-white rounded-full z-10`}
                        >
                          9
                        </div>
                        <ChatOutlined className="text-[#61619b]  w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default function useWindowSize() {
  function getSize() {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
