import axiosClient from "./axios-client";


export const memberApi = {
  async getAllMemberLists() {
    try {
      const response = await axiosClient.get(`/member/list?&teamId=${1}`);
      return response.data;
    }
    catch (error) {
      return [];
    }
  }
}