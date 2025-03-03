import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import userDetailsReducer from "./userDetailsSlice"
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    userDetail: userDetailsReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
