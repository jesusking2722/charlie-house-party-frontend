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
    addNewApplicantToSelectedParty(
      state: PartyState,
      action: PayloadAction<{
        selectedPartyId: string;
        newApplicant: Applicant;
      }>
    ) {
      const { selectedPartyId, newApplicant } = action.payload;
      const party = state.parties.find((p) => p._id === selectedPartyId);
      if (party) {
        party.applicants.unshift(newApplicant);
      }
    },
  },
});

export const { setParty, addNewParty, addNewApplicantToSelectedParty } =
  partySlice.actions;
export default partySlice.reducer;
