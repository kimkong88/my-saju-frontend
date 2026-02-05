"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { ReportInput } from "@/types/report";

interface AccuracyAlertProps {
    input?: ReportInput;
}

export default function AccuracyAlert({ input }: AccuracyAlertProps) {
    const [dismissed, setDismissed] = useState(false);

    // Check if we should show the alert
    const isTimeMissing = input ? !input.isTimeKnown : false;
    const shouldShow = (isTimeMissing) && !dismissed;

    if (!shouldShow) return null;

    const missingItems: string[] = [];
    if (isTimeMissing) {
        missingItems.push("Birth time affects your Hour Pillar and daily energy patterns");
    }


    const handleDismiss = () => {
        setDismissed(true);
        // Optionally save to localStorage to persist across page reloads
        if (typeof window !== "undefined") {
            localStorage.setItem("accuracyAlertDismissed", "true");
        }
    };

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 md:p-8 relative">
            <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-amber-400 hover:text-amber-600 transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 mb-3">
                        Improve Your Report Accuracy
                    </h3>
                    <p className="text-sm text-slate-700 mb-3">
                        Your report may be less precise because:
                    </p>
                    <ul className="space-y-2">
                        {missingItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-slate-700"
                            >
                                <span className="text-amber-600 mt-1 flex-shrink-0">
                                    •
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="ml-0 md:ml-12 md:flex md:justify-end">
                <Link
                    href="/signup"
                    className="w-full md:w-auto inline-block px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors button--effect text-center"
                >
                    Add Your Details
                </Link>
            </div>
        </div>
    );
}

