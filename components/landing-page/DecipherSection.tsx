import SajuModal from "../modals/SajuModal";

export default function DecipherSection() {
    return (
        <section
            id="timeline"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16 md:gap-32">
                {/* --- LEFT CONTENT (Unchanged) --- */}
                <div className="lg:w-1/2 order-1 sticky top-10">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-8 leading-tight">
                        Your Timeline, <br />
                        <span className="italic text-slate-500">
                            Deciphered
                        </span>
                        .
                    </h2>

                    <div className="text-sm md:text-base text-slate-700 mb-12 leading-relaxed max-w-md">
                        <span className="inline-modal-wrapper">
                            <SajuModal />
                        </span>{" "}
                        is not a static test. It is a dynamic map of time. Our
                        engine calculates the interaction between birth data and
                        temporal cycles.
                    </div>

                    <div className="space-y-12">
                        {/* Item 1 */}
                        <div className="group flex flex-col gap-3 pl-6 border-l border-slate-200 hover:border-slate-900 transition-colors">
                            <span className="font-serif italic text-slate-400 text-xl group-hover:text-slate-900 transition-colors">
                                01
                            </span>
                            <div>
                                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest mb-2">
                                    Decade Mapping
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                    Understand the 10-year{" "}
                                    <strong className="text-slate-900 font-medium">
                                        chapter cycles
                                    </strong>{" "}
                                    that define your major life events.
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="group flex flex-col gap-3 pl-6 border-l border-slate-200 hover:border-slate-900 transition-colors">
                            <span className="font-serif italic text-slate-400 text-xl group-hover:text-slate-900 transition-colors">
                                02
                            </span>
                            <div>
                                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest mb-2">
                                    The Daily Pulse
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                    Micro-adjust your productivity based on the
                                    elemental shift of each day.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT CONTENT (Refined "Lab Report" Look) --- */}
                <div className="lg:w-1/2 w-full order-2 pt-8 lg:pt-0">
                    {/* 1. Added a border and white bg to frame it like a document */}
                    <div className="relative w-full border border-slate-200 bg-white/50 backdrop-blur-sm p-6 md:p-10">
                        {/* Decorative Corner Marks (Scientific feel) */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-slate-900"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-900"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-900"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-slate-900"></div>

                        {/* Chart Header */}
                        <div className="flex items-end justify-between border-b border-slate-100 pb-4 mb-8">
                            <h3 className="font-serif text-3xl italic text-slate-900">
                                2026—2036
                            </h3>
                        </div>

                        {/* The SVG Chart - Added Gradient & Color */}
                        <div className="mb-8">
                            <svg
                                viewBox="0 0 400 200"
                                className="w-full h-auto"
                            >
                                <defs>
                                    {/* Gradient to make it look "alive" */}
                                    <linearGradient
                                        id="chartGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#0f172a"
                                            stopOpacity="0.1"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#0f172a"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>

                                {/* Grid lines */}
                                <line
                                    x1="0"
                                    y1="50"
                                    x2="400"
                                    y2="50"
                                    stroke="#f1f5f9"
                                    strokeWidth="1"
                                />
                                <line
                                    x1="0"
                                    y1="100"
                                    x2="400"
                                    y2="100"
                                    stroke="#f1f5f9"
                                    strokeWidth="1"
                                />
                                <line
                                    x1="0"
                                    y1="150"
                                    x2="400"
                                    y2="150"
                                    stroke="#f1f5f9"
                                    strokeWidth="1"
                                />

                                {/* The Trend Line */}
                                <path
                                    d="M0,150 C50,150 100,100 200,80 S300,120 400,40"
                                    fill="none"
                                    stroke="#0f172a"
                                    strokeWidth="1.5"
                                />
                                {/* Gradient Fill under the line */}
                                <path
                                    d="M0,150 C50,150 100,100 200,80 S300,120 400,40 L400,200 L0,200 Z"
                                    fill="url(#chartGradient)"
                                />

                                {/* Interactive Point */}
                                <circle
                                    cx="200"
                                    cy="80"
                                    r="4"
                                    fill="#fff"
                                    stroke="#0f172a"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="200"
                                    y1="80"
                                    x2="200"
                                    y2="200"
                                    stroke="#0f172a"
                                    strokeWidth="0.5"
                                    strokeDasharray="2 2"
                                />
                                <text
                                    x="210"
                                    y="75"
                                    fontSize="10"
                                    fontFamily="serif"
                                    fontStyle="italic"
                                    fill="#0f172a"
                                >
                                    Pivot Point (Q3)
                                </text>
                            </svg>
                        </div>

                        {/* Data Grid */}
                        <div className="grid grid-cols-3 border-t border-slate-100 pt-6">
                            {[
                                { label: "Signal", value: "Expansion" },
                                { label: "Balance", value: "92%" },
                                { label: "Cycle", value: "Phase 4" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`${
                                        i !== 0
                                            ? "border-l border-slate-100 pl-4"
                                            : "pr-4"
                                    }`}
                                >
                                    <span className="block font-mono text-[9px] text-slate-400 uppercase mb-1 tracking-widest">
                                        {item.label}
                                    </span>
                                    <span className="block font-serif text-lg text-slate-900">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 2. The "Field Note" - Styled to look like a personal insight */}
                        <div className="mt-8 bg-slate-50 p-5 relative overflow-hidden group">
                            {/* A subtle accent bar on the left */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900 transition-all group-hover:w-2"></div>

                            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-2">
                                Analysis #4021
                            </p>
                            <p className="font-serif italic text-slate-800 text-base leading-relaxed">
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
