"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { CurrentLuckCycle, NextLuckCycle } from "@/types/me";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface MeLuckCycleProps {
    current: CurrentLuckCycle;
    next?: NextLuckCycle; // Optional, paywalled
    isPremium?: boolean;
}

/**
 * Calculate remaining time from expireAt timestamp
 * Updates every second to show live countdown
 */
function useCountdown(expireAt: string) {
    const [remaining, setRemaining] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0 });
    const [endDate] = useState(() => new Date(expireAt));

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = endDate.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining({ years: 0, months: 0, days: 0, hours: 0, minutes: 0 });
                return;
            }

            // Calculate remaining time components
            // Start from end date and work backwards
            const end = new Date(endDate);
            const current = new Date(now);

            let years = end.getFullYear() - current.getFullYear();
            let months = end.getMonth() - current.getMonth();
            let days = end.getDate() - current.getDate();
            let hours = end.getHours() - current.getHours();
            let minutes = end.getMinutes() - current.getMinutes();
            const seconds = end.getSeconds() - current.getSeconds();

            // Adjust for negative values
            if (seconds < 0) {
                minutes--;
            }
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
                // Get days in previous month
                const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            // Ensure non-negative
            years = Math.max(0, years);
            months = Math.max(0, months);
            days = Math.max(0, days);
            hours = Math.max(0, hours);
            minutes = Math.max(0, minutes);

            setRemaining({ years, months, days, hours, minutes });
        };

        // Update immediately
        updateCountdown();

        // Update every second
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [endDate]);

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

    if (remaining.years > 0) {
        parts.push(`${remaining.years}y`);
    }
    if (remaining.months > 0) {
        parts.push(`${remaining.months}m`);
    }
    if (remaining.days > 0) {
        parts.push(`${remaining.days}d`);
    }
    if (remaining.hours > 0) {
        parts.push(`${remaining.hours}h`);
    }
    if (remaining.minutes > 0) {
        parts.push(`${remaining.minutes}min`);
    }

    if (parts.length === 0) {
        return "<1min left";
    }

    return `${parts.join(" ")} left`;
}

export default function MeLuckCycle({
    current,
    next,
    isPremium = false,
}: MeLuckCycleProps) {
    const remaining = useCountdown(current.expireAt);
    const formattedTime = formatRemainingTime(remaining);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        // For now, just close the modal
        setSubscriptionModalOpen(false);
    };

    const handleUnlockNextCycle = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 border-t border-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Your Current Luck Cycle
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 max-w-3xl">
                        Luck cycles are 10-year periods that influence different
                        aspects of your life based on your birth chart. Each cycle
                        brings unique opportunities, challenges, and energy patterns
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
                                    {current.emoji}
                                </div>
                                <span className="text-xs font-mono text-slate-600 tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                    {formattedTime}
                                </span>
                            </div>

                            <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                {current.title}
                            </h4>

                            <p className="text-sm text-slate-500 leading-relaxed">
                                {current.description}
                            </p>
                        </div>
                    </div>

                    {/* Next Luck Cycle Card - Paywalled CTA */}
                    {next && !isPremium && (
                        <button
                            onClick={handleUnlockNextCycle}
                            className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10 flex flex-col justify-between group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl transition-all">
                                        <span className="group-hover:hidden">🔒</span>
                                        <span className="hidden group-hover:inline">🔓</span>
                                    </div>
                                    <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-3 sm:mb-4">
                                    Find Out Your Next Luck Cycle
                                </h4>

                                <p className="text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                                    Discover what opportunities and challenges await
                                    you in your upcoming cycle. Plan ahead with
                                    insights into your next 10-year period.
                                </p>

                                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                                    Unlock Next Cycle
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </button>
                    )}

                    {/* Next Luck Cycle Card - Premium (visible) */}
                    {next && isPremium && (
                        <div className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm">
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl">{next.emoji}</div>
                                    <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                        Next Cycle
                                    </span>
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                    {next.title}
                                </h4>

                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {next.description}
                                </p>
                            </div>
                        </div>
                    )}
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
