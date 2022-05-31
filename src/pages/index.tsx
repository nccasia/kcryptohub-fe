import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import type { NextPage } from "next";
import { Modal } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const data = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => setToken(localStorage.getItem("accessToken") as string));
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenWarning(false);
    router.push("/profile");
  };
  const handleLogOut = () => {
    signOut();
    localStorage.removeItem("accessToken");
  };

  return (
    <>
      <div onMouseLeave={() => setShow(false)} className="fixed w-full z-10">
        <div className="w-full h-[80px] bg-[#17313b] flex">
          <div className="px-20 py-2 w-full flex justify-between items-center">
            <div className="text-center text-white text-2xl font-bold">
              KryptoHub
            </div>
            <div className="flex items-center">
              <div className="flex text-white mr-10">
                <Link href="/">
                  <a className="text-xl mr-3 ">List team</a>
                </Link>
                <Link href="/">
                  <a className="text-xl mr-3">Services</a>
                </Link>
              </div>

              {token ? (
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
                    <img
                      className={styles.image}
                      src={(data.avatarPath as string) || "/user1.png"}
                      alt="Avarta"
                    />

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
                        <Link href="/profile">
                          <a>Profile</a>
                        </Link>
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

      <div className="h-screen relative top-[80px] w-full">
        <div>
          <h1 className="px-20 py-2 text-white bg-cyan-700 font-bold">
            Welcome to KryptoHub {">"}
          </h1>
          <div className="py-2 h-[300px] relative bg-cyan-100">
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[900px] text-left">
              <h1 className="text-4xl font-700 mb-5">
                The only resource you need to find the right company.
              </h1>

              <h2 className="text-base text-gray-600 mb-5">
                Choose the best-fit company for your business using 98,000+
                client reviews from real people.
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

                <button className="px-10 py-2 bg-transparent mr-2 bg-red-600 text-white rounded-sm">
                  Find Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Home;
