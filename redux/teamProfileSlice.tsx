import { ITeamProfile } from "@/type/team/team.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamProfile: {} as ITeamProfile,
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
