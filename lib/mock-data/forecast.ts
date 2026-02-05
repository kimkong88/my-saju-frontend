import type {
    TomorrowForecast,
    MonthlyForecast,
    YearlyForecast,
    TenYearCycle,
    FourteenDayForecast,
} from "@/types/forecast";

// Helper to get tomorrow's date
function getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export const mockTomorrowForecast: TomorrowForecast = {
    date: getTomorrowDate(),
    theme: {
        title: "A Day of Strategic Planning",
        description:
            "Your Metal energy is strong tomorrow—perfect for analytical thinking and making structured decisions.",
        trend: "rising",
        dominantElement: "metal",
    },
    energy: {
        overallScore: 7,
        categories: [
            { name: "career", score: 8, overview: "Strong career energy" },
            { name: "wealth", score: 6, overview: "Moderate wealth energy" },
            { name: "relationships", score: 5, overview: "Neutral relationship energy" },
            { name: "health", score: 7, overview: "Good health energy" },
            { name: "creativity", score: 9, overview: "Excellent creative energy" },
        ],
    },
    specialEvents: [
        {
            name: "Peak Fortune Alignment",
            emoji: "⭐",
            description:
                "Rare alignment of Fire and Metal elements creates exceptional opportunity for financial decisions and career moves.",
            rarity: "1 in 50 days",
            timeWindow: "2-4 PM",
        },
    ],
};

// Helper to get next 14 days date range
function getNext14DaysRange(): { startDate: string; endDate: string; period: string } {
    const start = new Date();
    start.setDate(start.getDate() + 1); // Start from tomorrow
    const end = new Date();
    end.setDate(end.getDate() + 14); // 14 days from tomorrow
    
    const startStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endStr = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
        period: `${startStr} - ${endStr}`,
    };
}

// Helper to generate 14 calendar dates
function generate14DayCalendar(): Array<{
    date: string;
    element: string;
    elementEmoji: string;
    animal: string;
    animalEmoji: string;
    isPeak: boolean;
}> {
    const calendar = [];
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const animalEmojis = ["🐭", "🐂", "🐅", "🐰", "🐲", "🐍", "🐴", "🐐", "🐵", "🐓", "🐕", "🐷"];
    const elements = ["FIRE-I", "EARTH-O", "METAL-I", "WATER-O", "WOOD-I"];
    const elementEmojis = ["🔥", "🌍", "⚔️", "💧", "🌳"];
    
    // Start from tomorrow (14-day forecast starts from tomorrow, not today)
    // Use static date calculation without timezone conversion
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    // Mark 3-4 days as peak (top 25%)
    const peakDays = [2, 5, 9, 12]; // Indices for peak days
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + i);
        // Format as YYYY-MM-DD without timezone conversion
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        const animalIndex = i % 12;
        const elementIndex = i % 5;
        
        calendar.push({
            date: dateStr,
            element: elements[elementIndex],
            elementEmoji: elementEmojis[elementIndex],
            animal: animals[animalIndex],
            animalEmoji: animalEmojis[animalIndex],
            isPeak: peakDays.includes(i),
        });
    }
    
    return calendar;
}

