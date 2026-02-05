"use client";

import { useState } from "react";
import { Share2, Copy, Check, Mail } from "lucide-react";
import Link from "next/link";
import { copyToClipboard } from "@/lib/clipboard";

interface ShareSectionProps {
    identity: {
        code: string;
        title: string;
        element?: string;
    };
    rarity: {
        overall: {
            oneIn: number;
        };
    };
    specialTraits?: Array<{
        name: string;
        emoji: string;
        rarity?: string;
    }>;
    elementDistribution?: {
        dominant: string[];
    };
    reportCode: string;
}

function getElementEmoji(element: string | undefined): string {
    if (!element) return "";

    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "🔥";
    if (elementLower.includes("earth")) return "🌍";
    if (elementLower.includes("metal")) return "⚪";
    if (elementLower.includes("water")) return "💧";
    if (elementLower.includes("wood")) return "🌳";

    return "";
}

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

export default function ShareSection({
    identity,
    rarity,
    specialTraits,
    elementDistribution,
    reportCode,
}: ShareSectionProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const shareUrl = `${
        typeof window !== "undefined" ? window.location.origin : ""
    }/s/${reportCode}`;
    const compatUrl = `${
        typeof window !== "undefined" ? window.location.origin : ""
    }/compat/${reportCode}`;
    // Share Full Report uses unified /s/code format
    const reportUrl = `${
        typeof window !== "undefined" ? window.location.origin : ""
    }/s/${reportCode}`;

    const shareText = `I'm ${identity.title} (${
        identity.code
    }) - 1 in ${rarity.overall.oneIn.toLocaleString()}. Find your Bazi type →`;

    const handleCopy = async (text: string, type: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        }
    };

    const handleShare = async (platform: string) => {
        const text = shareText;
        const url = shareUrl;

        if (platform === "twitter") {
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text
                )}&url=${encodeURIComponent(url)}`,
                "_blank"
            );
        } else if (platform === "facebook") {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                )}`,
                "_blank"
            );
        } else if (platform === "linkedin") {
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url
                )}`,
                "_blank"
            );
        } else if (navigator.share) {
            navigator.share({
                title: `I'm ${identity.title}`,
                text: shareText,
                url: shareUrl,
            });
        }
    };

    const handleEmailShare = () => {
        const subject = encodeURIComponent(
            `My Unstar Report - ${identity.title}`
        );
        const body = encodeURIComponent(
            `I'm ${identity.title} (${
                identity.code
            }) - 1 in ${rarity.overall.oneIn.toLocaleString()}.\n\n` +
                `View my full report: ${reportUrl}\n\n` +
                `Find your Unstar type: ${
                    typeof window !== "undefined" ? window.location.origin : ""
                }`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // Show all traits in original order
    const displayTraits = specialTraits || [];
    const hasTraits = displayTraits.length > 0;

    return (
        <section
            id="share"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: Consistent with Other Sections --- */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Share Your Results.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        Your chart is unique—share it with others or check
                        compatibility with friends, partners, or colleagues.
                    </p>
                </div>

                {/* Shareable Card Preview */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <div
                        className="text-white p-8 md:p-10 border-2 border-slate-900"
                        style={getElementBgStyle(identity?.element)}
                    >
                        <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                            {getElementEmoji(identity?.element) && (
                                <span className="text-sm">
                                    {getElementEmoji(identity?.element)}
                                </span>
                            )}
                            <span>{identity.code}</span>
                        </div>
                        <div className="text-3xl md:text-4xl font-bold mb-3">
                            {identity.title}
                        </div>
                        <div className="text-base md:text-lg text-white/80 mb-4">
                            1 in {rarity.overall.oneIn.toLocaleString()}
                        </div>
                        {/* Traits or Fallback */}
                        <div className="text-sm text-white/70 border-t border-white/20 pt-4 mt-4">
                            {hasTraits ? (
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {displayTraits.map((trait, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-1.5"
                                        >
                                            <span>{trait.emoji}</span>
                                            <span>{trait.name}</span>
                                        </span>
                                    ))}
                                </div>
                            ) : elementDistribution?.dominant &&
                              elementDistribution.dominant.length > 0 ? (
                                <span className="uppercase tracking-wider">
                                    {elementDistribution.dominant.join(" + ")}{" "}
                                    Dominant
                                </span>
                            ) : (
                                <span className="italic text-white/50">
                                    Your unique chart signature
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Conversion Funnel - Subtle */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                        Don&apos;t have your own report yet?{" "}
                        <Link
                            href="/#teaser"
                            className="text-slate-900 font-medium underline decoration-slate-300 hover:decoration-slate-900 transition-colors inline-flex items-center gap-1"
                        >
                            Get your own personalized report
                        </Link>
                    </p>
                </div>

                {/* Share Options */}
                <div className="max-w-4xl">
                    <div className="space-y-6">
                        {/* Compatibility Link */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                                    Compatibility Check
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Share this link for others to check
                                    compatibility with your chart. They&apos;ll
                                    enter their birth data and see how your
                                    charts interact.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={compatUrl}
                                    readOnly
                                    className="flex-1 text-xs font-mono bg-transparent border-b border-slate-300 px-0 py-2 text-slate-700 focus:outline-none focus:border-slate-900 transition-colors"
                                />
                                <button
                                    onClick={() =>
                                        handleCopy(compatUrl, "compat")
                                    }
                                    className="cursor-pointer px-4 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap rounded-full button--effect"
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
                            </div>
                        </div>

                        {/* Share Report Link */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                                    Share Full Report
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Share your complete report with others. This
                                    link shows your full analysis without
                                    revealing your birth date.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={reportUrl}
                                    readOnly
                                    className="flex-1 text-xs font-mono bg-transparent border-b border-slate-300 px-0 py-2 text-slate-700 focus:outline-none focus:border-slate-900 transition-colors"
                                />
                                <button
                                    onClick={() =>
                                        handleCopy(reportUrl, "report")
                                    }
                                    className="cursor-pointer px-4 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap rounded-full button--effect"
                                >
                                    {copied === "report" ? (
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
                            </div>
                        </div>

                        {/* Email Report */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                                    Email This Report
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Send this report to your email or share it
                                    with others. Opens your email client with a
                                    pre-filled message—no sign-up required.
                                </p>
                            </div>
                            <button
                                onClick={handleEmailShare}
                                className="cursor-pointer px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 rounded-full button--effect"
                            >
                                <Mail className="w-4 h-4" />
                                Send to Email
                            </button>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="bg-white border border-slate-200 p-6 md:p-8">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                                    Share on Social Media
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Share your results on your favorite
                                    platforms.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => handleShare("twitter")}
                                    className="cursor-pointer px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors rounded-full button--effect"
                                >
                                    Share on X
                                </button>
                                <button
                                    onClick={() => handleShare("facebook")}
                                    className="cursor-pointer px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors rounded-full button--effect"
                                >
                                    Share on Facebook
                                </button>
                                <button
                                    onClick={() => handleShare("linkedin")}
                                    className="cursor-pointer px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors rounded-full button--effect"
                                >
                                    Share on LinkedIn
                                </button>
                                {typeof navigator !== "undefined" &&
                                    navigator.share! && (
                                        <button
                                            onClick={() =>
                                                handleShare("native")
                                            }
                                            className="cursor-pointer px-6 py-3 border-2 border-slate-900 text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 rounded-full button--effect"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            More Options
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
