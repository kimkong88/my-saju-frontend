"use client";

import { Bookmark, Check } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export default function ConclusionSection({
    conclusion,
}: {
    conclusion: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleSaveReport = async () => {
        // Remove hash fragments from URL (e.g., #share)
        const url = window.location.origin + window.location.pathname;
        const success = await copyToClipboard(url);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    return (
        <section
            id="conclusion"
            className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER: Consistent with Other Sections --- */}
                <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Conclusion.
                    </h2>

                    {/* Conclusion Text */}
                    <div className="max-w-3xl">
                        <div className="relative pl-6 md:pl-8 border-l-2 border-slate-200">
                            <p className="text-lg md:text-xl lg:text-2xl text-slate-900 whitespace-pre-line leading-relaxed font-normal">
                                {conclusion}
                            </p>
                        </div>
                    </div>
                    {/* Save Report Section */}
                    <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                                    Save This Report
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {copied
                                        ? "Link copied! Press Ctrl+D (Cmd+D on Mac) to bookmark this page."
                                        : "Save this link to return to your report anytime."}
                                </p>
                            </div>
                            <button
                                onClick={handleSaveReport}
                                className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-sm font-medium whitespace-nowrap"
                                title="Copy report link"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Bookmark className="w-4 h-4" />
                                        Save Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
