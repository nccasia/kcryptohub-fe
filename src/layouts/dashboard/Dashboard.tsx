import { EDashboardNavbar } from "@/type/dashboard/dashboard.type";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Layout } from "../layout";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  return (
    <div className="bg-thirdary h-full">
      <Layout>
        <div className="container mx-auto">
          <ul className="flex justify-start items-center gap-x-10 md:overflow-x-hidden overflow-x-scroll">
            <li>
              <Link href="#">
                <a className="block text-sm text-[#08537E] px-4 py-4">
                  Information
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard/skill-distribution`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  className={`block text-sm text-[#08537E] px-4 py-4 ${
                    router.pathname.split("/")[4] === EDashboardNavbar.SKILLDISTRIBUTION
                      ? " text-secondary font-bold relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] after:bg-secondary"
                      : ""
                  }`}
                >
                  Skill Distribution
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard/portfolio`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  className={`block text-sm text-[#08537E] px-4 py-4 ${
                    router.pathname.split("/")[4] === EDashboardNavbar.PORTFOLIO
                      ? " text-secondary font-bold relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] after:bg-secondary"
                      : ""
                  }`}
                >
                  Portfolio
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard/awards`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  className={`block text-sm text-[#08537E] px-4 py-4 ${
                    router.pathname.split("/")[4] === EDashboardNavbar.AWARDS
                      ? " text-secondary font-bold relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] after:bg-secondary"
                      : ""
                  }`}
                >
                  Awards
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]/dashboard/members`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  className={`block text-sm text-[#08537E] px-4 py-4 ${
                    router.pathname.split("/")[4] === EDashboardNavbar.MEMBERS
                      ? " text-secondary font-bold relative after:absolute after:bottom-0 after:left-[calc(0%-10px)] after:h-1 after:w-[calc(100%+20px)] after:bg-secondary"
                      : ""
                  }`}
                >
                  Members
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/team/[teamId]`,
                  query: { teamId: router.query.teamId },
                }}
              >
                <a
                  className={`block text-sm  px-4 py-4 ${" text-secondary font-normal relative"}`}
                >
                  View team profile
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {children}
      </Layout>
    </div>
  );
};

export default DashboardLayout;
