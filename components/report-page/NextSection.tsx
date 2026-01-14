"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

export default function NextSection() {
    const features = [
        {
            title: "Daily Pulse",
            description:
                "Your personal energy calendar—know exactly which days to launch projects, make big decisions, or take calculated risks",
            preview:
                "Example: March 15th — Peak energy for strategic planning. March 22nd — Ideal for creative breakthroughs.",
        },
        {
            title: "Timeline Mapping",
            description:
                "See your 10-year cycles and major life transitions before they happen—plan your career moves, relationships, and investments with precision",
            preview:
                "Example: 2026-2036 — Expansion phase. Q3 2026 — Key pivot point for major decisions.",
        },
        {
            title: "Optimal Timing",
            description:
                "Know your best hours for deep work, creativity, and important conversations—maximize every day",
            preview:
                "Example: Peak hours 9-11 AM, 2-4 PM for focused work. Avoid 12-1 PM for critical decisions.",
        },
        {
            title: "Relationship Synergy",
            description:
                "Discover the best times to connect with partners, colleagues, and friends—understand relationship timing and compatibility",
            preview:
                "Example: Compatibility score: 94%. Best connection times: Evenings for deep conversations.",
        },
    ];

    return (
        <section
            id="next"
            className="py-24 md:py-40 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        What&apos;s Next?
                    </h2>
                    <div className="space-y-6 mb-12">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            This report reveals{" "}
                            <strong className="text-slate-900 font-semibold">
                                WHO you are
                            </strong>
                            —your core personality patterns, natural strengths,
                            and how you operate at your best.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            But there&apos;s another dimension:{" "}
                            <strong className="text-slate-900 font-semibold">
                                WHEN you&apos;re at your best
                            </strong>
                            .
                        </p>
                    </div>

                    {/* Social Proof */}
                    <div className="mb-6 pt-8 border-t border-slate-200">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <strong className="text-slate-900 font-semibold">
                                Join 500+ users
                            </strong>{" "}
                            discovering their optimal timing and planning their
                            lives with precision.
                        </p>
                    </div>
                </div>

                {/* Feature Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                    {features.map((feature, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 p-8 md:p-10 relative group hover:border-slate-900 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Header Row - Title and Badge aligned */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight flex-1">
                                        {feature.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 flex-shrink-0">
                                        <Lock className="w-3 h-3" />
                                        <span>Unlock</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6 flex-1">
                                    {feature.description}
                                </p>

                                {/* Preview (Enhanced) */}
                                <div className="mt-auto pt-6 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 -mx-2 px-4 py-4 rounded-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-900/20"></div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2.5">
                                        Example Preview
                                    </p>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                        {feature.preview}
                                    </p>
                                    {/* Decorative dots */}
                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Feature List */}
                <div className="bg-white border-2 border-slate-900 p-8 md:p-10 mb-12 relative overflow-hidden">
                    {/* Subtle background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-900/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-6 tracking-tight">
                            Your Energy Cycles
                        </h3>
                        <div className="space-y-4 text-base md:text-lg text-slate-700 leading-relaxed">
                            <p>
                                Your potential is fixed, but your energy cycles
                                fluctuate. Our forecasting tools show you:
                            </p>
                            <ul className="space-y-4 ml-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-1.5 text-lg font-bold">
                                        •
                                    </span>
                                    <span>
                                        <strong className="text-slate-900 font-semibold">
                                            Your personal energy calendar
                                        </strong>
                                        —know exactly which days this month
                                        favor your goals and amplify your
                                        natural strengths
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-1.5 text-lg font-bold">
                                        •
                                    </span>
                                    <span>
                                        <strong className="text-slate-900 font-semibold">
                                            Strategic timing for major moves
                                        </strong>
                                        —when to start that business, launch
                                        that project, or make life-changing
                                        decisions
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-1.5 text-lg font-bold">
                                        •
                                    </span>
                                    <span>
                                        <strong className="text-slate-900 font-semibold">
                                            Daily optimization
                                        </strong>
                                        —your best hours today for deep work,
                                        creativity, or important conversations
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-400 mt-1.5 text-lg font-bold">
                                        •
                                    </span>
                                    <span>
                                        <strong className="text-slate-900 font-semibold">
                                            Long-term cycle mapping
                                        </strong>
                                        —which months and years align with your
                                        chart patterns for maximum success
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Closing Statement */}
                <p className="text-lg md:text-xl text-slate-900 leading-relaxed mb-12 text-center font-medium">
                    You now know{" "}
                    <strong className="font-semibold">WHO you are</strong>.
                    Ready to discover{" "}
                    <strong className="font-semibold">
                        WHEN you&apos;re at your best
                    </strong>
                    ?
                </p>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="cursor-pointer px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base font-medium"
                    >
                        Sign Up to Unlock
                    </Link>
                    <Link
                        href="/"
                        className="cursor-pointer bg-white px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-base font-medium"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
