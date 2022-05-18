import { authApi } from "@/api/auth-api";
import {
  ELoginProvider,
  IFormLogin,
  IFormLoginGithub,
  IFormLoginGoogle,
} from "@/type/auth/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

const schemaValidation = Yup.object({
  usernameOrEmail: Yup.string().required("Email or username is required!"),
  password: Yup.string().required("Password is required!"),
});

const Login = () => {
  const { data } = useSession();
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
    if (data) {
      console.log(data);
      switch (data.provider) {
        case ELoginProvider[ELoginProvider.GITHUB].toLowerCase(): {
          handleLoginGithub({
            email: data?.user?.email,
            accessToken: data!.accessToken as string,
          });
          break;
        }
        case ELoginProvider[ELoginProvider.GOOGLE].toLowerCase(): {
          handleLoginGoogle({
            name: data?.user?.name,
            email: data?.user?.email,
            accessToken: data!.accessToken as string,
            provider: "google",
          });
          break;
        }
        default:
          break;
      }
      router.push("/");
    }
  }, [data, router]);

  const handleLogin = async (payload: IFormLogin) => {
    try {
      await authApi.logIn(payload);
    } catch (error) {
      throw new Error();
    }
  };
  const handleLoginGithub = async (payload: IFormLoginGithub) => {
    await authApi.logInGithub(payload);
  };
  const handleLoginGoogle = async (payload: IFormLoginGoogle) => {
    await authApi.logInGoogle(payload);
  };

  useEffect(() => {
    if (data) {
      switch (data.provider) {
        case ELoginProvider[ELoginProvider.GITHUB].toLowerCase():
          authApi.logInGithub({
            email: data.user?.email,
            accessToken: data.accessToken as string,
          });
          break;
        case ELoginProvider[ELoginProvider.GOOGLE].toLowerCase():
          authApi.logInGoogle({
            email: data.user?.email,
            name: data.user?.name,
            provider: data.provider as string,
            accessToken: data.idToken as string,
          });
          break;
        default:
          break;
      }
    }
  }, [data, router]);

  const onSubmit: SubmitHandler<IFormLogin> = (values) => {
    handleLogin(values);
    reset();
  };
  return (
    <>
      <div className="h-screen bg-cyan-900 flex justify-center items-center">
        <div className="max-w-[500px] w-full rounded-md shadow-xl overflow-hidden">
          <div className="w-full h-full bg-white p-6">
            <div className="header text-center">
              <h3 className="text-4xl font-bold">Log in to Kryptohub</h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 mb-5 mx-auto max-w-[400px] text-center"
            >
              <div className="flex flex-col py-2">
                <div className="flex justify-between items-center ">
                  <label className="text-[#944C00] font-bold">
                    Email or username
                  </label>
                  <input
                    type="text"
                    className="border border-solid border-black outline-none py-2 px-4 rounded-lg"
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
                <div className="flex justify-between items-center ">
                  <label className="text-[#944C00] font-bold">Password</label>
                  <input
                    type="password"
                    className="border border-solid border-black outline-none py-2 px-4 rounded-lg"
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
                className="bg-[#944C00] text-white block text-center py-2 px-5 rounded-md shadow-lg mt-8 mx-auto"
              >
                Log In
              </button>
              <h4 className="inline-block text-cyan-500 text-sm mt-3 cursor-pointer">
                Forgot your password?
              </h4>
            </form>
            <div className="flex items-center mb-4">
              <div className="h-[1px] w-full bg-black block"></div>
              <div className="inline-block border border-solid border-black rounded-full leading-none p-3">
                or
              </div>
              <div className="h-[1px] w-full bg-black inline-block"></div>
            </div>
            <div className="auth-social text-center">
              <h3>Sign in with your social account media</h3>
              <div className="flex justify-center gap-x-4 mt-6">
                <GitHubIcon
                  onClick={() => signIn("github")}
                  className="text-white bg-teal-600 rounded-full text-base p-1.5 w-[30px] h-[30px] cursor-pointer"
                />
                <GoogleIcon
                  onClick={() => signIn("google")}
                  className="text-white bg-teal-600 rounded-full text-base p-1.5 w-[30px] h-[30px] cursor-pointer"
                />
                <FacebookIcon className="text-white bg-teal-600 rounded-full text-base p-1.5 w-[30px] h-[30px] cursor-pointer" />
              </div>
            </div>
            <div className="block text-black text-center text-sm mt-3">
              {"Don't have an account? "}
              <Link href="/register">
                <a className="text-cyan-500 underline cursor-pointer">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
