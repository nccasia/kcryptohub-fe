import { Layout } from "@/src/layouts/layout";
import Link from "next/link";
import { resetTeam } from "redux/teamSlice";

import { profileApi } from "@/api/profile-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { ICreateTeam, ITeam } from "@/type/team/team.type";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
const ManageTeam = () => {
  const dispatch = useAppDispatch();
  const [userTeam, setUserTeam] = useState<ICreateTeam[]>([]);
  const [pageItem, setPageItem] = useState<ICreateTeam[]>([]);
  const profile = useAppSelector((state) => state.ProfileReducer);
  const [page, setPage] = React.useState(1);
  const [prev, setPrev] = React.useState(1);
  const [next, setNext] = React.useState(9);

  useEffect(() => {
    profileApi.getProfileTeam().then((res) => {
      if (res) {
        setUserTeam(res as ICreateTeam[]);
      }
    });
  }, [setUserTeam, profile]);

  useEffect(() => {
    setPageItem(userTeam);
  }, [userTeam]);

  return (
    <Layout>
      <div className="sticky bg-white shadow-lg top-0 left-0 right-0 py-1 z-20">
        <div className="font-jost px-4 mb-5 mt-5 w-full xs:justify-between flex flex-col xs:flex-row  xs:items-center">
          <h1 className="text-base xxxs:text-lg md:text-xl font-bold mb-3 xs:mb-0">
            <Link href={"/"}>
              <span className="hover:underline cursor-pointer">KryptoHub </span>
            </Link>
            {">"} Manage Teams
          </h1>
          <div className="flex justify-end">
            <div className="mr-5">
              <Link href="/manage-teams/create-new-team">
                <a
                  className="bg-[#848abd] rounded-3xl text-white block text-center py-2 xs:px-5 px-1 w-full hover:shadow-[0px_0px_0px_6px_rgba(132,138,189,0.3)] mx-2"
                  onClick={() => {
                    dispatch(resetTeam());
                  }}
                >
                  New team
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {pageItem &&
          pageItem.length > 0 &&
          pageItem
            .slice(prev - 1, next)
            .map((item, index) => (
              <TeamCard team={item as unknown as ITeam} key={index} />
            ))}
      </div>
      {pageItem && pageItem.length > 0 && (
        <Pagination
          className="flex justify-center mb-1"
          count={
            parseInt((userTeam?.length % 9).toString()) === 0
              ? parseInt((userTeam?.length / 9).toString())
              : parseInt((userTeam?.length / 9).toString()) + 1
          }
          page={page}
          onChange={(e, value) => {
            setPrev(value * 9 - 8);
            setNext(value * 8 + value);
            setPage(value);
          }}
        />
      )}
    </Layout>
  );
};

export default ManageTeam;
