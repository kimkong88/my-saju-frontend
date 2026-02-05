"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

interface MeCompatibilityShareProps {
    identity: {
        code: string;
        title: string;
        element: string;
    };
    rarity?: {
        oneIn: number;
    };
    userCode: string; // User code for compatibility link
    userName?: string; // User's full name (only show if not "Anonymous")
    compatibilityCheckCount?: number; // Number of compatibility checks performed
}

function getElementEmoji(element: string | undefined): string {
    if (!element) return "";
    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";
    return "✨";
}

function getElementBgStyle(element: string | undefined): React.CSSProperties {
    const baseColor = "#0f172a"; // slate-900

    if (!element) {
        return { backgroundColor: baseColor };
    }

    const elementLower = element.toLowerCase();

    // Subtle radial gradient overlays with dark base (matching ShareSection)
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

export default function MeCompatibilityShare({
    identity,
    rarity,
    userCode,
    userName,
    compatibilityCheckCount,
}: MeCompatibilityShareProps) {
    const [copied, setCopied] = useState<string | null>(null);
    // Check for Share API on initialization to avoid hydration mismatch
    const [hasShareAPI] = useState(
        () => typeof navigator !== "undefined" && !!navigator.share
    );

    const compatUrl = `${
        typeof window !== "undefined" ? window.location.origin : ""
    }/compat/${userCode}`;

    const handleCopy = async () => {
        const success = await copyToClipboard(compatUrl);
        if (success) {
            setCopied("compat");
            setTimeout(() => setCopied(null), 2000);
        }
    };

    const handleShare = async () => {
        if (hasShareAPI) {
            try {
                await navigator.share({
                    title: `Check Compatibility with ${identity.title}`,
                    text: `Check your compatibility with my chart (${identity.title}). Enter your birth data to see how our charts interact.`,
                    url: compatUrl,
                });
            } catch (error) {
                // User cancelled or error occurred
                console.error("Error sharing:", error);
            }
        }
    };

    return (
        <section className="py-12 md:py-16 px-6 xl:px-0 border-y border-slate-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-slate-900 mb-2">
                        Check Compatibility
                    </h2>
                    <p className="text-sm md:text-base text-slate-600">
                        Share this link for others to check compatibility with
                        your chart. They&apos;ll enter their birth data and see
                        how your charts interact.
                    </p>
                </div>

                {/* Card Preview */}
                <div className="mb-6 md:mb-8">
                    <div
                        className="text-white p-6 md:p-8 border-2 border-slate-900"
                        style={getElementBgStyle(identity?.element)}
                    >
                        {/* User Name - Show ownership when not Anonymous */}
                        {userName && userName !== "Anonymous" && (
                            <div className="text-xs font-medium text-white/60 mb-2">
                                {userName}&apos;s Chart
                            </div>
                        )}
                        <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                            {getElementEmoji(identity?.element) && (
                                <span className="text-sm">
                                    {getElementEmoji(identity?.element)}
                                </span>
                            )}
                            <span>{identity.code}</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold mb-3">
                            {identity.title}
                        </div>
                        {rarity && (
                            <div className="text-base md:text-lg text-white/80">
                                1 in {rarity.oneIn.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Compatibility Link */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 md:p-6">
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Compatibility Link
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={compatUrl}
                            readOnly
                            className="flex-1 text-xs md:text-sm font-mono bg-white border border-slate-200 px-3 py-2.5 text-slate-700 rounded-sm focus:outline-none focus:border-slate-900 transition-colors"
                        />
                        <div className="flex flex-col sm:flex-row gap-2 sm:flex-shrink-0">
                            <button
                                onClick={handleCopy}
                                className="px-4 md:px-6 py-2.5 bg-slate-900 text-white text-xs md:text-sm font-medium hover:bg-slate-800 transition-colors rounded-sm flex items-center justify-center gap-2 whitespace-nowrap"
                                aria-label="Copy compatibility link"
                            >
                                {copied === "compat" ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                            {hasShareAPI && (
                                <button
                                    onClick={handleShare}
                                    className="px-4 md:px-6 py-2.5 border border-slate-300 text-slate-900 text-xs md:text-sm font-medium hover:border-slate-900 hover:bg-slate-50 transition-colors rounded-sm flex items-center justify-center gap-2 whitespace-nowrap"
                                    aria-label="Share compatibility link"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            )}
                        </div>
                    </div>
                    {compatibilityCheckCount !== undefined &&
                        compatibilityCheckCount > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <p className="text-xs text-slate-600">
                                    <span className="font-medium text-slate-900">
                                        {compatibilityCheckCount.toLocaleString()}
                                    </span>{" "}
                                    {compatibilityCheckCount === 1
                                        ? "person has"
                                        : "people have"}{" "}
                                    checked compatibility with your chart
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
}
