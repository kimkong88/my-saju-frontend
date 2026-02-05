"use client";

import { useState } from "react";
import { Sparkles, Lock } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface DailyCalendarItem {
    date: string;
    dayOfWeek?: string;
    element: string;
    elementEmoji: string;
    animal: string;
    animalEmoji: string;
    isPeak?: boolean;
    isWorst?: boolean;
    isTransition?: boolean;
}

interface BestWorstDays {
    career?: Array<{ date: string }>;
    relationship?: Array<{ date: string }>;
    creativity?: Array<{ date: string }>;
    wealth?: Array<{ date: string }>;
    health?: Array<{ date: string }>;
    rest?: Array<{ date: string }>;
}

interface MonthlyCalendarProps {
    days: DailyCalendarItem[];
    startDate?: string; // ISO date (optional for new structure)
    endDate?: string; // ISO date (optional for new structure)
    bestDays?: BestWorstDays;
    worstDays?: BestWorstDays;
    isPremium?: boolean; // Default to false (free user)
}

function getCategoryEmoji(category: string): string {
    switch (category) {
        case "career":
            return "💼";
        case "relationship":
            return "❤️";
        case "relationships":
            return "❤️";
        case "creativity":
            return "✨";
        case "wealth":
            return "💰";
        case "health":
            return "💪";
        case "rest":
            return "😴";
        default:
            return "📅";
    }
}

function getCategoryLabel(category: string): string {
    switch (category) {
        case "career":
            return "Career";
        case "relationship":
            return "Relationships";
        case "relationships":
            return "Relationships";
        case "creativity":
            return "Creativity";
        case "wealth":
            return "Wealth";
        case "health":
            return "Health";
        case "rest":
            return "Rest";
        default:
            return category;
    }
}

// Helper to format date for display
function formatDateShort(dateStr: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        try {
            const [year, month, day] = dateStr.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    }
    return dateStr;
}

