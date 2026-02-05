"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DiscoveryCard {
    title: string;
    description: string;
    href: string;
    emoji: string;
    badge?: string;
}

interface TodayDiscoveryFunnelProps {
    context?: "today" | "forecast"; // Context for adjusting messaging
    onTabSwitch?: (tab: string) => void; // Callback for switching tabs when in forecast context
}

export default function TodayDiscoveryFunnel({ context = "today", onTabSwitch }: TodayDiscoveryFunnelProps) {
    const discoveryCards: DiscoveryCard[] = context === "forecast" 
        ? [
            // Forecast page context - emphasize premium forecasts
            {
                        title: "Plan for Next 14 Days",
                        description:
                            "Get detailed insights to plan your next two weeks ahead with strategic timing.",
                href: "/forecast#monthly",
                emoji: "📅",
            },
            {
                title: "Find Your Ideal Partner",
                description:
                    "Find out who you're most compatible with and discover your perfect match.",
                href: "/compatibility",
                emoji: "💕",
            },
            {
                title: "Discover Your Strengths",
                description:
                    "Discover what makes you unique and unlock your natural talents.",
                href: "/me",
                emoji: "✨",
            },
        ]
        : [
            // Today page context - original cards
            {
                title: "Find Your Ideal Partner",
                description:
                    "Find out who you're most compatible with and discover your perfect match.",
                href: "/compatibility",
                emoji: "💕",
            },
            {
                title: "Know Your Best Timing",
                description:
                    "See when your best chances for success are coming and plan ahead.",
                href: "/forecast",
                emoji: "📅",
            },
            {
                title: "Discover Your Strengths",
                description:
                    "Discover what makes you unique and unlock your natural talents.",
                href: "/me",
                emoji: "✨",
                badge: "New",
            },
        ];

    return (
        <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-slate-50 w-screen relative left-1/2 -translate-x-1/2">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header - Minified */}
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-medium tracking-tighter text-slate-900 mb-1">
                        Explore More
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {context === "forecast" 
                            ? "Plan ahead with longer-term insights and deeper analysis"
                            : "Discover deeper insights about your chart and future"}
                    </p>
                </div>

                {/* Discovery Cards - Compact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {discoveryCards.map((card, index) => {
                        // For forecast context, use buttons to switch tabs instead of links
                        if (context === "forecast" && card.href.includes("#monthly")) {
                            const tabKey = "monthly";
                            return (
                                <button
                                    key={`${card.title}-${index}`}
                                    onClick={() => {
                                        if (tabKey && onTabSwitch) {
                                            onTabSwitch(tabKey);
                                        }
                                    }}
                                    className="group bg-white border border-slate-200 rounded-sm p-4 md:p-5 hover:border-slate-900 hover:shadow-md transition-all duration-200 flex items-center gap-3 md:gap-4 w-full text-left"
                                    title={card.description}
                                >
                                    {/* Emoji - Grayscaled with hover effect */}
                                    <div className="flex-shrink-0 text-2xl md:text-3xl md:grayscale md:opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                                        {card.emoji}
                                    </div>

                                    {/* Title + Badge */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-base md:text-lg font-medium text-slate-900 tracking-tight truncate">
                                                {card.title}
                                            </h3>
                                            {card.badge && (
                                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                                    {card.badge}
                                                </span>
                                            )}
                                        </div>
                                        {/* Description - Hidden, shown on hover via title attribute */}
                                        <p className="text-xs text-slate-500 line-clamp-1 hidden md:block">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </button>
                            );
                        }
                        
                        // Regular link for other cases
                        return (
                            <Link
                                key={`${card.href}-${index}`}
                                href={card.href}
                                className="group bg-white border border-slate-200 rounded-sm p-4 md:p-5 hover:border-slate-900 hover:shadow-md transition-all duration-200 flex items-center gap-3 md:gap-4"
                                title={card.description}
                            >
                            {/* Emoji - Grayscaled with hover effect */}
                            <div className="flex-shrink-0 text-2xl md:text-3xl md:grayscale md:opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                                {card.emoji}
                            </div>

                            {/* Title + Badge */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base md:text-lg font-medium text-slate-900 tracking-tight truncate">
                                        {card.title}
                                    </h3>
                                    {card.badge && (
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                            {card.badge}
                                        </span>
                                    )}
                                </div>
                                {/* Description - Hidden, shown on hover via title attribute */}
                                <p className="text-xs text-slate-500 line-clamp-1 hidden md:block">
                                    {card.description}
                                </p>
                            </div>

                            {/* Arrow */}
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
