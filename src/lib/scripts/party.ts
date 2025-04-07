import fetchInstance from "../fetchInstance";
import {ApiResponse, PartyAllResponse} from "../../types";
import {FETCH_ALL_PARTIES} from "../apis";

export const fetchAllParties = async (): Promise<ApiResponse<PartyAllResponse>> => {
    return await fetchInstance<ApiResponse<PartyAllResponse>>(FETCH_ALL_PARTIES, {
        method: "GET",
    });
}
