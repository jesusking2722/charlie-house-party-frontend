import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import partyReducer from "./slices/partySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    party: partyReducer,
  },
});

// Create typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for dispatch (optional but useful)
export const useAppDispatch = () => useDispatch<AppDispatch>();
