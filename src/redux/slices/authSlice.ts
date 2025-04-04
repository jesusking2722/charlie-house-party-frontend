import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthStateType {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state: AuthStateType,
      action: PayloadAction<{ token: string | null; user: User | null }>
    ) {
      state.isAuthenticated = action.payload.token ? true : false;
      state.user = action.payload.user;
    },
    setAuthenticated(
      state: AuthStateType,
      action: PayloadAction<{ token: string | null }>
    ) {
      state.isAuthenticated = action.payload.token ? true : false;
    },
    setAuthUser(
      state: AuthStateType,
      action: PayloadAction<{ user: User | null }>
    ) {
      state.user = action.payload.user;
    },
  },
});

export const { setAuth, setAuthenticated, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
