import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Party } from "../../types";

interface PartyState {
  parties: Party[];
}

const initialState: PartyState = {
  parties: [],
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParty(
      state: PartyState,
      action: PayloadAction<{ parties: Party[] | [] }>
    ) {
      state.parties = action.payload.parties;
    },
    addNewParty(state: PartyState, action: PayloadAction<{ newParty: Party }>) {
      state.parties.unshift(action.payload.newParty);
    },
  },
});

export const { setParty, addNewParty } = partySlice.actions;
export default partySlice.reducer;
