import { Layout } from "@/src/layouts/layout";
import iconToolip from "../../../../assets/image/icon-tooltip.svg";
import iconchecked from "../../../../assets/image/icon-check.svg";
import { getMemberSelector } from "@/redux/selector";
import {
  Chip,
  Container,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "chart.js/auto";

import React, { SyntheticEvent, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { IMemberAddRequest } from "@/type/member/member.type";
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
  "bg-cyan-500",
  "bg-lime-500",
  "bg-indigo-700",
  "bg-pink-700",
  "bg-gray-700",
  "bg-teal-700",
  "bg-cyan-700",
  "bg-lime-700",
  "bg-red-700",
  "bg-orange-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-lime-300",
  "bg-indigo-300",
  "bg-pink-300",
  "bg-gray-300",
  "bg-teal-300",
  "bg-cyan-300",
];
const mailRegexp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
);

const mockData = [
  {
    id: 1,
    emailAddress: "thang@gmail.com",
    inviteStatus: "PENDING",
    role: "MEMBER",
    createAt: "2020-01-01T00:00:00.000Z",
    updateAt: "2020-01-01T00:00:00.000Z",
    teamId: "1",
    userId: "1",
  },
  {
    id: 2,
    emailAddress: "hong@gmail.com",
    inviteStatus: "ACCEPTED",
    role: "MEMBER",
    createAt: "2020-01-01T00:00:00.000Z",
    updateAt: "2020-01-01T00:00:00.000Z",
    teamId: "1",
    userId: null,
  },
  {
    id: 3,
    emailAddress: "hongs@gmail.com",
    inviteStatus: "Rejected",
    role: "MEMBER",
    createAt: "2020-01-01T00:00:00.000Z",
    updateAt: "2020-01-01T00:00:00.000Z",
    teamId: "1",
    userId: null,
  },
];

enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

const Member = () => {
  const getTag =
    typeof window !== undefined ||
    JSON.parse(localStorage.getItem("tag") || "");

  const [email, setEmail] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [openPermissions, setOpenPermissions] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<IMemberAddRequest>();

  const memberList = useAppSelector(getMemberSelector);

  console.log(memberList);
  const handleOpenPermissions = () => setOpenPermissions(!openPermissions);
  const handleOpenStatus = () => setOpenStatus(!openStatus);

  const onEmailSend = async (email: IMemberAddRequest) => {
    if (typeof window !== undefined) {
      localStorage.removeItem("tags");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Space" && mailRegexp.test(email)) {
      setTags((tag) => {
        const newTag = [...tag, email];

        // if (typeof window !== undefined) {
        //     localStorage.setItem('tags', JSON.stringify(newTag));
        // }
        return newTag;
      });
      setEmail("");
      e.preventDefault();
      console.log(tags);
    }
  };

  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container
          fixed
          maxWidth="lg"
          className="border border-[#cae0e7] md:!px-8"
        >
          <div>
            <h1 className="xl:text-4xl text-2xl lg:text-3xl text-primary py-5 font-[400] font-['Roboto, sans-serif'] ">
              Create Your Team Profile
            </h1>
            <div className="md:block hidden">
              <div className="flex pt-10 pb-5">
                <div className="flex-[50%] relative px-2 xl:text-xl text-sm lg:text-lg text-white bg-[#08537e] mr-1">
                  <div className="absolute bottom-[40px] text-black right-0 flex justify-end items-center">
                    <div className="mr-2 xl:text-lg relative text-xs lg:text-base">
                      Create Team Profile
                    </div>
                    <div className="bg-[#ff3d2e] px-2 py-1 flex justify-center items-center text-white after:content-['']  after:border-[#c3281d] after:border-solid after:rotate-45 after:border-b-8 after:border-x-transparent after:border-x-8 after:border-t-0 after:absolute after:right-[-5px] after:bottom-[-6px]">
                      50%
                    </div>
                  </div>
                  Enter Team Information
                </div>
              </div>
            </div>
            <div className="w-full block relative ">
              <div className="p-2 my-2">
                <form
                  action="#"
                  className="shadow-lg block lg:inline-flex py-2 my-3 lg:items-end px-3"
                >
                  <FormControl className="p-2">
                    <h1 className="py-2 text-lg font-semibold">
                      Invite Members
                    </h1>
                    <span className="py-1 text-sm font-normal">
                      Add team members via email
                      <span className="opacity-50 ">
                        ( separate emails with a space if correct format):
                      </span>
                    </span>
                    <div className="outline-none border-[1px] border-green-400">
                      {tags.map((tag, index) => (
                        <Chip
                          variant="outlined"
                          className={`${mailColor[index]} mr-2 my-2 text-white`}
                          key={index}
                          label={tag}
                          onDelete={() => handleDeleteTag(index)}
                        />
                      ))}
                      <TextareaAutosize
                        className="w-full h-20 outline-none rounded border-none resize-none p-1"
                        placeholder="name@profilename.com..."
                        value={email}
                        onKeyDown={handleKeyDown}
                        {...register("member", {
                          required: true,
                          onChange: handleChange,
                        })}
                      />
                    </div>
                    <div className="mr-10 hidden">
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
                            <span key={index}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FormControl>

                  <div className="ml-3 pb-2">
                    <button
                      type="submit"
                      className="py-2 px-4 border-[1px] border-green-400 rounded shadow"
                    >
                      <span>Invite</span>
                    </button>
                  </div>

                  <div className="py-2 hidden">
                    <button
                      // onClick={handleClose}
                      className="py-2 px-4 border-[1px] border-green-400 rounded shadow"
                    >
                      <span>Send more invites</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full h-full block relative overflow-x-auto shadow-md my-2 rounded drop-shadow">
              <div className="w-[800px] lg:w-full table p-3">
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
                  <div className="w-1/5 px-2 py-2 text-sm font-normal">
                    <span className="pr-2">
                      <AccountCircleIcon className="w-5 h-5" />
                    </span>
                    <span>{"Username" || "-"}</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal">
                    <span className="text-[#17313b]">Email </span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal">
                    <span className="text-[#17313b]">Manager</span>
                  </div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                  <div className="w-1/5 px-4 py-2 text-sm font-normal"></div>
                </div>
                {mockData.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="border-[1px] py-3 flex items-center justify-center"
                    >
                      <div className="w-1/5 px-2 py-2 text-sm font-normal">
                        <span className="pr-2">
                          <AccountCircleIcon className="w-5 h-5" />
                        </span>
                        <span>{item.userId === null ? "-" : "Username"}</span>
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
                          <div className="bg-[#333131] text-[#fff] rounded-3xl px-2 py-1 w-[110px] text-center">
                            <span className="!text-xs">Rejected</span>
                          </div>
                        )}
                      </div>
                      <div className="w-1/5 px-4 py-2 text-sm font-normal">
                        <span className="cursor-pointer hover:underline text-blue-500">
                          Remove
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>

      <ToastContainer autoClose={2000} position="bottom-right" />
    </Layout>
  );
};

export default Member;
