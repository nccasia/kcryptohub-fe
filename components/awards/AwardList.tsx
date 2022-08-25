import Image from "next/image";
import React, { useEffect } from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAwards } from "@/redux/awardSlice";
import { IAwardDetail } from "@/type/awards/awards.type";
import { useRouter } from "next/router";
import { PlaylistAddOutlined } from "@mui/icons-material";
import { getDashboardAwardsSelector } from "@/redux/selector";

const AwardList = () => {
  const router = useRouter();
  const awards = useAppSelector(
    getDashboardAwardsSelector
  ) as unknown as IAwardDetail[];
  const { userInfo } = useAppSelector((state) => state.ProfileReducer);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.teamId && userInfo?.team?.length) {
      dispatch(getAwards(parseInt(router.query.teamId as string)));
    }
  }, [dispatch, userInfo, router.query.teamId]);
  return (
    <div className="col-span-12 md:col-span-3 bg-white p-3 shadow-lg rounded-3xl font-nunito">
      <h2 className="text-3xl 3xl:text-4xl text-primary font-normal mb-3">
        My Awards
      </h2>
      <p className="text-sm 3xl:text-xl text-[#606060] mb-3">
        You can add a maximum of ten (10) Awards to your Profile.
      </p>
      <div className="flex justify-end items-center gap-x-2 mb-5">
        <Link
          href={{
            pathname: `/team/[teamId]/dashboard/awards/new`,
            query: { teamId: router.query.teamId },
          }}
        >
          <a className="text-sm 3xl:text-xl text-[#848abd] cursor-pointer hover:underline">
            Add a New Award
          </a>
        </Link>
        <div className="w-4 h-4 flex-none mb-2">
          <PlaylistAddOutlined className="text-[#848ABD]" />
        </div>
      </div>
      <ul>
        {awards?.length > 0 &&
          awards.map((award) => (
            <li
              key={award.id}
              className="py-2 border-t border-[#cae0e7] truncate"
            >
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard/awards/[awardId]`,
                  query: { teamId: router.query.teamId, awardId: award.id },
                }}
              >
                <a className="text-sm 3xl:text-xl text-[#606060] cursor-pointer hover:underline ">
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
