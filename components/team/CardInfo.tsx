import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import { getUserInfoSelector } from "@/redux/selector";
import {
  Bookmark,
  BookmarkBorderOutlined,
  BookmarkOutlined,
  Edit,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconMap } from "../IconSVG/IconMap";

const CardInfo = ({ editable }: { editable: boolean }) => {
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
    <div
      className="sticky w-full flex bottom-0 float-right  bg-white z-[9999] border border-[#cae0e7] shadow-xl 
    md:block md:bottom-1/3 md:w-[200px] "
    >
      {editable ? (
        <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center px-4 py-2 md:py-4 cursor-pointer border-r border-[#cae0e7] md:border-0">
          <Link
            href={{
              pathname: `/team/[teamId]/dashboard`,
              query: { teamId: router.query.teamId },
            }}
          >
            <a className="flex items-center justify-between w-full text-sm md:text-base text-[#08537e] hover:underline">
              <span className="hidden xs:block"> Edit Team Profile</span>
              <Edit className="text-secondary" />
            </a>
          </Link>
        </div>
      ) : null}
      <div
        onClick={() => handleVisitWebsite(teamProfile.linkWebsite)}
        className="mx-2 my-3 bg-secondary flex gap-x-2 flex-1 justify-between items-center px-4 py-2 md:py-4 cursor-pointer"
      >
        <span className="text-sm md:text-base text-white">Visit Website</span>
        <div className="w-[16px] h-[16px] flex-none relative">
          <Image
            width="16"
            height="16"
            src={IconMap.WebsiteWhite.src}
            alt="website"
            layout="responsive"
          />
        </div>
      </div>
      <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center px-4 py-2 md:py-4 cursor-pointer border-x border-[#cae0e7] md:border-0">
        {userProfile.shortList?.includes(teamProfile.id) ? (
          <div
            className="w-full flex justify-between"
            onClick={handleRemoveFromShortList}
          >
            <span className="hidden xs:inline-block text-sm md:text-base text-[#08537e] hover:underline">
              In Shortlist
            </span>
            <Bookmark className="text-cyan-700" />
          </div>
        ) : (
          <div
            className="w-full flex justify-between"
            onClick={handleAddToShortList}
          >
            <span className="hidden xs:inline-block text-sm md:text-base text-[#08537e] hover:underline">
              Add to Shortlist
            </span>
            <BookmarkBorderOutlined className="text-cyan-700" />
          </div>
        )}
      </div>
      <Link
        href={{
          pathname: `/team/[teamId]/contact`,
          query: { teamId: router.query.teamId },
        }}
      >
        <div className="bg-white flex gap-x-2 mx-2 my-3 justify-between items-center px-4 py-2 md:py-4 cursor-pointer">
          <span className="hidden xs:block text-sm md:text-base text-[#08537e] hover:underline">
            Send Message
          </span>
          <div className="w-[16px] h-[20px] flex-none relative">
            <Image
              width="16"
              height="20"
              src={IconMap.Message.src}
              alt="message"
              layout="responsive"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardInfo;
