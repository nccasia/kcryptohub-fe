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
  const [userTeam, setUserTeam] = useState<ITeam[]>([]);
  const [pageItem, setPageItem] = useState<ITeam[]>([]);
  const profile = useAppSelector((state) => state.ProfileReducer);
  const [page, setPage] = React.useState(1);
  const [prev, setPrev] = React.useState(1);
  const [next, setNext] = React.useState(9);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    profileApi.getProfileTeam().then((res) => {
      if (res) {
        setUserTeam(res as ITeam[]);
      }
    });
  }, [setUserTeam, profile]);

  useEffect(() => {
    setPageItem(userTeam);
  }, [userTeam]);

  useEffect(() => {
    setTimeout(() => {
      if (userTeam.length === 0) {
        setIsLoading(true);
      }
    }, 500);
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
      {isLoading === false ? (
        <div className="flex py-10 w-screen items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded-lg  px-4 py-2 "
            disabled
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-thin md:text-3xl"> Processing... </span>
          </button>
        </div>
      ) : (
        <></>
      )}
      {userTeam.length === 0 && isLoading === true ? (
        <div className="flex py-10 w-screen items-center justify-center">
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
            <span className="font-thin md:text-2xl font-nunito">
              {" "}
              No Team Found{" "}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
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
