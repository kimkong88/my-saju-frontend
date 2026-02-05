// Forecast Types

export interface TomorrowForecast {
    date: string; // ISO date for tomorrow
    theme: {
        title: string;
        description: string;
        trend: "rising" | "falling" | "stable";
        dominantElement: "fire" | "earth" | "metal" | "water" | "wood";
    };
    energy: {
        overallScore: number; // 1-10
        categories: Array<{
            name: string;
            score: number;
            overview: string;
        }>;
    };
    specialEvents: Array<{
        name: string;
        emoji: string;
        description: string;
        rarity: string;
        timeWindow?: string;
    }>;
}

// Response type for 14-day forecast API
export type FourteenDayForecastStatus = "pending" | "in_progress" | "completed" | "failed";

export interface FourteenDayForecastResponse {
    status: FourteenDayForecastStatus;
    data?: FourteenDayForecast;
    isSubscribed?: boolean; // User's subscription status
}

// New backend response structure for 14-day forecast
export interface FourteenDayForecast {
    // 1. DOMINANT DATA - Single most frequent/redundant data group across all 14 days
    dominantData: {
        // Single most frequent monthly element (only 1 item, unless month boundary is crossed)
        monthlyElements: Array<{
            element: string; // Element-YinYang format, e.g., "WOOD-O"
            emoji: string; // e.g., "🌳"
            percentage: number; // % of days this element appears (usually 100% if no month boundary)
        }>;
        // Single most dominant Ten God GROUP (combination that appears most frequently)
        // Example: If [A,B,C] appears 10 times and [A,B,D] appears 4 times, shows [A,B,C]
        activeTenGods: Array<{
            tenGod: {
                name: string; // User-friendly name, e.g., "Sharp Expression"
                technicalName: string; // Technical BaZi name, e.g., "Shang Guan"
                emoji: string; // e.g., "✍️"
                source: "natal" | "transit" | "luck";
                pillar: string; // "Year" | "Month" | "Hour" | "Annual" | "Monthly" | "Luck Era" | "Year, Month"
                category: "output" | "wealth" | "power" | "resource" | "friend" | null;
                strength: "single" | "amplified" | "dominant" | "extreme";
            };
            occurrenceCount: number; // How many days this GROUP appears (1-14)
            percentage: number; // % of 14 days (e.g., 100 for 14 days)
        }>; // All Ten Gods from the same dominant group
        // Single most dominant pattern GROUP (combination that appears most frequently)
        activePatterns?: Array<{
            pattern: string; // Pattern name, e.g., "Trinity Harmony Day"
            occurrenceCount: number; // How many days this GROUP appears
            percentage: number; // % of 14 days
        }>; // All patterns from the same dominant group (if any)
    };
    // 2. PHASE ANALYSIS - LLM-generated insights for 3 phases
    phases: Array<{
        days: string; // "Day 1-5"
        theme: string; // Theme title (2-4 words), e.g., "Building Momentum"
        overview: string; // Brief overview text (max 50 words)
        focusAreas: string[]; // Max 4 actionable items
    }>; // Exactly 3 phases: Day 1-5, Day 6-10, Day 11-14
    // 3. CALENDAR - Daily breakdown for 14 days
    calendar: Array<{
        date: string; // "YYYY-MM-DD"
        element: string; // Daily element, e.g., "WOOD-O"
        elementEmoji: string; // e.g., "🌳"
        animal: string; // Daily branch animal, e.g., "Horse"
        animalEmoji: string; // e.g., "🐴"
        isPeak: boolean; // Top ~25% days by overall score (typically 3-4 days)
        isWorst?: boolean; // Bottom ~25% days by overall score (typically 3-4 days)
    }>; // Exactly 14 items, one per day
    // 4. BEST DAYS - Top 2 per category
    bestDays: {
        career?: Array<{
            date: string; // "YYYY-MM-DD"
            score: number; // 0-100
            reason: string; // Brief explanation without BaZi terms
        }>; // Up to 2 items
        relationship?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        creativity?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        wealth?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        health?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        rest?: Array<{
            date: string;
            score: number;
            reason: string;
        }>; // rest = 100 - overall
    };
    // 5. WORST DAYS - Bottom 2 per category
    worstDays: {
        career?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        relationship?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        creativity?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        wealth?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        health?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
        rest?: Array<{
            date: string;
            score: number;
            reason: string;
        }>;
    };
}

