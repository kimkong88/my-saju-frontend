"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import type { CompatibilityCategory } from "@/types/report";

interface CompatibilitySummaryTableProps {
    categories: CompatibilityCategory[];
    overview?: string;
    isPremium?: boolean;
}

// Score to numeric value for calculation
function getScoreValue(score: string): number {
    if (score === "Highly Compatible") return 5;
    if (score === "Compatible") return 4;
    if (score === "Neutral") return 3;
    if (score === "Challenging") return 2;
    return 1; // "Highly Challenging"
}

function getScoreLabel(score: string): string {
    return score;
}

function getScoreColor(score: string): string {
    if (score === "Highly Compatible") return "text-emerald-700";
    if (score === "Compatible") return "text-blue-700";
    if (score === "Neutral") return "text-amber-700";
    if (score === "Challenging") return "text-orange-700";
    return "text-red-700";
}

function getScoreBgColor(score: string): string {
    if (score === "Highly Compatible")
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score === "Compatible")
        return "bg-blue-50 text-blue-700 border-blue-200";
    if (score === "Neutral")
        return "bg-amber-50 text-amber-700 border-amber-200";
    if (score === "Challenging")
        return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-red-50 text-red-700 border-red-200";
}

/**
 * Obfuscate text by replacing characters with dots/dashes while preserving structure
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function obfuscateText(text: string): string {
    return text
        .split("")
        .map((char) => {
            if (char === " ") return " ";
            if (char === "\n") return "\n";
            if (char === ".") return ".";
            if (char === ",") return ",";
            if (char === "!") return "!";
            if (char === "?") return "?";
            if (char === "-") return "-";
            // Replace letters and numbers with dots/dashes
            return Math.random() > 0.5 ? "•" : "▪";
        })
        .join("");
}

export default function CompatibilitySummaryTable({
    categories,
    overview,
    isPremium = false,
}: CompatibilitySummaryTableProps) {
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        setSubscriptionModalOpen(false);
    };

    const handleUnlock = () => {
        if (!isPremium) {
            setSubscriptionModalOpen(true);
        }
    };

    // Reorder categories: Communication first, then others
    const sortedCategories = [...categories].sort((a, b) => {
        if (a.category === "communication") return -1;
        if (b.category === "communication") return 1;
        return 0;
    });

    // Calculate overall scores (using original order for calculation)
    const allSubCategories = categories.flatMap((cat) =>
        cat.subCategories.map((sub) => ({
            category: cat.title,
            subCategory: sub.title,
            score: sub.result.score,
        }))
    );

    // Calculate per category averages (using sorted order for display)
    const categoryAverages = sortedCategories.map((cat) => {
        const scores = cat.subCategories.map((sub) =>
            getScoreValue(sub.result.score)
        );
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        // Map back to label
        let label: string;
        if (avg >= 4.5) label = "Highly Compatible";
        else if (avg >= 3.5) label = "Compatible";
        else if (avg >= 2.5) label = "Neutral";
        else if (avg >= 1.5) label = "Challenging";
        else label = "Highly Challenging";

        return {
            category: cat.title,
            emoji: cat.emoji,
            score: label,
            avgValue: avg,
        };
    });

    // Calculate overall average
    const overallAvg =
        allSubCategories.reduce(
            (sum, item) => sum + getScoreValue(item.score),
            0
        ) / allSubCategories.length;
    let overallLabel: string;
    if (overallAvg >= 4.5) overallLabel = "Highly Compatible";
    else if (overallAvg >= 3.5) overallLabel = "Compatible";
    else if (overallAvg >= 2.5) overallLabel = "Neutral";
    else if (overallAvg >= 1.5) overallLabel = "Challenging";
    else overallLabel = "Highly Challenging";

    return (
        <section
            id="compatibility-overview"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Compatibility Overview.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mb-6">
                        Quick glance at your compatibility across all areas
                    </p>
                    {overview && (
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            {overview}
                        </p>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Subcategory
                                </th>
                                <th className="hidden md:table-cell text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Compatibility
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCategories.map((category, catIndex) => {
                                const isFirstCategory = catIndex === 0;
                                const shouldShow = isPremium || isFirstCategory;

                                return category.subCategories.map(
                                    (subCategory, subIndex) => (
                                        <tr
                                            key={`${catIndex}-${subIndex}`}
                                            className={`border-b border-slate-100 ${
                                                subIndex ===
                                                category.subCategories.length -
                                                    1
                                                    ? "border-b-2 border-slate-200"
                                                    : ""
                                            }`}
                                        >
                                            {subIndex === 0 && (
                                                <td
                                                    className="py-3 px-4 align-top"
                                                    rowSpan={
                                                        category.subCategories
                                                            .length
                                                    }
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">
                                                            {category.emoji}
                                                        </span>
                                                        <span className="text-sm font-medium text-slate-900">
                                                            {category.title}
                                                        </span>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="py-3 px-4">
                                                <div className="md:block">
                                                    <div className="text-sm text-slate-700 mb-2 md:mb-0">
                                                        {subCategory.title}
                                                    </div>
                                                    <div className="md:hidden">
                                                        {shouldShow ? (
                                                            <span
                                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getScoreBgColor(
                                                                    subCategory
                                                                        .result
                                                                        .score
                                                                )}`}
                                                            >
                                                                {getScoreLabel(
                                                                    subCategory
                                                                        .result
                                                                        .score
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-slate-100 text-slate-400 border-slate-200">
                                                                •••••
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                className={`hidden md:table-cell py-3 px-4 text-right ${
                                                    !shouldShow
                                                        ? "blur-sm pointer-events-none select-none opacity-60"
                                                        : ""
                                                }`}
                                            >
                                                {shouldShow ? (
                                                    <span
                                                        className={`text-sm font-medium ${getScoreColor(
                                                            subCategory.result
                                                                .score
                                                        )}`}
                                                    >
                                                        {getScoreLabel(
                                                            subCategory.result
                                                                .score
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm font-medium text-slate-400">
                                                        •••••
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                            {/* Category averages */}
                            {categoryAverages.map((catAvg, index) => {
                                const isFirstCategory = index === 0;
                                const shouldShow = isPremium || isFirstCategory;

                                return (
                                    <tr
                                        key={`avg-${index}`}
                                        className="bg-slate-50 border-b-2 border-slate-200"
                                    >
                                        <td colSpan={2} className="py-3 px-4">
                                            <div className="md:block">
                                                <div className="text-sm font-semibold text-slate-900 mb-2 md:mb-0">
                                                    {catAvg.category} Average
                                                </div>
                                                <div className="md:hidden">
                                                    {shouldShow ? (
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getScoreBgColor(
                                                                catAvg.score
                                                            )}`}
                                                        >
                                                            {getScoreLabel(
                                                                catAvg.score
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-slate-100 text-slate-400 border-slate-200">
                                                            •••••
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={`hidden md:table-cell py-3 px-4 text-right ${
                                                !shouldShow
                                                    ? "blur-sm pointer-events-none select-none opacity-60"
                                                    : ""
                                            }`}
                                        >
                                            {shouldShow ? (
                                                <span
                                                    className={`text-sm font-semibold ${getScoreColor(
                                                        catAvg.score
                                                    )}`}
                                                >
                                                    {getScoreLabel(
                                                        catAvg.score
                                                    )}
                                                </span>
                                            ) : (
                                                <span className="text-sm font-semibold text-slate-400">
                                                    •••••
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Overall */}
                            <tr className="bg-slate-900 text-white border-t-4 border-slate-900">
                                <td colSpan={2} className="py-4 px-4">
                                    <div className="md:block">
                                        <div className="text-base font-semibold text-white mb-2 md:mb-0">
                                            Overall Compatibility
                                        </div>
                                        <div className="md:hidden">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30">
                                                {getScoreLabel(overallLabel)}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell py-4 px-4 text-right">
                                    <span className="text-base font-semibold text-white">
                                        {getScoreLabel(overallLabel)}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Unlock Button for Free Users */}
                {!isPremium && sortedCategories.length > 1 && (
                    <div className="relative mt-8 md:mt-12">
                        <div className="flex items-center justify-center">
                            <button
                                onClick={handleUnlock}
                                className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-4 flex items-center gap-3 group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 shadow-lg"
                            >
                                <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                <span className="text-sm font-medium text-white">
                                    Unlock {sortedCategories.length - 1} More
                                    Categor
                                    {sortedCategories.length - 1 > 1
                                        ? "ies"
                                        : "y"}
                                </span>
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Subscription Modal */}
            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
                onSubscribe={handleSubscribe}
            />
        </section>
    );
}
