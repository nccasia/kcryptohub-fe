import { IPortfolio } from "@/type/team/team.type";
import path from "path";
import axiosClient from "./axios-client";
import { teamApi } from "./team-api";

export const PortfolioApi = {
  async createPortfolio(data: IPortfolio, teamId: number) {
    if (isNaN(teamId)) return null;
    try {
      const response = await axiosClient.post("/portfolio/create", {
        ...data,
        privacy: parseInt(data.privacy.toString()),
        teamId,
      });
      return response.data;
    } catch (error) {
      return (error as any).response?.data.statusCode;
    }
  },

  async updatePortfolio(data: IPortfolio, teamId: number, id: number) {
    if (isNaN(teamId)) return null;
    try {
      const response = await axiosClient.put(`/portfolio/update/${id}`, {
        ...data,
        privacy: parseInt(data.privacy.toString()),
        teamId,
      });
      return response.data;
    } catch (error) {
      return (error as any).response.data.statusCode;
    }
  },

  async deletePortfolio(id: number) {
    if (isNaN(id)) return null;
    try {
      const response = await axiosClient.delete(`/portfolio/delete/${id}`);
      return response.data;
    } catch (error) {
      return (error as any).response.data.statusCode;
    }
  },

  async getAll(teamId: number) {
    if (isNaN(teamId)) return null;
    try {
      const response = await teamApi.getTeam(teamId);
      return response.data.portfolios;
    } catch (error) {
      return null;
    }
  },

  async getPortfolio(id: number) {
    if (isNaN(id)) return null;
    try {
      const response = await axiosClient.get(`/portfolio/get/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async postImage(image: File | undefined, id: number) {
    if (isNaN(id) || !image) return null;
    try {
      const formData = new FormData();
      formData.append("file", image);
      const response = await axiosClient.post(
        `/portfolio/${id}/image`,
        formData
      );
      return response.data;
    } catch (error) {
      return (error as any).response.data.statusCode;
    }
  },

  getPortfolioImageUrl(url: string) {
    if (url.includes("http")) {
      return url;
    }
    return process.env.API_URL + "/api/portfolio/getImage/" + url;
  },
};
