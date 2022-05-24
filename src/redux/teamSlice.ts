import axiosClient from "@/api/axios-client";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const CreateTeam = async (payload: ICreateTeam) => {
  const response = axiosClient({
    method: "post",
    url: "/team/create",
    data: payload,
  })
    .then((res) => {
      toast.success("Success!", {
        position: "top-center",
      });
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  return response;
};

export const GetTeam = async () => {
  const response = axiosClient({
    method: "get",
    url: "/team/getAll",
  });

  return response;
};
