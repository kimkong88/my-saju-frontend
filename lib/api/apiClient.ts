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
            const session = undefined; // TODO: add session

            const isFormData =
                typeof FormData !== "undefined" &&
                options.body instanceof FormData;

            // Build headers so that:
            // - We add Authorization when we have a session
            // - We DO NOT set Content-Type for FormData (browser will set boundary)
            // - We default to application/json only when not FormData and header not provided

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hasAccessToken = Boolean((session as any)?.accessToken);
            const callerHeaders = (options.headers || {}) as Record<
                string,
                string
            >;
            const callerProvidedContentType = Object.keys(callerHeaders)
                .map((h) => h.toLowerCase())
                .includes("content-type");

            const headers: Record<string, string> = {};
            if (hasAccessToken) {
                /* eslint-disable */
                headers["Authorization"] = `Bearer ${
                    (session as any).accessToken
                }`;
                /* eslint-enable */
            }
            // Copy over any caller-provided headers
            for (const [key, value] of Object.entries(callerHeaders)) {
                headers[key] = value as string;
            }
            // Set default content-type for non-FormData when not provided
            if (!isFormData && !callerProvidedContentType) {
                headers["Content-Type"] = "application/json";
            }

            const response = await fetch(url, {
                ...options,
                headers,
            });

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
