export default function CompatibilityHighlightSection({
    highlight,
}: {
    highlight: {
        title: string;
        emoji: string;
        rarity: string;
        description: string;
    };
}) {
    return (
        <section
            id="highlight"
            className="py-16 md:py-24 px-6 xl:px-0 bg-white border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-6">
                        What Makes This Special.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        Rare patterns and unique connections that set your pairing
                        apart. These are the exceptional traits that make your
                        compatibility distinctive.
                    </p>
                </div>

                {/* Vertical Stack - Matching Personal Report Style */}
                <div className="max-w-4xl">
                    <div className="group relative transition-all duration-300">
                        {/* Header with Emoji and Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-3xl md:text-4xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                {highlight.emoji}
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                        </div>

                        {/* Title with Rarity Badge */}
                        <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                                {highlight.title}
                            </h3>
                            {highlight.rarity && (
                                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded uppercase tracking-wider whitespace-nowrap border border-slate-300">
                                    {highlight.rarity}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                            {highlight.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