// New backend structure for 14-day forecast
export const mockFourteenDayForecast: FourteenDayForecast = {
    // 1. DOMINANT DATA
    dominantData: {
        monthlyElements: [
            {
                element: "WOOD-O",
                emoji: "🌳",
                percentage: 100, // Same month for all 14 days
            }
        ],
        activeTenGods: [
            {
                tenGod: {
                    name: "Authority",
                    technicalName: "Direct Officer",
                    emoji: "👔",
                    source: "natal",
                    pillar: "Multiple Days",
                    category: "power",
                    strength: "amplified",
                },
                occurrenceCount: 12, // Appears on 12 out of 14 days
                percentage: 86,
            },
            {
                tenGod: {
                    name: "Stable Income",
                    technicalName: "Zheng Cai",
                    emoji: "💰",
                    source: "transit",
                    pillar: "Monthly",
                    category: "wealth",
                    strength: "single",
                },
                occurrenceCount: 10,
                percentage: 71,
            },
            {
                tenGod: {
                    name: "Sharp Expression",
                    technicalName: "Shang Guan",
                    emoji: "✍️",
                    source: "natal",
                    pillar: "Year, Month",
                    category: "output",
                    strength: "dominant",
                },
                occurrenceCount: 8,
                percentage: 57,
            },
            {
                tenGod: {
                    name: "Independence",
                    technicalName: "Rob Wealth",
                    emoji: "⚡",
                    source: "transit",
                    pillar: "Annual",
                    category: "friend",
                    strength: "single",
                },
                occurrenceCount: 7,
                percentage: 50,
            },
            {
                tenGod: {
                    name: "Opportunity",
                    technicalName: "Indirect Wealth",
                    emoji: "💸",
                    source: "luck",
                    pillar: "Luck Era",
                    category: "wealth",
                    strength: "single",
                },
                occurrenceCount: 5,
                percentage: 36,
            },
        ],
        activePatterns: [
            {
                pattern: "Trinity Harmony Day",
                occurrenceCount: 2,
                percentage: 14,
            },
            {
                pattern: "Elemental Balance",
                occurrenceCount: 1,
                percentage: 7,
            },
        ],
    },
    // 2. PHASE ANALYSIS
    phases: [
        {
            days: "Day 1-5",
            theme: "Building Momentum",
            overview: "The first five days set the tone for your two-week journey. Fire energy is building, creating an ideal environment for launching new initiatives and gathering momentum. This is your window to plant seeds that will grow throughout the period.",
            focusAreas: [
                "Set clear intentions for the next two weeks",
                "Launch new projects or initiatives",
                "Build initial momentum through quick wins",
                "Establish key connections and networks",
            ],
        },
        {
            days: "Day 6-10",
            theme: "Peak Action & Major Moves",
            overview: "The middle phase brings peak Fire energy, making this the most powerful period for taking decisive action. Major decisions, important conversations, and significant progress are all favored. This is when your initial momentum reaches its highest point.",
            focusAreas: [
                "Make major decisions and commitments",
                "Have important conversations or negotiations",
                "Execute on your biggest goals",
                "Take calculated risks that align with your vision",
            ],
        },
        {
            days: "Day 11-14",
            theme: "Integration & Preparation",
            overview: "As Fire energy transitions to Earth, the focus shifts to consolidation and integration. This final phase is about grounding your gains, reflecting on progress, and preparing for what comes next. Stability and long-term thinking take precedence.",
            focusAreas: [
                "Consolidate gains and build on progress",
                "Review and refine your approach",
                "Strengthen foundations for future growth",
                "Plan ahead for the next cycle",
            ],
        },
    ],
    // 3. CALENDAR
    calendar: generate14DayCalendar(),
    // 4. BEST DAYS
    bestDays: {
        career: [
            {
                date: "2026-01-25",
                score: 72,
                reason: "Favorable energy alignment supports professional decisions and career advancement opportunities.",
            },
            {
                date: "2026-01-28",
                score: 70,
                reason: "Strong supportive elements create ideal conditions for important work conversations and strategic planning.",
            },
        ],
        relationship: [
            {
                date: "2026-01-22",
                score: 68,
                reason: "Harmonious element alignment supports open communication and meaningful connections.",
            },
            {
                date: "2026-01-26",
                score: 65,
                reason: "Positive energy flow enhances relationship building and social interactions.",
            },
        ],
        creativity: [
            {
                date: "2026-01-20",
                score: 75,
                reason: "Peak creative energy makes this ideal for artistic projects and innovative thinking.",
            },
            {
                date: "2026-01-25",
                score: 70,
                reason: "Wood energy supports creative expression and inspiration is abundant.",
            },
        ],
        wealth: [
            {
                date: "2026-01-23",
                score: 69,
                reason: "Earth energy brings stability and practical thinking, ideal for financial planning.",
            },
            {
                date: "2026-01-27",
                score: 67,
                reason: "Favorable conditions for investment decisions and wealth-building activities.",
            },
        ],
        health: [
            {
                date: "2026-01-21",
                score: 71,
                reason: "Strong health energy supports starting new fitness routines and wellness commitments.",
            },
            {
                date: "2026-01-29",
                score: 68,
                reason: "Optimal timing for health checkups and making wellness decisions.",
            },
        ],
        rest: [
            {
                date: "2026-01-26",
                score: 72,
                reason: "Lower overall activity energy makes this ideal for rest, reflection, and recovery.",
            },
            {
                date: "2026-01-30",
                score: 70,
                reason: "Calm energy supports relaxation and taking time for self-care.",
            },
        ],
    },
    // 5. WORST DAYS
    worstDays: {
        career: [
            {
                date: "2026-01-24",
                score: 45,
                reason: "Element conflicts may create friction in professional settings, avoid major career decisions.",
            },
            {
                date: "2026-01-29",
                score: 48,
                reason: "Unstable energy patterns suggest postponing important work commitments if possible.",
            },
        ],
        relationship: [
            {
                date: "2026-01-23",
                score: 42,
                reason: "Communication challenges may arise, avoid difficult conversations or relationship decisions.",
            },
            {
                date: "2026-01-27",
                score: 44,
                reason: "Tension in social energy suggests focusing on existing connections rather than new ones.",
            },
        ],
        creativity: [
            {
                date: "2026-01-22",
                score: 40,
                reason: "Creative blocks may occur due to element conflicts, avoid forcing creative output.",
            },
            {
                date: "2026-01-26",
                score: 43,
                reason: "Lower creative energy makes this less ideal for artistic projects or brainstorming.",
            },
        ],
        wealth: [
            {
                date: "2026-01-21",
                score: 38,
                reason: "Unstable financial energy suggests avoiding major investments or large purchases.",
            },
            {
                date: "2026-01-25",
                score: 41,
                reason: "Element conflicts may affect financial decisions, postpone if possible.",
            },
        ],
        health: [
            {
                date: "2026-01-24",
                score: 46,
                reason: "Lower health energy suggests taking extra care and avoiding strenuous activities.",
            },
            {
                date: "2026-01-28",
                score: 44,
                reason: "Energy patterns indicate this is not ideal for starting new health routines.",
            },
        ],
        rest: [
            {
                date: "2026-01-20",
                score: 28,
                reason: "High overall activity energy makes rest difficult, focus on action instead.",
            },
            {
                date: "2026-01-24",
                score: 30,
                reason: "Active energy patterns suggest this is not a good time for rest or recovery.",
            },
        ],
    },
};

