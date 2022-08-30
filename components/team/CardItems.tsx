import { useAppDispatch } from "@/redux/hooks";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import {
  Edit,
  ChatOutlined,
  Language,
  Bookmark,
  BookmarkBorderOutlined,
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function CardItems({
  type,
  pathName,
  title,
  website,
  checkShortlist,
  teamId,
  handleShowModal,
}: {
  type: number;
  pathName?: string;
  title: string;
  website?: string;
  checkShortlist?: boolean;
  teamId?: number;
  handleShowModal?: () => void;
}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddToShortList = () => {
    dispatch(addToShortList(teamId || NaN));
  };
  const handleRemoveFromShortList = () => {
    dispatch(removeFromShortList(teamId || NaN));
  };
  const handleVisitWebsite = (url: string) => {
    if (typeof window !== "undefined") window.open(url, "_blank")?.focus();
  };
  return (
    <>
      {type === 1 && (
        <Link
          href={{
            pathname: pathName,
            query: { teamId: router.query.teamId },
          }}
        >
          <a
            className="flex items-center justify-center w-full relative "
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            {title === "Edit" && (
              <Edit className="text-[#404040] text-[20px] hover:text-[#848ABD] " />
            )}

            {title === "Contact" && (
              <ChatOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD] " />
            )}

            <div
              className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                hover ? "" : "hidden"
              }`}
            >
              {title}
            </div>
          </a>
        </Link>
      )}

      {type === 2 && (
        <div
          onClick={() => handleVisitWebsite(website || "")}
          className="mx-2 my-3 flex gap-x-2 flex-col justify-center items-center rounded-full cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="w-full flex justify-center relative">
            <Language className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
            <div
              className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                hover ? "" : "hidden"
              }`}
            >
              {title}
            </div>
          </div>
        </div>
      )}

      {type === 3 && (
        <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer border-x border-[#cae0e7] md:border-0">
          {checkShortlist ? (
            <div
              className="w-full flex justify-center relative"
              onClick={handleRemoveFromShortList}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <Bookmark className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                  hover ? "" : "hidden"
                }`}
              >
                {title}
              </div>
            </div>
          ) : (
            <div
              className="w-full flex justify-center relative"
              onClick={handleAddToShortList}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <BookmarkBorderOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                  hover ? "" : "hidden"
                }`}
              >
                {title}
              </div>
            </div>
          )}
        </div>
      )}

      {type === 4 && (
        <div
          className="w-full flex justify-center relative"
          onClick={handleShowModal}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <GroupsIcon className="text-[#404040] w-5 h-5 hover:text-[#848ABD]" />
          <div
            className={`absolute right-9 w-[88px] rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px]  ${
              hover ? "" : "hidden"
            }`}
          >
            {title}
          </div>
        </div>
      )}
    </>
  );
}

export default CardItems;
