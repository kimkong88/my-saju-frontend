"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TodayClosingFunnelProps {
    context?: "today" | "forecast"; // Context for adjusting messaging
    onTabSwitch?: (tab: string) => void; // Callback for switching tabs when in forecast context
}

export default function TodayClosingFunnel({ context = "today", onTabSwitch }: TodayClosingFunnelProps) {
    return (
        <section className="pt-16 md:pt-24 pb-24 md:pb-32 px-6 xl:px-0 bg-gradient-to-b from-white to-slate-50/50">
            <div className="max-w-7xl mx-auto">
                {/* Main CTA Section - Updated to be less premium */}
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tighter text-slate-900 mb-4 md:mb-6">
                        {context === "forecast" 
                            ? "Plan Ahead with Deeper Insights"
                            : "Explore More Insights"}
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
                            {context === "forecast"
                                ? "Explore 14-day forecasts to plan your future with strategic timing and deeper analysis."
                                : "Discover deeper insights about your chart, relationships, and future timing."}
                    </p>

                    {/* CTA Button - Less premium styling */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {context === "forecast" ? (
                            <>
                                <button
                                    onClick={() => onTabSwitch?.("monthly")}
                                    className="inline-flex items-center gap-2 cursor-pointer px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 text-base md:text-lg font-medium"
                                >
                                    Explore 14-Day Forecast
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <Link
                                    href="/me"
                                    className="inline-flex items-center gap-2 cursor-pointer px-6 md:px-8 py-3 md:py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 text-base md:text-lg font-medium"
                                >
                                    View Your Full Chart
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/me"
                                    className="inline-flex items-center gap-2 cursor-pointer px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 text-base md:text-lg font-medium"
                                >
                                    View Your Full Chart
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                                <Link
                                    href="/compatibility"
                                    className="inline-flex items-center gap-2 cursor-pointer px-6 md:px-8 py-3 md:py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 text-base md:text-lg font-medium"
                                >
                                    Check Compatibility
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Explore Other Sections */}
                <div className="max-w-4xl mx-auto text-center border-t border-slate-200 pt-12 md:pt-16">
                    <p className="text-sm md:text-base text-slate-600 mb-6">
                        More ways to explore your chart
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <Link
                            href="/compatibility"
                            className="text-sm md:text-base text-slate-700 hover:text-slate-900 font-medium underline decoration-slate-300 hover:decoration-slate-900 transition-colors"
                        >
                            Check Compatibility
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link
                            href="/me"
                            className="text-sm md:text-base text-slate-700 hover:text-slate-900 font-medium underline decoration-slate-300 hover:decoration-slate-900 transition-colors"
                        >
                            Discover Your Strengths
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

