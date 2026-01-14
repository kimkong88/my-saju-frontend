"use client";

import Link from "next/link";

interface CompatibilityPromptProps {
    reportCode: string;
}

export default function CompatibilityPrompt({
    reportCode,
}: CompatibilityPromptProps) {
    return (
        <section className="bg-slate-50 py-16 md:py-24 px-6 xl:px-0 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white border border-slate-200 p-8 md:p-12">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4 tracking-tight">
                            Discover Your Connections
                        </h3>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
                            Now that you know who you are, see how your energy
                            interacts with someone special. Check compatibility
                            with friends, partners, or colleagues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                            <Link
                                href={`/personal/${reportCode}/compat`}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base font-medium"
                            >
                                Check Compatibility
                            </Link>
                            <Link
                                href="/signup"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-base font-medium"
                            >
                                Sign Up to Save Results
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
