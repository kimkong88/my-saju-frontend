import Link from "next/link";

export default function CompatibilityContentSection({
    overview,
    strengths,
    sharedTraits,
}: {
    overview: string;
    strengths: {
        title: string;
        emoji: string;
        rarity?: string;
        description: string;
    }[];
    sharedTraits?: {
        title: string;
        items: string[];
    };
}) {
    return (
        <section
            id="compatibility"
            className="py-24 md:py-40 px-6 xl:px-0 bg-white border-b border-slate-100"
        >
            <div className="max-w-7xl mx-auto">
                {/* Main Section Header */}
                <div className="max-w-4xl mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-slate-900 mb-8 md:mb-12">
                        Compatibility.
                    </h2>
                </div>

                {/* Overview - Emotional Explanation */}
                {overview && (
                    <div className="max-w-4xl mb-12 md:mb-16">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                            Overview
                        </h3>
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                            {overview}
                        </p>
                    </div>
                )}

                {/* Shared Core Values - Sub-section (Moved to top) */}
                {sharedTraits && sharedTraits.items.length > 0 && (
                    <div className="mb-12 md:mb-16">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                                Shared Core Values
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-2">
                                These are the fundamental values and principles
                                you both hold. They represent what matters most
                                to each of you at your core—the beliefs and
                                priorities that guide your decisions and shape
                                your worldview.
                            </p>
                        </div>
                        {/* Pills are better for core values: scannable, distinct, visual separation */}
                        <div className="flex flex-wrap gap-3">
                            {sharedTraits.items.map((trait, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm md:text-base text-slate-700"
                                >
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Strengths - What Makes You Work - Sub-section (Show 1 card + locked teasers) */}
                <div className="mb-12 md:mb-16">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                            What Makes You Work
                        </h3>
                        <p className="text-base text-slate-700 leading-relaxed max-w-3xl mb-2">
                            These are the unique strengths and connections that
                            make your pairing work. They represent rare patterns
                            and complementary energies that create harmony
                            between you.
                        </p>
                    </div>
                    {/* Grid: Show 1 card, then locked teasers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Show first card if available */}
                        {strengths && strengths.length > 0 && (
                            <div className="bg-white p-8 md:p-10 flex flex-col justify-between md:hover:bg-slate-50 transition-colors group border border-slate-200 rounded-sm">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-2xl md:grayscale md:opacity-50 md:group-hover:opacity-100 md:group-hover:grayscale-0 transition-all">
                                            {strengths[0].emoji}
                                        </div>
                                        {strengths[0].rarity && (
                                            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap flex-shrink-0 pt-1 font-semibold">
                                                {strengths[0].rarity}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-medium text-slate-900 tracking-tight mb-4">
                                        {strengths[0].title}
                                    </h4>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                        {strengths[0].description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Locked teaser cards - Always show at least 1 fake card */}
                        {(() => {
                            const remainingCount = strengths
                                ? Math.max(0, strengths.length - 1)
                                : 1;
                            const totalLocked = Math.max(1, remainingCount + 1); // Always show at least 1 locked card

                            return Array.from({ length: totalLocked }).map(
                                (_, index) => (
                                    <div
                                        key={`locked-${index}`}
                                        className="bg-slate-50 border-2 border-dashed border-slate-300 p-8 md:p-10 flex flex-col justify-center items-center relative rounded-sm"
                                    >
                                        <div className="absolute top-4 right-4">
                                            <svg
                                                className="w-5 h-5 text-slate-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                {remainingCount > 0
                                                    ? `${
                                                          remainingCount + 1
                                                      } More Insights`
                                                    : "More Insights"}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Unlock full report
                                            </p>
                                        </div>
                                    </div>
                                )
                            );
                        })()}
                    </div>
                </div>

                {/* Wrap-up CTA Section - Subtle */}
                <div className="pt-12 md:pt-16 border-t border-slate-200">
                    <div className="max-w-4xl">
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            Want to see the complete analysis?{" "}
                            <Link
                                href="#next"
                                className="text-slate-900 font-medium underline decoration-slate-300 hover:decoration-slate-900 transition-colors"
                            >
                                Unlock your full compatibility report
                            </Link>{" "}
                            for deeper insights, communication guides, and
                            personalized advice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
