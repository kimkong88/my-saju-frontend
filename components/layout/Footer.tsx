export default function Footer() {
    return (
        <footer className="bg-slate-900">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} PulseMap. All
                            rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <a
                                href="/privacy"
                                className="hover:text-slate-300 transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <span className="text-slate-600">•</span>
                            <a
                                href="/terms"
                                className="hover:text-slate-300 transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className="pt-6 border-t border-slate-800">
                        <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
                            <strong className="text-slate-400 font-semibold">
                                Disclaimer:
                            </strong>{" "}
                            This service is provided for entertainment and
                            educational purposes only. The information provided
                            is not intended to be, and should not be construed
                            as, medical, legal, financial, or professional
                            advice. Results are based on traditional Bazi
                            calculations and may vary. No guarantees or
                            warranties are made regarding the accuracy or
                            applicability of any insights. Users are advised to
                            use their own judgment and consult with qualified
                            professionals for matters requiring professional
                            expertise.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
