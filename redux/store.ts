import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profile-slice";
import TeamReducer from "@/redux/teamSlice";
const reducer = { ProfileReducer, TeamReducer };

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;