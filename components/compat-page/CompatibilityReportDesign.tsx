/**
 * Design mockup for the new compatibility report structure
 * This is a design preview - not the final implementation
 */

"use client";

import { useState } from "react";
import { mockCompatibilityReport } from "@/lib/mock-data/compatibility-report";

// Element colors matching the personal report
const ELEMENT_COLORS: Record<string, string> = {
    WOOD: "bg-emerald-600",
    FIRE: "bg-rose-500",
    EARTH: "bg-amber-700",
    METAL: "bg-slate-400",
    WATER: "bg-blue-600",
};

const ELEMENT_LABELS: Record<string, string> = {
    WOOD: "WOOD",
    FIRE: "FIRE",
    EARTH: "EARTH",
    METAL: "METAL",
    WATER: "WATER",
};

function ElementComparisonChart({
    person1,
    person2,
}: {
    person1: typeof mockCompatibilityReport.person1;
    person2: typeof mockCompatibilityReport.person2;
}) {
    // Get all unique elements from both persons
    const allElements = ["WOOD", "FIRE", "EARTH", "METAL", "WATER"];

    return (
        <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">
                Element Distribution Comparison
            </h3>
            <p className="text-sm text-slate-600 mb-6">
                See how your elemental energies compare and interact
            </p>

            <div className="space-y-8">
                {allElements.map((element) => {
                    const p1Data = person1.elementDistribution.elements.find(
                        (e) => e.element === element
                    );
                    const p2Data = person2.elementDistribution.elements.find(
                        (e) => e.element === element
                    );

                    const p1Percentage = p1Data?.percentage || 0;
                    const p2Percentage = p2Data?.percentage || 0;
                    const p1Count = p1Data?.count || 0;
                    const p2Count = p2Data?.count || 0;
                    const emoji = p1Data?.emoji || p2Data?.emoji || "";

                    return (
                        <div key={element} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{emoji}</span>
                                    <span className="text-sm font-bold tracking-widest uppercase text-slate-700">
                                        {ELEMENT_LABELS[element]}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>
                                        {person1.identity.code}: {p1Count} ({p1Percentage.toFixed(1)}%)
                                    </span>
                                    <span>•</span>
                                    <span>
                                        {person2.identity.code}: {p2Count} ({p2Percentage.toFixed(1)}%)
                                    </span>
                                </div>
                            </div>

                            {/* Side-by-side bars */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Person 1 */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{person1.identity.code}</span>
                                        <span className="font-mono">{p1Percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 overflow-hidden border border-slate-100/50">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out ${
                                                p1Percentage > 0
                                                    ? ELEMENT_COLORS[element]
                                                    : "bg-transparent"
                                            }`}
                                            style={{
                                                width: `${p1Percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Person 2 */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{person2.identity.code}</span>
                                        <span className="font-mono">{p2Percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 overflow-hidden border border-slate-100/50">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out ${
                                                p2Percentage > 0
                                                    ? ELEMENT_COLORS[element]
                                                    : "bg-transparent"
                                            }`}
                                            style={{
                                                width: `${p2Percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2">
                            {person1.identity.code} Dominant
                        </h4>
                        <p className="text-sm text-slate-600">
                            {person1.elementDistribution.dominant.join(", ")}
                        </p>
                        {person1.elementDistribution.missing.length > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                                Missing: {person1.elementDistribution.missing.join(", ")}
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2">
                            {person2.identity.code} Dominant
                        </h4>
                        <p className="text-sm text-slate-600">
                            {person2.elementDistribution.dominant.join(", ")}
                        </p>
                        {person2.elementDistribution.missing.length > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                                Missing: {person2.elementDistribution.missing.join(", ")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategorySection({
    category,
}: {
    category: (typeof mockCompatibilityReport.categories)[0];
}) {
    const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null);

    const getScoreColor = (score: string) => {
        if (score === "Highly Compatible") return "text-emerald-700 bg-emerald-50 border-emerald-200";
        if (score === "Compatible") return "text-blue-700 bg-blue-50 border-blue-200";
        if (score === "Neutral") return "text-amber-700 bg-amber-50 border-amber-200";
        if (score === "Challenging") return "text-orange-700 bg-orange-50 border-orange-200";
        return "text-red-700 bg-red-50 border-red-200";
    };

    return (
        <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.emoji}</span>
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    {category.title}
                </h3>
            </div>

            <div className="space-y-6">
                {category.subCategories.map((subCategory, index) => {
                    const isExpanded = expandedSubCategory === `${category.category}-${index}`;
                    return (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-sm overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setExpandedSubCategory(
                                        isExpanded ? null : `${category.category}-${index}`
                                    )
                                }
                                className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-medium text-slate-900">
                                        {subCategory.title}
                                    </h4>
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColor(
                                            subCategory.result.score
                                        )}`}
                                    >
                                        {subCategory.result.score}
                                    </div>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="p-4 pt-0 space-y-4 border-t border-slate-200">
                                    {/* Person Analyses */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-sm">
                                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                {mockCompatibilityReport.person1.identity.code}
                                            </h5>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                {subCategory.person1Analysis}
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-sm">
                                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                You ({mockCompatibilityReport.person2.identity.code})
                                            </h5>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                {subCategory.person2Analysis}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Result */}
                                    <div className="bg-slate-900 text-white p-4 rounded-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-semibold">
                                                {subCategory.result.match}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/90 leading-relaxed mb-2">
                                            {subCategory.result.analysis}
                                        </p>
                                        {"actionableTip" in subCategory.result && subCategory.result.actionableTip && (
                                            <div className="mt-3 pt-3 border-t border-white/20">
                                                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                                                    Tip
                                                </p>
                                                <p className="text-sm text-white/80 leading-relaxed">
                                                    {subCategory.result.actionableTip}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function CompatibilityReportDesign() {
    const data = mockCompatibilityReport;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 xl:px-0">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="bg-white border border-slate-200 rounded-sm p-8 md:p-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tighter text-slate-900 mb-4">
                        {data.pairingTitle.name}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-6">
                        {data.pairingTitle.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                        <span>{data.person1.identity.code}</span>
                        <span>×</span>
                        <span>{data.person2.identity.code}</span>
                        <span>•</span>
                        <span>1 in {data.rarity.oneIn.toLocaleString()}</span>
                    </div>
                </div>

                {/* Introduction */}
                <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                    <p className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
                        {data.introduction}
                    </p>
                </div>

                {/* Element Comparison Chart */}
                <ElementComparisonChart person1={data.person1} person2={data.person2} />

                {/* Categories */}
                {data.categories.map((category, index) => (
                    <CategorySection key={index} category={category} />
                ))}

                {/* Overview */}
                <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                        Overall Compatibility
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed max-w-4xl">
                        {data.overview}
                    </p>
                </div>

                {/* Special Connections */}
                {data.specialConnections.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">
                            Special Connections
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.specialConnections.map((connection, index) => (
                                <div
                                    key={index}
                                    className="border border-slate-200 rounded-sm p-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{connection.emoji}</span>
                                        <h4 className="text-lg font-semibold text-slate-900">
                                            {connection.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2">{connection.rarity}</p>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {connection.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
