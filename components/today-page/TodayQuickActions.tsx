"use client";

interface QuickAction {
    id: string;
    activity: string; // "focused work", "creative projects", etc. (safer wording)
    timeWindow: string; // "2-4 PM" (2-hour window)
    description?: string; // Brief explanation
    emoji?: string; // Optional emoji for visual interest
}

interface TodayQuickActionsProps {
    actions: QuickAction[];
}

export default function TodayQuickActions({ actions }: TodayQuickActionsProps) {
    if (actions.length === 0) {
        return null;
    }

    return (
        <section className="pt-6 md:pt-8 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Peak Energy Windows
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Your optimal timing for maximum impact today
                    </p>
                </div>

                {/* Actions - Horizontal Scroll on Mobile, Grid on Desktop */}
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className="bg-white p-6 md:p-8 flex flex-col border border-slate-200 rounded-sm hover:border-slate-300 transition-colors flex-shrink-0 md:flex-shrink min-w-[280px] md:min-w-0"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    {action.emoji && (
                                        <span className="text-2xl flex-shrink-0">
                                            {action.emoji}
                                        </span>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg md:text-xl font-medium text-slate-900 tracking-tight">
                                            {action.activity}
                                        </h3>
                                    </div>
                                </div>
                                {action.description && (
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {action.description}
                                    </p>
                                )}
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-base md:text-lg font-semibold text-slate-900">
                                    {action.timeWindow}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
