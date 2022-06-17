import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import TeamProfileReducer from "@/redux/teamProfileSlice";
import AwardsReducer from "@/redux/awardSlice";
import DashboardReducer from "@/redux/dashboardSlice";

import { SkillReducer } from "./skillSlice";
const reducer = {
  ProfileReducer,
  SkillReducer,
  TeamReducer,
  TeamProfileReducer,
  AwardsReducer,
  DashboardReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
