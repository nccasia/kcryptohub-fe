import { useAppDispatch } from "@/redux/hooks";
import { getShortList } from "@/redux/shortListSlice";
import { RootState } from "@/redux/store";
import { Layout } from "@/src/layouts/layout";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { ITeamShortList, Team } from "@/type/team/team.type";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { teamApi } from "@/api/team-api";

import {
  AccessAlarmOutlined,
  ApartmentOutlined,
  ApiOutlined,
  AvTimerOutlined,
  BookmarkBorderOutlined,
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
  const dispatch = useAppDispatch();
  const shortList = [
    {
      id: 144,
      teamName: "vdd",
      teamSize: "1,000-9,999",
      timeZone: "UTC+11",
      workingTime: null,
      saleEmail: "vđa@gmail.com",
      description: "sdggg",
      imageUrl: null,
      slogan: "fd",
      founded: "2020",
      linkWebsite: "https://kryptohub-fe.herokuapp.com/teams",
      projectSize: "1-5",
      status: false,
    },
    {
      id: 146,
      teamName: "dgg",
      teamSize: "250-499",
      timeZone: "UTC+3",
      workingTime: null,
      saleEmail: "cv@gmail.com",
      description: "cvc",
      imageUrl: null,
      slogan: "dvdv",
      founded: "1956",
      linkWebsite: "gdgs.com",
      projectSize: "1-5",
      status: false,
    },
    {
      id: 142,
      teamName: "Viettonkin Consulting",
      teamSize: "10 - 49",
      timeZone: "UTC+7",
      workingTime: "25 - 49",
      saleEmail: "thangng@gmail.com",
      description:
        "Viettonkin is a multi-disciplinary group of Foreign Direct Investment focused consulting firms headquartered in Hanoi, Vietnam with a strong presence throughout Southeast Asia with offices in Ho Chi Minh City and Jakarta.",
      imageUrl:
        "https://img.shgstatic.com/clutchco-static/image/scale/65x65/s3fs-public/logos/f22c3fea2b8bbd0a825edee5b456d51b.png",
      slogan: "Your one-stop business solution hub in ASEAN",
      founded: "2010",
      linkWebsite: "https://www.viettonkin.com.vn/",
      projectSize: "1,000",
      status: false,
    },
  ];
  // useSelector(
  //   (state: RootState) => state.ShortListReducer.shortList
  // );

  useEffect(() => {
    dispatch(getShortList());
  }, [dispatch]);
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
                    <span className="text-sm">{"total"} Companies</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <Container>
          <div className="w-full text-[#6a797d]">
            <nav className="mb-4 shadow-md flex-col mx-auto">
              <ul className="flex relative mb-0  pt-1 border-b-[1px] border-[#cae0e7]">
                <li className="flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#cae0e7] after:absolute after:h-11 after:w-[1px] after:bottom-0 after:right-0">
                  <a
                    href="/teams"
                    className="text-red-500 pr-2 text-base relative "
                  >
                    {"<"}
                    <span className="hover:underline !text-[#104f79]">
                      {" "}
                      Back
                    </span>
                  </a>
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
            {shortList.map((team, index) => (
              <>
                <div className="grid grid-cols-12 w-full border-y my-4 shadow-md flex-col">
                  <div className="xl:col-span-10 md:col-span-9 col-span-12">
                    <div className="grid grid-cols-12 border-b relative">
                      <div className="xl:col-span-1 md:col-span-2 col-span-12 flex items-center justify-start  p-2">
                        <div className="h-[50px] w-[50px] relative">
                          <Image
                            key={team.id}
                            layout="fill"
                            objectFit="contain"
                            src={team.imageUrl ?? "/user1.png"}
                            //  onError={() => setTeamImgSrc("/user1.png")}
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
                        <div className="w-full break-words">
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
                            <BookmarkIcon className="absolute text-[#08537e]" />
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
                          <span className="text-cyan-900">
                            <IconHover
                              icon={<LabelOutlined />}
                              hoverText="Project Size"
                            />
                            <span className="text-left ml-1">
                              {team.projectSize}
                            </span>
                          </span>
                        }
                        <span className="text-cyan-900">
                          <IconHover
                            icon={<GroupsOutlined />}
                            hoverText="Team size"
                          />
                          <span className="text-left ml-1">
                            {team.teamSize}
                          </span>{" "}
                          members
                        </span>
                        <span className="text-cyan-900">
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
                      <div className="xs:w-1/4 p-4 text-sm text-cyan-900">
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
                  <div className="xl:col-span-2 md:col-span-3 col-span-12 flex flex-row-reverse md:flex-col border-l text-cyan-700 transition-all duration-500 ease-in-out text-md">
                    <a
                      className="md:p-2 p-1 xs:w-full w-1/2 xs:flex-1 font-semibold text-white  border cursor-pointer "
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
                    hover:bg-transparent hover:text-red-500"
                      >
                        Visit Website <LanguageOutlined />
                      </span>
                    </a>
                    <Link href={`/team/${team.id}`}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="xs:p-4 p-2  w-full flex items-center md:justify-between justify-center border flex-1"
                      >
                        <span className="hidden xs:block mr-2">
                          View Profile
                        </span>
                        <InfoOutlined />
                      </a>
                    </Link>
                    <Link href={`/team/${team.id}/contact`}>
                      <a className="xs:p-4 p-2 w-full flex items-center md:justify-between justify-center border flex-1">
                        <span className="hidden xs:block mr-2">Contact</span>
                        <ContactlessOutlined />
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </Container>
      </ThemeProvider>
    </Layout>
  );
};

export default ShortList;
