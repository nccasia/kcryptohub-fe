import Image from "next/image";
import React, { useEffect } from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAwards } from "@/redux/awardSlice";

const AwardList = () => {
  const { userInfo } = useAppSelector((state) => state.ProfileReducer);
  const { awards } = useAppSelector((state) => state.AwardsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userInfo?.team?.length) {
      dispatch(getAwards(parseInt(userInfo.team[0].id)));
    }
  }, [dispatch, userInfo]);
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
        {awards?.length &&
          awards.map((award) => (
            <li key={award.id} className="py-2 border-t border-[#cae0e7]">
              <Link href={`/manage-teams/awards/${award.id}`}>
                <a className="text-sm text-[#08537e] cursor-pointer hover:underline">
                  {award.awardsTitle}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AwardList;
