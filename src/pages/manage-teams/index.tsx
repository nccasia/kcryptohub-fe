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
      <div className="">
        <div className="font-jost px-4 mb-5 mt-5 w-full justify-between flex items-center">
          <h1 className="text-xl font-bold">KryptoHub {">"} Manage Teams</h1>
          <div className="">
            <Link href="/manage-teams/create-new-team">
              <a
                className="bg-[#5ca7db] rounded-3xl text-white block text-center py-2 xs:px-5 px-1 w-full shadow-lg mx-auto"
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
