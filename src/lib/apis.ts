import { BACKEND_BASE_URL } from "../constant";

export const BASE_URL = BACKEND_BASE_URL + "/api";

export const GOOGLE_LOGIN = "/auth/google-login";
export const EMAIL_REGISTER = "/auth/email-register";
export const EMAIL_LOGIN = "/auth/email-login";
export const FETCH_ME = "/auth/me/";
export const UPDATE_FIRST_ME = "/auth/me/first/";
export const UPDATE_ME = "/auth/me";
export const UPDATE_BANNER_ME = "/auth/me/banner/";
export const UPDATE_AVATAR_ME = "/auth/me/avatar/";
export const START_KYC = "/auth/kyc/start";
export const FETCH_KYC_DECISION = "/auth/kyc/decision";

// user apis
export const FETCH_ALL_USERS = "/user/all";

// ai apis
export const FETCH_AI_RESPONSE_CREATE_PARTY = "/ai/create-party";

// party apis
export const FETCH_ALL_PARTIES = "/party/all";
