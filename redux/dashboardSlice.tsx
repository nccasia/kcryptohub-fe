import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamId: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
  },
});

export const { setTeamId } = dashboardSlice.actions;

export default dashboardSlice.reducer;
