import React, { useEffect, useRef, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppDispatch } from "@/redux/hooks";
import { removeAllShortList } from "@/redux/profileSlice";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export function ShortlistCard({
  handleRemoveFromShortList,
  title,
  teamId,
}: {
  handleRemoveFromShortList: (id: number) => void;
  teamId: number;
  title: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <div
          className="relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <BookmarkIcon
            className={`absolute text-[#848abd] cursor-pointer ${
              show ? "bg-white text-[#848abd]" : ""
            }`}
          ></BookmarkIcon>
          <div className="absolute w-[220px] bg-white border-2 border-[#848ABD] top-[24px] right-[-24px] rounded-lg shadow-lg">
            <div className="text-left px-2">
              <li className="list-none py-2 cursor-pointer border-b-[1px] font-nunito">
                <a
                  className="text-[#848abd] font-medium"
                  onClick={() => handleRemoveFromShortList(teamId)}
                >
                  {title}
                </a>
              </li>
            </div>
          </div>
        </div>
      ) : (
        <BookmarkIcon
          className={`absolute text-[#848abd] cursor-pointer hover:bg-white hover:text-[#848abd] ${
            show ? "hidden" : ""
          }`}
          onMouseEnter={() => setShow(true)}
        ></BookmarkIcon>
      )}
    </div>
  );
}

interface ShortListModalProps {
  isShowModal: boolean;
  handleCloseModal: () => void;
}

export const ShortListRemoveAllModal = ({
  isShowModal,
  handleCloseModal,
}: ShortListModalProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveAllShortList = async () => {
    toast.success("All teams removed from shortlist");
    handleCloseModal();
    await dispatch(removeAllShortList());
  };

  return (
    <Modal keepMounted open={isShowModal}>
      <div className="absolute top-1/2 left-1/2 rounded-lg  z-40 w-4/5 md:w-5/12 lg:w-2/6 mx-auto bg-white -translate-x-1/2 -translate-y-1/2 focus:outline-none">
        <form className="p-10 font-nunito">
          <label>
            <h1 className="mb-5">Will you need this list in the future?</h1>
            <p className="mb-2">
              You will no longer be able to edit your current list after
              completing this action.
            </p>
          </label>
          <div className="flex justify-between items-center">
            <button
              className="bg-transparent hover:bg-[#848abd] text-[#848abd] font-semibold hover:text-white py-2 px-4 border border-[#848abd] hover:border-transparent rounded"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-[#848abd] hover:bg-[#848abd] text-white font-semibold hover:text-white py-2 px-4 border border-transparent hover:border-[#848abd] rounded"
              type="button"
              onClick={handleRemoveAllShortList}
            >
              Remove All
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export const ShareShortListModal = ({
  isShowModal,
  handleCloseModal,
}: ShortListModalProps) => {
  const router = useRouter();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const baseUrl = typeof window !== "undefined" ? window.location.href : "";
  const link = `${baseUrl}/${router.query.token || accessToken}`;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(inputRef.current?.value as string);
    setIsCopied(true);
  };
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <Modal keepMounted open={isShowModal}>
      <div className="absolute top-1/2 left-1/2 rounded-3xl  z-40 w-4/5  mx-auto bg-white -translate-x-1/2 -translate-y-1/2 focus:outline-none">
        <form className="p-10 font-nunito relative ">
          <label>
            <h1 className="mb-5">Share your shortlist</h1>
            <p className="mb-2">
              You will no longer be able to edit your current list after
              completing this action.
            </p>
          </label>
          <span
            className="absolute right-4 top-4 cursor-pointer z-10 text-base"
            onClick={handleCloseModal}
          >
            X
          </span>
          <div className="flex justify-between items-center">
            <div className="w-full mx-auto py-2">
              <input
                onClick={handleCopy}
                ref={inputRef}
                type="text"
                value={link}
                readOnly
                className="border-solid  bg-[#0000000d] w-full  border-2 border-r-0 border-[#848abd] rounded-l-3xl px-3 py-2 outline-none cursor-pointer"
              />
            </div>
            <button
              className="bg-transparent flex items-center hover:bg-[#848abd] text-[#848abd] font-semibold hover:text-white py-2 px-4 border-2 border-l-0 border-[#848abd] hover:border-transparent rounded-r-3xl "
              type="button"
              onClick={handleCopy}
            >
              <span className="px-2">Copy</span>

              {!isCopied ? (
                <ContentCopyIcon className="w-5 h-5" />
              ) : (
                <CheckCircleOutlineIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
