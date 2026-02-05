"use server";

import { apiClient } from "@/lib/api/apiClient";
import {
    REPORTS_ENDPOINT,
    REPORTS_TODAY_ENDPOINT,
    REPORTS_TOMORROW_ENDPOINT,
    REPORTS_14DAY_ENDPOINT,
} from "@/lib/api/endpoints";

import type {
    PersonalReport,
    CompatibilityReport,
    ReportInput,
} from "@/types/report";
import type { TodayForecastResponse } from "@/types/today";
import type { FourteenDayForecastResponse } from "@/types/forecast";

export type CreatePersonalReportData = {
    birthDateTime: Date | string; // Can be Date or ISO string (YYYY-MM-DDTHH:mm:ss without timezone)
    gender: "male" | "female";
    birthTimezone: string;
    isTimeKnown: boolean;
    birthLocation: string; // City of birth (required)
    currentLocation: string; // Current city (required)
};

export type CreateCompatibilityReportData = {
    person1: {
        code: string; // Person1's code (must exist)
    };
    person2: {
        code?: string; // Optional: if provided, fetch existing user; otherwise create new user
        fullName?: string; // Optional name for new user
        birthDateTime?: string; // ISO format: YYYY-MM-DDTHH:mm:ss (required if code not provided)
        gender?: "male" | "female"; // Required if code not provided
        birthLocation?: string; // Required if code not provided
        birthTimezone?: string; // Required if code not provided
        currentLocation?: string; // Required if code not provided
        currentTimezone?: string; // Required if code not provided
        isTimeKnown?: boolean; // Required if code not provided
    };
    isTeaser?: boolean; // Optional, defaults to true
};

export async function createPersonalReport(data: CreatePersonalReportData) {
    const response = await apiClient(`${REPORTS_ENDPOINT}/personal`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function createCompatibilityReport(
    data: CreateCompatibilityReportData
) {
    const response = await apiClient(`${REPORTS_ENDPOINT}/compatibility`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function getReport(
    code: string
): Promise<
    | { type: "personal"; data: PersonalReport; input?: ReportInput }
    | { type: "compatibility"; data: CompatibilityReport; input?: ReportInput }
> {
    const response = await apiClient(`${REPORTS_ENDPOINT}/${code}`);
    return response.json();
}

/**
 * Get compatibility report status by friend code (person2Code)
 * Endpoint: GET /reports/compatibility/:person2Code
 * Returns: { status: "completed", reportCode: string, report?: CompatibilityReport }
 *          OR { status: "pending" } if not found
 */
export async function getCompatibilityReportByFriendCode(
    person2Code: string
): Promise<{
    status: "completed" | "pending" | "in_progress";
    reportCode?: string;
    report?: CompatibilityReport;
}> {
    const response = await apiClient(
        `${REPORTS_ENDPOINT}/compatibility/${person2Code}`
    );

    if (!response.ok) {
        // If 404 or error, treat as pending
        return { status: "pending" };
    }

    const data = await response.json();

    // If report exists and is completed
    if (data.reportCode || data.code || data.id) {
        return {
            status: "completed",
            reportCode: data.reportCode || data.code || data.id,
            report: data.report || data,
        };
    }

    // If status is provided
    if (data.status) {
        return {
            status: data.status,
            reportCode: data.reportCode || data.code || data.id,
        };
    }

    // Default to pending
    return { status: "pending" };
}

/**
 * Get today's forecast report status and data
 * Endpoint: GET /reports/today
 * Returns: { status: "pending" | "in_progress" | "completed" | "failed", data?: TodayForecastData }
 */
export async function getTodayForecast(): Promise<TodayForecastResponse> {
    const response = await apiClient(REPORTS_TODAY_ENDPOINT);

    if (!response.ok) {
        throw new Error("failed_to_get_today_forecast");
    }

    const report = await response.json();

    // Transform report response to match TodayForecastResponse interface
    // Report structure: { id, type, status, code, data, input, userId, createdAt, updatedAt }
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        // Treat failed as pending so user can retry
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}

/**
 * Create/generate today's forecast report
 * Endpoint: POST /reports/today
 * Returns: { status: "pending" | "in_progress" | "completed", data?: TodayForecastData }
 */
export async function generateTodayForecast(): Promise<TodayForecastResponse> {
    const response = await apiClient(REPORTS_TODAY_ENDPOINT, {
        method: "POST",
    });

    // Handle error status codes
    if (!response.ok) {
        const error = new Error(
            "failed_to_generate_today_forecast"
        ) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    const report = await response.json();

    // Transform report response to match TodayForecastResponse interface
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}

/**
 * Get tomorrow's forecast report status and data
 * Endpoint: GET /reports/tomorrow
 * Returns: { status: "pending" | "in_progress" | "completed" | "failed", data?: TodayForecastData }
 */
export async function getTomorrowForecast(): Promise<TodayForecastResponse> {
    const response = await apiClient(REPORTS_TOMORROW_ENDPOINT);

    if (!response.ok) {
        throw new Error("failed_to_get_tomorrow_forecast");
    }

    const report = await response.json();

    // Transform report response to match TodayForecastResponse interface
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}

/**
 * Create/generate tomorrow's forecast report
 * Endpoint: POST /reports/tomorrow
 * Returns: { status: "pending" | "in_progress" | "completed", data?: TodayForecastData }
 */
export async function generateTomorrowForecast(): Promise<TodayForecastResponse> {
    const response = await apiClient(REPORTS_TOMORROW_ENDPOINT, {
        method: "POST",
    });

    // Handle error status codes
    if (!response.ok) {
        const error = new Error(
            "failed_to_generate_tomorrow_forecast"
        ) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    const report = await response.json();

    // Transform report response to match TodayForecastResponse interface
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}

/**
 * Get 14-day forecast report status and data
 * Endpoint: GET /reports/14day
 * Returns: { status: "pending" | "in_progress" | "completed" | "failed", data?: FourteenDayForecast }
 */
export async function getFourteenDayForecast(): Promise<FourteenDayForecastResponse> {
    const response = await apiClient(REPORTS_14DAY_ENDPOINT);

    if (!response.ok) {
        throw new Error("failed_to_get_14day_forecast");
    }

    const report = await response.json();

    // Transform report response to match FourteenDayForecastResponse interface
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}

/**
 * Create/generate 14-day forecast report
 * Endpoint: POST /reports/14day
 * Returns: { status: "pending" | "in_progress" | "completed", data?: FourteenDayForecast }
 */
export async function generateFourteenDayForecast(): Promise<FourteenDayForecastResponse> {
    const response = await apiClient(REPORTS_14DAY_ENDPOINT, {
        method: "POST",
    });

    // Handle error status codes
    if (!response.ok) {
        const error = new Error(
            "failed_to_generate_14day_forecast"
        ) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    const report = await response.json();

    // Transform report response to match FourteenDayForecastResponse interface
    if (report.status === "completed" && report.data) {
        return {
            status: "completed",
            data: report.data,
        };
    } else if (report.status === "failed") {
        return {
            status: "pending",
        };
    } else {
        return {
            status: report.status, // "pending" or "in_progress"
        };
    }
}
