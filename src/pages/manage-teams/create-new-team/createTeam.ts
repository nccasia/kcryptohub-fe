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

    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue, postValue } = createTeamSlice.actions;
export default createTeamSlice.reducer;
