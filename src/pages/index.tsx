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
import { Header } from "../layouts/Header";

const Home: NextPage = () => {
  const data = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => setToken(localStorage.getItem("accessToken") as string));
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProfile())
      .then((data) => {
        if (data.payload.status === "isNew") {
          setOpenWarning(true);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenWarning(false);
    /*  router.push("/profile"); */
  };
  const handleLogOut = () => {
    signOut();
    localStorage.removeItem("accessToken");
  };

  return (
    <>
      <Header />

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
