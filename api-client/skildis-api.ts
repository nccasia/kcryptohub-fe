import axiosClient from "./axios-client";

export const skillDisApi = {
    getDataSkillDis: async () => {
        try {
            const response = await axiosClient.get("/service-line/getAll");
            return response.data;
        } catch (error) {
            return [];
        }
    }
};
