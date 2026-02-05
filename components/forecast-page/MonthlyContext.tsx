"use client";

import { ArrowRight } from "lucide-react";

interface MonthlyTenGod {
    name: string;
    technicalName: string;
    emoji: string;
    category: string;
}

interface MonthlyPeriod {
    startDate: string; // "Jan 15"
    endDate: string; // "Jan 21" or "Jan 28"
    element: string; // "WOOD-O"
    elementEmoji: string;
    tenGods?: MonthlyTenGod[];
}

interface MonthlyContextProps {
    periods: MonthlyPeriod[]; // Can have 1 or 2 periods if month transition occurs
    myElement: string; // User's natal element
    myElementEmoji: string;
}

// Get the dominant period (the one with more days, or first if equal)
function getDominantPeriod(periods: MonthlyPeriod[]): MonthlyPeriod | null {
    if (!periods || periods.length === 0) return null;
    if (periods.length === 1) return periods[0];
    
    // If multiple periods, return the first one (current/starting month)
    // Backend should provide periods in order, first is typically the dominant one
    return periods[0];
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

function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        output: "Expression & Creativity",
        wealth: "Wealth & Resources",
        power: "Authority & Leadership",
        resource: "Support & Learning",
        friend: "Partnerships & Connections",
    };
    return labels[category] || category;
}

export default function MonthlyContext({ periods, myElement, myElementEmoji }: MonthlyContextProps) {
    const dominantPeriod = getDominantPeriod(periods);
    
    if (!dominantPeriod) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-8 md:pb-10">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        14-Day Energy Overview
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        The monthly element and active energies influencing your next two weeks
                    </p>
                </div>

                {/* Single Period Card */}
                <div className="bg-white border border-slate-200 rounded-sm p-6">
                    {/* Period Date Range */}
                    <div className="mb-6">
                        <span className="text-xs font-mono text-slate-600 uppercase tracking-wider font-semibold">
                            {dominantPeriod.startDate} - {dominantPeriod.endDate}
                        </span>
                    </div>

                    {/* Element Relationship - Matching Today report style */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                            Element Energy
                        </h3>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            {/* My Element */}
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                    style={getElementBgStyle(myElement)}
                                >
                                    {myElementEmoji}
                                </div>
                                <p className="text-xs text-slate-600 font-medium">
                                    {myElement}
                                </p>
                            </div>

                            {/* Arrow */}
                            <ArrowRight className="w-5 h-5 text-slate-400" />

                            {/* Monthly Element */}
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl border-2 border-slate-900"
                                    style={getElementBgStyle(dominantPeriod.element)}
                                >
                                    {dominantPeriod.elementEmoji}
                                </div>
                                <p className="text-xs text-slate-600 font-medium">
                                    {dominantPeriod.element}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Monthly 10 Gods - Matching Today report style */}
                    {dominantPeriod.tenGods && dominantPeriod.tenGods.length > 0 && (
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                Active Energies
                            </h3>
                            <div className="space-y-3">
                                {dominantPeriod.tenGods.map((god, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 md:p-4 rounded-sm bg-slate-50 hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="text-2xl md:text-3xl flex-shrink-0">
                                            {god.emoji}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                                                <h4 className="text-sm md:text-base font-semibold text-slate-900">
                                                    {god.name}
                                                </h4>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 whitespace-nowrap flex-shrink-0">
                                                    For This Month
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-500">
                                                {getCategoryLabel(god.category)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
