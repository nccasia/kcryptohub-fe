import axiosClient from "./axios-client";

export const teamApi = {
    async getListTeams(page: number, size: number) {
        try {
            const response = await axiosClient.get(`/team/list?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async getListTeamsQuery(query: string, page: number, size: number, sort: string, skills: (number|null|undefined)[], timezones: string[]) {
        const skill_filtered = skills.filter(skill => skill !== null && skill !== undefined);
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
    }
}