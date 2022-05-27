import axiosClient from "@/api/axios-client";
import { Team } from "@/type/team/team.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getListTeams = createAsyncThunk("getListTeams", async () => {
  const response = await axiosClient.get("/teams");
  return response.data;
});

const initialState = [] as Team[];

export const listTeamsSlice = createSlice({
  name: "listTeams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListTeams.rejected, (state, action) => {
      toast.error(action.error.message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    builder.addCase(getListTeams.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});


export const listTeamsReducer = listTeamsSlice.reducer;
