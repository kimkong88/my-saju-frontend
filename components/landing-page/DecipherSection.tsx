import SajuModal from "../modals/SajuModal";

export default function DecipherSection() {
    return (
        <section id="timeline" className="py-16 md:py-32 px-6 xl:px-0">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                {/* Content first on mobile, first on desktop (content-first pattern) */}
                <div className="lg:w-1/2 order-1">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        Your Timeline, <br />
                        Deciphered.
                    </h2>
                    <div className="text-base sm:text-lg text-slate-500 mb-6 md:mb-8 leading-relaxed">
                        <span className="inline-modal-wrapper">
                            <SajuModal />
                        </span>{" "}
                        is not a static test; it's a dynamic map of time. Our
                        engine calculates the interaction between your birth
                        data and current temporal cycles to provide
                        high-precision forecasting.
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    Decade Mapping
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    Understand the 10-year{" "}
                                    <strong className="text-slate-900">
                                        chapter cycles
                                    </strong>{" "}
                                    that define your major life events.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:gap-5">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-lg md:text-xl mb-1">
                                    The Daily Pulse
                                </h4>
                                <p className="text-sm md:text-base text-slate-500">
                                    Micro-adjust your productivity based on the
                                    elemental shift of each day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image second on mobile, second on desktop */}
                <div className="lg:w-1/2 w-full order-2">
                    <div className="relative forecast-card">
                        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[3rem] shadow-2xl border border-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 md:mb-10">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold">
                                        2026-2036 Forecast
                                    </h3>
                                </div>
                                <div className="px-3 sm:px-4 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full w-fit">
                                    Optimal Growth Phase
                                </div>
                            </div>

                            <svg
                                viewBox="0 0 400 200"
                                className="w-full h-auto"
                            >
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur
                                            stdDeviation="3"
                                            result="coloredBlur"
                                        />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path
                                    d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,40"
                                    fill="none"
                                    stroke="#cbd5e1"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                />
                                <path
                                    className="forecast-line"
                                    d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,40"
                                    fill="none"
                                    stroke="#0f172a"
                                    strokeWidth="2.5"
                                />
                                <path
                                    className="forecast-light"
                                    d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,40"
                                    fill="none"
                                    stroke="#06b6d4"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    opacity="0"
                                />

                                <circle cx="130" cy="81" r="5" fill="#0f172a" />
                                <text
                                    x="122"
                                    y="97"
                                    fontSize="9"
                                    fontWeight="bold"
                                    fill="#0f172a"
                                >
                                    Pivot Point: Q3 2027
                                </text>
                            </svg>

                            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
                                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[10px] sm:text-xs text-slate-400 font-bold mb-1 uppercase">
                                        Signal
                                    </span>
                                    <span className="text-sm sm:text-lg md:text-xl font-bold">
                                        Expansion
                                    </span>
                                </div>
                                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[10px] sm:text-xs text-slate-400 font-bold mb-1 uppercase">
                                        Balance
                                    </span>
                                    <span className="text-sm sm:text-lg md:text-xl font-bold">
                                        92%
                                    </span>
                                </div>
                                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[10px] sm:text-xs text-slate-400 font-bold mb-1 uppercase">
                                        Cycle
                                    </span>
                                    <span className="text-sm sm:text-lg md:text-xl font-bold">
                                        Phase 4
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 right-6 sm:-bottom-4 sm:-right-4 md:-bottom-10 md:-right-10 bg-slate-900 text-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-[180px] sm:max-w-[200px] md:max-w-[240px]">
                            <p className="text-[10px] sm:text-xs md:text-sm font-light opacity-80 mb-1 sm:mb-2">
                                Alert
                            </p>
                            <p className="text-xs sm:text-sm md:text-lg font-bold leading-tight">
                                "Internal energy is peaking. A perfect day for
                                strategy and refining details rather than new
                                launches."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
