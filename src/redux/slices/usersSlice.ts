import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<{ users: User[] }>) {
      state.users = action.payload.users;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
