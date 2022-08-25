import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMember,
  getMemberList,
  removeMember,
  resetSuccess,
} from "@/redux/memberSlice";
import {
  getUserInfoSelector,
  getDashboardInformationSelector,
} from "@/redux/selector";
import { RootState } from "@/redux/store";
import iconchecked from "@/src/assets/image/icon-check.svg";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { emails, IMemberAddRequest } from "@/type/member/member.type";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
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
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { ErrorOutline } from "@mui/icons-material";
import { Layout } from "@/src/layouts/layout";
import { joinTeamApi } from "@/api/joinTeam-api";
import {
  addToMemberList,
  changeStatus,
  deleteContact,
  getContact,
  resetSuccessContact,
} from "@/redux/joinTeamContactSlice";

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
  const Team = useAppSelector(getDashboardInformationSelector);

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
            position: "bottom-right",
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
            position: "bottom-right",
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
            position: "bottom-right",
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

      dispatch(getContact(parseInt(teamId as string)));

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

  const ContactJoinTeam = useSelector(
    (state: RootState) => state.JoinTeamContactReducer.memberContact
  );

  const contactJoinTeamSuccess = useSelector(
    (state: RootState) => state.JoinTeamContactReducer.success
  );

  const isApproved = useSelector(
    (state: RootState) =>
      state.JoinTeamContactReducer.changeStatusSuccess.isApproved
  );

  const userIsApproved = useSelector(
    (state: RootState) =>
      state.JoinTeamContactReducer.changeStatusSuccess.userId
  );

  useEffect(() => {
    if (actionSuccess === true || contactJoinTeamSuccess === true) {
      dispatch(resetSuccess());
      dispatch(resetSuccessContact());
      dispatch(getMemberList({ teamId: parseInt(teamId as string) }));
    }
  }, [actionSuccess, contactJoinTeamSuccess, dispatch, teamId]);

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

  const approveMember = async (id: number) => {
    toast.success("Approve Success");
    return await dispatch(changeStatus(id));
  };

  const deleteMemberContact = async (id: number) => {
    toast.success("Delete Success");
    return await dispatch(deleteContact(id));
  };

  useEffect(() => {
    if (isApproved) {
      dispatch(
        addToMemberList({
          teamId: parseInt(teamId as string),
          userId: userIsApproved,
        })
      );
    }
  }, [dispatch, teamId, isApproved, userIsApproved]);

  useEffect(() => {
    if (contactJoinTeamSuccess === true) {
      dispatch(resetSuccessContact());
      dispatch(getContact(parseInt(teamId as string)));
    }
  }, [contactJoinTeamSuccess, dispatch, teamId]);
  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <div className="font-nunito">
          <div className="w-11/12 mx-auto">
            <div className="w-full h-full relative flex flex-col xl:flex-row ">
              <div className="my-2 mr-1 w-full xl:w-1/2 ">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="shadow-lg block lg:inline-flex py-2 my-3 lg:items-end px-3 bg-white rounded-3xl"
                >
                  <FormControl className="p-2">
                    <h1 className="py-2 text-lg 3xl:text-2xl font-semibold text-[#606060]">
                      Invite Members
                    </h1>
                    <span
                      className={
                        !success
                          ? "py-1 3xl:py-2 text-sm 3xl:text-xl font-normal text-[#606060]"
                          : "py-1 3xl:py-2 text-sm 3xl:text-xl font-normal hidden text-[#606060]"
                      }
                    >
                      Add team members via email{" "}
                      <span className="opacity-50 text-[#606060]">
                        (separate emails with a enter if correct format):
                      </span>
                    </span>
                    <div
                      className={
                        !success
                          ? `outline-none  border-[1px] border-[#eff0f5] rounded-3xl shadow-lg ${
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
                              ? `${
                                  mailColor[index % mailColor.length]
                                } mr-2 my-2 text-white `
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
                        disabled={Owner?.id === Team?.userId ? false : true}
                        maxLength={50}
                        className={
                          !success
                            ? `w-full h-20 outline-none rounded-3xl border-none resize-none p-2 mt-0 3xl:text-xl 3xl:placeholder:text-2xl`
                            : "w-full h-20 outline-none rounded-3xl border-none resize-none p-2 hidden 3xl:text-xl 3xl:placeholder:text-2xl"
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
                        <div className="flex flex-col text-[#606060]">
                          <span className="3xl:text-2xl">
                            Invites have been sent to:
                          </span>
                          {tags.map((tag, index) => (
                            <span key={index} className="3xl:text-xl">
                              {tag.email}
                            </span>
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
                          ? "py-2 px-4 border-[1px] border-[#eff0f5] rounded-3xl shadow cursor-not-allowed"
                          : "py-2 px-4 border-[1px] border-[#eff0f5] rounded-3xl shadow "
                      }
                    >
                      <span className="3xl:text-2xl">Invite</span>
                    </button>
                  </div>

                  <div className={!success ? "py-2 hidden" : "py-2"}>
                    <button
                      tabIndex={2}
                      onClick={handleClose}
                      className="py-2 px-4 border-[1px] border-green-400 rounded-3xl shadow text-[#606060]"
                    >
                      <span className="3xl:text-2xl">Send more invites</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="my-2 ml-1 w-full xl:w-1/2">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="shadow-lg block   my-3 w-full max-h-[200px] px-3 overflow-auto bg-white rounded-3xl"
                >
                  <div className="table-auto w-[700px] md:w-full ">
                    <h1 className="py-2  text-lg 3xl:text-2xl font-semibold text-[#606060]">
                      Request Join Team
                    </h1>
                    <div className="sticky w-full top-0 bg-white flex items-center justify-center border-y-2 border-[#eff0f5] ">
                      <div className="w-2/4 px-4 py-2 text-base 3xl:text-xl font-normal">
                        <span>Name</span>
                      </div>
                      <div className="w-2/4 px-4 py-2 text-base 3xl:text-xl font-normal">
                        <span>Contact Email</span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-base 3xl:text-xl font-normal">
                        <span>Select</span>
                      </div>
                    </div>
                    <ul className="h-full" aria-label="aria-owns">
                      {ContactJoinTeam?.map((contact, index) => (
                        <>
                          <li className="border-t-2 border-[#eff0f5] py-3 flex items-center justify-center">
                            <div className="w-2/4 px-4 py-2 text-sm font-normal">
                              <span className="text-[#17313b] 3xl:text-xl break-all">
                                {contact.username}
                              </span>
                            </div>
                            <div className="w-2/4 px-4 py-2 text-sm font-normal">
                              <span className="text-[#17313b] 3xl:text-xl break-all">
                                {contact.emailAddress}
                              </span>
                            </div>
                            <div className="w-1/5 px-4 py-2 text-sm font-normal">
                              <span
                                onClick={() => deleteMemberContact(contact.id)}
                                className="cursor-pointer"
                              >
                                <ClearIcon className="w-5 h-5 font-medium text-[#61619b]" />
                              </span>
                              {" | "}
                              <span
                                onClick={() => approveMember(contact.id)}
                                className="cursor-pointer  "
                              >
                                <CheckIcon className="w-5 h-5 font-medium  text-[#61619b]" />
                              </span>
                            </div>
                          </li>
                        </>
                      )) ?? (
                        <>
                          <li className="animate-pulse border-t-2 border-[#eff0f5] py-3 flex items-center justify-center">
                            <div className="w-2/4 px-4 py-2 text-sm font-normal">
                              <span className="text-[#17313b] bg-[#1b08086c] w-full"></span>
                            </div>
                            <div className="w-2/4 px-4 py-2 text-sm font-normal">
                              <span className="text-[#17313b] bg-[#1b08086c] w-full"></span>
                            </div>
                            <div className="w-1/5 px-4 py-2 text-sm font-normal">
                              <span className="cursor-pointer  ">
                                <ClearIcon className="w-5 h-5 font-medium text-[#17313b]" />
                              </span>
                              {" | "}
                              <span className="cursor-pointer  ">
                                <CheckIcon className="w-5 h-5 font-medium  text-[#17313b]" />
                              </span>
                            </div>
                          </li>
                        </>
                      )}
                      {ContactJoinTeam?.length === 0 && (
                        <>
                          <li className="border-t-2 border-[#eff0f5] py-3 flex items-center justify-center w-full">
                            <div className="text-[#7d6d6d9a] 3xl:text-xl inline-flex">
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
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
            <div className="shadow-lg rounded-3xl bg-white w-full h-full block relative overflow-x-auto  my-2 ">
              <div className="xl:w-full w-[1200px] table p-4">
                <h1 className="font-bold text-4xl py-4 px-4 text-center">
                  Member
                </h1>
                <div className="flex items-center justify-center border-y-2 border-[#eff0f5] ">
                  <div className="w-1/5 px-4 py-2 text-base 3xl:text-xl font-normal">
                    <span>Username</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base 3xl:text-xl font-normal">
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
                            <div className="absolute top-[9px] left-0 right-0 w-[180px] z-50 bg-[white] shadow-lg drop-shadow rounded-3xl">
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
                            <span className="3xl:text-xl">Permissions</span>
                            {!openPermissions ? (
                              <span className=" ml-1 absolute right-0 z-20 top-0 left-[90px] 3xl:left-[110px] rounded-full">
                                <ErrorOutline className="w-6- h-6 text-[#61619b]" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 ml-1 absolute right-0 z-20 border-[1px] border-[#61619b] top-1 left-[90px] 3xl:left-[110px] rounded-full after:absolute after:w-3 after:h-[1px] after:right-[3px] after:bg-[#61619b] after:rotate-90 after:top-[24px]"></span>
                            )}
                          </div>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal cursor-help relative">
                    <ClickAwayListener onClickAway={handleCloseStatus}>
                      <div className="bg-transparent relative">
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
                            <div className="absolute top-[9px] w-[180px] 3xl:w-[200px] z-50 bg-[white] shadow-lg drop-shadow rounded-3xl">
                              <div className="p-[10px]">
                                <div className="py-1 text-black">
                                  <div className="font-bold 3xl:text-xl">
                                    Invite Pending
                                  </div>
                                  <div className="3xl:text-xl">
                                    The invite {"hasn't"} been accepted yet.
                                  </div>
                                </div>
                                <div className="py-1 text-black">
                                  <div className="font-bold 3xl:text-xl">
                                    Invite Expired
                                  </div>
                                  <div className="3xl:text-xl">
                                    Invite expire after 72 hours
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        >
                          <div onClick={handleOpenStatus} className="relative">
                            <span className="mr-1 3xl:text-xl">
                              Invite Status
                            </span>
                            {!openStatus ? (
                              <span className="ml-1 absolute right-0 z-20 top-0 left-[90px] 3xl:left-[110px] rounded-full">
                                <ErrorOutline className="w-6 h-6 text-[#61619b]" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 ml-1 absolute right-0 z-20 border-[1px] border-[#61619b]  top-[4px] left-[90px] 3xl:left-[110px] rounded-full after:absolute after:w-3 after:h-[1px] after:right-[3px] after:bg-[#61619b] after:rotate-90 after:top-[24px]"></span>
                            )}
                          </div>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base 3xl:text-xl font-normal">
                    <span>Options</span>
                  </div>
                </div>
                <div className="border-y-2 border-[#eff0f5] py-3 flex items-center justify-center">
                  <div className="w-1/5 px-2 py-2 text-sm font-normal inline-flex items-center">
                    <span className="pr-2">
                      <AccountCircleIcon className="w-5 h-5" />
                    </span>
                    {Object.entries(Owner).length !== 0 ? (
                      Owner.id === Team.userId ? (
                        <span className="text-[#17313b] 3xl:text-xl">
                          {Owner.username}
                        </span>
                      ) : (
                        <span className="text-[#61619b]"></span>
                      )
                    ) : (
                      <div className="bg-[#1b08086c] w-full h-[10px] rounded-3xl animate-pulse"></div>
                    )}
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal truncate">
                    {Object.entries(Owner).length !== 0 ? (
                      Owner.id === Team.userId ? (
                        <span className="text-[#17313b] 3xl:text-xl">
                          {Owner.emailAddress}
                        </span>
                      ) : (
                        <span className="text-[#61619b]"></span>
                      )
                    ) : (
                      <div className="bg-[#1b08086c] w-full h-[10px] rounded-3xl animate-pulse"></div>
                    )}
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal">
                    <span className="text-[#17313b] 3xl:text-xl">Owner</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                </div>
                <ul className="w-full" aria-label="aria-owns">
                  {memberList?.map((item, index) => (
                    <li
                      key={index}
                      className="border-y-2 border-[#eff0f5]   py-3 flex items-center justify-center"
                    >
                      <div className="w-1/5 px-2 py-2 text-sm font-normal">
                        <span className="pr-2">
                          <AccountCircleIcon className="w-5 h-5" />
                        </span>
                        <span className="3xl:text-xl">
                          {item.user === null ? "-" : item.user?.username}
                        </span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal truncate 3xl:text-xl">
                        <span className="text-[#17313b] w-full">
                          {item.emailAddress}
                        </span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal 3xl:text-xl">
                        <span className="text-[#17313b]">{item.role}</span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal 3xl:text-xl">
                        {item.inviteStatus === InviteStatus.PENDING ? (
                          <div className="bg-[#eff0f5] rounded-3xl px-2 py-2 w-[110px] 3xl:w-[150px] text-center">
                            <span className="!text-xs 3xl:text-lg py-[1px]">
                              Invite Pending
                            </span>
                          </div>
                        ) : item.inviteStatus === InviteStatus.ACCEPTED ? (
                          <div className="bg-[#d51512] text-[#fff] rounded-3xl px-2 py-2 w-[110px] 3xl:w-[150px] text-center">
                            <span className="!text-xs  py-[1px] 3xl:text-xl">
                              Accepted
                            </span>
                          </div>
                        ) : (
                          <div className="bg-[#ff3d2e] text-[#fff] rounded-3xl px-2 py-2 w-[110px] 3xl:w-[150px] text-center">
                            <span className="!text-xs py-[1px] 3xl:text-xl">
                              invite Expired
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        {item.inviteStatus === InviteStatus.REJECTED ? (
                          <>
                            <div className="cursor-pointer 3xl:text-xl hover:underline text-[#606060]">
                              Resend
                            </div>
                            {" | "}
                            <div
                              tabIndex={3}
                              onClick={() => deleteMember(item.id)}
                              className="cursor-pointer hover:underline 3xl:text-xl text-[#606060]"
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
                                  "cursor-pointer  3xl:text-xl hover:underline text-[#606060]"
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
                      <li className="border-y-2 py-3 border-[#eff0f5]  shadow-lg flex items-center justify-center animate-pulse">
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
                      <li className="border-y-2 border-[#eff0f5] shadow-lg  py-3 flex items-center justify-center w-full">
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
                      </li>
                    </>
                  )}
                </ul>
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
          </div>
        </div>
      </ThemeProvider>
    </DashboardLayout>
  );
};

export default Members;
