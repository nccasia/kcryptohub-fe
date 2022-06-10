import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profileSlice";
import TeamReducer from "@/redux/teamSlice";
import TeamProfileReducer from "@/redux/teamProfileSlice";

import { listTeamsReducer } from "./listteamsSlice";
const reducer = {
  ProfileReducer,
  listTeamsReducer,
  TeamReducer,
  TeamProfileReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