// Legacy mock data - keeping for backward compatibility
export const mockMonthlyForecast: MonthlyForecast = {
    ...getNext14DaysRange(),
    myElement: "FIRE-I",
    myElementEmoji: "🔥",
    theme: {
        title: "A Period of Dynamic Shifts",
        description:
            "The next 14 days bring multiple element transitions, creating opportunities for growth, strategic planning, and new beginnings.",
        dominantElement: "fire", // Starting element
    },
    journey: {
        act1: {
            days: "Days 1-5",
            title: "Foundation & Momentum",
            description:
                "The first five days set the tone for your two-week journey. Fire energy is building, creating an ideal environment for launching new initiatives and gathering momentum. This is your window to plant seeds that will grow throughout the period.",
            focus: [
                "Set clear intentions for the next two weeks",
                "Launch new projects or initiatives",
                "Build initial momentum through quick wins",
                "Establish key connections and networks",
            ],
        },
        act2: {
            days: "Days 6-10",
            title: "Peak Action & Major Moves",
            description:
                "The middle phase brings peak Fire energy, making this the most powerful period for taking decisive action. Major decisions, important conversations, and significant progress are all favored. This is when your initial momentum reaches its highest point.",
            focus: [
                "Make major decisions and commitments",
                "Have important conversations or negotiations",
                "Execute on your biggest goals",
                "Take calculated risks that align with your vision",
            ],
        },
        act3: {
            days: "Days 11-14",
            title: "Integration & Preparation",
            description:
                "As Fire energy transitions to Earth, the focus shifts to consolidation and integration. This final phase is about grounding your gains, reflecting on progress, and preparing for what comes next. Stability and long-term thinking take precedence.",
            focus: [
                "Consolidate gains and build on progress",
                "Review and refine your approach",
                "Strengthen foundations for future growth",
                "Plan ahead for the next cycle",
            ],
        },
    },
    peakActionDays: [
        {
            date: "January 20",
            title: "Launch Day",
            action: "Start major projects, launch initiatives, or make public announcements",
            reason: "Peak Fire energy creates maximum momentum and visibility. Your creative expression is at its strongest, making this ideal for bold moves.",
            category: "career",
            intensity: "high",
        },
        {
            date: "January 22",
            title: "Connection Day",
            action: "Have important conversations, deepen relationships, or network strategically",
            reason: "Harmonious element alignment supports open communication and meaningful connections. Perfect for relationship-building.",
            category: "relationships",
            intensity: "high",
        },
        {
            date: "January 25",
            title: "Creative Breakthrough",
            action: "Work on creative projects, brainstorm new ideas, or express yourself artistically",
            reason: "Wood energy supports creative expression and innovation. Your ideas flow more easily and inspiration is abundant.",
            category: "creativity",
            intensity: "medium",
        },
        {
            date: "January 23",
            title: "Strategic Planning",
            action: "Review finances, make investment decisions, or plan for long-term wealth building",
            reason: "Earth energy brings stability and practical thinking. Ideal for financial planning and making grounded decisions about resources.",
            category: "wealth",
            intensity: "medium",
        },
    ],
    bestDaysFor: {
        career: ["January 20", "January 24", "January 27"],
        relationships: ["January 22", "January 26"],
        creativity: ["January 20", "January 25", "January 28"],
        wealth: ["January 23", "January 27"],
        health: ["January 21", "January 29"],
        rest: ["January 26", "January 30"],
    },
    monthlyContext: [
        {
            startDate: "Jan 15",
            endDate: "Jan 21",
            element: "WOOD-O",
            elementEmoji: "🌳",
            tenGods: [
                { name: "Sharp Expression", technicalName: "Shang Guan", emoji: "✍️", category: "output" }
            ]
        },
        {
            startDate: "Jan 22",
            endDate: "Jan 28",
            element: "METAL-I",
            elementEmoji: "⚔️",
            tenGods: [
                { name: "Stable Income", technicalName: "Zheng Cai", emoji: "💰", category: "wealth" },
                { name: "Independence", technicalName: "Rob Wealth", emoji: "⚡", category: "friend" }
            ]
        }
    ],
    dailyCalendar: [
        { date: "Jan 15", dayOfWeek: "Mon", element: "FIRE-I", elementEmoji: "🔥", animal: "Horse", animalEmoji: "🐴" },
        { date: "Jan 16", dayOfWeek: "Tue", element: "FIRE-I", elementEmoji: "🔥", animal: "Goat", animalEmoji: "🐐" },
        { date: "Jan 17", dayOfWeek: "Wed", element: "FIRE-I", elementEmoji: "🔥", animal: "Monkey", animalEmoji: "🐵" },
        { date: "Jan 18", dayOfWeek: "Thu", element: "FIRE-I", elementEmoji: "🔥", animal: "Rooster", animalEmoji: "🐓" },
        { date: "Jan 19", dayOfWeek: "Fri", element: "FIRE-I", elementEmoji: "🔥", animal: "Dog", animalEmoji: "🐕" },
        { date: "Jan 20", dayOfWeek: "Sat", element: "FIRE-I", elementEmoji: "🔥", animal: "Pig", animalEmoji: "🐷", isPeak: true },
        { date: "Jan 21", dayOfWeek: "Sun", element: "FIRE-I", elementEmoji: "🔥", animal: "Rat", animalEmoji: "🐭" },
        { date: "Jan 22", dayOfWeek: "Mon", element: "EARTH-O", elementEmoji: "🌍", animal: "Ox", animalEmoji: "🐂" },
        { date: "Jan 23", dayOfWeek: "Tue", element: "EARTH-O", elementEmoji: "🌍", animal: "Tiger", animalEmoji: "🐅" },
        { date: "Jan 24", dayOfWeek: "Wed", element: "EARTH-O", elementEmoji: "🌍", animal: "Rabbit", animalEmoji: "🐰" },
        { date: "Jan 25", dayOfWeek: "Thu", element: "EARTH-O", elementEmoji: "🌍", animal: "Dragon", animalEmoji: "🐲" },
        { date: "Jan 26", dayOfWeek: "Fri", element: "EARTH-O", elementEmoji: "🌍", animal: "Snake", animalEmoji: "🐍" },
        { date: "Jan 27", dayOfWeek: "Sat", element: "EARTH-O", elementEmoji: "🌍", animal: "Horse", animalEmoji: "🐴" },
        { date: "Jan 28", dayOfWeek: "Sun", element: "EARTH-O", elementEmoji: "🌍", animal: "Goat", animalEmoji: "🐐" },
    ],
    weeks: [
        {
            weekNumber: 1,
            startDate: "Jan 15",
            endDate: "Jan 21",
            theme: "Igniting New Beginnings",
            opportunities: [
                "Launch new projects or initiatives",
                "Express creativity and take bold actions",
                "Network and build new connections",
            ],
            challenges: [
                "Avoid spreading energy too thin",
                "Watch for impulsive decisions",
            ],
            keyEvents: ["Element alignment peak", "Creative energy surge"],
        },
        {
            weekNumber: 2,
            startDate: "Jan 22",
            endDate: "Jan 28",
            theme: "Grounding and Consolidation",
            opportunities: [
                "Build solid foundations for existing projects",
                "Review and refine your approach",
                "Focus on stability and long-term planning",
            ],
            challenges: [
                "Resist the urge to rush forward",
                "Balance patience with progress",
            ],
            keyEvents: ["Fire to Earth transition", "Strategic planning window"],
        },
    ],
    keyDates: [],
    dailyScores: [],
};

