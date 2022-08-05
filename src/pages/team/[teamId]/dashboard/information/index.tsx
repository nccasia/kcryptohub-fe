import { useAppSelector } from "@/redux/hooks";
import { getDashboardInformationSelector } from "@/redux/selector";
import { CreateForm } from "@/src/layouts/create-team/Create-form";
import DashboardLayout from "@/src/layouts/dashboard/Dashboard";
import { ITeam } from "@/type/team/team.type";
import { useRouter } from "next/router";
import { useState } from "react";

const Information = () => {
  const team = useAppSelector(getDashboardInformationSelector);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="w-full h-full">
        <div className="container mx-auto pt-4">
          <div className="bg-white w-full p-8 rounded-xl shadow-xl">
            <CreateForm
              nextStep={() => {}}
              defaultTeamInfo={{ ...team } as unknown as ITeam}
              step={0}
              setStep={function (step: number): void {
                throw new Error("Function not implemented.");
              }}
              imageFile={image}
              setImageFile={setImage}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Information;
