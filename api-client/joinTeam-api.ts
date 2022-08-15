import { IAddToMemberList } from "@/type/member/member.type";
import { toast } from "react-toastify";
import axiosClient from "./axios-client";

export const joinTeamApi = {
	async postContactJoinTeam(teamId: number) {
		try {
			const response = await axiosClient.post("/join-team/contact-join-team", { teamId: teamId });
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	},

	async getAllContactJoinTeam() {
		try {
			const response = await axiosClient.get("/join-team/get-all-contact");
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	},

	async putChangeStatusJoinTeam(id: number) {
		try {
			const response = await axiosClient.put(`/join-team/change-status-join-team/${id}`, {
				"isApproved": true
			});
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	},

	async deleteContactJoinTeam(id: number) {
		try {
			const response = await axiosClient.delete(`/join-team/delete/${id}`);
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	},

	async addToMemberList({ teamId, userId }: IAddToMemberList) {
		try {
			const response = await axiosClient.post(`/join-team/add-to-list-members?teamId=${teamId}&userId=${userId}`);
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	},

	async getContactJoinTeam(id: number) {
		try {
			const response = await axiosClient.get(`/join-team/get/${id}`);
			return response.data;
		} catch (error) {
			return (error as any).response;
		}
	}

}