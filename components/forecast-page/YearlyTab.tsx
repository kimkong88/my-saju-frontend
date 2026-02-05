"use client";

import type { YearlyForecast } from "@/types/forecast";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";

interface YearlyTabProps {
    data: YearlyForecast;
}

export default function YearlyTab({ data }: YearlyTabProps) {
    return (
        <div className="space-y-0">
            <ResponsiveLayout>
                {/* Section Header */}
                <div className="pt-12 md:pt-16 pb-6 md:pb-8">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900">
                            Next 12 Months
                        </h2>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                            Updated daily
                        </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-500 mb-2">
                        {data.period}
                    </p>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                        {data.theme.description}
                    </p>
                </div>
            </ResponsiveLayout>

            {/* Quarterly Summary */}
            <section className="pt-6 md:pt-8 pb-12 md:pb-16">
                <div className="max-w-7xl mx-auto px-6 xl:px-0">
                    <div className="mb-6 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2">
                            Quarterly Overview
                        </h3>
                        <p className="text-sm md:text-base text-slate-600">
                            Energy themes and focus areas for each quarter
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {data.quarterlySummary.map((quarter) => (
                            <div
                                key={quarter.quarter}
                                className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm md:hover:bg-slate-50 transition-colors group"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                                        <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                            Q{quarter.quarter}
                                        </span>
                                        <span className="text-lg md:text-xl font-semibold text-slate-900 font-mono">
                                            {quarter.energy}/10
                                        </span>
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                        {quarter.theme}
                                    </h4>

                                    <ul className="space-y-1">
                                        {Array.isArray(quarter.focus) ? (
                                            quarter.focus.map((item, i) => (
                                                <li key={i} className="text-sm text-slate-600 flex items-start">
                                                    <span className="text-slate-400 mr-2">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-600 flex items-start">
                                                <span className="text-slate-400 mr-2">•</span>
                                                <span>{quarter.focus}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Major Transitions */}
            <section className="pt-6 md:pt-8 pb-12 md:pb-16 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 xl:px-0">
                    <div className="mb-6 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2">
                            Major Transitions
                        </h3>
                        <p className="text-sm md:text-base text-slate-600">
                            Significant shifts and changes throughout the year
                        </p>
                    </div>

                    <div className="space-y-4">
                        {data.majorTransitions.map((transition, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 sm:p-8 md:p-10 border border-slate-200 rounded-sm md:hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-shrink-0">
                                        <span className="text-sm font-medium text-slate-900">
                                            {transition.date}
                                        </span>
                                        <span className={`ml-3 text-xs font-medium px-2 py-1 rounded-full ${
                                            transition.impact === "high"
                                                ? "bg-red-100 text-red-700"
                                                : transition.impact === "medium"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-slate-100 text-slate-700"
                                        }`}>
                                            {transition.impact} impact
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base md:text-lg font-medium text-slate-900 mb-2">
                                            {transition.title}
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                            {transition.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Monthly Breakdown */}
            {data.months && data.months.length > 0 && (
                <section className="pt-6 md:pt-8 pb-12 md:pb-16 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 xl:px-0">
                        <div className="mb-6 md:mb-8">
                            <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2">
                                Monthly Breakdown
                            </h3>
                            <p className="text-sm md:text-base text-slate-600">
                                Detailed energy patterns for each month
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {data.months.map((month, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm md:hover:bg-slate-50 transition-colors group"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                {month.month}
                                            </span>
                                            <span className="text-lg md:text-xl font-semibold text-slate-900 font-mono">
                                                {month.energy}/10
                                            </span>
                                        </div>

                                        <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                            {month.theme}
                                        </h4>

                                        {month.bestFor && month.bestFor.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                    Best For
                                                </p>
                                                <ul className="space-y-1">
                                                    {month.bestFor.map((item, i) => (
                                                        <li key={i} className="text-sm text-slate-600 flex items-start">
                                                            <span className="text-emerald-500 mr-2">✓</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {month.avoid && month.avoid.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                    Avoid
                                                </p>
                                                <ul className="space-y-1">
                                                    {month.avoid.map((item, i) => (
                                                        <li key={i} className="text-sm text-slate-600 flex items-start">
                                                            <span className="text-red-500 mr-2">✗</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {month.keyDates && month.keyDates.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                    Key Dates
                                                </p>
                                                <p className="text-sm text-slate-600">
                                                    {month.keyDates.join(", ")}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
