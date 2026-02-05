"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface GoodThing {
    emoji: string;
    title: string;
    description: string;
    howToMaximize?: string; // Optional guidance on how to maximize this opportunity
    technicalBasis?: string[]; // Optional technical basis
}

interface TodayGoodThingsProps {
    items: GoodThing[];
    timeframe?: "today" | "tomorrow"; // Default to "today"
    isPremium?: boolean; // Default to false (free user)
}

/**
 * Obfuscate text by replacing characters with dots/dashes while preserving structure
 */
function obfuscateText(text: string): string {
    return text
        .split("")
        .map((char) => {
            if (char === " ") return " ";
            if (char === "\n") return "\n";
            if (char === ".") return ".";
            if (char === ",") return ",";
            if (char === "!") return "!";
            if (char === "?") return "?";
            if (char === "-") return "-";
            // Replace letters and numbers with dots/dashes
            return Math.random() > 0.5 ? "•" : "▪";
        })
        .join("");
}

export default function TodayGoodThings({
    items,
    timeframe = "today",
    isPremium = false,
}: TodayGoodThingsProps) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    if (items.length === 0) {
        return null;
    }

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

    // Show all items, but blur/obfuscate after first for free users
    const remainingCount = isPremium ? 0 : Math.max(0, items.length - 1);

    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        setSubscriptionModalOpen(false);
    };

    return (
        <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-gradient-to-b from-emerald-50/30 to-white w-screen relative left-1/2 -translate-x-1/2">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Good Things
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Potential good things that may happen{" "}
                        {timeframe === "tomorrow" ? "tomorrow" : "today"} based
                        on your energy patterns
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => {
                        const isFirstItem = index === 0;
                        const shouldShow = isPremium || isFirstItem;

                        return (
                            <div
                                key={index}
                                className={`bg-white p-8 md:p-10 flex flex-col justify-between transition-colors group border border-emerald-200/50 rounded-sm ${
                                    shouldShow
                                        ? "md:hover:bg-emerald-50/50"
                                        : "blur-sm pointer-events-none select-none opacity-60"
                                }`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div
                                            className={`text-2xl transition-all ${
                                                shouldShow
                                                    ? "md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0"
                                                    : "opacity-40"
                                            }`}
                                        >
                                            {item.emoji}
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
                                        {shouldShow
                                            ? item.title
                                            : obfuscateText(item.title)}
                                    </h4>

                                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                        {shouldShow
                                            ? transformText(item.description)
                                            : obfuscateText(
                                                  transformText(
                                                      item.description
                                                  )
                                              )}
                                    </p>

                                    {/* How to Maximize */}
                                    {item.howToMaximize && (
                                        <div className="pt-3 border-t border-emerald-100">
                                            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider mb-1">
                                                How to maximize
                                            </p>
                                            <p className="text-sm text-emerald-900 leading-relaxed">
                                                {shouldShow
                                                    ? transformText(
                                                          item.howToMaximize
                                                      )
                                                    : obfuscateText(
                                                          transformText(
                                                              item.howToMaximize
                                                          )
                                                      )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Single Unlock Button - After all items for free users */}
                    {!isPremium && remainingCount > 0 && (
                        <div className="col-span-full flex justify-center mt-4">
                            <button
                                onClick={handleUnlock}
                                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-4 flex items-center gap-3 group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-xl transition-all">
                                    <span className="group-hover:hidden">
                                        🔒
                                    </span>
                                    <span className="hidden group-hover:inline">
                                        🔓
                                    </span>
                                </div>
                                <div>
                                    <div className="text-base font-medium text-white">
                                        Unlock {remainingCount} More Good Thing
                                        {remainingCount > 1 ? "s" : ""}
                                    </div>
                                    <div className="text-xs text-white/70">
                                        See all opportunities and actionable
                                        guidance
                                    </div>
                                </div>
                                <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white transition-colors ml-auto" />
                            </button>
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
