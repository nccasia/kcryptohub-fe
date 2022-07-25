import axiosClient from "./axios-client";

export const shortListApi = {
  async getShortList() {
    const res = await axiosClient.get("/user/short-list");
    return res.data;
  },

  async addToShortList(teamId: number) {
    const res = await axiosClient.post("/user/add-short-list", { teamId });
    return res.data;
  },

  async removeFromShortList(id: number) {
    const res = await axiosClient.delete(`/user/remove-short-list/${id}`);
    return res.data;
  },
};
