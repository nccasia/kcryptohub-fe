import axiosClient from "@/api/axios-client";
import { Skill } from "@/type/Skill";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getListSkill = createAsyncThunk("getListSkill", async () => {
  const response = await axiosClient.get("/skill/list?size=100");
  return response.data;
});

const initialState = {
  value: [] as Skill[],
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