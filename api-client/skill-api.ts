import axiosClient from "./axios-client";

export const skillApi = {
    async getAllSkills() {
        try {
            const response = await axiosClient.get("/skill/list?size=1000");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getSkillPage(page: number, size: number) {
        try {
            const response = await axiosClient.get(
                `/skill/list?page=${page}&size=${size}`
            );
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async getSkillSearch(query: string, page: number, size: number) {
        try {
            const response = await axiosClient.get(`/skill/list?keyword=${query}&page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return [];
        }
    },
}