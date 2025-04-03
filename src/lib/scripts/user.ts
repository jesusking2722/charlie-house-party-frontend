import { ApiResponse } from "../../types";
import { AllUsersResponse } from "../../types/api";
import { FETCH_ALL_USERS } from "../apis";
import fetchInstance from "../fetchInstance";

export const fetchAllUsers = async (): Promise<
  ApiResponse<AllUsersResponse>
> => {
  return await fetchInstance<ApiResponse<AllUsersResponse>>(FETCH_ALL_USERS, {
    method: "GET",
  });
};
