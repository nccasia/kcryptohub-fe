import { useAppSelector } from "@/redux/hooks";
import {
  AccountCircleOutlined,
  AccountCircleRounded,
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
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const user = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [userImage, setUserImage] = useState(user.avatarPath);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setUserImage(user.avatarPath);
  }, [user]);
  return (
    <>
      <div className="bg-primary text-white ">
        <div className="flex flex-col items-center justify-center w-full border-b border-cyan-700">
          <div className="flex md:flex-row flex-col md:items-center items-start justify-center w-full md:w-11/12 lg:w-5/6 px-2 pt-2 py-2">
            <div className="flex justify-between w-full md:w-auto">
              <div className="md:hidden">
                <Menu
                  onClick={() => {
                    setShowMenu(!showMenu);
                    if (showSearch) {
                      setShowSearch(false);
                    }
                  }}
                />
              </div>
              <Link href="/">
                <a className="text-2xl font-semibold text-white cursor-pointer flex items-center">
                  KryptoHub
                </a>
              </Link>
              <label
                className="md:hidden"
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (showMenu) {
                    setShowMenu(false);
                  }
                }}
              >
                <Search />
              </label>
            </div>

            <div
              className={`${
                showMenu ? "flex" : "hidden"
              } md:flex flex-1 w-full xxs:flex-col flex-col md:items-end md:justify-end items-start justify-start`}
            >
              <div className="flex xxs:flex-row flex-col xxs:items-center items-start xs:justify-end justify-between text-white">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search"
                    className="shadow appearance-none border xxs:mb-0 md:block hidden mb-2 w-full focus:outline-none focus:shadow-outline bg-transparent pl-2"
                  />
                  <div className="ml-[-1.5rem]">
                    <Search fontSize="small" />
                  </div>
                </div>
                <div className="tracking-wider text-xs ml-2 hover:underline flex  items-center justify-center">
                  {user.username ? (
                    <div className="flex md:flex-row flex-row-reverse justify-end items-center">
                      <div className="flex group relative">
                        <input
                          type="text"
                          id="showDropdown"
                          className="w-0 peer"
                        />
                        <label
                          htmlFor="showDropdown"
                          className="cursor-pointer"
                        >
                          <span className="block xxs:ml-0 mx-2">ME</span>
                        </label>
                        <div
                          className="invisible flex flex-col absolute z-[100] top-6 p-1 border min-w-[230px] w-full bg-white text-cyan-800 md:right-[-20px] 
               peer-focus:visible  peer-focus:animate-slide-in-up hover:visible text-lg"
                        >
                          <div className="text-gray-900 flex items-center">
                            {userImage ? (
                              <div className="w-[30px] h-[30px] relative mr-1">
                                <Image
                                  src={userImage}
                                  alt="avatar"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            ) : (
                              <AccountCircleOutlined className="text-3xl mr-1" />
                            )}
                            {user.username}
                          </div>
                          <Link href="/profile">
                            <div className="p-1 my-1 border-l-2 border-white hover:border-red-700 hover:text-red-700 cursor-pointer ">
                              <a>Profile</a>
                            </div>
                          </Link>
                          <hr />
                          <Link href="/manage-teams">
                            <div className="p-1 my-1 border-l-2 border-white hover:border-red-700 hover:text-red-700 cursor-pointer ">
                              <a>Manage Teams</a>
                            </div>
                          </Link>
                          <hr />
                          <div
                            className="p-1 my-1 border-l-2  border-white hover:border-red-700 hover:text-red-700 cursor-pointer "
                            onClick={() => {
                              localStorage.removeItem("accessToken");
                              signOut({
                                callbackUrl: "/",
                              });
                            }}
                          >
                            <span>Logout</span>
                          </div>
                        </div>
                      </div>
                      <Link href={"/profile"}>
                        <a>
                          {userImage ? (
                            <Image
                              src={userImage || "/favicon.ico"}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                              width={32}
                              height={32}
                              onError={(e) => {
                                setUserImage("/favicon.ico");
                              }}
                            />
                          ) : (
                            <AccountCircleRounded className="text-thirdary" />
                          )}
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-white font-semibold hover:text-cyan-400 text-right">
                      <Link href={`/login`}>
                        <a>
                          <span className="text-[16px] mx-2">Sign in</span>
                          <PersonOutline className="text-[20px]" />
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row md:items-center items-start xxs:justify-end justify-start font-semibold xl:text-xl pt-4 px-4 lg:text-lg text-md ">
                <div className="cursor-pointer group relative mr-2">
                  <div className="">
                    <Link href={"/teams"}>
                      <a>
                        <span>List Team</span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="border-l border-cyan-700 px-2 cursor-pointer">
                  <span>
                    0 <BookmarkBorderOutlined className="text-red-800" />
                  </span>
                </div>
                <div className="border-l border-cyan-700 px-2 cursor-pointer">
                  <span>
                    0 <ChatOutlined className="text-red-800" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full flex relative ${showSearch ? "flex" : "hidden"}`}
          >
            <div className="flex-[70%] w-full items-center">
              <ChevronLeftIcon className="absolute left-2 bottom-[9px] text-[#08537e] " />
              <input
                className={` md:max-w-[500px] w-full border-2 border-[#cae0e7] md:hidden pl-10 px-3 py-2 outline-none placeholder:text-[#cae0e7] text-black rounded-none `}
              />
            </div>
            <button className="absolute right-0 px-3 py-2 bg-white text-cyan-700 border-2 border-[#cae0e7]">
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
