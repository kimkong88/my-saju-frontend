"use server";

import { apiClient } from "@/lib/api/apiClient";
import { FRIENDS_ENDPOINT } from "@/lib/api/endpoints";
import type {
    Friend,
    AddFriendData,
    UpdateFriendData,
    DailyCompatibilityScore,
    RelationshipType,
} from "@/types/friend";

/**
 * Get all friends for the current user
 * Endpoint: GET /friends
 */
export async function getFriends(): Promise<Friend[]> {
    const response = await apiClient(FRIENDS_ENDPOINT, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`failed_to_get_friends: ${response.status}`);
    }

    return response.json();
}

/**
 * Add a friend
 * Endpoint: POST /friends
 * Can add by user code OR by birthdate (creates ghost user)
 */
export async function addFriend(data: AddFriendData): Promise<Friend> {
    const response = await apiClient(FRIENDS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        // Parse error response to get user-friendly message
        let errorMessage: string;
        try {
            const errorData = await response.json();
            errorMessage =
                errorData.message ||
                errorData.error ||
                errorData.code ||
                "Unknown error";
        } catch {
            errorMessage = `Request failed with status ${response.status}`;
        }

        // Create error with message and status for UI handling
        const error = new Error(errorMessage) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    return response.json();
}

/**
 * Update a friend's relationship type
 * Endpoint: PATCH /friends/:id
 */
export async function updateFriend(
    friendId: string,
    data: UpdateFriendData
): Promise<Friend> {
    // Ensure relationship is lowercase and validate it's one of the allowed values
    const relationshipLower = data.relationship.toLowerCase();
    const validRelationships: RelationshipType[] = [
        "friend",
        "family",
        "romantic",
        "colleague",
        "other",
    ];

    if (!validRelationships.includes(relationshipLower as RelationshipType)) {
        throw new Error(
            `Invalid relationship value: ${
                data.relationship
            }. Must be one of: ${validRelationships.join(", ")}`
        );
    }

    const sanitizedData: UpdateFriendData = {
        ...data,
        relationship: relationshipLower as RelationshipType,
    };

    const response = await apiClient(`${FRIENDS_ENDPOINT}/${friendId}`, {
        method: "PATCH",
        body: JSON.stringify(sanitizedData),
    });

    if (!response.ok) {
        // Parse error response to get user-friendly message
        let errorMessage: string;
        try {
            const errorData = await response.json();
            // Handle array of messages (validation errors)
            if (Array.isArray(errorData.message)) {
                errorMessage = errorData.message.join(". ");
            } else {
                errorMessage =
                    errorData.message ||
                    errorData.error ||
                    errorData.code ||
                    "Unknown error";
            }
        } catch {
            errorMessage = `Request failed with status ${response.status}`;
        }

        // Create error with message and status for UI handling
        const error = new Error(errorMessage) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    return response.json();
}

/**
 * Delete a friend
 * Endpoint: DELETE /friends/:id
 */
export async function deleteFriend(friendId: string): Promise<void> {
    const response = await apiClient(`${FRIENDS_ENDPOINT}/${friendId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`failed_to_delete_friend: ${response.status}`);
    }
}

/**
 * Get today's compatibility score for a friend
 * Endpoint: GET /friends/:id/compatibility
 */
export async function getDailyCompatibilityScore(
    friendId: string
): Promise<DailyCompatibilityScore> {
    const response = await apiClient(
        `${FRIENDS_ENDPOINT}/${friendId}/compatibility`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error(
            `failed_to_get_compatibility_score: ${response.status}`
        );
    }

    return response.json();
}
