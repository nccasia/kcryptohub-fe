import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import { IFormRegistration } from "type/register/register.type";

const schemaValidation = Yup.object({
  emailAddress: Yup.string()
    .required("Email address is required!")
    .email("Must be a valid email"),
  username: Yup.string().required("Username is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include lowercase, uppercase, number and special character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password does not match"
  ),
});

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormRegistration>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });
  const [stepOne, setStepOne] = useState<boolean>(true);
  const [stepTwo, setStepTwo] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormRegistration> = (values) => {
    console.log(values);
    router.push("/login");
    reset();
  };

  const handleNextStep = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  const handleBackStep = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  return (
    <div className="h-screen bg-cyan-900 flex justify-center items-center">
      <div className="max-w-[500px] w-full rounded-md shadow-xl overflow-hidden">
        <div className="w-full h-full bg-white p-6">
          <div className="header text-center">
            <h2 className="text-4xl font-bold text-rose-700">Register</h2>
            <span className="text-md text-cyan-500">
              Join with us to get channel
            </span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="register mt-10 mb-5 mx-auto max-w-[400px] text-center"
          >
            {stepOne && (
              <div className="step-1">
                <InputField
                  lable="Email address"
                  type="text"
                  registerReturn={register("emailAddress")}
                  errorField={errors?.emailAddress}
                />
                <button
                  disabled={Boolean(!isDirty || errors.emailAddress)}
                  type="button"
                  className="bg-rose-700 text-white block text-center py-2 px-5 rounded-md shadow-lg mt-8 mx-auto ease-linear duration-150 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            )}
            {stepTwo && (
              <div className="step-2">
                <InputField
                  lable="Username"
                  type="text"
                  registerReturn={register("username")}
                  errorField={errors?.username}
                />
                <InputField
                  lable="Password"
                  type="password"
                  registerReturn={register("password")}
                  errorField={errors?.password}
                />
                <InputField
                  lable="Confirm Password"
                  type="password"
                  registerReturn={register("confirmPassword")}
                  errorField={errors?.confirmPassword}
                />
                <div className="inline-flex gap-x-5 mt-8">
                  <button
                    type="button"
                    className="bg-white text-black border border-black block text-center py-2 px-5 rounded-md shadow-lg"
                    onClick={handleBackStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="bg-rose-700 text-white block text-center py-2 px-5 rounded-md shadow-lg ease-linear duration-150 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </form>
          <div className="block text-black text-center text-sm mt-3">
            {"Already have an account? "}
            <Link href="/login">
              <a className="text-cyan-500 underline cursor-pointer">Log in</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
