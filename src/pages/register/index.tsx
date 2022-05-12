import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yub from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yub.object().shape({
  username: yub.string().required("Username is required"),
  password: yub
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
  email: yub
    .string()
    .email("Please enter a valid email format!")
    .required("Email is required"),
  confirmPassword: yub
    .string()
    .oneOf([yub.ref("password")], "Password does not match")
    .required("This field is required"),
});
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const [step, setStep] = React.useState(0);
  const [isValid, setValid] = React.useState(false);

  const onNext = () => {
    if (step === 0) {
      setStep((cur) => cur + 1);
    }
  };

  const handleRegister = () => {
    console.log(watch());
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-cyan-900">
      <div className="flex flex-col items-center content-center relative m-auto h-auto w-[470px] mt-20">
        <form
          className="space-y-6 relative bg-white w-full p-8 rounded-md"
          action="#"
          method="POST"
        >
          <div>
            <h1 className="mt-1 text-center text-3xl font-bold text-[#944C00]">
              Register
            </h1>
            <h2 className="text-center text-1xl font-600 mb-7 ">
              Join with us to get the chance!
            </h2>
          </div>
          {step === 0 && (
            <>
              <div className="mb-5">
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className="text-[#944C00] w-[130px] text-left mr-2 font-bold ">
                    Email
                  </span>
                  <input
                    id="email-address"
                    type="email"
                    required
                    autoComplete="email"
                    className="appearance-none relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <div className="flex justify-center ml-40 ">
                    <p
                      className={
                        "text-xs w-[250px] block mt-[-10px] text-red-600"
                      }
                    >
                      {errors?.email?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mb-4 mt-9 items-center">
                <button
                  disabled={!isDirty || errors.email}
                  className="px-6 py-2 bg-[#944C00] text-white rounded"
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="mb-5">
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className="text-[#944C00] w-[150px] text-left mr-2 font-bold ">
                    Username
                  </span>
                  <input
                    id="username"
                    type="text"
                    className="appearance-none relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <div className="flex justify-center ml-40 ">
                    <p
                      className={
                        "text-xs w-[230px] mb-3  block mt-[-10px] text-red-600"
                      }
                    >
                      {errors?.username?.message}
                    </p>
                  </div>
                )}
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className="text-[#944C00] w-[150px] text-left mr-2 font-bold ">
                    Password
                  </span>
                  <input
                    id="password"
                    type="password"
                    className="appearance-none relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <div className="flex justify-center ml-40 ">
                    <p
                      className={
                        "text-xs w-[230px] mb-3  block mt-[-10px] text-red-600"
                      }
                    >
                      {errors?.password?.message}
                    </p>
                  </div>
                )}
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className="text-[#944C00] w-[150px] text-left mr-2 font-bold ">
                    Confirm password
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="appearance-none relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("confirmPassword", { required: true })}
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex justify-center ml-40 ">
                    <p
                      className={
                        "text-xs w-[230px] block mt-[-10px] text-red-600"
                      }
                    >
                      {errors?.confirmPassword?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mb-4 mt-9 items-center">
                <button
                  onClick={() => {
                    if (step === 1) {
                      setStep((cur) => cur - 1);
                    }
                  }}
                  className="px-6 py-2 bg-transparent border border-black mr-5 text-black rounded"
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-[#944C00] text-white rounded"
                  onClick={handleSubmit(handleRegister)}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
