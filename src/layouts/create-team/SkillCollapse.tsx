import { Props } from "@headlessui/react/dist/types";
import { Collapse } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { IValue } from "./Skill-Dis";
import { ISkillDistribution } from "@/type/skill/skill.types";

export interface IProps {
  item: ISkillDistribution;
  skillDistribute: IValue[];
  setDataSkillDistribute: (skillDistribute: IValue[]) => void;
}

export const SkillCollapse = (props: IProps) => {
  const [isOpenState, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpenState);
  };
  return (
    <div className="border mb-3 relative w-full border-2 border-[#cae0e7] text-indigo-800 px-3 py-2 cursor-pointer">
      <div
        className="w-full flex justify-between items-center "
        onClick={handleChange}
      >
        {props.item.skillDistributionName}
        <span className="text-red-600">
          {isOpenState ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      <Collapse in={isOpenState}>
        <div className="pt-3">
          {props.item.skillDistributionValue &&
            props.item.skillDistributionValue.map((cur, index) => (
              <div key={index} className="inline-block">
                {!props.skillDistribute.find((data) => {
                  return cur.field === data.field;
                }) ? (
                  <div
                    className="  mb-3 px-3 mr-2 text-indigo-800 border-2 rounded-md border-[#cae0e7]"
                    onClick={() => {
                      if (
                        props.skillDistribute.find((data) => {
                          return cur.field === data.field;
                        })
                      ) {
                        props.setDataSkillDistribute(
                          props.skillDistribute.filter((data) => {
                            return data.field !== cur.field;
                          })
                        );
                      } else {
                        props.setDataSkillDistribute([
                          ...props.skillDistribute,
                          {
                            field: cur.field,
                            quantity: cur.quantity,
                          },
                        ]);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {cur.field}
                    </div>
                  </div>
                ) : (
                  <div
                    className="inline-block border-[3px] mb-3 px-3 mr-2 text-indigo-800 rounded-md border-[#cae0e7]"
                    onClick={() => {
                      props.setDataSkillDistribute(
                        props.skillDistribute.filter(
                          (item) => item.field !== cur.field
                        )
                      );
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {cur.field}
                      <span className="text-xs text-cyan-700">
                        <CloseIcon className="text-base" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </Collapse>
    </div>
  );
};
