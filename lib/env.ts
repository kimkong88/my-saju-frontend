import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {},
    server: {
        AUTH_GOOGLE_ID: z.string(),
        AUTH_GOOGLE_SECRET: z.string(),
        AUTH_APPLE_CLIENT_ID: z.string(),
        AUTH_APPLE_TEAM_ID: z.string(),
        AUTH_APPLE_KEY_ID: z.string(),
        AUTH_APPLE_PRIVATE_KEY: z.string(),
        AUTH_SECRET: z.string(),
        AUTH_URL: z.string(),
    },
    shared: {
        NODE_ENV: z.enum(["test", "development", "production"]).optional(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_API_BASE_URL: z.string(),
    },
    // You need to destructure all the keys manually
    runtimeEnv: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_URL: process.env.AUTH_URL,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        AUTH_APPLE_CLIENT_ID: process.env.AUTH_APPLE_CLIENT_ID,
        AUTH_APPLE_TEAM_ID: process.env.AUTH_APPLE_TEAM_ID,
        AUTH_APPLE_KEY_ID: process.env.AUTH_APPLE_KEY_ID,
        AUTH_APPLE_PRIVATE_KEY: process.env.AUTH_APPLE_PRIVATE_KEY,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
});
