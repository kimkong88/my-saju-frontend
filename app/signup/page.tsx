import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Sign Up | PulseMap",
    description: "Sign up for PulseMap to unlock advanced forecasting features.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Message */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tighter text-slate-900 mb-6">
                        Coming Soon.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-4">
                        We&apos;re building something special. Sign-up and
                        forecasting features are currently under development.
                    </p>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Check back soon, or get your free personality report
                        while you wait.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        href="/#teaser"
                        className="cursor-pointer px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base font-medium"
                    >
                        Get Your Free Report
                    </Link>
                    <Link
                        href="/"
                        className="cursor-pointer flex items-center gap-2 px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-base font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Decorative Element */}
                <div className="pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 italic">
                        Sign-up functionality will be available soon
                    </p>
                </div>
            </div>
        </div>
    );
}

