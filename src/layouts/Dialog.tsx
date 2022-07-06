import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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
      <div className=" max-w-[400px] md:min-w-[500px] outline-none shadow-2xl bg-white rounded-lg border border-gray-400">
        <h3 className="text-2xl flex items-center  font-bold px-5 py-4 border-b border-gray-400">
          <WarningAmberIcon className="mt-[1px] text-yellow-600 mr-1" />
          Warning
        </h3>
        <div className="px-5 py-4">
          <span className="text-md text-bold">
            Do you want to leave this page and discard your changes or stay on this page?
          </span>
          <div className="flex justify-end w-full">
            {step === 1 && (
              <button
                className="px-4 py-2 text-white mr-3 bg-green-700 rounded-lg mt-10"
                onClick={() => setStep(0)}
              >
                OK
              </button>
            )}
            {step === 0 && (
              <button
                className="px-4 py-2 text-white mr-3 bg-green-700 rounded-lg mt-10"
                onClick={() => router.push("/manage-teams")}
              >
                OK
              </button>
            )}
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded-lg mt-10"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
