import TodayPageContent from "@/components/today-page/TodayPageContent";
import {
    getActiveBlessings,
    type ActiveBlessing,
} from "@/app/actions/blessingsAction";
import { getTodayForecast } from "@/app/actions/reportAction";
import { getQuestions } from "@/app/actions/meAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import type { TodayForecastResponse } from "@/types/today";
import type { QuestionsResponse } from "@/app/actions/meAction";

// Mock data - will be replaced with API call
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockTodayData = {
    theme: {
        title: "A Day of Focus",
        description:
            "Your Fire energy is strong today—perfect for starting new projects and making bold decisions.",
        trend: "rising" as const,
        date: "January 15, 2025",
        dayOfWeek: "Wednesday",
        dominantElement: "fire" as const,
    },
    dailyAnalysis:
        "Today marks a significant shift in your energy patterns, with Fire element dominance creating exceptional clarity and drive. Your chart shows a rare alignment between your Day Master and the current day's energy, amplifying your natural decision-making abilities. This is an ideal time to initiate projects you've been planning, as your mental clarity is at its peak. However, be mindful of the afternoon hours when communication energy dips—save important conversations for your peak windows.",
    specialEvents: [
        {
            name: "Peak Fortune Alignment",
            emoji: "⭐",
            description:
                "Rare alignment of Fire and Metal elements creates exceptional opportunity for financial decisions and career moves.",
            rarity: "1 in 50 days",
            type: "alignment" as const,
            timeWindow: "2-4 PM",
        },
        {
            name: "Creative Spark",
            emoji: "✨",
            description:
                "Your creative energy is amplified today. Perfect time for brainstorming, artistic projects, or innovative thinking.",
            rarity: "1 in 20 days",
            type: "star" as const,
            timeWindow: "10 AM-12 PM",
        },
        {
            name: "Wealth Accumulation Window",
            emoji: "💰",
            description:
                "Optimal timing for financial decisions, investments, and wealth-building activities.",
            rarity: "1 in 30 days",
            type: "pattern" as const,
            timeWindow: "8-10 AM",
        },
    ],
    energy: {
        overallScore: 7,
        categories: [
            {
                name: "Career",
                score: 8,
                overview:
                    "Your career Fortune Pulse is high today (8/10). This is an excellent time for important work decisions, job interviews, or career-related conversations. Your professional energy is at its peak.",
                detailLink: "#career-detail",
            },
            {
                name: "Wealth",
                score: 6,
                overview:
                    "Moderate Fortune Pulse in wealth (6/10). Good timing for financial planning and budgeting decisions. Avoid major investments or large purchases today.",
                detailLink: "#wealth-detail",
            },
            {
                name: "Relationships",
                score: 5,
                overview:
                    "Your relationship Fortune Pulse is moderate (5/10). Focus on maintaining existing connections rather than starting new ones. Good day for resolving conflicts.",
                detailLink: "#relationships-detail",
            },
            {
                name: "Health",
                score: 7,
                overview:
                    "Strong health Fortune Pulse (7/10). Ideal time for starting new fitness routines, scheduling health checkups, or making wellness commitments.",
                detailLink: "#health-detail",
            },
            {
                name: "Creativity",
                score: 9,
                overview:
                    "Exceptional creativity Fortune Pulse (9/10). Your creative energy is at its peak—perfect for artistic projects, brainstorming sessions, or innovative problem-solving.",
                detailLink: "#creativity-detail",
            },
        ],
    },
    goodThings: [
        {
            emoji: "💼",
            title: "Unexpected Career Opportunity",
            description:
                "Based on your high career energy (8/10), you might receive recognition, positive feedback, or an unexpected opportunity at work today.",
        },
        {
            emoji: "🤝",
            title: "Meaningful Connection",
            description:
                "Your relationship energy suggests a chance for reconciliation, a meaningful conversation, or a new connection that could be valuable.",
        },
        {
            emoji: "💡",
            title: "Creative Breakthrough",
            description:
                "With exceptional creativity energy (9/10), you might have a breakthrough idea or inspiration that could lead to something significant.",
        },
    ],
    challenges: [
        {
            emoji: "💬",
            title: "Miscommunication Risk",
            description:
                "Communication energy dips in the afternoon, increasing the chance of misunderstandings or missed details.",
            whatToDo:
                "Double-check important details and confirm key points in writing",
        },
        {
            emoji: "🛒",
            title: "Impulsive Purchases",
            description:
                "Decision-making clarity drops significantly in the evening, making you more prone to buyer's remorse.",
            whatToDo:
                "Pause before major purchases—sleep on it and decide tomorrow",
        },
        {
            emoji: "⚡",
            title: "Energy Dip After Lunch",
            description:
                "Your physical and mental energy naturally decreases after lunch, making it harder to focus on complex tasks.",
            whatToDo:
                "Schedule important tasks before noon, use afternoon for lighter work",
        },
    ],
};

export default async function TodayPage() {
    // Get active blessings, today's forecast, questions, and subscription status from API
    let receivedBlessings: ActiveBlessing[] = [];
    let todayForecast: TodayForecastResponse | null = null;
    let questionsData: QuestionsResponse | null = null;
    let isPremium = false;

    try {
        const [activeBlessings, forecast, questions, subscription] =
            await Promise.all([
                getActiveBlessings(),
                getTodayForecast(),
                getQuestions("daily"), // Use "daily" scope for today page
                getSubscriptionStatus(),
            ]);

        // Transform API response to match component interface
        receivedBlessings = activeBlessings.map((blessing) => ({
            id: blessing.id,
            fromName: blessing.sender.fullName,
            fromElement: blessing.sender.identity.element,
            fromCode: blessing.sender.code,
            isFriend: blessing.sender.isFriend ?? false,
            blessingEmoji: blessing.emoji,
            blessingName: blessing.name,
            blessingDescription: blessing.description,
            personalMessage: blessing.message,
            sentAt: blessing.createdAt,
            expiresAt: blessing.expiresAt,
        }));

        todayForecast = forecast;
        questionsData = questions;
        isPremium = subscription?.isSubscribed || false;
    } catch (error) {
        console.error("Error loading today data:", error);
        // On error, use empty array and null, default to free user
        receivedBlessings = [];
        todayForecast = null;
        questionsData = null;
        isPremium = false;
    }

    return (
        <TodayPageContent
            initialForecast={todayForecast}
            receivedBlessings={receivedBlessings}
            initialQuestions={questionsData}
            isPremium={isPremium}
        />
    );
}
