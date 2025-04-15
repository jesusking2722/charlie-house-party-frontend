export type {
  ApiResponse,
  AuthResponse,
  AiResponse,
  PartyAllResponse,
} from "./api";

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
  notifications?: Notification[];
  stickers?: Sticker[];
}

export interface Review {
  reviewer: User;
  rate: number;
  partyTitle: string;
  partyType: string;
  description: string;
  createdAt: Date;
}

export interface Applicant {
  applier: User;
  applicant: string;
  appliedAt?: Date;
  stickers: Sticker[];
}

export interface Notification {
  _id?: string;
  type:
    | "party-opened"
    | "party-completed"
    | "party-cancelled"
    | "applicant-applied"
    | "applicant-accepted"
    | "applicant-rejected"
    | "sticker-added"
    | "sticker-bought"
    | "announcement";
  content: string;
  createdAt: Date;
  read: boolean;
  party: Party | null;
  sticker: Sticker | null;
  applicant: Applicant | null;
  user: User | null;
}

export interface Sticker {
  _id?: string;
  name: string;
  image: string;
  price: number;
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
  geo: {
    lat: number;
    lng: number;
  };
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
