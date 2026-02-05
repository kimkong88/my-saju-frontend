"use client";

import { ArrowRight } from "lucide-react";

interface ElementPeriod {
    startDate: string; // "Jan 15"
    endDate: string; // "Jan 22"
    element: string; // "FIRE-I", "WOOD-O", etc.
    elementEmoji: string;
    description: string;
}

interface MonthlyElementTimelineProps {
    elementPeriods: ElementPeriod[];
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    if (elementLower.includes("fire")) {
        return {
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: "linear-gradient(135deg, #a16207 0%, #854d0e 100%)",
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        };
    }

    return { backgroundColor: baseColor };
}

function getElementEmoji(element: string | undefined): string {
    if (!element) return "⚪";

    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";

    return "⚪";
}

export default function MonthlyElementTimeline({ elementPeriods }: MonthlyElementTimelineProps) {
    if (!elementPeriods || elementPeriods.length === 0) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Element Transitions
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                                How your energy shifts over the next 14 days
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {elementPeriods.map((period, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 hover:border-slate-900 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                {/* Element Circle */}
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                        style={getElementBgStyle(period.element)}
                                    >
                                        {period.elementEmoji || getElementEmoji(period.element)}
                                    </div>
                                </div>

                                {/* Date Range and Element Name */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-medium text-slate-900">
                                            {period.startDate} - {period.endDate}
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                            {period.element}
                                        </span>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                        {period.description}
                                    </p>
                                </div>

                                {/* Arrow (only show if not last) */}
                                {index < elementPeriods.length - 1 && (
                                    <div className="hidden md:flex flex-shrink-0">
                                        <ArrowRight className="w-5 h-5 text-slate-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
