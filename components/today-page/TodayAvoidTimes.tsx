"use client";

interface AvoidTime {
    id: string;
    activity: string; // "major purchases", "difficult conversations", etc.
    timeWindow: string; // "6-8 PM"
    reason: string; // Brief explanation
    severity: "low" | "medium" | "high";
}

interface TodayAvoidTimesProps {
    warnings: AvoidTime[];
}

export default function TodayAvoidTimes({
    warnings,
}: TodayAvoidTimesProps) {
    if (warnings.length === 0) {
        return null;
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "border-red-200 bg-red-50/50";
            case "medium":
                return "border-amber-200 bg-amber-50/50";
            default:
                return "border-slate-200 bg-slate-50/50";
        }
    };

    return (
        <section className="pt-6 md:pt-8 pb-6 md:pb-8">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Timing Warnings
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Protect yourself from costly mistakes—know when to pause
                    </p>
                </div>

                {/* Warnings - Horizontal Scroll on Mobile, Grid on Desktop */}
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                    {warnings.map((warning) => (
                        <div
                            key={warning.id}
                            className={`p-6 md:p-8 flex flex-col border rounded-sm hover:border-opacity-100 transition-colors flex-shrink-0 md:flex-shrink min-w-[280px] md:min-w-0 ${getSeverityColor(
                                warning.severity
                            )}`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg">⚠️</span>
                                    <h3 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">
                                        {warning.activity}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    {warning.reason}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200/50">
                                <p className="text-base md:text-lg font-semibold text-slate-900">
                                    {warning.timeWindow}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

