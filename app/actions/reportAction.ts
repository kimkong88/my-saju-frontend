import { apiClient } from "@/lib/api/apiClient";
import { REPORTS_ENDPOINT } from "@/lib/api/endpoints";
import type {
    PersonalReport,
    CompatibilityReport,
    ReportInput,
} from "@/types/report";

export type CreatePersonalReportData = {
    birthDateTime: Date; // DTO expects Date, will be serialized to ISO string
    gender: "male" | "female";
    birthTimezone: string;
    isTimeKnown: boolean;
};

export type CreateCompatibilityReportData = {
    person1: CreatePersonalReportData;
    person2: CreatePersonalReportData;
    isTeaser?: boolean;
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
