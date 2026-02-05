"use server";

import { apiClient } from "@/lib/api/apiClient";
import { SUBSCRIPTIONS_ENDPOINT } from "@/lib/api/endpoints";


export interface SubscriptionStatus {
    isSubscribed: boolean;
    tier?: string; // e.g., "pro"
    expiresAt?: string; // ISO date string
}

/**
 * Get user's subscription status
 * Endpoint: GET /subscriptions
 * Returns: { isSubscribed: boolean, tier?: string, expiresAt?: string }
 */
export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
    const response = await apiClient(SUBSCRIPTIONS_ENDPOINT);

    if (!response.ok) {
        // If endpoint doesn't exist or returns error, default to not subscribed
        // This allows graceful degradation
        return {
            isSubscribed: false,
        };
    }

    const data = await response.json();
    
    // Ensure expiresAt is an ISO string if present
    if (data.expiresAt) {
        if (data.expiresAt instanceof Date) {
            data.expiresAt = data.expiresAt.toISOString();
        } else if (typeof data.expiresAt === 'string' && !data.expiresAt.includes('T')) {
            // If it's a date string without time, ensure it's properly formatted
            data.expiresAt = new Date(data.expiresAt).toISOString();
        }
    }
    
    return data;
}

/**
 * Subscribe user (adds 1 month of subscription for debugging)
 * Endpoint: POST /subscriptions
 * Returns: { isSubscribed: boolean, tier?: string, expiresAt?: string }
 */
export async function subscribe(): Promise<SubscriptionStatus> {
    const response = await apiClient(SUBSCRIPTIONS_ENDPOINT, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to subscribe: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Ensure expiresAt is an ISO string if present
    if (data.expiresAt) {
        if (data.expiresAt instanceof Date) {
            data.expiresAt = data.expiresAt.toISOString();
        } else if (typeof data.expiresAt === 'string' && !data.expiresAt.includes('T')) {
            data.expiresAt = new Date(data.expiresAt).toISOString();
        }
    }
    
    return data;
}
