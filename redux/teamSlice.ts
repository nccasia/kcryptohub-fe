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
        position: "bottom-right",
      });
    })
    .catch((err) => {
      toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  return response;
};

export const GetAllTeam = async () => {
  const response = axiosClient({
    method: "get",
    url: "/team/getAll",
  });

  return (await response).data;
};

export const DeleteTeam = async (id: string) => {
  const response = axiosClient({
    method: "delete",
    url: `/team/delete/${id}`,
  });
  return response;
};
