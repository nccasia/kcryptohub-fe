import { IMember } from "@/type/member/member.type";
import axiosClient from "./axios-client";


export const memberApi = {
  async getAllMemberLists() {
    try {
      const response = await axiosClient.get(`/members/list?teamId=${1}`);
      return response.data;
    }
    catch (error) {
      return [];
    }
  },
  async addMember(teamId: number, members: IMember[]) {
    try {
      const response = await axiosClient.post(`/members/add?teamId=${teamId}`, members);
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
  }
}