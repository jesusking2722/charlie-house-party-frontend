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
  },
});

export const { setApplicants } = applicantSlice.actions;
export default applicantSlice.reducer;
