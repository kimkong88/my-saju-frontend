"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreMoreSection() {
    const features = [
        {
            title: "Today",
            description:
                "Your personal energy calendar—know exactly which days to launch projects, make big decisions, or take calculated risks. Stop guessing when you'll be at your best.",
            href: "/today",
            emoji: "📅",
        },
        {
            title: "Forecast",
            description:
                "See your 10-year cycles and major life transitions before they happen—plan your career moves, relationships, and investments with precision. Never be blindsided by timing again.",
            href: "/forecast",
            emoji: "🔮",
        },
        {
            title: "Compatibility",
            description:
                "Discover the best times to connect with partners, colleagues, and friends—understand relationship timing and compatibility. Know when to have difficult conversations.",
            href: "/compatibility",
            emoji: "💕",
        },
    ];

    return (
        <section
            id="explore-more"
            className="py-24 md:py-40 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        What&apos;s Next?
                    </h2>
                    <div className="space-y-6 mb-12">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            You now know{" "}
                            <strong className="text-slate-900 font-semibold">
                                WHO you are
                            </strong>
                            —your core personality patterns, natural strengths,
                            and how you operate at your best.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            Ready to discover{" "}
                            <strong className="text-slate-900 font-semibold">
                                WHEN you&apos;re at your best
                            </strong>
                            ? Explore your energy cycles, timing, and
                            relationships.
                        </p>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {features.map((feature, index) => {
                        return (
                            <Link
                                key={index}
                                href={feature.href}
                                className="bg-white border border-slate-200 p-8 md:p-10 relative group hover:border-slate-900 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Header Row - Emoji and Title */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-3xl md:text-4xl flex-shrink-0">
                                        {feature.emoji}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight flex-1">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6 flex-1">
                                    {feature.description}
                                </p>

                                {/* CTA Link */}
                                <div className="mt-auto pt-6 border-t border-slate-200">
                                    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:gap-3 transition-all">
                                        Explore {feature.title}
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Closing Statement */}
                <p className="text-lg md:text-xl text-slate-900 leading-relaxed text-center font-medium">
                    Your potential is fixed, but your energy cycles fluctuate
                    daily, monthly, and across years. Knowing when to push and
                    when to rest can be the difference between success and
                    burnout.
                </p>
            </div>
        </section>
    );
}

