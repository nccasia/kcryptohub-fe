import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";;
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import { signOut } from "next-auth/react";
import { Header } from "./Header";
import { Modal } from "@mui/material";

type IHeaderProps = {
  children: ReactNode;
};
const Layout = (props: IHeaderProps) => {
  const data = useAppSelector(state=> state.ProfileReducer.userInfo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken") && !data.username) {
      dispatch(getProfile())
        .then((data) => {
          if (data.payload.status === "isNew") {
            setOpenWarning(true);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [data.username, dispatch]);

  const handleCloseModal = () => {
    setOpenWarning(false);
    router.push("/profile");
  };
  return (
    <div>
      <Header />
      {/* <div onMouseLeave={() => setShow(false)} className="w-full z-10">
        <div className="w-full py-4  bg-cyan-900 flex">
          <div className="px-20 py-2 w-full flex sm:flex-row flex-col justify-between items-center">
            <div className="text-center text-white text-2xl font-bold">
              KryptoHub
            </div>
            <div className="flex items-center">
              <div className="flex text-white mr-10">
                <Link href="/teams">
                  <a className="text-xl mr-3 ">List team</a>
                </Link>
                <Link href="/">
                  <a className="text-xl mr-3">Services</a>
                </Link>
              </div>

              {data.username ? (
                <div>
                  <a
                    onMouseEnter={() => setShow(true)}
                    className="hover:cursor-pointer flex items-center text-white"
                    onClick={() => {
                      if (show) {
                        setShow(false);
                      } else setShow(true);
                    }}
                  >
                    <Image
                      className={styles.image}
                      src={(data.avatar as string) || "/user1.png"}
                      width={40}
                      height={40}
                      alt="Avarta"
                    ></Image>

                    <span className="ml-2">
                      {data.username}
                      {!show ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </span>
                  </a>
                  <div
                    className={`w-[140px] shadow-md bg-white absolute mt-2  items-center flex flex-col ${
                      !show ? "hidden" : "block"
                    }`}
                  >
                    <ul className={styles.dropDown}>
                      <li className="px-2 py-2 text-center hover:bg-gray-200 w-full list-none hover:cursor-pointer">
                        Profile
                      </li>
                      <li className="py-2 hover:bg-gray-200 w-full text-center list-none">
                        <Link href="/manage-teams">
                          <a>Manage team</a>
                        </Link>
                      </li>

                      <button
                        onClick={handleLogOut}
                        className="px-2 py-2 hover:bg-gray-200 w-full"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <Link href="/login">
                    <a className="px-4 py-2 text-white bg-red-500 rounded">
                      Login
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div className="">
        <h1 className="px-20 py-2 text-white bg-cyan-700 font-bold">
          Welcome to KryptoHub <ArrowForwardIosOutlined className="text-sm" />
        </h1>
      </div>
      <div className="">
        {props.children}
      </div>
      <footer
        className="w-full bg-cyan-900 relative 
      before:w-full before:h-[1px] before:bg-cyan-600 before:absolute lg:before:top-1/4 md:before:top-1/2 before:top-1/3"
      >
        <div className="flex items-center justify-center h-full">
          <div className=" grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-x-4 text-white container-xl h-full pl-8">
            <div className="relative h-full min-h-fit before:w-[1px] before:h-full before:absolute before:right-[-5px] before:bg-cyan-600">
              <div className="mt-[17%] mb-6">
                <h1 className="xl:text-3xl text-xl">KryptoHub</h1>
              </div>
              <ul className="text-xs flex flex-col justify-around h-1/3">
                <li>&copy; 2022 Kryptohub</li>
                <li>
                  <a href="https://clutch.co/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="https://clutch.co/privacy">Privacy</a>
                </li>
                <li>
                  We updated our Terms of Service
                  <br />
                  on August 9, 2021.
                </li>
              </ul>
            </div>
            <div className="px-4 relative mb-16 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:mt-4 before:bg-cyan-600 ">
              <div className="mt-[20%] mb-6 text-gray-400">
                <h1 className="xl:text-2xl text-lg">About Kryptohub</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/2 lg:text-md xl:text-lg font-semibold">
                <li>
                  <a href="https://clutch.co/about-us" title="Our Story">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="https://clutch.co/careers" title="Careers">
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/press-releases"
                    title="News & Press Releases"
                  >
                    News & Press Releases
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/methodology"
                    title="Research Methodology"
                  >
                    Research Methodology
                  </a>
                </li>
              </ul>
            </div>
            <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:bg-cyan-600 ">
              <div className="mt-[20%] mb-6 text-gray-400">
                <h1 className="xl:text-2xl text-lg">Buyers</h1>
              </div>
              <ul className="flex flex-col justify-around h-3/4 lg:text-md xl:text-lg font-semibold">
                <li>
                  <a
                    href="https://clutch.co/sitemap"
                    title="Browse All Directories"
                  >
                    Browse All Directories
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/review"
                    title="Review Service Providers"
                  >
                    Review Service Providers
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/review/review-to-donate"
                    title="Review to Donate"
                  >
                    Review to Donate
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/resources"
                    title="Blog & Industry Surveys"
                  >
                    Blog & Industry Surveys
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/your-project"
                    title="Concierge Service"
                  >
                    Concierge Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.clutch.co/knowledge/for-buyers"
                    title="Buyer FAQs"
                  >
                    Buyer FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-[20%] before:bg-cyan-600 ">
              <div className="mt-[20%] mb-6 text-gray-400">
                <h1 className="text-lg xl:text-2xl ">Service Providers</h1>
              </div>
              <ul className="flex flex-col justify-around h-3/4 lg:text-md xl:text-lg font-semibold">
                <li>
                  <a
                    href="https://clutch.co/service-providers"
                    title="Service Provider Guide"
                  >
                    Service Provider Guide
                  </a>
                </li>
                <li>
                  <a href="https://clutch.co/get-listed" title="Get Listed">
                    Get Listed
                  </a>
                </li>
                <li>
                  <a href="https://clutch.co/sponsorship" title="Sponsorship">
                    Sponsorship
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/service-providers/marketing"
                    title="Marketing Opportunities"
                  >
                    Marketing Opportunities
                  </a>
                </li>
                <li>
                  <a
                    href="https://help.clutch.co/knowledge/for-service-providers"
                    title="Service Provider FAQs"
                  >
                    Service Provider FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="px-4 relative mb-16 4">
              <div className="mt-[20%] mb-6 text-gray-400">
                <h1 className="text-lg xl:text-2xl ">Contact</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/3 text-xs">
                <li>
                  <a
                    href="https://help.clutch.co/contact-us"
                    title="Contact Us"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://surveys.hotjar.com/s?siteId=197386&surveyId=136158"
                    title="Site Feedback"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Site Feedback
                  </a>
                </li>
                <li>
                  1800 Massachusetts Ave. NW,
                  <br />
                  Suite 200
                  <br />
                  Washington DC 20036
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <Modal open={openWarning}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 outline-none shadow-2xl bg-white rounded-lg border border-gray-400">
          <h3 className="text-2xl font-bold px-5 py-4 border-b border-gray-400">
            Warning
          </h3>
          <div className="px-5 py-4">
            <span>Please complete your information</span>
            <div className="text-right">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg mt-10"
                onClick={handleCloseModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { Layout };
