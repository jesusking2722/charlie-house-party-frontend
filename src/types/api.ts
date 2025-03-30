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

export interface AuthResponse {
  token: string | null;
  user: User | null;
}

export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data: T;
}
