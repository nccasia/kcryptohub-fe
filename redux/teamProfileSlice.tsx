import axiosClient from "@/api/axios-client";
import { ITeamProfile } from "@/type/team/team.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTeamProfile = createAsyncThunk(
  "getTeamProfile",
  async (id: string) => {
    const response = await axiosClient.get(`/team/get/${id}`);
    return response.data;
  }
);

const initialState = {
  teamProfile: {} as ITeamProfile,
};

export const teamProfileSlice = createSlice({
  name: "teamProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamProfile.fulfilled, (state, action) => {
      state.teamProfile = action.payload;
    });
  },
});

export default teamProfileSlice.reducer;
