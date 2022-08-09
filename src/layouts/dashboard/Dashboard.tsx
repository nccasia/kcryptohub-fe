import { teamApi } from "@/api/team-api";
import { setTeam } from "@/redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getDashboardInformationSelector,
  getUserInfoSelector,
} from "@/redux/selector";
import { EDashboardNavbar } from "@/type/dashboard/dashboard.type";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { Layout } from "../layout";
interface DashboardLayoutProps {
  children: ReactNode;
}
const route = [
  {
    path: "",
    name: "Dashboard",
    match: EDashboardNavbar.DASHBOARD,
  },
  {
    path: "information",
    name: "Information",
    match: EDashboardNavbar.INFORMATION,
  },
  {
    path: "skill-distribution",
    name: "Skill Distribution",
    match: EDashboardNavbar.SKILLDISTRIBUTION,
  },
  {
    path: "portfolio",
    name: "Portfolio",
    match: EDashboardNavbar.PORTFOLIO,
  },
  {
    path: "awards",
    name: "Awards",
    match: EDashboardNavbar.AWARDS,
  },
  {
    path: "members",
    name: "Members",
    match: EDashboardNavbar.MEMBERS,
  },
];
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const team = useAppSelector(getDashboardInformationSelector);
  const userProfile = useAppSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.isReady && router.query.teamId) {
      if (!team.id || team.id !== +router.query.teamId) {
        teamApi.getTeam(+router.query.teamId).then((res) => {
          if (res) {
            dispatch(setTeam({ ...res.data, userId: res.userId }));
          } else {
            toast.error("Team not found");
            router.push("/manage-teams");
          }
        });
      }
    }
  });

  useEffect(() => {
    if (
      userProfile.id &&
      team.userId &&
      (!team.userId || team.userId !== userProfile.id)
    ) {
      toast.error("You are not authorized to access this team dashboard");
      router.push("/manage-teams");
    }
  }, [team, userProfile]);
  return (
    // <div className="bg-thirdary h-full">
    <Layout>
      <div className="px-4 py-2 bg-[#f9fafb] font-nunito ">
        <div className="mx-auto py-2 container  w-4/5  ">
          <ul className="flex justify-start px-2 w-full mx-auto items-center gap-x-10  md:overflow-x-hidden overflow-x-scroll">
            {route.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={{
                      pathname: `/team/[teamId]/dashboard/${item.path}`,
                      query: { teamId: router.query.teamId },
                    }}
                  >
                    <a
                      className={`block text-base text-[#606060] ${
                        router.pathname.split("/")[4] === item.match ||
                        (!router.pathname.split("/")[4] &&
                          item.match === EDashboardNavbar.DASHBOARD)
                          ? " bg-white rounded-full text-[#848ABD] shadow-btn px-4 py-2 "
                          : ""
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-sm py-4 ${" text-[#848abd] font-normal relative"}`}
                >
                  View team profile
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {children}
      </div>
    </Layout>
    // </div>
  );
};

export default DashboardLayout;
