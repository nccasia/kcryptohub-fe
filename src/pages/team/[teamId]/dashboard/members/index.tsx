import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMember,
  getMemberList,
  removeMember,
  resetSuccess,
} from "@/redux/memberSlice";
import { getUserInfoSelector } from "@/redux/selector";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { emails, IMember, IMemberAddRequest } from "@/type/member/member.type";
import {
  Chip,
  ClickAwayListener,
  Container,
  createTheme,
  FormControl,
  Pagination,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
import iconchecked from "@/src/assets/image/icon-check.svg";
import iconToolip from "@/src/assets/image/icon-tooltip.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParsedUrlQueryInput } from "querystring";

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#fff",
          color: "#fff",
        },
        popper: {
          margin: "0px",
          left: "-100px !important",
        },
        tooltipPlacementBottom: {
          margin: "0px !important",
        },
      },
    },
  },
});

const mailColor = [
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
];
const mailRegexp = new RegExp(
  /^[a-zA-Z0-9.]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}
const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(50, "Max length is 50 characters!")
    .matches(mailRegexp, "Incorrect email format"),
});

interface PaginationQueryParams {
  page: string;
}

const Members = () => {
  const [email, setEmail] = useState<string>("");
  const [tags, setTags] = useState<emails[]>([]);
  const [openPermissions, setOpenPermissions] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [disableIvt, setDisableIvt] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean[]>([]);

  const DEFAULT_SIZE = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const dispatch = useAppDispatch();
  const actionSuccess = useSelector(
    (state: RootState) => state.MemberReducer.success
  );

  const router = useRouter();
  const teamId = router.query.teamId;

  const Owner = useAppSelector(getUserInfoSelector);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const checkDuplicate = (email: string) => {
    const check = memberList?.find((member) => member.emailAddress === email);
    if (check) {
      return true;
    }
    return false;
  };

  const handleOpenPermissions = () => setOpenPermissions(!openPermissions);
  const handleOpenStatus = () => setOpenStatus(!openStatus);

  const handleClosePermissions = () => setOpenPermissions(false);
  const handleCloseStatus = () => setOpenStatus(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value.replaceAll("\n", "").trim());
    if (mailRegexp.test(e.target.value)) {
      setDisableIvt(true);
    }
    setDisableIvt(false);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && mailRegexp.test(email)) {
      setTags((tag) => {
        if (checkDuplicate(email)) {
          toast.warning(`${email} is already in the team`, {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return tag;
        }

        if (email === Owner.emailAddress) {
          toast.warning(`${email} is owner of the team`, {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return tag;
        }

        if (tags.find((tag) => tag.email === email)) {
          toast.warning(`${email} is already exist`, {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return tag;
        }
        const newTag = [
          ...tag,
          {
            email: email.replaceAll("\\r|\\n", "").toLowerCase(),
            role: "member",
          },
        ];
        if (newTag.length >= 0) {
          setDisableIvt(true);
        }

        return newTag;
      });
      setEmail("".trim());

      e.preventDefault();
    }
  };
  const memberList = useSelector(
    (state: RootState) => state.MemberReducer?.member
  );

  const pageAble = useSelector(
    (state: RootState) => state.MemberReducer?.pageable
  );

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        getMemberList({
          teamId: parseInt(teamId as string),
          page: currentPage,
          size: DEFAULT_SIZE,
        })
      );

      const getMaxPage = () => {
        return Math.ceil(pageAble?.total / pageAble?.size);
      };

      if (currentPage > getMaxPage() && getMaxPage() > 0) {
        setCurrentPage(getMaxPage());
      } else if (currentPage < 1) {
        setCurrentPage(1);
      } else {
        setTotalPage(getMaxPage());
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const query = {} as PaginationQueryParams;
      if (currentPage > 1) {
        query.page = currentPage.toString();
      }

      (async () => {
        router.push({
          pathname: `/team/${teamId as string}/dashboard/members`,
          query: query as unknown as ParsedUrlQueryInput,
        });
      })();
    }
  }, [
    dispatch,
    teamId,
    currentPage,
    pageAble?.total,
    pageAble?.size,
    router.isReady,
  ]);

  useEffect(() => {
    if (actionSuccess === true) {
      dispatch(resetSuccess());
      dispatch(getMemberList({ teamId: parseInt(teamId as string) }));
    }
  }, [actionSuccess, dispatch, teamId]);

  const handleSubmit = async () => {
    reset();
    if (success === true) return;
    const data: IMemberAddRequest = {
      teamId: parseInt(teamId as string),
      members: tags,
    };

    setSuccess(true);
    await dispatch(addMember(data));
  };

  const handleClose = () => {
    setSuccess(false);
    setTags([]);
    setDisableIvt(false);
  };
  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteMember = async (index: number) => {
    if (onLoading[index]) return;
    const onLoadArray: boolean[] = onLoading;

    onLoadArray[index] = true;

    setOnLoading(onLoadArray);

    await dispatch(
      removeMember({ teamId: parseInt(teamId as string), memberId: index })
    );
  };

  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <Container fixed maxWidth="lg" className="md:!px-8">
          <div className="w-full h-full">
            <div className="w-full block bg-thirdary h-full relative ">
              <div className="my-2">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="shadow-lg block lg:inline-flex py-2 my-3 lg:items-end px-3 bg-white"
                >
                  <FormControl className="p-2">
                    <h1 className="py-2 text-lg font-semibold">
                      Invite Members
                    </h1>
                    <span
                      className={
                        !success
                          ? "py-1 text-sm font-normal "
                          : "py-1 text-sm font-normal hidden"
                      }
                    >
                      Add team members via email{" "}
                      <span className="opacity-50 ">
                        (separate emails with a enter if correct format):
                      </span>
                    </span>
                    <div
                      className={
                        !success
                          ? `outline-none  border-[1px] border-[#cae0e7] ${
                              errors.email && "border-[2px] border-red-400"
                            }`
                          : "outline-none"
                      }
                    >
                      {tags.map((tag, index) => (
                        <Chip
                          variant="outlined"
                          className={
                            !success
                              ? `${mailColor[index]} mr-2 my-2 text-white `
                              : `${mailColor[index]} mr-2 my-2 text-white hidden`
                          }
                          key={index}
                          label={tag.email}
                          deleteIcon={
                            <HighlightOffIcon className="w-5 h-5 text-white" />
                          }
                          onDelete={() => handleDeleteTag(index)}
                        />
                      ))}

                      <textarea
                        tabIndex={1}
                        maxLength={50}
                        className={
                          !success
                            ? `w-full h-20 outline-none rounded border-none resize-none p-1 mt-0`
                            : "w-full h-20 outline-none rounded border-none resize-none p-1 hidden"
                        }
                        {...register("email", {
                          onChange: handleChange,
                        })}
                        placeholder="name@profilename.com..."
                        value={email}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className={!success ? "mr-10 hidden" : "mr-10"}>
                      <div className="flex justify-center">
                        <span className="pr-3">
                          <Image
                            className="w-4 h-4"
                            src={iconchecked}
                            alt="iconchecked"
                          />
                        </span>
                        <div className="flex flex-col">
                          <span>Invites have been sent to:</span>
                          {tags.map((tag, index) => (
                            <span key={index}>{tag.email}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FormControl>

                  <div className={!success ? "ml-3 pb-2 " : "ml-3 pb-2 hidden"}>
                    <button
                      type="submit"
                      tabIndex={2}
                      onClick={handleSubmit}
                      disabled={!disableIvt ? true : false}
                      className={
                        !disableIvt
                          ? "py-2 px-4 border-[1px] border-[#cae0e7] rounded shadow cursor-not-allowed"
                          : "py-2 px-4 border-[1px] border-[#cae0e7] rounded shadow "
                      }
                    >
                      <span>Invite</span>
                    </button>
                  </div>

                  <div className={!success ? "py-2 hidden" : "py-2"}>
                    <button
                      tabIndex={2}
                      onClick={handleClose}
                      className="py-2 px-4 border-[1px] border-green-400 rounded shadow"
                    >
                      <span>Send more invites</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white w-full h-full block relative overflow-x-auto shadow-md my-2 drop-shadow">
              <div className="xl:w-full w-[1200px] table p-3">
                <h1 className="font-bold text-xl py-1 px-4">Member</h1>
                <div className="flex items-center justify-center">
                  <div className="w-1/5 px-4 py-2 text-base font-normal">
                    <span>Username</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal">
                    <span>Email address</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal cursor-help relative">
                    <ClickAwayListener onClickAway={handleClosePermissions}>
                      <div className="bg-transparent relative">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleClosePermissions}
                          placement="bottom"
                          open={openPermissions}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title={
                            <div className="absolute top-[calc(100% + 1px)] left-0 right-0 w-[180px] z-50 bg-[white] shadow-lg drop-shadow">
                              <div className="p-[10px]">
                                <div className="py-1 text-black">
                                  <div className="font-bold">Profile Owner</div>
                                  <div>Profile administrator</div>
                                  <div>Member administrator</div>
                                </div>
                                <div className="py-1 text-black">
                                  <div className="font-bold">Admin</div>
                                  <div>
                                    Profile administrator; cannot add new
                                    members
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        >
                          <div
                            onClick={handleOpenPermissions}
                            className="relative"
                          >
                            <span>Permissions</span>
                            {!openPermissions ? (
                              <span className="w-3 h-3 absolute right-0 z-20 top-0 left-[88px] rounded-full">
                                <Image
                                  className="w-full h-full"
                                  src={iconToolip}
                                  alt="tooltip"
                                />
                              </span>
                            ) : (
                              <span className="w-3 h-3 absolute right-0 z-20 border-[1px] border-[#3e839e] top-[7px] left-[88px] rounded-full after:absolute after:w-3 after:h-[1px] after:-right-[1px] after:bg-[#3e839e] after:rotate-90 after:top-[17px]"></span>
                            )}
                          </div>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal cursor-help relative">
                    <ClickAwayListener onClickAway={handleCloseStatus}>
                      <div className="bg-transparent">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleCloseStatus}
                          placement="bottom"
                          open={openStatus}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title={
                            <div className="absolute top-[calc(100% + 8px)] w-[180px] z-50 bg-[white] shadow-lg drop-shadow ">
                              <div className="p-[10px]">
                                <div className="py-1 text-black">
                                  <div className="font-bold">
                                    Invite Pending
                                  </div>
                                  <div>
                                    The invite {"hasn't"} been accepted yet.
                                  </div>
                                </div>
                                <div className="py-1 text-black">
                                  <div className="font-bold">
                                    Invite Expired
                                  </div>
                                  <div>Invite expire after 72 hours</div>
                                </div>
                              </div>
                            </div>
                          }
                        >
                          <div onClick={handleOpenStatus} className="relative">
                            <span>Invite Status</span>
                            {!openStatus ? (
                              <span className="w-3 h-3 absolute right-0 z-20 top-0 left-[88px] rounded-full">
                                <Image
                                  className="w-full h-full"
                                  src={iconToolip}
                                  alt="tooltip"
                                />
                              </span>
                            ) : (
                              <span
                                className="w-3 h-3 absolute right-0 z-20 border-[1px] border-[#3e839e]  top-[7px] left-[88px]  rounded-full after:absolute after:w-3 after:h-[1px] after:-right-[1px] after:bg-[#3e839e] after:rotate-90 after:top-[17px]
                                                  "
                              ></span>
                            )}
                          </div>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal">
                    <span>Options</span>
                  </div>
                </div>
                <div className="border-[1px] py-3 flex items-center justify-center">
                  <div className="w-1/5 px-2 py-2 text-sm font-normal inline-flex items-center">
                    <span className="pr-2">
                      <AccountCircleIcon className="w-5 h-5" />
                    </span>
                    {Object.entries(Owner).length !== 0 ? (
                      <span className="text-[#17313b]">{Owner.username}</span>
                    ) : (
                      <div className="bg-[#1b08086c] w-full h-[10px] rounded-3xl animate-pulse"></div>
                    )}
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal">
                    {Object.entries(Owner).length !== 0 ? (
                      <span className="text-[#17313b]">
                        {Owner.emailAddress}
                      </span>
                    ) : (
                      <div className="bg-[#1b08086c] w-full h-[10px] rounded-3xl animate-pulse"></div>
                    )}
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal">
                    <span className="text-[#17313b]">Owner</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                </div>
                <ul className="w-full" aria-label="aria-owns">
                  {memberList?.map((item, index) => (
                    <li
                      key={index}
                      className="border-[1px] py-3 flex items-center justify-center"
                    >
                      <div className="w-1/5 px-2 py-2 text-sm font-normal">
                        <span className="pr-2">
                          <AccountCircleIcon className="w-5 h-5" />
                        </span>
                        <span>
                          {item.user === null
                            ? "-"
                            : item.user?.username.trim()}
                        </span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        <span className="text-[#17313b] w-full">
                          {item.emailAddress.trim().replace(/\s/g, "")}
                        </span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        <span className="text-[#17313b]">{item.role}</span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        {item.inviteStatus === InviteStatus.PENDING ? (
                          <div className="bg-[#cae0e7] rounded-3xl px-2 py-1 w-[110px] text-center">
                            <span className="!text-xs">Invite Pending</span>
                          </div>
                        ) : item.inviteStatus === InviteStatus.ACCEPTED ? (
                          <div className="bg-[#d51512] text-[#fff] rounded-3xl px-2 py-1 w-[110px] text-center">
                            <span className="!text-xs">Accepted</span>
                          </div>
                        ) : (
                          <div className="bg-[#ff3d2e] text-[#fff] rounded-3xl px-2 py-1 w-[110px] text-center">
                            <span className="!text-xs">invite Expired</span>
                          </div>
                        )}
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        {item.inviteStatus === InviteStatus.REJECTED ? (
                          <>
                            <div className="cursor-pointer hover:underline text-blue-500">
                              Resend
                            </div>
                            {" | "}
                            <div
                              tabIndex={3}
                              onClick={() => deleteMember(item.id)}
                              className="cursor-pointer hover:underline text-blue-500"
                            >
                              Remove
                            </div>
                          </>
                        ) : (
                          <>
                            {!onLoading[item.id] ? (
                              <div
                                tabIndex={3}
                                onClick={() => {
                                  deleteMember(item.id);
                                }}
                                className={
                                  "cursor-pointer hover:underline text-blue-500"
                                }
                              >
                                Remove
                              </div>
                            ) : (
                              <div className="text-sm text-gray-700">
                                <svg
                                  fill="none"
                                  className="w-6 h-6 animate-spin"
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  )) ?? (
                    <>
                      <li className="border-[1px] py-3 flex items-center justify-center animate-pulse">
                        <div className="w-1/5 px-2 py-2 text-sm font-normal inline-flex items-center">
                          <span className="pr-2 ">
                            <AccountCircleIcon className="w-5 h-5" />
                          </span>
                          <div className="bg-[#1b08086c] w-full h-[10px] rounded-3xl"></div>
                        </div>
                        <div className="w-1/5 px-4 py-2 text-sm font-normal flex">
                          <span className="bg-[#1b08086c] w-full h-[10px] rounded-3xl"></span>
                        </div>
                        <div className=" w-1/5 px-4 py-2 text-sm font-normal flex">
                          <span className="bg-[#1b08086c] w-full h-[10px] rounded-3xl"></span>
                        </div>
                        <div className="w-1/5 px-4 py-2 text-sm font-normal flex">
                          <span className="bg-[#1b08086c] w-full h-[10px] rounded-3xl"></span>
                        </div>
                        <div className=" w-1/5 px-4 py-2 text-sm font-normal flex">
                          <span className="bg-[#1b08086c] w-full h-[10px] rounded-3xl"></span>
                        </div>
                      </li>
                    </>
                  )}
                  {memberList?.length === 0 && (
                    <>
                      <li className="border-[1px] py-3 flex items-center justify-center w-full">
                        <span>No Data</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center pb-2">
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={(e, value) => {
                  handlePageChange(value);
                }}
              />
            </div>
          </div>
        </Container>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="top-left" />
    </DashboardLayout>
  );
};

export default Members;
