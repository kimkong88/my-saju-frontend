import { Diff } from "lucide-react";

export default function SignatureSection() {
    return (
        <section
            id="how-it-works"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-24">
                {/* --- LEFT CONTENT --- */}
                <div className="lg:w-1/2 order-1">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-8 leading-tight">
                        The Temporal{" "}
                        <span className="italic text-slate-500">Signature</span>
                        .
                    </h2>

                    <p className="text-sm md:text-base text-slate-700 mb-12 leading-relaxed max-w-md">
                        Underneath the surface, MySaju calculates your blueprint
                        across{" "}
                        <strong className="text-slate-900 font-medium">
                            5 core vector coordinates
                        </strong>
                        . By processing these through 10.3 million permutations,
                        we generate a live, breathing data set.
                    </p>

                    {/* Mobile Image Placeholder (Visually same as desktop but smaller) */}
                    <div className="lg:hidden mb-12 flex justify-center">
                        {/* (We use the same SVG component logic here for mobile) */}
                        <SignatureGraphic mobile />
                    </div>

                    {/* --- THE DATA LIST (Replaced Cards with Minimal Rows) --- */}
                    <div className="flex flex-col border-t border-slate-200">
                        {[
                            { code: "W", label: "Identity", desc: "Core Self" },
                            { code: "F", label: "Output", desc: "Expression" },
                            { code: "E", label: "Stability", desc: "Wealth" },
                            {
                                code: "M",
                                label: "Refinement",
                                desc: "Authority",
                            },
                            {
                                code: "Wa",
                                label: "Intelligence",
                                desc: "Resource",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group flex items-center justify-between py-5 border-b border-slate-200 hover:border-slate-900 transition-colors cursor-default"
                            >
                                <div className="flex items-center gap-6">
                                    <span className="font-serif italic text-slate-300 w-8 text-lg group-hover:text-slate-900 transition-colors">
                                        0{idx + 1}
                                    </span>
                                    <span className="text-xs uppercase tracking-widest font-bold text-slate-900">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-400 font-serif italic hidden sm:block">
                                        {item.desc}
                                    </span>
                                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-none">
                                        VEC-{item.code}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {/* Extra item for Polarity */}
                        <div className="group flex items-center justify-between py-5 border-b border-slate-200 hover:border-slate-900 transition-colors cursor-default">
                            <div className="flex items-center gap-6">
                                <span className="font-serif italic text-slate-300 w-8 text-lg group-hover:text-slate-900 transition-colors">
                                    06
                                </span>
                                <span className="text-xs uppercase tracking-widest font-bold text-slate-900">
                                    Polarity Balance
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Diff className="w-3 h-3 text-slate-400 group-hover:text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT CONTENT (SVG ANIMATION) --- */}
                <div className="hidden lg:flex lg:w-1/2 w-full justify-center order-2">
                    <SignatureGraphic />
                </div>
            </div>
        </section>
    );
}

// Extracted Graphic to keep code clean
function SignatureGraphic({ mobile }: { mobile?: boolean }) {
    return (
        <div
            className={`relative aspect-square w-full ${
                mobile ? "max-w-xs" : "max-w-md"
            }`}
        >
            {/* Outer Ring - Increased Opacity for Visibility */}
            <div className="absolute inset-0 animate-spin-slow opacity-60">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <circle
                        cx="200"
                        cy="200"
                        r="190"
                        fill="none"
                        stroke="currentColor"
                        // Bumped stroke width slightly for legibility
                        strokeWidth="0.8"
                        strokeDasharray="4 4"
                        className="text-slate-900"
                    />
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i * 360) / 12;
                        const rad = (angle * Math.PI) / 180;
                        return (
                            <circle
                                key={i}
                                cx={200 + 190 * Math.cos(rad)}
                                cy={200 + 190 * Math.sin(rad)}
                                r="2" // Made dots slightly larger
                                fill="currentColor"
                                className="text-slate-900"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Inner Ring - High Contrast */}
            <div
                className="absolute inset-[15%] animate-spin-slow opacity-90"
                style={{
                    animationDirection: "reverse",
                    animationDuration: "20s",
                }}
            >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <circle
                        cx="200"
                        cy="200"
                        r="190"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        className="text-slate-900"
                    />
                    {/* Tiny tick marks instead of dots */}
                    {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * 360) / 8;
                        const rad = (angle * Math.PI) / 180;
                        return (
                            <circle
                                key={i}
                                cx={200 + 190 * Math.cos(rad)}
                                cy={200 + 190 * Math.sin(rad)}
                                r="2.5" // Larger dots
                                fill="currentColor"
                                className="text-slate-900"
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Center Core */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Orbiting Vectors - Darker Text */}
                    {[
                        { label: "T", angle: -90 },
                        { label: "F", angle: -18 },
                        { label: "E", angle: 54 },
                        { label: "W", angle: 126 },
                        { label: "M", angle: 198 },
                    ].map((vector, idx) => {
                        const rad = (vector.angle * Math.PI) / 180;
                        const radius = 130; // Distance from center
                        const x = Math.cos(rad) * radius;
                        const y = Math.sin(rad) * radius;
                        return (
                            <div
                                key={idx}
                                // Added font-bold and slightly larger text
                                className="absolute text-xs font-serif font-bold italic text-slate-900"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                }}
                            >
                                {vector.label}
                            </div>
                        );
                    })}

                    {/* Center Abstract Shape - More defined borders */}
                    <div className="w-32 h-32 border border-slate-900/30 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm">
                        <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                        <div className="absolute w-full h-full border border-slate-900/40 rounded-full scale-50"></div>
                        <div className="absolute w-full h-full border border-slate-900/20 rounded-full scale-150 border-dashed"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
