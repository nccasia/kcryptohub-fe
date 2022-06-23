import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  Search,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  defaultValue?: string;
  valueList: string[];
  placeholder?: string;
  watch?: string;
}

export const SelectRadio = ({
  label,
  register,
  errors,
  defaultValue = "",
  valueList,
  placeholder = "",
  watch,
}: InputFieldProps) => {
  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState(valueList);
  const hanleSearchItems = (e: FormEvent<HTMLInputElement>)=>{
    const q = (e.target as HTMLInputElement).value;
    setItemList(valueList.filter(i=>i.toLowerCase().includes(q.toLowerCase())))
  };

  return (
    <div className="items-center my-4 font-medium">
      <label
        htmlFor={label.trim().toLowerCase().replace(/\s/g, "-")}
        className="text-primary min-w-[130px] block py-2 md:py-0"
      >
        {label}
      </label>
      <div className="xs:w-fit w-full flex flex-col relative">
        <button
          id={label.trim().toLowerCase().replace(/\s/g, "-")}
          className={`xs:min-w-[350px] flex items-center justify-between w-full border-2 border-[#cae0e7] pl-3 pr-3 py-2 outline-none 
          focus:shadow-3xl focus:border-primary ${
            errors && "bg-red-200"
          }`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShow(!show);
          }}
          onBlur={() => {
            setShow(false)
            }}
          onFocus={(e) => {
            e.preventDefault();
            setShow(true);
          }}
        >
          {watch ? watch : placeholder}
          {show ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
        </button>
        <Collapse
          in={show}
          className="absolute top-12 z-50 bg-white border-2 border-primary w-full overflow-y-scroll max-h-[300px] custom-scrollbar"
        >
          <div className="sticky w-full top-0 flex items-center justify-center p-1 bg-white">
            <input
              type="text"
              placeholder={`Search ${label}`}
              className="p-1 rounded-none border focus:border-cyan-900 focus:outline-none w-full"
              onChange={hanleSearchItems}
              onFocus={()=>setShow(true)}
            />
            <Search className="absolute right-2 text-sm" />
          </div>
          {itemList.map((value, i) => (
            <label
              htmlFor={`cateRadio${i}`}
              className="bg-white block px-3 my-1 border-l-4 border-white cursor-pointer w-full font-normal
                 hover:border-cyan-900 hover:font-medium hover:bg-cyan-100"
              key={value}
              onClick={()=>setShow(false)}
            >
              <label htmlFor={`cateRadio${i}`} className="cursor-pointer">
                {value}
              </label>
              <input
                id={`cateRadio${i}`}
                type="radio"
                value={value}
                hidden
                {...register}
              />
            </label>
          ))}
        </Collapse>
      </div>
      {errors && (
        <span className="text-red-500 text-left text-sm font-normal mt-1">
          {errors?.message}
        </span>
      )}
    </div>
  );
};