// Helper to get next 12 months date range
function getNext12MonthsRange(): { startDate: string; endDate: string; period: string } {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 12);
    
    const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const endStr = end.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    
    return {
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
        period: `${startStr} - ${endStr}`,
    };
}

export const mockYearlyForecast: YearlyForecast = {
    ...getNext12MonthsRange(),
    theme: {
        title: "A Year of Expansion",
        description:
            "2025 brings strong Wood energy, creating opportunities for growth, expansion, and new ventures.",
        overallEnergy: 7,
        dominantElement: "wood",
    },
    months: [
        {
            month: "January",
            energy: 7,
            theme: "New beginnings",
            bestFor: ["Starting projects", "Setting goals"],
            avoid: ["Rushing decisions"],
            keyDates: ["Jan 5", "Jan 15"],
        },
        {
            month: "February",
            energy: 6,
            theme: "Building momentum",
            bestFor: ["Networking", "Planning"],
            avoid: ["Major changes"],
            keyDates: ["Feb 10", "Feb 20"],
        },
        {
            month: "March",
            energy: 8,
            theme: "Peak activity",
            bestFor: ["Launching projects", "Making decisions"],
            avoid: ["Overcommitting"],
            keyDates: ["Mar 5", "Mar 15", "Mar 25"],
        },
        {
            month: "April",
            energy: 7,
            theme: "Stability and growth",
            bestFor: ["Consolidating gains", "Building relationships"],
            avoid: ["Impulsive actions"],
            keyDates: ["Apr 10", "Apr 20"],
        },
        {
            month: "May",
            energy: 6,
            theme: "Reflection period",
            bestFor: ["Reviewing progress", "Adjusting plans"],
            avoid: ["Starting new ventures"],
            keyDates: ["May 5", "May 15"],
        },
        {
            month: "June",
            energy: 7,
            theme: "Renewed energy",
            bestFor: ["Creative projects", "Social activities"],
            avoid: ["Burnout"],
            keyDates: ["Jun 10", "Jun 20"],
        },
        {
            month: "July",
            energy: 8,
            theme: "Peak summer energy",
            bestFor: ["Major initiatives", "Career moves"],
            avoid: ["Spreading too thin"],
            keyDates: ["Jul 5", "Jul 15", "Jul 25"],
        },
        {
            month: "August",
            energy: 7,
            theme: "Harvest time",
            bestFor: ["Reaping rewards", "Celebrating achievements"],
            avoid: ["Complacency"],
            keyDates: ["Aug 10", "Aug 20"],
        },
        {
            month: "September",
            energy: 6,
            theme: "Transition period",
            bestFor: ["Planning ahead", "Preparing for change"],
            avoid: ["Resisting change"],
            keyDates: ["Sep 5", "Sep 15"],
        },
        {
            month: "October",
            energy: 7,
            theme: "New phase begins",
            bestFor: ["Starting fresh", "New opportunities"],
            avoid: ["Holding onto the past"],
            keyDates: ["Oct 10", "Oct 20"],
        },
        {
            month: "November",
            energy: 8,
            theme: "Peak autumn energy",
            bestFor: ["Strategic planning", "Long-term investments"],
            avoid: ["Short-term thinking"],
            keyDates: ["Nov 5", "Nov 15", "Nov 25"],
        },
        {
            month: "December",
            energy: 7,
            theme: "Year-end consolidation",
            bestFor: ["Reflecting on the year", "Setting intentions"],
            avoid: ["Rushing to finish"],
            keyDates: ["Dec 10", "Dec 20"],
        },
    ],
    majorTransitions: [
        {
            date: "March 1",
            title: "Spring Equinox - Major Energy Shift",
            description: "Wood energy peaks, creating ideal conditions for new beginnings and growth initiatives.",
            impact: "high",
        },
        {
            date: "June 21",
            title: "Summer Solstice - Peak Activity",
            description: "Fire energy dominates, perfect for taking bold actions and making significant progress.",
            impact: "high",
        },
        {
            date: "September 23",
            title: "Autumn Equinox - Transition Period",
            description: "Energy shifts from Fire to Metal, ideal for strategic planning and long-term thinking.",
            impact: "medium",
        },
    ],
    quarterlySummary: [
        {
            quarter: 1,
            theme: "Foundation Building",
            energy: 7,
            focus: "Set strong foundations for the year ahead",
        },
        {
            quarter: 2,
            theme: "Growth and Expansion",
            energy: 8,
            focus: "Take bold actions and pursue major opportunities",
        },
        {
            quarter: 3,
            theme: "Harvest and Consolidation",
            energy: 7,
            focus: "Reap rewards and consolidate your gains",
        },
        {
            quarter: 4,
            theme: "Reflection and Planning",
            energy: 6,
            focus: "Reflect on the year and prepare for the next cycle",
        },
    ],
};

