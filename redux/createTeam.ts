import { ICreateTeam } from "@/type/createTeam/createTeam.type";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const createTeamSlice = createSlice({
  name: "createTeam",
  initialState,
  reducers: {
    postValue: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    setTeam: (state, action) => {
      state.value = action.payload;
    },

    deleteTeam: (state, action) => {
      state.value = state.value.filter(
        (team: ICreateTeam) => team.id !== action.payload.id
      );
    },
  },
});

export const { postValue, setTeam, deleteTeam } = createTeamSlice.actions;
export default createTeamSlice.reducer;
