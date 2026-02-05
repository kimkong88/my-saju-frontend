"use client";

import type { CompatibilityReport } from "@/types/report";

// Element colors matching the personal report
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ELEMENT_COLORS: Record<string, string> = {
    WOOD: "bg-emerald-600",
    FIRE: "bg-rose-500",
    EARTH: "bg-amber-700",
    METAL: "bg-slate-400",
    WATER: "bg-blue-600",
};

// Element order matching personal report
const ELEMENT_ORDER = [
    { key: "FIRE", label: "Fire", color: "bg-rose-500" },
    { key: "EARTH", label: "Earth", color: "bg-amber-700" },
    { key: "METAL", label: "Metal", color: "bg-slate-400" },
    { key: "WATER", label: "Water", color: "bg-blue-600" },
    { key: "WOOD", label: "Wood", color: "bg-emerald-600" },
];

function getElementEmoji(element: string | undefined): string {
    if (!element) return "✨";
    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";
    return "✨";
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    if (elementLower.includes("fire")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(234, 88, 12, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(148, 163, 184, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(203, 213, 225, 0.08) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }

    return { backgroundColor: baseColor };
}

interface CompatibilityBirthChartSectionProps {
    report: CompatibilityReport;
}

export default function CompatibilityBirthChartSection({
    report,
}: CompatibilityBirthChartSectionProps) {
    // Check if we have chart explanation data
    const hasChartExplanation =
        report.pairingExplanation ||
        report.chartDisplay.interaction.description;

    return (
        <section
            id="birth-chart"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Your Charts.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        The foundation of your compatibility—how your birth
                        charts compare and interact. Understanding these
                        patterns reveals the deeper dynamics of your
                        relationship.
                    </p>
                </div>

                {/* Chart Explanation - Pairing Explanation - Moved to top */}
                {hasChartExplanation && report.pairingExplanation && (
                    <div className="max-w-4xl mb-12 md:mb-16">
                        {/* What This Means */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                What This Means
                            </h3>
                            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                                {report.pairingExplanation.summary}
                            </p>
                        </div>

                        {/* Key Implications */}
                        {report.pairingExplanation.implications &&
                            report.pairingExplanation.implications.length >
                                0 && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                        Key Implications
                                    </h4>
                                    <ul className="space-y-3">
                                        {report.pairingExplanation.implications.map(
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

                        {/* So What - with highlighted pairing title */}
                        {report.pairingExplanation.soWhat && (
                            <div className="space-y-4">
                                <div className="text-base md:text-lg text-slate-900 leading-relaxed">
                                    {(() => {
                                        const soWhatText =
                                            report.pairingExplanation.soWhat;
                                        const pairingName =
                                            report.pairingTitle.name;

                                        // Find the pairing name in the text
                                        const pairingIndex =
                                            soWhatText.indexOf(pairingName);

                                        if (pairingIndex !== -1) {
                                            const beforePairing =
                                                soWhatText.substring(
                                                    0,
                                                    pairingIndex
                                                );
                                            const afterPairing =
                                                soWhatText.substring(
                                                    pairingIndex +
                                                        pairingName.length
                                                );

                                            return (
                                                <>
                                                    {beforePairing && (
                                                        <span className="font-medium">
                                                            {beforePairing}
                                                        </span>
                                                    )}
                                                    <span className="inline-block bg-slate-900 text-white px-3 py-1.5 font-bold text-lg md:text-xl tracking-tight mx-1 my-1">
                                                        {pairingName}
                                                    </span>
                                                    {afterPairing && (
                                                        <span className="font-medium">
                                                            {afterPairing}
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
                                {report.chartDisplay.interaction
                                    ?.description && (
                                    <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-300 pl-4">
                                        {
                                            report.chartDisplay.interaction
                                                .description
                                        }
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Birth Charts - Side by Side */}
                <div className="bg-white border border-slate-200 p-8 md:p-12 mb-12">
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                            Birth Charts
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            <strong className="text-slate-900">
                                The Four Pillars
                            </strong>{" "}
                            calculated from birth data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                        {/* Person 1 Chart */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-4">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                        style={getElementBgStyle(
                                            report.person1.identity.element
                                        )}
                                    >
                                        {getElementEmoji(
                                            report.person1.identity.element
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-lg font-semibold text-slate-900">
                                                {report.person1.identity.code}
                                            </h4>
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Them
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {report.person1.identity.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 flex-1">
                                {report.chartDisplay.fullCharts.person1.map(
                                    (pillar, index) => {
                                        const isCore = pillar.isCore ?? false;
                                        return (
                                            <div
                                                key={index}
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
                                                            {pillar.pillar}
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
                                                            {pillar.meaning}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Person 2 Chart */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center gap-4">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                        style={getElementBgStyle(
                                            report.person2.identity.element
                                        )}
                                    >
                                        {getElementEmoji(
                                            report.person2.identity.element
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-lg font-semibold text-slate-900">
                                                {report.person2.identity.code}
                                            </h4>
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                You
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {report.person2.identity.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 flex-1">
                                {report.chartDisplay.fullCharts.person2.map(
                                    (pillar, index) => {
                                        const isCore = pillar.isCore ?? false;
                                        return (
                                            <div
                                                key={index}
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
                                                            {pillar.pillar}
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
                                                            {pillar.meaning}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <p className="text-sm text-slate-500 leading-relaxed">
                            The{" "}
                            <strong className="text-slate-700">
                                Day Pillar
                            </strong>{" "}
                            represents the core self—fundamental personality and
                            how they interact with the world.
                        </p>
                    </div>
                </div>

                {/* Element Distribution - Separate Section */}
                <div className="bg-white border border-slate-200 p-8 md:p-12">
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                            Element Distribution
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            How your elemental energies compare
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                        {/* Person 1 Element Distribution */}
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                    style={getElementBgStyle(
                                        report.person1.identity.element
                                    )}
                                >
                                    {getElementEmoji(
                                        report.person1.identity.element
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-semibold text-slate-900">
                                            {report.person1.identity.code}
                                        </h4>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Them
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {report.person1.identity.title}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {ELEMENT_ORDER.map((el) => {
                                    const p1Data =
                                        report.person1.elementDistribution.elements.find(
                                            (e) => e.element === el.key
                                        );
                                    const value = p1Data?.percentage || 0;
                                    const isDominant =
                                        report.person1.elementDistribution.dominant.includes(
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
                                                    {value.toFixed(1)}%
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
                        </div>

                        {/* Person 2 Element Distribution */}
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                    style={getElementBgStyle(
                                        report.person2.identity.element
                                    )}
                                >
                                    {getElementEmoji(
                                        report.person2.identity.element
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-semibold text-slate-900">
                                            {report.person2.identity.code}
                                        </h4>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            You
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {report.person2.identity.title}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {ELEMENT_ORDER.map((el) => {
                                    const p2Data =
                                        report.person2.elementDistribution.elements.find(
                                            (e) => e.element === el.key
                                        );
                                    const value = p2Data?.percentage || 0;
                                    const isDominant =
                                        report.person2.elementDistribution.dominant.includes(
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
                                                    {value.toFixed(1)}%
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
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="font-medium text-slate-500 uppercase tracking-wider">
                                    {report.person1.identity.code} Dominant
                                </span>
                                <p className="text-slate-700 mt-1">
                                    {report.person1.elementDistribution.dominant.join(
                                        ", "
                                    ) || "None"}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-slate-500 uppercase tracking-wider">
                                    {report.person2.identity.code} Dominant
                                </span>
                                <p className="text-slate-700 mt-1">
                                    {report.person2.elementDistribution.dominant.join(
                                        ", "
                                    ) || "None"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Chart Interaction */}
                    {report.chartDisplay.interaction && (
                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl font-mono text-slate-900">
                                    {report.chartDisplay.interaction.visual}
                                </span>
                                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {report.chartDisplay.interaction.type}
                                </span>
                            </div>
                            {report.chartDisplay.interaction.description && (
                                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-300 pl-4">
                                    {
                                        report.chartDisplay.interaction
                                            .description
                                    }
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
