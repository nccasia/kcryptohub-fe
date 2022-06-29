import { IMemberAddRequest, IRemoveMember } from "@/type/member/member.type";
import { toast } from "react-toastify";
import axiosClient from "./axios-client";


export const memberApi = {
  async getAllMemberLists(teamId: number) {
    try {
      const response = await axiosClient.get(`/members/list?teamId=${teamId}`);
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return response.data;
    } catch (error) {
      return []
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