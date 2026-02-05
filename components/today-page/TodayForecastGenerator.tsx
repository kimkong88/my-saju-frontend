"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Sparkles } from "lucide-react";
import { generateTodayForecast } from "@/app/actions/reportAction";
import type { TodayForecastStatus, TodayForecastData } from "@/types/today";
import Loading from "@/components/Loading";

interface TodayForecastGeneratorProps {
    status: TodayForecastStatus;
    onStatusChange: (status: TodayForecastStatus) => void;
    onForecastReady: (data: TodayForecastData) => void;
    onError?: (error: Error & { status?: number }) => void; // For handling 403/402
}

export default function TodayForecastGenerator({
    status,
    onStatusChange,
    onForecastReady,
    onError,
}: TodayForecastGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        onStatusChange("in_progress");

        try {
            // Start generation (returns immediately with in_progress status)
            const response = await generateTodayForecast();

            if (response.status === "completed" && response.data) {
                // If somehow completed immediately, show it
                onForecastReady(response.data);
                onStatusChange("completed");
            }
            // Otherwise, parent component (TodayPageContent) will handle polling
        } catch (error) {
            console.error("Failed to generate forecast:", error);
            const err = error as Error & { status?: number };

            // Handle 403/402 errors
            if (err.status === 403 || err.status === 402) {
                if (onError) {
                    onError(err);
                }
                onStatusChange("pending");
            } else {
                onStatusChange("pending");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    if (status === "completed") {
        return null; // Forecast is shown, no generator needed
    }

    if (status === "failed") {
        // Treat failed as pending so user can retry
        // (This shouldn't normally happen as we convert failed to pending in the action)
    }

    if (status === "in_progress") {
        return (
            <section className="pt-12 md:pt-16 pb-12 md:pb-16">
                <div className="max-w-7xl mx-auto px-6 xl:px-0">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-sm p-12 md:p-16 text-center">
                        <Loading />
                        <h3 className="text-2xl font-medium text-slate-900 mb-2">
                            Generating Your Forecast
                        </h3>
                        <p className="text-base text-slate-600 max-w-md mx-auto">
                            We&apos;re analyzing your chart and creating your
                            personalized forecast. This usually takes 15-20
                            seconds.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // status === "pending"
    return (
        <section className="pt-12 md:pt-16 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-sm p-6 md:p-12 lg:p-16 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full mb-4 md:mb-6">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900">
                            Your Daily Forecast
                        </h3>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider whitespace-nowrap">
                            Free
                        </span>
                    </div>
                    <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-lg mx-auto mb-6 md:mb-8">
                        Get personalized insights for today based on your chart.
                        Discover what opportunities and challenges await you.
                    </p>
                    <Button
                        onClick={handleGenerate}
                        isDisabled={isGenerating}
                        className="bg-slate-900 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-base font-semibold hover:bg-slate-800 w-full sm:w-auto"
                        size="lg"
                    >
                        {isGenerating
                            ? "Generating..."
                            : "Generate Today's Forecast"}
                    </Button>
                    <p className="text-xs md:text-sm text-slate-500 mt-3 md:mt-4">
                        Takes about 15-20 seconds • Always free
                    </p>
                </div>
            </div>
        </section>
    );
}
