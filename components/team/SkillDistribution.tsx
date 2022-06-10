import { useAppSelector } from "@/redux/hooks";
import { IColors } from "@/type/team/team.type";
import React, { MutableRefObject } from "react";
import BadgeHover from "./BadgeHover";

export interface SkillDistributionProps {
  skillDistributionRef: MutableRefObject<null | HTMLElement>;
}
const SkillDistribution = ({
  skillDistributionRef,
}: SkillDistributionProps) => {
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);

  return (
    <section
      ref={skillDistributionRef}
      className="px-8 py-3 border-x border-[#cae0e7]"
    >
      <h2 className="text-xl text-[#154369] mb-5">Skill Distribution</h2>

      {teamProfile.skillDistribution?.length > 0 &&
        teamProfile.skillDistribution.map((item) => (
          <div key={item.id} className="mb-10">
            <h3 className="text-[#6b7a7e] mb-3">
              {item.skillDistributionName}
            </h3>
            <div className="w-full md:w-4/5 mb-6">
              <div className="h-12 py-2 border-x border-[#cae0e7] flex">
                {item.skillDistributionValue.map(
                  (skillDistributionValue, index) => (
                    <div
                      key={skillDistributionValue.field}
                      className="relative flex justify-center items-center group h-full"
                      style={{
                        width: `${skillDistributionValue.quantity}%`,
                        backgroundColor:
                          IColors[index % (Object.keys(IColors).length / 2)],
                      }}
                    >
                      <span className="hidden md:block text-sm text-white font-medium">
                        {`${skillDistributionValue.quantity}%`}
                      </span>
                      <BadgeHover label={skillDistributionValue.field} />
                    </div>
                  )
                )}
              </div>
            </div>

            <ul className="flex flex-wrap gap-5">
              {item.skillDistributionValue.map(
                (skillDistributionValue, index) => (
                  <li
                    key={skillDistributionValue.field}
                    className="flex items-center gap-x-3"
                  >
                    <div
                      className="w-4 h-4"
                      style={{
                        backgroundColor:
                          IColors[index % (Object.keys(IColors).length / 2)],
                      }}
                    ></div>
                    <h3 className="text-sm text-[#6d6e71]">
                      {skillDistributionValue.field}{" "}
                      <span className="md:hidden">
                        ({`${skillDistributionValue.quantity}%`})
                      </span>
                    </h3>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
    </section>
  );
};

export default SkillDistribution;
