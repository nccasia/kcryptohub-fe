import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "@/redux/profile-slice";

const reducer = { ProfileReducer };

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
