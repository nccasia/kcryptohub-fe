import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SkillDis } from "@/src/layouts/create-team/Skill-Dis";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Team } from "@/type/team/team.type";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { teamApi } from "@/api/team-api";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { getDashboardInformationSelector } from "@/redux/selector";
const SkillDistribution = () => {
  const router = useRouter();

  const team = useAppSelector(getDashboardInformationSelector);
  const [teamId, setTeamId] = useState(router.query.teamId as string);
  const dispatch = useAppDispatch();


  return (
    <DashboardLayout>
      <div className="w-full h-full bg-thirdary">
        <div className="container mx-auto pt-4">
          <div className="bg-white w-full p-8">
            <SkillDis
              step={0}
              setStep={function (step: number): void {
                throw new Error("Function not implemented.");
              }}
              title={"Update"}
              skillDistribution={team.skillDistribution}
              teamUpdate={team as unknown as ICreateTeam}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillDistribution;
