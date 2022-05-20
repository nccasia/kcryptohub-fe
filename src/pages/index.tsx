import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const { data } = useSession();
  return (
    <>
      <div className="w-full flex justify-between p-8 bg-cyan-900 text-white">
        <div className="text-2xl font-semibold">KryptoHub</div>
        <div className="">
          {data ? (
            <div className="flex justify-around items-center">
              <div className="flex group relative">
                <input
                  type="checkbox"
                  id="showDropdown"
                  className="hidden peer"
                />
                <label htmlFor="showDropdown" className="cursor-pointer">
                  <span>{data.user?.name}</span>
                  <ArrowDropDownIcon />
                </label>
                <div className="invisible peer-checked:visible flex flex-col absolute top-6 border w-full bg-cyan-700 ">
                  <Link href="/profile">
                    <div className="p-1 border-l-2 border-cyan-700 hover:border-red-700 hover:bg-cyan-900 cursor-pointer">
                      <a>Profile</a>
                    </div>
                  </Link>
                  <Link href="/teams/myteams">
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
                    src={data.user?.image || "favicon.ico"}
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-full"
                  />
                </a>
              </Link>
            </div>
          ) : (
            <div className="">
              <Link href={"/login"}>
                <a>Login</a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-cyan-900">
          WELCOM TO KRYPTOHUB
        </h1>
      </div>
    </>
  );
};

export default Home;
