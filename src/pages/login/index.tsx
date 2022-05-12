/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GithubIcon from "@mui/icons-material/GitHub";

import { useForm } from "react-hook-form";
import * as yub from "yup";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm();
  const [loginForm, setLoginForm] = useState({});
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session, loginForm]);
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-cyan-900">
      <div className="flex flex-col items-center content-center relative m-auto h-auto w-[470px] mt-20">
        <form
          className="space-y-6 relative bg-white w-full p-8 rounded-md"
          action="#"
          method="POST"
          onSubmit={handleSubmit((loginForm) =>
            setLoginForm(JSON.stringify(loginForm))
          )}
        >
          <h1 className="mt-1 text-center text-3xl mb-7 font-bold text-black">
            Log in to Kryptohub
          </h1>
          <div className="mb-5">
            <div className="flex justify-center mb-4 items-center">
              <label
                htmlFor="email-address"
                className="text-red-600 w-[130px] text-left mr-2 font-bold text-sm"
              >
                Email or Username
              </label>
              <input
                id="email-address"
                aria-label="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-[220px] px-3 py-2 border border-gray-700 border-solid placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("email")}
              />
            </div>
            <div className="flex justify-center mb-4 items-center w-full">
              <label
                htmlFor="password"
                className="text-red-600 w-[130px] text-left mr-2 font-bold text-sm"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                aria-label="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-[220px] px-3 py-2 border border-gray-700  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("password")}
              />
            </div>
            <div className="flex justify-center mb-4 mt-9 items-center">
              <button className="px-6 py-2 bg-red-800 text-white rounded">
                Login
              </button>
            </div>
            <div className="text-center text-cyan-500 text-3l font-600">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <div className={styles.divider}></div>
              <span className="border-solid border-black border-[1.5px] w-[30px] h-[30px] text-center rounded-2xl ">
                or
              </span>
              <div className={styles.divider}></div>
            </div>
            <h1 className="text-center">
              Sign in with your social account media
            </h1>
            <div className="mt-6 flex justify-center items-center ">
              <a
                onClick={() => signIn("facebook")}
                className="w-[35px] h-[35px]  mr-5 rounded-3xl flex justify-center items-center text-white bg-teal-600 hover:cursor-pointer hover:bg-teal-700"
              >
                <FacebookIcon className="w-[20px] h-[20px]"></FacebookIcon>
              </a>
              <a
                onClick={() => signIn("google")}
                className="w-[35px] h-[35px]  mr-5 rounded-3xl flex justify-center items-center text-white bg-teal-600 hover:cursor-pointer hover:bg-teal-700"
              >
                <GoogleIcon className="w-[20px] h-[20px]"></GoogleIcon>
              </a>
              <a
                onClick={() => signIn("github")}
                className="w-[35px] h-[35px] rounded-3xl flex justify-center items-center text-white bg-teal-600 hover:cursor-pointer hover:bg-teal-700"
              >
                <GithubIcon className="w-[20px] h-[20px]"></GithubIcon>
              </a>
            </div>
          </div>
          <div className="text-center text-3l font-600">
            Don't have an account?{" "}
            <Link href="/register">
              <a className="text-cyan-600 text underline decoration-solid decoration-2 ">
                Register
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
