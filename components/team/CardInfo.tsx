import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import { getUserInfoSelector } from "@/redux/selector";
import {
  Bookmark,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  ChatOutlined,
  Language,
  SettingsOutlined,
  Edit,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IconMap } from "../IconSVG/IconMap";

const CardInfo = ({ editable }: { editable: boolean }) => {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const userProfile = useAppSelector(getUserInfoSelector);
  const router = useRouter();
  const handleVisitWebsite = (url: string) => {
    if (typeof window !== "undefined") window.open(url, "_blank")?.focus();
  };
  const dispatch = useAppDispatch();

  const handleAddToShortList = () => {
    dispatch(addToShortList(teamProfile.id));
  };
  const handleRemoveFromShortList = () => {
    dispatch(removeFromShortList(teamProfile.id));
  };

  return (
    <div>
      <div
        className="hidden fixed w-[50px] flex top-0 right-4 float-right
    md:block md:top-44 rounded-full z-[9999] font-nunito"
      >
        <div
          className="mb-3 fixed w-[50px] flex right-4 float-right bg-white border border-[#848ABD] shadow-xl 
    md:block top-32 rounded-full"
        >
          <div
            className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer border-x border-[#cae0e7] md:border-0"
            onClick={() => setShow((cur) => !cur)}
          >
            <div>
              <SettingsOutlined className="text-[#404040] text-md hover:text-[#848ABD]" />
            </div>
          </div>
        </div>
        <div
          className={`fixed mt-4 w-[50px] flex  right-4 float-right bg-white z-[9999] border border-[#848ABD] shadow-xl 
      rounded-full transition-all ${show ? "md:block" : "hidden"}`}
        >
          {editable ? (
            <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center cursor-pointer border-r border-[#cae0e7] md:border-0">
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard`,
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
                  <Edit className="text-[#404040] text-[20px] hover:text-[#848ABD] " />
                  <div
                    className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                      hover ? "" : "hidden"
                    }`}
                  >
                    Edit
                  </div>
                </a>
              </Link>
            </div>
          ) : null}
          <div
            onClick={() => handleVisitWebsite(teamProfile.linkWebsite)}
            className="mx-2 my-3 flex gap-x-2 flex-col justify-center items-center rounded-full cursor-pointer"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => {
              setHover1(false);
            }}
          >
            <div className="w-full flex justify-center relative">
              <Language className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                  hover1 ? "" : "hidden"
                }`}
              >
                Website
              </div>
            </div>
          </div>
          <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer border-x border-[#cae0e7] md:border-0">
            {userProfile.shortList?.includes(teamProfile.id) ? (
              <div
                className="w-full flex justify-center relative"
                onClick={handleRemoveFromShortList}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => {
                  setHover2(false);
                }}
              >
                <Bookmark className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
                <div
                  className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                    hover2 ? "" : "hidden"
                  }`}
                >
                  Shortlist
                </div>
              </div>
            ) : (
              <div
                className="w-full flex justify-center relative"
                onClick={handleAddToShortList}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => {
                  setHover2(false);
                }}
              >
                <BookmarkBorderOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
                <div
                  className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                    hover2 ? "" : "hidden"
                  }`}
                >
                  Shortlist
                </div>
              </div>
            )}
          </div>
          <Link
            href={{
              pathname: `/team/[teamId]/contact`,
              query: { teamId: router.query.teamId },
            }}
          >
            <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center items-center cursor-pointer">
              <div
                className="w-full flex justify-center relative"
                onMouseEnter={() => setHover3(true)}
                onMouseLeave={() => {
                  setHover3(false);
                }}
              >
                <ChatOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
                <div
                  className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px]  ${
                    hover3 ? "" : "hidden"
                  }`}
                >
                  Contact
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div
        className="block md:hidden sticky w-full  flex bottom-0 float-right bg-white z-[9999] border border-[#cae0e7] shadow-xl 
    md:bottom-1/3"
      >
        {editable ? (
          <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center cursor-pointer border-r border-[#cae0e7] md:border-0">
            <Link
              href={{
                pathname: `/team/[teamId]/dashboard`,
                query: { teamId: router.query.teamId },
              }}
            >
              <a
                className="flex items-center justify-center w-[80px] relative "
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                <Edit className="text-[#404040] text-[20px] hover:text-[#848ABD] " />
                <div
                  className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                    hover ? "" : "hidden"
                  }`}
                >
                  Edit
                </div>
              </a>
            </Link>
          </div>
        ) : null}
        <div
          onClick={() => handleVisitWebsite(teamProfile.linkWebsite)}
          className="mx-2 my-3 flex gap-x-2 flex-col justify-center items-center rounded-full cursor-pointer"
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => {
            setHover1(false);
          }}
        >
          <div className="w-full flex justify-center w-[80px] relative">
            <Language className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
            <div
              className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                hover1 ? "" : "hidden"
              }`}
            >
              Website
            </div>
          </div>
        </div>
        <div className="bg-white flex gap-x-2 mx-2 my-3 justify-center w-[80px] items-center cursor-pointer border-x border-[#cae0e7] md:border-0">
          {userProfile.shortList?.includes(teamProfile.id) ? (
            <div
              className="w-full flex justify-center relative "
              onClick={handleRemoveFromShortList}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => {
                setHover2(false);
              }}
            >
              <Bookmark className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                  hover2 ? "" : "hidden"
                }`}
              >
                Shortlist
              </div>
            </div>
          ) : (
            <div
              className="w-full flex justify-center relative"
              onClick={handleAddToShortList}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => {
                setHover2(false);
              }}
            >
              <BookmarkBorderOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px] ${
                  hover2 ? "" : "hidden"
                }`}
              >
                Shortlist
              </div>
            </div>
          )}
        </div>
        <Link
          href={{
            pathname: `/team/[teamId]/contact`,
            query: { teamId: router.query.teamId },
          }}
        >
          <div className="bg-white flex gap-x-2 mx-2 my-3  justify-center items-center cursor-pointer">
            <div
              className="w-full flex justify-center relative w-[80px]"
              onMouseEnter={() => setHover3(true)}
              onMouseLeave={() => {
                setHover3(false);
              }}
            >
              <ChatOutlined className="text-[#404040] text-[20px] hover:text-[#848ABD]" />
              <div
                className={`absolute right-9 rounded-md px-2 py-2 top-[-8px] bg-[#848ABD] text-white after:content-['']  after:border-[#848ABD] after:border-solid after:rotate-90 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-10px] after:bottom-[18px]  ${
                  hover3 ? "" : "hidden"
                }`}
              >
                Contact
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardInfo;
