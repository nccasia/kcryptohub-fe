import { ITeamProfile } from "@/type/team/team.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: {} as ITeamProfile,
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
