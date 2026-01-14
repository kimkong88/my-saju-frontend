import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {},
    server: {},
    shared: {
        NODE_ENV: z.enum(["test", "development", "production"]).optional(),
        NEXT_PUBLIC_APP_URL: z.string(),
        NEXT_PUBLIC_API_BASE_URL: z.string(),
    },
    // You need to destructure all the keys manually
    runtimeEnv: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
});
