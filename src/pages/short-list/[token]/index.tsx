import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Layout } from "@/src/layouts/layout";
import { ITeam } from "@/type/team/team.type";
import { createTheme, Modal, Pagination, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ShareShortListModal,
  ShortlistCard,
} from "@/components/team/Shortlist-card";
import {
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
import Image from "next/image";
import Link from "next/link";
import { IconHover } from "../../../layouts/team/IconHover";
import { useRouter } from "next/router";
import { teamApi } from "@/api/team-api";
import { shareShortListWithAccessToken } from "@/redux/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToShortList, removeFromShortList } from "@/redux/profileSlice";
import { getUserInfoSelector } from "@/redux/selector";
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

const ShareShortList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = router.query;
  const userProfile = useAppSelector(getUserInfoSelector);
  useEffect(() => {
    if (router.isReady) {
      dispatch(shareShortListWithAccessToken(token as string));
    }
  }, [router.isReady]);

  const [shortList, setShortList] = useState<ITeam[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const getShareShortList = useSelector(
    (state: RootState) => state.ProfileReducer.shortList
  );

  const [pageItem, setPageItem] = useState<ITeam[]>([]);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(1);
  const [next, setNext] = useState(9);

  const handleAddToShortList = async (id: number) => {
    return await dispatch(addToShortList(id));
  };

  const handleRemoveFromShortList = async (id: number) => {
    return await dispatch(removeFromShortList(id));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (getShareShortList?.length > 0) {
      setShortList(getShareShortList);
    }
  }, [getShareShortList]);

  useEffect(() => {
    setPageItem(shortList);
  }, [shortList]);

  const handleShowModal = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="flex items-center justify-center relative bg-[#606060] border-t border-[#848abd] font-nunito"></div>
        <div className="sticky top-0 z-[40] bg-white w-full text-[#606060]">
          <nav className="w-full mb-4 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center px-[15px] mx-auto">
            <h1 className="text-xl text-left font-bold mt-3 sm:mt-0">
              KryptoHub {">"} Short List
            </h1>
            <ul className="flex justify-end relative mb-0  pt-1  font-nunito">
              <li
                className={`${
                  shortList?.length === 0 ? "invisible" : "visible"
                } flex justify-center py-6 mx-0 relative  text-center min-w-fit w-28 after:bg-[#eff0f5]  after:absolute after:h-full after:w-[1px] after:bottom-0 after:right-0 `}
              >
                <button
                  type="button"
                  onClick={handleShowModal}
                  className="text-base font-bold text-[#606060]"
                >
                  Share List
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <ShareShortListModal
          isShowModal={isShowModal}
          handleCloseModal={handleCloseModal}
        />
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
                          {userProfile?.shortList.includes(team.id) ? (
                            <>
                              <ShortlistCard
                                title="Remove from Shortlist "
                                teamId={team.id}
                                handleRemoveFromShortList={
                                  handleRemoveFromShortList
                                }
                              />
                            </>
                          ) : (
                            <>
                              <ShortlistCard
                                title="Add to Shortlist "
                                teamId={team.id}
                                handleRemoveFromShortList={handleAddToShortList}
                              />
                            </>
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

          {shortList?.length === 0 && (
            <div className="  py-10 my-5 flex items-center justify-center w-full h-full">
              <div className="text-[#7d6d6d9a] text-4xl">
                <h1>Not found</h1>
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

export default ShareShortList;

interface Props {
  team: ITeam;
}

// const Card = (props: Props) => {
//   const team = props.team;
//   const dispatch = useAppDispatch();
//   const [show, setShow] = useState(false);
//   const userProfile = useAppSelector(getUserInfoSelector);
// const handleAddToShortList = async (id: number) => {
//     return await dispatch(addToShortList(id));
//   };
//   const handleRemoveFromShortList = async (id: number) => {
//     return await dispatch(removeFromShortList(id));
//   };

//   return (
//     <>
//     {userProfile.shortList?.includes(team.id) ? (
//       <div>
//         {show ? (
//           <div
//             className="relative"
//             onMouseEnter={() => setShow(true)}
//             onMouseLeave={() => setShow(false)}
//           >
//             <Bookmark
//               className={`absolute cursor-pointer ${
//                 show ? "bg-white text-[#848ABD]" : ""
//               }`}
//             ></Bookmark>
//             <div className="absolute w-[190px] z-[100] h-[60px] bg-white border-2 border-[#848ABD] rounded-lg top-[24px] right-[-24px]">
//               <div className="text-left px-2">
//                 <li className="list-none py-1 cursor-pointer border-b-[1px] font-nunito">
//                   <a
//                     className="text-[#848ABD]  font-medium"
//                     onClick={() =>
//                       handleRemoveFromShortList(team.id)
//                     }
//                   >
//                     Remove from Shortlist
//                   </a>
//                 </li>

//                 <Link href={`/short-list`}>
//                   <a className="text-sm text-red-500 hover:underline tracking-widest cursor-pointer font-nunito">
//                     View Shortlist {">"}
//                   </a>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Bookmark
//             className={`absolute cursor-pointer text-[#848ABD] hover:bg-white hover:text-[#848ABD] ${
//               show ? "hidden" : ""
//             }`}
//             onMouseEnter={() => setShow(true)}
//           ></Bookmark>
//         )}
//       </div>
//     ) : (
//       <div className="relative">
//         {show ? (
//           <div
//             className="relative"
//             onMouseEnter={() => setShow(true)}
//             onMouseLeave={() => setShow(false)}
//           >
//             <Bookmark
//               className={`absolute cursor-pointer ${
//                 show ? "bg-white text-[#848ABD]" : ""
//               }`}
//             ></Bookmark>
//             <div className="absolute w-[150px] z-[100] h-[60px] bg-white border-2 rounded-lg border-[#848ABD] top-[24px] right-[-24px]">
//               <div className="text-left px-2">
//                 <li className="list-none py-1 cursor-pointer border-b-[1px] font-nunito">
//                   <a
//                     className="text-[#848ABD] font-medium "
//                     onClick={() =>
//                       handleAddToShortList(team.id)
//                     }
//                   >
//                     Add to Shortlist
//                   </a>
//                 </li>

//                 <Link href={`/short-list`}>
//                   <a className=" text-sm text-red-500 hover:underline tracking-widest cursor-pointer font-nunito">
//                     View Shortlist {">"}
//                   </a>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <BookmarkBorderOutlined
//             className={`absolute text-[#848ABD] cursor-pointer hover:bg-white hover:text-[#848ABD] ${
//               show ? "hidden" : ""
//             }`}
//             onMouseEnter={() => setShow(true)}
//           ></BookmarkBorderOutlined>
//         )}
//       </div>
//     )}
//     </>
//   )

// }
