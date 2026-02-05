export type RelationshipType =
    | "romantic"
    | "family"
    | "friend"
    | "colleague"
    | "other";

export interface Friend {
    id: string;
    relationship: RelationshipType; // Backend uses "relationship" not "relationshipType"
    createdAt: string;
    updatedAt: string;

    // Populated friend data
    friend?: {
        id: string;
        code: string;
        fullName: string;
        identity: {
            code: string;
            title: string;
            element: string;
        };
        rarity?: {
            oneIn: number;
        };
        birthDate: string;
        gender?: "male" | "female";
    };

    // Daily compatibility score (included in response)
    dailyCompatibilityScore?: DailyCompatibilityScore;
}

export interface DailyCompatibilityScore {
    letterGrade: string; // e.g., "A+", "B", "C-"
    insight: string; // Brief daily insight text
    // Note: Backend doesn't return date field currently
}

export interface AddFriendData {
    code?: string; // User code (for adding by code)
    fullName?: string; // Optional, defaults to "Anonymous" for ghost users
    gender?: "male" | "female";
    birthDate?: string; // ISO format without timezone: YYYY-MM-DDTHH:mm:ss
    birthLocation?: string;
    birthTimezone?: string;
    currentLocation?: string;
    currentTimezone?: string;
    isTimeKnown?: boolean;
    relationship: RelationshipType; // Required
}

export interface UpdateFriendData {
    relationship: RelationshipType; // Backend expects "relationship" not "relationshipType"
    customLabel?: string;
}
