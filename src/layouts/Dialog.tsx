import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export const Dialog = ({
  open,
  setOpen,
  setStep,
  step,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setStep: (step: number) => void;
  step: number;
}) => {
  const router = useRouter();
  return (
    <Modal open={open} className="flex items-center justify-center">
      <div className=" max-w-[500px] md:min-w-[500px] outline-none shadow-2xl bg-white rounded-lg border border-gray-400">
        <h3 className="text-2xl font-bold px-5 py-4 border-b border-gray-400">
          Warning
        </h3>
        <div className="px-5 py-4">
          <span className="text-lg text-bold">
            Are you sure to leave without saving your data?
          </span>
          <div className="flex justify-between w-full">
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded-lg mt-10"
              onClick={() => setOpen(false)}
            >
              No
            </button>
            {step === 1 && (
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg mt-10"
                onClick={() => setStep(0)}
              >
                Yes
              </button>
            )}
            {step === 0 && (
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg mt-10"
                onClick={() => router.push("/manage-teams")}
              >
                Yes
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
