import { authApi } from "@/api/auth-api";
import { IRegisterForm } from "@/type/auth/register.type";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as yub from "yup";
const schema = yub.object().shape({
  username: yub
    .string()
    .required("Username is required")
    .trim("Username is required")
    .max(30, "Max length is 30 characters!"),
  password: yub
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must includes lowercase, uppercase, number and special character"
    )
    .max(30, "Max length is 30 characters!"),

  emailAddress: yub
    .string()
    .required("Email is required")
    .email("Please enter a valid email format!")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    )
    .max(30, "Max length is 30 characters!"),
  confirmPassword: yub
    .string()
    .oneOf([yub.ref("password")], "Password does not match")
    .required("This field is required")
    .max(30, "Max length is 30 characters!"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const [step, setStep] = React.useState(0);
  const buttonRef = useRef(null);
  const [message, setMessage] = React.useState({
    email: "",
    username: "",
  });
  const [validateEmail, setValidate] = React.useState(false);
  const [validateUsername, setValidateUsername] = React.useState(false);
  const onNext = () => {
    if (step === 0) {
      setStep((cur) => cur + 1);
    }
  };

  const handleRedirectToLogin = () => {
    const query = new URLSearchParams(router.asPath);
    const url = query.has("/login?url")
      ? (query.get("/login?url") as string)
      : "/login";
    router.push(url);
  };

  const handleRegister = async () => {
    const registerForm = watch();
    (buttonRef.current as unknown as HTMLButtonElement).disabled = true;
    await authApi.register(
      registerForm as IRegisterForm,
      handleRedirectToLogin
    );
    (buttonRef.current as unknown as HTMLButtonElement).disabled = false;
  };

  const onSubmit: SubmitHandler<any> = () => {
    if (!errors.username && watch("username")) {
      authApi.checkUsername(watch("username").toLowerCase()).then((resp) => {
        if (resp.data === "") {
          setValidateUsername(true);
          handleRegister();
          reset();
        } else {
          setValidateUsername(false);
          setMessage({
            email: "",
            username: resp.data.message,
          });
        }
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        !errors.emailAddress &&
        watch("emailAddress") &&
        watch("emailAddress").length > 1
      ) {
        authApi.checkEmail(watch("emailAddress").toLowerCase()).then((resp) => {
          if (resp.data === "") {
            setValidate(true);
          } else {
            setValidate(false);
            setMessage({
              email: resp.data.message,
              username: "",
            });
          }
        });
      }
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [watch("emailAddress")]);

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="flex flex-col items-center content-center relative m-auto h-auto w-[470px] mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 relative bg-white w-full p-8 rounded-md"
          onChange={() => {
            if (buttonRef.current) {
              (buttonRef.current as unknown as HTMLButtonElement).disabled =
                false;
            }
          }}
          onKeyDown={(e) => e.key !== "Enter"}
        >
          <div>
            {step === 0 && (
              <div>
                <Link href="/login">
                  <a>
                    <ArrowBackIosNewIcon />
                  </a>
                </Link>
              </div>
            )}
            <h1 className="mt-1 text-center text-3xl font-bold text-[#944C00]">
              Register
            </h1>
            <h2 className="text-center text-1xl font-600 mb-7 ">
              Join with us to get the chance!
            </h2>
          </div>
          {step === 0 && (
            <div>
              <div className="mb-5 text-[#944C00]">
                <div className="flex justify-center items-center w-full">
                  <span className="text-left mr-9 font-bold ">Email</span>
                  <input
                    id="email-address"
                    type="email"
                    autoComplete="off"
                    className="appearance-none relative block w-[230px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("emailAddress")}
                  />
                </div>
                {errors.emailAddress && (
                  <div className="flex justify-center ml-24 ">
                    <p
                      className={
                        "text-xs w-[250px] mt-[2px] block text-red-600"
                      }
                    >
                      {errors?.emailAddress?.message}
                    </p>
                  </div>
                )}
                {!validateEmail && !errors.emailAddress && (
                  <span className="flex justify-center ml-24 ">
                    <p className={"text-xs w-[250px] block text-red-600"}>
                      {message.email}
                    </p>
                  </span>
                )}
              </div>
              <div className="flex justify-center mb-4 items-center">
                <button
                  disabled={!isDirty || errors.emailAddress || !validateEmail}
                  className={
                    "px-6 py-2 text-white rounded " +
                    (!isDirty || errors.emailAddress || !validateEmail
                      ? "bg-[gray] cursor-not-allowed"
                      : "bg-[#944C00]")
                  }
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <>
              <div className="mb-5 text-[#944C00]">
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className=" w-[150px] text-left mr-2 font-bold ">
                    Username
                  </span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="off"
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
                {!validateUsername && !errors.username && (
                  <div className="flex justify-center ml-[160px] ">
                    <p
                      className={
                        "text-xs w-[230px] mb-3 block mt-[-10px] text-red-600"
                      }
                    >
                      {message.username}
                    </p>
                  </div>
                )}
                <div className="flex justify-center mb-4 items-center w-full">
                  <span className=" w-[150px] text-left mr-2 font-bold ">
                    Password
                  </span>
                  <input
                    id="password"
                    type="password"
                    autoComplete="off"
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
                  <span className=" w-[150px] text-left mr-2 font-bold ">
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
                  type="button"
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
                  disabled={!isValid}
                  type="submit"
                  className={
                    "px-6 py-2  text-white rounded " +
                    (isValid
                      ? "bg-[#944C00]"
                      : "bg-[gray] hover:cursor-not-allowed")
                  }
                  ref={buttonRef}
                >
                  Submit
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
