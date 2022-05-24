import { Layout } from "@/src/layouts/layout";
import { GetTeam } from "@/src/redux/teamSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageTeam = () => {
  const dispatch = useDispatch();
  const team = useSelector((state: any) => state.createTeam.value);
  useEffect(() => {
    console.log(team);
  });
  return (
    <Layout>
      <div className="px-4 mb-5 mt-5 w-full justify-between flex items-center">
        <h1 className="text-xl font-bold">KryptoHub {">"} Manage Teams</h1>
        <div>
          <Link href="/manage-teams/create-new-team">
            <a className="px-6 py-2 text-white rounded bg-red-600 mt-5">
              New team
            </a>
          </Link>
        </div>
      </div>
      <div className="px-4">hello</div>
    </Layout>
  );
};

export default ManageTeam;
