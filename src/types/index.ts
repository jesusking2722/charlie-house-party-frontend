export type { ApiResponse, AuthResponse, AiResponse } from "./api";

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

export type PartyType = "birthday" | "common" | "wedding" | "corporate";

export interface Party {
  _id?: string;
  type: PartyType | string;
  title: string;
  description: string;
  openingAt: Date;
  country: string | null;
  address: string | null;
  region: string | null;
  creator: User | null;
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

export interface Geo {
  lat: any;
  lng: any;
}
