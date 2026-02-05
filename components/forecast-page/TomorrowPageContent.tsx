"use client";

import { useState, useEffect } from "react";
import TodayEnergyOverview from "@/components/today-page/TodayEnergyOverview";
import TodaySpecialEvents from "@/components/today-page/TodaySpecialEvents";
import TodayGoodThings from "@/components/today-page/TodayGoodThings";
import TodayChallenges from "@/components/today-page/TodayChallenges";
import TomorrowForecastGenerator from "@/components/forecast-page/TomorrowForecastGenerator";
import TodayDiscoveryFunnel from "@/components/today-page/TodayDiscoveryFunnel";
import TodayClosingFunnel from "@/components/today-page/TodayClosingFunnel";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import SocialConnectionModal from "@/components/modals/SocialConnectionModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import { getTomorrowForecast } from "@/app/actions/reportAction";
import type {
    TodayForecastResponse,
    TodayForecastStatus,
    TodayForecastData,
} from "@/types/today";

interface TomorrowPageContentProps {
    initialForecast: TodayForecastResponse | null;
    onTabSwitch?: (tab: string) => void; // Callback for switching tabs
    isPremium?: boolean; // Default to false (free user)
}

export default function TomorrowPageContent({
    initialForecast,
    onTabSwitch,
    isPremium = false,
}: TomorrowPageContentProps) {
    const [forecastStatus, setForecastStatus] = useState<TodayForecastStatus>(
        initialForecast?.status || "pending"
    );
    const [forecastData, setForecastData] = useState<TodayForecastData | null>(
        initialForecast?.status === "completed" && initialForecast.data
            ? initialForecast.data
            : null
    );
    const [socialModalOpen, setSocialModalOpen] = useState(false);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

    // Poll for forecast if status is in_progress
    useEffect(() => {
        if (forecastStatus !== "in_progress") return;

        const maxAttempts = 20; // 20 attempts * 2 seconds = 40 seconds max
        let attempts = 0;

        const poll = async () => {
            if (attempts >= maxAttempts) {
                setForecastStatus("pending");
                return;
            }

            attempts++;

            try {
                const response = await getTomorrowForecast();

                if (response.status === "completed" && response.data) {
                    setForecastData(response.data);
                    setForecastStatus("completed");
                    return;
                } else if (response.status === "pending") {
                    setForecastStatus("pending");
                    return;
                } else if (response.status === "in_progress") {
                    // Continue polling
                    if (attempts < maxAttempts) {
                        setTimeout(poll, 2000); // Poll every 2 seconds
                    } else {
                        setForecastStatus("pending");
                    }
                }
            } catch (error) {
                console.error("Error polling for forecast:", error);
                setForecastStatus("pending");
            }
        };

        // Start polling after 2 seconds
        setTimeout(poll, 2000);
    }, [forecastStatus]);

    const handleStatusChange = (status: TodayForecastStatus) => {
        setForecastStatus(status);
    };

    const handleForecastReady = (data: TodayForecastData) => {
        setForecastData(data);
        setForecastStatus("completed");
    };

    const handleError = (error: Error & { status?: number }) => {
        // Handle 403/402 errors
        if (error.status === 403) {
            setSocialModalOpen(true);
        } else if (error.status === 402) {
            setSubscriptionModalOpen(true);
        }
    };

    const handleSubscribe = () => {
        // TODO: Implement subscription flow
        console.log("Subscribe clicked - $4.99/month");
        setSubscriptionModalOpen(false);
    };

    // Use forecast data if available, otherwise show generator
    const displayData = forecastData;

    return (
        <>
            <div className="space-y-0 w-full">
                {/* Forecast Content or Generator */}
                {displayData ? (
                    <>
                        {/* Energy Overview - Unified component with element relationship, active energies, and reading */}
                        <ResponsiveLayout>
                            <TodayEnergyOverview
                                elementRelationship={
                                    displayData.elementRelationship
                                }
                                dailyBranch={displayData.dailyBranch}
                                activeTenGods={displayData.activeTenGods}
                                reading={displayData.reading}
                                receivedBlessings={[]} // No blessings for tomorrow
                                timeframe="tomorrow"
                                isPremium={isPremium}
                            />
                        </ResponsiveLayout>

                        {/* Discovery Funnel - After energy overview for conversion */}
                        <TodayDiscoveryFunnel
                            context="forecast"
                            onTabSwitch={onTabSwitch}
                        />

                        {/* Special Events - Only shows when events exist */}
                        <TodaySpecialEvents
                            events={displayData.specialPatterns}
                            timeframe="tomorrow"
                            isPremium={isPremium}
                        />

                        {/* Good Things - Potential good things */}
                        <TodayGoodThings
                            items={displayData.goodThings}
                            timeframe="tomorrow"
                            isPremium={isPremium}
                        />

                        {/* Challenges - Potential challenges */}
                        <TodayChallenges
                            items={displayData.challenges}
                            timeframe="tomorrow"
                            isPremium={isPremium}
                        />
                    </>
                ) : (
                    <>
                        {/* Forecast Generator - Shows button or loading state */}
                        <TomorrowForecastGenerator
                            status={forecastStatus}
                            onStatusChange={handleStatusChange}
                            onForecastReady={handleForecastReady}
                            onError={handleError}
                        />

                        {/* Discovery Funnel - Still show even without forecast */}
                        <TodayDiscoveryFunnel
                            context="forecast"
                            onTabSwitch={onTabSwitch}
                        />
                    </>
                )}

                {/* Closing Funnel - Graceful ending with extra spacing */}
                <TodayClosingFunnel
                    context="forecast"
                    onTabSwitch={onTabSwitch}
                />
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
        </>
    );
}
