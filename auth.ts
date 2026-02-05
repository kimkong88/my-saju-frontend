import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "@/types/user";
import { env } from "@/lib/env";
import AppleProvider from "next-auth/providers/apple";
import { SignJWT, importPKCS8 } from "jose";

type AuthResponse = {
    user: User;
    tokens: {
        access: {
            token: string;
            expires: number;
        };
        refresh: {
            token: string;
            expires: number;
        };
    };
    action?: "sign_in" | "sign_up"; // Optional action field from backend
};

const expired = (unixTimestamp: number) => {
    if (!unixTimestamp) return true;
    // Determine if timestamp is in seconds (10 digits) or milliseconds (13 digits)
    const expiresAt =
        unixTimestamp > 1e12
            ? unixTimestamp // Already in milliseconds (13+ digits)
            : unixTimestamp * 1000; // Convert from seconds to milliseconds (10 digits)
    return expiresAt < Date.now();
};

// Mutex to prevent concurrent refresh attempts
let refreshMutex: Promise<JWT> | null = null;
let refreshMutexToken: string | null = null;

async function refreshToken(token: JWT): Promise<JWT> {
    // Ensure refreshToken exists before attempting refresh
    if (!token.refreshToken || typeof token.refreshToken !== "string") {
        console.error("[NextAuth] Refresh token is missing or invalid:", {
            hasRefreshToken: !!token.refreshToken,
            type: typeof token.refreshToken,
            refreshTokenLength: token.refreshToken?.length,
        });
        throw new Error("Refresh token is missing or invalid");
    }

    // Check if we're already refreshing with this exact token (prevent concurrent refreshes)
    const currentRefreshToken = token.refreshToken;
    if (refreshMutex && refreshMutexToken === currentRefreshToken) {
        console.log(
            "[NextAuth] Refresh already in progress, waiting for existing refresh..."
        );
        return refreshMutex;
    }

    // Create a new refresh promise
    const refreshPromise = (async (): Promise<JWT> => {
        try {
            // Debug: Log refresh token (first 20 chars only for security)
            console.log(
                "[NextAuth refreshToken] 🔄 Attempting token refresh..."
            );
            console.log("[NextAuth refreshToken] Request details:", {
                refreshTokenPreview:
                    currentRefreshToken.substring(0, 20) + "...",
                refreshTokenLength: currentRefreshToken.length,
                endpoint: `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            });

            const refreshResponse = await fetch(
                `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        refreshToken: currentRefreshToken,
                    }),
                }
            );

            console.log("[NextAuth refreshToken] Backend response:", {
                status: refreshResponse.status,
                statusText: refreshResponse.statusText,
                ok: refreshResponse.ok,
            });

            if (!refreshResponse.ok) {
                const errorText = await refreshResponse.text();
                console.error(
                    "[NextAuth refreshToken] ❌ Refresh token failed:",
                    {
                        status: refreshResponse.status,
                        statusText: refreshResponse.statusText,
                        error: errorText,
                        refreshTokenPreview:
                            currentRefreshToken.substring(0, 20) + "...",
                        refreshTokenLength: currentRefreshToken.length,
                    }
                );
                // Refresh token failed, throw error to trigger sign out
                throw new Error(
                    `Refresh token failed: ${refreshResponse.status} ${errorText}`
                );
            }

            const data: AuthResponse = await refreshResponse.json();
            console.log(
                "[NextAuth refreshToken] ✅ Refresh successful, updating tokens..."
            );

            // Update token with new tokens
            token.accessToken = data.tokens.access.token;
            token.accessTokenExpires = data.tokens.access.expires;
            token.refreshToken = data.tokens.refresh.token;
            token.refreshTokenExpires = data.tokens.refresh.expires;

            // Update accountId from user object if available (preserve existing if not in response)
            const accountIdValue = (
                data.user as User & { accountId?: string | null }
            )?.accountId;
            if (
                accountIdValue !== undefined &&
                accountIdValue !== null &&
                accountIdValue !== "null"
            ) {
                token.accountId = accountIdValue;
                console.log(
                    "[NextAuth refreshToken] AccountId updated:",
                    token.accountId
                );
            } else {
                console.log(
                    "[NextAuth refreshToken] AccountId not in response, keeping existing:",
                    token.accountId
                );
            }

            console.log("[NextAuth refreshToken] New tokens:", {
                accessTokenPreview: token.accessToken.substring(0, 20) + "...",
                refreshTokenPreview:
                    token.refreshToken.substring(0, 20) + "...",
                accessTokenExpires: token.accessTokenExpires,
                refreshTokenExpires: token.refreshTokenExpires,
            });

            return token;
        } catch (error) {
            console.error(
                "[NextAuth refreshToken] ❌ Error during refresh:",
                error
            );
            throw error;
        } finally {
            // Clear mutex when done
            if (refreshMutexToken === currentRefreshToken) {
                console.log("[NextAuth refreshToken] 🔓 Clearing mutex");
                refreshMutex = null;
                refreshMutexToken = null;
            }
        }
    })();

    // Store the mutex
    refreshMutex = refreshPromise;
    refreshMutexToken = currentRefreshToken;

    return refreshPromise;
}

