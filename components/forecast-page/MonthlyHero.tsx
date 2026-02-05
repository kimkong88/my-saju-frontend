"use client";

interface MonthlyHeroProps {
    period: string; // "Jan 15 - Feb 14, 2025"
    theme: {
        title: string;
        description: string;
    };
    dominantElement?: "fire" | "earth" | "metal" | "water" | "wood";
}

function getElementClass(element?: string): string {
    if (!element) return "today-metal-bg"; // Default to Metal (neutral)

    const elementLower = element.toLowerCase();
    if (elementLower.includes("fire")) return "today-fire-bg";
    if (elementLower.includes("earth")) return "today-earth-bg";
    if (elementLower.includes("metal")) return "today-metal-bg";
    if (elementLower.includes("water")) return "today-water-bg";
    if (elementLower.includes("wood")) return "today-wood-bg";

    return "today-metal-bg"; // Default fallback
}

export default function MonthlyHero({ period, theme, dominantElement }: MonthlyHeroProps) {
    const elementClass = getElementClass(dominantElement);

    return (
        <section
            className={`relative min-h-[30vh] md:min-h-[40vh] flex items-center py-12 md:py-16 ${elementClass} overflow-hidden`}
        >
            <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full relative z-10">
                <div className="text-center space-y-4">
                    {/* Period */}
                    <div className="text-sm text-slate-500 font-medium">
                        Next 14 Days • {period}
                    </div>

                    {/* Theme Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900">
                        {theme.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        {theme.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
