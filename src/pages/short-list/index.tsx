import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { ITeam } from "@/type/team/team.type";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Container,
  createTheme,
  Pagination,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  ArrowBackIos,
  AvTimerOutlined,
  CheckCircleOutlined,
  ContactlessOutlined,
  GroupsOutlined,
  InfoOutlined,
  LabelOutlined,
  LanguageOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { IconHover } from "../../layouts/team/IconHover";
import { shortListApi } from "@/api/shortList-api";
import { useRouter } from "next/router";
import { getUserInfoSelector } from "@/redux/selector";
import { teamApi } from "@/api/team-api";
import { removeFromShortList } from "@/redux/profileSlice";
import React from "react";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: "2px solid #cae0e7",
          "&.Mui-focused": {
            borderColor: "#17313b",
            boxShadow:
              "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

const ShortList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(getUserInfoSelector);
  const [shortList, setShortList] = useState<ITeam[]>([]);
  const [show, setShow] = useState(false);

  const [pageItem, setPageItem] = useState<ITeam[]>([]);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(1);
  const [next, setNext] = useState(9);

  useEffect(() => {
    shortListApi.getShortList().then((res) => {
      if (res) {
        setShortList(res as ITeam[]);
      }
    });
  }, [userProfile.shortList]);

  useEffect(() => {
    setPageItem(shortList);
  }, [shortList]);
  const handleRemoveFromShortList = (teamId: number) => {
    dispatch(removeFromShortList(teamId));
  };
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="flex items-center justify-center relative bg-primary border-t border-cyan-500  ">
          <div className="py-6 flex items-center justify-start text-white  font-semibold w-full md:w-4/5 px-2">
            <Container>
              <div className="flex items-center justify-start relative">
                <div className="px-4 py-2 w-fit xxs:flex hidden items-center justify-center text-4xl">
                  <span>My Shortlist</span>
                </div>
                <div className="flex items-center justify-center relative ml-4 text-3xl">
                  <div className="px-1">
                    <span>
                      <BookmarkIcon className="text-red-500" />
                    </span>
                  </div>
                  <div className="px-1">
                    <span className="text-sm">
                      {userProfile.shortList?.length || 0} Companies
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <Container>
          <div className="w-full text-[#6a797d]">
            <nav className="mb-4 shadow-md flex-col mx-auto">
              <ul className="flex relative mb-0  pt-1 border-b-[1px] border-[#cae0e7] font-nunito">
                <li className="flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#cae0e7] after:absolute after:h-11 after:w-[1px] after:bottom-0 after:right-0">
                  <button
                    className="text-red-500 pr-2 text-base relative "
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <span className="hover:underline !text-[#104f79]">
                      <ArrowBackIos />
                      Back
                    </span>
                  </button>
                </li>
                <li className="flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#cae0e7] after:absolute after:h-11 after:w-[1px] after:bottom-0 after:right-0 ">
                  <button type="button" className="text-base text-[#104f79]">
                    Share List
                  </button>
                </li>
                <li className="flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#cae0e7] after:absolute after:h-11 after:w-[1px] after:bottom-0 after:right-0 ">
                  <button type="button" className="text-base text-[#104f79]">
                    New List
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {shortList.slice(prev - 1, next).map((team, index) => (
              <div key={index} className="w-full">
                <div className="grid grid-cols-12 w-full border-y my-4 shadow-md flex-col rounded-3xl">
                  <div className="xl:col-span-10 md:col-span-9 col-span-12">
                    <div className="grid grid-cols-12 border-b relative">
                      <div className="xl:col-span-1 md:col-span-2 col-span-12 flex items-center justify-start  p-2">
                        <div className="h-[50px] w-[50px] relative">
                          <Image
                            key={team.id}
                            layout="fill"
                            objectFit="contain"
                            src={teamApi.getTeamImageUrl(team.imageUrl)}
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
                      <div className="xl:col-span-11 md:col-span-10 col-span-12 px-2 flex items-center justify-center">
                        <div className="w-full break-words font-nunito">
                          <Link href={`/team/${team.id}`}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-3xl xxs:inline-block hidden break-words"
                            >
                              <span className="w-full break-words">
                                {team.teamName}
                              </span>
                            </a>
                          </Link>
                          <p className="text-cyan-700 px-2 text-ellipsis inline-block max-w-full">
                            {team.slogan}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 flex-1 text-right">
                          <div className="absolute top-[-6px] right-6 group">
                            <div>
                              {show ? (
                                <div
                                  className="relative"
                                  onMouseEnter={() => setShow(true)}
                                  onMouseLeave={() => setShow(false)}
                                >
                                  <BookmarkIcon
                                    className={`absolute text-cyan-700 cursor-pointer ${
                                      show ? "bg-cyan-800 text-white" : ""
                                    }`}
                                  ></BookmarkIcon>
                                  <div className="absolute w-[220px] bg-white border-2 border-cyan-900 top-[24px] right-[-24px]">
                                    <div className="text-left px-2">
                                      <li className="list-none py-2 cursor-pointer border-b-[1px] font-nunito">
                                        <a
                                          className="text-cyan-800 font-medium"
                                          onClick={() =>
                                            handleRemoveFromShortList(team.id)
                                          }
                                        >
                                          Remove from Shortlist
                                        </a>
                                      </li>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <BookmarkIcon
                                  className={`absolute text-cyan-700 cursor-pointer hover:bg-cyan-800 hover:text-white ${
                                    show ? "hidden" : ""
                                  }`}
                                  onMouseEnter={() => setShow(true)}
                                ></BookmarkIcon>
                              )}
                            </div>
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
                        {
                          <span className="text-cyan-900 flex items-center">
                            <IconHover
                              icon={<LabelOutlined />}
                              hoverText="Project Size"
                            />
                            <span className="text-left ml-1">
                              {team.projectSize}
                            </span>
                          </span>
                        }
                        <span className="text-cyan-900 flex items-center pt-2">
                          <IconHover
                            icon={<GroupsOutlined />}
                            hoverText="Team size"
                          />
                          <span className="text-left ml-1">
                            {team.teamSize} members
                          </span>
                          
                        </span>
                        <span className="text-cyan-900 flex items-center pt-2">
                          <IconHover
                            icon={<AvTimerOutlined />}
                            hoverText="Timezone"
                          />
                          <span className="text-left ml-1">
                            {team.timeZone}
                          </span>
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
                        <div className="flex w-full">
                          <div className="text-cyan-900 w-full break-normal"></div>
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
                                  className="text-cyan-400 cursor-pointer"
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
                  <div className="xl:col-span-2 md:col-span-3 col-span-12 flex flex-row-reverse md:flex-col border-l text-cyan-700 transition-all duration-500 ease-in-out text-md font-nunito">
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
                      <span
                        className="w-full xs:p-4 p-2 flex md:justify-between justify-center bg-red-500 border-2 border-red-500
                    hover:bg-transparent hover:text-red-500 font-nunito rounded-2xl"
                      >
                        Visit Website <LanguageOutlined />
                      </span>
                    </a>
                    <Link href={`/team/${team.id}`}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="xs:p-4 p-2  w-full flex items-center md:justify-between justify-center flex-1"
                      >
                        <span className="hidden xs:block mr-2">
                          View Profile
                        </span>
                        <InfoOutlined />
                      </a>
                    </Link>
                    <Link href={`/team/${team.id}/contact`}>
                      <a className="xs:p-4 p-2 w-full flex items-center md:justify-between justify-center flex-1">
                        <span className="hidden xs:block mr-2">Contact</span>
                        <ContactlessOutlined />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pageItem && pageItem.length > 0 && (
            <Pagination
              className="flex justify-center mb-1"
              count={
                parseInt((shortList?.length % 9).toString()) === 0
                  ? parseInt((shortList?.length / 9).toString())
                  : parseInt((shortList?.length / 9).toString()) + 1
              }
              page={page}
              onChange={(e, value) => {
                setPrev(value * 9 - 8);
                setNext(value * 8 + value);
                setPage(value);
              }}
            />
          )}
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default ShortList;
