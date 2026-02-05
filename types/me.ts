import type { SpecialTrait } from "./report";

export interface LuckCycleRemainingTime {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
}

export interface CurrentLuckCycle {
    emoji: string;
    title: string;
    description: string;
    expireAt: string; // ISO timestamp in user's current timezone
    technicalBasis: string[];
}

export interface NextLuckCycle {
    emoji: string;
    title: string;
    description: string;
    technicalBasis: string[];
}

export interface LuckCycles {
    current: CurrentLuckCycle;
    next: NextLuckCycle;
}

export interface MeOverviewResponse {
    user: {
        id: string;
        code: string; // User code for sharing compatibility links
        fullName: string;
        birthDate: string; // ISO string: "1988-06-11T20:00:00.000Z"
        gender?: "male" | "female";
        birthLocation: string;
        birthTimezone: string;
        currentLocation: string;
        currentTimezone: string;
        isTimeKnown: boolean;
        accountId?: string | null; // Account ID if user has connected social account
    };
    identity: {
        code: string;
        title: string;
        element: string;
        polarity: "Yin" | "Yang";
    };
    rarity: {
        oneIn: number;
        description?: string;
    };
    specialTraits: SpecialTrait[];
    luckCycles?: LuckCycles;
    whoYouAre?: {
        element: string; // Day Master element, e.g., "Fire-I"
        emoji: string; // Element emoji
        paragraphs: string[]; // Array of paragraphs
    };
}

