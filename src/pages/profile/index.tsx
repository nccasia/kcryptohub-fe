import avatar from "@/images/avatar.png";
import { IProfile } from "@/type/profile/profile.type";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IProfile>({});
  const [isEditting, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const [openWarning, setOpenWarning] = React.useState(false);
  const handleOpen = () => setOpenWarning(true);
  const handleClose = () => setOpenWarning(false);

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
      handleSubmit((value) => console.log(value))();
    }
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    localStorage.removeItem("accessToken");
    router.push(data.url);
  };

  useEffect(() => {
    if (true) {
      setOpenWarning(true);
    }
  }, []);

  return (
    <>
      <Box mt={5}>
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
                  <input
                    autoComplete="off"
                    type="text"
                    value="NCC Plus"
                    className="bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px]"
                    {...register("username")}
                    disabled
                  />
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">Email</h3>
                  <input
                    autoComplete="off"
                    type="text"
                    value="info@ncc.asia"
                    className="bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px]"
                    {...register("email")}
                    disabled
                  />
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
                      {skills.length === 0 && !isEditting && (
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
                    GitHub Account
                  </h3>
                  <input
                    autoComplete="off"
                    type="text"
                    defaultValue="No Data"
                    className={
                      "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent" +
                      (isEditting
                        ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                        : "")
                    }
                    {...register("githubAccount")}
                    disabled={!isEditting}
                  />
                </div>
                <div className="flex items-center gap-x-10 mb-3">
                  <h3 className="text-xl text-right min-w-[150px]">
                    Description
                  </h3>
                  <textarea
                    defaultValue="info@ncc.asia"
                    rows={isEditting ? 4 : 1}
                    {...register("description")}
                    className={
                      "bg-transparent text-base italic outline-none py-2 px-4 w-full max-w-[300px] transition-all border border-transparent resize-none" +
                      (isEditting
                        ? " !border-neutral-300 hover:!border-neutral-800 focus:!border-neutral-800 rounded-md"
                        : "")
                    }
                    disabled={!isEditting}
                  ></textarea>
                </div>
              </Box>
              <Box mr={{ md: 10 }} className="flex flex-col items-center">
                <div className="flex justify-center items-center w-40 h-48 border border-black">
                  <span>Avatar</span>
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
      <Modal open={openWarning}>
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 outline-none shadow-2xl bg-white rounded-lg border border-gray-400">
          <h3 className="text-2xl font-bold px-5 py-4 border-b border-gray-400">
            Warning
          </h3>
          <div className="px-5 py-4">
            <span>Please complete your information</span>
            <div className="text-right">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg mt-10"
                onClick={() => setOpenWarning(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProfilePage;
