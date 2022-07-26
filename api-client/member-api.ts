import { IGetMemberList, IMemberAddRequest, IRemoveMember } from "@/type/member/member.type";
import { toast } from "react-toastify";
import axiosClient from "./axios-client";


export const memberApi = {
  async getAllMemberLists({ teamId, page, size, sort }: IGetMemberList) {
    try {
      const response = await axiosClient.get(`/members/list`, {
        params: {
          teamId,
          page,
          size,
          sort,
        },

      });
      return response.data;
    }
    catch (error) {
      return [];
    }
  },
  async addMember({ teamId, members }: IMemberAddRequest) {
    try {
      const response = await axiosClient.post(`/members/add`, { teamId, members });
      return response.data;
    }
    catch (error) {
      return [];
    }
  },
  async joinTeam(teamId: number) {
    try {
      const response = await axiosClient.post("/members/join-team", { teamId: teamId });
      toast.success("Joined team successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return response;
    } catch (error) {
      toast.error("Failed to join team", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return [];
    }
  },
  async removeMember({ teamId, memberId }: IRemoveMember) {
    try {
      const response = await axiosClient.delete(`/members/remove-member?teamId=${teamId}&memberId=${memberId}`)
      return response.data;
    } catch (error) {
      return [];
    }
  }
}