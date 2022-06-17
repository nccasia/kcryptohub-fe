import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import { SkillReducer } from "./skillSlice";
import { MemberReducer } from "@/redux/memberSlice";
import TeamProfileReducer from "@/redux/teamProfileSlice";

const reducer = { TeamProfileReducer, ProfileReducer, TeamReducer, SkillReducer, MemberReducer };

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
