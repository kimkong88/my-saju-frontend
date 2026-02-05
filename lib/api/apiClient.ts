import { auth } from "@/auth";

interface RetryConfig {
    maxRetries?: number;
    retryDelay?: number;
    retryOn?: number[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000, // 1 second
    retryOn: [408, 429, 500, 502, 503, 504], // Timeout, Rate limit, Server errors
};

function shouldRetry(status: number, retryOn: number[]): boolean {
    return retryOn.includes(status);
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiClient(
    url: string,
    options: RequestInit = {},
    retryConfig: RetryConfig = {}
) {
    const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= config.maxRetries!; attempt++) {
        try {
            // Get session - this will trigger jwt callback if token needs refresh
            // According to Auth.js guide, refresh should ONLY happen in JWT callback
            // The mutex in auth.ts prevents concurrent refreshes
            const session = await auth();
            const sessionWithTokens = session as {
                accessToken?: string;
            } | null;

            // Build headers - only add Authorization if we have a valid token
            const headers: Record<string, string> = {
                ...(options.headers as Record<string, string>),
                "Content-Type": "application/json",
            };

            // Only add Authorization header if we have a valid access token
            if (sessionWithTokens?.accessToken) {
                headers.Authorization = `Bearer ${sessionWithTokens.accessToken}`;
            }

            const response = await fetch(url, {
                ...options,
                headers,
            });

            // If we get 401, the token might be expired
            // JWT callback will handle refresh automatically when auth() is called
            // If refresh fails, JWT callback returns invalid token, session returns null
            // In that case, we just return the 401 response (no retry)
            // Client will see null session and redirect naturally

            // If response is ok or not retryable, return it
            if (response.ok || !shouldRetry(response.status, config.retryOn!)) {
                return response;
            }

            // If this is the last attempt, return the response
            if (attempt === config.maxRetries) {
                return response;
            }

            // Wait before retrying with exponential backoff
            await delay(config.retryDelay! * (attempt + 1));
        } catch (error) {
            lastError = error as Error;

            // If this is the last attempt, throw the error
            if (attempt === config.maxRetries) {
                throw lastError;
            }

            // Wait before retrying with exponential backoff
            await delay(config.retryDelay! * (attempt + 1));
        }
    }

    // This should never be reached, but just in case
    if (lastError) {
        throw lastError;
    }

    throw new Error("Unexpected error in apiClient retry logic");
}
