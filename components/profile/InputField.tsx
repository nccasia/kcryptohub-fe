import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const InputField = ({ label, placeholder, register }: InputFieldProps) => {
  return (
    <div className="md:flex items-center mx-5 my-8">
      <label className="text-primary min-w-[130px] block py-2 md:py-0">
        {label}:
      </label>
      <input
        type="text"
        {...register}
        autoComplete="off"
        placeholder={placeholder}
        className="md:max-w-[400px] w-full border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
      />
    </div>
  );
};

export default InputField;
