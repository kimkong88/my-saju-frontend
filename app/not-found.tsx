"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                {/* Large 404 Number */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-serif font-bold text-slate-900 tracking-tighter leading-none">
                        404
                    </h1>
                </div>

                {/* Main Message */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tighter text-slate-900 mb-6">
                        Page Not Found.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or
                        has been moved. Perhaps it&apos;s lost in the cycles of
                        time.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="cursor-pointer flex items-center gap-2 px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-base font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>

                {/* Decorative Element */}
                <div className="mt-16 md:mt-20 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 italic">
                        Error 404: Page not found in the temporal map
                    </p>
                </div>
            </div>
        </div>
    );
}
