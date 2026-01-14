"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";
import type { Identity, Rarity } from "@/types/report";

function getElementClass(element: string | undefined): string {
    if (!element) return "metal-bg"; // Default to Metal (neutral)

    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "fire-bg";
    if (elementLower.includes("earth")) return "earth-bg";
    if (elementLower.includes("metal")) return "metal-bg";
    if (elementLower.includes("water")) return "water-bg";
    if (elementLower.includes("wood")) return "wood-bg";

    return "metal-bg"; // Default fallback
}

export default function HeroSection({
    identity,
    rarity,
}: {
    identity: Identity;
    rarity?: Rarity;
}) {
    const [copied, setCopied] = useState(false);
    const elementClass = getElementClass(identity?.element);

    const handleCopyLink = async () => {
        // Remove hash fragments from URL (e.g., #share)
        const url = window.location.origin + window.location.pathname;
        const success = await copyToClipboard(url);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section
            className={`relative min-h-[60vh] sm:min-h-[50vh] md:min-h-[45vh] flex items-end pt-16 md:pt-20 pb-16 ${elementClass} hero-gradient overflow-hidden border-b border-slate-100`}
        >
            {/* Background Layer: Custom background logic */}

            <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
                    {/* LEFT: Human Identity - Maximum weight for definitive authority */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
                            {identity.title}
                        </h1>
                        {/* Rarity Badge with Copy Link */}
                        {rarity?.overall && (
                            <div className="mt-6 flex items-center gap-4 flex-wrap">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl md:text-2xl font-bold text-white">
                                        1
                                    </span>
                                    <span className="text-sm md:text-base text-white/70 font-medium">
                                        in
                                    </span>
                                    <span className="text-xl md:text-2xl font-bold text-white">
                                        {rarity.overall.oneIn.toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopyLink}
                                    className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white transition-all duration-200 button--effect text-xs font-medium"
                                    title="Copy report link"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Technical Classification - Sharp & Minimalist */}
                    <div className="lg:text-right border-l lg:border-l-0 lg:border-none border-white/10 pl-6 lg:pl-0 lg:pr-8 pb-1 flex-shrink-0">
                        <p className="text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1">
                            Classification
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-slate-300 uppercase whitespace-nowrap">
                            {identity.code}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Transition: Removed the deep gradient for a cleaner, flatter cut to the report */}
        </section>
    );
}
