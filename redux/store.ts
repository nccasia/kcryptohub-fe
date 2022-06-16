import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import TeamProfileReducer from "@/redux/teamProfileSlice";
import AwardsReducer from "@/redux/awardSlice";

import { SkillReducer } from "./skillSlice";
const reducer = {
  ProfileReducer,
  SkillReducer,
  TeamReducer,
  TeamProfileReducer,
  AwardsReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
