"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import type { CompatibilityCategory } from "@/types/report";

interface CompatibilityCategorySectionProps {
    category: CompatibilityCategory;
    person1Code: string;
    person2Code: string;
    isPremium?: boolean;
}

/**
 * Obfuscate text by replacing characters with dots/dashes while preserving structure
 */
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

export default function CompatibilityCategorySection({
    category,
    person1Code: _person1Code,
    person2Code: _person2Code,
    isPremium = false,
}: CompatibilityCategorySectionProps) {
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

    // Check if this is the first category (Communication)
    const isFirstCategory = category.category === "communication";
    const shouldShowResults = isPremium || isFirstCategory;
    return (
        <section
            id={`category-${category.category}`}
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        {category.title}.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        How you both approach {category.title.toLowerCase()} in
                        your relationship
                    </p>
                </div>

                {/* Subcategories - Vertical Stack, No Boxes */}
                <div className="space-y-8 md:space-y-12">
                    {category.subCategories.map((subCategory, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className={`group relative pb-8 md:pb-12 last:pb-0 transition-all duration-300 ${
                                    isEven
                                        ? "max-w-4xl"
                                        : "max-w-4xl md:ml-6 lg:ml-12"
                                }`}
                            >
                                {/* Number + Title Row */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-3xl md:text-4xl font-medium text-slate-200 group-hover:text-slate-300 transition-colors">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                        {subCategory.title}
                                    </h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                                </div>

                                {/* Person Analyses */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                            Them
                                        </h4>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                            {subCategory.person1Analysis}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                            You
                                        </h4>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                            {subCategory.person2Analysis}
                                        </p>
                                    </div>
                                </div>

                                {/* Result - Dark Background - Premium Gated */}
                                {shouldShowResults ? (
                                    <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm">
                                        <div className="mb-3">
                                            <span className="text-base md:text-lg font-semibold">
                                                {subCategory.result.match}
                                            </span>
                                        </div>
                                        <p className="text-base md:text-lg text-white/90 leading-relaxed mb-3">
                                            {subCategory.result.analysis}
                                        </p>
                                        {subCategory.result.actionableTip && (
                                            <div className="pt-4 border-t border-white/20">
                                                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                                                    Tip
                                                </p>
                                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                                    {
                                                        subCategory.result
                                                            .actionableTip
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm blur-sm pointer-events-none select-none opacity-60">
                                            <div className="mb-3">
                                                <span className="text-base md:text-lg font-semibold">
                                                    {obfuscateText(
                                                        subCategory.result.match
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-3">
                                                {obfuscateText(
                                                    subCategory.result.analysis
                                                )}
                                            </p>
                                            {subCategory.result
                                                .actionableTip && (
                                                <div className="pt-4 border-t border-white/20">
                                                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                                                        Tip
                                                    </p>
                                                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                                        {obfuscateText(
                                                            subCategory.result
                                                                .actionableTip
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-sm pointer-events-none">
                                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-3 flex items-center gap-2 rounded-sm shadow-lg">
                                                <Sparkles className="w-4 h-4 text-white/60" />
                                                <span className="text-xs font-medium text-white">
                                                    Unlock to read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Single Unlock Button for Free Users - After all subcategories */}
                    {!shouldShowResults &&
                        category.subCategories.length > 0 && (
                            <div className="relative mt-8 md:mt-12">
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handleUnlock}
                                        className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-4 flex items-center gap-3 group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 shadow-lg"
                                    >
                                        <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                        <span className="text-sm font-medium text-white">
                                            Unlock {category.title}{" "}
                                            Compatibility Results
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        )}
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
