"use server";

import { apiClient } from "@/lib/api/apiClient";
import { USERS_ENDPOINT } from "@/lib/api/endpoints";
import { CreateUserData, AuthResponse, User } from "@/types/user";


/**
 * Create a new user (used in sign-up flow - no auth required)
 * Uses regular apiClient since this can be called from unauthenticated contexts
 */
export async function createUser(data: CreateUserData): Promise<AuthResponse> {
    const response = await apiClient(`${USERS_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("failed_to_create_user");
    }

    return response.json();
}

/**
 * Switch to a different user profile
 * Endpoint: POST /users/switch
 * Returns new tokens for the switched user
 */
export async function switchUser(userId: string): Promise<AuthResponse> {
    const response = await apiClient(`${USERS_ENDPOINT}/switch`, {
        method: "POST",
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(
            `[switchUser] API error: ${response.status} ${response.statusText}`,
            errorText
        );
        throw new Error(`failed_to_switch_user: ${response.status}`);
    }

    return response.json();
}

/**
 * Get list of all users in the current account
 * Endpoint: GET /users (returns array of users for the accountId)
 * Returns 401 if user doesn't have accountId (no social connect)
 */
export async function getUsersList(): Promise<User[]> {
    // Use GET /users endpoint
    const response = await apiClient(`${USERS_ENDPOINT}`, {
        method: "GET",
    });

    // 401 means user doesn't have accountId - this is expected, not an error
    if (response.status === 401) {
        return [];
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error(
            `[getUsersList] API error: ${response.status} ${response.statusText}`,
            errorText
        );
        throw new Error(`failed_to_get_users_list: ${response.status}`);
    }

    const data = await response.json();

    // Handle both response formats: { users: [] } or direct array
    if (Array.isArray(data)) {
        return data;
    }
    if (data.users && Array.isArray(data.users)) {
        return data.users;
    }
    // If response format is unexpected, return empty array
    return [];
}

/**
 * Delete a user profile
 * Endpoint: DELETE /users/:userId
 * Returns new tokens for the primary user (always returns tokens after deletion)
 * Throws error if trying to delete primary user
 */
export async function deleteUser(userId: string): Promise<AuthResponse> {
    const response = await apiClient(`${USERS_ENDPOINT}/${userId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`failed_to_delete_user: ${response.status}`);
    }

    // Backend always returns tokens for primary user after deletion
    const data = await response.json();
    return data;
}

/**
 * Get user by code for compatibility checking
 * Endpoint: GET /users/code/:code
 * Returns limited user data needed for compatibility form (identity, rarity, birth data)
 */
export async function getUserByCode(code: string): Promise<{
    code: string;
    fullName?: string; // User's full name (may be "Anonymous")
    identity: {
        code: string;
        title: string;
        element: string;
    };
    rarity?: {
        oneIn: number;
    };
    birthDateTime: string; // ISO string
    gender: "male" | "female";
    birthTimezone: string;
    isTimeKnown: boolean;
    birthLocation?: string; // City of birth
    currentLocation?: string; // Current city
}> {
    const response = await apiClient(`${USERS_ENDPOINT}/${code}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(
            `[getUserByCode] API error: ${response.status} ${response.statusText}`,
            errorText
        );
        throw new Error(`failed_to_get_user_by_code: ${response.status}`);
    }

    return response.json();
}

/**
 * Update user profile information
 * Endpoint: PATCH /users/:userId
 * Updates birth time, birth city, and current city
 */
export async function updateUser(
    userId: string,
    data: Partial<{
        fullName: string;
        birthDate: string; // ISO format without timezone: YYYY-MM-DDTHH:mm:ss
        gender: "male" | "female";
        birthLocation: string;
        birthTimezone: string;
        currentLocation: string;
        currentTimezone: string;
        isTimeKnown: boolean;
    }>
): Promise<AuthResponse> {
    const response = await apiClient(`${USERS_ENDPOINT}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(
            `[updateUser] API error: ${response.status} ${response.statusText}`,
            errorText
        );
        throw new Error(`failed_to_update_user: ${response.status}`);
    }

    return response.json();
}