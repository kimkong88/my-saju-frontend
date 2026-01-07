export default function CompatibilitySection() {
    return (
        <section
            id="compatibility"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                    Relationship Compatibility
                </h2>
                <p className="text-left text-base sm:text-lg md:text-xl text-slate-500 mb-8 md:mb-16 max-w-2xl mx-auto">
                    Analyze the compatibility of your relationships. Whether
                    personal or professional, decode the logic of connection.
                </p>

                <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12 mb-12 md:mb-20">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-slate-100 border border-slate-200 shadow-lg flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer hover:scale-110">
                            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                                You
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 sm:border-6 md:border-8 border-slate-50 flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer hover:scale-110">
                            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black">
                                94%
                            </span>
                        </div>
                        {/* Mobile SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90 md:hidden"
                            viewBox="0 0 80 80"
                        >
                            <circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="4"
                                strokeDasharray="226"
                                strokeDashoffset="13.6"
                                strokeLinecap="round"
                            />
                        </svg>
                        {/* Tablet SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90 hidden md:block lg:hidden"
                            viewBox="0 0 96 96"
                        >
                            <circle
                                cx="48"
                                cy="48"
                                r="44"
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="6"
                                strokeDasharray="276"
                                strokeDashoffset="16.6"
                                strokeLinecap="round"
                            />
                        </svg>
                        {/* Desktop SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90 hidden lg:block"
                            viewBox="0 0 128 128"
                        >
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="8"
                                strokeDasharray="351.8"
                                strokeDashoffset="21"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] md:text-xs font-bold bg-emerald-100 text-emerald-700 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                            High Synergy
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center transition-transform duration-300 ease-out cursor-pointer hover:scale-110">
                            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                                Partner
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm sm:text-base text-slate-500 italic max-w-lg mx-auto leading-relaxed px-4">
                    &quot;Highly compatible alignment. Your partner&apos;s core
                    energy naturally offsets your blind spots, creating a
                    synergy that drives both personal and professional
                    momentum.&quot;
                </p>
            </div>
        </section>
    );
}
