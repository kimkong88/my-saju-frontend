"use client";

export default function ForecastHero() {
    return (
        <section className="relative min-h-[30vh] md:min-h-[40vh] flex items-center py-12 md:py-16 bg-white overflow-hidden">
            {/* Spline Background Layer - Inverted to White */}
            <div className="absolute inset-0 z-0 opacity-30 md:opacity-40 overflow-hidden">
                <iframe
                    src="https://my.spline.design/aigreymarketingbanner-UujDjniIs0Wgg9nsyRLQOdHf/"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    style={{
                        filter: "invert(1) brightness(1.1)",
                        pointerEvents: "none",
                        clipPath: "inset(0 0 50px 0)",
                    }}
                    loading="lazy"
                />
            </div>

            {/* Content Layer */}
            <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900">
                        Your Future Timeline
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Plan ahead with precision—see your energy cycles, optimal timing, and major transitions
                    </p>
                    <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto mt-2">
                        Forecasts update daily as your energy patterns shift—always current, always relevant
                    </p>
                </div>
            </div>
        </section>
    );
}
