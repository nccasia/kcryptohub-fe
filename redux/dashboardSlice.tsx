import { ITeamProfile } from "@/type/team/team.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: {
    id: 0,
    teamName: "",
    teamSize: '',
    timeZone: '',
    workingTime: '',
    saleEmail: '',
    description: '',
    imageUrl: '',
    slogan: '',
    founded: '',
    linkWebsite: '',
    projectSize: '',
    status: false,
    skills: [],
    skillDistribution: [],
    portfolios: [],
    keyClients: [],
    awards: [],
  } as unknown as ITeamProfile,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { setTeam } = dashboardSlice.actions;

export default dashboardSlice.reducer;
