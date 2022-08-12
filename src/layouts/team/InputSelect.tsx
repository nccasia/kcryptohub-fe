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
  clearError,
}: {
  item: ISkill;
  setShow: (selected: Boolean) => void;
  setValue: (name: string, setName: string) => void;
  searchText?: string;
  setSearchText?: (name: string) => void;
  type?: number;
  itemString?: string;
  label: string;
  clearError?: (name: string) => void;
}) => {
  return (
    <div className="z-[9999]">
      <label
        className="block cursor-pointer border-l-2 px-1 py-[1px] rounded-lg pl-5 border-transparent border hover:bg-gray-100 text-[#848ABD]"
        onClick={() => {
          setShow(false);
          if (type === 1) {
            setValue(label, itemString || "");
            clearError ? clearError(label) : null;
          } else setValue(label, item.skillName);

          if (setSearchText) {
            setSearchText(" ");
          }
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
