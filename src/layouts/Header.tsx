import { useAppSelector } from "@/redux/hooks";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const Header = () => {
  const user = useAppSelector((state) => state.ProfileReducer.userInfo);
  const [userImage, setUserImage] = useState(user.avatarPath);
  const router = useRouter();
  return (
    <div className="w-full flex justify-between p-8 sm:px-16 bg-cyan-900 text-white z-20">
      <Link href="/">
        <a className="text-2xl font-semibold text-white cursor-pointer flex items-center">
          KryptoHub
        </a>
      </Link>
      <div className="flex flex-col">
        {user.username ? (
          <div className="flex justify-end items-center">
            <div className="flex group relative">
              <input type="text" id="showDropdown" className="w-0 peer" />
              <label htmlFor="showDropdown" className="cursor-pointer">
                <span>{user?.username || "anonymous"}</span>
                <ArrowDropDown />
              </label>
              <div
                className="invisible flex flex-col absolute z-10 top-6 border min-w-[130px] w-full bg-cyan-700
               peer-focus:visible  peer-focus:z-20 peer-focus:animate-slide-in-up hover:visible"
              >
                <Link href="/profile">
                  <div className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer">
                    <a>Profile</a>
                  </div>
                </Link>
                <Link href="/manage-teams">
                  <div className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer">
                    <a>Manage Teams</a>
                  </div>
                </Link>
                <div
                  className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    signOut({callbackUrl: '/'});
                  }}
                >
                  <span>Logout</span>
                </div>
              </div>
            </div>
            <Link href={"/profile"}>
              <a>
                <Image
                  src={userImage || "/favicon.ico"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                  onError={(e) => {setUserImage("/favicon.ico")}}
                />
              </a>
            </Link>
          </div>
        ) : (
          <div className="text-cyan-700 font-semibold hover:text-cyan-400 text-right">
            <Link href={"/login"}>
              <a>Login</a>
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <Link href={"/teams"}>
            <a className="px-2 font-semibold text-xl  hover:text-red-500 ">
              List Teams
            </a>
          </Link>
          <Link href={"/teams"}>
            <a className="px-2">About</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
