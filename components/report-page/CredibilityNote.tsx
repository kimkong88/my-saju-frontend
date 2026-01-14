import { Info } from "lucide-react";

export default function CredibilityNote() {
    return (
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-slate-200">
            <div className="flex gap-4 max-w-3xl">
                <div className="flex-shrink-0 mt-1">
                    <Info className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                        About This Report
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                        No methodology is perfect, and this analysis is based on
                        your birth data interpreted through 3,000-year-old Bazi
                        principles. We recommend reading the{" "}
                        <strong className="text-slate-900 font-semibold">
                            &quot;Who You Are&quot;
                        </strong>{" "}
                        section first—if the insights resonate with you, the
                        rest of the report contains valuable guidance for
                        understanding your patterns and optimizing your timing.
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                        This report is for entertainment and self-reflection
                        purposes only. Use your own judgment when applying any
                        insights to your life decisions.
                    </p>
                </div>
            </div>
        </div>
    );
}
