import { Diff } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export default function SignatureSection() {
    return (
        <section
            id="how-it-works"
            className="py-16 md:py-32 px-6 xl:px-0 bg-slate-50 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 md:gap-20">
                {/* Content first on mobile, first on desktop (content-first pattern - industry standard) */}
                <div className="lg:w-1/2 order-1">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter leading-none">
                        The Temporal Signature.
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 mb-6 md:mb-10 leading-relaxed">
                        Underneath the surface, MySaju calculates your blueprint
                        across{" "}
                        <strong className="text-slate-900">
                            5 core elements vectors
                        </strong>
                        . By processing these through{" "}
                        <strong className="text-slate-900">
                            10.3 million temporal permutations
                        </strong>
                        , we generate your unique Vector Signature. It is a{" "}
                        <strong className="text-slate-900">
                            live, breathing data set—synchronized to the second{" "}
                        </strong>{" "}
                        that recalibrates your energetic alignment as you move
                        through time.
                    </p>

                    {/* Image shown after description on mobile, but before vector cards for better visual flow */}
                    <div className="lg:hidden mb-6 flex justify-center">
                        <div className="dna-container aspect-square w-full max-w-xs sm:max-w-sm">
                            {/* Outer DNA Ring */}
                            <div className="dna-ring dna-ring-outer w-full h-full animate-spin-slow">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 400 400"
                                >
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="190"
                                        fill="none"
                                        stroke="url(#dnaGradient1-mobile)"
                                        strokeWidth="2"
                                        strokeDasharray="8 12"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="dnaGradient1-mobile"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#cbd5e1"
                                                stopOpacity="0.3"
                                            />
                                            <stop
                                                offset="50%"
                                                stopColor="#94a3b8"
                                                stopOpacity="0.6"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#cbd5e1"
                                                stopOpacity="0.3"
                                            />
                                        </linearGradient>
                                    </defs>
                                    {Array.from({ length: 24 }).map((_, i) => {
                                        const angle = (i * 360) / 24;
                                        const rad = (angle * Math.PI) / 180;
                                        const x = 200 + 190 * Math.cos(rad);
                                        const y = 200 + 190 * Math.sin(rad);
                                        return (
                                            <circle
                                                key={i}
                                                cx={x}
                                                cy={y}
                                                r="2"
                                                fill="#64748b"
                                                opacity="0.6"
                                            />
                                        );
                                    })}
                                </svg>
                            </div>
                            <div
                                className="dna-ring dna-ring-inner w-[80%] h-[80%] animate-spin-slow"
                                style={{ animationDirection: "reverse" }}
                            >
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 400 400"
                                >
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="150"
                                        fill="none"
                                        stroke="url(#dnaGradient2-mobile)"
                                        strokeWidth="1.5"
                                        strokeDasharray="6 10"
                                        opacity="0.7"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="dnaGradient2-mobile"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#94a3b8"
                                                stopOpacity="0.4"
                                            />
                                            <stop
                                                offset="50%"
                                                stopColor="#64748b"
                                                stopOpacity="0.7"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#94a3b8"
                                                stopOpacity="0.4"
                                            />
                                        </linearGradient>
                                    </defs>
                                    {Array.from({ length: 18 }).map((_, i) => {
                                        const angle = (i * 360) / 18;
                                        const rad = (angle * Math.PI) / 180;
                                        const x = 200 + 150 * Math.cos(rad);
                                        const y = 200 + 150 * Math.sin(rad);
                                        return (
                                            <circle
                                                key={i}
                                                cx={x}
                                                cy={y}
                                                r="1.5"
                                                fill="#475569"
                                                opacity="0.5"
                                            />
                                        );
                                    })}
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-64 h-64 bg-gradient-to-br from-white to-slate-200 rounded-full shadow-2xl flex items-center justify-center border border-slate-100">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-3/4 h-3/4"
                                    >
                                        <path
                                            d="M50,10 Q70,30 50,50 T50,90"
                                            fill="none"
                                            stroke="#0f172a"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M30,50 Q50,70 70,50 T30,50"
                                            fill="none"
                                            stroke="#0f172a"
                                            strokeWidth="0.8"
                                            strokeDasharray="2 3"
                                            opacity="0.6"
                                        />
                                        <circle
                                            cx="50"
                                            cy="10"
                                            r="2.5"
                                            fill="#0f172a"
                                        />
                                        <circle
                                            cx="50"
                                            cy="90"
                                            r="2.5"
                                            fill="#0f172a"
                                        />
                                        <path
                                            d="M50,50 L30,50 M50,50 L70,50"
                                            stroke="#0f172a"
                                            strokeWidth="0.5"
                                            opacity="0.3"
                                        />
                                    </svg>
                                    {[
                                        { label: "T", angle: -90 },
                                        { label: "F", angle: -18 },
                                        { label: "E", angle: 54 },
                                        { label: "W", angle: 126 },
                                        { label: "M", angle: 198 },
                                    ].map((vector, idx) => {
                                        const rad =
                                            (vector.angle * Math.PI) / 180;
                                        const radius = 140;
                                        const x = Math.cos(rad) * radius;
                                        const y = Math.sin(rad) * radius;
                                        return (
                                            <div
                                                key={idx}
                                                className="vector-tag absolute px-3 py-1.5 rounded-full text-[9px] font-black tracking-wide shadow-lg whitespace-nowrap"
                                                style={{
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                                }}
                                            >
                                                VECTOR {vector.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "W", name: "Identity" },
                            { label: "F", name: "Output" },
                            { label: "E", name: "Stability" },
                            { label: "M", name: "Refinement" },
                            { label: "Wa", name: "Intelligence" },
                        ].map((vector, idx) => (
                            <Fragment key={idx}>
                                <div className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px]">
                                        {vector.label}
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                                        {vector.name}
                                    </span>
                                </div>
                                {idx === 4 && (
                                    <div className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                                            <Diff className="w-3 h-3 text-slate-900" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                                            Polarity Balance
                                        </span>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* Image second on desktop only (mobile version is inline with content) */}
                <div className="hidden lg:flex lg:w-1/2 w-full justify-center order-2">
                    <div className="dna-container aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md">
                        {/* Outer DNA Ring */}
                        <div className="dna-ring dna-ring-outer w-full h-full animate-spin-slow">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 400 400"
                            >
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="190"
                                    fill="none"
                                    stroke="url(#dnaGradient1)"
                                    strokeWidth="2"
                                    strokeDasharray="8 12"
                                />
                                <defs>
                                    <linearGradient
                                        id="dnaGradient1"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#cbd5e1"
                                            stopOpacity="0.3"
                                        />
                                        <stop
                                            offset="50%"
                                            stopColor="#94a3b8"
                                            stopOpacity="0.6"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#cbd5e1"
                                            stopOpacity="0.3"
                                        />
                                    </linearGradient>
                                </defs>
                                {/* DNA pattern dots */}
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const angle = (i * 360) / 24;
                                    const rad = (angle * Math.PI) / 180;
                                    const x = 200 + 190 * Math.cos(rad);
                                    const y = 200 + 190 * Math.sin(rad);
                                    return (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="2"
                                            fill="#64748b"
                                            opacity="0.6"
                                        />
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Inner DNA Ring */}
                        <div
                            className="dna-ring dna-ring-inner w-[80%] h-[80%] animate-spin-slow"
                            style={{
                                animationDirection: "reverse",
                            }}
                        >
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 400 400"
                            >
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="150"
                                    fill="none"
                                    stroke="url(#dnaGradient2)"
                                    strokeWidth="1.5"
                                    strokeDasharray="6 10"
                                    opacity="0.7"
                                />
                                <defs>
                                    <linearGradient
                                        id="dnaGradient2"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#94a3b8"
                                            stopOpacity="0.4"
                                        />
                                        <stop
                                            offset="50%"
                                            stopColor="#64748b"
                                            stopOpacity="0.7"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#94a3b8"
                                            stopOpacity="0.4"
                                        />
                                    </linearGradient>
                                </defs>
                                {/* DNA pattern dots */}
                                {Array.from({ length: 18 }).map((_, i) => {
                                    const angle = (i * 360) / 18;
                                    const rad = (angle * Math.PI) / 180;
                                    const x = 200 + 150 * Math.cos(rad);
                                    const y = 200 + 150 * Math.sin(rad);
                                    return (
                                        <circle
                                            key={i}
                                            cx={x}
                                            cy={y}
                                            r="1.5"
                                            fill="#475569"
                                            opacity="0.5"
                                        />
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Center Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-64 h-64 bg-gradient-to-br from-white to-slate-200 rounded-full shadow-2xl flex items-center justify-center border border-slate-100">
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-3/4 h-3/4"
                                >
                                    <path
                                        d="M50,10 Q70,30 50,50 T50,90"
                                        fill="none"
                                        stroke="#0f172a"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M30,50 Q50,70 70,50 T30,50"
                                        fill="none"
                                        stroke="#0f172a"
                                        strokeWidth="0.8"
                                        strokeDasharray="2 3"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="50"
                                        cy="10"
                                        r="2.5"
                                        fill="#0f172a"
                                    />
                                    <circle
                                        cx="50"
                                        cy="90"
                                        r="2.5"
                                        fill="#0f172a"
                                    />
                                    {/* Additional connecting lines */}
                                    <path
                                        d="M50,50 L30,50 M50,50 L70,50"
                                        stroke="#0f172a"
                                        strokeWidth="0.5"
                                        opacity="0.3"
                                    />
                                </svg>
                                {[
                                    { label: "T", angle: -90 }, // Top (0° from top)
                                    { label: "F", angle: -18 }, // 72° from top
                                    { label: "E", angle: 54 }, // 144° from top
                                    { label: "W", angle: 126 }, // 216° from top
                                    { label: "M", angle: 198 }, // 288° from top
                                ].map((vector, idx) => {
                                    const rad = (vector.angle * Math.PI) / 180;
                                    const radius = 140; // Distance from center
                                    const x = Math.cos(rad) * radius;
                                    const y = Math.sin(rad) * radius;
                                    return (
                                        <div
                                            key={idx}
                                            className="vector-tag absolute px-3 py-1.5 rounded-full text-[9px] font-black tracking-wide shadow-lg whitespace-nowrap"
                                            style={{
                                                top: "50%",
                                                left: "50%",
                                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                            }}
                                        >
                                            VECTOR {vector.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
