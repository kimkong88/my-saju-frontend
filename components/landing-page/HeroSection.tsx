import DataDrivenModal from "../modals/DataDrivenModal";
import SajuModal from "../modals/SajuModal";

export default function HeroSection() {
    return (
        <section className="bg-white relative pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-20 sm:pb-24 md:pb-32 lg:pb-40 hero-gradient px-4 sm:px-6 overflow-hidden">
            {/* LAYER 2: Time Compass (Middle) */}
            <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none overflow-hidden">
                {/* Decreased opacity slightly to let the text pop more on small screens */}
                <TimeCompass className="w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] text-slate-900 opacity-[0.12] scale-125" />
            </div>

            {/* LAYER 3: Content (Top) */}
            <div className="font-serif mx-auto text-center relative z-10 max-w-7xl px-4 sm:px-6 pointer-events-none">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-8 sm:mb-10 md:mb-12 text-slate-900 pointer-events-auto leading-[1.1]">
                    Tired of the Stars?
                    <br />
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-600 font-normal italic">
                        Try the Pillar.
                    </span>
                </h1>

                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 mb-10 sm:mb-12 md:mb-14 max-w-4xl mx-auto leading-relaxed font-medium px-2 sm:px-0 pointer-events-auto font-sans">
                    The birth chart analysis built to decode your life&apos;s
                    logic. Powered by{" "}
                    <span className="inline-modal-wrapper underline decoration-slate-300 underline-offset-4 cursor-help">
                        <SajuModal />
                    </span>
                    , re-engineered for precision across{" "}
                    <strong className="text-slate-900 font-bold">
                        10.3 million{" "}
                    </strong>{" "}
                    unique combinations. Real-time alignment and future mapping—{" "}
                    <span className="inline-modal-wrapper underline decoration-slate-300 underline-offset-4 cursor-help">
                        <DataDrivenModal />
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                    <a
                        href="#teaser"
                        className="button--effect cursor-pointer bg-slate-900 hover:bg-black transition-all text-white px-10 py-5 rounded-full font-semibold text-lg w-full sm:w-auto text-center shadow-2xl shadow-slate-900/20 active:scale-95"
                    >
                        Get My Free Reading
                    </a>
                </div>
            </div>
        </section>
    );
}

// Updated Compass: Thicker lines and removed opacity classes from internal elements to let parent control it
function TimeCompass({ className }: { className?: string }) {
    return (
        <div className={`select-none pointer-events-none blur-[3px] ${className}`}>
            {/* Added animate-spin-slow (make sure you have this in tailwind config or use style) */}
            <svg
                viewBox="0 0 500 500"
                className="w-full h-full"
                style={{ animation: "spin 120s linear infinite" }}
            >
                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>

                {/* Outer Ring */}
                <circle
                    cx="250"
                    cy="250"
                    r="240"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                />

                {/* Major Ticks */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <line
                        key={`major-${i}`}
                        x1="250"
                        y1="10"
                        x2="250"
                        y2="40"
                        stroke="currentColor"
                        strokeWidth="2"
                        transform={`rotate(${i * 30} 250 250)`}
                    />
                ))}

                {/* Minor Ticks */}
                {Array.from({ length: 60 }).map((_, i) => (
                    <line
                        key={`minor-${i}`}
                        x1="250"
                        y1="10"
                        x2="250"
                        y2="25"
                        stroke="currentColor"
                        strokeWidth="1"
                        transform={`rotate(${i * 6} 250 250)`}
                    />
                ))}

                {/* Geometry */}
                <path
                    d="M250,50 L423,350 L77,350 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.5"
                />
                <rect
                    x="110"
                    y="110"
                    width="280"
                    height="280"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.5"
                    transform="rotate(45 250 250)"
                />

                {/* Center */}
                <circle
                    cx="250"
                    cy="250"
                    r="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                />
            </svg>
        </div>
    );
}