export const mockTenYearCycle: TenYearCycle = {
    selectedCycleIndex: 0,
    cycles: [
        {
            startYear: 1988,
            endYear: 1997,
            theme: "The Foundation Years",
            cinematicName: "The Seedling Era",
            hook: "A decade of learning, growth, and establishing your core identity.",
            overallEnergy: 6,
            phase: "early",
            currentYear: 1990,
            isGenerated: true,
            luckPillars: [
                {
                    pillar: {
                        element: "WOOD-O",
                        stem: "甲",
                        branch: "子",
                    },
                    startYear: 1988,
                    endYear: 1992,
                    influence: {
                        career: "Learning and exploration",
                        wealth: "Building foundations",
                        relationships: "Family connections",
                        health: "Strong vitality",
                    },
                    description: "Wood energy supports growth and learning during these formative years.",
                },
                {
                    pillar: {
                        element: "FIRE-I",
                        stem: "丙",
                        branch: "午",
                    },
                    startYear: 1993,
                    endYear: 1997,
                    influence: {
                        career: "Creative expression",
                        wealth: "Early opportunities",
                        relationships: "Social expansion",
                        health: "Active energy",
                    },
                    description: "Fire energy brings passion and creativity to your development.",
                },
            ],
            statShift: [
                {
                    category: "Logic",
                    currentValue: 5,
                    newValue: 8,
                    change: 3,
                },
                {
                    category: "Creativity",
                    currentValue: 3,
                    newValue: 7,
                    change: 4,
                },
            ],
            elementalSuperpower: {
                name: "Rapid Learning",
                description: "Your ability to absorb new information and adapt quickly is amplified.",
                action: "Your superpower is Rapid Learning. In this decade, you win by being curious and adaptable.",
            },
            theTrap: {
                name: "The Restlessness Trap",
                description: "You might feel like you need to do everything at once, leading to scattered energy.",
                wayOut: "Focus on one area at a time. Mastery comes from depth, not breadth.",
            },
            bestFor: ["Education", "Skill building", "Exploring interests"],
            avoidDuring: ["Rushing decisions", "Overcommitting"],
            transitions: [
                {
                    year: 1993,
                    type: "pillar_change",
                    description: "Transition from Wood to Fire energy",
                    impact: "high",
                    actionableGuidance: {
                        bestFor: ["Creative projects", "Social activities"],
                        avoid: ["Rigid planning"],
                    },
                },
            ],
            phases: [
                {
                    years: "1988-1991",
                    phase: "Early Phase",
                    theme: "Foundation Building",
                    focus: ["Learning", "Growing", "Exploring"],
                    energy: 5,
                },
                {
                    years: "1992-1995",
                    phase: "Mid Phase",
                    theme: "Expansion and Growth",
                    focus: ["Growing", "Expanding", "Achieving"],
                    energy: 7,
                },
                {
                    years: "1996-1997",
                    phase: "Late Phase",
                    theme: "Integration",
                    focus: ["Consolidating", "Preparing", "Transitioning"],
                    energy: 6,
                },
            ],
        },
        {
            startYear: 1998,
            endYear: 2007,
            theme: "The Transformation Years",
            cinematicName: "The Great Polishing",
            hook: "A decade of significant change, challenges, and personal transformation.",
            overallEnergy: 7,
            phase: "mid",
            currentYear: 2000,
            isGenerated: true,
            luckPillars: [
                {
                    pillar: {
                        element: "EARTH-O",
                        stem: "戊",
                        branch: "辰",
                    },
                    startYear: 1998,
                    endYear: 2002,
                    influence: {
                        career: "Stability and structure",
                        wealth: "Building resources",
                        relationships: "Long-term commitments",
                        health: "Grounded energy",
                    },
                    description: "Earth energy brings stability and structure to your life.",
                },
                {
                    pillar: {
                        element: "METAL-I",
                        stem: "庚",
                        branch: "申",
                    },
                    startYear: 2003,
                    endYear: 2007,
                    influence: {
                        career: "Discipline and focus",
                        wealth: "Strategic accumulation",
                        relationships: "Quality over quantity",
                        health: "Resilience",
                    },
                    description: "Metal energy sharpens your focus and discipline.",
                },
            ],
            statShift: [
                {
                    category: "Wealth",
                    currentValue: 4,
                    newValue: 9,
                    change: 5,
                },
                {
                    category: "Health",
                    currentValue: 6,
                    newValue: 8,
                    change: 2,
                },
            ],
            elementalSuperpower: {
                name: "Strategic Thinking",
                description: "Your ability to plan long-term and make disciplined decisions is enhanced.",
                action: "Your superpower is Strategic Thinking. In this decade, you win by being methodical and patient.",
            },
            theTrap: {
                name: "The Rigidity Trap",
                description: "You might become too focused on structure, missing opportunities for flexibility.",
                wayOut: "Balance structure with adaptability. Sometimes the best plans need to evolve.",
            },
            bestFor: ["Career building", "Long-term investments", "Skill mastery"],
            avoidDuring: ["Impulsive decisions", "Short-term thinking"],
            transitions: [
                {
                    year: 2003,
                    type: "pillar_change",
                    description: "Transition from Earth to Metal energy",
                    impact: "high",
                    actionableGuidance: {
                        bestFor: ["Career advancement", "Strategic planning"],
                        avoid: ["Scattered efforts"],
                    },
                },
            ],
            phases: [
                {
                    years: "1998-2001",
                    phase: "Early Phase",
                    theme: "Establishing Structure",
                    focus: ["Building", "Structuring", "Planning"],
                    energy: 6,
                },
                {
                    years: "2002-2005",
                    phase: "Mid Phase",
                    theme: "Peak Transformation",
                    focus: ["Transforming", "Achieving", "Mastering"],
                    energy: 8,
                },
                {
                    years: "2006-2007",
                    phase: "Late Phase",
                    theme: "Integration",
                    focus: ["Consolidating", "Refining", "Preparing"],
                    energy: 7,
                },
            ],
        },
        {
            startYear: 2008,
            endYear: 2017,
            theme: "The Expansion Years",
            cinematicName: "The Architect's Era",
            hook: "A decade of building, creating, and expanding your influence.",
            overallEnergy: 8,
            phase: "late",
            currentYear: 2010,
            isGenerated: false, // Not generated yet - locked
            luckPillars: [
                {
                    pillar: {
                        element: "WATER-O",
                        stem: "壬",
                        branch: "子",
                    },
                    startYear: 2008,
                    endYear: 2012,
                    influence: {
                        career: "Flow and adaptability",
                        wealth: "Fluid opportunities",
                        relationships: "Deep connections",
                        health: "Flexibility",
                    },
                    description: "Water energy brings flow and adaptability.",
                },
                {
                    pillar: {
                        element: "WOOD-I",
                        stem: "甲",
                        branch: "寅",
                    },
                    startYear: 2013,
                    endYear: 2017,
                    influence: {
                        career: "Growth and expansion",
                        wealth: "Rapid accumulation",
                        relationships: "Social expansion",
                        health: "Vitality",
                    },
                    description: "Wood energy supports growth and expansion.",
                },
            ],
            transitions: [],
            phases: [],
        },
        {
            startYear: 2018,
            endYear: 2027,
            theme: undefined, // Not generated - current cycle (locked)
            cinematicName: undefined,
            hook: undefined,
            overallEnergy: 7,
            phase: "early",
            currentYear: 2025,
            isGenerated: false, // Current cycle - locked
            luckPillars: [
                {
                    pillar: {
                        element: "FIRE-O",
                        stem: "丙",
                        branch: "午",
                    },
                    startYear: 2018,
                    endYear: 2022,
                    influence: {
                        career: "Passion and drive",
                        wealth: "Dynamic opportunities",
                        relationships: "Intense connections",
                        health: "Active energy",
                    },
                    description: "Fire energy brings passion and drive.",
                },
                {
                    pillar: {
                        element: "EARTH-I",
                        stem: "戊",
                        branch: "辰",
                    },
                    startYear: 2023,
                    endYear: 2027,
                    influence: {
                        career: "Stability and grounding",
                        wealth: "Steady accumulation",
                        relationships: "Stable connections",
                        health: "Grounded energy",
                    },
                    description: "Earth energy brings stability and grounding.",
                },
            ],
            transitions: [],
            phases: [],
        },
        {
            startYear: 2028,
            endYear: 2037,
            theme: undefined, // Not generated - future cycle (locked)
            cinematicName: undefined,
            hook: undefined,
            overallEnergy: 6,
            phase: "early",
            currentYear: 2030,
            isGenerated: false, // Future cycle - locked
            luckPillars: [
                {
                    pillar: {
                        element: "METAL-O",
                        stem: "庚",
                        branch: "申",
                    },
                    startYear: 2028,
                    endYear: 2032,
                    influence: {
                        career: "Precision and focus",
                        wealth: "Strategic accumulation",
                        relationships: "Quality connections",
                        health: "Resilience",
                    },
                    description: "Metal energy brings precision and focus.",
                },
                {
                    pillar: {
                        element: "WATER-I",
                        stem: "壬",
                        branch: "子",
                    },
                    startYear: 2033,
                    endYear: 2037,
                    influence: {
                        career: "Flow and wisdom",
                        wealth: "Fluid opportunities",
                        relationships: "Deep connections",
                        health: "Flexibility",
                    },
                    description: "Water energy brings flow and wisdom.",
                },
            ],
            transitions: [],
            phases: [],
        },
    ],
};
