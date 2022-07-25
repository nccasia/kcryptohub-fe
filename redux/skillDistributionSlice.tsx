import { skillDisApi } from "@/api/skildis-api";
import { ISkillDisData } from "@/type/skill/skill.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getDataSkillDis = createAsyncThunk("getDataSkillDis", async () => {
  const data = await skillDisApi.getDataSkillDis();
  return data;
});

const initialState = {
  dataSkillDis: [] as ISkillDisData[],
  isLoaded: false,
};

export const skillDistributionSlice = createSlice({
  name: "dataSkillDis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataSkillDis.rejected, (state, action) => {
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
    builder.addCase(getDataSkillDis.fulfilled, (state, action) => {
      state.dataSkillDis = action.payload;
      state.isLoaded = true;
    });
  },
});

export const SkillDistributionReducer = skillDistributionSlice.reducer;
