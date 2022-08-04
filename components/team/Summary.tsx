import Image from "next/image";
import React, { LegacyRef, MutableRefObject, useState } from "react";
import { IconMap } from "@/components/IconSVG/IconMap";
import BadgeHover from "./BadgeHover";
import { useAppSelector } from "@/redux/hooks";

export interface SummaryProps {
  summaryRef: MutableRefObject<null | HTMLElement>;
}

const Summary = ({ summaryRef }: SummaryProps) => {
  const { teamProfile } = useAppSelector((state) => state.TeamProfileReducer);
  const [show, setShow] = useState(false);

  return (
    <section
      ref={summaryRef as LegacyRef<HTMLElement>}
      className="px-8 py-3 border-x border-[#cae0e7]"
    >
      <h2 className="text-xl sm:text-primary text-md mb-2 xs:max-w-[500px] max-w-[300px] break-words">{teamProfile.slogan}</h2>
      {teamProfile.status && (
        <div className="flex items-center gap-x-2 my-2">
          <div className="w-[10px] h-[10px] flex-none">
            <Image
              width="10"
              height="10"
              src={IconMap.Checked.src}
              alt="avatar"
              layout="responsive"
            />
          </div>

          <span className="text-xs text-secondary tracking-widest">
            GOLD VERIFIED
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-2">
        <div>
          {!show ? (
            <p className="text-sm text-[#6b7a7e] h-auto max-h-[200px] overflow-hidden break-words whitespace-pre-line">
              {teamProfile.description}
            </p>
          ) : (
            <p className="text-sm text-[#6b7a7e] h-auto break-words whitespace-pre-line">
              {teamProfile.description}
            </p>
          )}

          <p
            hidden={teamProfile.description?.length <= 650 || show}
            className="text-ellipsis overflow-hidden mt-2 text-xs text-red-500 hover:underline tracking-widest cursor-pointer"
            onClick={() => setShow(!show)}
          >
            READ MORE...
          </p>
        </div>
        <div className="grid grid-cols-2 mb-5  md:!flex md:flex-col">
          <div className="border-b border-r md:border-0 border-[#cae0e7] p-2 md:p-0 flex items-center gap-x-4 md:mb-3 group md:w-fit">
            <div className="w-[16px] h-[16px] flex-none relative">
              <Image
                width="16"
                height="16"
                src={IconMap.Tag.src}
                alt="avatar"
                layout="responsive"
              />
              <BadgeHover label="Project size" />
            </div>
            <span className="text-sm text-[#6a7a7e]">
              {teamProfile.projectSize}
            </span>
          </div>
          <div className="border-t border-r md:border-0 border-[#cae0e7] p-2 md:p-0 flex items-center gap-x-4 md:mb-3 group md:w-fit">
            <div className="w-[16px] h-[16px] flex-none relative">
              <Image
                width="16"
                height="16"
                src={IconMap.Person.src}
                alt="avatar"
                layout="responsive"
              />
              <BadgeHover label="Employees" />
            </div>
            <span className="text-sm text-[#6a7a7e]">
              {teamProfile.teamSize}
            </span>
          </div>
          <div className="border-t border-l md:border-0 border-[#cae0e7] p-2 md:p-0 flex items-center gap-x-4 md:mb-3 group md:w-fit">
            <div className="w-[16px] h-[16px] flex-none relative">
              <Image
                width="16"
                height="16"
                src={IconMap.Flag.src}
                alt="avatar"
                layout="responsive"
              />
              <BadgeHover label="Founded" />
            </div>
            <span className="text-sm text-[#6a7a7e]">
              {teamProfile.founded}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
