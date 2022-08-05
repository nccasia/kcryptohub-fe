import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SkillDis } from "@/src/layouts/create-team/Skill-Dis";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { teamApi } from "@/api/team-api";
import { getDashboardInformationSelector } from "@/redux/selector";
import { ICreateTeam } from "@/type/team/team.type";
const SkillDistribution = () => {
  const router = useRouter();

  const team = useAppSelector(getDashboardInformationSelector);
  const [teamId, setTeamId] = useState(router.query.teamId as string);
  const dispatch = useAppDispatch();

  return (
    <DashboardLayout>
      <div className="w-full h-full ">
        <div className="container mx-auto pt-4">
          <div className="bg-white w-full p-8 rounded-xl shadow-xl">
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
