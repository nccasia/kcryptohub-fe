import { ISkill } from "@/type/skill/skill.types";
import { Collapse } from "@mui/material";
import { useOutsideClick } from "hook/OuterClick";
import React, { FormEvent, LegacyRef, Ref, useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { InputSelect } from "./InputSelect";

function SelectCustom({
  valueList,
  placeholder,
  defaultValue,
  errors,
  register,
  label,
  setValue,
  name,
  type,
  clearError,
}: {
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  defaultValue?: string;
  placeholder?: string;
  valueList: string[];
  setValue: (label: string, item: string) => void;
  name: string;
  type?: number;
  clearError: (name: string) => void;
}) {
  const [items, setItem] = useState(valueList);

  const [searchText, setSearchText] = useState("");

  const { show, setShow, nodeRef, subNodeRef } = useOutsideClick();

  useEffect(() => {
    register;
  }, [register]);

  useEffect(() => {
    setItem(valueList);
  }, [valueList]);

  const handleSearchItems = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };
  return (
    <div
      className="relative font-medium mb-2"
      ref={nodeRef as LegacyRef<HTMLDivElement>}
    >
      <label
        htmlFor={label.trim().toLowerCase().replace(/\s/g, "-")}
        className="text-primary min-w-[130px] mb-2  block py-2 md:py-0 "
      >
        {label}
      </label>
      <input
        readOnly={true}
        type="text"
        className={`appearance-none xs:max-w-[350px] ${
          type === 1 ? "bg-[#ecedee]" : "bg-white"
        } text-[#606060] border-2 rounded-3xl mr-3 block w-full px-3 py-2 pr-8 border-solid placeholder-gray-500 focus:outline-none focus:border-[#848abd]  md:mt-0 mt-4 sm:text-sm placeholder:text-xs custom-scrollbar`}
        placeholder={placeholder}
        autoComplete="off"
        onClick={() => setShow(true)}
        {...register}
      />

      <Collapse
        in={show}
        className={`${
          show ? "absolute" : "hidden"
        } bg-white border-2 border-[#848ABD] rounded-xl max-h-[250px] w-full  overflow-auto z-[9999] xs:max-w-[350px] custom-scrollbar shadow-lg !font-nunito `}
        ref={subNodeRef as Ref<unknown>}
      >
        <label className={`text-xs pl-5 px-1 text-[#848ABD] mt-1 mb-1`}>
          {label}
        </label>
        {items?.length === 0 ? (
          <div className="text-[#848ABD] text-sm pl-1 py-1 mb-1">No Items</div>
        ) : (
          items?.map((item, index) => (
            <InputSelect
              key={index}
              itemString={item}
              item={item as unknown as ISkill}
              setShow={() => setShow(false)}
              setValue={setValue}
              type={1}
              label={name}
              clearError={clearError}
            />
          ))
        )}
      </Collapse>
      {errors && (
        <span
          className={`text-red-500 text-left text-sm ${
            type === 1 ? "font-normal" : "font-medium"
          } mt-1`}
        >
          {errors?.message}
        </span>
      )}
    </div>
  );
}

export default SelectCustom;
