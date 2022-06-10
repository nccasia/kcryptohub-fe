import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import { signOut } from "next-auth/react";
import { Header } from "./Header";
import { Modal } from "@mui/material";
import { Footer } from "./Footer";

type IHeaderProps = {
  children: ReactNode;
};
const Layout = (props: IHeaderProps) => {
  const data = useAppSelector((state) => state.ProfileReducer.userInfo);
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
    <>
      <Header />
      <div className="">
        <h1 className="px-20 py-2 text-white bg-cyan-700 font-bold">
          Welcome to KryptoHub <ArrowForwardIosOutlined className="text-sm" />
        </h1>
      </div>

      <div className="">{props.children}</div>

      <Footer />

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

export { Layout };
