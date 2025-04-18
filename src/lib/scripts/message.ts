import { ApiResponse, Message } from "../../types";
import { MessageResponse } from "../../types/api";
import {
  FETCH_ALL_MESSAGES,
  FETCH_SELECTED_MESSAGES,
  UPDATE_MESSAGES_READ,
} from "../apis";
import fetchInstance from "../fetchInstance";

export const fetchAllMessages = async (
  userId: string
): Promise<ApiResponse<MessageResponse>> => {
  return await fetchInstance<ApiResponse<MessageResponse>>(
    FETCH_ALL_MESSAGES + userId,
    {
      method: "GET",
    }
  );
};

export const fetchSelectedMessages = async (
  userId: string,
  contacterId: string
): Promise<ApiResponse<MessageResponse>> => {
  return await fetchInstance<ApiResponse<MessageResponse>>(
    FETCH_SELECTED_MESSAGES + `${userId}/${contacterId}`,
    {
      method: "GET",
    }
  );
};

export const updateMessagesRead = async (
  messages: Message[]
): Promise<ApiResponse<MessageResponse>> => {
  return await fetchInstance<ApiResponse<MessageResponse>>(
    UPDATE_MESSAGES_READ,
    {
      method: "PATCH",
      body: JSON.stringify({ messages }),
    }
  );
};
