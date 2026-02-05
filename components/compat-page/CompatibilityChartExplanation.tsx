"use client";

import type { CompatibilityReport } from "@/types/report";

interface CompatibilityChartExplanationProps {
    report: CompatibilityReport;
}

export default function CompatibilityChartExplanation({
    report,
}: CompatibilityChartExplanationProps) {
    if (!report.pairingExplanation && !report.chartDisplay.interaction.description) {
        return null;
    }

    return (
        <section className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Chart Interaction.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        How your elemental charts interact and what this means for your relationship
                    </p>
                </div>

                {/* Chart Display */}
                <div className="bg-white border border-slate-200 p-8 md:p-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
                        {/* Person 1 Chart */}
                        <div className="flex flex-col lg:pr-12">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    {report.person1.identity.code}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    <strong className="text-slate-900">
                                        The Four Pillars
                                    </strong>{" "}
                                    calculated from birth data
                                </p>
                            </div>
                            <div className="space-y-4 flex-1">
                                {report.chartDisplay.fullCharts.person1.map((pillar, index) => {
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
                                })}
                            </div>

                            <div className="mt-6 pt-4">
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    The{" "}
                                    <strong className="text-slate-700">
                                        Day Pillar
                                    </strong>{" "}
                                    represents the core self—fundamental personality and how they
                                    interact with the world.
                                </p>
                            </div>
                        </div>

                        {/* Person 2 Chart */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    {report.person2.identity.code}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    <strong className="text-slate-900">
                                        The Four Pillars
                                    </strong>{" "}
                                    calculated from birth data
                                </p>
                            </div>
                            <div className="space-y-4 flex-1">
                                {report.chartDisplay.fullCharts.person2.map((pillar, index) => {
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
                                })}
                            </div>

                            <div className="mt-6 pt-4">
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    The{" "}
                                    <strong className="text-slate-700">
                                        Day Pillar
                                    </strong>{" "}
                                    represents the core self—fundamental personality and how they
                                    interact with the world.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interaction */}
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
                                    {report.chartDisplay.interaction.description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Pairing Explanation */}
                {report.pairingExplanation && (
                    <div className="max-w-4xl space-y-8 md:space-y-12">
                        {/* Summary */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight mb-4">
                                {report.pairingExplanation.summary}
                            </h3>
                        </div>

                        {/* So What - with highlighted pairing title */}
                        {report.pairingExplanation.soWhat && (
                            <div>
                                <div className="text-base md:text-lg text-slate-700 leading-relaxed">
                                    {(() => {
                                        const soWhatText = report.pairingExplanation.soWhat;
                                        const pairingName = report.pairingTitle.name;

                                        // Find the pairing name in the text
                                        const pairingIndex = soWhatText.indexOf(pairingName);

                                        if (pairingIndex !== -1) {
                                            const beforePairing = soWhatText.substring(
                                                0,
                                                pairingIndex
                                            );
                                            const afterPairing = soWhatText.substring(
                                                pairingIndex + pairingName.length
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
                                            <span className="font-medium">{soWhatText}</span>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}

                        {/* Implications */}
                        {report.pairingExplanation.implications &&
                            report.pairingExplanation.implications.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-4">
                                        Implications
                                    </h4>
                                    <ul className="space-y-3">
                                        {report.pairingExplanation.implications.map(
                                            (implication, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="text-slate-400 mt-1">•</span>
                                                    <p className="text-base text-slate-700 leading-relaxed flex-1">
                                                        {implication}
                                                    </p>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                    </div>
                )}
            </div>
        </section>
    );
}
