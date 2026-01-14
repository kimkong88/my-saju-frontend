"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

export default function CompatibilityNextSection() {
    const features = [
        {
            title: "Deep Dive Insights",
            description:
                "5 special connections and 3 ways you complement each other—understand the rare patterns that make your pairing unique",
        },
        {
            title: "Communication Guide",
            description:
                "How each person communicates + scripts for difficult conversations—navigate misunderstandings before they happen",
        },
        {
            title: "Growth Opportunities",
            description:
                "2 challenges with specific strategies to navigate them—turn potential friction into deeper connection",
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
                        Unlock Your Full Compatibility Report.
                    </h2>
                    <div className="space-y-6 mb-12">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            You&apos;ve seen your compatibility score, breakdown,
                            and 1 special connection. The full report goes{" "}
                            <strong className="text-slate-900 font-semibold">
                                much deeper
                            </strong>
                            .
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            Get{" "}
                            <strong className="text-slate-900 font-semibold">
                                actionable guidance
                            </strong>{" "}
                            on communication, relationship dynamics, growth
                            opportunities, and activities that work for your
                            specific pairing.
                        </p>
                    </div>
                </div>

                {/* Feature Preview Cards - 2x2 Grid: 3 features + 1 "More Features" */}
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
                                <p className="text-base md:text-lg text-slate-700 leading-relaxed flex-1">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                    {/* "More Features" System Card */}
                    <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-8 md:p-10 relative flex flex-col h-full items-center justify-center">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Lock className="w-5 h-5 text-slate-400" />
                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                    More Features
                                </h3>
                            </div>
                            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
                                Relationship-specific advice, activity
                                suggestions, and personalized guidance tailored
                                to your pairing
                            </p>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-slate-200 inline-flex">
                                <Lock className="w-3 h-3" />
                                <span>Unlock</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strong CTA */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border-2 border-slate-900 p-8 md:p-10 text-center relative overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-900/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4 tracking-tight">
                                Ready to Deepen Your Connection?
                            </h3>
                            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                                Get instant access to all premium insights,
                                communication guides, and personalized advice
                                tailored to your specific pairing.
                            </p>
                            <Link
                                href="/signup"
                                className="inline-block px-10 py-5 bg-slate-900 text-white text-lg font-semibold hover:bg-slate-800 transition-colors rounded-full button--effect"
                            >
                                Unlock Full Report
                            </Link>
                            <p className="text-sm text-slate-500 mt-4">
                                Join others discovering deeper compatibility
                                insights
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

