import React from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type IHeaderProps = {
  children: ReactNode;
};
const Layout = (props: IHeaderProps) => {
  const { data } = useSession();
  return (
    <div className="w-full min-h-screen px-5 py-5 shadow">
      <div className="shadow rounded-sm bg-white overflow-auto">
        <div className=" px-4 py-4 flex justify-between h-20 items-center border-b-[1px] border-gray-700">
          <Link href="/">
            <a className="text-red-600 text-xl font-bold">KryptoHub</a>
          </Link>

          <div className="w-auto flex items-center">
            <div>
              <select className="px-5 mr-5 ">
                <option value="NCC PLUS">NCC Plus</option>
                <option value="NCC PLUS">NCC</option>
              </select>
            </div>

            <a>
              <Image
                className="rounded-full"
                alt="Avarta"
                src={(data?.user?.image as string) || "/user1.png"}
                width={60}
                height={60}
              />
            </a>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export { Layout };
