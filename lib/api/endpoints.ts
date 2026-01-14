import { env } from "../env";

export const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const REPORTS_ENDPOINT = `${BASE_URL}/reports`;
