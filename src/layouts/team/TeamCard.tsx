import { teamApi } from "@/api/team-api";
import BadgeHover from "@/components/team/BadgeHover";
import TooltipCustom from "@/components/team/TooltipCustom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import { getUserInfoSelector } from "@/redux/selector";
import { ITeam } from "@/type/team/team.type";

import {
  AccessAlarmOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AvTimerOutlined,
  Bookmark,
  BookmarkBorderOutlined,
  CheckCircleOutlined,
  ContactlessOutlined,
  GroupsOutlined,
  InfoOutlined,
  LabelOutlined,
  LanguageOutlined,
} from "@mui/icons-material";
import {
  ClickAwayListener,
  createTheme,
  ThemeProvider,
  Tooltip,
  Zoom,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconHover } from "./IconHover";

const skillColor = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-stone-500",
  "bg-red-700",
  "bg-orange-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-gray-700",
  "bg-teal-700",
  "bg-cyan-700",
  "bg-lime-700",
  "bg-fuchsia-700",
  "bg-rose-700",
  "bg-stone-700",
  "bg-red-900",
  "bg-orange-900",
  "bg-yellow-900",
  "bg-green-900",
  "bg-blue-900",
  "bg-indigo-900",
  "bg-purple-900",
  "bg-pink-900",
  "bg-gray-900",
  "bg-teal-900",
  "bg-cyan-900",
  "bg-lime-900",
  "bg-fuchsia-900",
  "bg-rose-900",
  "bg-stone-900",
];
interface Props {
  team: ITeam;
}

