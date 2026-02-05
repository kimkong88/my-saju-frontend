"use client";

interface TodayActiveTenGodProps {
    activeTenGods: Array<{
        name: string;
        technicalName: string;
        emoji: string;
        source: "natal" | "luck";
        pillar: string;
        category: "output" | "wealth" | "power" | "resource" | "friend";
    }>;
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

function getSourceLabel(source: "natal" | "luck"): string {
    return source === "natal" ? "From Your Chart" : "From Current Cycle";
}

export default function TodayActiveTenGods({
    activeTenGods,
}: TodayActiveTenGodProps) {
    if (!activeTenGods || activeTenGods.length === 0) {
        return null;
    }

    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Active Energies Today
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Key forces influencing your day
                    </p>
                </div>

                {/* Grid of Energy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {activeTenGods.map((tenGod, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-sm p-4 md:p-6 hover:border-slate-900 hover:shadow-md transition-all duration-300"
                        >
                            {/* Emoji + Name */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="text-3xl md:text-4xl flex-shrink-0">
                                    {tenGod.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-1">
                                        {tenGod.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                                        {getCategoryLabel(tenGod.category)}
                                    </p>
                                </div>
                            </div>

                            {/* Source Badge */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                    {getSourceLabel(tenGod.source)}
                                </span>
                                {tenGod.pillar && (
                                    <span className="text-xs text-slate-500">
                                        {tenGod.pillar}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
