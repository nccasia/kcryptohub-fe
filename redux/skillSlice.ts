import axiosClient from "@/api/axios-client";
import { skillApi } from "@/api/skill-api";
import { Skill } from "@/type/Skill";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getListSkill = createAsyncThunk("getListSkill", async () => {
  const data = await skillApi.getAllSkills();
  return data;
});

const initialState = {
  value: null,
};

export const skillSlice = createSlice({
  name: "listSkills",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getListSkill.rejected, (state, action) => {
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
    builder.addCase(getListSkill.fulfilled, (state, action) => {
      state.value = action.payload.content;
    });
  },
});

export const SkillReducer = skillSlice.reducer;