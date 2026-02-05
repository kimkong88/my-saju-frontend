"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface Question {
    id: string;
    title: string;
    description: string;
}

interface QuestionFunnelProps {
    questions: Question[];
}

export default function QuestionFunnel({ questions }: QuestionFunnelProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 2 },
            "(min-width: 1024px)": { slidesToScroll: 3 },
        },
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        onSelect(); // Initial sync with carousel state
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (questions.length === 0) {
        return null;
    }

    return (
        <div>
            {/* Header */}
            <div className="max-w-4xl mb-12 md:mb-16">
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8">
                    Explore More Questions.
                </h2>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                    Discover other insights tailored to your unique birth chart
                </p>
            </div>

            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous questions"
                >
                    <ChevronRight className="w-5 h-5 text-slate-700 rotate-180" />
                </button>

                <button
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next questions"
                >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4 md:gap-6">
                        {questions.map((question) => (
                            <Link
                                key={question.id}
                                href={`/questions/${question.id}`}
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
