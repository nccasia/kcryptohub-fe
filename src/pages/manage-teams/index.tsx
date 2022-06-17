import { Layout } from "@/src/layouts/layout";
import Link from "next/link";
import { deleteTeam } from "redux/teamSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TeamCard } from "@/src/layouts/team/TeamCard";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { Team } from "@/type/team/team.type";

const ManageTeam = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.ProfileReducer.userInfo);

  const handleDelete = (teams: ICreateTeam) => {
    dispatch(deleteTeam(teams.id));
  };
  return (
    <Layout>
      <div className="">
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
      </div>

      <div className="px-4">
        {profile.team &&
          profile.team.length > 0 &&
          profile.team.map((item, index) => (
            <TeamCard team={item as unknown as Team} key={index} />
          ))}
      </div>
    </Layout>
  );
};

export default ManageTeam;
