"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface ShareableCardProps {
    identity: {
        code: string;
        title: string;
    };
    rarity: {
        overall: {
            oneIn: number;
        };
    };
    specialTraits: Array<{
        name: string;
        emoji: string;
        rarity?: string;
    }>;
    elementDistribution: {
        dominant: string[];
    };
    reportId: string;
}

export default function ShareableCard({
    identity,
    rarity,
    specialTraits,
    reportId,
}: ShareableCardProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = `${window.location.origin}/s/${reportId}`;
    const compatUrl = `${window.location.origin}/compat/${reportId}`;

    const shareText = `I'm ${identity.title} (${
        identity.code
    }) - 1 in ${rarity.overall.oneIn.toLocaleString()}. Find your Bazi type →`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

    const topTraits = specialTraits
        .slice(0, 2)
        .map((t) => `${t.emoji} ${t.name}`)
        .join(" • ");

    return (
        <div className="bg-white border-2 border-slate-900 p-6 md:p-8">
            <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Share Your Results
                </h3>
            </div>

            {/* Shareable Card Preview */}
            <div className="bg-slate-900 text-white p-6 mb-6 rounded-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                    {identity.code}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2">
                    {identity.title}
                </div>
                <div className="text-sm text-white/80 mb-3">
                    1 in {rarity.overall.oneIn.toLocaleString()}
                </div>
                {topTraits && (
                    <div className="text-xs text-white/70 border-t border-white/20 pt-3 mt-3">
                        {topTraits}
                    </div>
                )}
            </div>

            {/* Share Options */}
            <div className="space-y-3">
                {/* Compatibility Link */}
                <div className="bg-slate-50 border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-900">
                            Compatibility Check
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">
                        Share this link for others to check compatibility with
                        your chart
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={compatUrl}
                            readOnly
                            className="flex-1 text-xs font-mono bg-white border border-slate-200 px-3 py-2 text-slate-700"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(compatUrl);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="px-3 py-2 bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleShare("twitter")}
                        className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        Share on X
                    </button>
                    <button
                        onClick={() => handleShare("facebook")}
                        className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        Share on Facebook
                    </button>
                    {navigator.share! && (
                        <button
                            onClick={() => handleShare("native")}
                            className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    )}
                </div>

                {/* Copy Link */}
                <button
                    onClick={handleCopy}
                    className="w-full px-4 py-2 border-2 border-slate-900 text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy Link
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
