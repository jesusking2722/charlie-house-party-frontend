import { ApiResponse, AuthResponse, User } from "../../types";
import {
  EMAIL_REGISTER,
  GOOGLE_LOGIN,
  EMAIL_LOGIN,
  FETCH_ME,
  UPDATE_FIRST_ME,
  BASE_URL,
  UPDATE_ME,
  UPDATE_BANNER_ME,
} from "../apis";
import fetchInstance from "../fetchInstance";
import { UserResponse } from "../../types/api";

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

export const emailLogin = async (
  user: any
): Promise<ApiResponse<AuthResponse>> => {
  return await fetchInstance<ApiResponse<AuthResponse>>(EMAIL_LOGIN, {
    method: "POST",
    body: JSON.stringify({ user }),
  });
};

export const fetchMe = async (
  id: string
): Promise<ApiResponse<UserResponse>> => {
  return await fetchInstance<ApiResponse<UserResponse>>(FETCH_ME + id, {
    method: "GET",
  });
};

export const updateFirstMe = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<any> => {
  const response = await fetch(BASE_URL + UPDATE_FIRST_ME + id, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

export const updateBannerMe = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<any> => {
  const response = await fetch(UPDATE_BANNER_ME + id, {
    method: "PATCH",
    body: formData,
  });
  return response.json();
};

export const updateMe = async ({
  user,
}: {
  user: User;
}): Promise<ApiResponse<UserResponse>> => {
  return await fetchInstance<ApiResponse<UserResponse>>(UPDATE_ME, {
    method: "PATCH",
    body: JSON.stringify({ user }),
  });
};
