import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Applicant, Party } from "../../types";

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
    addNewApplicant(
      state: PartyState,
      action: PayloadAction<{ selectedParty: Party; newApplicant: Applicant }>
    ) {
      const { selectedParty, newApplicant } = action.payload;
      const party = state.parties.find((p) => p._id === selectedParty._id);
      if (party) {
        party.applicants.unshift(newApplicant);
      }
    },
  },
});

export const { setParty, addNewParty, addNewApplicant } = partySlice.actions;
export default partySlice.reducer;
