import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Applicant } from "../../types";

interface ApplicantsState {
  applicants: Applicant[];
}

const initialApplicantsState: ApplicantsState = {
  applicants: [],
};

const applicantSlice = createSlice({
  name: "applicants",
  initialState: initialApplicantsState,
  reducers: {
    setApplicants(
      state: ApplicantsState,
      action: PayloadAction<{ applicants: Applicant[] }>
    ) {
      state.applicants = action.payload.applicants;
    },
    addNewApplicant(
      state: ApplicantsState,
      action: PayloadAction<{ newApplicant: Applicant }>
    ) {
      state.applicants.unshift(action.payload.newApplicant);
    },
  },
});

export const { setApplicants, addNewApplicant } = applicantSlice.actions;
export default applicantSlice.reducer;
