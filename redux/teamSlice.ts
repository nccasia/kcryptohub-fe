import axiosClient from "@/api/axios-client";
import { teamApi } from "@/api/team-api";
import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ISkills } from "./../type/skill/skill.types";

export const getAllSkill = createAsyncThunk("getAllSkill", async () => {
  const response = await axiosClient.get("/skill/list?size=100");
  return response.data.content;
});
export const getAllTeam = createAsyncThunk("getAllTeam", async () => {
  const response = await teamApi.getAllTeam();

  return response;
});
export const createTeam = createAsyncThunk(
  "createTeam",
  async ({ team, file }: { team: ICreateTeam; file: File | null }) => {
    const response = await teamApi.createTeam(team);
    if (file) {
      const res = await teamApi.postImage(file, response.id);
    }

    return response;
  }
);

export const deleteTeam = createAsyncThunk("deleteTeam", async (id: string) => {
  const response = await teamApi.deleteTeam(id);
  return { id };
});

export const updateTeam = createAsyncThunk(
  "updateTeam",
  async (team: ICreateTeam) => {
    const response = await teamApi.updateTeam(team);

    return response;
  }
);

export const saveTeam = createAsyncThunk(
  "saveTeam",
  async (team: ICreateTeam) => {
    return team;
  }
);

export const resetTeam = createAsyncThunk("resetTeam", async () => {
  return {
    imageUrl: "",
    founded: "",
    projectSize: "",
    timeZone: "",
    description: "",
    teamName: "",
    teamSize: "",
    linkWebsite: "",
    saleEmail: "",
    skillDistribution: [],
    slogan: "",
    portfolios: [],
    awards: [],
    keyClients: [],
    skills: [],
  } as unknown as ICreateTeam;
});

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
        state.value = action.payload;
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
      })
      .addCase(saveTeam.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(resetTeam.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export default TeamSlice.reducer;
