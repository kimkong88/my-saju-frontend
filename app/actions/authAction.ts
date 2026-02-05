"use server";

import { signIn, signOut, auth } from "@/auth";

/**
 * Server action for signing in with credentials
 * This avoids importing auth.ts in client components which causes env var errors
 */
export async function signInWithCredentials(credentials: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
    refreshTokenExpires: string;
    userId: string;
    accountId?: string | null;
}) {
    // Build credentials object, only including accountId if it's not null/undefined
    const creds: Record<string, string> = {
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        accessTokenExpires: credentials.accessTokenExpires,
        refreshTokenExpires: credentials.refreshTokenExpires,
        userId: credentials.userId,
    };

    // Only add accountId if it's not null/undefined
    if (credentials.accountId != null) {
        creds.accountId = credentials.accountId;
    }

    return await signIn("credentials", {
        ...creds,
        redirect: false,
    });
}

/**
 * Server action for signing in with social providers
 */
export async function signInWithProvider(provider: "google" | "apple") {
    return await signIn(provider, {
        redirect: true,
        callbackUrl: "/me",
    });
}

/**
 * Server action for signing out
 */
export async function signOutUser() {
    console.log("[signOutUser] 🔴 Signing out user and redirecting to /...");
    try {
        const result = await signOut({
            redirect: true,
            redirectTo: "/",
        });
        console.log("[signOutUser] signOut result:", result);
        return result;
    } catch (error) {
        console.error("[signOutUser] ❌ Error during sign out:", error);
        throw error;
    }
}

/**
 * Force NextAuth to refresh the session by calling auth()
 * This triggers the jwt callback which will refresh expired access tokens
 *
 * Note: This might not always trigger jwt callback if JWT is cached.
 * For guaranteed refresh, use refreshTokenDirectly() instead.
 */
export async function refreshSession() {
    // Calling auth() will trigger jwt callback if token needs refresh
    const session = await auth();
    return session;
}

/**
 * Update the session to fetch fresh user data (including accountId)
 * This triggers the JWT callback with trigger: "update"
 */
export async function updateSession() {
    const session = await auth();
    // Trigger session update by calling auth() with update trigger
    // Note: In NextAuth v5, we need to use the update() method from useSession hook on client
    // For server-side, we can manually trigger by re-fetching user data
    return session;
}

/**
 * Get the current accountId from the session
 * Used when creating new profiles to preserve accountId
 */
export async function getCurrentAccountId(): Promise<string | null> {
    const session = await auth();
    return (session as { accountId?: string })?.accountId || null;
}

// Note: Refresh token failures are now handled in JWT callback (auth.ts)
// When refresh fails, JWT callback returns invalid token
// Session callback returns null session
// Client naturally redirects when session.user is null
// No need for error handlers here

/**
 * Get fresh session tokens - JWT callback will handle refresh automatically
 * According to Auth.js guide, refresh should ONLY happen in JWT callback
 * This function just returns current session tokens (after JWT callback refresh if needed)
 *
 * @deprecated Use auth() directly instead. This is kept for backward compatibility.
 */
export async function refreshTokenDirectly(): Promise<{
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
} | null> {
    try {
        // Just call auth() - JWT callback will handle refresh if needed
        // The mutex in auth.ts prevents concurrent refreshes
        const session = await auth();
        const sessionWithTokens = session as {
            accessToken?: string;
            accessTokenExpires?: number;
            refreshToken?: string;
            refreshTokenExpires?: number;
        };
        const accessToken = sessionWithTokens?.accessToken;
        const accessTokenExpires = sessionWithTokens?.accessTokenExpires;
        const refreshToken = sessionWithTokens?.refreshToken;
        const refreshTokenExpires = sessionWithTokens?.refreshTokenExpires;

        if (!accessToken || !refreshToken) {
            return null;
        }

        return {
            accessToken,
            accessTokenExpires: accessTokenExpires || 0,
            refreshToken,
            refreshTokenExpires: refreshTokenExpires || 0,
        };
    } catch (error) {
        console.error("Error getting session tokens:", error);
        return null;
    }
}
