"use client";

import { ArrowRight } from "lucide-react";

interface TodayElementRelationshipProps {
    elementRelationship: {
        myElement: string;
        myElementEmoji: string;
        todayElement: string;
        todayElementEmoji: string;
        meaning: string;
    };
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    if (elementLower.includes("fire")) {
        return {
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: "linear-gradient(135deg, #a16207 0%, #854d0e 100%)",
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        };
    }

    return { backgroundColor: baseColor };
}

export default function TodayElementRelationship({
    elementRelationship,
}: TodayElementRelationshipProps) {
    return (
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Today&apos;s Element Energy
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        How today&apos;s energy interacts with your nature
                    </p>
                </div>

                {/* Element Comparison Card */}
                <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                        {/* My Element */}
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl border-2 border-slate-900"
                                style={getElementBgStyle(elementRelationship.myElement)}
                            >
                                {elementRelationship.myElementEmoji}
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                    Your Element
                                </p>
                                <p className="text-lg md:text-xl font-semibold text-slate-900">
                                    {elementRelationship.myElement}
                                </p>
                            </div>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-slate-400 rotate-90 md:rotate-0" />

                        {/* Today's Element */}
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl border-2 border-slate-900"
                                style={getElementBgStyle(elementRelationship.todayElement)}
                            >
                                {elementRelationship.todayElementEmoji}
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                    Today&apos;s Element
                                </p>
                                <p className="text-lg md:text-xl font-semibold text-slate-900">
                                    {elementRelationship.todayElement}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Meaning */}
                    <div className="bg-slate-50 rounded-sm p-4 md:p-6 border-l-4 border-slate-900">
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            {elementRelationship.meaning}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
