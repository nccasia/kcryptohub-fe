import { ISkills } from "./../type/skill/skill.types";
import axiosClient from "@/api/axios-client";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const getAllSkill = createAsyncThunk("getAllSkill", async () => {
  const response = await axiosClient.get("/skill/list?size=100");
  return response.data.content;
});
export const getAllTeam = createAsyncThunk("getAllTeam", async () => {
  const response = await axiosClient({
    method: "get",
    url: "/team/getAll",
  });

  return response.data;
});
export const createTeam = createAsyncThunk(
  "createTeam",
  async (team: ICreateTeam) => {
    const response = await axiosClient({
      method: "post",
      url: "/team/create",
      data: team,
    });
    return response.data;
  }
);

export const deleteTeam = createAsyncThunk("deleteTeam", async (id: string) => {
  const response = await axiosClient({
    method: "delete",
    url: `/team/delete/${id}`,
  });
  return { id };
});

export const updateTeam = createAsyncThunk(
  "updateTeam",
  async (team: ICreateTeam) => {
    const response = await axiosClient({
      method: "put",
      url: `/team/update/${team.id}`,
      data: team,
    });
    return response.data;
  }
);

const initialState = {
  value: {} as ICreateTeam,
  skillInfo: [] as ISkills[],
};

export const TeamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeam.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.value = action.payload;
        toast.success("Create Team successfull!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(createTeam.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {})
      .addCase(deleteTeam.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        toast.success("Update Team successfull!", {
          position: "bottom-right",
          autoClose: 1000,
        });
      })
      .addCase(updateTeam.rejected, (state, action) => {
        toast.error(action.error.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .addCase(getAllSkill.fulfilled, (state, action) => {
        state.skillInfo = action.payload;
      });
  },
});

export default TeamSlice.reducer;
