import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
  defaultValue?: string;
}

const InputField = ({
  label,
  placeholder,
  register,
  errors,
  defaultValue,
}: InputFieldProps) => {
  return (
    <div className="md:flex items-center mx-5 my-8">
      <label className="text-primary min-w-[130px] block py-2 md:py-0">
        {label}:
      </label>
      <div className="w-full flex flex-col">
        <input
          type="text"
          {...register}
          autoComplete="off"
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="md:max-w-[400px] w-full px-3 py-2 outline-none bg-[#0000000d] rounded-3xl text-[#606060] "
        />
        {errors && (
          <span className="text-red-500 text-left text-sm mt-1">
            {errors?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
