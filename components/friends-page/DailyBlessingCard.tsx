"use client";

import { useState, useEffect, useMemo } from "react";
import { Sparkles, Clock } from "lucide-react";

interface DailyBlessingCardProps {
    hasBlessing: boolean; // Whether user has a blessing available
    expiresAt?: string; // ISO string - when the blessing expires (if available)
}

/**
 * Simple countdown hook for hours/minutes (24h expiration)
 */
function useBlessingCountdown(expiresAt: string | undefined) {
    const [remaining, setRemaining] = useState({ hours: 0, minutes: 0 });

    // Memoize the end date to prevent infinite loops
    const endDate = useMemo(() => {
        if (!expiresAt) return null;
        return new Date(expiresAt);
    }, [expiresAt]);

    useEffect(() => {
        if (!endDate) {
            return;
        }

        const updateCountdown = () => {
            const now = new Date();
            const diff = endDate.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining({ hours: 0, minutes: 0 });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setRemaining({
                hours: Math.max(0, hours),
                minutes: Math.max(0, minutes),
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [endDate]); // Use endDate instead of expiresAt

    return remaining;
}

function formatBlessingTime(remaining: {
    hours: number;
    minutes: number;
}): string {
    if (remaining.hours === 0 && remaining.minutes === 0) {
        return "Expired";
    }
    if (remaining.hours > 0) {
        return `${remaining.hours}h ${remaining.minutes}m left`;
    }
    return `${remaining.minutes}m left`;
}

export default function DailyBlessingCard({
    hasBlessing,
    expiresAt,
}: DailyBlessingCardProps) {
    // Always call the hook (Rules of Hooks) - pass undefined if not available
    // Must call hook before any conditional returns
    const remaining = useBlessingCountdown(expiresAt);
    const timeText = expiresAt ? formatBlessingTime(remaining) : null;

    if (!hasBlessing) {
        // No blessing available - don't show anything for now
        // Later: can add conversion hook for free users
        return null;
    }

    return (
        <div className="mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-sm p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl bg-amber-100 border border-amber-200">
                            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-semibold text-amber-900 mb-0.5">
                                1 Blessing Available
                            </h3>
                            <p className="text-sm text-amber-800">
                                Send a blessing to someone in your compatibility
                                list today.
                            </p>
                        </div>
                    </div>

                    {timeText && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 flex-shrink-0 sm:ml-auto self-end sm:self-auto">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{timeText}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
