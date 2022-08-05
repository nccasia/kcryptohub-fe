import { Props } from "@headlessui/react/dist/types";
import { Collapse } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import { IValue } from "./Skill-Dis";
import { ISkillDisData, ISkillDistribution } from "@/type/skill/skill.types";

export interface IProps {
  item: ISkillDisData;
  skillDistribute: IValue[];
  setDataSkillDistribute: (skillDistribute: IValue[]) => void;
}

export const SkillCollapse = (props: IProps) => {
  const [isOpenState, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpenState);
  };

  return (
    <div className="border mb-3 relative w-full border-2 border-[#b0a6ef] text-indigo-800 px-3 py-2 cursor-pointer rounded-2xl">
      <div
        className="w-full flex justify-between items-center "
        onClick={handleChange}
      >
        <div
          className={`hover:text-[#ff2305] ${
            isOpenState ? "text-[#ff2305]" : ""
          }`}
        >
          {props.item.name}
        </div>
        <span className="text-[#848abd]">
          {isOpenState ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      <Collapse in={isOpenState}>
        <div className="pt-3">
          {props.item.value &&
            props.item.value.map((cur, index) => (
              <div key={index} className="inline-block">
                {!props.skillDistribute.find((data) => {
                  return cur === data.field;
                }) ? (
                  <div
                    className="  mb-3 px-3 mr-2 text-indigo-800 border-2 rounded-md border-[#cae0e7]"
                    onClick={() => {
                      if (
                        props.skillDistribute.find((data) => {
                          return cur === data.field;
                        })
                      ) {
                        props.setDataSkillDistribute(
                          props.skillDistribute.filter((data) => {
                            return data.field !== cur;
                          })
                        );
                      } else {
                        props.setDataSkillDistribute([
                          ...props.skillDistribute,
                          {
                            field: cur,
                            quantity: 0,
                          },
                        ]);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {cur}
                    </div>
                  </div>
                ) : (
                  <div
                    className="inline-block border-[2px] mb-3 px-3 mr-2 text-indigo-800 rounded-md border-[#848abd]"
                    onClick={() => {
                      props.setDataSkillDistribute(
                        props.skillDistribute.filter(
                          (item) => item.field !== cur
                        )
                      );
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {cur}
                      <span className="text-xs text-[#b0a6ef]">
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
