
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormEvent, useEffect, useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { authApi } from "@/api/auth-api";

const schemaValidation = Yup.object({
  usernameOrEmail: Yup.string()
    .required("Email or username is required!")
    .trim("Username or email is required!")
    .max(50, "Email or username dose not exceed 50 character!")
});

const ForgotPassword = () => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const onSubmit = (values: FormEvent) => {
    reset();
  };
  return (
    <div className="h-auto min-h-full bg-primary flex justify-center xs:items-center px-2 xxs:px-0  py-4 ">
      <div className="max-w-[420px] h-fit w-full animate-slide-in-left">
        <div className="text-center ">
          <h3 className="text-5xl font-bold text-white">Kryptohub</h3>
        </div>
        <div className="w-full h-fit max-h-3/4 bg-white p-8 mt-8">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            <ArrowBackIos /> Back
          </div>
          <div className="">
            <h3 className="text-cyan-900 text-md py-4">
              <b className="text-2xl font-normal">Forgot </b>
              password
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mb-5 mx-auto max-w-[400px] text-center "
          >
            <div className="flex flex-col py-2">
              <div className="flex flex-col justify-start items-start ">
                <label className="font-medium">Email or username</label>
                <input
                  type="text"
                  className="border-solid  w-full  border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                  {...register("usernameOrEmail")}
                  autoComplete="off"
                />
              </div>
              {errors?.usernameOrEmail && (
                <span className="text-red-500 text-left text-sm mt-2">
                  {errors?.usernameOrEmail?.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white block text-center py-2 px-5 w-full shadow-lg mt-4 mx-auto"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
