import axiosClient from "@/api/axios-client";
import { IAwardDetail } from "@/type/awards/awards.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAwards = createAsyncThunk(
  "getAwards",
  async (teamId: number) => {
    const response = await axiosClient.get(`/awards/getAllAwards/${teamId}`);
    return response.data;
  }
);

const initialState = {
  awards: [] as IAwardDetail[],
};

export const awardsSlice = createSlice({
  name: "awards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAwards.fulfilled, (state, action) => {
      state.awards = action.payload;
    });
  },
});

export default awardsSlice.reducer;
