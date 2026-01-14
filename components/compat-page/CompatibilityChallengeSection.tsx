export default function CompatibilityChallengeSection({
    challenge,
}: {
    challenge: {
        title: string;
        emoji: string;
        frequency: string;
        description: string;
    };
}) {
    return (
        <section
            id="challenge"
            className="py-16 md:py-24 px-6 xl:px-0 border-y border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-6">
                        Growth Opportunity.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
                        Every pairing has areas that require understanding. This
                        is where awareness creates transformation.
                    </p>
                </div>

                {/* Vertical Stack - Matching Personal Report Style */}
                <div className="max-w-4xl">
                    <div className="group relative transition-all duration-300">
                        {/* Header with Emoji and Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-3xl md:text-4xl md:grayscale md:opacity-40 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all duration-300">
                                {challenge.emoji}
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:from-slate-300 transition-colors" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight mb-3">
                            {challenge.title}
                        </h3>

                        {/* Frequency */}
                        {challenge.frequency && (
                            <p className="text-sm text-slate-500 italic mb-6">
                                {challenge.frequency}
                            </p>
                        )}

                        {/* Description */}
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                            {challenge.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
