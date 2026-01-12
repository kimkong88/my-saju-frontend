import { Fragment } from "react";

export default function CompatibilitySection() {
    return (
        <section
            id="compatibility"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                    Relationship{" "}
                    <span className="italic text-slate-500">Resonance</span>.
                </h2>
                <p className="text-sm md:text-base text-slate-700 mb-16 max-w-xl mx-auto leading-relaxed">
                    Analyze the compatibility of your relationships. Whether
                    personal or professional, we decode the{" "}
                    <strong className="text-slate-900 font-medium">
                        logic of connection
                    </strong>{" "}
                    between two signatures.
                </p>

                {/* --- THE SYNASTRY GRAPHIC (Venn Diagram Style) --- */}
                <div className="relative w-full max-w-lg mx-auto aspect-[4/3] md:aspect-[16/9] mb-12 flex items-center justify-center select-none">
                    {/* SVG Graphic */}
                    <svg viewBox="0 0 400 250" className="w-full h-full">
                        <defs>
                            <pattern
                                id="diagonalHatch"
                                width="4"
                                height="4"
                                patternUnits="userSpaceOnUse"
                                patternTransform="rotate(45)"
                            >
                                <rect
                                    width="2"
                                    height="4"
                                    transform="translate(0,0)"
                                    fill="#0f172a"
                                    opacity="0.15"
                                />
                            </pattern>
                        </defs>

                        {/* GEOMETRY CALCULATION:
                           Centers: (140, 125) and (260, 125). Distance = 120.
                           Radius: 90.
                           Intersection math: Two circles of radius R separated by distance D intersect.
                           The overlap shape is formed by two arcs.
                           
                           This refined path perfectly traces the overlap area.
                        */}

                        {/* Subject A (Left Circle) */}
                        <circle
                            cx="140"
                            cy="125"
                            r="90"
                            fill="none"
                            stroke="#0f172a"
                            strokeWidth="0.8"
                            className="opacity-60"
                        />

                        {/* Subject B (Right Circle) */}
                        <circle
                            cx="260"
                            cy="125"
                            r="90"
                            fill="none"
                            stroke="#0f172a"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            className="opacity-60"
                        />

                        {/* FIXED INTERSECTION PATH:
                           Move to top intersection, Arc to bottom intersection, Arc back to top.
                        */}
                        <path
                            d="M 200,57.9 A 90,90 0 0,0 200,192.1 A 90,90 0 0,0 200,57.9"
                            fill="url(#diagonalHatch)"
                            stroke="none"
                        />

                        {/* Connection Line */}
                        <line
                            x1="140"
                            y1="125"
                            x2="260"
                            y2="125"
                            stroke="#0f172a"
                            strokeWidth="0.5"
                            opacity="0.1"
                            strokeDasharray="2 2"
                        />

                        {/* Anchor Dots */}
                        <circle cx="140" cy="125" r="2" fill="#0f172a" />
                        <circle cx="260" cy="125" r="2" fill="#0f172a" />
                    </svg>

                    {/* Overlay Content */}
                    <div className="absolute inset-0">
                        {/* Subject A Label */}
                        <div className="absolute top-1/2 left-[15%] md:left-[20%] -translate-y-1/2 -translate-x-1/2 text-center">
                            <span className="block font-serif italic text-2xl md:text-3xl text-slate-900">
                                You
                            </span>
                        </div>

                        {/* Subject B Label */}
                        <div className="absolute top-1/2 right-[15%] md:right-[20%] -translate-y-1/2 translate-x-1/2 text-center">
                            <span className="block font-serif italic text-2xl md:text-3xl text-slate-900">
                                Partner
                            </span>
                        </div>

                        {/* The Score (Center) - Floating Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white shadow-sm px-5 py-3 rounded-full border border-slate-100">
                            <span className="block font-serif text-3xl md:text-5xl text-slate-900 leading-none">
                                94
                                <span className="text-sm md:text-xl align-top ml-0.5 opacity-50">
                                    %
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- ANALYSIS FOOTER --- */}
                <div className="border-t border-b border-slate-200 py-8 max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 border border-slate-900 flex items-center justify-center rounded-full">
                                <span className="font-serif italic font-bold">
                                    A+
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-2">
                                Analysis Result
                            </p>
                            <p className="font-serif italic text-slate-800 text-lg leading-relaxed">
                                "A rare geometric alignment. Partner's core
                                energy naturally offsets your blind spots,
                                creating a self-sustaining momentum."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