// Legacy interface - keeping for backward compatibility during migration
export interface MonthlyForecast {
    period: string; // "Next 14 Days" or "Jan 15 - Jan 29, 2025"
    startDate: string; // ISO date - start of 14-day window
    endDate: string; // ISO date - end of 14-day window
    myElement?: string; // User's natal element (e.g., "FIRE-I")
    myElementEmoji?: string; // User's element emoji
    theme: {
        title: string;
        description: string;
        dominantElement?: string; // "fire" | "earth" | "metal" | "water" | "wood"
    };
    journey?: {
        act1: {
            days: string; // "Days 1-5"
            title: string;
            description: string;
            focus: string[];
        };
        act2: {
            days: string; // "Days 6-10"
            title: string;
            description: string;
            focus: string[];
        };
        act3: {
            days: string; // "Days 11-14"
            title: string;
            description: string;
            focus: string[];
        };
    };
    peakActionDays?: Array<{
        date: string; // "Jan 20"
        title: string;
        action: string; // What to do
        reason: string; // Why it's optimal
        category: "career" | "relationships" | "creativity" | "wealth" | "health" | "general";
        intensity: "high" | "medium"; // Energy intensity
    }>;
    bestDaysFor?: {
        career?: string[]; // Array of dates
        relationships?: string[];
        creativity?: string[];
        wealth?: string[];
        health?: string[];
        rest?: string[];
    };
    monthlyContext?: Array<{
        startDate: string; // "Jan 15"
        endDate: string; // "Jan 21" or "Jan 28"
        element: string; // "WOOD-O"
        elementEmoji: string;
        tenGods?: Array<{
            name: string; // "Sharp Expression", "Stable Income", etc.
            technicalName: string; // "Shang Guan", "Zheng Cai", etc.
            emoji: string;
            category: string; // "output", "wealth", "friend", etc.
        }>;
    }>;
    dailyCalendar?: Array<{
        date: string; // "Jan 15" or "Jan 15, 2025"
        dayOfWeek?: string; // "Mon", "Tue", etc.
        element: string; // "FIRE-I", "WOOD-O", etc. (daily)
        elementEmoji: string;
        animal: string; // "Horse", "Goat", etc. (daily)
        animalEmoji: string;
        isPeak?: boolean; // If this is a peak day
    }>;
    elementPeriods?: Array<{
        startDate: string; // "Jan 15"
        endDate: string; // "Jan 22"
        element: string; // "FIRE-I", "WOOD-O", etc.
        elementEmoji: string;
        description: string;
    }>; // Element transitions over the 14 days
    weeks: Array<{
        weekNumber: number;
        startDate: string;
        endDate: string;
        theme: string;
        opportunities?: string[]; // What to focus on
        challenges?: string[]; // What to watch for
        keyEvents?: string[]; // Milestones
    }>;
    keyDates: Array<{
        date: string;
        title: string;
        type: "peak" | "transition" | "warning";
        description: string;
    }>;
    dailyScores?: Array<{
        date: string;
        score: number; // 1-10
        element: string;
    }>; // Premium only
}

export interface YearlyForecast {
    period: string; // "Next 12 Months" or "Jan 2025 - Jan 2026"
    startDate: string; // ISO date - start of 12-month window
    endDate: string; // ISO date - end of 12-month window
    theme: {
        title: string;
        description: string;
        overallEnergy: number;
        dominantElement: string;
    };
    months: Array<{
        month: string; // "January"
        energy: number;
        theme: string;
        bestFor: string[];
        avoid: string[];
        keyDates: string[];
    }>;
    majorTransitions: Array<{
        date: string;
        title: string;
        description: string;
        impact: "high" | "medium" | "low";
    }>;
    quarterlySummary: Array<{
        quarter: number; // 1-4
        theme: string;
        energy: number;
        focus: string;
    }>;
}

export interface LuckPillar {
    pillar: {
        element: string;
        stem: string;
        branch: string;
    };
    startYear: number;
    endYear: number;
    influence: {
        career: string;
        wealth: string;
        relationships: string;
        health: string;
    };
    description: string;
}

export interface StatShift {
    category: string; // "Logic", "Creativity", "Wealth", "Health", etc.
    currentValue: number; // -20 to +20
    newValue: number; // -20 to +20
    change: number; // newValue - currentValue
}

export interface TenYearCycleData {
    startYear: number;
    endYear: number;
    theme?: string; // Optional - only available after report is generated
    cinematicName?: string; // "The Architect's Era", "The Great Polishing", etc.
    isGenerated?: boolean; // Whether this cycle's report has been generated
    hook?: string; // Single sentence summarizing the vibe
    overallEnergy: number;
    phase?: "early" | "mid" | "late";
    currentYear?: number;
    luckPillars: LuckPillar[];
    statShift?: StatShift[]; // Before vs After personality stats
    elementalSuperpower?: {
        name: string; // "Innovation", "Strategic Planning", etc.
        description: string;
        action: string; // "Your superpower is Innovation. In the previous decade, you had to follow rules; in this one, you win by breaking them."
    };
    theTrap?: {
        name: string; // "The Earth Trap", "The Fire Trap", etc.
        description: string; // What makes them feel trapped
        wayOut: string; // How to escape the trap
    };
    bestFor?: string[]; // Actionable: "Starting a business", "Career transitions", etc.
    avoidDuring?: string[]; // Actionable: "Risky investments", "Major life changes", etc.
    transitions: Array<{
        year: number;
        month?: number;
        type: "cycle_start" | "cycle_end" | "pillar_change" | "major_shift";
        description: string;
        impact: "high" | "medium" | "low";
        actionableGuidance?: {
            bestFor?: string[]; // "Make career moves", "Start new projects", etc.
            avoid?: string[]; // "Avoid major investments", "Don't make hasty decisions", etc.
        };
    }>;
    phases: Array<{
        years: string; // "2020-2023"
        phase: string;
        act?: "initiation" | "peak" | "integration"; // For roadmap visualization
        theme: string;
        focus: string[];
        energy: number;
        optimalActions?: string[]; // "Consider job changes", "Best time for investments", etc.
        whatToUnlearn?: string; // For Act I: What to shed from previous cycle
        goldenWindow?: boolean; // For Act II: When energy is strongest
        preparation?: string; // For Act III: Preparing for next shift
    }>;
    peoplePortfolio?: {
        mentors?: string[]; // Who to look for (e.g., "People with Pig or Rabbit signs")
        friction?: string[]; // Who might challenge them
        newConnections?: string; // Description of who will enter
        exits?: string; // Description of who might exit
    };
    upcomingTransition?: {
        date: string;
        type: string;
        description: string;
        preparation: string[];
    };
}

export interface TenYearCycle {
    cycles: TenYearCycleData[]; // Array of cycles: past (free), current (locked), future (locked)
    selectedCycleIndex: number; // Index of currently selected cycle
}
