import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";

export const Header = () => {
    const [user, setUser] = useState(useSession().data?.user);
    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        if(!user && token){
            setUser({})
        }
    },[user])
    return (
      <div className="w-full flex justify-between p-8 sm:px-16 bg-cyan-900 text-white">
        <div className="text-2xl font-semibold text-red-400">KryptoHub</div>
        <div className="flex flex-col">
          {user ? (
            <div className="flex justify-end items-center">
              <div className="flex group relative">
                <input
                  type="checkbox"
                  id="showDropdown"
                  className="hidden peer"
                />
                <label htmlFor="showDropdown" className="cursor-pointer">
                  <span>{user?.name || "anonymous"}</span>
                  <ArrowDropDown />
                </label>
                <div className="invisible peer-checked:visible flex flex-col absolute top-6 border w-full bg-cyan-700 ">
                  <Link href="/profile">
                    <div className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer">
                      <a>Profile</a>
                    </div>
                  </Link>
                  <Link href="/myteams">
                    <div className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer">
                      <a>My Teams</a>
                    </div>
                  </Link>
                  <div
                    className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      signOut();
                    }}
                  >
                    <span>Logout</span>
                  </div>
                </div>
              </div>
              <Link href={"/profile"}>
                <a>
                  <Image
                    src={user?.image || "/favicon.ico"}
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-full"
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
}