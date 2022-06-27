import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMember,
  getMemberList,
  joinTeam,
  removeMember,
  resetSuccess,
} from "@/redux/memberSlice";
import { getUserInfoSelector } from "@/redux/selector";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { emails, IMemberAddRequest } from "@/type/member/member.type";
import {
  Chip,
  Container,
  createTheme,
  FormControl,
  TextareaAutosize,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
import iconchecked from "@/src/assets/image/icon-check.svg";
import iconToolip from "@/src/assets/image/icon-tooltip.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

const Members = () => {
  const [email, setEmail] = useState<string>("");
  const [tags, setTags] = useState<emails[]>([]);
  const [openPermissions, setOpenPermissions] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [disableIvt, setDisableIvt] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const actionSuccess = useSelector(
    (state: RootState) => state.MemberReducer.success
  );
  const router = useRouter();
  const teamId = router.query.teamId;

  const memberList = useSelector(
    (state: RootState) => state.MemberReducer.member
  );

  const Owner = useAppSelector(getUserInfoSelector);

  const handleOpenPermissions = () => setOpenPermissions(!openPermissions);
  const handleOpenStatus = () => setOpenStatus(!openStatus);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
    if (e.target.value.match(mailRegexp)) {
      setDisableIvt(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && mailRegexp.test(email)) {
      setTags((tag) => {
        const newTag = [
          ...tag,
          {
            email: email,
            role: "member",
          },
        ];

        return newTag;
      });
      setEmail("");
      e.preventDefault();
    }
  };

  useEffect(() => {
    dispatch(getMemberList(parseInt(teamId as string)));
  }, [dispatch, teamId]);

  useEffect(() => {
    if (actionSuccess === true) {
      dispatch(resetSuccess());
      dispatch(getMemberList(parseInt(teamId as string)));
    }
  }, [actionSuccess, dispatch, teamId]);

  useEffect(() => {
    dispatch(joinTeam(parseInt(teamId as string)));
  }, [dispatch, teamId]);

  const handleSubmit = async () => {
    const data: IMemberAddRequest = {
      teamId: parseInt(teamId as string),
      members: tags,
    };
    await dispatch(addMember(data));

    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setTags([]);
  };
  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteMember = (index: number) => {
    dispatch(
      removeMember({ teamId: parseInt(teamId as string), memberId: index })
    );
  };

  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <Container fixed maxWidth="lg" className="md:!px-8">
          <div>
            <div className="w-full block relative ">
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
                      Add team members via email
                      <span className="opacity-50 ">
                        ( separate emails with a enter if correct format):
                      </span>
                    </span>
                    <div
                      className={
                        !success
                          ? "outline-none  border-[1px] border-green-400"
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
                        className={
                          !success
                            ? "w-full h-20 outline-none rounded border-none resize-none p-1 "
                            : "w-full h-20 outline-none rounded border-none resize-none p-1 hidden"
                        }
                        placeholder="name@profilename.com..."
                        value={email}
                        onChange={handleChange}
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
                      onClick={handleSubmit}
                      disabled={!disableIvt ? true : false}
                      className={
                        !disableIvt
                          ? "py-2 px-4 border-[1px] border-green-400 rounded shadow cursor-not-allowed"
                          : "py-2 px-4 border-[1px] border-green-400 rounded shadow "
                      }
                    >
                      <span>Invite</span>
                    </button>
                  </div>

                  <div className={!success ? "py-2 hidden" : "py-2"}>
                    <button
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
              <div className="w-[1200px] table p-3">
                <h1 className="font-bold text-xl py-1 px-4">Member</h1>
                <div className="flex items-center justify-center">
                  <div className="w-1/5 px-4 py-2 text-base font-normal">
                    <span>Username</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal">
                    <span>Email address</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal cursor-help relative">
                    <div onClick={handleOpenPermissions} className="relative">
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
                    <div
                      className={
                        !openPermissions
                          ? "hidden"
                          : "absolute top-[calc(100% + 1px)] w-[180px] z-50 bg-[white] shadow-lg drop-shadow"
                      }
                    >
                      <div className="p-[10px]">
                        <div className="py-1">
                          <div className="font-bold">Profile Owner</div>
                          <div>Profile administrator</div>
                          <div>Member administrator</div>
                        </div>
                        <div className="py-1">
                          <div className="font-bold">Admin</div>
                          <div>
                            Profile administrator; cannot add new members
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-base font-normal cursor-help">
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
                      <div
                        className={
                          !openStatus
                            ? "hidden"
                            : "absolute top-[calc(100% + 8px)] w-[180px] z-50 bg-[white] shadow-lg drop-shadow "
                        }
                      >
                        <div className="p-[10px]">
                          <div className="py-1">
                            <div className="font-bold">Invite Pending</div>
                            <div>The invite {"hasn't"} been accepted yet.</div>
                          </div>
                          <div className="py-1">
                            <div className="font-bold">Invite Expired</div>
                            <div>Invite expire after 72 hours</div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                <ul className="w-full">
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
                          {item.user === null ? "-" : item.user?.username}
                        </span>
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        <span className="text-[#17313b]">
                          {item.emailAddress}
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
                            <span className="cursor-pointer hover:underline text-blue-500">
                              Resend
                            </span>
                            {" | "}
                            <span
                              onClick={() => deleteMember(item.id)}
                              className="cursor-pointer hover:underline text-blue-500"
                            >
                              Remove
                            </span>
                          </>
                        ) : (
                          <span
                            onClick={() => deleteMember(item.id)}
                            className="cursor-pointer hover:underline text-blue-500"
                          >
                            Remove
                          </span>
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
          </div>
        </Container>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="bottom-right" />
    </DashboardLayout>
  );
};

export default Members;
