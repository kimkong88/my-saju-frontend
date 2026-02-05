"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SpecialTrait } from "@/types/report";
import { requestFullReport } from "@/app/actions/meAction";
import SocialConnectionModal from "@/components/modals/SocialConnectionModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface MeSpecialTraitsProps {
    specialTraits: SpecialTrait[];
    overallRarity?: {
        oneIn: number;
    };
    reportCode?: string; // User ID or report code for personal report link
    isPremium?: boolean; // Future: check if user has premium subscription
}

export default function MeSpecialTraits({
    specialTraits,
    overallRarity,
    reportCode,
    isPremium = false, // Default to free user
}: MeSpecialTraitsProps) {
    // Always show the section, even if no traits
    const hasTraits = specialTraits && specialTraits.length > 0;
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [socialModalOpen, setSocialModalOpen] = useState(false);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequestFullReport = async () => {
        if (isPremium) {
            // Premium users - do nothing
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const result = await requestFullReport();

            // Success - navigate to full report page (same flow as createPersonalReport)
            router.push(`/me/${result.code}`);
        } catch (error) {
            console.error("Error requesting full report:", error);
            const err = error as Error & { status?: number; message?: string };

            const errorMessage = err?.message || String(error);
            const status = err?.status;

            // Handle specific error status codes
            if (status === 403) {
                // Forbidden - need to connect social account
                setSocialModalOpen(true);
            } else if (status === 402) {
                // Payment required - need subscription
                setSubscriptionModalOpen(true);
            } else {
                // Other errors (401, 404, 500, etc.)
                setError(
                    errorMessage ||
                        "Failed to load report. Please try again later."
                );
            }

            setIsLoading(false);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        // For now, just close the modal
        setSubscriptionModalOpen(false);
    };

    return (
        <section className="py-12 md:py-16 px-6 xl:px-0">
            <div className="max-w-7xl mx-auto">
                {/* Header with Rarity */}
                <div className="mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                                What Makes You Special
                            </h2>
                            <p className="text-sm md:text-base text-slate-600">
                                {hasTraits
                                    ? "These rare patterns and stars in your chart make you uniquely you"
                                    : "Discover the unique patterns and insights in your chart"}
                            </p>
                        </div>
                        {overallRarity && (
                            <div className="flex-shrink-0 text-left sm:text-right mt-2 sm:mt-0">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                                    Overall Rarity
                                </p>
                                <p className="text-lg md:text-xl font-semibold text-slate-900">
                                    1 in {overallRarity.oneIn.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Special Traits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Rarity Explanation Card - Always show if overallRarity exists */}
                    {overallRarity && (
                        <div className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-slate-200 rounded-sm">
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl">💎</div>
                                    <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                        Your Rarity
                                    </span>
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                    1 in {overallRarity.oneIn.toLocaleString()}
                                </h4>

                                <p className="text-sm text-slate-500 leading-relaxed">
                                    This means your exact birth chart
                                    combination appears in only 1 out of{" "}
                                    {overallRarity.oneIn.toLocaleString()}{" "}
                                    people. The higher the number, the more
                                    unique your chart is.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Existing Special Traits */}
                    {hasTraits &&
                        specialTraits.map((trait) => (
                            <div
                                key={trait.name}
                                className="bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between md:hover:bg-slate-50 transition-colors group border border-slate-200 rounded-sm"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                                        <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                            {trait.emoji}
                                        </div>
                                        {trait.rarity && (
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                {trait.rarity}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                        {trait.name}
                                    </h4>

                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {trait.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                    {/* Funnel Card for Free Users / Premium Feature Card */}
                    {isPremium ? (
                        // Premium User Card - Showcase premium features they have access to
                        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-6 sm:p-8 md:p-10 flex flex-col justify-between group border-2 border-amber-200 rounded-sm hover:border-amber-300 transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl">✨</div>
                                    <Sparkles className="w-5 h-5 text-amber-600" />
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight mb-3 sm:mb-4">
                                    Premium Member
                                </h4>

                                <p className="text-sm text-slate-700 leading-relaxed mb-4 sm:mb-6">
                                    You have access to advanced forecasts,
                                    detailed life cycle analysis, and exclusive
                                    premium insights.
                                </p>

                                {reportCode && (
                                    <Link
                                        href={`/personal/${reportCode}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-amber-900 hover:gap-3 transition-all group/link"
                                    >
                                        Explore Premium Features
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ) : reportCode ? (
                        // Free User Funnel Card - triggers same flow as bottom CTA
                        <button
                            onClick={handleRequestFullReport}
                            disabled={isLoading || isPremium}
                            className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10 flex flex-col justify-between group border-2 border-slate-900 rounded-sm hover:shadow-2xl transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl transition-all">
                                        <span className="group-hover:hidden">
                                            🔒
                                        </span>
                                        <span className="hidden group-hover:inline">
                                            🔓
                                        </span>
                                    </div>
                                    <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-3 sm:mb-4">
                                    Discover More About Yourself
                                </h4>

                                <p className="text-sm text-white/80 leading-relaxed mb-4 sm:mb-6">
                                    Explore your complete chart analysis,
                                    detailed strengths, weaknesses, and life
                                    themes in your full personal report.
                                </p>

                                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                                    {isLoading
                                        ? "Loading..."
                                        : "View Full Report"}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </button>
                    ) : (
                        // Fallback card if no reportCode
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-2 border-slate-900 rounded-sm">
                            <div>
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div className="text-2xl">📖</div>
                                    <Sparkles className="w-5 h-5 text-white/60" />
                                </div>

                                <h4 className="text-lg sm:text-xl font-medium text-white tracking-tight mb-3 sm:mb-4">
                                    Discover More About Yourself
                                </h4>

                                <p className="text-sm text-white/80 leading-relaxed">
                                    Your full personal report is being prepared.
                                    Check back soon!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {error && (
                    <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-sm">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}
            </div>

            {/* Social Connection Modal (403) */}
            <SocialConnectionModal
                isOpen={socialModalOpen}
                onOpenChange={setSocialModalOpen}
            />

            {/* Subscription Modal (402) */}
            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
                onSubscribe={handleSubscribe}
            />
        </section>
    );
}
