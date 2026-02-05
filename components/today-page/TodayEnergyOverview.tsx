"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import TodayReceivedBlessings from "./TodayReceivedBlessings";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface ReceivedBlessing {
    id: string;
    fromName: string;
    fromElement?: string;
    blessingEmoji?: string;
    blessingName?: string;
    blessingDescription?: string;
    personalMessage?: string;
    sentAt: string;
    expiresAt: string;
}

interface TodayEnergyOverviewProps {
    elementRelationship: {
        myElement: string;
        myElementEmoji: string;
        todayElement: string;
        todayElementEmoji: string;
        meaning: string;
    };
    dailyBranch?: {
        character: string;
        animal: string;
        emoji: string;
        meaning: string;
    };
    activeTenGods: Array<{
        name: string;
        technicalName: string;
        emoji: string;
        source: "natal" | "luck" | "transit";
        pillar: string; // Can be comma-separated: "Year, Month"
        category: "output" | "wealth" | "power" | "resource" | "friend";
        strength: "single" | "amplified";
        occurrenceCount: number;
    }>;
    reading: {
        paragraphs: string[];
        technicalBasis?: string[];
    };
    receivedBlessings?: ReceivedBlessing[];
    timeframe?: "today" | "tomorrow"; // Default to "today"
    isPremium?: boolean; // Default to false (free user)
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    if (elementLower.includes("fire")) {
        return {
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: "linear-gradient(135deg, #a16207 0%, #854d0e 100%)",
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        };
    }

    return { backgroundColor: baseColor };
}

function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        output: "Expression & Creativity",
        wealth: "Wealth & Resources",
        power: "Authority & Leadership",
        resource: "Support & Learning",
        friend: "Partnerships & Connections",
    };
    return labels[category] || category;
}

function getSourceLabel(
    source: "natal" | "luck" | "transit",
    pillar: string
): string {
    if (source === "natal") return "From Your Chart";
    if (source === "luck") return "From Current Luck Cycle";
    if (source === "transit") {
        // Check all pillars (can be comma-separated)
        const pillarsLower = pillar.toLowerCase();
        if (pillarsLower.includes("annual") || pillarsLower.includes("year")) {
            return "For This Year";
        }
        if (
            pillarsLower.includes("month") ||
            pillarsLower.includes("monthly")
        ) {
            return "For This Month";
        }
        if (pillarsLower.includes("day") || pillarsLower.includes("daily")) {
            return "For Today";
        }
        return "From Transit";
    }
    return source;
}

export default function TodayEnergyOverview({
    elementRelationship,
    dailyBranch,
    activeTenGods,
    reading,
    receivedBlessings = [],
    timeframe = "today",
    isPremium = false,
}: TodayEnergyOverviewProps) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    // Active energies are now free - show all for everyone
    const displayedEnergies = activeTenGods;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const remainingCount = 0; // No gating on active energies

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        setSubscriptionModalOpen(false);
    };

    // Transform text: replace "today" with "tomorrow" if needed
    // Must replace capitalized versions first to preserve capitalization
    const transformText = (text: string) => {
        if (timeframe === "tomorrow") {
            return text
                .replace(/\bTODAY\b/g, "TOMORROW")
                .replace(/\bToday\b/g, "Tomorrow")
                .replace(/\btoday\b/g, "tomorrow");
        }
        return text;
    };

    const transformedReadingParagraphs = reading.paragraphs.map((paragraph) =>
        transformText(paragraph)
    );
    const transformedElementMeaning = transformText(
        elementRelationship.meaning
    );
    const transformedBranchMeaning = dailyBranch
        ? transformText(dailyBranch.meaning)
        : undefined;

    const timeLabel = timeframe === "tomorrow" ? "Tomorrow's" : "Today's";
    const branchLabel = timeframe === "tomorrow" ? "Tomorrow's" : "Today's";

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        {timeLabel} Energy Overview
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Your daily energy analysis and active forces
                    </p>
                </div>

                {/* 2-Column Grid: [Element Relationship + Active Energies] [Blessings + Reading] */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Element Relationship + Active Energies */}
                    <div className="space-y-6">
                        {/* Element Relationship Card */}
                        <div className="bg-white border border-slate-200 rounded-sm p-6">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                Element Energy
                            </h3>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                {/* My Element */}
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                        style={getElementBgStyle(
                                            elementRelationship.myElement
                                        )}
                                    >
                                        {elementRelationship.myElementEmoji}
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium">
                                        {elementRelationship.myElement}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <ArrowRight className="w-5 h-5 text-slate-400" />

                                {/* Today's Element */}
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                        style={getElementBgStyle(
                                            elementRelationship.todayElement
                                        )}
                                    >
                                        {elementRelationship.todayElementEmoji}
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium">
                                        {elementRelationship.todayElement}
                                    </p>
                                </div>
                            </div>

                            {/* Element Relationship Meaning */}
                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                {transformedElementMeaning}
                            </p>

                            {/* Daily Branch - If available */}
                            {dailyBranch && (
                                <div className="pt-4 border-t border-slate-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">
                                            {dailyBranch.emoji}
                                        </span>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">
                                                {branchLabel} Branch
                                            </p>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {dailyBranch.animal}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {transformedBranchMeaning}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Active Energies */}
                        {activeTenGods && activeTenGods.length > 0 && (
                            <div className="bg-white border border-slate-200 rounded-sm p-6">
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                    Active Energies
                                </h3>
                                <div className="space-y-3">
                                    {displayedEnergies.map((tenGod, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start gap-3 p-3 md:p-4 rounded-sm hover:bg-slate-100 transition-colors ${
                                                tenGod.strength === "amplified"
                                                    ? "bg-amber-50 border border-amber-200"
                                                    : "bg-slate-50"
                                            }`}
                                        >
                                            <div className="text-2xl md:text-3xl flex-shrink-0 relative">
                                                {tenGod.emoji}
                                                {tenGod.strength ===
                                                    "amplified" && (
                                                    <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
                                                        {tenGod.occurrenceCount}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                {/* Title, Amplified badge, and Source badge - same row on desktop, stacked on mobile */}
                                                <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="text-sm md:text-base font-semibold text-slate-900">
                                                            {tenGod.name}
                                                        </h4>
                                                        {tenGod.strength ===
                                                            "amplified" && (
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">
                                                                Amplified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 whitespace-nowrap flex-shrink-0">
                                                        {getSourceLabel(
                                                            tenGod.source,
                                                            tenGod.pillar
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-xs md:text-sm text-slate-500">
                                                    {getCategoryLabel(
                                                        tenGod.category
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Active energies are now free - no unlock card */}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Blessings + Reading */}
                    <div className="space-y-6">
                        {/* Received Blessings */}
                        <TodayReceivedBlessings blessings={receivedBlessings} />

                        {/* Reading Text */}
                        <div className="space-y-4">
                            {transformedReadingParagraphs.map(
                                (paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-base md:text-lg text-slate-700 leading-relaxed"
                                    >
                                        {paragraph}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Modal */}
            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
                onSubscribe={handleSubscribe}
            />
        </section>
    );
}
