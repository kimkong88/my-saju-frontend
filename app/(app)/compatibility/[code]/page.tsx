"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { getReport } from "@/app/actions/reportAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import type { CompatibilityReport } from "@/types/report";
import CompatibilityReportNavigation from "@/components/compat-page/CompatibilityReportNavigation";
import CompatibilityHeroSection from "@/components/compat-page/CompatibilityHeroSection";
import CompatibilityBirthChartSection from "@/components/compat-page/CompatibilityBirthChartSection";
import CompatibilityPersonalReportCTA from "@/components/compat-page/CompatibilityPersonalReportCTA";
import CompatibilitySummaryTable from "@/components/compat-page/CompatibilitySummaryTable";
import CompatibilityCategorySection from "@/components/compat-page/CompatibilityCategorySection";
import CompatibilityShareSection from "@/components/compat-page/CompatibilityShareSection";

export default function CompatibilityReportPage() {
    const params = useParams();
    const router = useRouter();
    const code = params.code as string;

    const [report, setReport] = useState<CompatibilityReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load subscription status
    useEffect(() => {
        const loadSubscription = async () => {
            try {
                const subscription = await getSubscriptionStatus();
                setIsPremium(subscription?.isSubscribed || false);
            } catch (error) {
                console.error("Error loading subscription status:", error);
                setIsPremium(false);
            }
        };
        loadSubscription();
    }, []);

    // Load report and poll if needed
    useEffect(() => {
        if (!code) return;

        const maxAttempts = 15; // 15 attempts * 3 seconds = 45 seconds max
        let attempts = 0;

        const loadReport = async () => {
            if (attempts >= maxAttempts) {
                setError(
                    "Report generation is taking longer than expected. Please try again."
                );
                setIsLoading(false);
                return;
            }

            attempts++;

            try {
                const response = await getReport(code);

                if (!response || response.type !== "compatibility") {
                    // Report not found or wrong type
                    if (attempts < maxAttempts) {
                        // Poll again after 3 seconds
                        setTimeout(loadReport, 3000);
                        return;
                    } else {
                        setError(
                            "Report not found. Please try generating it again."
                        );
                        setIsLoading(false);
                        return;
                    }
                }

                const reportData = response.data as CompatibilityReport;

                // Check if report is complete (has categories array)
                if (
                    reportData.categories &&
                    Array.isArray(reportData.categories) &&
                    reportData.categories.length > 0
                ) {
                    // Report is complete!
                    setReport(reportData);
                    setIsLoading(false);
                    return;
                }

                // Report is incomplete, continue polling
                if (attempts < maxAttempts) {
                    setTimeout(loadReport, 3000);
                } else {
                    setError(
                        "Report generation is taking longer than expected. Please try again."
                    );
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error loading report:", error);
                const err = error as { status?: number; message?: string };

                // If 404, report might still be generating
                if (err?.status === 404 || err?.message?.includes("404")) {
                    if (attempts < maxAttempts) {
                        setTimeout(loadReport, 3000);
                        return;
                    }
                }

                setError("Failed to load report. Please try again.");
                setIsLoading(false);
            }
        };

        // Start loading after a short delay
        const timeoutId = setTimeout(loadReport, 500);

        return () => clearTimeout(timeoutId);
    }, [code]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/compatibility")}
                        className="px-4 py-2 bg-slate-900 text-white rounded-sm hover:bg-slate-800"
                    >
                        Back to Compatibility
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading || !report) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md mx-auto text-center">
                    <Loading />
                    <h2 className="text-2xl font-medium text-slate-900 mb-2 mt-6">
                        Generating Compatibility Report
                    </h2>
                    <p className="text-base text-slate-600">
                        Analyzing your charts and creating your compatibility
                        report...
                    </p>
                    <p className="text-sm text-slate-500 mt-4">
                        This usually takes 20-30 seconds
                    </p>
                    <button
                        onClick={() => router.push("/compatibility")}
                        className="mt-6 text-sm text-slate-600 hover:text-slate-900 underline"
                    >
                        Back to Compatibility
                    </button>
                </div>
            </div>
        );
    }

    // Sort categories: Communication first
    const sortedCategories = [...report.categories].sort((a, b) => {
        if (a.category === "communication") return -1;
        if (b.category === "communication") return 1;
        return 0;
    });

    return (
        <div className="pb-20 xl:pb-0">
            <CompatibilityReportNavigation />
            {/* Hero Section */}
            <CompatibilityHeroSection
                person1={report.person1}
                person2={report.person2}
                pairingTitle={report.pairingTitle}
                rarity={report.rarity}
            />

            {/* Birth Chart Section - Unified */}
            <CompatibilityBirthChartSection report={report} />

            {/* Personal Report CTA */}
            <CompatibilityPersonalReportCTA />

            {/* Compatibility Summary Table */}
            <CompatibilitySummaryTable
                categories={report.categories}
                overview={report.overview}
                isPremium={isPremium}
            />

            {/* Categories */}
            {sortedCategories.map((category, index) => (
                <CompatibilityCategorySection
                    key={index}
                    category={category}
                    person1Code={report.person1.identity.code}
                    person2Code={report.person2.identity.code}
                    isPremium={isPremium}
                    isFirstCategory={index === 0}
                />
            ))}

            {/* Conclusion */}
            {report.conclusion && (
                <section
                    id="conclusion"
                    className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl">
                            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                                Conclusion.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                                {report.conclusion}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Special Connections */}
            {report.specialConnections &&
                report.specialConnections.length > 0 && (
                    <section className="py-12 md:py-16 px-6 xl:px-0 bg-white border-b border-slate-100">
                        <div className="max-w-7xl mx-auto">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">
                                Special Connections
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {report.specialConnections.map(
                                    (connection, index) => (
                                        <div
                                            key={index}
                                            className="border border-slate-200 rounded-sm p-4"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">
                                                    {connection.emoji}
                                                </span>
                                                <h4 className="text-lg font-semibold text-slate-900">
                                                    {connection.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-2">
                                                {connection.rarity}
                                            </p>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                {connection.description}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            <CompatibilityShareSection
                person1={report.person1}
                person2={report.person2}
                rarity={report.rarity}
                pairingTitle={report.pairingTitle}
                compatCode={code}
            />
        </div>
    );
}
