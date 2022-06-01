import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import { SkillReducer } from "./skillSlice";
const reducer = { ProfileReducer, TeamReducer, SkillReducer };

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
