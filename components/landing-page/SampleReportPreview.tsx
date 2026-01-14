export default function SampleReportPreview() {
    // Sample data matching report structure
    const sampleData = {
        identity: {
            code: "Fire-I",
            title: "The Focused Refiner",
        },
        rarity: {
            overall: {
                oneIn: 1353775,
            },
        },
        specialTraits: [
            { name: "The Wealth Generator", emoji: "💰" },
            { name: "Romance Magnetism", emoji: "💕" },
            { name: "Noble Person", emoji: "👑" },
        ],
        elementDistribution: {
            dominant: ["Earth", "Fire"],
        },
        sampleInsight:
            "Your meticulous nature, combined with a laser-like focus, positions you as a true architect of transformation, capable of refining raw potential into tangible results.",
    };

    return (
        <section
            id="sample-preview"
            className="py-24 md:py-40 px-6 xl:px-0 bg-transparent border-t border-slate-900/5"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        See What You&apos;ll Get.
                    </h2>
                    <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Here&apos;s a sample of your personalized report—a
                        comprehensive analysis of your unique birth chart,
                        revealing your archetype, rarity, special traits, and
                        insights.
                    </p>
                </div>

                {/* Sample Report Card */}
                <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                    <div className="relative bg-white border border-slate-200 p-8 md:p-10 group hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                        {/* Code */}
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                            {sampleData.identity.code}
                        </div>

                        {/* Title */}
                        <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                            {sampleData.identity.title}
                        </div>

                        {/* Rarity */}
                        <div className="text-base md:text-lg text-slate-700 mb-4">
                            1 in{" "}
                            <span className="font-bold text-slate-900">
                                {sampleData.rarity.overall.oneIn.toLocaleString()}
                            </span>
                        </div>

                        {/* Special Traits */}
                        <div className="text-sm text-slate-600 border-t border-slate-200 pt-4 mt-4">
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {sampleData.specialTraits.map(
                                    (trait, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-1.5"
                                        >
                                            <span>{trait.emoji}</span>
                                            <span>{trait.name}</span>
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <p className="text-sm text-slate-500 mb-6 italic">
                        This is a sample. Your report will be personalized to
                        your exact birth chart.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#teaser"
                            className="cursor-pointer px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-200 button--effect text-base font-medium"
                        >
                            Get Your Report
                        </a>
                        <a
                            href="#how-it-works"
                            className="cursor-pointer px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full hover:bg-slate-50 transition-all duration-200 button--effect text-base font-medium"
                        >
                            Learn How It Works
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
