import { env } from "../env";

export const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const REPORTS_ENDPOINT = `${BASE_URL}/reports`;
export const USERS_ENDPOINT = `${BASE_URL}/users`;
export const ME_ENDPOINT = `${BASE_URL}/me`;
export const FRIENDS_ENDPOINT = `${BASE_URL}/friends`;
export const BLESSINGS_ENDPOINT = `${BASE_URL}/blessings`;
export const QUESTIONS_ENDPOINT = `${BASE_URL}/questions`;
export const REPORTS_TODAY_ENDPOINT = `${BASE_URL}/reports/today`;
export const REPORTS_TOMORROW_ENDPOINT = `${BASE_URL}/reports/tomorrow`;
export const REPORTS_14DAY_ENDPOINT = `${BASE_URL}/reports/14day`;
export const SUBSCRIPTIONS_ENDPOINT = `${BASE_URL}/subscriptions`;