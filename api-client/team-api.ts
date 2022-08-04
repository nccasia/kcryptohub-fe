import { ICreateTeam } from "@/type/team/team.type";
import axiosClient from "./axios-client";

export const teamApi = {
  async getListTeams(page: number, size: number) {
    try {
      const response = await axiosClient.get(
        `/team/list?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getListTeamsQuery(
    query: string,
    page: number,
    size: number,
    sort: string,
    skills: (number | null | undefined)[],
    timezones: string[]
  ) {
    const skill_filtered = skills.filter(
      (skill) => skill !== null && skill !== undefined
    );
    try {
      const response = await axiosClient.get("/team/list", {
        params: {
          keyword: query,
          page: page,
          size: size,
          sort: sort,
          skill_IN: skill_filtered,
          timeZone_IN: timezones,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getTeam(id: number) {
    if (isNaN(id)) {
      return null;
    }
    try {
      const response = await axiosClient.get(`/team/get/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },
  async getAllTeam() {
    const response = await axiosClient({
      method: "get",
      url: "/team/getAll",
    });

    return response.data;
  },
  async createTeam(team: ICreateTeam) {
    const response = await axiosClient({
      method: "post",
      url: "/team/create",
      data: team,
    });
    return response.data.data;
  },

  async deleteTeam(id: string) {
    try {
      const response = await axiosClient({
        method: "delete",
        url: `/team/delete/${id}`,
      });
      return { id };
    } catch (err) {
      return err;
    }
  },

  async updateTeam(team: ICreateTeam) {
    const response = await axiosClient({
      method: "put",
      url: `/team/update/${team.id}`,
      data: team,
    });

    return response.data.data;
  },

  getTeamImageUrl(path: string) {
    if (!path) return "/user1.png";
    if (path.includes("http")) {
      return path;
    }
    return process.env.API_URL + "/api/team/getImage/" + path;
  },

  async postImage(image: File, teamid: number) {
    const formData = new FormData();
    formData.append("file", image);
    const response = await axiosClient({
      method: "post",
      url: `/team/${teamid}/image`,
      data: formData,
    });
    return response;
  },
};
