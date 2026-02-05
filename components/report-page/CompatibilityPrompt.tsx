"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

interface CompatibilityPromptProps {
    reportCode: string;
}

export default function CompatibilityPrompt({
    reportCode,
}: CompatibilityPromptProps) {
    const [copied, setCopied] = useState(false);
    // Initialize compatUrl on client side to avoid hydration issues
    const [compatUrl] = useState(() =>
        typeof window !== "undefined"
            ? `${window.location.origin}/compat/${reportCode}`
            : ""
    );

    // Check if animation was already shown
    const storageKey = `compat-prompt-animated-${reportCode}`;
    const [hasAnimated, setHasAnimated] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem(storageKey) !== null;
    });

    const sectionRef = useRef<HTMLElement>(null);

    // Subtle entrance animation on first view
    useEffect(() => {
        if (hasAnimated || !sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        localStorage.setItem(storageKey, "true");
                        // Trigger animation
                        if (sectionRef.current) {
                            sectionRef.current.style.opacity = "1";
                            sectionRef.current.style.transform =
                                "translateY(0)";
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated, reportCode, storageKey]);

    const handleCopy = async () => {
        const success = await copyToClipboard(compatUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="bg-slate-50 py-16 md:py-24 px-6 xl:px-0 border-y border-slate-100 transition-all duration-700 ease-out"
            style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4 tracking-tight">
                        Check Compatibility with Friends
                    </h3>
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        Share this link for others to check compatibility with
                        your chart. They&apos;ll enter their birth data and see
                        how your energy patterns interact.
                    </p>

                    {/* Compatibility URL Copy Component - Inline */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="text"
                            value={compatUrl}
                            readOnly
                            className="flex-1 text-xs font-mono bg-transparent border-b border-slate-300 px-0 py-2 text-slate-700 focus:outline-none focus:border-slate-900 transition-colors"
                            onClick={(e) =>
                                (e.target as HTMLInputElement).select()
                            }
                        />
                        <button
                            onClick={handleCopy}
                            className="cursor-pointer px-4 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap rounded-full button--effect"
                        >
                            {copied ? (
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
            </div>
        </section>
    );
}
