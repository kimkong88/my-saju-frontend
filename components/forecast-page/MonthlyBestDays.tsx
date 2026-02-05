"use client";

interface BestDaysFor {
    career?: string[];
    relationships?: string[];
    creativity?: string[];
    wealth?: string[];
    health?: string[];
    rest?: string[];
}

interface MonthlyBestDaysProps {
    bestDays: BestDaysFor;
}

const categoryConfig = {
    career: {
        emoji: "💼",
        label: "Career Moves",
        color: "bg-blue-50 border-blue-200 text-blue-700",
        dotColor: "bg-blue-500",
    },
    relationships: {
        emoji: "🤝",
        label: "Relationships",
        color: "bg-pink-50 border-pink-200 text-pink-700",
        dotColor: "bg-pink-500",
    },
    creativity: {
        emoji: "✨",
        label: "Creative Projects",
        color: "bg-purple-50 border-purple-200 text-purple-700",
        dotColor: "bg-purple-500",
    },
    wealth: {
        emoji: "💰",
        label: "Wealth & Finance",
        color: "bg-emerald-50 border-emerald-200 text-emerald-700",
        dotColor: "bg-emerald-500",
    },
    health: {
        emoji: "💪",
        label: "Health & Wellness",
        color: "bg-red-50 border-red-200 text-red-700",
        dotColor: "bg-red-500",
    },
    rest: {
        emoji: "🧘",
        label: "Rest & Reflection",
        color: "bg-slate-50 border-slate-200 text-slate-700",
        dotColor: "bg-slate-500",
    },
};

export default function MonthlyBestDays({ bestDays }: MonthlyBestDaysProps) {
    const categories = Object.entries(bestDays).filter(
        ([, dates]) => dates && dates.length > 0
    );

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Best Days For...
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Optimal timing for different types of actions
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map(([category, dates]) => {
                        const config =
                            categoryConfig[
                                category as keyof typeof categoryConfig
                            ];
                        if (!config) return null;

                        return (
                            <div
                                key={category}
                                className={`bg-white border-2 rounded-sm p-6 md:p-8 ${config.color} hover:shadow-md transition-all`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">
                                        {config.emoji}
                                    </span>
                                    <h4 className="text-lg font-medium">
                                        {config.label}
                                    </h4>
                                </div>
                                <div className="space-y-2">
                                    {dates.map((date: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${config.dotColor}`}
                                            ></div>
                                            <span className="text-sm font-medium text-slate-900">
                                                {date}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
