"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CompatibilityPersonalReportCTA() {
    return (
        <section className="py-24 md:py-40 px-6 xl:px-0 border-y border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-12">
                        Get Your Own Personal Report.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                        Understanding your own chart is the foundation for deeper
                        relationships. Discover your unique strengths, challenges, and
                        life themes in your personalized report.
                    </p>
                    <Link
                        href="/#teaser"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base md:text-lg font-medium"
                    >
                        Get Your Personal Report
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
