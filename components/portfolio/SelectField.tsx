import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  defaultValue?: string;
  valueList: string[];
  placeholder?: string;
}

export const SelectField = ({
  label,
  register,
  errors,
  defaultValue = "",
  valueList,
  placeholder = "",
}: InputFieldProps) => {
  return (
    <div className="items-center my-4 font-medium">
      <label
        htmlFor={label.trim().toLowerCase().replace(/\s/g, "-")}
        className="text-primary min-w-[130px] block py-2 md:py-0"
      >
        {label}
      </label>
      <div
        className={`xs:max-w-[375px] w-full border-2 border-[#cae0e7] pl-3 pr-8 py-2 outline-none focus-within:shadow-3xl focus-within:border-primary ${
          errors && "bg-red-200"
        }`}
      >
        <select
          id={label.trim().toLowerCase().replace(/\s/g, "-")}
          {...register}
          autoComplete="off"
          defaultValue={defaultValue}
          className={`xs:min-w-[350px] w-full bg-transparent`}
        >
          <option value="" className="text-gray-500 bg-white xs:max-w-[200px]">
            {placeholder}
          </option>
          {valueList.map((value) => (
            <option
              key={value}
              value={value}
              className="bg-white xs:max-w-[200px]"
            >
              {value}
            </option>
          ))}
        </select>
      </div>
      {errors && (
        <span className="text-red-500 text-left text-sm font-normal mt-1">
          {errors?.message}
        </span>
      )}
    </div>
  );
};
