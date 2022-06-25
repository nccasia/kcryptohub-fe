import { IMemberAddRequest, IRemoveMember } from "@/type/member/member.type";
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
      const response = await axiosClient.post(`/members/join?teamId=${teamId}`);
      return response.data;
    }
    catch (error) {
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