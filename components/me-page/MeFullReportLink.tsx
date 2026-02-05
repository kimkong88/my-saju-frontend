"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { requestFullReport } from "@/app/actions/meAction";
import SocialConnectionModal from "@/components/modals/SocialConnectionModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface MeFullReportLinkProps {
    reportCode: string;
}

export default function MeFullReportLink({
    reportCode: _reportCode,
}: MeFullReportLinkProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [socialModalOpen, setSocialModalOpen] = useState(false);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequestFullReport = async () => {
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
            // Try to get status from error object, or extract from error message
            let status = err?.status;

            // If status not found, try to extract from error message
            if (!status && errorMessage) {
                const statusMatch = errorMessage.match(/status (\d+)/i);
                if (statusMatch) {
                    status = parseInt(statusMatch[1], 10);
                }
            }

            // If error message indicates account not found, treat as 403
            if (
                !status &&
                (errorMessage === "account_not_found" ||
                    errorMessage.includes("account_not_found"))
            ) {
                status = 403;
            }

            // Handle specific error status codes
            if (status === 403) {
                // Forbidden - need to connect social account
                setError(null); // Clear any error message
                setSocialModalOpen(true);
            } else if (status === 402) {
                // Payment required - need subscription
                setError(null); // Clear any error message
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
        <>
            <section className="py-8 md:py-12 px-6 xl:px-0 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-50 rounded-sm p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2">
                                    Want the Full Picture?
                                </h3>
                                <p className="text-sm md:text-base text-slate-600">
                                    View your complete chart analysis, detailed
                                    strengths, weaknesses, and life themes.
                                </p>
                            </div>
                            <button
                                onClick={handleRequestFullReport}
                                disabled={isLoading}
                                className="w-full md:w-auto inline-flex items-center justify-center gap-2 cursor-pointer px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-sm md:text-base font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Loading..." : "View Full Report"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-sm">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

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
        </>
    );
}
