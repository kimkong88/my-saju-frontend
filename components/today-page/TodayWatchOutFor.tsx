"use client";

interface Challenge {
    emoji: string;
    title: string;
    description: string;
    action?: string; // Actionable guidance
    category?: "career" | "wealth" | "relationships" | "health" | "creativity";
    timeWindow?: string; // e.g., "2-4 PM"
}

interface TodayChallengesProps {
    items: Challenge[];
}

export default function TodayChallenges({ items }: TodayChallengesProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-gradient-to-b from-amber-50/30 to-white">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Challenges
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Potential challenges today—stay aware and take action
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 md:p-10 flex flex-col justify-between md:hover:bg-amber-50/50 transition-colors group border border-amber-200/50 rounded-sm"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                        {item.emoji}
                                    </div>
                                    {item.timeWindow && (
                                        <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                            {item.timeWindow}
                                        </span>
                                    )}
                                </div>

                                <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-2">
                                    {item.title}
                                </h4>

                                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                    {item.description}
                                </p>

                                {/* Actionable Guidance */}
                                {item.action && (
                                    <div className="pt-3 border-t border-amber-100">
                                        <p className="text-xs font-medium text-amber-700 uppercase tracking-wider mb-1">
                                            What to do
                                        </p>
                                        <p className="text-sm text-amber-900 leading-relaxed">
                                            {item.action}
                                        </p>
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
