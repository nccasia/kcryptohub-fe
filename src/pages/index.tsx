import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profile-slice";
import { Modal } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Header } from "../layouts/Header";

const Home: NextPage = () => {
   const router = useRouter();
   const dispatch = useAppDispatch();
   const [openWarning, setOpenWarning] = useState<boolean>(false);

   useEffect(() => {
     dispatch(getProfile()).then((data) => {
      //  if (data.payload.status === "isNew") {
      //    setOpenWarning(true);
      //  }
     });
   }, [dispatch]);

   const handleCloseModal = () => {
     setOpenWarning(false);
     router.push("/profile");
   };
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-cyan-900">
          WELCOME TO KRYPTOHUB
        </h1>
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
    </div>
  );
};

export default Home;
