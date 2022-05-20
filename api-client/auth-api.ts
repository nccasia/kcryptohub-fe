import {
  IFormLogin,
  IFormLoginGithub,
  IFormLoginGoogle,
} from "@/type/auth/login.type";
import { IRegisterForm } from "@/type/auth/register.type";
import axiosClient from "./axios-client";
import { toast } from "react-toastify";

export const authApi = {
  register(payload: IRegisterForm, redirectToLogin: Function) {
    const response = axiosClient.post("/auth/register", payload);
    response
      .then((resp) => {
        toast.success("Success!", {
          position: "top-center",
        });
        setTimeout(() => {
          redirectToLogin();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  },
  logIn(payload: IFormLogin, handleRedirectProfilePage: Function) {
    const response = axiosClient.post("/auth/login", payload);
    response
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          handleRedirectProfilePage();
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
  logInGithub(payload: IFormLoginGithub) {
    const response = axiosClient.post("/auth/github", payload);
    response
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch((err) => {
        throw new Error();
      });
  },
  logInGoogle(payload: IFormLoginGoogle) {
    const response = axiosClient.post("/auth/google", payload);
    response
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
      })

      .catch((err) => {});
  },
};
