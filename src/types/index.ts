export type { ApiResponse, AuthResponse } from "./api";

export interface User {
  name: string | null;
  shortname: string | null;
  email: string | null;
  avatar: string | null;
  phone: string | null;
  phoneVerified: boolean;
  emailVerified: boolean;
  kycVerified: boolean;
  reviews: Review[] | null;
  createdAt: Date | null;
}

export interface Review {
  reviewer: User;
  rate: number;
  partyTitlte: string;
  partyType: string;
  description: string;
  createdAt: Date;
}
