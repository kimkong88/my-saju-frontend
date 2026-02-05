"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import type {
    FourPillars,
    FourPillar,
    ElementDistribution,
    Identity,
    Rarity,
    ChartMeaning,
} from "@/types/report";
import type { CurrentLuckCycle, NextLuckCycle } from "@/types/me";

/**
 * Calculate remaining time from expireAt timestamp
 * Updates every second to show live countdown
 */
function useCountdown(expireAt: string) {
    const [remaining, setRemaining] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
    });
    const [endDate] = useState(() =>
        expireAt ? new Date(expireAt) : new Date(0)
    );

    useEffect(() => {
        if (!expireAt) return; // Don't run countdown if no expireAt provided

        const updateCountdown = () => {
            const now = new Date();
            const diff = endDate.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining({
                    years: 0,
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                });
                return;
            }

            const end = new Date(endDate);
            const current = new Date(now);

            let years = end.getFullYear() - current.getFullYear();
            let months = end.getMonth() - current.getMonth();
            let days = end.getDate() - current.getDate();
            let hours = end.getHours() - current.getHours();
            let minutes = end.getMinutes() - current.getMinutes();
            const seconds = end.getSeconds() - current.getSeconds();

            if (seconds < 0) minutes--;
            if (minutes < 0) {
                hours--;
                minutes += 60;
            }
            if (hours < 0) {
                days--;
                hours += 24;
            }
            if (days < 0) {
                months--;
                const prevMonth = new Date(
                    current.getFullYear(),
                    current.getMonth(),
                    0
                );
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            years = Math.max(0, years);
            months = Math.max(0, months);
            days = Math.max(0, days);
            hours = Math.max(0, hours);
            minutes = Math.max(0, minutes);

            setRemaining({ years, months, days, hours, minutes });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [endDate, expireAt]);

    return remaining;
}

/**
 * Format remaining time into shortened string (e.g., "2y 3m 15d 4h 30min left")
 */
function formatRemainingTime(remaining: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
}): string {
    const parts: string[] = [];
    if (remaining.years > 0) parts.push(`${remaining.years}y`);
    if (remaining.months > 0) parts.push(`${remaining.months}m`);
    if (remaining.days > 0) parts.push(`${remaining.days}d`);
    if (remaining.hours > 0) parts.push(`${remaining.hours}h`);
    if (remaining.minutes > 0) parts.push(`${remaining.minutes}min`);
    if (parts.length === 0) return "<1min left";
    return `${parts.join(" ")} left`;
}

