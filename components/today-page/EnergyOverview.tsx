"use client";

import { Accordion } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Category {
    name: string;
    score: number; // 1-10
    overview: string; // High-level overview (always free)
    detailLink?: string; // Link to detailed view (conversion)
}

interface EnergyOverviewProps {
    overallScore: number; // 1-10
    overallSummary: string; // Brief summary of today
    categories: Category[];
}

export default function EnergyOverview({
    overallScore,
    overallSummary,
    categories,
}: EnergyOverviewProps) {
    const getScoreColor = (score: number) => {
        if (score >= 7) return "text-emerald-600";
        if (score >= 4) return "text-amber-600";
        return "text-red-500";
    };

    return (
        <section className="pt-6 md:pt-8 pb-24 md:pb-40">
            <div className="max-w-7xl mx-auto px-6 xl:px-0">
                {/* Section Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Today&apos;s Fortune Pulse
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Your Fortune Pulse breakdown across key life areas
                    </p>
                </div>

                {/* Accordion - Overall + Categories (FAQ style) */}
                <div className="border border-slate-200 rounded-sm">
                    <Accordion
                        defaultExpandedKeys={["overall"]}
                        variant="default"
                        className="gap-4"
                    >
                        {/* Overall Item - Always First, Expanded by Default */}
                        <Accordion.Item
                            key="overall"
                            id="overall"
                            className="border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                        >
                            <Accordion.Heading>
                                <Accordion.Trigger className="p-6 md:p-8">
                                    <div className="flex items-center gap-4">
                                        <span className="font-serif text-lg md:text-xl font-semibold text-slate-900">
                                            Overall
                                        </span>
                                        <span
                                            className={`text-sm md:text-base font-mono font-bold ${getScoreColor(
                                                overallScore
                                            )}`}
                                        >
                                            {overallScore}/10
                                        </span>
                                    </div>
                                    <Accordion.Indicator>
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </Accordion.Indicator>
                                </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                                <Accordion.Body className="px-6 md:px-8 pb-6 md:pb-8">
                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                        {overallSummary}
                                    </p>
                                </Accordion.Body>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Category Items */}
                        {categories.map((category) => (
                            <Accordion.Item
                                key={category.name}
                                id={category.name}
                                className="border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                            >
                                <Accordion.Heading>
                                    <Accordion.Trigger className="p-6 md:p-8">
                                        <div className="flex items-center gap-4">
                                            <span className="font-serif text-lg md:text-xl font-semibold text-slate-900">
                                                {category.name}
                                            </span>
                                            <span
                                                className={`text-sm md:text-base font-mono font-bold ${getScoreColor(
                                                    category.score
                                                )}`}
                                            >
                                                {category.score}/10
                                            </span>
                                        </div>
                                        <Accordion.Indicator>
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        </Accordion.Indicator>
                                    </Accordion.Trigger>
                                </Accordion.Heading>
                                <Accordion.Panel>
                                    <Accordion.Body className="px-6 md:px-8 pb-6 md:pb-8">
                                        <div className="space-y-4">
                                            {/* Overview - Always Free */}
                                            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                {category.overview}
                                            </p>

                                            {/* Conversion CTA - Read Detail */}
                                            {category.detailLink && (
                                                <div className="pt-2">
                                                    <Link
                                                        href={
                                                            category.detailLink
                                                        }
                                                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                                                    >
                                                        Read Detail
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
