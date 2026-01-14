interface HowYouMatchSectionProps {
    introduction?: string;
    scoreBreakdown?: {
        summary?: {
            overall: {
                score: number;
                percentile: number;
                description: string;
            };
            strongest: {
                category: string;
                percentage: number;
                percentile: number;
                description: string;
            };
            weakest: {
                category: string;
                percentage: number;
                percentile: number;
                description: string;
            };
            text: string;
        };
        categories: {
            label: string;
            emoji: string;
            score: number;
            max: number;
            percentage: number;
            percentile?: number;
            description: string;
            technicalBasis?: string;
        }[];
        total: {
            score: number;
            max: number;
        };
    };
    rating?: string;
}

// Helper to get score color
function getScoreColor(percentage: number) {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-orange-600";
}

// Helper to get bar color
function getBarColor(percentage: number) {
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-orange-500";
}

export default function HowYouMatchSection({
    introduction,
    scoreBreakdown,
    rating,
}: HowYouMatchSectionProps) {
    if (!scoreBreakdown || scoreBreakdown.categories.length === 0) {
        return null;
    }

    return (
        <section
            id="how-you-match"
            className="py-24 md:py-40 px-6 xl:px-0 bg-white border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8 md:mb-12">
                        How You Match.
                    </h2>

                    {/* Introduction Paragraph */}
                    {introduction && (
                        <div className="max-w-3xl mb-12 md:mb-16">
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                                {introduction}
                            </p>
                        </div>
                    )}

                    {/* Compatibility Scores Subsection */}
                    <div className="max-w-4xl mb-8">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                            Compatibility Scores
                        </h3>
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            Compatibility is measured across four key areas. Each
                            score reflects how well your natural energies align in
                            that dimension. Higher scores (70%+) indicate strong
                            alignment, while lower scores suggest areas where your
                            differences create either tension or complementary
                            balance. The overall score combines all dimensions.
                        </p>
                    </div>
                </div>

                {/* Summary Section - Quick Insights */}
                {scoreBreakdown.summary && (
                    <div className="max-w-4xl mb-12 md:mb-16">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                            Quick Insights
                        </h4>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3">
                                <span className="text-slate-300 mt-1.5 flex-shrink-0">
                                    •
                                </span>
                                <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                    <strong className="text-slate-900 font-semibold">
                                        Strongest:{" "}
                                        {scoreBreakdown.summary.strongest.category}
                                    </strong>{" "}
                                    (
                                    {scoreBreakdown.summary.strongest.percentage}
                                    %, top{" "}
                                    {100 -
                                        scoreBreakdown.summary.strongest
                                            .percentile}
                                    %) —{" "}
                                    {scoreBreakdown.summary.strongest.description}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-slate-300 mt-1.5 flex-shrink-0">
                                    •
                                </span>
                                <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                    <strong className="text-slate-900 font-semibold">
                                        Growth Area:{" "}
                                        {scoreBreakdown.summary.weakest.category}
                                    </strong>{" "}
                                    (
                                    {scoreBreakdown.summary.weakest.percentage}
                                    %, top{" "}
                                    {100 -
                                        scoreBreakdown.summary.weakest.percentile}
                                    %) —{" "}
                                    {scoreBreakdown.summary.weakest.description}
                                    , focus here for growth
                                </span>
                            </li>
                        </ul>

                        {/* Closing Statement */}
                        <div className="space-y-4">
                            <div className="text-base md:text-lg text-slate-900 leading-relaxed">
                                <span className="font-medium">
                                    With a score of{" "}
                                    {scoreBreakdown.summary.overall.score}/100,
                                    you rank{" "}
                                    {scoreBreakdown.summary.overall.description.toLowerCase()}
                                    .{" "}
                                </span>
                                {rating && (
                                    <>
                                        Your compatibility is{" "}
                                        <span className="inline-block bg-slate-900 text-white px-3 py-1.5 font-bold text-lg md:text-xl tracking-tight mx-1 my-1">
                                            {rating}
                                        </span>
                                        .
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Unified Card Design */}
                <div className="bg-white border border-slate-200 p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                        {/* Left: Score Breakdown */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    Compatibility Scores
                                </h3>
                            </div>

                            <div className="space-y-6 flex-1">
                                {scoreBreakdown.categories.map(
                                    (category, index) => (
                                        <div key={index} className="relative">
                                            <div className="flex justify-between items-end mb-1.5">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <span className="text-lg">
                                                        {category.emoji}
                                                    </span>
                                                    <span
                                                        className={`text-sm font-bold tracking-widest uppercase ${
                                                            category.percentage >=
                                                            50
                                                                ? "text-slate-900"
                                                                : "text-slate-400"
                                                        }`}
                                                    >
                                                        {category.label}
                                                    </span>
                                                    {category.percentile !==
                                                        undefined && (
                                                        <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                                                            (top{" "}
                                                            {100 -
                                                                category.percentile}
                                                            %)
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`text-lg font-mono font-bold ${getScoreColor(
                                                            category.percentage
                                                        )}`}
                                                    >
                                                        {category.score}
                                                    </span>
                                                    <span className="text-xs font-mono text-slate-400 ml-1">
                                                        /{category.max}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="h-1.5 w-full bg-slate-50 overflow-hidden border border-slate-100/50">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out ${
                                                        category.percentage > 0
                                                            ? getBarColor(
                                                                  category.percentage
                                                              )
                                                            : "bg-transparent"
                                                    }`}
                                                    style={{
                                                        width: `${category.percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Right: Overall Score - Circular Progress */}
                        {scoreBreakdown.total && (
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative inline-flex items-center justify-center overflow-visible mb-4">
                                    {/* Progress Ring */}
                                    <svg
                                        className="transform -rotate-90"
                                        width="240"
                                        height="240"
                                        viewBox="0 0 240 240"
                                        style={{ overflow: "visible" }}
                                    >
                                        {/* Background Circle */}
                                        <circle
                                            cx="120"
                                            cy="120"
                                            r="100"
                                            fill="none"
                                            stroke="#e2e8f0"
                                            strokeWidth="4"
                                        />
                                        {/* Progress Circle */}
                                        <circle
                                            cx="120"
                                            cy="120"
                                            r="100"
                                            fill="none"
                                            stroke={
                                                scoreBreakdown.total.score >= 70
                                                    ? "#16a34a"
                                                    : scoreBreakdown.total
                                                          .score >= 50
                                                      ? "#ca8a04"
                                                      : "#ea580c"
                                            }
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={2 * Math.PI * 100}
                                            strokeDashoffset={
                                                2 *
                                                Math.PI *
                                                100 *
                                                (1 -
                                                    scoreBreakdown.total.score /
                                                        100)
                                            }
                                            className="transition-all duration-1000 ease-out"
                                            style={{
                                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                                            }}
                                        />
                                    </svg>

                                    {/* Score Text - Centered in Ring */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="flex items-baseline gap-2">
                                            <span
                                                className={`text-4xl md:text-5xl font-mono font-black tracking-tighter ${
                                                    scoreBreakdown.total.score >=
                                                    70
                                                        ? "text-green-600"
                                                        : scoreBreakdown.total
                                                              .score >= 50
                                                          ? "text-yellow-600"
                                                          : "text-orange-600"
                                                }`}
                                            >
                                                {scoreBreakdown.total.score}
                                            </span>
                                            <span className="text-lg md:text-xl font-mono text-slate-400 font-light">
                                                /100
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-500 mt-2 uppercase tracking-wider">
                                            Overall
                                        </div>
                                    </div>
                                </div>
                                {rating && (
                                    <div className="mt-6 text-center">
                                        <p className="text-lg md:text-xl text-slate-900 font-medium">
                                            {rating}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

