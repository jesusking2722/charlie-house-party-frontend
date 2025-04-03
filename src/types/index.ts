export type { ApiResponse, AuthResponse } from "./api";

export interface User {
  _id?: string;
  name: string | null;
  shortname: string | null;
  email: string | null;
  avatar: string | null;
  banner?: string;
  phone: string | null;
  phoneVerified: boolean;
  emailVerified: boolean;
  kycVerified: boolean;
  reviews: Review[] | null;
  createdAt: Date | null;
  membership?: "premium" | "free" | null;
  membershipPeriod?: 0 | 1 | 3 | 6 | 12;
  country?: string;
  region?: string;
  title?: string;
  about?: string;
  rate?: number;
  totalCompleted?: number;
  kyc?: Kyc;
}

export interface Review {
  reviewer: User;
  rate: number;
  partyTitlte: string;
  partyType: string;
  description: string;
  createdAt: Date;
}

export interface Applicant {
  applier: User;
  applicant: string;
  appliedAt: Date;
}

export interface Party {
  id: string;
  type: "birthday" | "common" | "wedding" | "corporate";
  title: string;
  description: string;
  openingAt: Date;
  country: string;
  region: string;
  address: string;
  creator: User;
  applicants: Applicant[];
  createdAt: Date;
}

export interface Kyc {
  sessionId: string;
  sessionNumber: number;
  sessionToken: string;
  vendorData: string;
  status:
    | "Not Started"
    | "In Progress"
    | "Completed"
    | "Approved"
    | "Declined"
    | "Expired"
    | "Abandoned";
  url: string;
}
