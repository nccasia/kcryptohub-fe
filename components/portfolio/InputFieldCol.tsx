import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  defaultValue?: string;
  maxLength?: number;
  watch: string;
}

export const InputFieldCol = ({
  label,
  placeholder,
  register,
  errors,
  defaultValue,
  maxLength = 30,
  watch,
}: InputFieldProps) => {
  return (
    <div className="items-center my-4 font-medium">
      <label
        htmlFor={label.trim().toLowerCase().replace(/\s/g, "-")}
        className="text-primary min-w-[130px] block py-2 md:py-0"
      >
        {label}
      </label>
      <div className="w-fit flex items-center justify-center flex-col relative">
        <input
          id={label.trim().toLowerCase().replace(/\s/g, "-")}
          type="text"
          {...register}
          autoComplete="off"
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          className={`sm:min-w-[400px] lg:min-w-[600px] w-full border-2 border-[#cae0e7] pl-3 pr-16 py-2 outline-none focus:shadow-3xl focus:border-primary ${
            errors && "bg-red-200"
          }`}
        />
        <div className="absolute right-0 p-2 text-gray-400 text-sm font-normal">
          {watch?watch.length:0}/{maxLength}
        </div>
      </div>
      {errors && (
        <span className="text-red-500 text-left text-sm font-normal mt-1">
          {errors?.message}
        </span>
      )}
    </div>
  );
};