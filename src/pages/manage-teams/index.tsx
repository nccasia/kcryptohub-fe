import { Layout } from "@/src/layouts/layout";
import Link from "next/link";
import { deleteTeam, resetTeam } from "redux/teamSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { Team } from "@/type/team/team.type";
import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IProfile } from "@/type/profile/profile.type";
const ManageTeam = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.ProfileReducer.userInfo);

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [pageItem, setPageItem] = useState<ICreateTeam[]>([]);
  const [page, setPage] = React.useState(1);
  const [prev, setPrev] = React.useState(1);
  const [next, setNext] = React.useState(9);

  useEffect(() => {
    setPageItem(profile.team);
  }, [profile]);

  return (
    <Layout>
      <div className="">
        <div className="px-4 mb-5 mt-5 w-full justify-between flex items-center">
          <h1 className="text-xl font-bold">KryptoHub {">"} Manage Teams</h1>
          <div className="">
            <Link href="/manage-teams/create-new-team">
              <a
                className="bg-red-500 text-white block text-center py-2 xs:px-5 px-1 w-full shadow-lg mx-auto"
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
              <TeamCard team={item as unknown as Team} key={index} />
            ))}
      </div>
      {pageItem && pageItem.length > 0 && (
        <Pagination
          className="flex justify-center mb-1"
          count={
            parseInt((profile.team?.length / 8).toString()) -
            parseInt((profile.team?.length % 8).toString())
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
