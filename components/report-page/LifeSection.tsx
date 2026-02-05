"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

export default function LifeSection({
    lifeThemes,
    isPremium = false,
}: {
    lifeThemes: {
        code: string;
        career: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            environments?: string;
            personalInsights?: string[];
        };
        wealth: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            personalInsights?: string[];
        };
        relationships: {
            title: string;
            emoji: string;
            description: string;
            advice?: string[];
            personalInsights?: string[];
        };
        health: {
            title: string;
            emoji: string;
            description: string;
            advice?: string[];
            warningAreas?: string;
            personalInsights?: string[];
        };
        learning: {
            title: string;
            emoji: string;
            description: string;
            examples?: string[];
            personalInsights?: string[];
        };
    };
    isPremium?: boolean;
}) {
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

    /**
     * Obfuscate text by replacing characters with dots/dashes while preserving structure
     */
    const obfuscateText = (text: string): string => {
        return text
            .split('')
            .map((char) => {
                if (char === ' ') return ' ';
                if (char === '\n') return '\n';
                if (char === '.') return '.';
                if (char === ',') return ',';
                if (char === '!') return '!';
                if (char === '?') return '?';
                if (char === '-') return '-';
                // Replace letters and numbers with dots/dashes
                return Math.random() > 0.5 ? '•' : '▪';
            })
            .join('');
    };

    const categories = [
        lifeThemes.career,
        lifeThemes.wealth,
        lifeThemes.relationships,
        lifeThemes.health,
        lifeThemes.learning,
    ];

    return (
        <section
            id="life-at-a-glance"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: High-Density & Professional --- */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Life at a Glance.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        How your chart manifests across different life domains.
                        Practical insights for career, wealth, relationships,
                        health, and growth.
                    </p>
                </div>

                {/* --- VERTICAL LIST: All Content Visible --- */}
                <div className="space-y-8 md:space-y-12 max-w-5xl">
                    {categories.map((category) => {
                        const hasExamples =
                            "examples" in category &&
                            Array.isArray(category.examples) &&
                            category.examples.length > 0 &&
                            category.examples.every(
                                (item) => typeof item === "string"
                            );
                        const hasAdvice =
                            "advice" in category &&
                            Array.isArray(category.advice) &&
                            category.advice.length > 0 &&
                            category.advice.every(
                                (item) => typeof item === "string"
                            );
                        const hasEnvironments =
                            "environments" in category &&
                            typeof category.environments === "string" &&
                            category.environments.trim().length > 0;
                        const hasWarningAreas =
                            "warningAreas" in category &&
                            typeof category.warningAreas === "string" &&
                            category.warningAreas.trim().length > 0;
                        const hasPersonalInsights =
                            "personalInsights" in category &&
                            Array.isArray(category.personalInsights) &&
                            category.personalInsights.length > 0 &&
                            category.personalInsights.every(
                                (item) => typeof item === "string"
                            );

                        return (
                            <div
                                key={category.title}
                                className="group relative pb-8 md:pb-12 last:pb-0 border-b border-slate-100 last:border-b-0"
                            >
                                {/* Header with Emoji */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-3xl md:text-4xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                        {category.emoji}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-medium text-slate-900 tracking-tight">
                                        {category.title}
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                                </div>

                                {/* Description and Content Sections - Gated for free users */}
                                {isPremium ? (
                                    <>
                                        {/* Description - Premium users see it clearly */}
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
                                            {category.description}
                                        </p>

                                        {/* Content Sections */}
                                        <div className="space-y-6">
                                    {/* Examples */}
                                    {hasExamples && "examples" in category && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                Examples
                                            </h4>
                                            <ul className="space-y-2">
                                                {Array.isArray(
                                                    category.examples
                                                ) &&
                                                    category.examples
                                                        .filter(
                                                            (item) =>
                                                                typeof item ===
                                                                "string"
                                                        )
                                                        .map(
                                                            (
                                                                example: string,
                                                                idx: number
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                >
                                                                    <span className="text-slate-300 mt-1.5">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            example
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Advice */}
                                    {hasAdvice && "advice" in category && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                Advice
                                            </h4>
                                            <ul className="space-y-2">
                                                {Array.isArray(
                                                    category.advice
                                                ) &&
                                                    category.advice
                                                        .filter(
                                                            (item) =>
                                                                typeof item ===
                                                                "string"
                                                        )
                                                        .map(
                                                            (
                                                                item: string,
                                                                idx: number
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                >
                                                                    <span className="text-slate-300 mt-1.5">
                                                                        •
                                                                    </span>
                                                                    <span>
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Environments */}
                                    {hasEnvironments &&
                                        "environments" in category && (
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                    Ideal Environments
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                    {typeof category.environments ===
                                                    "string"
                                                        ? category.environments
                                                        : ""}
                                                </p>
                                            </div>
                                        )}

                                    {/* Warning Areas */}
                                    {hasWarningAreas &&
                                        "warningAreas" in category && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                                                    Watch For
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                    {typeof category.warningAreas ===
                                                    "string"
                                                        ? category.warningAreas
                                                        : ""}
                                                </p>
                                            </div>
                                        )}

                                    {/* Personal Insights */}
                                    {hasPersonalInsights &&
                                        "personalInsights" in category && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                                                    Personal Insights
                                                </h4>
                                                <ul className="space-y-2">
                                                    {Array.isArray(
                                                        category.personalInsights
                                                    ) &&
                                                        category.personalInsights
                                                            .filter(
                                                                (item) =>
                                                                    typeof item ===
                                                                    "string"
                                                            )
                                                            .map(
                                                                (
                                                                    insight: string,
                                                                    idx: number
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                    >
                                                                        <span className="text-indigo-300 mt-1.5">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                insight
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                </ul>
                                            </div>
                                        )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="relative">
                                        {/* Blurred/Obfuscated Content - Show actual content but blurred */}
                                        <div className="space-y-6 blur-sm pointer-events-none select-none">
                                            {/* Description - Blurred for free users */}
                                            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
                                                {category.description}
                                            </p>
                                            {/* Examples */}
                                            {hasExamples && "examples" in category && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                        Examples
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {Array.isArray(category.examples) &&
                                                            category.examples
                                                                .filter((item) => typeof item === "string")
                                                                .map((example: string, idx: number) => (
                                                                    <li
                                                                        key={idx}
                                                                        className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                    >
                                                                        <span className="text-slate-300 mt-1.5">•</span>
                                                                        <span>{obfuscateText(example)}</span>
                                                                    </li>
                                                                ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Advice */}
                                            {hasAdvice && "advice" in category && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                                        Advice
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {Array.isArray(category.advice) &&
                                                            category.advice
                                                                .filter((item) => typeof item === "string")
                                                                .map((item: string, idx: number) => (
                                                                    <li
                                                                        key={idx}
                                                                        className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                    >
                                                                        <span className="text-slate-300 mt-1.5">•</span>
                                                                        <span>{obfuscateText(item)}</span>
                                                                    </li>
                                                                ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Environments */}
                                            {hasEnvironments && "environments" in category && (
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                        Ideal Environments
                                                    </h4>
                                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                        {typeof category.environments === "string"
                                                            ? obfuscateText(category.environments)
                                                            : ""}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Warning Areas */}
                                            {hasWarningAreas && "warningAreas" in category && (
                                                <div className="pt-4 border-t border-slate-100">
                                                    <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                                                        Watch For
                                                    </h4>
                                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                        {typeof category.warningAreas === "string"
                                                            ? obfuscateText(category.warningAreas)
                                                            : ""}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Personal Insights */}
                                            {hasPersonalInsights && "personalInsights" in category && (
                                                <div className="pt-4 border-t border-slate-100">
                                                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                                                        Personal Insights
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {Array.isArray(category.personalInsights) &&
                                                            category.personalInsights
                                                                .filter((item) => typeof item === "string")
                                                                .map((insight: string, idx: number) => (
                                                                    <li
                                                                        key={idx}
                                                                        className="text-sm md:text-base text-slate-600 flex items-start gap-2"
                                                                    >
                                                                        <span className="text-indigo-300 mt-1.5">•</span>
                                                                        <span>{obfuscateText(insight)}</span>
                                                                    </li>
                                                                ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Unlock Overlay - Semi-transparent so blurred content shows through */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/50 via-white/40 to-white/50 rounded-sm">
                                            <button
                                                onClick={handleUnlock}
                                                className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-4 flex items-center gap-3 group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 z-10 shadow-lg"
                                            >
                                                <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                                <span className="text-sm font-medium text-white">
                                                    Unlock Full Life Insights
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
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
