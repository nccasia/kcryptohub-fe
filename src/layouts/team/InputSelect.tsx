import { ISkill } from "@/type/skill/skill.types";
import React from "react";

export const InputSelect = ({
  item,
  setShow,
  setValue,
  searchText,
  setSearchText,
}: {
  item: ISkill;
  setShow: (selected: Boolean) => void;
  setValue: (name: string, setName: string) => void;
  searchText?: string;
  setSearchText: (name: string) => void;
}) => {
  return (
    <div>
      <label
        className="block cursor-pointer border-l-2 px-1 py-[1px] pl-1 border-transparent hover:border-cyan-900 hover:bg-cyan-100"
        onClick={() => {
          setShow(false);
          setValue("skill", item.skillName);
          setSearchText(" ");
        }}
      >
        <label className={`cursor-pointer text-[#08537e]`}>
          {item.skillName}
        </label>
      </label>
    </div>
  );
};
