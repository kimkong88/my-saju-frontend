"use server";

import { apiClient } from "@/lib/api/apiClient";
import { ME_ENDPOINT, QUESTIONS_ENDPOINT } from "@/lib/api/endpoints";
import type { MeOverviewResponse } from "@/types/me";

export async function getMeOverview(): Promise<MeOverviewResponse> {
    const response = await apiClient(ME_ENDPOINT);

    if (!response.ok) {
        throw new Error("failed_to_get_me_overview");
    }

    const data = await response.json();

    return data;
}

/**
 * Server action to request full report access
 * Returns the same structure as createPersonalReport (same flow)
 * Throws errors with status codes for 403/402 to be handled by UI
 */
export async function requestFullReport(): Promise<{ code: string }> {
    const response = await apiClient(ME_ENDPOINT, {
        method: "POST",
    });

    if (!response.ok) {
        // Handle error responses - include status code in error for UI handling
        let errorMessage: string;
        let statusCode = response.status;

        try {
            const errorData = await response.json();
            errorMessage =
                errorData.message ||
                errorData.error ||
                errorData.code ||
                "Unknown error";

            // If error message indicates account not found, treat as 403
            if (
                errorMessage === "account_not_found" ||
                errorMessage.includes("account")
            ) {
                statusCode = 403;
            }
        } catch {
            errorMessage = `Request failed with status ${response.status}`;
        }

        // Create error with status code for UI to handle 403/402
        const error = new Error(errorMessage) as Error & { status: number };
        error.status = statusCode;
        throw error;
    }

    return response.json();
}

export interface Question {
    title: string;
    description: string;
}

export type QuestionsStatus =
    | "pending"
    | "in_progress"
    | "completed"
    | "failed";

export interface QuestionsResponse {
    id: string; // Question ID (empty string if pending/not found)
    type: "personal" | "daily";
    status: QuestionsStatus;
    questions?: Question[]; // Only present when status is 'completed'
    expiresAt?: string; // ISO string - Only present when status is 'completed'
    error?: string; // Only present when status is 'failed'
}

/**
 * Get questions for a specific scope
 * Endpoint: GET /questions?scope=me
 */
export async function getQuestions(
    scope: string = "me"
): Promise<QuestionsResponse> {
    const response = await apiClient(`${QUESTIONS_ENDPOINT}?scope=${scope}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`failed_to_get_questions: ${response.status}`);
    }

    const data = await response.json();

    // Convert expiresAt Date to ISO string if present (handle both Date objects and ISO strings)
    if (data.expiresAt) {
        if (data.expiresAt instanceof Date) {
            data.expiresAt = data.expiresAt.toISOString();
        } else if (
            typeof data.expiresAt === "string" &&
            !data.expiresAt.includes("T")
        ) {
            // If it's a date string without time, ensure it's properly formatted
            data.expiresAt = new Date(data.expiresAt).toISOString();
        }
    }

    return data;
}
