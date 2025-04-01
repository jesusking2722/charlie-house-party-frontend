export type { ApiResponse, AuthResponse } from "./api";

export interface User {
    name: string | null;
    email: string | null;
    password: string;
    phone: string | null;
    phoneVerified: boolean;
    emailVerified: boolean;
    kycVerified: boolean;
    createdAt: Date | null;
  }
  