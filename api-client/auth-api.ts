import { IFormLogin } from "@/type/login/login.type";
import axiosClient from "./axios-client";
import { toast } from "react-toastify";

export const authApi = {
  logIn(payload: IFormLogin) {
    const response = axiosClient.post("/auth/login", payload);
    response
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
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
        toast.error(err.message, {
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
};
