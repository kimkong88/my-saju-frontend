"use client";

import TodayReceivedBlessings from "./TodayReceivedBlessings";

interface ReceivedBlessing {
    id: string;
    fromName: string;
    fromElement?: string;
    blessingEmoji?: string;
    blessingName?: string;
    blessingDescription?: string;
    personalMessage?: string;
    sentAt: string;
    expiresAt: string;
}

interface TodayReadingProps {
    reading: {
        paragraphs: string[];
        technicalBasis?: string[];
    };
    receivedBlessings?: ReceivedBlessing[];
}

export default function TodayReading({
    reading,
    receivedBlessings = [],
}: TodayReadingProps) {
    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Today&apos;s Reading
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Your personalized daily analysis
                    </p>
                </div>

                {/* 2-Column Grid: [Blessings] [Reading Text] */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Blessings */}
                    <div>
                        <TodayReceivedBlessings blessings={receivedBlessings} />
                    </div>

                    {/* Right Column: Reading Text */}
                    <div className="space-y-4">
                        {reading.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-base md:text-lg text-slate-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