export const TeamCard = (props: Props) => {
  const team = props.team;
  const userProfile = useAppSelector(getUserInfoSelector);
  const [show, setShow] = useState(false);
  const [teamImgSrc, setTeamImgSrc] = useState(
    team.imageUrl ? teamApi.getTeamImageUrl(team.imageUrl) : "/user1.png"
  );
  const [showAllSkill, setShowAllSkill] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (team.imageUrl) {
      setTeamImgSrc(teamApi.getTeamImageUrl(team.imageUrl));
    }
  }, [team.imageUrl]);

  const handleAddToShortList = () => {
    dispatch(addToShortList(team.id));
  };
  const handleRemoveFromShortList = () => {
    dispatch(removeFromShortList(team.id));
  };

  return (
    <div
      className="grid grid-cols-12 w-full border-y my-4 shadow-md flex-col rounded-lg"
      onMouseEnter={() => setShow(false)}
    >
      <div className="xl:col-span-10 md:col-span-9 col-span-12 ">
        <div className="grid grid-cols-12 border-b relative ">
          <div className="xl:col-span-1 md:col-span-2 col-span-12 flex items-center justify-start p-2">
            <div className="h-[50px] w-[50px] relative">
              <Image
                key={team.id}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                src={teamImgSrc}
                onError={() => setTeamImgSrc("/user1.png")}
                alt="logo"
              />
            </div>
            <div className="xxs:hidden ml-2 md:max-w-[300px] max-w-[250px] break-words ">
              <Link href={`/team/${team.id}`}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl"
                >
                  {team.teamName}
                </a>
              </Link>
            </div>
          </div>
          <div className="xl:col-span-11 md:col-span-10 col-span-12 px-2 pr-6 flex items-center justify-center">
            <div className="w-full break-words font-nunito">
              <Link href={`/team/${team.id}`}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:text-3xl text-2xl xxs:inline-block hidden break-words "
                >
                  <span className="w-full break-words">{team.teamName}</span>
                </a>
              </Link>
              {team.slogan && (
                <p className="text-[#606060] px-2 text-ellipsis inline-block max-w-full">
                  {team.slogan}
                </p>
              )}
            </div>
            <div className="absolute top-0 right-0 flex-1 text-right">
              <div className="absolute top-[-6px] right-6 group ">
                {userProfile.shortList?.includes(team.id) ? (
                  <div>
                    {show ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                      >
                        <Bookmark
                          className={`absolute cursor-pointer ${
                            show ? "bg-white text-[#848ABD]" : ""
                          }`}
                        ></Bookmark>
                        <div className="absolute w-[190px] z-[100] h-[60px] bg-white border-2 border-[#848ABD] rounded-lg top-[24px] right-[-24px]">
                          <div className="text-left px-2">
                            <li className="list-none py-1 cursor-pointer border-b-[1px] font-nunito">
                              <a
                                className="text-[#848ABD]  font-medium"
                                onClick={handleRemoveFromShortList}
                              >
                                Remove from Shortlist
                              </a>
                            </li>

                            <Link href={`/short-list`}>
                              <a className="text-sm text-red-500 hover:underline tracking-widest cursor-pointer font-nunito">
                                View Shortlist {">"}
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Bookmark
                        className={`absolute cursor-pointer text-[#848ABD] hover:bg-white hover:text-[#848ABD] ${
                          show ? "hidden" : ""
                        }`}
                        onMouseEnter={() => setShow(true)}
                      ></Bookmark>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    {show ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                      >
                        <Bookmark
                          className={`absolute cursor-pointer ${
                            show ? "bg-white text-[#848ABD]" : ""
                          }`}
                        ></Bookmark>
                        <div className="absolute w-[150px] z-[100] h-[60px] bg-white border-2 rounded-lg border-[#848ABD] top-[24px] right-[-24px]">
                          <div className="text-left px-2">
                            <li className="list-none py-1 cursor-pointer border-b-[1px] font-nunito">
                              <a
                                className="text-[#848ABD] font-medium "
                                onClick={handleAddToShortList}
                              >
                                Add to Shortlist
                              </a>
                            </li>

                            <Link href={`/short-list`}>
                              <a className=" text-sm text-red-500 hover:underline tracking-widest cursor-pointer font-nunito">
                                View Shortlist {">"}
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <BookmarkBorderOutlined
                        className={`absolute text-[#848ABD] cursor-pointer hover:bg-white hover:text-[#848ABD] ${
                          show ? "hidden" : ""
                        }`}
                        onMouseEnter={() => setShow(true)}
                      ></BookmarkBorderOutlined>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex xs:flex-row flex-col">
          <div className="xs:flex grid grid-cols-2 flex-col text-sm p-4 xs:w-1/4">
            {team.status ? (
              <span className="text-red-500">
                <CheckCircleOutlined /> Verified
              </span>
            ) : null}

            <span className="text-[#606060] font-nunito flex items-end">
              <IconHover icon={<GroupsOutlined />} hoverText="Team size" />
              <span className="text-left ml-1">{team.teamSize} members</span>
            </span>
            <span className="text-[#606060] font-nunito flex items-end pt-3">
              <IconHover icon={<AvTimerOutlined />} hoverText="Timezone" />
              <span className="text-left ml-1">{team.timeZone}</span>
            </span>
          </div>
          <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
            <div className="flex w-full">
              <div className="text-cyan-900 w-full break-normal">
                {team.skills &&
                  (showAllSkill ? team.skills : team.skills.slice(0, 7)).map(
                    (skill, i) => (
                      <TooltipCustom
                        key={i}
                        skillColor={skillColor}
                        skill={skill}
                      />
                    )
                  )}
                {team.skills.length > 7 && !showAllSkill ? (
                  <div className="inline-block p-1 pt-3 font-nunito">
                    <span
                      className={`px-2 py-1 block rounded-2xl border md:max-w-[175px] max-w-[140px] truncate   cursor-pointer text-black ml-2 mt-2 font-medium`}
                      onClick={() => setShowAllSkill(true)}
                    >
                      More
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="xs:w-1/4 p-4 text-sm text-cyan-900 font-nunito">
            <div className="">
              <span className="font-medium ">Founded: </span>
              {team.founded}
            </div>

            <div className="">
              <span className="font-medium ">Description: </span>
              <p className=" overflow-hidden text-ellipsis break-words">
                {team.description?.length > 100
                  ? team.description.slice(0, 100) + "..."
                  : team.description}
                {team.description?.length > 100 ? (
                  <Link href={`/team/${team.id}`}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#606060] hover:underline cursor-pointer"
                    >
                      More
                    </a>
                  </Link>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:col-span-2 md:col-span-3 col-span-12 flex flex-row-reverse md:flex-col border-l text-[#606060] transition-all duration-500 ease-in-out text-md">
        <a
          className="md:p-2 p-1 xs:w-full w-1/2 xs:flex-1 font-semibold text-white cursor-pointer "
          href={
            team.linkWebsite
              ? team.linkWebsite.includes("https")
                ? team.linkWebsite
                : `https://${team.linkWebsite} `
              : "#"
          }
        >
          <span className="w-full xs:py-4 py-2 px-2 items-center flex md:justify-between justify-center bg-[#848ABD] rounded-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)]">
            <span className="pr-2 text-sm">Visit Website</span>
            <LanguageOutlined />
          </span>
        </a>
        <Link href={`/team/${team.id}`}>
          <a className="xs:p-4 p-2  w-full flex items-center md:justify-between justify-center flex-1 font-nunito hover:text-[#848ABD]">
            <span className="hidden xs:block mr-2 ">View Profile</span>
            <InfoOutlined />
          </a>
        </Link>
        <Link href={`/team/${team.id}/contact`}>
          <a className="xs:p-4 p-2 w-full flex items-center md:justify-between justify-center flex-1 font-nunito hover:text-[#848ABD]">
            <span className="hidden xs:block mr-2">Contact</span>
            <ContactlessOutlined />
          </a>
        </Link>
      </div>
    </div>
  );
};
