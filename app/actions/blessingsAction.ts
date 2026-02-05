"use server";

import { apiClient } from "@/lib/api/apiClient";
import { BLESSINGS_ENDPOINT } from "@/lib/api/endpoints";

export interface BlessingAvailability {
    availableBlessings: number;
    serverResetTime: string; // ISO string
}

export interface ActiveBlessing {
    id: string;
    emoji: string;
    name: string;
    description: string;
    message?: string;
    expiresAt: string; // ISO string
    createdAt: string; // ISO string
    sender: {
        id: string;
        code: string;
        fullName: string;
        isFriend?: boolean; // Whether the sender is already a friend
        identity: {
            code: string;
            title: string;
            element: string;
        };
        rarity: {
            oneIn: number;
        };
    };
}

/**
 * Check if user has availability to send a blessing today
 * Endpoint: GET /blessings/availability
 */
export async function checkBlessingAvailability(): Promise<BlessingAvailability> {
    const response = await apiClient(`${BLESSINGS_ENDPOINT}/availability`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(
            `failed_to_check_blessing_availability: ${response.status}`
        );
    }

    return response.json();
}

/**
 * Get active blessings received by the user
 * Endpoint: GET /blessings/active
 */
export async function getActiveBlessings(): Promise<ActiveBlessing[]> {
    const response = await apiClient(`${BLESSINGS_ENDPOINT}/active`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`failed_to_get_active_blessings: ${response.status}`);
    }

    return response.json();
}

export interface SendBlessingData {
    recipientCode: string;
    emoji: string;
    name: string;
    description: string;
    message?: string;
}

/**
 * Send a blessing to a friend
 * Endpoint: POST /blessings
 *
 * Possible errors:
 * - 400: blessing_already_sent_today (already sent today)
 * - 400: cannot_send_blessing_to_self (trying to send to self)
 * - 404: recipient_not_found (invalid recipient code)
 */
export async function sendBlessing(data: SendBlessingData): Promise<void> {
    const response = await apiClient(BLESSINGS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        // Parse error response to get user-friendly message
        let errorMessage: string;
        try {
            const errorData = await response.json();
            // Map backend error codes to user-friendly messages
            if (errorData.code === "blessing_already_sent_today") {
                errorMessage =
                    "You've already sent a blessing today. Check back tomorrow!";
            } else if (errorData.code === "cannot_send_blessing_to_self") {
                errorMessage = "You cannot send a blessing to yourself.";
            } else if (errorData.code === "recipient_not_found") {
                errorMessage =
                    "Recipient not found. Please check the user code.";
            } else {
                errorMessage =
                    errorData.message ||
                    errorData.error ||
                    errorData.code ||
                    "Failed to send blessing";
            }
        } catch {
            errorMessage = `Request failed with status ${response.status}`;
        }

        // Create error with message and status for UI handling
        const error = new Error(errorMessage) as Error & { status: number };
        error.status = response.status;
        throw error;
    }
}

export interface Blessing {
    id: string;
    emoji: string;
    name: string;
    description: string;
    message?: string;
    expiresAt: string; // ISO string
    createdAt: string; // ISO string
    sender: {
        id: string;
        code: string;
        fullName: string;
        identity: {
            code: string;
            title: string;
            element: string;
        };
        rarity: {
            oneIn: number;
        };
    };
}

export interface BlessingsResponse {
    blessings: Blessing[];
    isSubscribed: boolean;
    activeBlessingsCount: number;
    totalBlessingsCount: number;
}

/**
 * Get all blessings received by the user
 * Endpoint: GET /blessings
 * Returns: blessings array, subscription status, and counts
 */
export async function getBlessings(): Promise<BlessingsResponse> {
    const response = await apiClient(BLESSINGS_ENDPOINT, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`failed_to_get_blessings: ${response.status}`);
    }

    return response.json();
}
