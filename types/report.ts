/**
 * Personal Report Type Definitions
 *
 * These types define the structure of personal Bazi compatibility reports
 * returned from the API. All types follow industry-standard TypeScript conventions.
 */

export interface BirthInfo {
    displayDate: string;
    location: string;
    calculatedType: string;
}

export interface RarityType {
    percentage: number;
    description: string;
}

export interface RarityPattern {
    rarity: number;
    description: string;
}

export interface RarityElementDistribution {
    percentage: number;
    description: string;
}

export interface RarityOverall {
    oneIn: number;
    description: string;
}

export interface Rarity {
    type: RarityType;
    pattern: RarityPattern;
    elementDistribution: RarityElementDistribution;
    overall: RarityOverall;
}

export interface Identity {
    code: string;
    title: string;
    element: string;
    polarity: "Yin" | "Yang";
    archetype: string;
    behavior: string;
    coreTrait: string;
    visualMetaphor: string;
}

export interface ChartMeaning {
    summary: string;
    implications: string[];
    soWhat: string;
    interactionExplanation: string;
}

export interface WhoYouAre {
    paragraphs: string[];
}

export interface SpecialTrait {
    name: string;
    chineseName: string;
    description: string;
    type: "pattern" | "star";
    emoji: string;
    rarity?: string;
    count?: number;
    branches?: string[];
}

export interface ElementDistribution {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
    total: number;
    percentages: {
        wood: number;
        fire: number;
        earth: number;
        metal: number;
        water: number;
    };
    dominant: string[];
    missing: string[];
    balance: string;
    explanation: string;
}

export interface DayMaster {
    character: string;
    displayName: string;
    metaphor: string;
    explanation: string;
}

export interface DayBranch {
    character: string;
    displayName: string;
    explanation: string;
}

export interface FourPillar {
    display: string;
    meaning: string;
    aspect: string;
    isCore?: boolean;
}

export interface FourPillars {
    year: FourPillar;
    month: FourPillar;
    day: FourPillar;
    hour: FourPillar;
}

export interface TechnicalBasis {
    dayMaster: DayMaster;
    dayBranch: DayBranch;
    general: string;
    fourPillars: FourPillars;
}

export interface Strength {
    title: string;
    emoji: string;
    description: string;
    isPersonal?: boolean;
}

export interface Weakness {
    title: string;
    emoji: string;
    description: string;
    isPersonal?: boolean;
}

export interface LifeTheme {
    title: string;
    emoji: string;
    description: string;
    examples?: string[];
    environments?: string;
    advice?: string[];
    warningAreas?: string;
    personalInsights?: string[];
}

export interface LifeThemes {
    code: string;
    career: LifeTheme;
    wealth: LifeTheme;
    relationships: LifeTheme;
    health: LifeTheme;
    learning: LifeTheme;
}

/**
 * Complete Personal Report Type
 *
 * This is the main type representing a full personal compatibility report
 * returned from the API.
 */
export interface PersonalReport {
    birthInfo: BirthInfo;
    rarity: Rarity;
    identity: Identity;
    introduction: string;
    chartMeaning: ChartMeaning;
    whoYouAre: WhoYouAre;
    specialTraits: SpecialTrait[];
    elementDistribution: ElementDistribution;
    technicalBasis: TechnicalBasis;
    strengths: Strength[];
    weaknesses: Weakness[];
    lifeThemes: LifeThemes;
    conclusion: string;
}

/**
 * API Response Input Data
 *
 * The input data that was used to generate the report
 */
export interface ReportInput {
    gender: string;
    birthDateTime: string;
    birthTimezone: string;
    isTimeKnown: boolean;
}

/**
 * API Response Wrapper
 *
 * The API returns reports wrapped in a response object that includes
 * the report type and data.
 */
export interface ReportResponse {
    type: "personal" | "compatibility";
    data: PersonalReport | CompatibilityReport;
    input?: ReportInput;
}

/**
 * Compatibility Report Type Definitions
 */

export interface PairingTitle {
    name: string;
    subtitle?: string;
}

export interface PersonIdentity {
    code: string;
    title: string;
    element: string;
    polarity: "Yin" | "Yang";
}

export interface Person {
    gender: "male" | "female";
    identity: PersonIdentity;
}

export interface CompatibilityScore {
    overall: number;
    rating: string;
    headline: string;
}

export interface CompatibilityRarity {
    oneIn: number;
    percentile: number;
    description: string;
}

export interface ScoreSummaryOverall {
    score: number;
    percentile: number;
    description: string;
}

export interface ScoreSummaryCategory {
    category: string;
    percentage: number;
    percentile: number;
    description: string;
}

export interface ScoreSummary {
    overall: ScoreSummaryOverall;
    strongest: ScoreSummaryCategory;
    weakest: ScoreSummaryCategory;
    text: string;
}

export interface ScoreCategory {
    label: string;
    emoji: string;
    score: number;
    max: number;
    percentage: number;
    percentile?: number;
    description: string;
    technicalBasis?: string;
}

export interface ScoreTotal {
    score: number;
    max: number;
}

export interface ScoreBreakdown {
    summary: ScoreSummary;
    categories: ScoreCategory[];
    total: ScoreTotal;
}

export interface DayMasterInfo {
    characters: string;
    element: string;
    animal: string;
    polarity: "Yin" | "Yang";
    archetype: string;
}

export interface ChartPerson {
    dayMaster: DayMasterInfo;
}

export interface ChartInteraction {
    visual: string;
    type: string;
}

export interface FullChartPillar {
    pillar: string;
    characters: string;
    meaning: string;
    isCore?: boolean;
}

export interface ChartDisplay {
    person1: ChartPerson;
    person2: ChartPerson;
    interaction: ChartInteraction;
    fullCharts: {
        person1: FullChartPillar[];
        person2: FullChartPillar[];
    };
}

export interface SpecialConnection {
    title: string;
    emoji: string;
    rarity: string;
    category: string;
    description: string;
}

export interface Dynamic {
    title: string;
    emoji: string;
    person1Brings: string;
    person2Brings: string;
    outcome: string;
}

export interface SharedBehavior {
    title: string;
    emoji: string;
    description: string;
    impact?: string;
}

export interface GrowthArea {
    title: string;
    emoji: string;
    tension: string;
    opportunity: string;
    outcome: string;
}

export interface ElementInteraction {
    person1Element: string;
    person2Element: string;
    interactionType: string;
    cycle: string;
    explanation: string;
}

export interface TechnicalBasisCompatibility {
    elementInteraction: ElementInteraction;
    traditionalFactors: unknown[];
}

/**
 * Complete Compatibility Report Type
 *
 * This is the main type representing a full compatibility report
 * returned from the API.
 */
export interface CompatibilityReport {
    pairingTitle: PairingTitle;
    introduction: string;
    person1: Person;
    person2: Person;
    score: CompatibilityScore;
    rarity: CompatibilityRarity;
    overview: string;
    scoreBreakdown: ScoreBreakdown;
    chartDisplay: ChartDisplay;
    sharedTraits: string[];
    specialConnections: SpecialConnection[];
    dynamics: Dynamic[];
    sharedBehaviors: SharedBehavior[];
    growthAreas: GrowthArea[];
    technicalBasis: TechnicalBasisCompatibility;
    generatedAt: string;
    reportType: string;
}
