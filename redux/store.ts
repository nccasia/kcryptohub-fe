import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import { SkillReducer } from "./skillSlice";
import { MemberReducer } from "@/redux/memberSlice";
import TeamProfileReducer from "@/redux/teamProfileSlice";
import AwardsReducer from "@/redux/awardSlice";
import DashboardReducer from "@/redux/dashboardSlice";

const reducer = {
  ProfileReducer,
  SkillReducer,
  TeamReducer,
  TeamProfileReducer,
  AwardsReducer,
  DashboardReducer,
  MemberReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
