import { AiResponse, ApiResponse } from "../../types";
import { FETCH_AI_RESPONSE_CREATE_PARTY } from "../apis";
import fetchInstance from "../fetchInstance";

export const fetchAiResponse = async (
  content: string
): Promise<ApiResponse<AiResponse>> => {
  return await fetchInstance<ApiResponse<AiResponse>>(
    FETCH_AI_RESPONSE_CREATE_PARTY,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    }
  );
};
