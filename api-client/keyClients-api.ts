import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { IKeyClient } from "@/type/team/team.type";
import axiosClient from "./axios-client";
import { teamApi } from "./team-api";

export const KeyClientApi = {
  async createKeyClient(data: string[], teamId: number, team: ICreateTeam) {
    if (isNaN(teamId)) return null;
    try {
      const res = await axiosClient.post(`/key-client/create`, {
        keyName: data,
      });
    
      const response = await axiosClient.put(`team/update/${teamId}`, {
        ...team,
        keyClients: [res.data],
      });
      return response.data;
    } catch (error) {
      return (error as any).response?.data.statusCode;
    }
  },

  async updateKeyClient(data: string[], teamId: number, id: number, team: ICreateTeam) {
    if (isNaN(teamId)) return null;
    try {
      const res = await axiosClient.put(`/key-client/update/${id}`, {
        keyName: data,
      });
       const response = await axiosClient.put(`team/update/${teamId}`, {
        ...team,
        keyClients: [res.data],
      });
      return response.data;
    } catch (error) {
      return (error as any).response.data.statusCode;
    }
  },

  async deleteKeyClient(id: number) {
    if (isNaN(id)) return null;
    try {
      const response = await axiosClient.delete(`/key-client/delete/${id}`);
      return response.data;
    } catch (error) {
      return (error as any).response.data.statusCode;
    }
  },

  async getAll(teamId: number) {
    if (isNaN(teamId)) return null;
    try {
      const response = await teamApi.getTeam(teamId);
      return response.data;
    } catch (error) {
      return null;
    }
  },
};
