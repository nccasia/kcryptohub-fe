
import { ITeam } from "@/type/team/team.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamProfile: {} as ITeam,
};

export const teamProfileSlice = createSlice({
  name: "teamProfile",
  initialState,
  reducers: {
    setTeamProfile: (state, action) => {
      state.teamProfile = action.payload;
    },
  },
});

export const { setTeamProfile } = teamProfileSlice.actions;
export default teamProfileSlice.reducer;
