import { teamApi } from "@/api/team-api";
import { CreateForm } from "@/src/layouts/create-team/Create-form";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { Team } from "@/type/team/team.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Information = () => {
  const [team, setTeam] = useState<Team>({} as Team);
  const [teamId, setTeamId] = useState<number>(NaN);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
    useEffect(() => {
      if (router.query.teamId) {
        setTeamId(Number(router.query.teamId));
        teamApi.getTeam(+router.query.teamId).then((team) => {
          if (team) {
            setTeam(team.data);
          } else {
            toast.error("failed get team info");
          }
        });
      }

    }, [router.query]);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center py-8 lg:px-20 md:px-6 px-2 bg-thirdary">
        <div className="bg-white w-full p-8">
          <CreateForm
            nextStep={() => {}}
            defaultTeamInfo={team}
            step={0}
            setStep={function (step: number): void {
              throw new Error("Function not implemented.");
            }}
            imageFile={image}
            setImageFile={setImage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Information;