export default function MonthlyCalendar({
    days,
    startDate: _startDate,
    endDate: _endDate,
    bestDays,
    worstDays,
    isPremium = false,
}: MonthlyCalendarProps) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    // For free users, show only first category (Career) for best/worst days; for premium, show all
    const getDisplayedCategories = (
        categories: BestWorstDays | undefined
    ): BestWorstDays | undefined => {
        if (!categories) return undefined;
        if (isPremium) return categories;

        // For free users, show only "career" category if available
        const displayed: BestWorstDays = {};
        if (categories.career && categories.career.length > 0) {
            displayed.career = categories.career;
        }
        return Object.keys(displayed).length > 0 ? displayed : undefined;
    };

    const displayedBestDays = getDisplayedCategories(bestDays);
    const displayedWorstDays = getDisplayedCategories(worstDays);

    // Count remaining categories
    const allBestCategories = bestDays
        ? Object.keys(bestDays).filter(
              (key) =>
                  bestDays[key as keyof BestWorstDays] &&
                  bestDays[key as keyof BestWorstDays]!.length > 0
          )
        : [];
    const displayedBestCategories = displayedBestDays
        ? Object.keys(displayedBestDays)
        : [];
    const remainingBestCategoriesCount =
        allBestCategories.length - displayedBestCategories.length;

    const allWorstCategories = worstDays
        ? Object.keys(worstDays).filter(
              (key) =>
                  worstDays[key as keyof BestWorstDays] &&
                  worstDays[key as keyof BestWorstDays]!.length > 0
          )
        : [];
    const displayedWorstCategories = displayedWorstDays
        ? Object.keys(displayedWorstDays)
        : [];
    const remainingWorstCategoriesCount =
        allWorstCategories.length - displayedWorstCategories.length;

    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        setSubscriptionModalOpen(false);
    };

    if (!days || days.length === 0) {
        return null;
    }

    // Format date for display - parse YYYY-MM-DD string directly without timezone conversion
    const formatDate = (dateStr: string): string => {
        // If already formatted (contains letters), return as-is
        if (dateStr.includes(",")) {
            return dateStr.split(",")[0];
        }
        // If ISO format (YYYY-MM-DD), parse directly without timezone conversion
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            try {
                const [year, month, day] = dateStr.split("-").map(Number);
                const date = new Date(year, month - 1, day); // Use local date constructor to avoid timezone shift
                return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });
            } catch {
                return dateStr;
            }
        }
        // Fallback for other formats
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        14-Day Calendar
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Daily element and animal for each day in your forecast
                        period
                    </p>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
                    {days.map((day, index) => {
                        const isSelected = selectedDay === index;
                        const isToday = false; // Could check if date matches today

                        return (
                            <button
                                key={index}
                                onClick={() =>
                                    setSelectedDay(isSelected ? null : index)
                                }
                                className={`
                                    relative p-3 md:p-4 rounded-sm border transition-all text-left group
                                    ${
                                        isSelected
                                            ? "border-slate-900 bg-slate-50 shadow-lg scale-105 z-10"
                                            : isPremium && day.isPeak
                                            ? "border-slate-200 bg-emerald-50/50 hover:border-slate-400 hover:shadow-md hover:bg-emerald-50"
                                            : isPremium && day.isWorst
                                            ? "border-slate-200 bg-amber-50/50 hover:border-slate-400 hover:shadow-md hover:bg-amber-50"
                                            : "border-slate-200 bg-slate-50 hover:border-slate-400 hover:shadow-md hover:bg-slate-100"
                                    }
                                    ${
                                        isToday
                                            ? "ring-2 ring-amber-400 ring-offset-2"
                                            : ""
                                    }
                                `}
                            >
                                {/* Peak Indicator - Top Right - Premium only */}
                                {isPremium && day.isPeak && (
                                    <div className="absolute top-1.5 right-1.5">
                                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow-sm">
                                            ⭐
                                        </span>
                                    </div>
                                )}

                                {/* Worst Indicator - Top Right (if not peak) - Premium only */}
                                {isPremium && day.isWorst && !day.isPeak && (
                                    <div className="absolute top-1.5 right-1.5">
                                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold shadow-sm">
                                            ⚠
                                        </span>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="mb-2.5">
                                    {day.dayOfWeek && (
                                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                                            {day.dayOfWeek}
                                        </div>
                                    )}
                                    <div className="text-sm font-semibold text-slate-900 leading-tight">
                                        {formatDate(day.date)}
                                    </div>
                                </div>

                                {/* Daily Element & Animal */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xl leading-none">
                                            {day.elementEmoji}
                                        </span>
                                        <span className="text-xs font-medium text-slate-700 truncate leading-tight">
                                            {day.element.split("-")[0]}{" "}
                                            {/* Just "FIRE" part */}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-lg leading-none">
                                            {day.animalEmoji}
                                        </span>
                                        <span className="text-xs text-slate-600 truncate leading-tight">
                                            {day.animal}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Details (when selected) */}
                                {isSelected && (
                                    <div className="mt-3 pt-3 border-t border-slate-200">
                                        <div className="text-xs text-slate-600 space-y-1">
                                            <div>
                                                <span className="font-medium">
                                                    Element:{" "}
                                                </span>
                                                <span>{day.element}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Animal:{" "}
                                                </span>
                                                <span>{day.animal}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Unlock Peak/Worst Days Card - For free users */}
                {!isPremium && (
                    <div className="mt-8">
                        <button
                            onClick={handleUnlock}
                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 flex flex-col group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left w-full"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-xl transition-all">
                                    <span className="group-hover:hidden">
                                        🔒
                                    </span>
                                    <span className="hidden group-hover:inline">
                                        🔓
                                    </span>
                                </div>
                                <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                            </div>

                            <h4 className="text-base font-medium text-white tracking-tight mb-1.5">
                                Unlock Peak & Challenging Days
                            </h4>

                            <p className="text-xs text-white/80 leading-relaxed mb-2.5">
                                See which days are optimal for action and which
                                to approach with caution. Get visual indicators
                                on your calendar and detailed best/worst days by
                                category.
                            </p>

                            <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90 group-hover:text-white group-hover:gap-3 transition-all mt-auto">
                                Unlock Calendar Insights
                                <Lock className="w-3.5 h-3.5 group-hover:hidden" />
                                <Sparkles className="w-3.5 h-3.5 hidden group-hover:inline" />
                            </div>
                        </button>
                    </div>
                )}

                {/* Best Days & Worst Days - Compact date-only display - Premium only */}
                {isPremium && (bestDays || worstDays) && (
                    <div className="mt-12 pt-12 border-t border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {/* Best Days */}
                            {displayedBestDays &&
                                Object.values(displayedBestDays).some(
                                    (days) => days && days.length > 0
                                ) && (
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-900 mb-4">
                                            Best Days
                                        </h3>
                                        <div className="space-y-4">
                                            {Object.entries(
                                                displayedBestDays
                                            ).map(([category, items]) => {
                                                if (
                                                    !items ||
                                                    items.length === 0
                                                )
                                                    return null;
                                                return (
                                                    <div
                                                        key={category}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <span className="text-lg flex-shrink-0">
                                                            {getCategoryEmoji(
                                                                category
                                                            )}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                                {getCategoryLabel(
                                                                    category
                                                                )}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {items.map(
                                                                    (
                                                                        item,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                                        >
                                                                            {formatDateShort(
                                                                                item.date
                                                                            )}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                            {/* Worst Days */}
                            {displayedWorstDays &&
                                Object.values(displayedWorstDays).some(
                                    (days) => days && days.length > 0
                                ) && (
                                    <div>
                                        <h3 className="text-lg font-medium text-slate-900 mb-4">
                                            Days to Avoid
                                        </h3>
                                        <div className="space-y-4">
                                            {Object.entries(
                                                displayedWorstDays
                                            ).map(([category, items]) => {
                                                if (
                                                    !items ||
                                                    items.length === 0
                                                )
                                                    return null;
                                                return (
                                                    <div
                                                        key={category}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <span className="text-lg flex-shrink-0">
                                                            {getCategoryEmoji(
                                                                category
                                                            )}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                                {getCategoryLabel(
                                                                    category
                                                                )}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {items.map(
                                                                    (
                                                                        item,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
                                                                        >
                                                                            {formatDateShort(
                                                                                item.date
                                                                            )}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                            {/* Unlock Card for Best Days - Show if there are remaining categories */}
                            {!isPremium && remainingBestCategoriesCount > 0 && (
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handleUnlock}
                                        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 flex flex-col group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left w-full"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xl transition-all">
                                                <span className="group-hover:hidden">
                                                    🔒
                                                </span>
                                                <span className="hidden group-hover:inline">
                                                    🔓
                                                </span>
                                            </div>
                                            <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                        </div>

                                        <h4 className="text-base font-medium text-white tracking-tight mb-1.5">
                                            Unlock All Best Days
                                        </h4>

                                        <p className="text-xs text-white/80 leading-relaxed mb-2.5">
                                            See optimal timing for{" "}
                                            <span className="font-semibold text-white">
                                                {remainingBestCategoriesCount}{" "}
                                                more categor
                                                {remainingBestCategoriesCount >
                                                1
                                                    ? "ies"
                                                    : "y"}
                                            </span>{" "}
                                            including Relationships, Creativity,
                                            Wealth, Health, and more.
                                        </p>

                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90 group-hover:text-white group-hover:gap-3 transition-all mt-auto">
                                            Unlock All Categories
                                            <Lock className="w-3.5 h-3.5 group-hover:hidden" />
                                            <Sparkles className="w-3.5 h-3.5 hidden group-hover:inline" />
                                        </div>
                                    </button>
                                </div>
                            )}

                            {/* Unlock Card for Worst Days - Show if there are remaining categories */}
                            {!isPremium &&
                                remainingWorstCategoriesCount > 0 && (
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={handleUnlock}
                                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 flex flex-col group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left w-full"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="text-xl transition-all">
                                                    <span className="group-hover:hidden">
                                                        🔒
                                                    </span>
                                                    <span className="hidden group-hover:inline">
                                                        🔓
                                                    </span>
                                                </div>
                                                <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                            </div>

                                            <h4 className="text-base font-medium text-white tracking-tight mb-1.5">
                                                Unlock All Days to Avoid
                                            </h4>

                                            <p className="text-xs text-white/80 leading-relaxed mb-2.5">
                                                See challenging timing for{" "}
                                                <span className="font-semibold text-white">
                                                    {
                                                        remainingWorstCategoriesCount
                                                    }{" "}
                                                    more categor
                                                    {remainingWorstCategoriesCount >
                                                    1
                                                        ? "ies"
                                                        : "y"}
                                                </span>{" "}
                                                including Relationships,
                                                Creativity, Wealth, Health, and
                                                more.
                                            </p>

                                            <div className="inline-flex items-center gap-2 text-xs font-medium text-white/90 group-hover:text-white group-hover:gap-3 transition-all mt-auto">
                                                Unlock All Categories
                                                <Lock className="w-3.5 h-3.5 group-hover:hidden" />
                                                <Sparkles className="w-3.5 h-3.5 hidden group-hover:inline" />
                                            </div>
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Legend - Premium only */}
                {isPremium && (
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                                ⭐
                            </span>
                            <span>Peak day</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                                ⚠
                            </span>
                            <span>Challenging day</span>
                        </div>
                        <div className="text-slate-400">
                            Click a day to see details
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
