import { useAppSelector } from "@/redux/hooks";
import { IColors } from "@/type/team/team.type";
import Image from "next/image";
import Link from "next/link";
import { MutableRefObject, useEffect } from "react";
import { IconMap } from "../IconSVG/IconMap";
import BadgeHover from "./BadgeHover";

export interface SkillDistributionProps {
  skillDistributionRef: MutableRefObject<null | HTMLElement>;
  editable: boolean;
}
const SkillDistribution = ({
  skillDistributionRef,
  editable,
}: SkillDistributionProps) => {
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);

  const handleCalculatePercentage = (
    skillDistributionValue: { field: string; quantity: number }[],
    quantity: number
  ) => {
    const totalPercent = skillDistributionValue.reduce(
      (total, value) => Number(value.quantity) + total,
      0
    );

    return Math.round((100 * quantity) / totalPercent);
  };

  return (
    <section ref={skillDistributionRef} className="py-5">
      {!teamProfile.skillDistribution?.length && editable && (
        <div className="flex items-center gap-x-2">
          <Link href="#">
            <a className="text-sm text-[#3e839e] hover:underline">
              Add Skill Distribution
            </a>
          </Link>
          <div className="w-[16px] h-[16px] flex-none relative">
            <Image
              width="16"
              height="16"
              src={IconMap.Pen.src}
              alt="avatar"
              layout="responsive"
            />
          </div>
        </div>
      )}

      {teamProfile.skillDistribution?.length > 0 &&
        teamProfile.skillDistribution.map((item) => (
          <div key={item.id} className="mb-5">
            <div className="flex justify-start items-center">
              <h3 className="text-[#6b7a7e] mb-3">
                {item.skillDistributionName}
              </h3>
            </div>

            <div className="mb-6 px-2">
              <div className="h-6 flex justify-center w-full">
                {item.skillDistributionValue.map(
                  (skillDistributionValue, index) =>
                    Number(skillDistributionValue.quantity) > 0 && (
                      <div
                        key={skillDistributionValue.field}
                        className="relative flex justify-center items-center group  h-full first:rounded-l-lg last:rounded-r-lg"
                        style={{
                          width: `${handleCalculatePercentage(
                            item.skillDistributionValue,
                            Number(skillDistributionValue.quantity)
                          )}%`,
                          backgroundColor:
                            IColors[index % (Object.keys(IColors).length / 2)],
                        }}
                      >
                        {handleCalculatePercentage(
                          item.skillDistributionValue,
                          +skillDistributionValue.quantity
                        ) > 10 ? (
                          <span className="block text-sm xxs:text-white text-transparent font-medium">
                            {`${handleCalculatePercentage(
                              item.skillDistributionValue,
                              Number(skillDistributionValue.quantity)
                            )}%`}
                          </span>
                        ) : null}

                        <BadgeHover label={skillDistributionValue.field} />
                      </div>
                    )
                )}
              </div>
            </div>

            <ul className="md:hidden block flex flex-wrap gap-5 h-40 overflow-auto">
              {item.skillDistributionValue.map(
                (skillDistributionValue, index) =>
                  Number(skillDistributionValue.quantity) > 0 && (
                    <li
                      key={skillDistributionValue.field}
                      className="flex items-center gap-x-3"
                    >
                      <div
                        className="w-4 h-4 rounded-lg"
                        style={{
                          backgroundColor:
                            IColors[index % (Object.keys(IColors).length / 2)],
                        }}
                      ></div>
                      <h3 className="text-sm text-[#6d6e71]">
                        {skillDistributionValue.field}{" "}
                        <span className="md:hidden">
                          (
                          {`${handleCalculatePercentage(
                            item.skillDistributionValue,
                            Number(skillDistributionValue.quantity)
                          )}%`}
                          )
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
