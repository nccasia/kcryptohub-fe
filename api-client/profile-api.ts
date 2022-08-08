import { IProfile } from "@/type/profile/profile.type";
import axiosClient from "./axios-client";

export const profileApi = {
  getImageUrl: (url: string) => {
    if (!url) {
      return "";
    }
    if (url.includes("http")) {
      return url;
    } else {
      return `${process.env.API_URL}/api/profile/getImage/${url}`;
    }
  },

  getProfileTeam: async () => {
    // const profile = await axiosClient.get(`${process.env.API_URL}/api/profile/get-profile-team`);
    const profile = await axiosClient.get("/profile/get-profile-team");
    return profile.data.team;
  }
};
