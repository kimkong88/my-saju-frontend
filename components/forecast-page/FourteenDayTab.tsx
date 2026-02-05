"use client";

import { useEffect, useState } from "react";
import FourteenDayPageContent from "./FourteenDayPageContent";
import { getFourteenDayForecast } from "@/app/actions/reportAction";
import { getMeOverview } from "@/app/actions/meAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import type { FourteenDayForecastResponse } from "@/types/forecast";

interface FourteenDayTabProps {
    // Keep for backward compatibility, but won't be used
    data?: unknown;
    myElement?: string;
    myElementEmoji?: string;
}

export default function FourteenDayTab({
    data: _data,
    myElement,
    myElementEmoji,
}: FourteenDayTabProps) {
    const [initialForecast, setInitialForecast] =
        useState<FourteenDayForecastResponse | null>(null);
    const [userElement, setUserElement] = useState<string | undefined>(
        myElement
    );
    const [userElementEmoji] = useState<string | undefined>(myElementEmoji);
    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch forecast, user profile, and subscription status in parallel
                const [forecast, profile, subscription] = await Promise.all([
                    getFourteenDayForecast().catch(() => null),
                    getMeOverview().catch(() => null),
                    getSubscriptionStatus().catch(() => ({
                        isSubscribed: false,
                    })),
                ]);

                setInitialForecast(forecast);
                setIsPremium(subscription?.isSubscribed || false);

                // Get element from profile if available
                if (profile?.identity) {
                    setUserElement(profile.identity.element);
                    // Note: emoji might need to be derived from element or fetched separately
                    // For now, we'll use a default mapping or leave it undefined
                }
            } catch (error) {
                console.error("Error loading 14-day forecast:", error);
                setInitialForecast(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return null; // Or show a loading state
    }

    return (
        <FourteenDayPageContent
            initialForecast={initialForecast}
            myElement={userElement}
            myElementEmoji={userElementEmoji}
            isPremium={isPremium}
        />
    );
}
