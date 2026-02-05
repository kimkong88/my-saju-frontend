"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
    getQuestions,
    type QuestionsResponse,
    type QuestionsStatus,
} from "@/app/actions/meAction";

interface TodayQuestionsProps {
    initialResponse: QuestionsResponse | null;
    scope?: string;
    showHeader?: boolean; // Optional header prop
}

function formatExpirationTime(expiresAt: string): string {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();

    if (diffMs <= 0) {
        return "Expired";
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `Expires in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
        return `Expires in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `Expires in ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    }
}

// Loading state component for personalization
function QuestionsLoadingState() {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-sm p-8 md:p-12 flex flex-col items-center justify-center flex-[0_0_280px] md:flex-[0_0_320px] min-h-[280px]">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                    <h3 className="text-base md:text-lg font-medium text-slate-900 mb-2">
                        Personalizing your questions...
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        Generating insights tailored to today&apos;s energy
                        patterns
                    </p>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                    This usually takes 15-20 seconds
                </p>
            </div>
        </div>
    );
}

export default function TodayQuestions({
    initialResponse,
    scope = "daily",
    showHeader = true,
}: TodayQuestionsProps) {
    const [questionsStatus, setQuestionsStatus] = useState<QuestionsStatus>(
        initialResponse?.status || "pending"
    );
    const [questionsData, setQuestionsData] =
        useState<QuestionsResponse | null>(initialResponse);
    // Poll for questions if status is in_progress or pending (backend may auto-generate)
    useEffect(() => {
        if (questionsStatus !== "in_progress" && questionsStatus !== "pending")
            return;

        const maxAttempts = 20; // 20 attempts * 2 seconds = 40 seconds max
        let attempts = 0;

        const poll = async () => {
            if (attempts >= maxAttempts) {
                setQuestionsStatus("pending");
                return;
            }

            attempts++;

            try {
                const response = await getQuestions(scope);

                if (response.status === "completed" && response.questions) {
                    setQuestionsData(response);
                    setQuestionsStatus("completed");
                    return;
                } else if (response.status === "pending") {
                    // Continue polling - backend may auto-generate
                    if (attempts < maxAttempts) {
                        setTimeout(poll, 2000);
                    } else {
                        setQuestionsStatus("pending");
                    }
                    return;
                } else if (response.status === "in_progress") {
                    // Continue polling
                    if (attempts < maxAttempts) {
                        setTimeout(poll, 2000); // Poll every 2 seconds
                    } else {
                        setQuestionsStatus("pending");
                    }
                } else if (response.status === "failed") {
                    setQuestionsStatus("failed");
                    setQuestionsData(response);
                }
            } catch (error) {
                console.error("Error polling for questions:", error);
                setQuestionsStatus("pending");
            }
        };

        // Start polling after 2 seconds
        const timeoutId = setTimeout(poll, 2000);
        return () => clearTimeout(timeoutId);
    }, [questionsStatus, scope]);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        slidesToScroll: 1,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Reinitialize carousel when questions change
    useEffect(() => {
        if (
            emblaApi &&
            questionsData?.questions &&
            questionsData.questions.length > 0
        ) {
            emblaApi.reInit();
        }
    }, [emblaApi, questionsData?.questions]);

    // Helper to generate question ID from title (for mock data)
    // When API is integrated, questions will have proper IDs
    const getQuestionId = (title: string): string => {
        // Map question titles to mock IDs
        const titleToId: Record<string, string> = {
            "Why do I attract the wrong people?": "1",
            "What's sabotaging my success?": "2",
            "Why do I always feel stuck?": "3",
            "What makes me different from everyone else?": "4",
            "Why do people either love or hate me?": "5",
        };
        return titleToId[title] || "1"; // Default to "1" if not found
    };

    const expirationText = questionsData?.expiresAt
        ? formatExpirationTime(questionsData.expiresAt)
        : null;
    const questions = questionsData?.questions || [];

    return (
        <section
            className={`${
                showHeader
                    ? "pt-12 md:pt-16 pb-12 md:pb-16"
                    : "pt-4 md:pt-6 pb-6 md:pb-8"
            } px-6 xl:px-0 ${showHeader ? "border-t border-slate-200" : ""}`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header - Conditional */}
                {showHeader && (
                    <div className="mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                                    Questions for Today
                                </h2>
                                <p className="text-sm md:text-base text-slate-600">
                                    Get personalized insights on today&apos;s
                                    optimal timing and decisions
                                </p>
                            </div>
                        </div>
                        {expirationText && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{expirationText}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Embla Carousel with Navigation */}
                <div className="relative">
                    {/* Previous Button - Desktop Only */}
                    <button
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous questions"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-700" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4 md:gap-6">
                            {questionsStatus === "in_progress" ||
                            questionsStatus === "pending" ? (
                                // Show personalized loading state
                                <QuestionsLoadingState />
                            ) : questionsStatus === "failed" ? (
                                // Show error state (no retry - GET only)
                                <div className="bg-white border border-red-200 rounded-sm p-6 md:p-8 flex flex-col items-center justify-center flex-[0_0_280px] md:flex-[0_0_320px] min-h-[200px]">
                                    <div className="text-center">
                                        <p className="text-sm text-red-600">
                                            {questionsData?.error ||
                                                "Failed to load questions"}
                                        </p>
                                    </div>
                                </div>
                            ) : questions.length > 0 ? (
                                // Show questions
                                questions.map((question, index) => (
                                    <Link
                                        key={index}
                                        href={`/questions/${getQuestionId(
                                            question.title
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white border border-slate-200 rounded-sm p-6 md:p-8 flex flex-col flex-[0_0_280px] md:flex-[0_0_320px] transition-all duration-200 cursor-pointer hover:border-slate-900 hover:shadow-md"
                                    >
                                        {/* Question Header */}
                                        <div className="mb-4">
                                            <h3 className="text-lg md:text-xl font-medium text-slate-900">
                                                {question.title}
                                            </h3>
                                        </div>

                                        {/* Description - What you'll find out */}
                                        <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                                                What You&apos;ll Find Out
                                            </p>
                                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                                {question.description}
                                            </p>
                                            <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 mt-3">
                                                View report
                                                <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : null}
                        </div>
                    </div>

                    {/* Next Button - Desktop Only */}
                    <button
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next questions"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-700" />
                    </button>
                </div>
            </div>
        </section>
    );
}
