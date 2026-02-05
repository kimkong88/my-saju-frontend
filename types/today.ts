// Today Forecast Types

export interface TodayElementRelationship {
    myElement: string;
    myElementEmoji: string;
    todayElement: string;
    todayElementEmoji: string;
    meaning: string;
}

export interface TodayDailyBranch {
    character: string;
    animal: string;
    emoji: string;
    meaning: string;
}

export interface TodayActiveTenGod {
    name: string;
    technicalName: string;
    emoji: string;
    source: "natal" | "luck" | "transit";
    pillar: string; // Can be comma-separated for multiple pillars: "Year, Month"
    category: "output" | "wealth" | "power" | "resource" | "friend";
    strength: "single" | "amplified";
    occurrenceCount: number;
}

export interface TodayReading {
    paragraphs: string[];
    technicalBasis: string[];
}

export interface TodayGoodThing {
    title: string;
    description: string;
    emoji: string;
    technicalBasis?: string[];
}

export interface TodayChallenge {
    title: string;
    description: string;
    emoji: string;
    whatToDo: string;
    technicalBasis?: string[];
}

export interface TodaySpecialPattern {
    title: string;
    description: string;
    rarity: string;
    emoji: string;
}

export interface TodayForecastData {
    elementRelationship: TodayElementRelationship;
    dailyBranch?: TodayDailyBranch;
    activeTenGods: TodayActiveTenGod[];
    reading: TodayReading;
    theme: string;
    subheading: string;
    goodThings: TodayGoodThing[];
    challenges: TodayChallenge[];
    specialPatterns: TodaySpecialPattern[];
}

export type TodayForecastStatus = "pending" | "in_progress" | "completed" | "failed";

export interface TodayForecastResponse {
    status: TodayForecastStatus;
    data?: TodayForecastData; // Only present when status is "completed"
}
