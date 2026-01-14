import type {
    FourPillars,
    ElementDistribution,
    Identity,
    Rarity,
    ChartMeaning,
} from "@/types/report";

export default function BirthChartSection({
    fourPillars,
    elementDistribution,
    identity,
    rarity,
    chartMeaning,
}: {
    fourPillars?: FourPillars;
    elementDistribution: ElementDistribution;
    identity: Identity;
    rarity?: Rarity;
    chartMeaning?: ChartMeaning;
}) {
    return (
        <section
            id="birth-chart"
            className="py-24 md:py-40 px-6 xl:px-0 border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Your Birth Chart.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mb-8">
                        We translate 3,000-year-old Bazi wisdom into actionable
                        modern insights. Your birth chart is calculated from
                        your exact birth moment—this is your personality
                        blueprint, decoded.
                    </p>
                </div>

                {/* Chart Meaning Section - Moved to top */}
                {chartMeaning && (
                    <div className="max-w-4xl mb-12 md:mb-16">
                        {/* Summary */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                What This Means
                            </h3>
                            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                                {chartMeaning.summary}
                            </p>
                        </div>

                        {/* Implications */}
                        {chartMeaning.implications &&
                            chartMeaning.implications.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                        Key Implications
                                    </h4>
                                    <ul className="space-y-3">
                                        {chartMeaning.implications.map(
                                            (implication, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="text-slate-300 mt-1.5 flex-shrink-0">
                                                        •
                                                    </span>
                                                    <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                                        {implication}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                        {/* So What / Interaction Explanation */}
                        <div className="space-y-4">
                            <div className="text-base md:text-lg text-slate-900 leading-relaxed">
                                {(() => {
                                    // Extract and highlight the archetype name
                                    const soWhatText = chartMeaning.soWhat;
                                    const archetypeName =
                                        identity?.title ||
                                        "The Focused Refiner";

                                    // Find the archetype name in the text
                                    const archetypeIndex =
                                        soWhatText.indexOf(archetypeName);

                                    if (archetypeIndex !== -1) {
                                        const beforeArchetype =
                                            soWhatText.substring(
                                                0,
                                                archetypeIndex
                                            );
                                        const afterArchetype =
                                            soWhatText.substring(
                                                archetypeIndex +
                                                    archetypeName.length
                                            );

                                        return (
                                            <>
                                                {beforeArchetype && (
                                                    <span className="font-medium">
                                                        {beforeArchetype}
                                                    </span>
                                                )}
                                                <span className="inline-block bg-slate-900 text-white px-3 py-1.5 font-bold text-lg md:text-xl tracking-tight mx-1 my-1">
                                                    {archetypeName}
                                                </span>
                                                {afterArchetype && (
                                                    <span className="font-medium">
                                                        {afterArchetype}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }
                                    // Fallback if pattern not found
                                    return (
                                        <span className="font-medium">
                                            {soWhatText}
                                        </span>
                                    );
                                })()}
                            </div>
                            {chartMeaning.interactionExplanation && (
                                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-300 pl-4">
                                    {chartMeaning.interactionExplanation}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Unified Card Design */}
                <div className="bg-white border border-slate-200 p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                        {/* Left: Four Pillars */}
                        {fourPillars && (
                            <div className="flex flex-col lg:pr-12">
                                <div className="mb-6">
                                    <h3 className="mb-6 text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                        Your Birth Chart
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        <strong className="text-slate-900">
                                            The Four Pillars
                                        </strong>{" "}
                                        calculated from your birth data
                                    </p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {[
                                        {
                                            key: "year",
                                            label: "Year",
                                            data: fourPillars.year,
                                        },
                                        {
                                            key: "month",
                                            label: "Month",
                                            data: fourPillars.month,
                                        },
                                        {
                                            key: "day",
                                            label: "Day",
                                            data: fourPillars.day,
                                        },
                                        {
                                            key: "hour",
                                            label: "Hour",
                                            data: fourPillars.hour,
                                        },
                                    ].map((pillar) => {
                                        const isCore = pillar.data.isCore;
                                        return (
                                            <div
                                                key={pillar.key}
                                                className={`relative transition-all ${
                                                    isCore
                                                        ? "bg-slate-900 text-white p-5 md:p-6"
                                                        : "bg-slate-50 p-5 md:p-6 border border-slate-200"
                                                }`}
                                            >
                                                {isCore && (
                                                    <div className="absolute -top-2 -right-2 bg-white text-slate-900 text-[8px] font-bold uppercase tracking-wider px-2 py-1 border border-slate-900">
                                                        Core
                                                    </div>
                                                )}

                                                <div className="flex flex-col">
                                                    <div className="mb-3">
                                                        <div className="text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70">
                                                            {pillar.label}
                                                        </div>
                                                        <div className="text-xs opacity-80 italic mb-2">
                                                            {pillar.data.aspect}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div
                                                            className={`text-base md:text-lg font-semibold ${
                                                                isCore
                                                                    ? "text-white"
                                                                    : "text-slate-900"
                                                            }`}
                                                        >
                                                            {
                                                                pillar.data
                                                                    .meaning
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 pt-4">
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        The{" "}
                                        <strong className="text-slate-700">
                                            Day Pillar
                                        </strong>{" "}
                                        represents your core self—your
                                        fundamental personality and how you
                                        interact with the world.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Right: Elemental Distribution */}
                        <div className="flex flex-col justify-between">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    Structural Distribution
                                </h3>
                            </div>

                            <div className="space-y-6 flex-0 mb-6">
                                {[
                                    {
                                        key: "fire",
                                        label: "Fire",
                                        color: "bg-rose-500",
                                    },
                                    {
                                        key: "earth",
                                        label: "Earth",
                                        color: "bg-amber-700",
                                    },
                                    {
                                        key: "metal",
                                        label: "Metal",
                                        color: "bg-slate-400",
                                    },
                                    {
                                        key: "water",
                                        label: "Water",
                                        color: "bg-blue-600",
                                    },
                                    {
                                        key: "wood",
                                        label: "Wood",
                                        color: "bg-emerald-600",
                                    },
                                ].map((el) => {
                                    const value =
                                        elementDistribution.percentages[
                                            el.key as keyof typeof elementDistribution.percentages
                                        ] || 0;
                                    const isDominant =
                                        elementDistribution.dominant.includes(
                                            el.label
                                        );

                                    return (
                                        <div key={el.key} className="relative">
                                            <div className="flex justify-between items-end mb-1.5">
                                                <span
                                                    className={`text-sm font-bold tracking-widest uppercase ${
                                                        isDominant
                                                            ? "text-slate-900"
                                                            : "text-slate-400"
                                                    }`}
                                                >
                                                    {el.label}{" "}
                                                    {isDominant && "— Dominant"}
                                                </span>
                                                <span className="text-xs font-mono text-slate-400">
                                                    {value}%
                                                </span>
                                            </div>

                                            <div className="h-1.5 w-full bg-slate-50 overflow-hidden border border-slate-100/50">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out ${
                                                        value > 0
                                                            ? el.color
                                                            : "bg-transparent"
                                                    }`}
                                                    style={{
                                                        width: `${value}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            <div className="mt-8">
                                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                                    {elementDistribution.explanation}
                                </p>
                            </div>

                            {/* Rarity - Combined */}
                            {(rarity?.elementDistribution ||
                                rarity?.overall) && (
                                <div className="mt-8">
                                    <div className="bg-slate-50 border border-slate-200 p-4 md:p-5">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                            Rarity
                                        </div>
                                        <div className="space-y-3">
                                            {rarity?.elementDistribution && (
                                                <p className="text-sm text-slate-700 leading-relaxed">
                                                    This elemental distribution
                                                    pattern appears in{" "}
                                                    <strong className="text-slate-900 font-semibold">
                                                        {
                                                            rarity
                                                                .elementDistribution
                                                                .percentage
                                                        }
                                                        %
                                                    </strong>{" "}
                                                    of all charts.
                                                </p>
                                            )}
                                            {identity && rarity?.overall && (
                                                <div className="pt-3 border-t border-slate-200">
                                                    <p className="text-sm text-slate-700 leading-relaxed mb-2">
                                                        Your complete chart
                                                        signature:{" "}
                                                        <strong className="text-slate-900 font-semibold">
                                                            {identity.code} +{" "}
                                                            {elementDistribution.dominant.join(
                                                                " "
                                                            )}{" "}
                                                            Dominance
                                                        </strong>
                                                    </p>
                                                    <p className="text-sm text-slate-700 leading-relaxed">
                                                        This exact combination
                                                        (including Day Master
                                                        type, element
                                                        distribution, and all
                                                        special patterns)
                                                        appears in{" "}
                                                        <strong className="text-slate-900 font-semibold">
                                                            1 in{" "}
                                                            {rarity.overall.oneIn.toLocaleString()}
                                                        </strong>{" "}
                                                        people.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
