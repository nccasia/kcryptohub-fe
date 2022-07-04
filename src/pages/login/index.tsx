import { authApi } from "@/api/auth-api";
import {
  ELoginProvider,
  IFormLogin,
  IFormLoginGithub,
  IFormLoginGoogle,
} from "@/type/auth/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Collapse } from "@mui/material";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

const schemaValidation = Yup.object({
  usernameOrEmail: Yup.string()
    .required("Email or username is required!")
    .trim("Username or email is required!")
    .max(30, "Email or username dose not exceed 30 character!"),
  password: Yup.string()
    .required("Password is required!")
    .trim("Password is required!")
    .max(30, "Password dose not exceed 30 character!"),
});

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(schemaValidation),
    mode: "all",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
    async function getUserSession() {
      const data = await getSession();
      if (data) {
        switch (data.provider) {
          case ELoginProvider[ELoginProvider.GITHUB].toLowerCase(): {
            handleLoginGithub({
              accessToken: data!.accessToken as string,
            });
            break;
          }
          case ELoginProvider[ELoginProvider.GOOGLE].toLowerCase(): {
            handleLoginGoogle({
              name: data?.user?.name,
              emailAddress: data?.user?.email,
              accessToken: data!.accessToken as string,
              provider: "google",
            });
            break;
          }
          default:
            break;
        }
      }
    }
    getUserSession();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query && router.query.url) {
        setRedirectUrl(router.query.url as string);
      }
    }
  }, [router.isReady]);

  const handleLogin = async (payload: IFormLogin) => {
    try {
      await authApi.logIn(payload, handleRedirectHomePage);
    } catch (error) {
      throw new Error();
    }
  };
  const handleLoginGithub = async (payload: IFormLoginGithub) => {
    await authApi.logInGithub(payload, handleRedirectHomePage);
  };
  const handleLoginGoogle = async (payload: IFormLoginGoogle) => {
    await authApi.logInGoogle(payload, handleRedirectHomePage);
  };

  const handleRedirectHomePage = () => {
    const query = new URLSearchParams(router.asPath);
    const url = query.has("/login?url")
      ? (query.get("/login?url") as string)
      : redirectUrl;
    router.push(url);
  };

  const onSubmit: SubmitHandler<IFormLogin> = (values) => {
    handleLogin(values);
    reset();
  };
  return (
    <div className="h-auto min-h-full bg-cyan-900 flex justify-center xs:items-center px-2 xxs:px-0  py-4">
      <div className="max-w-[420px] h-fit w-full">
        <div className="text-center ">
          <h3 className="text-5xl font-bold text-white">Kryptohub</h3>
        </div>
        <div className="w-full h-fit max-h-3/4 bg-white p-8 mt-8">
          <div className="">
            <h3 className="text-cyan-900 text-sm">
              <b className="text-4xl font-normal">Sign In </b> <br />
              to continue to Kryptohub
            </h3>
          </div>
          <div className="auth-social text-center">
            <div className="flex flex-col justify-center items-center gap-x-4 mt-6">
              <button
                className="bg-indigo-800 w-fit  text-white mb-8 cursor-pointer min-w-[240px] flex items-center justify-center group"
                onClick={() => signIn("github")}
              >
                <GitHubIcon className="text-white cursor-pointer mx-2" />
                <span className="w-full p-2 group-hover:bg-indigo-900">
                  Sign in with GitHub
                </span>
              </button>
              <button
                className="bg-blue-600 w-fit text-white mb-8 cursor-pointer min-w-[240px] flex items-center justify-center group pl-[1px]"
                onClick={() => signIn("google")}
              >
                <div className="h-[38px] w-[47px] flex items-center justify-center bg-white ">
                  <Image
                    src={"/google.svg"}
                    width={22}
                    height={22}
                    alt="google"
                  />
                </div>
                <span className="w-full p-2 group-hover:bg-blue-700 ">
                  Sign in with Google
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="h-[1px] w-full bg-black block"></div>
            <div className="inline-block border border-solid border-black rounded-full leading-none p-3 ">
              or
            </div>
            <div className="h-[1px] w-full bg-black inline-block"></div>
          </div>
          <div className="">
            <span
              className="text-xs text-cyan-800 cursor-pointer hover:underline"
              onClick={() => setIsOpen(!isOpen)}
            >
              Alternative log in{" "}
              {isOpen ? (
                <KeyboardArrowUp className="text-xs" />
              ) : (
                <KeyboardArrowDown className="text-xs" />
              )}{" "}
            </span>
            <Collapse in={isOpen} className="">
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
                <div className="flex flex-col py-2">
                  <div className="flex flex-col justify-start items-start ">
                    <label className="font-medium">Password</label>
                    <input
                      type="password"
                      className="border-solid  w-full  border-2 border-[#cae0e7] px-3 py-2 outline-none focus:shadow-3xl focus:border-primary"
                      {...register("password")}
                      autoComplete="off"
                    />
                  </div>
                  {errors?.password && (
                    <span className="text-red-500 text-left text-sm mt-2">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white block text-center py-2 px-5 w-full shadow-lg mt-4 mx-auto"
                >
                  Log In
                </button>
                <Link href="/login">
                  <a className="inline-block text-cyan-500 text-sm mt-3 cursor-pointer">
                    Forgot your password?
                  </a>
                </Link>
              </form>
              <div className="block text-black text-center text-sm mt-3">
                {"Don't have an account? "}
                <Link href="/register">
                  <a className="text-cyan-500 underline cursor-pointer">
                    Register
                  </a>
                </Link>
              </div>
            </Collapse>
            <div className="text-xs mt-8">
              <span>
                By signing in you agree to our User Agreement and Privacy
                Policy.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
