"use client";

interface WeekData {
    weekNumber: number;
    startDate: string;
    endDate: string;
    theme: string;
    opportunities?: string[]; // What to focus on
    challenges?: string[]; // What to watch for
    keyEvents?: string[]; // Milestones
}

interface MonthlyWeekCardProps {
    week: WeekData;
}

export default function MonthlyWeekCard({ week }: MonthlyWeekCardProps) {
    return (
        <div className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm md:hover:bg-slate-50 transition-colors group">
            <div>
                {/* Week Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                        Week {week.weekNumber}
                    </span>
                    <span className="text-sm text-slate-500">
                        {week.startDate} - {week.endDate}
                    </span>
                </div>

                {/* Theme */}
                <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-4">
                    {week.theme}
                </h4>

                {/* Opportunities */}
                {week.opportunities && week.opportunities.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider mb-2">
                            Focus On
                        </p>
                        <ul className="space-y-1.5">
                            {week.opportunities.map((opp, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start">
                                    <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                                    <span>{opp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Challenges */}
                {week.challenges && week.challenges.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-medium text-amber-700 uppercase tracking-wider mb-2">
                            Watch For
                        </p>
                        <ul className="space-y-1.5">
                            {week.challenges.map((challenge, i) => (
                                <li key={i} className="text-sm text-slate-700 flex items-start">
                                    <span className="text-amber-500 mr-2 mt-0.5">•</span>
                                    <span>{challenge}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Key Events */}
                {week.keyEvents && week.keyEvents.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                            Key Events
                        </p>
                        <ul className="space-y-1">
                            {week.keyEvents.map((event, i) => (
                                <li key={i} className="text-xs text-slate-600 flex items-start">
                                    <span className="text-slate-400 mr-2 mt-0.5">•</span>
                                    <span>{event}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