async function createAppleClientSecret() {
    const now = Math.floor(Date.now() / 1000);
    const key = await importPKCS8(
        env.AUTH_APPLE_PRIVATE_KEY!.includes("\\n")
            ? env.AUTH_APPLE_PRIVATE_KEY!.replace(/\\n/g, "\n")
            : env.AUTH_APPLE_PRIVATE_KEY!,
        "ES256"
    );
    return await new SignJWT({})
        .setProtectedHeader({ alg: "ES256", kid: env.AUTH_APPLE_KEY_ID! })
        .setIssuer(env.AUTH_APPLE_TEAM_ID!)
        .setSubject(env.AUTH_APPLE_CLIENT_ID!)
        .setAudience("https://appleid.apple.com")
        .setIssuedAt(now)
        .setExpirationTime(now + 60 * 60 * 24 * 120)
        .sign(key);
}

// Note: Apple secret will be created when needed (async)

export const config = {
    providers: [
        Google({
            authorization: {
                params: {
                    scope: "openid email profile",
                    prompt: "consent",
                    access_type: "offline",
                },
            },
        }),
        // Only add Apple provider on server-side to avoid env var access on client
        ...(typeof window === "undefined"
            ? [
                  AppleProvider({
                      clientId: env.AUTH_APPLE_CLIENT_ID,
                      // @ts-expect-error - NextAuth v5 supports async clientSecret but types may not reflect it
                      clientSecret: createAppleClientSecret(),
                      authorization: {
                          params: {
                              scope: "email name",
                          },
                      },
                  }),
              ]
            : []),
        Credentials({
            name: "Credentials",
            credentials: {
                accessToken: { label: "Access Token", type: "text" },
                refreshToken: { label: "Refresh Token", type: "text" },
                accessTokenExpires: {
                    label: "Access Token Expires",
                    type: "text",
                },
                refreshTokenExpires: {
                    label: "Refresh Token Expires",
                    type: "text",
                },
                userId: { label: "User ID", type: "text" },
                accountId: { label: "Account ID", type: "text" },
            },
            async authorize(credentials) {
                if (
                    !credentials?.accessToken ||
                    !credentials?.refreshToken ||
                    !credentials?.userId
                ) {
                    return null;
                }

                // Return user data that will be stored in JWT
                // The tokens will be handled in the JWT callback
                return {
                    id: JSON.stringify({
                        accessToken: credentials.accessToken as string,
                        accessTokenExpires: Number(
                            credentials.accessTokenExpires
                        ),
                        refreshToken: credentials.refreshToken as string,
                        refreshTokenExpires: Number(
                            credentials.refreshTokenExpires
                        ),
                        userId: credentials.userId as string,
                        accountId: credentials.accountId || null,
                    }),
                };
            },
        }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true, // Trust host header in development
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allow relative URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allow same origin
            if (new URL(url).origin === baseUrl) return url;
            // Default to baseUrl
            return baseUrl;
        },
        async signIn({ user, account }) {
            // For OAuth providers, we need to exchange the token with our backend
            if (
                account?.provider === "google" ||
                account?.provider === "apple"
            ) {
                // Google provides id_token, Apple might provide id_token or access_token
                const token = account.id_token || account.access_token;

                if (!token) {
                    console.error(
                        `[NextAuth] No token found for provider ${account.provider}`,
                        { account }
                    );
                    return false;
                }

                try {
                    // Check if there's an existing session (user linking social account)
                    // If user is authenticated, send access token in header so backend treats it as "signup" (ghost user connection)
                    // If not authenticated, backend treats it as "signin" (normal social sign-in)
                    let accessToken: string | null = null;
                    try {
                        const currentSession = await auth();
                        if (
                            currentSession &&
                            "accessToken" in currentSession &&
                            currentSession.accessToken
                        ) {
                            accessToken = currentSession.accessToken as string;
                        }
                    } catch {
                        // No existing session, this is a new sign-in/sign-up
                    }

                    const requestBody: {
                        token: string;
                        provider: string;
                    } = {
                        token: token,
                        provider: account.provider,
                    };

                    // Prepare headers
                    const headers: HeadersInit = {
                        "Content-Type": "application/json",
                    };

                    // If user is already authenticated, send access token in Authorization header
                    // Backend will treat this as "signup" (ghost user connection)
                    if (accessToken) {
                        headers["Authorization"] = `Bearer ${accessToken}`;
                    }

                    const authResponse = await fetch(
                        `${env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate`,
                        {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(requestBody),
                        }
                    );

                    if (!authResponse.ok) {
                        const errorText = await authResponse.text();
                        console.error(
                            `[NextAuth] Backend auth failed: ${authResponse.status} ${authResponse.statusText}`,
                            { errorText, provider: account.provider }
                        );
                        return false;
                    }

                    const data: AuthResponse = await authResponse.json();

                    // Store only essential data to reduce cookie size
                    const userData = JSON.stringify({
                        accessToken: data.tokens.access.token,
                        accessTokenExpires: data.tokens.access.expires,
                        refreshToken: data.tokens.refresh.token,
                        refreshTokenExpires: data.tokens.refresh.expires,
                        userId: data.user.id, // Store only user ID, not full user object
                        accountId:
                            (data.user as User & { accountId?: string | null })
                                .accountId || null, // Store accountId if available
                    });

                    // Track action if available (for analytics)
                    if (data.action && account.provider) {
                        // TODO: Add analytics tracking here if needed
                        // await track(`${data.action}_with_${account.provider}`);
                    }

                    user.id = userData;
                    return true;
                } catch (error) {
                    console.error(
                        `[NextAuth] Error during sign-in for provider ${account.provider}:`,
                        error
                    );
                    return false;
                }
            }

            // For credentials provider, allow sign-in
            return true;
        },
        async jwt({ token, user, trigger }): Promise<JWT> {
            if (user?.id) {
                try {
                    const userData = JSON.parse(user.id);
                    // Validate required fields exist
                    if (
                        !userData.accessToken ||
                        !userData.refreshToken ||
                        !userData.userId
                    ) {
                        console.error(
                            "[NextAuth] Invalid token data in JWT callback:",
                            {
                                hasAccessToken: !!userData.accessToken,
                                hasRefreshToken: !!userData.refreshToken,
                                hasUserId: !!userData.userId,
                            }
                        );
                    // Invalid token data - return invalid token
                    return {
                        ...token,
                        accessToken: undefined,
                        accessTokenExpires: 0,
                        refreshToken: undefined,
                        refreshTokenExpires: 0,
                        userId: undefined,
                    };
                    }

                    // Debug: Log token storage (first 20 chars only)
                    console.log("[NextAuth] Storing tokens in JWT:", {
                        accessTokenPreview:
                            userData.accessToken.substring(0, 20) + "...",
                        refreshTokenPreview:
                            userData.refreshToken.substring(0, 20) + "...",
                        refreshTokenLength: userData.refreshToken.length,
                    });

                    token.accessToken = userData.accessToken;
                    token.accessTokenExpires = userData.accessTokenExpires;
                    token.refreshToken = userData.refreshToken;
                    token.refreshTokenExpires = userData.refreshTokenExpires;
                    token.userId = userData.userId; // Store only user ID
                    // Normalize accountId: convert string "null" to actual null, undefined to null
                    const accountIdValue = userData.accountId;
                    token.accountId =
                        accountIdValue === null ||
                        accountIdValue === undefined ||
                        accountIdValue === "null"
                            ? null
                            : accountIdValue;
                } catch (error) {
                    console.error(
                        "[NextAuth] Error parsing user data in JWT callback:",
                        error
                    );
                    return token;
                }
            }

            // If trigger is "update", fetch fresh user data from API
            if (trigger === "update" && token.accessToken && token.userId) {
                try {
                    const userResponse = await fetch(
                        `${env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${token.accessToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (userResponse.ok) {
                        const userData = (await userResponse.json()) as {
                            user?: User & { accountId?: string | null };
                        };
                        // Update accountId if available - normalize string "null" to actual null
                        const accountIdValue = userData.user?.accountId;
                        token.accountId =
                            accountIdValue === null ||
                            accountIdValue === undefined ||
                            accountIdValue === "null"
                                ? null
                                : accountIdValue;
                    }
                } catch {
                    // If fetch fails, keep existing token data
                }
            }

            // Check if access token is expired (like old project)
            if (
                token.accessTokenExpires &&
                expired(token.accessTokenExpires as number)
            ) {
                // If refresh token is also expired, return invalid token
                if (expired(token.refreshTokenExpires as number)) {
                    console.log(
                        "[NextAuth JWT] Both tokens expired, returning invalid token"
                    );
                    return {
                        ...token,
                        accessToken: undefined,
                        accessTokenExpires: 0,
                        refreshToken: undefined,
                        refreshTokenExpires: 0,
                        userId: undefined,
                    };
                }

                // Refresh token is still valid, attempt refresh
                try {
                    console.log(
                        "[NextAuth JWT] Access token expired, refreshing..."
                    );
                    return await refreshToken(token);
                } catch (error) {
                    // Refresh token failed - clear tokens and set error flag
                    // This prevents infinite loop where failed refresh keeps trying with deleted token
                    console.error(
                        "[NextAuth JWT] Refresh token failed, clearing tokens and setting error flag:",
                        error
                    );
                    return {
                        ...token,
                        accessToken: undefined,
                        accessTokenExpires: 0,
                        refreshToken: undefined, // Clear refresh token so it's not reused
                        refreshTokenExpires: 0,
                        userId: undefined,
                        error: "RefreshTokenError",
                    };
                }
            }

            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({
            session,
            token,
        }: any) {
            try {
                // Set error flag if refresh failed (following Auth.js guide pattern)
                session.error = token.error;

                // If token is invalid or expired, return null session to trigger sign out
                if (!token.accessToken || !token.userId) {
                    console.log(
                        "[NextAuth Session] Invalid token - returning null session to trigger sign out"
                    );
                    return {
                        ...session,
                        user: null,
                        accessToken: null,
                        userId: null,
                        error: token.error,
                    };
                }

                session.accessToken = token.accessToken as string;
                session.accessTokenExpires = token.accessTokenExpires as number;
                session.refreshToken = token.refreshToken as string;
                session.refreshTokenExpires =
                    token.refreshTokenExpires as number;
                session.userId = token.userId as string; // Store only user ID in session
                // Normalize accountId: convert string "null" to actual null, undefined to null
                const accountIdValue = token.accountId;
                session.accountId =
                    accountIdValue === null ||
                    accountIdValue === undefined ||
                    accountIdValue === "null"
                        ? null
                        : accountIdValue;

                return session;
            } catch {
                return { ...session, user: null, error: token.error };
            }
        },
    },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);

// Type declarations following Auth.js guide pattern
declare module "next-auth" {
    interface Session {
        error?: "RefreshTokenError";
        accessToken?: string;
        accessTokenExpires?: number;
        refreshToken?: string;
        refreshTokenExpires?: number;
        userId?: string;
        accountId?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        accessTokenExpires?: number;
        refreshToken?: string;
        refreshTokenExpires?: number;
        userId?: string;
        accountId?: string | null;
        error?: "RefreshTokenError";
    }
}
