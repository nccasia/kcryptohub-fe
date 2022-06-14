import Image from "next/image";
import React from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
import Link from "next/link";

const AwardList = () => {
  return (
    <div className="col-span-12 md:col-span-3 bg-white p-3 shadow-lg">
      <h2 className="text-3xl text-primary font-normal mb-3">My Awards</h2>
      <p className="text-sm text-[#6A797D] mb-3">
        You can add a maximum of ten (10) Awards to your Profile.
      </p>
      <div className="flex justify-end items-center gap-x-2 mb-5">
        <Link href="/manage-teams/awards/new">
          <a className="text-sm text-[#08537e] cursor-pointer hover:underline">
            Add a New Award
          </a>
        </Link>
        <div className="w-4 h-4 flex-none">
          <Image
            width="16"
            height="16"
            src={IconMap.List.src}
            alt="avatar"
            layout="responsive"
          />
        </div>
      </div>
      <ul>
        <li className="py-2 border-t border-[#cae0e7]">
          <Link href="/manage-teams/awards/1903">
            <a className="text-sm text-[#08537e] cursor-pointer hover:underline">
              {"#7 on Time's Top 100 Digital Agencies"}
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AwardList;
