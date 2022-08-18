import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { ITeam } from "@/type/team/team.type";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Container,
  createTheme,
  Modal,
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
import { removeAllShortList, removeFromShortList } from "@/redux/profileSlice";
import React from "react";
import ShortlistCard from "@/components/team/Shortlist-card";
import { toast } from "react-toastify";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: "2px solid #606060",
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
  const [isShowModal, setIsShowModal] = useState(false);

  const [pageItem, setPageItem] = useState<ITeam[]>([]);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(1);
  const [next, setNext] = useState(9);


  const handleShowModal = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

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
        <div className="flex items-center justify-center relative bg-[#606060] border-t border-[#848abd] font-nunito">
          {/* <div className="py-6 flex items-center justify-start text-white  font-semibold w-full md-2:w-4/5 px-2">
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
          </div> */}
        </div>
        <div className="sticky top-0 z-[40] bg-white w-full text-[#606060]">
          <nav className="w-full mb-4 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center px-[15px] mx-auto">
            <h1 className="text-xl text-left font-bold mt-3 sm:mt-0">
              KryptoHub {">"} Short List
            </h1>
            <ul className="flex justify-end relative mb-0  pt-1  font-nunito">
              <li className="flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#eff0f5]  after:absolute after:h-full after:w-[1px] after:bottom-0 after:right-0">
                <button
                  className="text-[#848abd] pr-2 text-base relative inline-flex"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <ArrowBackIos className="hover:underline !text-[#848abd]" />
                  <span className="hover:underline !text-[#848abd] font-bold">
                    Back
                  </span>
                </button>
              </li>
              <li
                className={`${
                  shortList.length === 0 ? "hidden" : "block"
                } flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#eff0f5]  after:absolute after:h-full after:w-[1px] after:bottom-0 after:right-0 `}
              >
                <button
                  type="button"
                  className="text-base font-bold text-[#606060]"
                >
                  Share List
                </button>
              </li>
              <li
                className={`${
                  shortList.length === 0 ? "hidden" : "block"
                } flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#eff0f5]  after:absolute after:h-full after:w-[1px] after:bottom-0 after:right-0 `}
              >
                <button
                  onClick={handleShowModal}
                  type="button"
                  className="text-base text-[#606060] font-bold"
                >
                  New List
                </button>
              </li>
              <ShortListRemoveAllModal
                isShowModal={isShowModal}
                handleCloseModal={handleCloseModal}
              />
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-center justify-center w-full  font-nunito">
          {shortList.slice(prev - 1, next).map((team, index) => (
            <div key={index} className="w-full px-3">
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
                            className="text-3xl text-[#606060]"
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
                            className="text-3xl xxs:inline-block hidden break-words "
                          >
                            <span className="w-full break-words text-[#606060]">
                              {team.teamName}
                            </span>
                          </a>
                        </Link>
                        <p className="text-[#606060] px-2 text-ellipsis inline-block max-w-full">
                          {team.slogan}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 flex-1 text-right">
                        <div className="absolute top-[-6px] right-6 group">
                          <div>
                            <ShortlistCard
                              teamId={team.id}
                              handleRemoveFromShortList={
                                handleRemoveFromShortList
                              }
                            />
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
                        <span className="text-[#61619b] flex items-center">
                          <IconHover
                            icon={<LabelOutlined className="text-[#606060]" />}
                            hoverText="Project Size"
                          />
                          <span className="text-left ml-1">
                            {team.projectSize}
                          </span>
                        </span>
                      }
                      <span className="text-[#61619b] flex items-center pt-2">
                        <IconHover
                          icon={<GroupsOutlined className="text-[#606060]" />}
                          hoverText="Team size"
                        />
                        <span className="text-left ml-1">
                          {team.teamSize} members
                        </span>
                      </span>
                      <span className="text-[#61619b] flex items-center pt-2">
                        <IconHover
                          icon={<AvTimerOutlined className="text-[#606060]" />}
                          hoverText="Timezone"
                        />
                        <span className="text-left ml-1">{team.timeZone}</span>
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-start p-4 border-x xs:w-1/2 ">
                      <div className="flex w-full">
                        <div className="text-[#606060] w-full break-normal"></div>
                      </div>
                    </div>
                    <div className="xs:w-1/4 p-4 text-sm text-[#606060] font-nunito">
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
                                className="text-[#848abd] cursor-pointer hover:underline"
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
                <div className="xl:col-span-2 md:col-span-3 col-span-12 flex flex-row-reverse md:flex-col border-l text-[#606060] transition-all duration-500 ease-in-out text-md font-nunito">
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
                      className="w-full xs:py-4 py-2 px-2 items-center flex md:justify-between justify-center bg-[#848ABD] 
                      font-nunito rounded-full"
                    >
                      <span className="mr-3 text-sm">Visit Website</span>
                      <LanguageOutlined />
                    </span>
                  </a>
                  <Link href={`/team/${team.id}`}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="xs:p-4 p-2  w-full flex items-center md:justify-between justify-center flex-1"
                    >
                      <span className="hidden xs:block mr-2">View Profile</span>
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
          {shortList.length === 0 && (
            <div className="  py-10 flex items-center justify-center w-full">
              <div className="text-[#7d6d6d9a] inline-flex">
                <span>No Data</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
            </div>
          )}
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
      </ThemeProvider>
    </Layout>
  );
};

export default ShortList;

interface ShortListRemoveAllModalProps {
  isShowModal: boolean;
  handleCloseModal: () => void;
}

const ShortListRemoveAllModal = ({
  isShowModal,
  handleCloseModal,
}: ShortListRemoveAllModalProps) => {
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

const ShareShortListModal = () => {
  return (
    <Modal keepMounted open>
      <div className="absolute top-1/2 left-1/2 rounded-lg  z-40 w-4/5 md:w-5/12 lg:w-2/6 mx-auto bg-white -translate-x-1/2 -translate-y-1/2 focus:outline-none">
        <form className="p-10 font-nunito">
          <label>
            <h1 className="mb-5">Share your shortlist</h1>
            <p className="mb-2">
              You will no longer be able to edit your current list after
              completing this action.
            </p>
          </label>
          <div className="flex justify-between items-center">
            <button
              className="bg-transparent hover:bg-[#848abd] text-[#848abd] font-semibold hover:text-white py-2 px-4 border border-[#848abd] hover:border-transparent rounded"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-[#848abd] hover:bg-[#848abd] text-white font-semibold hover:text-white py-2 px-4 border border-transparent hover:border-[#848abd] rounded"
              type="button"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
