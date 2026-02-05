"use client";

import TodayReceivedBlessings from "./TodayReceivedBlessings";

interface Category {
    name: string;
    score: number; // 1-10
}

interface ReceivedBlessing {
    id: string;
    fromName: string;
    fromElement?: string; // For avatar styling
    blessingEmoji?: string;
    blessingName?: string;
    blessingDescription?: string;
    personalMessage?: string;
    sentAt: string;
    expiresAt: string; // ISO string - 24h from sentAt
}

interface TodayScorecardProps {
    overallScore: number; // 1-10
    overview: string; // Daily analysis paragraph
    categories: Category[];
    trend?: "rising" | "falling" | "stable";
    receivedBlessings?: ReceivedBlessing[];
}

export default function TodayScorecard({
    overallScore,
    overview,
    categories,
    trend: _trend,
    receivedBlessings = [],
}: TodayScorecardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 7) return "text-emerald-600";
        if (score >= 4) return "text-amber-600";
        return "text-red-500";
    };

    const percentage = (overallScore / 10) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference * (1 - percentage / 100);

    const getStrokeColor = (score: number) => {
        if (score >= 7) return "#10b981"; // emerald-500
        if (score >= 4) return "#f59e0b"; // amber-500
        return "#ef4444"; // red-500
    };

    const getBarColor = (score: number) => {
        if (score >= 7) return "bg-emerald-500";
        if (score >= 4) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Today&apos;s Fortune Pulse
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Your daily energy analysis and overview
                    </p>
                </div>

                {/* 2-Column Grid: [Circular Bar + Bar Charts] [Paragraph] */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Circular Bar + Bar Charts */}
                    <div className="space-y-6">
                        {/* Circular Score */}
                        <div className="flex justify-center">
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <svg
                                    className="w-full h-full transform -rotate-90"
                                    viewBox="0 0 100 100"
                                >
                                    {/* Background circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="8"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke={getStrokeColor(overallScore)}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                    />
                                </svg>
                                {/* Score text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div
                                            className={`text-3xl md:text-4xl font-mono font-bold ${getScoreColor(
                                                overallScore
                                            )}`}
                                        >
                                            {overallScore}
                                        </div>
                                        <div className="text-sm md:text-base text-slate-500 font-medium">
                                            /10
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bar Charts - Category Breakdown */}
                        <div className="space-y-4">
                            {categories.map((category) => {
                                const percentage = (category.score / 10) * 100;
                                return (
                                    <div
                                        key={category.name}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-700">
                                                {category.name}
                                            </span>
                                            <span
                                                className={`text-sm font-mono font-bold ${getScoreColor(
                                                    category.score
                                                )}`}
                                            >
                                                {category.score}/10
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 overflow-hidden rounded-full">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${getBarColor(
                                                    category.score
                                                )}`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Blessings + Paragraph Analysis */}
                    <div className="space-y-6">
                        {/* Received Blessings - Above overview text */}
                        <TodayReceivedBlessings blessings={receivedBlessings} />

                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            {overview}
                        </p>
                        {/* Subtle prompt to continue reading */}
                        <p className="text-sm text-slate-500 text-center italic">
                            Continue reading below to see your peak energy
                            windows and timing recommendations
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
