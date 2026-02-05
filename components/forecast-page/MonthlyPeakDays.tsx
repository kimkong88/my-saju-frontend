"use client";

interface PeakActionDay {
    date: string;
    title: string;
    action: string;
    reason: string;
    category: "career" | "relationships" | "creativity" | "wealth" | "health" | "general";
    intensity: "high" | "medium";
}

interface MonthlyPeakDaysProps {
    peakDays: PeakActionDay[];
}

function getCategoryEmoji(category: string): string {
    switch (category) {
        case "career":
            return "💼";
        case "relationships":
            return "🤝";
        case "creativity":
            return "✨";
        case "wealth":
            return "💰";
        case "health":
            return "💪";
        default:
            return "⭐";
    }
}

function getCategoryColor(category: string): string {
    switch (category) {
        case "career":
            return "bg-blue-100 text-blue-700";
        case "relationships":
            return "bg-pink-100 text-pink-700";
        case "creativity":
            return "bg-purple-100 text-purple-700";
        case "wealth":
            return "bg-emerald-100 text-emerald-700";
        case "health":
            return "bg-red-100 text-red-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function MonthlyPeakDays({ peakDays }: MonthlyPeakDaysProps) {
    if (!peakDays || peakDays.length === 0) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Peak Action Days
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        The best days to take specific actions based on your energy patterns
                    </p>
                </div>

                {/* Peak Days Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {peakDays.map((day, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 hover:border-slate-900 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getCategoryEmoji(day.category)}</span>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(day.category)}`}>
                                        {day.category}
                                    </span>
                                </div>
                                {day.intensity === "high" && (
                                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                        High Energy
                                    </span>
                                )}
                            </div>

                            <div className="mb-3">
                                <span className="text-base font-semibold text-slate-900">
                                    {day.date}
                                </span>
                                <h4 className="text-lg md:text-xl font-medium text-slate-900 mt-1 mb-2">
                                    {day.title}
                                </h4>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                        Action
                                    </p>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {day.action}
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-slate-100">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                        Why It&apos;s Optimal
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {day.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
