import avatar from "@/images/avatar.png";
import { IProfile } from "@/type/profile/profile.type";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Container,
  Stack,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const schemaValidation = Yup.object({
  githubAccount: Yup.string(),
  description: Yup.string(),
});

const UpdateProfilePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IProfile>({
    resolver: yupResolver(schemaValidation),
  });
  const [isEditting, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUpdateProfile = () => {
    setIsEditing(!isEditting);

    if (isEditting) {
      handleSubmit((value) => console.log(value))();
    }
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
    router.push("/login");
  };
  return (
    <Box>
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
                  open={open}
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
                  type="text"
                  value="NCC Plus"
                  className="bg-transparent text-base italic outline-none py-2 px-4"
                  {...register("username")}
                  disabled
                />
              </div>
              <div className="flex items-center gap-x-10 mb-3">
                <h3 className="text-xl text-right min-w-[150px]">Email</h3>
                <input
                  type="text"
                  value="info@ncc.asia"
                  className="bg-transparent text-base italic outline-none py-2 px-4"
                  {...register("email")}
                  disabled
                />
              </div>
              <div className="flex items-center gap-x-10 mb-3">
                <h3 className="text-xl text-right min-w-[150px]">
                  GitHub Account
                </h3>
                <input
                  type="text"
                  defaultValue="info@ncc.asia"
                  className={
                    "bg-transparent text-base italic outline-none py-2 px-4 border border-transparent" +
                    (isEditting ? " !border-neutral-400 rounded-md" : "")
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
                    "bg-transparent text-base italic outline-none py-2 px-4 border border-transparent resize-none" +
                    (isEditting ? " !border-neutral-400 rounded-md" : "")
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
  );
};

export default UpdateProfilePage;
