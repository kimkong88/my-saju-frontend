export default function FourPillarsChart({
    fourPillars,
}: {
    fourPillars: {
        year: { display: string; meaning: string; aspect: string };
        month: { display: string; meaning: string; aspect: string };
        day: { display: string; meaning: string; aspect: string; isCore?: boolean };
        hour: { display: string; meaning: string; aspect: string };
    };
}) {
    const pillars = [
        { key: "year", label: "Year", data: fourPillars.year },
        { key: "month", label: "Month", data: fourPillars.month },
        { key: "day", label: "Day", data: fourPillars.day },
        { key: "hour", label: "Hour", data: fourPillars.hour },
    ];

    return (
        <div className="w-full bg-white border border-slate-200 p-6 md:p-8">
            <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-2">
                    Your Birth Chart
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                    The Four Pillars calculated from your birth data
                </p>
            </div>

            <div className="grid grid-cols-4 gap-3 md:gap-4">
                {pillars.map((pillar) => {
                    const isCore = pillar.data.isCore;
                    return (
                        <div
                            key={pillar.key}
                            className={`relative border-2 transition-all ${
                                isCore
                                    ? "border-slate-900 bg-slate-50"
                                    : "border-slate-200 bg-white"
                            }`}
                        >
                            {/* Core Badge */}
                            {isCore && (
                                <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                                    Core
                                </div>
                            )}

                            <div className="p-4 md:p-5">
                                {/* Label */}
                                <div className="mb-3">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        {pillar.label}
                                    </div>
                                    <div className="text-[10px] text-slate-500 italic">
                                        {pillar.data.aspect}
                                    </div>
                                </div>

                                {/* Meaning (English translation) */}
                                <div className="mt-4">
                                    <div
                                        className={`text-base md:text-lg font-medium ${
                                            isCore
                                                ? "text-slate-900"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {pillar.data.meaning}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                    The <strong className="text-slate-700">Day Pillar</strong>{" "}
                    represents your core self—your fundamental personality and how
                    you interact with the world.
                </p>
            </div>
        </div>
    );
}