export default function BirthChartSection({
    fourPillars,
    elementDistribution,
    identity,
    rarity,
    chartMeaning,
    luckCycles,
    isPremium = false,
}: {
    fourPillars?: FourPillars;
    elementDistribution: ElementDistribution;
    identity: Identity;
    rarity?: Rarity;
    chartMeaning?: ChartMeaning;
    luckCycles?: {
        current: CurrentLuckCycle;
        next?: NextLuckCycle;
    };
    isPremium?: boolean;
}) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        setSubscriptionModalOpen(false);
    };

    const handleUnlockNextCycle = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };
    // Always call useCountdown hook, but only if we have luckCycles data
    const expireAt = luckCycles?.current.expireAt || "";
    const remaining = useCountdown(expireAt);
    const formattedTime =
        luckCycles && remaining ? formatRemainingTime(remaining) : "";
    return (
        <section
            id="birth-chart"
            className="py-24 md:py-40 px-6 xl:px-0 border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Your Birth Chart.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mb-8">
                        We translate 3,000-year-old Bazi wisdom into actionable
                        modern insights. Your birth chart is calculated from
                        your exact birth moment—this is your personality
                        blueprint, decoded.
                    </p>
                </div>

                {/* Chart Meaning Section - Moved to top */}
                {chartMeaning && (
                    <div className="max-w-4xl mb-12 md:mb-16">
                        {/* Summary */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                What This Means
                            </h3>
                            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                                {chartMeaning.summary}
                            </p>
                        </div>

                        {/* Implications */}
                        {chartMeaning.implications &&
                            chartMeaning.implications.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                        Key Implications
                                    </h4>
                                    <ul className="space-y-3">
                                        {chartMeaning.implications.map(
                                            (implication, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="text-slate-300 mt-1.5 flex-shrink-0">
                                                        •
                                                    </span>
                                                    <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                                        {implication}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                        {/* So What / Interaction Explanation */}
                        <div className="space-y-4">
                            <div className="text-base md:text-lg text-slate-900 leading-relaxed">
                                {(() => {
                                    // Extract and highlight the archetype name
                                    const soWhatText = chartMeaning.soWhat;
                                    const archetypeName =
                                        identity?.title ||
                                        "The Focused Refiner";

                                    // Find the archetype name in the text
                                    const archetypeIndex =
                                        soWhatText.indexOf(archetypeName);

                                    if (archetypeIndex !== -1) {
                                        const beforeArchetype =
                                            soWhatText.substring(
                                                0,
                                                archetypeIndex
                                            );
                                        const afterArchetype =
                                            soWhatText.substring(
                                                archetypeIndex +
                                                    archetypeName.length
                                            );

                                        return (
                                            <>
                                                {beforeArchetype && (
                                                    <span className="font-medium">
                                                        {beforeArchetype}
                                                    </span>
                                                )}
                                                <span className="inline-block bg-slate-900 text-white px-3 py-1.5 font-bold text-lg md:text-xl tracking-tight mx-1 my-1">
                                                    {archetypeName}
                                                </span>
                                                {afterArchetype && (
                                                    <span className="font-medium">
                                                        {afterArchetype}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }
                                    // Fallback if pattern not found
                                    return (
                                        <span className="font-medium">
                                            {soWhatText}
                                        </span>
                                    );
                                })()}
                            </div>
                            {chartMeaning.interactionExplanation && (
                                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-300 pl-4">
                                    {chartMeaning.interactionExplanation}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Unified Card Design */}
                <div className="bg-white border border-slate-200 p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                        {/* Left: Four Pillars */}
                        {fourPillars && (
                            <div className="flex flex-col lg:pr-12">
                                <div className="mb-6">
                                    <h3 className="mb-6 text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                        Your Birth Chart
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        <strong className="text-slate-900">
                                            The Four Pillars
                                        </strong>{" "}
                                        calculated from your birth data
                                    </p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {[
                                        {
                                            key: "year",
                                            label: "Year",
                                            data: fourPillars.year as FourPillar,
                                        },
                                        {
                                            key: "month",
                                            label: "Month",
                                            data: fourPillars.month as FourPillar,
                                        },
                                        {
                                            key: "day",
                                            label: "Day",
                                            data: fourPillars.day as FourPillar,
                                        },
                                        {
                                            key: "hour",
                                            label: "Hour",
                                            data: fourPillars.hour as FourPillar,
                                        },
                                    ].map((pillar) => {
                                        const hasData =
                                            pillar.data !== null &&
                                            pillar.data !== undefined;
                                        const isCore = hasData
                                            ? pillar.data.isCore ?? false
                                            : false;

                                        return (
                                            <div
                                                key={pillar.key}
                                                className={`relative transition-all ${
                                                    isCore
                                                        ? "bg-slate-900 text-white p-5 md:p-6"
                                                        : "bg-slate-50 p-5 md:p-6 border border-slate-200"
                                                }`}
                                            >
                                                {isCore && (
                                                    <div className="absolute -top-2 -right-2 bg-white text-slate-900 text-[8px] font-bold uppercase tracking-wider px-2 py-1 border border-slate-900">
                                                        Core
                                                    </div>
                                                )}

                                                <div className="flex flex-col">
                                                    <div className="mb-3">
                                                        <div className="text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                                                            {pillar.label}
                                                        </div>
                                                        {hasData && (
                                                            <div className="text-xs opacity-80 italic mb-2">
                                                                {
                                                                    pillar.data
                                                                        .aspect
                                                                }
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div
                                                            className={`text-base md:text-lg font-semibold ${
                                                                isCore
                                                                    ? "text-white"
                                                                    : "text-slate-900"
                                                            }`}
                                                        >
                                                            {hasData ? (
                                                                pillar.data
                                                                    .meaning
                                                            ) : (
                                                                <span className="text-slate-400 italic">
                                                                    Not
                                                                    available
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 pt-4">
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        The{" "}
                                        <strong className="text-slate-700">
                                            Day Pillar
                                        </strong>{" "}
                                        represents your core self—your
                                        fundamental personality and how you
                                        interact with the world.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Right: Elemental Distribution */}
                        <div className="flex flex-col justify-between">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    Structural Distribution
                                </h3>
                            </div>

                            <div className="space-y-6 flex-0 mb-6">
                                {[
                                    {
                                        key: "fire",
                                        label: "Fire",
                                        color: "bg-rose-500",
                                    },
                                    {
                                        key: "earth",
                                        label: "Earth",
                                        color: "bg-amber-700",
                                    },
                                    {
                                        key: "metal",
                                        label: "Metal",
                                        color: "bg-slate-400",
                                    },
                                    {
                                        key: "water",
                                        label: "Water",
                                        color: "bg-blue-600",
                                    },
                                    {
                                        key: "wood",
                                        label: "Wood",
                                        color: "bg-emerald-600",
                                    },
                                ].map((el) => {
                                    const value =
                                        elementDistribution.percentages[
                                            el.key as keyof typeof elementDistribution.percentages
                                        ] || 0;
                                    const isDominant =
                                        elementDistribution.dominant.includes(
                                            el.label
                                        );

                                    return (
                                        <div key={el.key} className="relative">
                                            <div className="flex justify-between items-end mb-1.5">
                                                <span
                                                    className={`text-sm font-bold tracking-widest uppercase ${
                                                        isDominant
                                                            ? "text-slate-900"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    {el.label}{" "}
                                                    {isDominant && "— Dominant"}
                                                </span>
                                                <span className="text-xs font-mono text-slate-400">
                                                    {value}%
                                                </span>
                                            </div>

                                            <div className="h-1.5 w-full bg-slate-50 overflow-hidden border border-slate-100/50">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out ${
                                                        value > 0
                                                            ? el.color
                                                            : "bg-transparent"
                                                    }`}
                                                    style={{
                                                        width: `${value}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            <div className="mt-8">
                                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                                    {elementDistribution.explanation}
                                </p>
                            </div>

                            {/* Rarity - Combined */}
                            {(rarity?.elementDistribution ||
                                rarity?.overall) && (
                                <div className="mt-8">
                                    <div className="bg-slate-50 border border-slate-200 p-4 md:p-5">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Rarity
                                        </div>
                                        <div className="space-y-3">
                                            {rarity?.elementDistribution && (
                                                <p className="text-sm text-slate-700 leading-relaxed">
                                                    This elemental distribution
                                                    pattern appears in{" "}
                                                    <strong className="text-slate-900 font-semibold">
                                                        {
                                                            rarity
                                                                .elementDistribution
                                                                .percentage
                                                        }
                                                        %
                                                    </strong>{" "}
                                                    of all charts.
                                                </p>
                                            )}
                                            {identity && rarity?.overall && (
                                                <div className="pt-3 border-t border-slate-200">
                                                    <p className="text-sm text-slate-700 leading-relaxed mb-2">
                                                        Your complete chart
                                                        signature:{" "}
                                                        <strong className="text-slate-900 font-semibold">
                                                            {identity.code} +{" "}
                                                            {elementDistribution.dominant.join(
                                                                " "
                                                            )}{" "}
                                                            Dominance
                                                        </strong>
                                                    </p>
                                                    <p className="text-sm text-slate-700 leading-relaxed">
                                                        This exact combination
                                                        (including Day Master
                                                        type, element
                                                        distribution, and all
                                                        special patterns)
                                                        appears in{" "}
                                                        <strong className="text-slate-900 font-semibold">
                                                            1 in{" "}
                                                            {rarity.overall.oneIn.toLocaleString()}
                                                        </strong>{" "}
                                                        people.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Luck Cycle Subsection - Similar to "What Makes You Special" in WhoYouAre */}
                {luckCycles && (
                    <div className="mt-12 md:mt-16">
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                Your Current Luck Cycle
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-2">
                                Luck cycles are 10-year periods that influence
                                different aspects of your life based on your
                                birth chart. Each cycle brings unique
                                opportunities, challenges, and energy patterns
                                that shape your experiences and decisions.
                            </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Current Luck Cycle Card */}
                            <div className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between md:hover:bg-slate-50 transition-colors group border border-slate-200 rounded-sm">
                                <div>
                                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                                        <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                            {luckCycles.current.emoji}
                                        </div>
                                        <span className="text-xs font-mono text-slate-600 tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                            {formattedTime}
                                        </span>
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                        {luckCycles.current.title}
                                    </h4>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {luckCycles.current.description}
                                    </p>
                                </div>
                            </div>

                            {/* Next Luck Cycle Card - Paywalled CTA */}
                            {luckCycles.next && !isPremium && (
                                <button
                                    onClick={handleUnlockNextCycle}
                                    className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10 flex flex-col justify-between group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                                            <div className="text-2xl transition-all">
                                                <span className="group-hover:hidden">
                                                    🔒
                                                </span>
                                                <span className="hidden group-hover:inline">
                                                    🔓
                                                </span>
                                            </div>
                                            <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                        </div>

                                        <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-3 sm:mb-4">
                                            Find Out Your Next Luck Cycle
                                        </h4>

                                        <p className="text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                                            Discover what opportunities and
                                            challenges await you in your
                                            upcoming cycle. Plan ahead with
                                            insights into your next 10-year
                                            period.
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                                            Unlock Next Cycle
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </button>
                            )}

                            {/* Next Luck Cycle Card - Premium (visible) */}
                            {luckCycles.next && isPremium && (
                                <div className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm">
                                    <div>
                                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                                            <div className="text-2xl">
                                                {luckCycles.next.emoji}
                                            </div>
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                Next Cycle
                                            </span>
                                        </div>

                                        <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                            {luckCycles.next.title}
                                        </h4>

                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {luckCycles.next.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
