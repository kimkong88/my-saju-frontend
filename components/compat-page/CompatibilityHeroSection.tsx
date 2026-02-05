"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

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

// Get a combined element class for compatibility (use person2's element as primary, or person1 if same)
function getCompatibilityElementClass(
    person1Element: string,
    person2Element: string
): string {
    // Use person2's element (viewer's perspective) or person1 if they're the same
    return getElementClass(person2Element || person1Element);
}

interface CompatibilityHeroSectionProps {
    person1: {
        identity: {
            code: string;
            title: string;
            element: string;
        };
    };
    person2: {
        identity: {
            code: string;
            title: string;
            element: string;
        };
    };
    pairingTitle: {
        name: string;
        subtitle?: string;
    };
    rarity: {
        oneIn: number;
        percentile: number;
        description: string;
    };
}

export default function CompatibilityHeroSection({
    person1,
    person2,
    pairingTitle,
    rarity,
}: CompatibilityHeroSectionProps) {
    const [copied, setCopied] = useState(false);
    const elementClass = getCompatibilityElementClass(
        person1.identity.element,
        person2.identity.element
    );

    const handleCopyLink = async () => {
        const url = window.location.origin + window.location.pathname;
        const success = await copyToClipboard(url);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section
            className={`relative min-h-[60vh] sm:min-h-[50vh] md:min-h-[45vh] flex items-end pt-16 md:pt-20 pb-16 overflow-hidden border-b border-slate-100`}
        >
            {/* Background with less intrusive overlay */}
            <div
                className={`absolute inset-0 ${elementClass}`}
                style={{
                    opacity: 0.6, // Less intrusive: reduce overall opacity
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
                    {/* LEFT: Pairing Title or Combined Identity */}
                    <div className="flex-1 min-w-0">
                        {pairingTitle ? (
                            <>
                                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-4">
                                    {pairingTitle.name}
                                </h1>
                                {pairingTitle.subtitle && (
                                    <p className="text-lg md:text-xl text-white/80 font-light mb-6">
                                        {pairingTitle.subtitle}
                                    </p>
                                )}
                            </>
                        ) : (
                            <>
                                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
                                    {person1.identity.title} ×{" "}
                                    {person2.identity.title}
                                </h1>
                            </>
                        )}

                        {/* Rarity & Copy Link */}
                        <div className="mt-6 flex items-center gap-4 flex-wrap">
                            {rarity && (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl md:text-2xl font-bold text-white">
                                        1
                                    </span>
                                    <span className="text-sm md:text-base text-white/70 font-medium">
                                        in
                                    </span>
                                    <span className="text-xl md:text-2xl font-bold text-white">
                                        {rarity.oneIn.toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={handleCopyLink}
                                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white transition-all duration-200 button--effect text-xs font-medium"
                                title="Copy compatibility link"
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
                    </div>

                    {/* RIGHT: Technical Classification - Both Codes */}
                    <div className="lg:text-right border-l lg:border-l-0 lg:border-none border-white/10 pl-6 lg:pl-0 lg:pr-8 pb-1 flex-shrink-0">
                        <p className="text-[10px] font-mono text-white/70 uppercase tracking-widest mb-2">
                            Classification
                        </p>
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase whitespace-nowrap">
                                {person1.identity.code}
                            </h2>
                            <div className="text-white/50 text-sm">×</div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase whitespace-nowrap">
                                {person2.identity.code}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
