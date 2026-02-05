"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MeWhoYouAreProps {
    whoYouAre: {
        element: string; // Day Master element, e.g., "Fire-I"
        emoji: string; // Element emoji
        paragraphs: string[]; // Array of paragraphs
    };
    identity: {
        code: string;
        title: string;
        element: string;
        polarity: "Yin" | "Yang";
    };
    rarity?: {
        oneIn: number;
    };
    reportCode: string; // User ID or report code for personal report link
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getElementEmoji(element: string | undefined): string {
    if (!element) return "✨";
    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";
    return "✨";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    // Subtle radial gradient overlays with dark base
    if (elementLower.includes("fire")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(234, 88, 12, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("earth")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("metal")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(148, 163, 184, 0.1) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(203, 213, 225, 0.08) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("water")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }
    if (elementLower.includes("wood")) {
        return {
            background: `
                radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 60%),
                ${baseColor}
            `,
        };
    }

    return { backgroundColor: baseColor };
}

export default function MeWhoYouAre({
    whoYouAre,
    identity: _identity,
    rarity: _rarity,
    reportCode,
}: MeWhoYouAreProps) {
    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    {/* Header - Personal intro */}
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                            Who You Are
                        </h2>
                        <p className="text-sm md:text-base text-slate-600">
                            Your core essence and how you move through the world
                        </p>
                    </div>

                    {/* Summary Text - Main focus with teaser */}
                    <div className="mb-8 md:mb-10 space-y-4">
                        {/* First paragraph - full */}
                        {whoYouAre.paragraphs.length > 0 && (
                            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                                {whoYouAre.paragraphs[0]}
                            </p>
                        )}

                        {/* Second paragraph - truncated at midpoint */}
                        {whoYouAre.paragraphs.length > 1 &&
                            (() => {
                                const secondParagraph = whoYouAre.paragraphs[1];
                                const midpoint = Math.floor(
                                    secondParagraph.length / 2
                                );
                                // Find a good breaking point (sentence end or space near midpoint)
                                let breakPoint = midpoint;
                                const sentenceEnd = secondParagraph.lastIndexOf(
                                    ".",
                                    midpoint
                                );
                                const spaceNearMid =
                                    secondParagraph.lastIndexOf(" ", midpoint);

                                // Prefer sentence end, then space, then just midpoint
                                if (sentenceEnd > midpoint * 0.7) {
                                    breakPoint = sentenceEnd + 1;
                                } else if (spaceNearMid > midpoint * 0.7) {
                                    breakPoint = spaceNearMid;
                                }

                                const truncated = secondParagraph
                                    .substring(0, breakPoint)
                                    .trim();

                                return (
                                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                                        {truncated}
                                        <span className="text-slate-400">
                                            ...
                                        </span>
                                    </p>
                                );
                            })()}
                    </div>

                    {/* CTA to View Full Report */}
                    <div>
                        <Link
                            href={`/me/${reportCode}`}
                            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-200"
                        >
                            View Full Report
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
