import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/profileSlice";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
const Home: NextPage = () => {
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
    router.push("/profile");
  };
  return (
    <>
      <div>Home page</div>
      <button onClick={() => router.push("/profile")}>Profile page</button>
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
