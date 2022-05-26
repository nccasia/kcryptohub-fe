import {
  IFormLogin,
  IFormLoginGithub,
  IFormLoginGoogle,
} from "@/type/auth/login.type";
import { IRegisterForm } from "@/type/auth/register.type";
import axiosClient from "./axios-client";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const authApi = {
  async register(payload: IRegisterForm, redirectToLogin: Function) {
    try {
      const response = await axiosClient.post("/auth/register", payload);
      toast.success("Success!", {
        position: "top-center",
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          redirectToLogin();
          resolve(null);
        }, 2000);
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  },
  logIn(payload: IFormLogin, handleRedirectHomePage: Function) {
    const response = axiosClient.post("/auth/login", payload);
    response
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          handleRedirectHomePage();
        }

        toast.success("Login Successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  },
  logInGithub(payload: IFormLoginGithub, handleRedirectHomePage: Function) {
    const response = axiosClient.post("/auth/github", payload);
    response
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        handleRedirectHomePage();
      })
      .catch((err) => {
        throw new Error();
      });
  },
  logInGoogle(payload: IFormLoginGoogle, handleRedirectHomePage: Function) {
    const response = axiosClient.post("/auth/google", payload);
    response
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        handleRedirectHomePage();
      })

      .catch((err) => {});
  },
};
