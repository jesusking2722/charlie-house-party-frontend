import { User } from ".";

export interface AuthResponse {
  token: string | null;
  user: User | null;
}

export interface UserResponse {
  user: User | null;
}

export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data: T;
}

export interface AllUsersResponse {
  users: User[];
}

export interface AiResponse {
  content: string;
}
