"use client";

import type { MonthlyForecast, FourteenDayForecast } from "@/types/forecast";
import MonthlyJourney from "./MonthlyJourney";
import MonthlyCalendar from "./MonthlyCalendar";

interface FourteenDayTabContentProps {
    data: MonthlyForecast | FourteenDayForecast;
    myElement?: string;
    myElementEmoji?: string;
    isPremium?: boolean; // Default to false (free user)
}

export default function FourteenDayTabContent({
    data,
    myElement,
    myElementEmoji,
    isPremium = false,
}: FourteenDayTabContentProps) {
    // Check if using new structure
    const isNewStructure =
        "dominantData" in data && "phases" in data && "calendar" in data;
    const newData = isNewStructure ? (data as FourteenDayForecast) : null;
    const legacyData = !isNewStructure ? (data as MonthlyForecast) : null;

    // Format calendar dates for display - parse date string directly without timezone conversion
    const formatCalendarDays = (calendar: FourteenDayForecast["calendar"]) => {
        // Helper to get day of week from YYYY-MM-DD string without timezone issues
        const getDayOfWeek = (dateStr: string): string => {
            const [year, month, day] = dateStr.split("-").map(Number);
            const date = new Date(year, month - 1, day); // Use local date constructor to avoid timezone shift
            return date.toLocaleDateString("en-US", { weekday: "short" });
        };

        return calendar.map((day) => {
            return {
                date: day.date, // Keep ISO format (YYYY-MM-DD) as-is
                dayOfWeek: getDayOfWeek(day.date),
                element: day.element,
                elementEmoji: day.elementEmoji,
                animal: day.animal,
                animalEmoji: day.animalEmoji,
                isPeak: day.isPeak,
                isWorst: day.isWorst,
            };
        });
    };

    return (
        <div className="space-y-0">
            {/* Your 14-Day Journey - Narrative arc with integrated energy overview */}
            {isNewStructure && newData ? (
                <MonthlyJourney
                    dominantData={newData.dominantData}
                    phases={newData.phases}
                    myElement={myElement}
                    myElementEmoji={myElementEmoji}
                    isPremium={isPremium}
                />
            ) : legacyData?.journey ? (
                <MonthlyJourney
                    journey={legacyData.journey}
                    monthlyContext={legacyData.monthlyContext}
                    myElement={legacyData.myElement || myElement}
                    myElementEmoji={legacyData.myElementEmoji || myElementEmoji}
                    isPremium={isPremium}
                />
            ) : null}

            {/* 14-Day Calendar - Visual reference with Best/Worst Days */}
            {isNewStructure && newData?.calendar ? (
                <MonthlyCalendar
                    days={formatCalendarDays(newData.calendar)}
                    bestDays={newData.bestDays}
                    worstDays={newData.worstDays}
                    isPremium={isPremium}
                />
            ) : legacyData?.dailyCalendar &&
              legacyData.dailyCalendar.length > 0 ? (
                <MonthlyCalendar
                    days={legacyData.dailyCalendar}
                    startDate={legacyData.startDate}
                    endDate={legacyData.endDate}
                    isPremium={isPremium}
                />
            ) : null}
        </div>
    );
}
