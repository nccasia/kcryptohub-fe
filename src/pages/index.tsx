import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import type { NextPage } from "next";
import { Collapse, Modal } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  ArrowForwardIosOutlined,
  ArrowForwardOutlined,
  Code,
} from "@mui/icons-material";

const categoty:{[id:string]: string[]} = {
  Development: [
    "Mobile App Development",
    "Software Development",
    "Web Development",
    "AR/VR",
    "Artificial Intelligence",
    "Blockchain",
  ],
  "Design & Production": [
    "Web Design",
    "User Experience Design",
    "Logo Design",
    "Graphics Design",
    "Design & Production",
    "Digital Design",
  ],
  Marketing: [
    "Digital Marketing",
    "SEO",
    "Social Media Marketing",
    "Mobile Marketing",
    "Content Marketing",
    "Search Marketing",
  ],
  Advertising: [
    "Advertising",
    "Branding",
    "Creative Services",
    "Video Production",
    "Public Relations",
    "Media Production",
  ],
  "Business Services": [
    "Mobile App Development",
    "Software Development",
    "Web Development",
    "AR/VR",
    "Artificial Intelligence",
    "Blockchain",
  ],
  "IT Services": [
    "Web Design",
    "User Experience Design",
    "Logo Design",
    "Graphics Design",
    "Design & Production",
    "Digital Design",
  ],
};
const color = [
  "border-blue-500",
  "border-blue-900",
  "border-green-900",
  "border-blue-500",
  "border-cyan-900",
  "border-cyan-500",
]
const Home: NextPage = () => {
  const data = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [show, setShow] = useState(false);

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
  const handleLogOut = () => {
    signOut();
    localStorage.removeItem("accessToken");
  };

  return (
    <div>
      <div onMouseLeave={() => setShow(false)} className="w-full z-10">
        <div className="w-full py-4  bg-cyan-900 flex">
          <div className="px-20 py-2 w-full flex justify-between items-center">
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
      </div>
      <div className="">
        <h1 className="px-20 py-2 text-white bg-cyan-700 font-bold">
          Welcome to KryptoHub <ArrowForwardIosOutlined className="text-sm" />
        </h1>
      </div>
      <div className="p-4 flex items-center justify-center py-24 bg-gradient-to-b from-white to-cyan-100 border border-cyan-500 shadow-lg shadow-gray-200">
        <div className="">
          <h1 className="text-4xl font-700 mb-5">
            The only resource you need to find the right company.
          </h1>

          <h2 className="text-base text-gray-600 mb-5">
            Choose the best-fit company for your business using 98,000+ client
            reviews from real people.
          </h2>
          <div className="flex items-center">
            <h2 className="text-gray-600 mr-5">I am looking for</h2>
            <input
              className="appearance-none relative mr-3 block w-[260px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="e.g.App Development, UX design..."
              type="search"
            />
            <h2 className="text-gray-600 mr-3">in</h2>
            <select className="appearance-none mr-3 relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <option>Location</option>
            </select>

            <button className="px-10 py-2 mr-2 bg-red-500 text-white rounded-sm">
              Find Provider
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-16">
        <div className="w-3/4">
          <div className="flex flex-row ">
            <div className="w-1/3 ">
              <h2 className="text-3xl font-normal mb-4">
                Start Your Search With Our Most Popular Services
              </h2>
              <p className="mb-4 text-gray-600">
                From development to marketing, find your next business partner
                on Clutch.
              </p>
              <Link href="/teams">
                <a className="text-cyan-600 hover:underline">
                  Browse All Services{" "}
                  <ArrowForwardIosOutlined className="text-sm" />
                </a>
              </Link>
            </div>
            <div className="w-16"></div>
            <div className="flex-1 grid grid-cols-2 gap-8">
              {Object.keys(categoty).map((key, index) => (
                <div
                  key={index}
                  className={`p-4  border-t-8 shadow-lg shadow-gray-300 ${color[index]}`}
                >
                  <button className="bg-transparent font-semibold text-2xl flex items-center justify-center">
                    <Code className="text-3xl" /> {key}
                  </button>
                  <Collapse in={true} className="flex flex-col ">
                    {categoty[key].map((item, i) => (
                      <Link key={i} href={"/"}>
                        <a className="block text-cyan-700 text-lg p-2 hover:underline">
                          {item}
                        </a>
                      </Link>
                    ))}
                  </Collapse>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer
        className="w-full bg-cyan-900 relative  h-[400px]
      before:w-full before:h-[1px] before:bg-cyan-600 before:absolute before:top-1/3"
      >
        <div className="flex items-center justify-center h-full">
          <div className=" grid grid-cols-5 gap-x-4 text-white w-5/6 h-full">
            <div className="relative h-full min-h-fit before:w-[1px] before:h-full before:absolute before:right-[-5px] before:bg-cyan-600">
              <div className="mt-[30%] mb-4">
                <h1 className="text-3xl ">KryptoHub</h1>
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
            <div className="px-4 relative mb-16 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-1/4 before:mt-4 before:bg-cyan-600 ">
              <div className="mt-[34%] mb-6 text-gray-400">
                <h1 className="text-2xl ">About Kryptohub</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/2 text-xl font-semibold">
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
            <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-1/4 before:bg-cyan-600 ">
              <div className="mt-[34%] mb-6 text-gray-400">
                <h1 className="text-2xl ">Buyers</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/2 text-xl font-semibold">
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
            <div className="px-4 relative mb-16 before:mt-4 before:w-[1px] before:h-3/4 before:absolute before:right-[-5px] before:top-1/4 before:bg-cyan-600 ">
              <div className="mt-[34%] mb-6 text-gray-400">
                <h1 className="text-2xl ">Service Providers</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/2 text-xl font-semibold">
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
            <div className="px-4 relative mb-16 4">
              <div className="mt-[34%] mb-6 text-gray-400">
                <h1 className="text-2xl ">Contact</h1>
              </div>
              <ul className="flex flex-col justify-around h-1/3 text-xs">
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

export default Home;
