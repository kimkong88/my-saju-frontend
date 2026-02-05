"use client";

import { useState, useEffect } from "react";
import FourteenDayTabContent from "./FourteenDayTabContent";
import FourteenDayForecastGenerator from "./FourteenDayForecastGenerator";
import { getFourteenDayForecast } from "@/app/actions/reportAction";
import type {
    FourteenDayForecastResponse,
    FourteenDayForecastStatus,
    FourteenDayForecast,
} from "@/types/forecast";
import SocialConnectionModal from "@/components/modals/SocialConnectionModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

interface FourteenDayPageContentProps {
    initialForecast: FourteenDayForecastResponse | null;
    myElement?: string;
    myElementEmoji?: string;
    isPremium?: boolean; // Default to false (free user)
}

export default function FourteenDayPageContent({
    initialForecast,
    myElement,
    myElementEmoji,
    isPremium = false,
}: FourteenDayPageContentProps) {
    const [forecastStatus, setForecastStatus] =
        useState<FourteenDayForecastStatus>(
            initialForecast?.status || "pending"
        );
    const [forecastData, setForecastData] =
        useState<FourteenDayForecast | null>(
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
                const response = await getFourteenDayForecast();

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

    const handleStatusChange = (status: FourteenDayForecastStatus) => {
        setForecastStatus(status);
    };

    const handleForecastReady = (data: FourteenDayForecast) => {
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

    return (
        <>
            <FourteenDayForecastGenerator
                status={forecastStatus}
                onStatusChange={handleStatusChange}
                onForecastReady={handleForecastReady}
                onError={handleError}
            />

            {forecastStatus === "completed" && forecastData && (
                <FourteenDayTabContent
                    data={forecastData}
                    myElement={myElement}
                    myElementEmoji={myElementEmoji}
                    isPremium={isPremium}
                />
            )}

            <SocialConnectionModal
                isOpen={socialModalOpen}
                onOpenChange={setSocialModalOpen}
            />

            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onOpenChange={setSubscriptionModalOpen}
            />
        </>
    );
}
