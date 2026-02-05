"use client";

// Legacy interfaces
interface PeakDay {
    date: string;
    title: string;
    action: string;
    reason: string;
    category: "career" | "relationships" | "creativity" | "wealth" | "health" | "general";
    intensity: "high" | "medium";
}

interface BestDaysFor {
    career?: string[];
    relationships?: string[];
    creativity?: string[];
    wealth?: string[];
    health?: string[];
    rest?: string[];
}

// New backend structure
interface BestDayItem {
    date: string; // "YYYY-MM-DD"
    score: number; // 0-100
    reason: string;
}

interface MonthlyActionGuideProps {
    // New structure
    bestDays?: {
        career?: BestDayItem[];
        relationship?: BestDayItem[];
        creativity?: BestDayItem[];
        wealth?: BestDayItem[];
        health?: BestDayItem[];
        rest?: BestDayItem[];
    };
    worstDays?: {
        career?: BestDayItem[];
        relationship?: BestDayItem[];
        creativity?: BestDayItem[];
        wealth?: BestDayItem[];
        health?: BestDayItem[];
        rest?: BestDayItem[];
    };
    // Legacy props
    peakDays?: PeakDay[];
    bestDaysFor?: BestDaysFor;
}

function getCategoryColor(category: string): string {
    switch (category) {
        case "career": return "bg-blue-100 text-blue-700 border-blue-200";
        case "relationships": return "bg-pink-100 text-pink-700 border-pink-200";
        case "creativity": return "bg-purple-100 text-purple-700 border-purple-200";
        case "wealth": return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "health": return "bg-red-100 text-red-700 border-red-200";
        default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
}

function getCategoryEmoji(category: string): string {
    switch (category) {
        case "career": return "💼";
        case "relationships": return "❤️";
        case "creativity": return "✨";
        case "wealth": return "💰";
        case "health": return "💪";
        default: return "📅";
    }
}

export default function MonthlyActionGuide({ bestDays, worstDays, peakDays, bestDaysFor }: MonthlyActionGuideProps) {
    // Use new structure if available, otherwise fall back to legacy
    const useNewStructure = !!bestDays;
    
    const hasBestDays = useNewStructure 
        ? bestDays && Object.values(bestDays).some(days => days && days.length > 0)
        : bestDaysFor && Object.values(bestDaysFor).some(days => days && days.length > 0);
    const hasWorstDays = worstDays && Object.values(worstDays).some(days => days && days.length > 0);
    const hasPeakDays = peakDays && peakDays.length > 0;

    if (!hasPeakDays && !hasBestDays && !hasWorstDays) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Action Guide
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Optimal timing for key activities and important decisions
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Peak Action Days */}
                    {hasPeakDays && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-slate-900 mb-2">
                                    Priority Days
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Your most potent days for specific actions
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {peakDays.map((day, index) => (
                                    <div key={index} className="bg-white p-6 md:p-8 border border-slate-200 rounded-sm hover:border-slate-900 hover:shadow-md transition-all">
                                        <div className="mb-4">
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap font-semibold">
                                                {day.date}
                                            </span>
                                            <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(day.category)}`}>
                                                {day.category}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-medium text-slate-900 tracking-tight mb-2">
                                            {day.title}
                                        </h4>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                            {day.action}
                                        </p>
                                        <div className="pt-3 border-t border-slate-100">
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                                Why it&apos;s optimal
                                            </p>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {day.reason}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Best Days For... */}
                    {hasBestDays && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-slate-900 mb-2">
                                    Best Days For...
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Category-based recommendations for optimal timing
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {useNewStructure ? (
                                    // New structure: bestDays with score and reason
                                    Object.entries(bestDays || {}).map(([categoryKey, items]) => {
                                        if (!items || items.length === 0) return null;
                                        
                                        const categoryInfo = {
                                            emoji: getCategoryEmoji(categoryKey),
                                            label: categoryKey === "relationship" ? "Relationships" : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                                            color: getCategoryColor(categoryKey),
                                        };

                                        return (
                                            <div
                                                key={categoryKey}
                                                className={`bg-white p-6 md:p-8 border rounded-sm ${categoryInfo.color.split(' ')[2]}`}
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-xl">{categoryInfo.emoji}</span>
                                                    <h4 className="text-lg font-medium text-slate-900 tracking-tight">
                                                        {categoryInfo.label}
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {items.map((item, index) => (
                                                        <li key={index} className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`w-2 h-2 rounded-full ${categoryInfo.color.split(' ')[0]}`}></span>
                                                                <span className="text-sm font-medium text-slate-900">{item.date}</span>
                                                                <span className="text-xs text-slate-500">({item.score}/100)</span>
                                                            </div>
                                                            <p className="text-xs text-slate-600 ml-4">{item.reason}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })
                                ) : (
                                    // Legacy structure: bestDaysFor with string dates
                                    Object.entries(bestDaysFor || {}).map(([categoryKey, dates]) => {
                                        if (!dates || dates.length === 0) return null;
                                        
                                        const categoryInfo = {
                                            emoji: getCategoryEmoji(categoryKey),
                                            label: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                                            color: getCategoryColor(categoryKey),
                                        };

                                        return (
                                            <div
                                                key={categoryKey}
                                                className={`bg-white p-6 md:p-8 border rounded-sm ${categoryInfo.color.split(' ')[2]}`}
                                            >
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-xl">{categoryInfo.emoji}</span>
                                                    <h4 className="text-lg font-medium text-slate-900 tracking-tight">
                                                        {categoryInfo.label}
                                                    </h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {dates.map((date, index) => (
                                                        <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                                                            <span className={`w-2 h-2 rounded-full ${categoryInfo.color.split(' ')[0]}`}></span>
                                                            <span>{date}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {/* Worst Days - New structure only */}
                    {hasWorstDays && worstDays && (
                        <div>
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-slate-900 mb-2">
                                    Days to Avoid
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Days with lower energy for specific activities
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {Object.entries(worstDays).map(([categoryKey, items]) => {
                                    if (!items || items.length === 0) return null;
                                    
                                    const categoryInfo = {
                                        emoji: getCategoryEmoji(categoryKey),
                                        label: categoryKey === "relationship" ? "Relationships" : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                                        color: getCategoryColor(categoryKey),
                                    };

                                    return (
                                        <div
                                            key={categoryKey}
                                            className={`bg-white p-6 md:p-8 border rounded-sm opacity-75 ${categoryInfo.color.split(' ')[2]}`}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-xl">{categoryInfo.emoji}</span>
                                                <h4 className="text-lg font-medium text-slate-900 tracking-tight">
                                                    {categoryInfo.label}
                                                </h4>
                                            </div>
                                            <ul className="space-y-3">
                                                {items.map((item, index) => (
                                                    <li key={index} className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${categoryInfo.color.split(' ')[0]}`}></span>
                                                            <span className="text-sm font-medium text-slate-700">{item.date}</span>
                                                            <span className="text-xs text-slate-500">({item.score}/100)</span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 ml-4">{item.reason}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
