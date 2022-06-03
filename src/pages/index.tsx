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
import { Collapsor } from "../layouts/Collapsor";
import { Header } from "../layouts/Header";
import { Layout } from "../layouts/layout";

const categoty: { [id: string]: string[] } = {
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
];
const Home: NextPage = () => {
  return (
    <Layout>
      <div className="">
        <h1 className="px-20 py-2 text-white bg-cyan-700 font-bold">
          Welcome to KryptoHub <ArrowForwardIosOutlined className="text-sm" />
        </h1>
      </div>
      <div>
        <div className="p-4 flex items-center justify-center py-24 bg-gradient-to-b from-white to-cyan-50 border border-cyan-300 shadow-lg shadow-gray-200">
          <div className="">
            <h1 className="text-4xl font-700 mb-5">
              The only resource you need to find the right company.
            </h1>
            <h2 className="text-base text-gray-600 mb-5">
              Choose the best-fit company for your business using 98,000+ client
              reviews from real people.
            </h2>
            <div className="flex lg:flex-row flex-col items-start">
              <h2 className="text-gray-600 mr-5">I am looking for</h2>
              <div className="flex md:flex-row flex-col w-full">
                <input
                  className="appearance-none relative mr-3 block w-full px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="e.g.App Development, UX design..."
                  type="search"
                />
                <h2 className="text-gray-600 mr-3">in</h2>
                <select className="appearance-none mr-3 relative block w-full px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                  <option>Location</option>
                </select>

                <button className="px-10 py-2 mr-2 bg-red-500 text-white rounded-sm w-full">
                  Find Provider
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-16">
          <div className="w-3/4">
            <div className="flex flex-col xl:flex-row ">
              <div className="w-full xl:w-1/3 ">
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
              <div className="flex-1 grid md:grid-cols-2 grid-cols-1 gap-8">
                {Object.keys(categoty).map((key, index) => (
                  <Collapsor
                    key={index}
                    label={key}
                    color={color[index]}
                    isOpen={true}
                    preIcon={<Code />}
                  >
                    {categoty[key].map((item, i) => (
                      <Link key={i} href={"/"}>
                        <a className="block text-cyan-700 text-lg p-2 hover:underline">
                          {item}
                        </a>
                      </Link>
                    ))}
                  </Collapsor>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
