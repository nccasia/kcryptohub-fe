import avatar from "@/images/avatar.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/profileSlice";
import { IProfile } from "@/type/profile/profile.type";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const UpdateProfilePage = () => {
  const userInfo = useAppSelector((state) => state.ProfileReducer.userInfo);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const initialValues = {
    description: userInfo.description || "",
    username: userInfo.username || "",
    avatar: userInfo.avatar || "",
    createdAt: userInfo.createdAt || "",
    emailAddress: userInfo.emailAddress || "",
    github: userInfo.github || "",
    google: userInfo.google || "",
    id: userInfo.id || undefined,
    provider: userInfo.provider || "",
    status: userInfo.status || "",
    skills: userInfo.skills,
  };
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm<IProfile>({
    defaultValues: initialValues,
  });
  const [isEditting, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [skills, setSkills] = useState<string[]>(userInfo.skills || []);

  const handleAddSkills = (event: KeyboardEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value;
    if (value !== "") {
      setSkills([...skills, value]);
      (event.target as HTMLInputElement).value = "";
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const newSkilss = skills.filter((item) => item !== skill);
    setSkills([...newSkilss]);
  };

  const handleUpdateProfile = () => {
    setIsEditing(!isEditting);

    if (isEditting) {
      handleSubmit((value) => {
        dispatch(updateProfile({ ...userInfo, ...value, skills }));
      })();
    }
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    localStorage.removeItem("accessToken");
    router.push(data.url);
  };

  return (
    <>
      <Box my={5}>
        <Container
          fixed
          maxWidth="md"
          className="border border-solid border-slate-300"
        >
          <form id="profile-form">
            <div className="flex items-center justify-between aligns-center py-2 border-b">
              <h2 className="text-red-500 text-2xl font-semibold">Kryptohub</h2>
              <div className="flex items-center gap-x-3">
                <div className="flex gap-x-4">
                  <h3>NCC Plus</h3>
                  <IconButton
                    className="p-0"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                  </Menu>
                </div>
                <div className="rounded-full w-16">
                  <Image src={avatar} alt="avatar" layout="responsive" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center py-8">
              <h3 className="text-3xl font-bold">Welcome NCC!</h3>
              <button
                type="button"
                className="bg-teal-700 text-white px-8 py-2 rounded-lg"
                onClick={() => handleUpdateProfile()}
              >
                {isEditting ? "Update" : "Editting"}
              </button>
            </div>
            <Stack
              justifyContent="space-between"
              direction={{ xs: "column-reverse", md: "row" }}
            >
              <Box mt={{ xs: 4, md: 0 }}>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">Username</h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("username") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      {...register("username")}
                      disabled={!isEditting}
                      placeholder="Add your username here"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">Email</h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("emailAddress") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      {...register("emailAddress")}
                      disabled={!isEditting}
                      placeholder="Add your email address here"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">Avatar</h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("avatar") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      {...register("avatar")}
                      disabled={!isEditting}
                      placeholder="Add your avatar link here"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">Skill</h3>
                  <div
                    className={
                      "flex flex-wrap py-2 px-4 rounded-md border border-transparent w-full max-w-[300px]" +
                      (isEditting
                        ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                        : "")
                    }
                  >
                    <ul id="tags" className="flex flex-wrap">
                      {!skills.length && !isEditting && (
                        <span className="italic">No Data</span>
                      )}
                      {skills.map((skill, index) => (
                        <li
                          key={index}
                          className="px-3 py-1 my-1 rounded-2xl flex items-center leading-normal bg-neutral-300 mr-2"
                        >
                          <span className="leading-normal">{skill}</span>
                          {isEditting && (
                            <IconButton
                              className="p-0 bg-white text-black ml-2 hover:bg-white"
                              onClick={() => handleRemoveSkill(skill)}
                            >
                              <CloseIcon className="text-base" />
                            </IconButton>
                          )}
                        </li>
                      ))}
                    </ul>
                    {isEditting && (
                      <input
                        autoComplete="off"
                        type="text"
                        className="outline-none italic mt-1 bg-transparent"
                        disabled={!isEditting}
                        onKeyUp={(event) =>
                          event.keyCode === 13 ? handleAddSkills(event) : null
                        }
                        placeholder="Add your skill here"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">
                    Github account
                  </h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("github") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      {...register("github")}
                      disabled={!isEditting}
                      placeholder="Add your github account here"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">
                    Google account
                  </h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("google") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <input
                      autoComplete="off"
                      type="text"
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      {...register("google")}
                      disabled={!isEditting}
                      placeholder="Add your google account here"
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">
                    Description
                  </h3>
                  {!isEditting && (
                    <span className="italic py-2 px-4 ">
                      {getValues("description") || "No Data"}
                    </span>
                  )}
                  {isEditting && (
                    <textarea
                      rows={isEditting ? 4 : 1}
                      {...register("description")}
                      className={
                        "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent resize-none" +
                        (isEditting
                          ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                          : "")
                      }
                      disabled={!isEditting}
                      placeholder="Add your description here"
                    ></textarea>
                  )}
                </div>
              </Box>
              <Box mr={{ md: 10 }} className="flex flex-col items-center">
                <div className="w-40 h-48 border border-slate-400">
                  <img
                    src={getValues("avatar") || "https://picsum.photos/160/192"}
                    alt="avatar"
                    className="w-full h-full"
                  />
                </div>
                {isEditting && (
                  <button
                    type="button"
                    className="bg-teal-700 text-white px-6 py-2 mt-5 rounded-lg"
                  >
                    Upload
                  </button>
                )}
              </Box>
            </Stack>
          </form>
        </Container>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UpdateProfilePage;
