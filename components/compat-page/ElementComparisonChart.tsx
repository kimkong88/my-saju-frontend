"use client";

import type { Person } from "@/types/report";

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

interface ElementComparisonChartProps {
    person1: Person;
    person2: Person;
}

export default function ElementComparisonChart({
    person1,
    person2,
}: ElementComparisonChartProps) {
    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">
                        Element Distribution Comparison
                    </h3>
                    <p className="text-sm text-slate-600 mb-8">
                        See how your elemental energies compare and interact
                    </p>

                    {/* Side-by-side comparison layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Person 1 Chart - Them */}
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                {/* Avatar */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                    style={getElementBgStyle(person1.identity.element)}
                                >
                                    {getElementEmoji(person1.identity.element)}
                                </div>
                                {/* Identity Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-semibold text-slate-900">
                                            {person1.identity.code}
                                        </h4>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Them
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {person1.identity.title}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {ELEMENT_ORDER.map((el) => {
                                    const p1Data = person1.elementDistribution.elements.find(
                                        (e) => e.element === el.key
                                    );
                                    const value = p1Data?.percentage || 0;
                                    const isDominant = person1.elementDistribution.dominant.includes(
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

                        {/* Person 2 Chart - You */}
                        <div>
                            <div className="mb-6 flex items-center gap-4">
                                {/* Avatar */}
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-slate-900 flex-shrink-0"
                                    style={getElementBgStyle(person2.identity.element)}
                                >
                                    {getElementEmoji(person2.identity.element)}
                                </div>
                                {/* Identity Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-lg font-semibold text-slate-900">
                                            {person2.identity.code}
                                        </h4>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            You
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {person2.identity.title}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {ELEMENT_ORDER.map((el) => {
                                    const p2Data = person2.elementDistribution.elements.find(
                                        (e) => e.element === el.key
                                    );
                                    const value = p2Data?.percentage || 0;
                                    const isDominant = person2.elementDistribution.dominant.includes(
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

                    {/* Summary - Dominant and Missing Elements */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                                    {person1.identity.code} <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">(Them)</span>
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Dominant
                                        </span>
                                        <p className="text-sm text-slate-700 mt-1">
                                            {person1.elementDistribution.dominant.join(", ") || "None"}
                                        </p>
                                    </div>
                                    {person1.elementDistribution.missing.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Missing
                                            </span>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {person1.elementDistribution.missing.join(", ")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                                    {person2.identity.code} <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">(You)</span>
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                            Dominant
                                        </span>
                                        <p className="text-sm text-slate-700 mt-1">
                                            {person2.elementDistribution.dominant.join(", ") || "None"}
                                        </p>
                                    </div>
                                    {person2.elementDistribution.missing.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Missing
                                            </span>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {person2.elementDistribution.missing.join(", ")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
