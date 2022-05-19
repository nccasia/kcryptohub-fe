import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";
interface User {
  email: string;
  image: string;
  name: string;
}
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
                <div className="invisible peer-checked:visible flex flex-col absolute top-6 border px-2 w-full bg-cyan-700">
                  <div className="border-b">
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </div>
                  <div className="border-b">
                    <Link href="/teams/myteams">
                      <a>My Teams</a>
                    </Link>
                  </div>
                  <div className="border-b">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        signOut();
                      }}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <Link href={'/profile'}>
                  <a>
                    <img
                      src={data.user?.image || "vercel.svg"}
                      width={30}
                      height={30}
                      alt="avatar"
                    />
                  </a>
                </Link>
              </div>
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
