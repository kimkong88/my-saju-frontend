"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

export default function StrengthSection({
    strengths,
    isPremium = false,
}: {
    strengths: {
        title: string;
        description: string;
        emoji: string;
        isPersonal?: boolean;
    }[];
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

    // Show first item fully, rest blurred/obfuscated for free users
    const displayedStrengths = strengths;
    return (
        <section
            id="strengths"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: High-Density & Professional --- */}
                <div className="max-w-4xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Your Strengths.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        Competitive advantages hidden within your chart. These
                        are the natural talents and patterns that give you an
                        edge—the ways you&apos;re wired to excel.{" "}
                        <span className="text-sm text-slate-500 italic">
                            Traits marked &quot;Personal&quot; come from your
                            unique patterns and special stars, not just your
                            elemental type.
                        </span>
                    </p>
                </div>

                {/* --- VERTICAL STACK: Subtle Refined Stagger --- */}
                {displayedStrengths.length > 0 ? (
                    <div className="space-y-8 md:space-y-12">
                        {displayedStrengths.map((strength, index) => {
                            const isEven = index % 2 === 0;
                            const isFirstItem = index === 0;
                            const shouldShow = isPremium || isFirstItem;
                            
                            return (
                                <div
                                    key={strength.title}
                                    className={`group relative pb-8 md:pb-12 last:pb-0 transition-all duration-300 ${
                                        isEven
                                            ? "max-w-4xl"
                                            : "max-w-4xl md:ml-6 lg:ml-12"
                                    }`}
                                >
                                    {shouldShow ? (
                                        <>
                                            {/* Number + Icon Row */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="text-3xl md:text-4xl font-medium text-slate-200 group-hover:text-slate-300 transition-colors">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>
                                                <div className="text-2xl md:text-3xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                                    {strength.emoji}
                                                </div>
                                                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                                            </div>

                                            {/* Title with Personal Badge */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                                    {strength.title}
                                                </h3>
                                                {strength.isPersonal && (
                                                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-sm">
                                                        Personal
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description - Obfuscated for free users on first item */}
                                            {isPremium || isFirstItem ? (
                                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                                    {strength.description}
                                                </p>
                                            ) : (
                                                <div className="relative">
                                                    <p className="text-base md:text-lg text-slate-600 leading-relaxed blur-sm pointer-events-none select-none">
                                                        {obfuscateText(strength.description)}
                                                    </p>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-sm pointer-events-none">
                                                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-3 flex items-center gap-2 rounded-sm shadow-lg">
                                                            <Sparkles className="w-4 h-4 text-white/60" />
                                                            <span className="text-xs font-medium text-white">Unlock to read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        /* Blurred/Obfuscated item - no title shown */
                                        <div className="space-y-6 blur-sm pointer-events-none select-none opacity-60">
                                            {/* Number + Icon Row - obfuscated */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="text-3xl md:text-4xl font-medium text-slate-200">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>
                                                <div className="text-2xl md:text-3xl opacity-40">
                                                    {strength.emoji}
                                                </div>
                                                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                                            </div>
                                            {/* Title - obfuscated */}
                                            <div className="mb-3">
                                                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                                    {obfuscateText(strength.title)}
                                                </h3>
                                            </div>
                                            {/* Description - obfuscated */}
                                            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                                {obfuscateText(strength.description)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Single Unlock Button for Free Users - After all items */}
                        {!isPremium && displayedStrengths.length > 1 && (
                            <div className="relative mt-8 md:mt-12">
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handleUnlock}
                                        className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-4 flex items-center gap-3 group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 shadow-lg"
                                    >
                                        <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                        <span className="text-sm font-medium text-white">
                                            Unlock {displayedStrengths.length - 1} More Strength{displayedStrengths.length - 1 > 1 ? "s" : ""}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
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
