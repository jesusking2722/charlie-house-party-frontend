import { ApiResponse, AuthResponse } from "../../types";
import { EMAIL_REGISTER, GOOGLE_LOGIN } from "../apis";
import fetchInstance from "../fetchInstance";

export const googleLogin = async (
  code: string
): Promise<ApiResponse<AuthResponse>> => {
  return await fetchInstance<ApiResponse<AuthResponse>>(GOOGLE_LOGIN, {
    method: "POST",
    body: JSON.stringify({ code }),
  });
};

export const emailRegister = async (
  user: any
): Promise<ApiResponse<AuthResponse>> => {
  return await fetchInstance<ApiResponse<AuthResponse>>(EMAIL_REGISTER, {
    method: "POST",
    body: JSON.stringify({ user }),
  });
};
