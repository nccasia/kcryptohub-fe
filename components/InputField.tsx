import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
export interface InputFieldProps {
  lable: string;
  type: string;
  registerReturn: UseFormRegisterReturn;
  errorField: FieldErrors | undefined;
}
const InputField = ({
  type,
  lable,
  registerReturn,
  errorField,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col py-2">
      <div className="flex justify-between items-center ">
        <label className="text-rose-700">{lable}</label>
        <input
          type={type}
          className="border border-solid border-black outline-none py-2 px-4 rounded-lg"
          {...registerReturn}
          autoComplete="off"
          aria-label={lable}
        />
      </div>
      {errorField && (
        <span className="text-red-500 text-left text-sm mt-2">
          {errorField?.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
