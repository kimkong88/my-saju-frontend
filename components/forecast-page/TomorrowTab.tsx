"use client";

import { useEffect, useState } from "react";
import TomorrowPageContent from "@/components/forecast-page/TomorrowPageContent";
import { getTomorrowForecast } from "@/app/actions/reportAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import type { TodayForecastResponse } from "@/types/today";

interface TomorrowTabProps {
    // Keep for backward compatibility, but won't be used
    data?: unknown;
    onTabSwitch?: (tab: string) => void; // Callback for switching tabs
}

export default function TomorrowTab({
    data: _data,
    onTabSwitch,
}: TomorrowTabProps) {
    const [initialForecast, setInitialForecast] =
        useState<TodayForecastResponse | null>(null);
    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const [forecast, subscription] = await Promise.all([
                    getTomorrowForecast().catch(() => null),
                    getSubscriptionStatus().catch(() => ({
                        isSubscribed: false,
                    })),
                ]);
                setInitialForecast(forecast);
                setIsPremium(subscription?.isSubscribed || false);
            } catch (error) {
                console.error("Error loading tomorrow forecast:", error);
                setInitialForecast(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchForecast();
    }, []);

    if (isLoading) {
        return null; // Or show a loading state
    }

    return (
        <TomorrowPageContent
            initialForecast={initialForecast}
            onTabSwitch={onTabSwitch}
            isPremium={isPremium}
        />
    );
}
