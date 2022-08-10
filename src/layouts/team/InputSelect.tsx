import { ISkill } from "@/type/skill/skill.types";
import React, { useEffect } from "react";

export const InputSelect = ({
  item,
  setShow,
  setValue,
  searchText,
  setSearchText,
  type,
  itemString,
  label,
}: {
  item: ISkill;
  setShow: (selected: Boolean) => void;
  setValue: (name: string, setName: string) => void;
  searchText?: string;
  setSearchText?: (name: string) => void;
  type?: number;
  itemString?: string;
  label: string;
}) => {
  return (
    <div className="z-[9999]">
      <label
        className="block cursor-pointer border-l-2 px-1 py-[1px] rounded-lg pl-5 border-transparent border hover:border-[#606060] hover:bg-[#606060] text-[#848ABD] hover:text-white"
        onClick={() => {
          setShow(false);
          if (type === 1) {
            setValue(label, itemString || "");
          } else setValue(label, item.skillName);
        }}
      >
        {type === 1 && <label className={`cursor-pointer`}>{itemString}</label>}

        {type !== 1 && (
          <label className={`cursor-pointer`}>{item.skillName}</label>
        )}
      </label>
    </div>
  );
};
